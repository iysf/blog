$.extend({
    /*
     * function { addEvent } 绑定事件
     * param { ele: DOM } 绑定事件的dom对象
     * param { type: string } 事件类型
     * param { fn: Function } 事件处理函数
     * */
    addEvent: function( ele, type, fn ) {

        var eventHandler = fn;

        // ele不是DOM，type不是字符串，fn不是函数，打包带走
        if( !jQuery.isDOM( ele ) || !jQuery.isString( type ) || !jQuery.isFunction( fn ) ) {
            return;
        }

        // 兼容绑定事件
        if( ele.addEventListener ) {
            ele.addEventListener( type, eventHandler );
        }

        // IE8，事件句柄执行时，内部this指向window，需要手动修正
        else {
            eventHandler = function( e ) {
                fn.call( ele, e );
            };
            ele.attachEvent( 'on' + type, eventHandler );
        }

        return eventHandler;
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

$.fn.extend({
    /*
     * function { on } 事件绑定
     * param { type: string } 事件类型
     * param { fn: Function } 事件处理函数
     * */
    on: function( type, fn ) {
        return this.each( function() {
            jQuery.addEvent( this, type, fn );
        });
    },

    /*
     * function { off } 事件移除
     * param { type: string } 事件类型
     * param { fn: Function } 事件处理函数
     * */
    off: function( type, fn ) {
        return this.each( function() {
            jQuery.removeEvent( this, type, fn );
        });
    },

    /*
     * function { click } 绑定点击事件
     * param { fn: Function } 事件句柄
     * */
    click: function( fn ) {
        return this.on( 'click', fn );
    }
});

// 给原型批量添加绑定事件的函数，这些函数内部都是通过on实现的
jQuery.each(( "blur focus focusin focusout load resize scroll unload click dblclick " +
    "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
    "change select submit keydown keypress keyup error contextmenu" ).split( " " ),
    function ( index, eventName ) {
        jQuery.fn[ eventName ] = function ( fn ) {
            return this.on( eventName, fn );
        }
    });

/*
* 存在的问题：
* 1、IE8中事件处理函数执行时内部this指向window
* 2、IE8事件处理函数执行的顺序与现代浏览器相反
* 3、移除事件时，必须传函数，使用不够便利
* */
