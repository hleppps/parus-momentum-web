let is_call_request_form_open = false

function showCallRequestForm() {
	let call_request_form = document.querySelector('.o-callRequestForm')
	let body = document.body

	call_request_form.style.display = 'flex'
	body.style.overflowY = 'hidden'

	underlay.style.display = 'inherit'
	underlay.style.backgroundColor = '#000'
	underlay.style.opacity = '.5'
	underlay.style.zIndex = '5'
	underlay.addEventListener('click', underlayCloseCallRequestForm)


	is_call_request_form_open = true
}

function closeCallRequestForm() {
	let call_request_form = document.querySelector('.o-callRequestForm')
	let body = document.body
	
	call_request_form.style.display = 'none'
	body.style.overflowY = 'scroll'

	underlay.style.display = 'none'
	underlay.style.zIndex = '1'
	underlay.style.backgroundColor = 'transparent'
	underlay.style.opacity = '1'

	is_call_request_form_open = false
}

function underlayCloseCallRequestForm() {
	underlay.removeEventListener('click', underlayCloseCallRequestForm)
	closeCallRequestForm()
}