// 1、自调防止全局变量污染
(function( window ) {

    var version = '1.0.0';
    var document = window.document;

    var arr = [];
    var push = arr.push;
    var slice = arr.slice;
    var concat = arr.concat;

    var obj = {};
    var toString = obj.toString;
    var hasOwn = obj.hasOwnProperty;

    // 3、定义工厂
    var jQuery = function( selector ) {
        return new jQuery.fn.init( selector );
    }
    // 4、工厂原型置换&简称
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,

        jquery: version,

        length: 0,

        // 把参数包装成一个新的实例返回，这个新的实例记录了调用者（上一级链）
        pushStack: function( eles ) {
            var $$ = jQuery( eles );
            $$.prevObject = this;
            return $$;
        },

        // 返回上一级链，如果没有返回一个新实例
        end: function() {
            return this.prevObject || jQuery();
        },

        // 把实例转换为数组返回
        toArray: function() {
            return slice.call( this );
        },

        // 按照下标获取原生的元素，支持负数
        get: function( index ) {
            return index >= 0? this[ index ]: this[ this.length + index ];
        },

        // 截取部分元素，返回部分元素构成的新实例
        slice: function( start, end ) {
            return this.pushStack( slice.call( this, start, end ) );
        },

        // 按照下标获取jQ包装过的元素，支持负数
        eq: function( index ) {
            return this.pushStack( this.get( index ) )
        },

        // 获取jQ包装过的第一个元素
        first: function() {
            return this.eq( 0 );
        },

        // 获取jQ包装过的最后一个元素
        last: function() {
            return this.eq( -1 );
        },

        push: push,
        sort: arr.sort,
        splice: arr.splice,

        // 遍历实例
        each: function( cbk ) {
            return jQuery.each( this, cbk );
        },

        // 遍历实例，返回映射后的新实例
        map: function( cbk ) {
            return this.pushStack( jQuery.map( this, cbk ) );
        },

        // 传入的fn在DOM构建完毕后执行
        ready: function() {

            // 存储所有待执行的函数
            var readyList = [];

            // DOM构建完毕后，移除对应的事件绑定，然后执行所有函数
            function complete() {

                // 因为绑定了两个事件，为了防止complete重复被调用，
                // 所以要先移除所有的事件绑定
                if( document.removeEventListener ) {
                    document.removeEventListener( 'DOMContentLoaded', complete );
                    window.removeEventListener( 'load', complete );
                }else {
                    document.detachEvent( 'onreadystatechange', complete );
                    window.detachEvent( 'onload', complete );
                }

                // 遍历执行所有函数
                var i = 0, len = readyList.length;
                while( i < len ) {
                    readyList[ i++ ]();
                }
            }

            // 判断DOM是否已构建完毕
            function isReady() {

                var readyState = document.readyState;

                // readyState值为complete时，标准浏览器和IE老版本浏览器DOM都构建完毕，
                // 对现代浏览器来说，readyState值为interactive时DOM也构建完毕了。
                if( readyState === 'complete' ||
                    ( document.addEventListener && readyState === 'interactive' ) ) {

                }

                return false
            }

            // 兼容监听DOMContentLoaded事件，
            // 同时为了解决页面回退时DONConentloaded事件不触发的问题，
            // 还需要监听一个load事件
            if( document.addEventListener ) {
                document.addEventListener( 'DOMContentLoaded', complete );
                window.addEventListener( 'load', complete);
            }else {
                document.attachEvent( 'onreadystatechange', function() {
                    if( document.readyState === 'complete' ) {
                        complete();
                    }
                });
                window.attachEvent( 'onload', complete);
            }

            return function( fn ) {

                // 如果DOM已经构建完毕，则直接执行函数即可。
                if ( isReady() ){
                    fn();
                }

                // 否则加到待执行列表
                else {
                    readyList.push( fn );
                }

                // 链式编程
                return this;
            }
        }()
    };

    // 7、是工厂自身和原型分别添加一个实现混入继承的方法
    jQuery.extend = jQuery.fn.extend = function() {

        var arg = arguments, argLen = arg.length;
        var key, i = 1;
        var target = arg[ 0 ];

        if( argLen === 1 ) {
            target = this;
            i = 0;
        }

        // 从第二个对象开始遍历
        for ( ; i < argLen; i++ ) {

            // 把遍历到的每一个对象的所有成员copy给target身上
            for ( key in arg[ i ] ) {

                if ( arg[ i ].hasOwnProperty( key ) ) {
                    target[ key ] = arg[ i ][ key ];
                }
            }
        }

        return target;
    };

    // 5、定义构造函数
    var init = jQuery.fn.init = function( selector ) {

        // 非 undefined、null、NaN、0、''、false
        if ( selector )  {

            // function
            if ( jQuery.isFunction( selector ) ) {
                this.ready( selector );
            }

            // string
            else if ( jQuery.isString( selector ) ) {

                // html，创建对应的DOM元素，加到实例身上
                if ( jQuery.isHTML( selector ) ) {
                    push.apply( this, jQuery.parseHTML( selector ) );
                }

                // selector，获取页面中的元素，加到实例身上
                else {
                    push.apply( this, document.querySelectorAll( selector ) );
                }
            }

            // array || likeArray，把数组中所有的数据加到实例身上
            else if( jQuery.isLikeArray( selector ) ) {

                // 这个不用了，是因为IE8中slice不能操作DOM类型的伪数组
                //push.apply( this, slice.call( selector ) );

                // 这个不用了，是因为IE8中apply不能平铺用户自定义的伪数组
                //push.apply( this, concat.apply( [], selector ) );

                // IE8中使用apply平铺用户自定义的伪数组会报错，
                // 如果报错了，则利用slice把用户自定义的伪数组转换为真数组后再使用。
                try{
                    push.apply( this, selector );
                }catch(e) {
                    push.apply( this, slice.call( selector ) );
                }
            }

            // 其它，直接把数据加到实例身上
            else {
                this[ 0 ] = selector;
                this.length = 1;
            }
        }
    };

    // 6、置换构造原型为工厂原型
    init.prototype = jQuery.fn;


    // 给jQ添加一堆静态方法
    jQuery.extend({

        // 把传入的html字符串解析成对应的DOM
        parseHTML: function( html ) {
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            return tempDiv.childNodes;
        },

        // 判断数据是不是html字符串
        isHTML: function( str ) {

            // 如果传入的不是字符串，直接返回false
            if ( typeof str !== 'string' ) {
                return false;
            }

            // 如果传入的是字符串，看看这个字符串结构符不符合html字符串结构，符合返回true
            if( str[ 0 ] === '<' && str[ str.length - 1 ] === '>' && str.length >= 3 ) {
                return true;
            }

            // 不符合返回false
            return false;
        },

        // 判断数据是不是对象类型
        isObject: function( obj ) {
            return (typeof obj === 'object' && obj !== null) || typeof obj === 'function';
        },

        // 判断数据是不是数组或伪数组
        isLikeArray: function( likeArray ) {

            // 过滤 function、window、!object
            if( jQuery.isFunction( likeArray ) || jQuery.isWindow( likeArray ) || !jQuery.isObject( likeArray ) ) {
                return false;
            }

            // 判断是不是真数组
            if( likeArray instanceof Array ) {
                return true;
            }

            // 判断是不是伪数组，要么length值为0，
            // 要么length值为number，并且还得有lenght - 1这个属性
            if( likeArray.length === 0
                || ( typeof likeArray.length === 'number' && likeArray.length > 0 && (likeArray.length - 1) in likeArray ) ) {
                return true;
            }

            return false;
        },

        // 判断是不是函数
        isWindow: function( win ) {
            return win.window === win;
        },

        // 判断是不是函数
        isFunction: function( fn ) {
            return typeof fn === 'function';
        },

        // 判断是不是字符串
        isString: function( str ) {
            return typeof str === 'string';
        },

        // 判断是不是DOM元素
        isDOM: function( dom ) {
            return !!dom && !!dom.nodeType;
        },

        // 遍历对象
        each: function( obj, cbk ) {
            /*
             * 实现思路：
             * 1、首先却分传入进来的是不是likeArray，
             * 2、如果是采用 var i = 0 的遍历方法遍历所有的值，
             * 然后把遍历到的下标和值依次传给回调使用，并且设置回调内部的this为遍历到的值
             * 3、如果不是likeArray，才有for in的遍历方法遍历所有的值，
             * 然后把遍历到的键和值依次传给回调使用，并且设置回调内部的this为遍历到的值
             * 4、如果回调的返回结果是false，那么中断遍历
             * */

            var i, len;

            // 如果是数组或者伪数组，才有vai i的方式遍历，效率比较高
            if( jQuery.isLikeArray( obj ) ) {
                for( i = 0, len = obj.length; i < len; i++ ) {

                    // 把遍历到的键值传给回调使用，如果回调返回false，
                    // 那么证明对方不需要再遍历其他数据了，所以break跳出循环。
                    if( cbk.call( obj[ i ], i, obj[ i ] ) === false ) {
                        break;
                    }
                }
            }

            // 否则采用for in的遍历方式
            else {
                for( i in obj ) {

                    // 把遍历到的键值传给回调使用，如果回调返回false，
                    // 那么证明对方不需要再遍历其他数据了，所以break跳出循环。
                    if( cbk.call( obj[ i ], i, obj[ i ] ) === false ) {
                        break;
                    }
                }
            }

            return obj;
        },

        map: function( obj, cbk ) {
            /*
             * 实现思路：
             * 1、先却分遍历的对象是不是likeArr
             * 2、是的话var i方式遍历，把遍历的数据传给回调，
             * 同时指定回调内部的this为遍历到的值
             * 3、不是for in方式遍历，把遍历的数据传给回调，
             * 同时指定回调内部的this为遍历到的值
             * 4、收集回调的返回结果，如果不为null或undefined，就存储起来，最终一起返回
             * */

            var i, len, temp, result = [];

            // 如果是数组或者伪数组，才有vai i的方式遍历，效率比较高
            if( jQuery.isLikeArray( obj ) ) {
                for( i = 0, len = obj.length; i < len; i++ ) {

                    // 把遍历到的键值传给回调使用，
                    // 同时接收回调的返回值，
                    // 如果值不为null或undefined，那么存储到result数组
                    temp = cbk.call( obj[ i ], i, obj[ i ] );
                    if( temp != null ) {
                        result.push( temp );
                    }
                }
            }

            // 否则采用for in的遍历方式
            else {
                for( i in obj ) {

                    // 把遍历到的键值传给回调使用，
                    // 同时接收回调的返回值，
                    // 如果值不为null或undefined，那么存储到result数组
                    temp = cbk.call( obj[ i ], i, obj[ i ] );
                    if( temp != null ) {
                        result.push( temp );
                    }
                }
            }

            return result;
        },

        // 去掉首尾空白字符
        trim: function( str ) {

            // 不是字符串，打发走
            if ( !jQuery.isString( str ) ) {
                return '';
            }

            // 优先使用原生的
            return str.trim? str.trim(): str.replace( /^\s+|\s+$/g, '');
        }
    });

    // 2、暴露工厂&提供一个工厂简称
    window.jQuery = window.$ = jQuery;

})( window );