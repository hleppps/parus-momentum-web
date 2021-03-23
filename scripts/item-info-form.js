function fillItemFormSelect () {
	// запрос
	const values = ['Test', 'Test', 'Test', 'Test', 'Test', 'Test', 'Транспорт', 'Бытовая техника', 'Электротехника', 'Украшения', 'Антиквариат', 'Меблі', 'Інструменти', 'Інше']
	let select = document.querySelector('.m-valuesContainer')

	for (value of values) {
		let li = document.createElement('li')
		li.innerHTML = value
      	li.classList.add('a-value')

      	select.appendChild(li)
	}
}


function changeConditionRate (rate) {
	return () => {
		let rate_stars = document.querySelectorAll('.a-rateStar')
		let input = document.querySelectorAll('.a-inputItemCoditionRate')
		input.value = rate
		let counter = 0
		while (counter < rate_stars.length) {
			counter < rate ? 
				rate_stars[counter].setAttribute('src', 'images/star-selected.svg') :
				rate_stars[counter].setAttribute('src', 'images/star-not-selected.svg');
			// alert(rate_stars[counter].innerHTML)
			counter++
		}
	}
}