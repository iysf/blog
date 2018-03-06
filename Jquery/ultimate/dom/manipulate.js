jQuery.fn.extend({

    /*
     * function { empty } 清空元素内容
     * return { object } this
     * */
    empty: function() {
        return this.each( function() {
            this.innerHTML = '';
        });
    },

    _empty: function() {
        return this.html( null );
    },

    /*
     * function { empty } 清空元素内容
     * return { object } this
     * */
    remove: function() {
        return this.each( function() {
            this.parentNode.removeChild( this );
        });
    },

    /*
     * function { appendTo } 把元素添加到指定父元素的后面
     * param { parents: DOM、jQ实例、selector } 父节点、目的地
     * return { object } 被添加子节点包装后的实例
     * */
    appendTo: function( parents ) {
        /*
         * 实现思路：
         * 1、把parent统一包装成jQ实例
         * 2、遍历所有父元素，遍历所有子元素
         * 3、给所有父元素添加所有子元素(只有第一个父元素添加的是子元素本体，其余的是clone版本)。
         * 4、收集所有被添加的子元素(包含clone版本)
         * 5、由pushStack把所有子元素包装成实例，并记录上一级链，然后返回其值。
         * */
        var $parents = jQuery( parents ), $sons = this;
        var son, sons = [];

        // 遍历所有父元素
        $parents.each( function( i, parent ) {

            // 遍历所有被添加的元素
            $sons.each( function() {

                // 只有第一个目标添加的是元素本体，以后添加的是元素clone版本
                son = i === 0? this: this.cloneNode( true );
                parent.appendChild( son );
                sons.push( son );
            });
        });

        // 交由pushStack包装成新实例返回，新实例记录了上一级链
        return this.pushStack( sons );
    },

    /*
     * function { preppendTo } 把元素添加到指定父元素的最前面
     * param { parents: DOM、jQ实例、selector } 父节点、目的地
     * return { object } 被添加子节点包装后的实例
     * */
    prependTo: function( parents ) {
        /*
         * 实现思路：
         * 1、把parent统一包装成jQ实例
         * 2、遍历所有父元素，遍历所有子元素
         * 3、给所有父元素的最前面添加所有子元素(只有第一个父元素添加的是子元素本体，其余的是clone版本)。
         * 4、收集所有被添加的子元素(包含clone版本)
         * 5、由pushStack把所有子元素包装成实例，并记录上一级链，然后返回其值。
         * */
        var $parents = jQuery( parents ), $sons = this;
        var son, sons = [];

        // 遍历所有父元素
        $parents.each( function( i, parent ) {

            // 遍历所有被添加的元素
            $sons.each( function() {

                // 只有第一个目标添加的是元素本体，以后添加的是元素clone版本
                son = i === 0? this: this.cloneNode( true );
                parent.insertBefore( son, parent.firstChild );
                sons.push( son );
            });
        });

        // 交由pushStack包装成新实例返回，新实例记录了上一级链
        return this.pushStack( sons );
    },

    /*
     * function { appendTo } 在元素的后面添加子元素
     * param { sons: DOM、jQ实例、string } 子元素
     * return { object } this
     * */
    append: function( sons ) {
        /*
         * 实现思路：
         * 1、传入字符串，转换为对应的DOM
         * 2、把sons包装成jQ实例
         * 3、借用appendTo把sons添加到指定的父元素
         * 4、链式编程返回this
         * */

        if( jQuery.isString( sons ) ) {
            sons = $.parseHTML( sons );
        }

        // sons包装成jQ实例，然后借用appendTo添加到指定的父元素
        jQuery( sons ).appendTo( this );

        return this;
    },

    /*
     * function { appendTo } 在元素的最前面添加子元素
     * param { sons: DOM、jQ实例、string } 子元素
     * return { object } this
     * */
    prepend: function( sons ) {
        /*
         * 实现思路：
         * 1、传入字符串，转换为对应的DOM
         * 2、把sons包装成jQ实例
         * 3、借用prependTo把sons添加到指定父元素的最前面
         * 4、链式编程返回this
         * */

        if( jQuery.isString( sons ) ) {
            sons = $.parseHTML( sons );
        }

        // sons包装成jQ实例，然后借用prependTo添加到指定父元素的最前面
        jQuery( sons ).prependTo( this );

        return this;
    },

    /*
     * function { insertBefore } 把元素添加到指定元素前面
     * param { refer: DOM、jQ实例、selector } 参照的兄弟元素
     * return { object } this
     * */
    insertBefore: function( refer ) {
        /*
         * 实现思路：
         * 1、统一使用jQuery包装成实例
         * 2、遍历所有参照元素，遍历所有被添加的元素
         * 3、依次获取参照元素的父元素，然后添加元素到参照元素的前面(只有第一个父元素添加的是本体，其余的是clone版本)
         * 4、链式编程返回this
         * */
        var $refer = jQuery( refer ), $sibling = this;
        var sibling, siblings = [];

        // 遍历参照元素
        $refer.each( function( i, refer ) {

            // 遍历被添加元素
            $sibling.each( function() {

                // 只有第一个父元素添加的是本体，其余的是clone版本
                sibling = i === 0? this: this.cloneNode( true );
                // 获取参照元素的父元素，然后在参照元素的前面添加子元素
                refer.parentNode.insertBefore( sibling, refer );
                siblings.push( sibling );
            });
        });

        return this.pushStack( siblings );
    },

    /*
     * function { insertAfter } 在元素的后面添加兄弟元素
     * param { refer: DOM、jQ实例、selector } 参照的兄弟元素
     * return { object } this
     * */
    insertAfter: function( refer ) {
        /*
         * 实现思路：
         * 1、统一使用jQuery包装成实例
         * 2、遍历所有参照元素，遍历所有被添加的元素
         * 3、依次获取参照元素的父元素，然后添加元素到参照元素的后面(只有第一个父元素添加的是本体，其余的是clone版本)
         * 4、链式编程返回this
         * */
        var $refer = jQuery( refer ), $sibling = this;
        var sibling, siblings = [];

        // 遍历参照元素
        $refer.each( function( i, refer ) {

            // 遍历被添加的元素
            $sibling.each( function() {

                // 只有第一个父元素添加的是本体，其余的是clone版本
                sibling = i === 0? this: this.cloneNode( true );
                // 获取参照元素的父元素，然后在参照元素的后面添加子元素
                refer.parentNode.insertBefore( sibling, refer.nextSibling );
                siblings.push( sibling );
            });
        });

        return this.pushStack( siblings );
    },

    /*
     * function { before } 在元素的前面添加兄弟元素
     * param { sibling: DOM、jQ实例、string } 要添加的兄弟元素
     * return { object } this
     * */
    before: function( sibling ) {
        /*
         * 实现思路：
         * 1、如果参数是字符串，解析为对应的DOM节点
         * 2、把sibling包装成jQ实例
         * 3、借用insertBefore把sibling添加到指定兄弟元素的前面
         * 4、链式编程返回this
         * */
        if( jQuery.isString( sibling ) ) {
            sibling = jQuery.parseHTML( sibling );
        }

        // sibling包装成jQ实例，然后借用insertBefore添加到指定兄弟元素的前面
        jQuery( sibling ).insertBefore( this );

        return this;
    },

    /*
     * function { before } 在元素的后面添加兄弟元素
     * param { sibling: DOM、jQ实例、string } 要添加的兄弟元素
     * return { object } this
     * */
    after: function( sibling ) {
        /*
         * 实现思路：
         * 1、如果参数是字符串，解析为对应的DOM节点
         * 2、把sibling包装成jQ实例
         * 3、借用insertAfter把sibling添加到指定兄弟元素的后面
         * 4、链式编程返回this
         * */
        if( jQuery.isString( sibling ) ) {
            sibling = jQuery.parseHTML( sibling );
        }

        // sibling包装成jQ实例，然后借用insertBefore添加到指定兄弟元素的前面
        jQuery( sibling ).insertAfter( this );

        return this;
    }
});
