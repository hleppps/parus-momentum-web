let is_overlay_form_open = false


window.addEventListener('load', () => {
  $(".input_phone").mask("+380 (99) 999-99-99")

// SHOW/CLOSE FORMS
	let open_call_request_form_btns = document.querySelectorAll('.button_request-call')
	for (let i = 0; i < open_call_request_form_btns.length; i++) {
		open_call_request_form_btns[i].addEventListener('click', () => {showOverlayForm('.form_call-request')})
	}

	let close_call_request_form_btns = document.querySelectorAll('.form_call-request__close')
	for (let i = 0; i < close_call_request_form_btns.length; i++) {
		close_call_request_form_btns[i].addEventListener('click', () => {closeOverlayForm('.form_call-request')})
	}

	let open_item_info_form_btns = document.querySelectorAll('.button_take-credit')
	for (let i = 0; i < open_item_info_form_btns.length; i++) {
		open_item_info_form_btns[i].addEventListener('click', () => {showOverlayForm('.item-description-wrapper')})
	}

	let close_item_info_form_btn = document.querySelector('.item-description__button_close-form')
	close_item_info_form_btn.addEventListener('click', () => {closeOverlayForm('.item-description-wrapper')})
})



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

function inputCheck(submit_btn_cls, phone_input_cls, check_box_cls = null) {
	let is_checkbox_checked = document.querySelector(check_box_cls)
	if (is_checkbox_checked != null) {
		is_checkbox_checked = is_checkbox_checked.checked
	} else if (is_checkbox_checked === null) {
		is_checkbox_checked = true
	}
	let submit_btn = document.querySelector(submit_btn_cls)
	let phone_input = document.querySelector(phone_input_cls).value

	phone_input = checkNumberValidity(phone_input)
	submit_btn.disabled = true

	if (is_checkbox_checked && phone_input) {
		submit_btn.disabled = false
		// console.log(submit_btn.disabled)
	}	
}

function checkInputCallRequestForm() {
	let submit_btn = document.querySelector('.form_call-request__input_submit')
	let is_phone_entered = document.querySelector('.form_call-request__main__input_phone').value
	let is_checkbox_checked = document.querySelector('.form_call-request__main__checkbox').checked

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
