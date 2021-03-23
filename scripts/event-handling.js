function handleEvent() {
	let pop_up_menu_btn = document.querySelector('.a-popUpMenuButton')
	pop_up_menu_btn.addEventListener('click', popUpMenu)

	let rate_stars = document.querySelectorAll('.a-rateStar')
	for (let i = 0; i < rate_stars.length; i++) {
		rate_stars[i].addEventListener('click', changeConditionRate(+i+1))
	}

	let file_input = document.querySelector('.a-uploadFileInput')
	file_input.addEventListener('change', previewFiles)
}