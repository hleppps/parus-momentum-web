let is_menu_open = false

function popUpMenu () {
	let pop_up_menu = document.querySelector('.m-popUpMenu')
	let pop_up_menu_img = document.querySelector('.a-popUpMenuImage')

	!is_menu_open ? openPopUpMenu(pop_up_menu, pop_up_menu_img) : closePopUpMenu(pop_up_menu, pop_up_menu_img)
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
