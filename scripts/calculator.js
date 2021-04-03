window.addEventListener('load', () => {
	loadScrollers()

	let open_calculator_term_choose_form = document.querySelector('.content__term__mobile-select__input')
	open_calculator_term_choose_form.addEventListener('click', () => {fillCalculatorTerms('months')})
})

function loadScrollers() {
	const allRanges = document.querySelectorAll(".content__scroller-wrapper");
	allRanges.forEach(wrap => {
	  const range = wrap.querySelector(".content__scroller");
	  const bubble = wrap.querySelector(".content__scroller-bubble");

	  range.addEventListener("input", () => {
	    setBubble(range, bubble);
	  });
	  setBubble(range, bubble);
	});
}

function setBubble(range, bubble) {
  const val = range.value;
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  const newVal = Number(((val - min) * 100) / (max - min));
  bubble.innerHTML = val + ' ₴';

  bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}

function fillCalculatorTerms(selector) {
	let list = document.querySelector('.form_term-choose__list')
	list.innerHTML = ''
	const days = ['5 діб', '6 діб', '7 діб', '8 діб', '9 діб', '10 діб', '11 діб', 
				'12 діб', '13 діб', '14 діб', '15 діб', '16 діб', '17 діб', '18 діб', 
				'19 діб', '20 діб', '21 доба', '22 доби', '23 доби', '24 доби', '25 діб', 
				'26 діб', '27 діб', '28 діб', '29 діб',  '30 діб']

	const months = ['1 місяць', '2 місяці', '3 місяці', '4 місяці', '5 місяців', '6 місяців', 
				'7 місяців', '8 місяців', '9 місяців', '10 місяців', '11 місяців', '12 місяців']

	let array = selector === 'days' ? days : months

	for (let counter in array) {
		let splitted_element = array[counter].split(' ')

		let li = document.createElement('li')
		li.classList.add('form_term-choose__list__option_' + selector)

		let radio_btn = document.createElement('input')
		radio_btn.setAttribute('type', 'radio')
		radio_btn.setAttribute('name', 'select-term')
		radio_btn.classList.add('form_term-choose__list__option__radio-button', 'radio-button_orange')
		radio_btn.id = 'form_term-choose__radio-button-' + counter
		if (counter === '0') {radio_btn.setAttribute('checked', '')}

		let label = document.createElement('label')
		label.classList.add('form_term-choose__list__option__label', 'radio-button_orange__label')
		label.setAttribute('for', 'form_term-choose__radio-button-' + counter)

		let span_value = document.createElement('span')
		span_value.innerHTML = splitted_element[0]
		span_value.classList.add('form_term-choose__list__option__value')

		let span_text = document.createElement('span')
		span_text.innerHTML = splitted_element[1]
		span_text.classList.add('form_term-choose__list__option__text')


		li.appendChild(radio_btn)
		li.appendChild(label)

		li.appendChild(span_value)
		li.appendChild(span_text)


		list.appendChild(li)
	}



}