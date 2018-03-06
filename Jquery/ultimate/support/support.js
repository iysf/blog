(function ( w ) {
    var supportReg = /\{\s*\[native code/;
    var support = {
        getElementsByClassName: function () {
            var div = document.createElement('div');
            if (typeof div.getElementsByClassName === 'function') {
                div.innerHTML = '<div class="c"></div>';
                var res = div.getElementsByClassName('c');
                if (res && res.length === 1 && res[0].className === 'c') {
                    return true;
                }
            }
            return false;
        }(),

        byClass: function () {
            return (document.getElementsByClassName + '').indexOf('[native code]') > -1;
        }(),

        bclass: (document.getElementsByClassName + '').indexOf('[native code]') > -1,

        querySelectorAll: function () {
            return supportReg.test(document.querySelectorAll + '')
        }(),

        qsa: supportReg.test(document.querySelectorAll + ''),

        trim: supportReg.test(String.prototype.trim)
    };

    // 暴露到全局
    w.support = support;
})( window );

(function() {
    // 也不尽完美，仍然可能存在问题
    var supportReg = /\{\s*\[native code/;
    function fn() {
        var str = '{[native code]}';
    }
    console.log(supportReg.test(fn + ''));
}());
