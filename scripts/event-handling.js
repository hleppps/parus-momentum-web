function handleEvents() {

// POP UP MENU
	// let pop_up_menu_btn = document.querySelector('.header__mob__button_pop-up-menu')
	// pop_up_menu_btn.addEventListener('click', popUpMenu)

	// let close_pop_up_menu_btn = document.querySelector('.pop-up-menu__contacts_sub__button')
	// close_pop_up_menu_btn.addEventListener('click', buttonClosePopUpMenu)


// СALL REQ FORM
	// 
	// let open_call_request_form_btns = document.querySelectorAll('.button_request-call')
	// for (let i = 0; i < open_call_request_form_btns.length; i++) {
	// 	open_call_request_form_btns[i].addEventListener('click', () => {showOverlayForm('.form_call-request')})
	// }
	// let close_call_request_form_btns = document.querySelectorAll('.form_call-request__close')
	// for (let i = 0; i < close_call_request_form_btns.length; i++) {
	// 	close_call_request_form_btns[i].addEventListener('click', () => {closeOverlayForm('.form_call-request')})
	// }

	let is_checkbox_checked = document.querySelector('.form_call-request__main__checkbox')
	is_checkbox_checked.addEventListener('change', checkInputCallRequestForm)

	let is_phone_entered = document.querySelector('.form_call-request__main__input_phone')
	is_phone_entered.addEventListener('blur', checkInputCallRequestForm)
	is_phone_entered.addEventListener('keyup', checkInputCallRequestForm) 



// ITEM INFO FORM
	let rate_stars = document.querySelectorAll('.item-rating__option-value')
	for (let i = 0; i < rate_stars.length; i++) {
		rate_stars[i].addEventListener('click', changeConditionRate(+i+1))
	}
	let file_input = document.querySelector('.photos-upload__loading-container')
	file_input.addEventListener('change', previewFiles)

	// let open_item_info_form_btns = document.querySelectorAll('.button_take-credit')
	// for (let i = 0; i < open_item_info_form_btns.length; i++) {
	// 	open_item_info_form_btns[i].addEventListener('click', () => {showOverlayForm('.item-description-wrapper')})
	// }

	// let close_item_info_form_btn = document.querySelector('.item-description__button_close-form')
	// close_item_info_form_btn.addEventListener('click', () => {closeOverlayForm('.item-description-wrapper')})

	let filter_function = document.querySelector('.category-selection__input')
	filter_function.addEventListener('keyup', (event) => {filterFunction(filter_function, event)})
	filter_function.addEventListener('keyup', highlightSelectedValue)
	filter_function.addEventListener('mouseover', highlightSelectedValue)

	let is_phone_entered_itemForm = document.querySelector('.personal-info__user-info_phone')
	is_phone_entered_itemForm.addEventListener('blur', checkInputItemInfoForm)
	is_phone_entered_itemForm.addEventListener('keyup', checkInputItemInfoForm)
}