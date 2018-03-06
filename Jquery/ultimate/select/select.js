(function (w) {

    var nativeReg = /\{\s*\[native code/;
    var baseSelectorReg = /^\#([\w-]+)$|^\.([\w-]+)$|^(\*)$|^(\w+)$/;

    // 该对象，用来记录一些新方法是否可用
    // 每一个方法的实现思路：
    // 被判断的方法 + '',得到该方法的字符串方法体，
    // 通过查看这个字符串方法体中是否含有'[native code]'来得知浏览器有没有对该方法进行实现。
    support = {
        getElementsByClassName: nativeReg.test(document.getElementsByClassName + ''),
        querySelectorAll: nativeReg.test(document.querySelectorAll + ''),
        trim: nativeReg.test(String.prototype.trim + ''),
        arrIndexOf: nativeReg.test(Array.prototype.indexOf + '')
    };

    // 数组去重
    function unique( arr ) {
        var result = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            // 新数组没有这个值，就push进来
            // 原生写法result.indexOf(arr[i]);
            // 自己实现的写法indexOf(result, arr[i]);
            if (indexOf(result, arr[i]) === -1) {
                result.push(arr[i]);
            }
        }
        return result;
    }

    /*
     * 兼容的数组indexOf
     * param { arr : Array } 被判断的数组
     * param { val } 查看数组中是否含有这个值
     * param { startIndex : number } 从数组中指定的下标开始查找
     * */
    function indexOf( arr, val, startIndex ) {
        startIndex = startIndex || 0;

        // 优先使用内置的indexOf
        if ( support.arrIndexOf ) {
            return arr.indexOf(val);
        }

        // 遍历arr，看看是否含有val
        for (var i = startIndex, len = arr.length; i < len; i++) {
            if (arr[i] === val) {
                // 如果存在，那么模仿原生的indexOf方法处理方式，
                // 返回该值在数组中的下标
                return i;
            }
        }

        // 如果不存在某个值，为了和原生的indexOf保持一致，所以也返回-1
        return -1;
    }

    /*
     * 兼容性的trim方法，用来去除字符串两端的空白。
     * ' a bc ' ==> /^\s*|\s*$/g
     * */
    function trim( str ) {

        // 过滤空与非字符串
        if (!str || typeof str !== 'string') {
            return '';
        }

        // 优先使用原生的
        if (support.trim) {
            return str.trim();
        }

        // 自己实现功能
        return str.replace(/^\s*|\s*$/g, '');
    }

    // 通过className获取元素
    // 进行了兼容性处理
    function byClass( className, context, arr ) {
        context = context || document;
        arr = arr || [];

        var tags, i, len;

        // 优先使用原生的getElementsByClassName方法
        if (support.getElementsByClassName) {
            arr.push.apply(arr, context.getElementsByClassName(className));
            return arr;
        }

        /*
         * 遍历所有元素，把含有指定className的元素push到arr中
         * */
        tags = context.getElementsByTagName('*');
        for (i = 0, len = tags.length; i < len; i++) {
            // 通过给元素className的两边添加空格，让判断变得统一
            if ((' ' + tags[i].className + ' ').indexOf(' ' + className + ' ') > -1) {
                arr.push(tags[i]);
            }
        }
        return arr;
    }

    /*
    * 最基础的选择器，供内部使用
    * */
    function baseSelect( selector, context, arr ) {
        context = context || document;
        arr = arr || [];

        var match, temTag;

        // 进行分类匹配
        match = baseSelectorReg.exec(selector);

        // 通过查看不同分组是否有值，
        // 来区分选择器的类型
        if (match[1]) {
            // document.getElementById可能返回null，需要过滤掉
            if (temTag = document.getElementById(match[1])) {
                arr.push(temTag);
            }
        }else if (match[2]) {
            arr.push.apply(arr, byClass(match[2], context));
        }else if (match[3]) {
            arr.push.apply(arr, context.getElementsByTagName('*'));
        }else if (match[4]){
            arr.push.apply(arr, context.getElementsByTagName(match[4]));
        }

        return arr;
    }

    /*
    * 后代选择器处理函数
    * */
    function subSelect( selector, context, arr) {
        context = context || document;
        arr = arr || [];

        var selectors, i, len,
            j, jLen, res = [], previousRes = [context];

        selectors = selector.split(' ');

        // 遍历后代选择器中的所有子选择器
        for ( i = 0, len = selectors.length; i < len; i++ ) {

            // 上一次的结果作为本次的context( 因为上一次的结果可能存在多个，所以是循环 )
            for ( j = 0, jLen = previousRes.length; j < jLen; j++) {

                // 把所有的结果先存储到res里面
                res.push.apply(res, baseSelect(selectors[i], previousRes[j]));
            }
            // 下一次循环时，previousRes变为当前的结果
            previousRes = res;
            // 下一次获取的结果，得重新存储(因为我们只想要最后一次获取到的子元素)
            res = [];
        }

        // 把最终获取到的子元素，存储到指定的数组中
        arr.push.apply(arr, previousRes);

        return arr;
    }

    /*
     * Function ｛ select ｝ 选择器函数
     * param { selector : string } 选择器
     * param { context : DOm } 指定查找的起点元素
     * param { arr : Array } 指定获取的元素所存放的数组
     * */
    function select( selector, context, arr ) {
        context = context || document;
        arr = arr || [];

        var firstChar, temTag, selectorNew, selectors,
            i, len, match;

        // 处理'' || !string
        if (!selector || typeof selector !== 'string') {
            return [];
        }

        // 优先使用浏览器内置的querySelectorAll方法
        if (support.querySelectorAll) {
            arr.push.apply(arr, context.querySelectorAll(selector));
            return arr;
        }

        // 先把selector通过','分割成数组
        selectors = selector.split(',');

        for (i = 0, len = selectors.length; i < len; i++) {

            // 如果有匹配到的结果，
            // 那么说明这是id、class、*、tag选择器字符串,
            // 这4个基本选择器交由baseSelect统一处理。
            if (baseSelectorReg.test(trim(selectors[i]))) {
                arr.push.apply(arr, baseSelect(trim(selectors[i]), context));
            }else {
                arr.push.apply(arr, subSelect(trim(selectors[i]), context));
            }

        }

        // 过滤掉重复的元素再返回
        return unique(arr);
    }

    // 全局暴漏select方法
    w.select = select;
})(window);
