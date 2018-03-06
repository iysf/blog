!(function(global){

var log = console.log.bind(console)

function Vue ( paramsObj ) {


	var oFor = document.querySelector('[v-for]')

	// 截取规则 Start
	var _ = trim(oFor.innerHTML)
	console.log(_)
	_ = _.substring(0, _.length - 2)
	_ = _.substring(_.lastIndexOf('.')+1, _.length)
	// 截取规则   End

	var v_for = oFor.getAttribute('v-for')
	
	v_for = trim(v_for)	

	var result = v_for.split('in')

	var firstResult = result[0]
	var lastResult = result[1]

	var data = paramsObj.data[lastResult]

	for ( var item in data ) {

		oFor.removeAttribute('v-for')

		var oDom = oFor.cloneNode(true)

		for ( var key in data[item] ) {
			if ( key == _ ) {
				oDom.innerHTML = data[item][key]
			}

		}

		oFor.parentNode.appendChild(oDom)

	}

	oFor.parentNode.removeChild(oFor)

	this.el = paramsObj.el

	this.data = paramsObj.data

	this.methods = paramsObj.methods



}

// is Array
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

// delete All space
function trim(val) {
	return val.replace(/\s+/g, "");
}

global.Vue = Vue

})(this)