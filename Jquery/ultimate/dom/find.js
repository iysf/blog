function indexOf(arr, val) {
    var i, len;
    for(i = 0, len = arr.length; i < len; i++) {
        if(arr[i] === val) {
            return i;
        }
    }
    return -1;
}

jQuery.filter = function(elems, selector) {

    if(!elems || !selector) {
        return elems;
    }

    var nSelector = document.querySelectorAll(selector);
    return jQuery.map(nSelector, function() {
        var i = 0, len = elems.length;
        for(; i < len; i++) {
            if(elems[i] === this) {
                return this;
            }
        }
    });
}

jQuery.find = function(elem, selector) {

    if(!elem || !selector) {
        return elem;
    }

    return elem.querySelectorAll(selector);
}

jQuery.fn.extend({

    // 获取所有元素的子元素
    children: function() {

        var result = [];

        // 遍历所有元素
        this.each( function() {

            // 把所有的子元素添加存储result中
            result.push.apply( result, this.children );
        });

        return this.pushStack( result );
    },

    // 获取所有元素的子元素
    _children: function() {

        // 利用map实现的话，需要修改map方法，让map支持平铺参数
        return this.map(function() {
            return this.children;
        });
    },

    // 获取所有父元素
    parent: function() {
        var result = [];

        // 遍历所有元素，存储其父节点
        this.each( function() {
            if(indexOf(result, this.parentNode) === -1) {
                result.push(this.parentNode);
            }
        });

        return this.pushStack(result);
    },

    // 获取所有祖父元素
    parents: function() {
        var result = [];

        // 遍历所有元素
        this.each( function() {
            var parentNode = this;

            // 把所有的父元素都存起来
            while (parentNode = parentNode.parentNode) {
                if(indexOf(result, parentNode) === -1 && parentNode.nodeType == 1) {
                    result.push(parentNode);
                }
            }
        });

        return this.pushStack(result);
    },

    // 获取所有元素的下一个兄弟元素
    next: function() {
        var result = [];

        // 遍历所有元素
        this.each( function() {
            var nextNode = this;

            // 找到元素节点为止
            while (nextNode = nextNode.nextSibling) {
                if(nextNode.nodeType === 1) {
                    result.push(nextNode);
                    break;
                }
            }
        });

        return this.pushStack(result);
    },

    // 获取所有元素的下一个兄弟元素
    _next: function() {
        return this.map( function() {
            var nextNode = this;

            // 找到元素为止
            while(nextNode = nextNode.nextSibling) {
                if(nextNode.nodeType === 1) {
                    return nextNode;
                }
            }
        });
    },

    // 获取所有元素后面的兄弟元素
    nextAll: function() {
        var result = [];

        // 遍历所有元素
        this.each( function() {
            var nextNode = this;

            // 把所有下面的元素都存起来
            while (nextNode = nextNode.nextSibling) {
                if(nextNode.nodeType === 1) {
                    if(indexOf(result, nextNode) === -1) {
                        result.push(nextNode);
                    }
                }
            }
        });

        return this.pushStack( result );
    },

    // 获取所有元素的上一个兄弟元素
    prev: function() {
        return this.map(function() {
            var prevNode = this;

            // 找到元素节点为止
            while(prevNode = prevNode.previousSibling) {
                if( prevNode.nodeType === 1 ) {
                    return prevNode;
                }
            }
        });
    },

    // 获取所有元素前面的兄弟元素
    prevAll: function() {
        var result = [];

        // 遍历所有元素
        this.each( function() {
            var prevNode = this;

            // 找到元素节点为止
            while ( prevNode = prevNode.previousSibling ) {
                if( prevNode.nodeType === 1 ) {
                    if(indexOf(result, prevNode) === -1) {
                        result.push(prevNode);
                    }
                }
            }
        });

        return this.pushStack( result );
    },

    // 获取所有元素的兄弟元素，需要去重
    siblings: function() {
        var result = [];

        // 遍历所有元素
        this.each(function() {

            var self = this;
            var siblings = this.parentNode.children;

            // 遍历所有兄弟元素，
            // 没有添加过，并且不是自己的push存储
            $.each(siblings, function() {
                if(indexOf(result, this) === -1 && this !== self) {
                    result.push( this );
                }
            });
        });

        return this.pushStack( result );
    },

    // 获取所有父元素
    _parent: function(selector) {
        var result = [];

        // 遍历所有元素，存储其父节点
        this.each( function() {
            if(indexOf(result, this.parentNode) === -1) {
                result.push(this.parentNode);
            }
        });

        return this.pushStack(jQuery.filter(result, selector));
    },

    // 获取所有元素的子元素
    _children: function(selector) {

        // 利用map实现的话，需要修改map方法，让map支持平铺参数
        var $children = this.map(function() {
            return this.children;
        });

        return this.pushStack(jQuery.find($children, selector));
    },

    filter: function(selector) {
        return this.pushStack(jQuery.filter(this, selector));
    }
});
