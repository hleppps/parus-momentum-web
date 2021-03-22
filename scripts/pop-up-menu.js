function openPopUpMenu () {
	let pop_up_menu = document.querySelector('.m-popUpMenu')
	let pop_up_menu_btn_open = document.querySelector('.a-popUpMenuButton-open')
	let pop_up_menu_btn_close = document.querySelector('.a-popUpMenuButton-close')

	pop_up_menu.style.transform = 'none'
	pop_up_menu_btn_open.style.display = 'none'
	pop_up_menu_btn_close.style.display = 'inherit'
}

function closePopUpMenu () {
	let pop_up_menu = document.querySelector('.m-popUpMenu')
	let pop_up_menu_btn_open = document.querySelector('.a-popUpMenuButton-open')
	let pop_up_menu_btn_close = document.querySelector('.a-popUpMenuButton-close')

	pop_up_menu.style.transform = 'translate(120%, 0)'
	pop_up_menu_btn_close.style.display = 'none'
	pop_up_menu_btn_open.style.display = 'inherit'
}



// function ppopUpMenu () {
// 	let menu = document.querySelector('.m-menu-content')
// 	menu.style.transform = 'translate(120%, 0)'
// }
