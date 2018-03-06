jQuery.fn.extend({

    /*
     * function { attr } 获取或者设置属性节点
     * param { name: string || object }
     * param { optional value: string }
     * return { string || object } 属性节点值或this
     * */
    attr: function( attr, val ) {

        /*
         * 实现思路：
         * 1、参数个数为1
         * 1.1、参数为字符串，返回第一个元素指定的属性节点值。
         * 1.2、参数为对象，遍历所有的元素，遍历传入的对象，
         *      把对象所有的属性按照属性节点的方式添加给每一个元素。
         * 2、参数个数为2
         * 2.1、遍历所有元素，以attr为属性节点名，val为属性节点值添加给这些元素。
         * 3、链式编程返回this。
         * */

        var argLen = arguments.length;

        // 参数为1
        if( argLen === 1 ) {

            // 类型为字符串，返回第一个元素指定的属性节点值
            if( jQuery.isString( attr ) ) {
                return this.get(0).getAttribute( attr );
            }

            // 类型为对象，遍历所有的元素，然后再遍历这个对象，依次添加遍历到的所有属性节点值
            else if( jQuery.isObject( attr ) ) {

                // 遍历所有元素
                this.each( function() {

                    // 这里的this指向遍历到的每一个元素
                    var self = this;

                    // 遍历传入进来的对象，得到所有要设置的属性节点key与value
                    jQuery.each( attr, function( key, val ) {

                        // 给每一个元素设置遍历到的属性节点
                        self.setAttribute( key, val );
                    });
                });
            }
        }

        // 参数为2
        else if( argLen === 2 ) {

            // 参数都是字符串，给所有元素设置指定的属性节点
            if( jQuery.isString( attr ) && jQuery.isString( val ) ) {

                this.each( function() {
                    this.setAttribute( attr, val );
                });
            }
        }

        // 链式编程
        return this;
    },

    /*
     * function { prop } 获取或者设置属性
     * param { name: string || object }
     * param { optional value: string }
     * return { string || object } 属性值或this
     * */
    prop: function( prop, val ) {

        /*
         * 实现思路：
         * 1、参数个数为1
         * 1.1、参数为字符串，返回第一个元素指定的属性。
         * 1.2、参数为对象，遍历所有元素，遍历传入的对象，把对象所有的属性添加给每一个元素。
         * 2、参数个数为2
         * 2.1、遍历所有元素，以attr为属性名，val为属性值添加给这些元素。
         * 3、链式编程返回this。
         * */

        var argLen = arguments.length;

        // 参数为1
        if( argLen === 1 ) {

            // 类型为字符串，返回第一个元素指定的属性值
            if( jQuery.isString( prop ) ) {
                return this.get(0)[ prop ];
            }

            // 类型为对象，遍历所有的元素，然后再遍历这个对象，依次添加遍历到的所有属性值
            else if( jQuery.isObject( prop ) ) {

                // 遍历所有元素
                this.each( function() {

                    // 这里的this指向遍历到的每一个元素
                    var self = this;

                    // 遍历传入进来的对象，得到所有要设置的属性key与value
                    jQuery.each( prop, function( key, val ) {

                        // 给每一个元素分别设置遍历到的属性
                        self[ key ] = val;
                    });
                });
            }
        }

        // 参数为2
        else if( argLen === 2 ) {

            // 参数都是字符串，给所有元素设置指定的属性
            if( jQuery.isString( prop ) && jQuery.isString( val ) ) {

                this.each( function() {
                    this[ prop ] = val;
                });
            }
        }

        // 链式编程
        return this;
    },

    /*
     * function { val } 获取或者设置value属性
     * param { optional value: null || string }
     * return { string || object } value属性值或this
     * */
    val: function( value ) {

        /*
         * 实现思路：
         * 1、不传参
         * 1.1、返回第一个元素的value属性值
         * 2、传参
         * 2.1、传入null，则设置所有元素的value属性为''
         * 2.2、传入字符串，则设置所有元素的value属性为指定的值
         * 3、链式编程返回this
         * */

        // 不传参，借用prop返回第一个元素的value属性值
        if( arguments.length === 0 ) {
            return this.prop( 'value' );
        }

        // 传入null，设置value为空字符串即可
        if ( value === null ) {
            value = '';
        }

        // 借用prop设置所有元素的value属性值
        return this.prop( 'value', value );
    },

    // 升级版，把借用prop的代码合并为一句
    _val: function( value ) {

        /*
        * 实现思路：
        * 1、要动态把参数传给prop，就要用到arguments
        * 2、同时还需要手动在arguments中最前面补充一个参数'value'，
        * 3、最后把arguments传给prop
        * */

        // 传入null或undefined，设置value为空字符串即可
        if( arguments[0] == null ) {
            arguments[0] = '';
        }

        // 在arguments前面补充value参数，然后传给prop
        [].unshift.call( arguments, 'value' );
        return this.prop.apply( this, arguments );

        // 升级一句话版本
        //return this.prop.apply( this, [].concat.apply( ['value'], arguments ) );
    },

    /*
     * function { html } 获取或者设置元素的innerHTML
     * param { optional html: null || string }
     * return { string || object } 某元素innerHTML或this
     * */
    html: function( html ) {

        /*
         * 实现思路：
         * 1、不传参
         * 1.1、返回第一个元素的value属性值
         * 2、传参
         * 2.1、传入null，设置所有元素的value属性为''
         * 2.2、传入字符串，设置所有元素的value属性为指定的值
         * 3、链式编程返回this
         * */

        // 不传参，借用prop返回第一个元素的value属性值
        if( arguments.length === 0 ) {
            return this.prop( 'innerHTML' );
        }

        // 传入null，设置innerHTML为空字符串
        return this.prop( 'innerHTML', html === null? '': html );
    },

    /*
     * function { text } 获取或者设置元素的innerText
     * param { optional text: null || string }
     * return { string || object } 所有元素文本或this
     * */
    text: function( text ) {

        /*
         * 实现思路：
         * 1、不传参
         * 1.1、返回第一个元素的value属性值
         * 2、传参
         * 2.1、传入null，设置所有元素的value属性为''
         * 2.2、传入字符串，设置所有元素的value属性为指定的值
         * 3、链式编程返回this
         * */

        // 不传参，返回所有元素的innerText
        if( arguments.length === 0 ) {

            // 利用静态map方法遍历所有的元素，得到所有元素的文本组成的数组，
            // 然后利用数组的join方法把它们连在一起组成一个字符串返回。
            return jQuery.map( this, function() {
                return this.innerText;
            }).join('');
        }

        // 传入null，设置innerText为空字符串
        return this.prop( 'innerText', text === null? '': text );
    },
});
