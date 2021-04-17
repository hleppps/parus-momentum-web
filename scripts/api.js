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
			if (child.nodeName == 'INPUT') {
				if (child.name) data[child.name] = child.value
			}
			getDataFromForm(child, false, data)
		}
	}
	if (counter) sendPostRequets(data)
}

function sendPostRequets(data) {
	$.post( "https://lombard-parus.com.ua/", { data });
	showOverlayForm('.popup-notification')
} 