$.fn.extend({
    /*
     * function { on } 绑定事件
     * param { type: string } 事件类型
     * param { selector: string } 委托者选择器
     * param { fn: Function } 事件处理函数
     * */
    on: function( type, selector, fn ) {
        /*
         * 实现思路：
         * 1、遍历所有的元素
         * 2、判断每一个元素有没有$_event_cache这个属性值
         * 3、如果有则继续使用，没有则初始化为一个对象
         * 4、在继续判断这个对象有没有对应事件类型的数组
         * 5、如果没有，说明是第一次绑定该事件
         *  5.1、那么需要给$_event_cache这个对象以type为key添加一个数组
         *  5.2、然后把传入的回调push进去
         *  5.3、最后还得绑定对应的事件（调用静态的addEvent方法即可）
         *  5.4、这个事件回调里面去遍历对应事件的数组，得到每一个事件回调，依次执行
         *  5.5、执行时，需要改变内部的this，还需要把事件对象传递过去
         * 6、如果有，直接把传入的回调push到对应事件的数组就可以了
         * 7、链式编程返回this
         * */
        var arg = arguments, argLen = arg.length;

        // 最后一个参数为事件句柄
        fn = arg[ argLen - 1 ];
        selector = jQuery.isString( selector )? selector: null;

        return this.each( function() {

            var self = this;
            var eCache = this.$_event_cache = this.$_event_cache || {};

            // 没有对应的事件数组，认为是第一次绑定该事件，
            // 初始化事件数组，调用原生方法绑定事件
            if( !eCache[ type ] ) {
                eCache[ type ] = [];
                eCache[ type ].delegateCount = 0;

                // 调用浏览器原生方法，绑定事件
                jQuery.addEvent( this, type, function( e ) {

                    var target = e.target || e.srcElement;
                    var targets = [ target ];
                    targets.push.apply( targets, jQuery.parents( target, self ) );

                    // 先执行委托的函数
                    // 遍历冒泡阶段所有的元素
                    jQuery.each( targets, function() {

                        var target = this;
                        var delegateObjs = eCache[ type ].slice( 0, eCache[ type ].delegateCount );

                        // 遍历元素对应事件对应的事件委托对象
                        jQuery.each( delegateObjs, function() {

                            /*
                            * 实现思路：
                            * 1、根据委托对象的selector获取页面中元素对应的子元素
                            * 2、依次判断冒泡阶段遇到的元素是不是这些子元素
                            * 3、如果是，那么执行这些子元素委托给父元素的事件处理函数
                            * */
                            var delagetes = self.querySelectorAll( this.selector );
                            var delegateFn = this.fn;
                            jQuery.each( delagetes, function() {
                                if( target === this ) {
                                    delegateFn.call( target, e );
                                }
                            });
                        });
                    });

                    // 再执行属于自己的函数
                    jQuery.each( eCache[ type ].slice( eCache[ type ].delegateCount ), function() {
                        this.fn.call( self, e );
                    });
                });
            }

            // 事件处理器对象
            var handleObj = {
                fn: fn,
                selector: selector
            };

            // 如果有委托者，则把该函数添加到无委托者的前面，让有委托者的函数先执行
            if( selector ) {
                eCache[ type ].splice( eCache[ type ].delegateCount++, 0, handleObj );
            }else {
                eCache[ type ].push( handleObj );
            }
        });
    },

    /*
     * function { off } 移除事件
     * param { type: string } 事件类型
     * param { fn: Function } 事件处理函数
     * */
    off: function( type, selector, fn ) {
        /*
         * 实现思路：
         * 1、那么遍历所有的元素，
         * 2、遍历到的每一个元素先判断有没有$_event_cache对象
         * 3、如果没有$_event_cache这个属性，说明之前没有绑定过任何事件，不用做任何处理；如果有$_event_cache继续判断
         * 4、先判断有没有传参，没有传参则遍历$_event_cache中存储的所有数组，分别清空
         * 5、如果传入1个参数，那么把元素$_event_cache对象指定类型的数组清空即可
         * 6、如果传2个以上参数，那么把元素$_event_cache对象指定类型的数组中指定的回调删除即可( 删除方式想想 )
         * 7、链式编程返回this
         * */
        var arg = arguments, argLen = arg.length;

        // 最后一个参数为事件句柄
        fn = arg[ argLen - 1 ];
        selector = jQuery.isString( selector )? selector: null;

        return this.each( function() {

            var eCache;

            // 如果绑过事件，需要进一步处理
            if( this.$_event_cache ) {

                eCache = this.$_event_cache;

                // 如果没有传参，遍历所有的事件数组，分别清空
                if( argLen === 0 ) {
                    for( var key in eCache ) {
                        eCache[ key ] = [];
                        eCache[ type ].delegateCount = 0;
                    }
                }

                // 如果传如一个参数，则清空指定事件类型的数组
                else if( argLen === 1 ) {
                    eCache[ type ] = [];
                    eCache[ type ].delegateCount = 0;
                }

                // 如果传入2个参数，需要进一步判断
                else if( argLen === 2 ) {

                    // 清空指定事件类型数组中指定委托的函数
                    if( selector ) {
                        for( var i = eCache[ type ].length - 1; i >= 0; i-- ) {

                            // 依次和传入的回调比较，如果相等，则从数组中剔除
                            if( eCache[ type ][ i ].selector === selector ) {
                                eCache[ type ].splice( i, 1 );
                                eCache[ type ].delegateCount--;
                            }
                        }
                    }

                    // 清空指定事件类型数组中指定的函数
                    else {
                        for( var i = eCache[ type ].length - 1; i >= 0; i-- ) {

                            // 依次和传入的回调比较，如果相等，则从数组中剔除
                            if( eCache[ type ][ i ].fn === fn ) {

                                // 如果被删除的函数是委托函数，那么委托的总数自减
                                if( eCache[ type ][ i ].selector ) {
                                    eCache[ type ].delegateCount--;
                                }

                                eCache[ type ].splice( i, 1 );
                            }
                        }
                    }
                }

                // 如果传入3个参数，则清空指定事件类型数组中指定委托的指定回调函数
                else if( argLen === 3 ) {

                    // 遍历对应事件类型的数组，得到每一个回调
                    for( var i = eCache[ type ].length - 1; i >= 0; i-- ) {

                        // 依次和传入的回调比较，如果selector以及fn都相等，则从数组中剔除
                        if( eCache[ type ][ i ].selector === selector && eCache[ type ][ i ].fn === fn ) {
                            eCache[ type ].splice( i, 1 );
                            eCache[ type ].delegateCount--;
                        }
                    }
                }
            }
        });
    }
});

