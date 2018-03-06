$.easing = {
    linear: function( p ) {
        return p;
    },
    swing: function( p ) {
        return 0.5 - Math.cos( p * Math.PI ) / 2;
    },
    _default: "swing"
};
$.easing['jswing'] = $.easing['swing'];
$.extend( $.easing,
    {
        def: 'easeOutQuad',
        swing: function (x, t, b, c, d) {
            //alert($.easing.default);
            return $.easing[$.easing.def](x, t, b, c, d);
        },
        easeInQuad: function (x, t, b, c, d) {
            return c*(t/=d)*t + b;
        },
        easeOutQuad: function (x, t, b, c, d) {
            return -c *(t/=d)*(t-2) + b;
        },
        easeInOutQuad: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },
        easeInCubic: function (x, t, b, c, d) {
            return c*(t/=d)*t*t + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        easeInOutCubic: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        },
        easeInQuart: function (x, t, b, c, d) {
            return c*(t/=d)*t*t*t + b;
        },
        easeOutQuart: function (x, t, b, c, d) {
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeInOutQuart: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        },
        easeInQuint: function (x, t, b, c, d) {
            return c*(t/=d)*t*t*t*t + b;
        },
        easeOutQuint: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
        easeInOutQuint: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        },
        easeInSine: function (x, t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOutSine: function (x, t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOutSine: function (x, t, b, c, d) {
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        },
        easeInExpo: function (x, t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOutExpo: function (x, t, b, c, d) {
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOutExpo: function (x, t, b, c, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        easeInCirc: function (x, t, b, c, d) {
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },
        easeOutCirc: function (x, t, b, c, d) {
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },
        easeInOutCirc: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        },
        easeInElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        easeOutElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        },
        easeInOutElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        },
        easeInBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        easeOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeInOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        },
        easeInBounce: function (x, t, b, c, d) {
            return c - $.easing.easeOutBounce (x, d-t, 0, c, d) + b;
        },
        easeOutBounce: function (x, t, b, c, d) {
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        easeInOutBounce: function (x, t, b, c, d) {
            if (t < d/2) return $.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
            return $.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
        }
    });

// 把animate作为静态方法，加到$身上
$.extend({
    /*
     * 如果传入2个参数：
     * 正常，没有额外的处理。
     *
     * 如果传入3个参数：
     * 最后一个是数值，那么代表是总时长；
     * 最后一个是字符串，那么代表是缓动函数名；
     * 最后一个是函数，那么代表是回调。
     *
     * 如果传入4个参数：
     * 第三个参数如果是数值，那么代表是总时长；
     * 最后一个是字符串，那么代表是缓动函数名；
     * 最后一个是函数，那么代表是回调。
     *
     * 如果传入5个参数：
     * 第三个参数如果是数值，那么代表是总时长；
     * 第四个参数如果是字符串，那么代表是缓动函数名；
     * 最后一个是函数，那么代表是回调。
     * */
    /*
     * param { ele: DOM }  被修改的dom元素
     * param { json: Object }  要修改的样式集合
     * param { fn: Function }  回调
     * */
    animate: function ( eles, json, time, easing, fn ) {

        eles = $.isArray(eles)? eles : [eles];

        // 记录动画开始的时间
        var startTime = +new Date,
            style, initStyle = [{},{},{}],
            arg = arguments, argLen = arg.length;

        // 只要最后一个参数是函数，那就是回调函数
        fn = typeof arg[argLen -1] === 'function'? arg[argLen -1] : null;

        // 第三个参数和第四个参数，如果是字符串，才会被采纳
        var easing = typeof time === 'string'?
            time : typeof easing === 'string'?
            easing: $.easing.def;

        // 第三个参数，只有是数值的时候，才会被采纳
        var time = typeof time === 'number'? time : 800;

        // 遍历所有元素，记录每一个元素的初始样式值
        for ( var i = 0; i < eles.length; i++) {
            // 记录所有样式的初始值
            for ( style in json ) {
                initStyle[i] = initStyle[i] || {};
                initStyle[i][style] = parseInt($.getStyle( eles[i], style )) || 0;
            }
        }

        eles.timer = setInterval(function () {
            var isStop = true, style, result;

            // 求已经当前距离动画开始已经过去的时间，
            // 并限制总时间不能超过设置的时间
            var delayTime = +new Date - startTime;
            delayTime = delayTime > time? time : delayTime;

            // 遍历每一个元素，分别设置样式
            for ( var i = 0; i < eles.length; i++ ) {
                // 通过算法得到当前时间，元素所在的位置
                for ( style in json ) {
                    result = $.easing[easing]( null, delayTime, initStyle[i][style], json[style] - initStyle[i][style], time );
                    if ( style === 'opacity' ) {
                        result = result < 0.1? 0.1 : result;
                        eles[i].style[style] = result;
                        eles[i].style.filter = 'alpha(opacity:'+ result*100 +')';
                    }else {
                        eles[i].style[style] = result + 'px';
                    }
                }
            }


            // 根据运行时间来判断动画是否应该停止，
            // 停止后有回调，就执行回调
            if ( delayTime >= time ){
                clearInterval( eles.timer );
                console.log( +new Date - startTime );
                fn && fn();
            }
        }, 20);
    }
});

$.fn.extend({
    animate: function ( json, time, easing, fn ) {
        var arg = [].slice.call( arguments );
        arg.unshift( this.toArray() );
        $.animate.apply( this, arg );
    }
});
