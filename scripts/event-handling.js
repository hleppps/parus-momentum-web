function handleEvent() {
	let pop_up_menu_btn_open = document.querySelector('.a-popUpMenuButton-open')
	pop_up_menu_btn_open.addEventListener('click', openPopUpMenu)

	let pop_up_menu_btn_close = document.querySelector('.a-popUpMenuButton-close')
	pop_up_menu_btn_close.addEventListener('click', closePopUpMenu)

   // let check_email_validity = document.querySelector('.a-input-email')
   // check_email_validity.addEventListener('keyup', checkEmailValidity)
}