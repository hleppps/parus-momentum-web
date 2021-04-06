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

	let open_calculator_term_choose_form = document.querySelector('.content__term__mobile-select__button')
	open_calculator_term_choose_form.addEventListener('click', () => {showOverlayForm('.form_term-choose')})

	let close_btn_calculator_term_choose_form = document.querySelector('.form_term-choose__footer__button_close')
	close_btn_calculator_term_choose_form.addEventListener('click', () => {closeOverlayForm('.form_term-choose')})

	let choose_btn_calculator_term_choose_form = document.querySelector('.form_term-choose__footer__button_choose')
	choose_btn_calculator_term_choose_form.addEventListener('click', () => {closeOverlayForm('.form_term-choose')})

// CHECK INPUT VALIDITY
	let is_checkbox_checked = document.querySelector('.form_call-request__main__checkbox')
	is_checkbox_checked.addEventListener('change', () => {
		inputCheck('.form_call-request__input_submit', '.form_call-request__main__input_phone', '.form_call-request__main__checkbox')
	})

	let is_phone_entered = document.querySelector('.form_call-request__main__input_phone')
	is_phone_entered.addEventListener('blur', () => {
		inputCheck('.form_call-request__input_submit', '.form_call-request__main__input_phone', '.form_call-request__main__checkbox')
	})
	is_phone_entered.addEventListener('keyup', () => {
		inputCheck('.form_call-request__input_submit', '.form_call-request__main__input_phone', '.form_call-request__main__checkbox')
	}) 

	let is_phone_entered_itemForm = document.querySelector('.personal-info__user-info_phone')
	is_phone_entered_itemForm.addEventListener('blur', () => {
		inputCheck('.item-description__button_send-form', '.personal-info__user-info_phone')
	})
	is_phone_entered_itemForm.addEventListener('keyup', () => {
		inputCheck('.item-description__button_send-form', '.personal-info__user-info_phone')
	})

	let inputs = document.querySelectorAll('input, textarea')
	for (let input of inputs) {
		input.addEventListener('keydown', () => {checkInputLength(input)})
	}

})


function showOverlayForm(selector, display_type = 'none') {

	let underlay = document.querySelector('.underlay')
	let form = document.querySelector(selector)
	let body = document.body

	form.style.display = 'flex'
	// body.style.overflowY = 'hidden'

	// underlay.style.display = 'inherit'
	// underlay.style.backgroundColor = '#000'
	// underlay.style.opacity = '.5'
	// underlay.style.zIndex = '5'
	underlay.classList.add('underlay_show-overlay-form')
	body.classList.add('body_show-overlay-element')

	underlay.addEventListener('click', () => {closeOverlayForm(selector, display_type)})

	is_overlay_form_open = true
}

function closeOverlayForm(selector, display_type = 'none') {
	let underlay = document.querySelector('.underlay')
	underlay.removeEventListener('click', closeOverlayForm)

	let form = document.querySelector(selector)
	let body = document.body
	form.style.display = display_type
	// body.style.overflowY = 'scroll'

	// underlay.style.display = 'none'
	// underlay.style.zIndex = '1'
	// underlay.style.backgroundColor = 'transparent'
	// underlay.style.opacity = '1'
	underlay.classList.remove('underlay_show-overlay-form')
	body.classList.remove('body_show-overlay-element')

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
	}	
}

function checkNumberValidity(number) {
	const reg = /^\+380\s(\([0-9]{2}\)\s*|[0-9]{3}\-)\s[0-9]{3}-[0-9]{2}-[0-9]{2}$/
	return reg.test(number) ? true : false
}

function checkInputLength(elem) {
	let max_input_length = elem.getAttribute('maxlength')
	if (elem.value.length >= max_input_length) {
		elem.classList.add('input_overloaded')
	} else {
		elem.classList.remove('input_overloaded')
	}
}