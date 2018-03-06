function classTrim(classes) {
    return jQuery.trim(classes).replace(/\s+/g, ' ');
}

jQuery.fn.extend({

    /*
     * function { css } 获取或设置样式
     * param { styleName: string } 样式名称 || 样式集合
     * param { optional value: string } 样式的值
     * return { string || object } 样式的值 || this
     * */
    css: function( styleName, value ) {
        /*
         * 实现思路：
         * 1、参数个数为1
         * 1.1、参数为字符串，返回第一个元素指定的样式。
         * 1.2、参数为对象，遍历所有元素，遍历传入的对象，把对象中所有的样式添加给每一个元素。
         * 2、参数个数为2
         * 2.1、遍历所有元素，以styleName为样式名，val为样式值添加给这些元素。
         * 3、链式编程返回this。
         * */
        var argLen = arguments.length;

        // 参数为1
        if( argLen === 1 ) {

            // 如果为字符串，那么返回第一个元素指定的样式
            if( jQuery.isString( styleName ) ) {
                return jQuery.getStyle( this.get(0), styleName );
            }

            // 如果为对象，遍历所有元素，遍历所有样式，依次给每一个元素设置
            else if( jQuery.isObject( styleName ) ) {

                this.each( function() {
                    var self = this;

                    jQuery.each( styleName, function( key, val ) {
                        self.style[ key ] = val;
                    });
                });
            }
        }

        // 参数为2
        else if( argLen === 2 ) {

            // 给所有元素分别设置对应的样式
            this.each( function() {
                this.style[ styleName ] = val;
            });
        }

        // 链式编程
        return this;
    },

    /*
     * function { css } 获取或设置样式
     * param { styleName: string } 样式名称 || 样式集合
     * param { optional value: string } 样式的值
     * return { string || object } 样式的值 || this
     * */
    css: function( styleName, value ) {
        /*
         * 实现思路：
         * 1、参数个数为1
         * 1.1、参数为字符串，返回第一个元素指定的样式。
         * 1.2、参数为对象，遍历所有元素，遍历传入的对象，把对象中所有的样式添加给每一个元素。
         * 2、参数个数为2
         * 2.1、遍历所有元素，以styleName为样式名，val为样式值添加给这些元素。
         * 3、链式编程返回this。
         * */
        var argLen = arguments.length;

        // 参数为1
        if( argLen === 1 ) {

            // 如果为字符串，那么返回第一个元素指定的样式
            if( jQuery.isString( styleName ) ) {
                return jQuery.getStyle( this.get(0), styleName );
            }

            // 如果为对象，遍历所有元素，遍历所有样式，依次给每一个元素设置
            else if( jQuery.isObject( styleName ) ) {

                this.each( function(i) {
                    var self = this;

                    jQuery.each( styleName, function( key, val ) {

                        if(jQuery.isFunction(val)) {
                            self.style[ key ] = val.call(self, i, jQuery(self).css(key));
                        }else {
                            self.style[ key ] = val;
                        }
                    });
                });
            }
        }

        // 参数为2
        else if( argLen === 2 ) {

            // 给所有元素分别设置回调返回的样式
            if(jQuery.isFunction(value)) {
                this.each( function(i) {
                    this.style[ styleName ] = value.call(this, i, jQuery(this).css(styleName));
                });
            }

            // 给所有元素分别设置传入的样式
            else if(jQuery.isString(value)) {
                this.each( function() {
                    this.style[ styleName ] = value;
                });
            }
        }

        // 链式编程
        return this;
    },

    /*
     * function { css } 判断是否含有某class
     * param { className: string } 1个class
     * return { boolean } this
     * */
    hasClass: function( className ) {
        /*
         * 实现思路：
         * 1、遍历所有元素
         * 2、依次得到每一个元素的className，前后加空格处理
         * 3、然后用处理过的className判断是否存在某class(前后也加空格处理)
         * 4、中途只要有一个元素存在某class，就返回true
         * 5、都不存在返回false
         * */
        for( var i = 0, len = this.length; i < len; i++ ) {

            if( (' ' + this[ i ].className + ' ')
                    .indexOf(' ' + className + ' ' ) > -1 ) {
                return true;
            }
        }

        return false;
    },

    _hasClass: function( className ) {

        // 默认值
        var has = false;

        // 遍历所有元素，只要有一个元素含有指定class，就修改has的值为true
        this.each( function() {

            if( (' ' + this.className + ' ').indexOf(' ' + className + ' ' ) > -1 ) {
                has =  true;

                // 剩余的不用再判断了，返回false中断each的遍历。
                return false;
            }
        });

        return has;
    },

    /*
     * function { addClass } 添加class
     * param { className: string } 1个或多个class
     * return { object } this
     * */
    addClass: function( classNames ) {
        /*
         * 实现思路：
         * 1、把classNames字符串转换为存储不同class的数组
         * 2、遍历所有元素，遍历所有class
         * 3、判断每一个元素有没有遍历到的class，没有则累加。
         * 4、链式编程返回this
         * */
        classNames = classNames.split(' ');

        // 遍历所有元素
        this.each( function() {

            var self = this;

            // 遍历所有要添加的class
            jQuery.each( classNames, function( i, val ) {

                // 没有则累加到原有的class上
                if( !jQuery( self ).hasClass( val ) ) {
                    self.className += ' ' + val;
                }
            });
        });

        // 链式编程
        return this;
    },

    /*
     * function { addClass } 删除class
     * param { className: string } 1个或多个class
     * return { object } this
     * */
    removeClass: function( classNames ) {
        /*
         * 实现思路：
         * 1、没传参
         * 1.1. 遍历所有元素，设置他们的class为空
         * 2、传参
         * 2.1、把classNames字符串转换为存储不同class的数组
         * 2.2、遍历所有元素，遍历所有class
         * 2.3、取出每一个元素的class属性，然后替换掉要删除的，把替换后的结果重新赋给每一个元素
         * 3、链式编程返回this
         * */

        // 不传参，重置每一个元素的class属性
        if( arguments.length === 0 ) {
            this.each( function() {
                this.className = '';
            });
        }

        // 传参，批量删除指定class
        else {

            classNames = classNames.split(' ');

            // 遍历所有元素
            this.each( function() {

                var self = this;

                // 遍历所有要删除的class
                jQuery.each( classNames, function( i, val ){

                    // 替换掉要删除的class后重新赋值给元素
                    self.className = (' ' + self.className + ' ').replace( ' ' + val + ' ', ' ' );
                    //self.className = self.className.replace( new RegExp( '\\b' + val + '\\b' , 'g' ), '' );
                });
            });
        }

        // 链式编程
        return this;
    },

    /*
     * function { toggleClass } 有则删除没有则加
     * param { className: string } 1个或多个class
     * return { object } this
     * */
    toggleClass: function( classNames ) {
        /*
         * 实现思路：
         * 1、把classNames字符串转换为存储不同class的数组
         * 2、遍历所有元素
         * 3、复用方法，实现有则删除，没则加
         * 4、链式编程返回this
         * */

        classNames = classNames.split(' ');
        this.each( function() {

            var $self = jQuery(this);

            jQuery.each( classNames, function( i, val ) {

                if( $self.hasClass( val ) ) {
                    $self.removeClass( val );
                }else {
                    $self.addClass( val );
                }
            });
        });
    }
});

$.extend({

    // 获取元素指定的样式
    getStyle: function( ele, styleName ) {

        // ele不是DOM，styleName不是字符串，直接打走
        if ( !jQuery.isDOM( ele ) || !jQuery.isString( styleName ) ) {
            return;
        }

        // 兼容处理
        if ( window.getComputedStyle ) {
            return getComputedStyle( ele )[ styleName ];
        }else {
            return ele.currentStyle[ styleName ];
        }
    }
});