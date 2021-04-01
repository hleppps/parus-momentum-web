let is_overlay_form_open = false

function showOverlayForm(selector, display_type = 'none') {

	let underlay = document.querySelector('.underlay')
	let call_request_form = document.querySelector(selector)
	let body = document.body

	call_request_form.style.display = 'flex'
	body.style.overflowY = 'hidden'

	underlay.style.display = 'inherit'
	underlay.style.backgroundColor = '#000'
	underlay.style.opacity = '.5'
	underlay.style.zIndex = '5'
	underlay.addEventListener('click', () => {closeOverlayForm(selector, display_type)})

	is_overlay_form_open = true
}

function closeOverlayForm(selector, display_type = 'none') {
	let underlay = document.querySelector('.underlay')
	underlay.removeEventListener('click', closeOverlayForm)

	let call_request_form = document.querySelector(selector)
	let body = document.body
	call_request_form.style.display = display_type
	body.style.overflowY = 'scroll'

	underlay.style.display = 'none'
	underlay.style.zIndex = '1'
	underlay.style.backgroundColor = 'transparent'
	underlay.style.opacity = '1'

	is_overlay_form_open = false
}


function checkInputCallRequestForm() {
	let is_checkbox_checked = document.querySelector('.o-callRequestForm .a-checkbox').checked
	let submit_btn = document.querySelector('.o-callRequestForm .a-submit')
	let is_phone_entered = document.querySelector('.o-callRequestForm .a-inputPhone').value

	is_phone_entered = checkNumberValidity(is_phone_entered)
		
	submit_btn.disabled = true

	if (is_checkbox_checked && is_phone_entered) {
		submit_btn.disabled = false
	}	
}

function checkInputItemInfoForm() {
	let submit_btn = document.querySelector('.item-description__button_send-form')
	let is_phone_entered = document.querySelector('.personal-info__user-info_phone').value

	submit_btn.disabled = true

	is_phone_entered = checkNumberValidity(is_phone_entered)

	if (is_phone_entered) {
		submit_btn.disabled = false
	}	
}

function checkNumberValidity(number) {
	const reg = /^\+380\s(\([0-9]{2}\)\s*|[0-9]{3}\-)\s[0-9]{3}-[0-9]{2}-[0-9]{2}$/
	return reg.test(number) ? true : false
}
