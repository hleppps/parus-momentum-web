function handleEvents() {
	let pop_up_menu_btn = document.querySelector('.a-popUpMenuButton')
	pop_up_menu_btn.addEventListener('click', popUpMenu)

	let close_pop_up_menu_btn = document.querySelector('.m-navigationMobile .a-callButton')
	close_pop_up_menu_btn.addEventListener('click', buttonClosePopUpMenu)

	let rate_stars = document.querySelectorAll('.a-rateStar')
	for (let i = 0; i < rate_stars.length; i++) {
		rate_stars[i].addEventListener('click', changeConditionRate(+i+1))
	}

	let file_input = document.querySelector('.a-uploadFileInput')
	file_input.addEventListener('change', previewFiles)

	let call_btns = document.querySelectorAll('.a-callButton')
	for (let i = 0; i < call_btns.length; i++) {
		call_btns[i].addEventListener('click', showCallRequestForm)
	}

	let close_call_request_form = document.querySelector('.o-callRequestForm .a-close')
	close_call_request_form.addEventListener('click', closeCallRequestForm)
}

function handleCloseButtonEvent() {
	let close_buttons = document.querySelectorAll('.a-jsAddedCloseButton')
	for (let i = 0; i < close_buttons.length; i++) {
		close_buttons[i].addEventListener('click', removePhotos(i))
	}
}