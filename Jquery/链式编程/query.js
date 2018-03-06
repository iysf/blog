/* 
	* Author: YangShaoFeng.
	* Github: https://github.com/iysf
	* Email: yangshaofengfe@gmail.com
	* Version: 1.0.0
*/

var log = console.log.bind(console)

!(function ( global, factory ) {

var version = "1.0.0",
		arr     = [],
		push    = arr.push;

$('#app').html()

var $ = function ( selector ) {

	// console.log(new $.fn.init( selector ).__proto__.constructor == $.prototype.constructor)

	return new $.fn.init( selector )

}

$.fn = $.prototype = {
	
	// The current version of jQuery being used
	Jquery: version,

	constructor: $,

	// The default length of a jQuery object is 0
	length: 0,

	// Start with an empty selector
	selector: "",

}

$.fn.init = function ( selector ) {

	if ( typeof selector == 'string' ) {

		push.apply( this, document.querySelectorAll(selector) )

	}

}

$.fn.init.prototype = $.fn


$.fn.each = function ( func ) {

	for ( var i = 0; i < this.length; i++  ) {

		func( this[i], i, this )

	}

}

$.fn.html = function ( text ) {

	this.each( function ( item, index, self ) { 

		item.innerHTML = text		

	} )

	return this
}



global.$ = global.jQuery = $

})( this, function ( window, noGlabol ) {  })