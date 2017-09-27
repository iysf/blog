/*!
 *
 * Author: YangShaoFeng.
 *
 * Github: https://github.com/iysf
 *
 * Email: yangshaofengfe@gmail.com
 *
 * Version: 1.0.0
 *
 * Date: 2016-05-20T17:17Z
 *
 * demo
 */

!(function( global, factory ){

  if ( typeof module === "object" && typeof module.exports === "object"  ) {

  } else {
    // factory(global)
  }

  factory(global, true)

})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {


/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

  var version = '1.0.0',


      Ysf  = function (selector) {

        return new Ysf.fn.init(selector)

      };

  Ysf.fn = Ysf.prototype = {

    Ysf: version,

    constructor: Ysf,

  },

  init = Ysf.fn.init = function (selector) {

    console.log(selector)

  };

if ( noGlobal ) {
  window.Ysf = window.$$ = Ysf
}

})