$.extend({

    /*
     * function { addEvent } 绑定事件
     * param { ele: DOM } 绑定事件的dom对象
     * param { type: string } 事件类型
     * param { fn: Function } 事件处理函数
     * */
    addEvent: function( ele, type, fn ) {

        // ele不是DOM，type不是字符串，fn不是函数，打包带走
        if( !jQuery.isDOM( ele ) || !jQuery.isString( type ) || !jQuery.isFunction( fn ) ) {
            return;
        }

        // 兼容绑定事件
        if( ele.addEventListener ) {
            ele.addEventListener( type, fn );
        }else {
            ele.attachEvent( 'on' + type, fn );
        }
    },

    /*
     * function { addEvent } 解除事件
     * param { ele: DOM } 解除事件的dom对象
     * param { type: string } 事件类型
     * param { fn: Function } 事件处理函数
     * */
    removeEvent: function( ele, type, fn ) {

        // ele不是DOM，type不是字符串，fn不是函数，打包带走
        if( !jQuery.isDOM( ele ) || !jQuery.isString( type ) || !jQuery.isFunction( fn ) ) {
            return;
        }

        // 兼容移除事件
        if( ele.removeEventListener ) {
            ele.removeEventListener( type, fn );
        }else {
            ele.detachEvent( 'on' + type, fn );
        }
    },

    parents: function( ele, until ) {
        var parents = [], parent = ele.parentNode;
        while ( parent &&  parent !== until ) {
            parents.push( parent );
            parent = parent.parentNode;
        }
        return parents;
    }
});