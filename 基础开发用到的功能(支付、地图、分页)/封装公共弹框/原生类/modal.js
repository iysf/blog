!(function(__global__){

var log = console.log.bind(console)

function modal ( text ) {

	var oModal   = document.createElement('div')
	var oContent = document.createElement('div')

	oModal.style = "position: fixed;left: 0;top:0;width: 100%;height: 100%;z-index: 99;background: rgba(0, 0, 0,.4)"

	oContent.style = "position: absolute;left: 50%;top: 50%;width: 40%;transform: translate(-50%,-50%);z-index: 100;background: #fff; text-align:center;"

	oContent.innerHTML = text

	document.body.appendChild(oModal)
	document.body.appendChild(oContent)
	
	oModal.onclick = function () {
		document.body.removeChild(oModal)
		document.body.removeChild(oContent)
	}

}

modal.show = function () {

	if ( arguments.length == 1 ) {

		if( arguments instanceof Object ) {
			
			var modalObj = arguments[0]

			for ( var key in modalObj ) {

				if ( key == 'text' ) {

					modal(modalObj[key])

				}

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