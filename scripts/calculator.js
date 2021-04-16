window.addEventListener('load', () => {

	identifyCheckedButton()

	let radio_btns = document.querySelectorAll('.content__term__text__radio-buttons__button')
	for (let button of radio_btns) {
		button.addEventListener('change', identifyCheckedButton)
	}

	let sum_input = document.querySelector('.content__amount-of-money__mobile-select__input')
	sum_input.addEventListener('keyup', calculatorMobileCheckInput)
	let choose_btn_calculator_term_choose_form = document.querySelector('.form_term-choose__footer__button_choose')
	choose_btn_calculator_term_choose_form.addEventListener('click', calculatorMobileCheckInput)
})

let term_array = []
let values_object = {}

function identifyCheckedButton() {
	let radio_btn_1 = document.querySelector('.content__term__text__radio-buttons__button-1')
	let radio_btn_2 = document.querySelector('.content__term__text__radio-buttons__button-2')

	if (radio_btn_1.checked) {fillCalculatorTerms('days')
	} else {fillCalculatorTerms('months')}
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

	term_array = selector === 'days' ? days : months
	let desktop_term_scroller = document.querySelector('.content__term__selection__scroller')

	let desktop_term_scroller_min = document.querySelector('.content__term__selection__critical-values_min')
	desktop_term_scroller_min.innerHTML = term_array[0]
	let desktop_term_scroller_max = document.querySelector('.content__term__selection__critical-values_max')
	desktop_term_scroller_max.innerHTML = term_array[(term_array.length - 1)]

	desktop_term_scroller.setAttribute('min', term_array[0].split(' ')[0])
	desktop_term_scroller.setAttribute('max', term_array[term_array.length -1].split(' ')[0])

	for (let counter in term_array) {
		let splitted_element = term_array[counter].split(' ')

		let li = document.createElement('li')
		li.classList.add('form_term-choose__list__option_' + selector)

		let radio_btn = document.createElement('input')
		radio_btn.setAttribute('type', 'radio')
		radio_btn.setAttribute('name', 'select-term')
		radio_btn.classList.add('form_term-choose__list__option__radio-button', 'radio-button_orange')
		radio_btn.id = 'form_term-choose__radio-button-' + counter
		// if (counter === '0') {radio_btn.setAttribute('checked', 'true')}

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

	values_object['type'] = selector

	// if (window.getComputedStyle(document.querySelector('.calculator__content__term__mobile-select')).display != 'none') {
	// } else {
	// }
		calculatorMobileCheckInput(selector)
		loadScrollers()
}

function calculatorMobileCheckInput(selector) {
	let sum_input = document.querySelector('.content__amount-of-money__mobile-select__input')
	let term_input = document.querySelector('.content__term__mobile-select__button')
	// term_input.innerHTML = 'Оберіть термін'
	term_input.classList.remove('content__term__mobile-select__button_selected')

	let radio_buttons = document.querySelectorAll('.form_term-choose__list__option__radio-button')

	let percent_sum = document.querySelector('.content__total-value__sum_percent_value')
	let repayment_sum = document.querySelector('.content__total-value__sum_repayment_value')

	let radio_button_active = ''

	if (Number(sum_input.value) >= 0 && Number(sum_input.value) <= 50000) {
		values_object['sum'] = sum_input.value
	} else if (sum_input.value > 50000) {
		sum_input.value = 50000
	// }	else if (sum_input.value < 2500) {
	// 	sum_input.value = 2500
	}	else {
		sum_input.value = ''
		percent_sum.innerHTML = 0
		repayment_sum.innerHTML = 0
	}
	
	for (let i = 0; i < radio_buttons.length; i++) {
		if (radio_buttons[i].checked) {
			term_input.innerHTML = term_array[i]
			term_input.classList.add('content__term__mobile-select__button_selected')
			values_object['term'] = term_array[i].split(' ')[0]
		}
	}
	changeScrollerValue(sum_input.value, 0)
	changeScrollerValue(term_input.innerHTML.split(' ')[0], 1)

	calculateTotalSum()
}

function changeScrollerValue(value, counter) {
	const allRanges = document.querySelectorAll(".content__scroller-wrapper");
  const range = allRanges[counter].querySelector(".content__scroller");
  const bubble = allRanges[counter].querySelector(".content__scroller-bubble");

  range.value = value
  setBubble(range, bubble, value);
}


function loadScrollers() {
	const allRanges = document.querySelectorAll(".content__scroller-wrapper");
	allRanges.forEach(wrap => {
	  const range = wrap.querySelector(".content__scroller");
	  const bubble = wrap.querySelector(".content__scroller-bubble");

	  range.addEventListener("input", () => {
  		const val = range.value;
	    setBubble(range, bubble, val);
	  });
	  const val = range.value;
	  setBubble(range, bubble, val);
	});
}


function setBubble(range, bubble, val) {
  let root = document.documentElement;
  let scroller_range_progress = '--scroller-sum-range-progress'

  let sum_input = document.querySelector('.content__amount-of-money__mobile-select__input')
	let term_input = document.querySelector('.content__term__mobile-select__button')

  // const val = range.value;
	// console.log(range, bubble, val)

  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  const newVal = Number(((val - min) * 100) / (max - min));

  let span = document.createElement('span')
  span.classList.add('content__scroller-bubble__text')

	if (range.classList.contains('content__amount-of-money__selection__scroller')) {
		values_object['sum'] = val
		span.innerHTML = '₴'
		sum_input.value = val

	} else {
		scroller_range_progress = '--scroller-term-range-progress'
		values_object['term'] = val
		span.innerHTML = term_array[range.value - range.min].split(' ')[1]

		term_input.innerHTML = val + ' ' + term_array[range.value - range.min].split(' ')[1]
	}

	bubble.innerHTML = val
	bubble.appendChild(span)
	
  let range_progress = `calc(${newVal}% + (${8 - newVal * 0.15}px))`
  bubble.style.left = range_progress
  root.style.setProperty(scroller_range_progress, range_progress)

  calculateTotalSum()
}

function calculateTotalSum() {
	let percent = 0
	let months = 1
	let monthly_payment 

	if (values_object['type'] === 'days') {
		percent = values_object['sum'] < 15000 ? 0.03 : 0.02

	} else {
		percent = values_object['sum'] < 15000 ? 0.015 : 0.01
		months = values_object['term']
	}

  	let percent_sum = document.querySelector('.content__total-value__sum_percent_value')
  	percent_sum.innerHTML = (values_object['sum'] * percent * months).toFixed(1)
  	let repayment_sum = document.querySelector('.content__total-value__sum_repayment_value')
  	repayment_sum.innerHTML = (Number(values_object['sum']) + Number(percent_sum.innerHTML)).toFixed(1)
  	let monthly_payment_sum = document.querySelector('.content__total-value__sum_monthly_value')
  	monthly_payment_sum.innerHTML = values_object['type'] === 'days' ? repayment_sum.innerHTML : (Number(repayment_sum.innerHTML)/months + Number(percent_sum.innerHTML)/months).toFixed(0)
}

