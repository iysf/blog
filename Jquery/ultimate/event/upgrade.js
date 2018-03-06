$.fn.extend({
    /*
     * function { on } 绑定事件
     * param { type: string } 事件类型
     * param { fn: Function } 事件处理函数
     * */
    on: function( type, fn ) {
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
        return this.each( function() {

            // 这里的this代表遍历到的每一个元素
            var self = this;

            // 以前有就用以前的，没有初始化一下
            var eCache = this.$_event_cache = this.$_event_cache || {};

            // 如果之前没有对应事件的数组，则认为是第一次绑定该事件
            // 第一次要初始化对应的事件数组，把fn存储进去，
            // 第一次还得调用浏览器原生方法真正的绑定事件。
            if( !eCache[ type ] ) {

                eCache[ type ] = [];
                eCache[ type ].push( fn );

                // 调用浏览器原生方法绑定对应的事件，
                // 事件触发是异步的，一旦该事件触发了，
                // 就会得到元素对应事件最新的数组列表，执行其中的每一个函数。
                jQuery.addEvent( this, type, function( e ) {

                    // 这里什么时候执行，不确定，由用户决定，
                    // 一旦用户做了与事件对应的操作时，便由浏览器调用该方法执行，
                    jQuery.each( eCache[ type ], function() {

                        // 这里的this，指的是每一个回调函数
                        // 模仿浏览器原生的事件处理函数执行它们
                        this.call( self, e );
                    } );
                } );

            }else {
                this.$_event_cache[ type ].push( fn );
            }
        });
    },

    /*
     * function { off } 移除事件
     * param { type: string } 事件类型
     * param { fn: Function } 事件处理函数
     * */
    off: function( type, fn ) {
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
        var argLen = arguments.length;

        return this.each( function() {

            // 没有绑定过任何事件，就不用处理了
            if( !this.$_event_cache ) {
                return;
            }

            // 如果绑过事件，需要进一步处理
            else {

                // 如果没有传参，遍历所有的事件数组，分别清空
                if( argLen === 0 ) {
                    for( var key in this.$_event_cache ) {
                        this.$_event_cache[ key ] = [];
                    }
                    // 不能这个干，这叫销毁证据
                    //this.$_event_cache = {};
                }

                // 如果传如一个参数，则清空指定事件类型的数组
                else if( argLen === 1 ) {
                    this.$_event_cache[ type ] = [];
                }

                // 如果传入多个参数，则清空指定事件类型数组中指定的回调函数
                else {

                    // 遍历对应事件类型的数组，得到每一个回调
                    for( var i = this.$_event_cache[ type ].length - 1; i >= 0; i-- ) {

                        // 依次和传入的回调比较，如果相等，则从数组中剔除
                        if( this.$_event_cache[ type ][ i ] === fn ) {
                            this.$_event_cache[ type ].splice( i, 1 );
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
    }
});