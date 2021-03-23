function handleEvent() {
	let pop_up_menu_btn = document.querySelector('.a-popUpMenuButton')
	pop_up_menu_btn.addEventListener('click', popUpMenu)

	let rate_stars = document.querySelectorAll('.a-rateStar')
	for (let i = 0; i < rate_stars.length; i++) {
		rate_stars[i].addEventListener('mousedown', changeConditionRate(+i+1))
	}
}