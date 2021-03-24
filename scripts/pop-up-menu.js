let is_menu_open = false
let underlay = document.querySelector('.a-underlay')

function popUpMenu () {
	let pop_up_menu = document.querySelector('.m-popUpMenu')
	let pop_up_menu_img = document.querySelector('.a-popUpMenuImage')
	let body = document.body

	if (!is_menu_open) {
		body.style.overflowY = 'hidden'

		underlay.style.display = 'inherit'
		underlay.addEventListener('click', underlayClosePopUpMenu)

		openPopUpMenu(pop_up_menu, pop_up_menu_img)
	} else {
		underlay.style.display = 'none'
		body.style.overflowY = 'scroll'

		closePopUpMenu(pop_up_menu, pop_up_menu_img)
	}
}

function openPopUpMenu (menu, img) {
	img.setAttribute('src', 'images/pop-up-menu-btn-close.svg')
	menu.style.transform = 'none'

	is_menu_open = true
}

function closePopUpMenu (menu, img) {
	img.setAttribute('src', 'images/pop-up-menu-btn-open.svg')
	menu.style.transform = 'translate(120%, 0)'

	is_menu_open = false
}

function underlayClosePopUpMenu() {
	underlay.removeEventListener('click', underlayClosePopUpMenu)
	is_menu_open = true
	popUpMenu()
}

function buttonClosePopUpMenu() {
	is_menu_open = true
	popUpMenu()
}

function checkInputCallRequestForm() {
	let is_checkbox_checked = document.querySelector('.o-callRequestForm .a-checkbox').checked
	let submit_btn = document.querySelector('.o-callRequestForm .a-submit')
	let is_phone_entered = document.querySelector('.o-callRequestForm .a-inputPhone').value
	is_phone_entered = checkNumberValidity(is_phone_entered)

	if (is_checkbox_checked && is_phone_entered) {
		submit_btn.disabled = false
	}	
}

function checkNumberValidity(number) {
  number = number.replace(/[\s\-\(\)]/g, '');
  return number.match(/^((\+?3)?8)?0\d{9}$/) != null;
}