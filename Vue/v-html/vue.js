/* 
 * Author: YangShaoFeng.
 * Github: https://github.com/iysf
 * Email: yangshaofengfe@gmail.com
 * Version: 1.0.0
 */
	
// 

!(function(global){

	function Vue( paramsObj ) {

		if ( toString.call(paramsObj) === '[object Object]' ) {

			// html
			var v_html = Vue.$querySelect('v-html', paramsObj.data)

			// text
			var v_text = Vue.$querySelect('v-text', paramsObj.data)

		}

		this.el = paramsObj.el

		this.data = paramsObj.data
		
	}

	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}


	Vue.$querySelect = function ( tag, data ) {

		var arr_dom = document.querySelectorAll('['+tag+']')

		arr_dom.forEach( function ( item, index ) {

			var html = item.getAttribute(tag)

			item.removeAttribute(tag)

			if ( tag == 'v-html' ) {

				item.innerHTML = data[html]

			} else if ( tag == 'v-text' ) {

				item.innerText = data[html]

			}

		} )

		return arr_dom
	}





	global.Vue = Vue
})(this)
