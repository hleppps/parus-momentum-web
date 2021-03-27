let is_menu_open = false

function popUpMenu () {
	let underlay = document.querySelector('.a-underlay')
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
	let underlay = document.querySelector('.a-underlay')
	underlay.removeEventListener('click', underlayClosePopUpMenu)
	is_menu_open = true
	popUpMenu()
}

function buttonClosePopUpMenu() {
	is_menu_open = true
	popUpMenu()
}

