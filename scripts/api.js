window.addEventListener('load', () => {
	let buttons_send_form = document.querySelectorAll('.button_send-form')
	for (let button of buttons_send_form) {
		button.addEventListener('click', () => {getDataFromForm(button.closest('.form'), true)    })
	}
})

function getDataFromForm(form, counter, data = {}) {
	if (form.hasChildNodes()) {
		let children = form.childNodes
		for (let child of children) {
			// if ( (child.nodeName == 'INPUT') && (child.nodeName == 'TEXTAREA')) {
				if (child.name) data[child.name] = child.value
			// }
			getDataFromForm(child, false, data)
		}
	}
	if (counter) sendPostRequets(data)
}

function sendPostRequets(data) {
	// $.post( "https://lombard-parus.com.ua/", data);

	$.post( "https://lombard-parus.com.ua/", data)
	  .done(function( data ) {
	    console.log( "Data Loaded: " );
	 		setSelectorClasslist('popup-notification_success', 'popup-notification_await')
	  });
	setSelectorClasslist('popup-notification_await', 'popup-notification_success')
	showOverlayForm('.popup-notification')

}

function setSelectorClasslist( selector_show, selector_hide ) {
	let show_elements = document.querySelectorAll( '.' + selector_show )
	for ( let element of show_elements ) {
		element.classList.remove( selector_show + '_hide' )
	}

	let hide_elements = document.querySelectorAll( '.' + selector_hide )
	for ( let element of hide_elements ) {
		element.classList.add( selector_hide + '_hide')
	}
}