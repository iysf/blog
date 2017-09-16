!(function(__global__){
	
var log = console.log.bind(console)

function modal () {

	var oModal = document.createElement('div')
	div.style = ""

}

modal.show = function () {
	if ( arguments.length == 1 ) {

		if( arguments instanceof Object ) {
			
			var modalObj = arguments[0]

			for ( var key in modalObj ) {

				if ( key == 'text' ) {
					// 具体处理逻辑
				}
				log(key)
				log(modalObj[key])

			}

		} else {

			throw new Error(arguments + 'is not a Object')

		}	
	} else {

		throw new Error( 'modal.Show arguments: Number 1' )

	}

}

__global__.modal = modal

})(this)