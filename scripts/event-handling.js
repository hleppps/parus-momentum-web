function handleEvents() {

	let rate_stars = document.querySelectorAll('.item-rating__option-value')
	for (let i = 0; i < rate_stars.length; i++) {
		rate_stars[i].addEventListener('click', changeConditionRate(+i+1))
	}







	let file_input = document.querySelector('.photos-upload__loading-container')
	file_input.addEventListener('change', previewFiles)

	let pop_up_menu_btn = document.querySelector('.a-popUpMenuButton')
	pop_up_menu_btn.addEventListener('click', popUpMenu)

	let close_pop_up_menu_btn = document.querySelector('.m-navigationMobile .a-callButton')
	close_pop_up_menu_btn.addEventListener('click', buttonClosePopUpMenu)



	let call_btns = document.querySelectorAll('.a-callButton')
	for (let i = 0; i < call_btns.length; i++) {
		call_btns[i].addEventListener('click', () => {showOverlayForm('.o-callRequestForm')})
	}

	let close_call_request_form = document.querySelector('.o-callRequestForm .a-close')
	close_call_request_form.addEventListener('click', () => {closeOverlayForm('.o-callRequestForm')})

	let close_call_request_form_btn = document.querySelector('.o-callRequestForm .a-image')
	close_call_request_form_btn.addEventListener('click', () => {closeOverlayForm('.o-callRequestForm')})



	let open_item_info_form_btn = document.querySelector('.advantages-wrapper__button_mob', 'inherit')
	open_item_info_form_btn.addEventListener('click', () => {showOverlayForm('.item-description-wrapper')})

	let close_item_info_form_btn = document.querySelector('.item-description__button_close-form')
	close_call_request_form.addEventListener('click', () => {closeOverlayForm('.item-description-wrapper')})



	let filter_function = document.querySelector('.category-selection__input')
	filter_function.addEventListener('keyup', (event) => {filterFunction(filter_function, event)})
	filter_function.addEventListener('keyup', highlightSelectedValue)
	filter_function.addEventListener('click', highlightSelectedValue)


	let is_checkbox_checked = document.querySelector('.o-callRequestForm .a-checkbox')
	is_checkbox_checked.addEventListener('change', checkInputCallRequestForm)

	let is_phone_entered = document.querySelector('.o-callRequestForm .a-inputPhone')
	is_phone_entered.addEventListener('blur', checkInputCallRequestForm)
	is_phone_entered.addEventListener('keyup', checkInputCallRequestForm) 

	let is_phone_entered_itemForm = document.querySelector('.personal-info__user-info_phone')
	is_phone_entered_itemForm.addEventListener('blur', checkInputItemInfoForm)
	is_phone_entered_itemForm.addEventListener('keyup', checkInputItemInfoForm)

	// let show_item_description_form = document.querySelector('.advantages-wrapper__button')
}