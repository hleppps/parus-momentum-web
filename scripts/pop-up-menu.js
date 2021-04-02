let is_menu_open = false

window.addEventListener('load', () => {
	document.querySelector('.header__mob').addEventListener('click', event => {
    if (event.target.className === 'header__mob__button_pop-up-menu') {
      popUpMenu()
    } else if (event.target.classList.contains('pop-up-menu__contacts_sub__button')) {
    	buttonClosePopUpMenu()
    } 
  })


	// let pop_up_menu_btn = document.querySelector('.header__mob__button_pop-up-menu')
	// pop_up_menu_btn.addEventListener('click', popUpMenu)

	// let close_pop_up_menu_btn = document.querySelector('.pop-up-menu__contacts_sub__button')
	// close_pop_up_menu_btn.addEventListener('click', buttonClosePopUpMenu)
})

function popUpMenu () {
	let underlay = document.querySelector('.underlay')
	let pop_up_menu = document.querySelector('.header_mob__pop-up-menu')
	let pop_up_menu_btn = document.querySelector('.header__mob__button_pop-up-menu')
	let body = document.body

	if (!is_menu_open) {
		// body.style.overflowY = 'hidden'
		body.classList.add('body_show-overlay-element')


		underlay.style.display = 'inherit'
		underlay.classList.add('underlay_show-pop-up-menu')
		underlay.addEventListener('click', underlayClosePopUpMenu)

		openPopUpMenu(pop_up_menu, pop_up_menu_btn)
	} else {
		// underlay.style.display = 'none'
		underlay.classList.remove('underlay_show-pop-up-menu')

		// body.style.overflowY = 'scroll'
		body.classList.remove('body_show-overlay-element')


		closePopUpMenu(pop_up_menu, pop_up_menu_btn)
	}
}

function openPopUpMenu (menu, btn) {
	btn.style.backgroundImage = 'url(images/pop-up-menu-btn-close.svg)'
	menu.style.transform = 'none'

	is_menu_open = true
}

function closePopUpMenu (menu, btn) {
	btn.style.backgroundImage = 'url(images/pop-up-menu-btn-open.svg)'
	menu.style.transform = 'translate(120%, 0)'

	is_menu_open = false
}

function underlayClosePopUpMenu() {
	let underlay = document.querySelector('.underlay')
	underlay.removeEventListener('click', underlayClosePopUpMenu)
	is_menu_open = true
	popUpMenu()
}

function buttonClosePopUpMenu() {
	is_menu_open = true
	popUpMenu()
}

