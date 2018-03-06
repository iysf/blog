jQuery.extend({

    // 绑定事件
    addEvent: function( ele, type, fn ) {

        // ele不是DOM，type不是字符串，fn不是函数，打包打走
        if( !jQuery.isDOM( ele ) || !jQuery.isString( type ) || !jQuery.isFunction( fn ) ) {
            return false;
        }

        // 兼容处理
        if( ele.addEventListener ) {
            ele.addEventListener( type, fn );
        }else {
            ele.attachEvent( 'on' + type, fn );
        }
    },

    // 移除事件
    removeEvent: function( ele, type, fn ) {

        // ele不是DOM，type不是字符串，fn不是函数，打包打走
        if( !jQuery.isDOM( ele ) || !jQuery.isString( type ) || !jQuery.isFunction( fn ) ) {
            return false;
        }

        // 兼容处理
        if( ele.removeEventListener ) {
            ele.removeEventListener( type, fn );
        }else {
            ele.detachEvent( 'on' + type, fn );
        }
    }
});

jQuery.fn.extend({

    // 绑定事件
    on: function( type, selector, fn ) {
        /*
         * 实现思路：
         * 1、第一次给元素绑定某事件时，给元素按照事件类型初始化一个存储对应事件处理函数的数组
         * 2、然后把fn存储进去，再给元素调用addEvent静态方法绑定对应的事件，
         * 2.1、这个事件触发时，遍历对应事件处理函数的数组，按照顺序执行他们
         * 2.2、同时要改变函数执行时内部的this为绑定者
         * 2.3、同时还要把event事件对象传给函数供其使用
         * 3、以后再给这个元素绑定已经绑过事件，只需把事件处理函数push到对应的数组中即可。
         * 4、链式编程返回this
         * */

        // 如果传入两个参数，那么第二个就认为是事件处理函数
        fn = fn || selector;
        selector = jQuery.isString( selector )? selector: null;

        // 遍历所有元素
        return this.each( function() {

            var self = this;

            // 如果元素之间没有event_cache，那么就初始化一下，有了继续使用之前的。
            var eCache = self.event_cache = self.event_cache || {};

            // 事件触发时，浏览器要调用的函数
            function eventHandle( e ) {
                /*
                * 实现思路： 
                * 1、从事件源起，到指定元素为止，获取中间所有冒泡经过的元素
                * 2、获取对应事件数组中，所有的事件委托对象
                * 3、遍历所有冒泡的元素，
                * 4、遍历所有事件委托的对象，得到每一个对象中selector对应的元素
                * 5、然后每一个冒泡元素和每一个selector元素比较，如果相等，则执行对应事件委托对象中存储的函数
                * 6、所有委托的函数执行完毕后，遍历未委托的对象，依次执行里面存储的函数
                * */
                var target = e.target || e.srcElement;
                var targets = [];
                while( target && target !== self ) {
                    targets.push( target );
                    target = target.parentNode;
                }

                var delegateHandleObjs = eCache[type].slice( 0, eCache[type].delegateCound );
                var handleObjs = eCache[type].slice( eCache[type].delegateCound );

                // 执行委托的函数
                // 遍历每一个冒泡阶段遇到的元素
                jQuery.each( targets, function() {

                    var target = this;

                    // 遍历每一个事件委托对象
                    jQuery.each( delegateHandleObjs, function() {

                        var selector = this.selector;
                        var fn = this.fn;
                        var selectorNodes = self.querySelectorAll( selector );

                        // 遍历每一个selector元素，依次和冒泡元素比较
                        jQuery.each( selectorNodes, function() {

                            // 委托的函数执行时，内部this指向委托的元素
                            if( target === this ) {
                                fn.call( target, e );

                                // 满足一个selector，继续判断target是否满足下一个selector
                                return false;
                            }
                        });
                    });
                });

                // 执行未委托绑定给元素自己的函数
                jQuery.each( handleObjs, function() {
                    this.fn.call( self, e );
                });
            }

            // 如果没有对应的事件数组，那么认为是第一次绑定该事件，
            // 需要初始化这个数组，数组还要添加一个记录委托函数数量的属性，
            // 最后还要调用浏览器原生api绑定事件
            if( !eCache[ type ] ) {

                eCache[ type ] = [];
                eCache[ type ].delegateCound = 0;

                jQuery.addEvent( self, type, eventHandle );
            }

            // 创建事件处理对象，存储到事件数组中
            var handleObj = {
                fn: fn,
                selector: selector
            };

            // 委托的事件处理对象，存储在未委托的前面
            if( selector ) {
                eCache[ type ].splice( eCache[ type ].delegateCound++, 0, handleObj );
            }
            // 未委托的事件处理对象，直接存储到事件数组后面即可
            else {
                eCache[ type ].push( handleObj );
            }
        });
    },

    // 移除事件
    off: function( type, fn ) {
        /*
         * 实现思路：
         * 1、遍历所有元素，如果元素有event_cache再进行下一步处理
         * 2、如果没有传参，清空event_cache对象中存储的每一个数组
         * 3、如果传了一个参数，清空event_cache对象中指定的数组
         * 4、如果传了两个参数，清除event_cache对象中指定数组中指定的函数
         * 5、链式编程返回this
         * */
        var argLen = arguments.length;

        return this.each( function() {

            var arr = null;
            var self = this;

            // 如果有event_cache这个对象，说明元素帮过事件，
            // 进一步根据参数个数做移除处理。
            if( this.event_cache ) {

                // 清除所有事件数组
                if( argLen === 0 ) {
                    jQuery.each( this.event_cache, function( key, arr ) {
                        self.event_cache[ key ] = [];
                    });
                }

                // 清除指定的事件数组
                else if( argLen === 1 ) {
                    this.event_cache[ type + '_cache' ] = [];
                }

                // 清除指定的事件数组中指定的函数
                else if( argLen === 2 ) {
                    arr = this.event_cache[ type + '_cache' ];
                    for( var i = arr.length - 1; i >= 0; i-- ) {
                        if( arr[ i ] === fn ) {
                            arr.splice( i, 1 );
                        }
                    }
                }
            }
        });
    }
});

// 给原型添加一些事件绑定的简写方式
var events = [ 'click', 'change', 'resize', 'mousedown', 'mouseout', 'mouseenter' ];
jQuery.each( events, function( i, eventName ) {
    jQuery.fn[ eventName ] = function( fn ) {
        return this.on( eventName, fn );
    }
});
