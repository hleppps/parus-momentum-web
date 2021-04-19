let upload_images_container = []
let files_len = 0

window.addEventListener('load', () => {
	loadItemForm()
	fillItemFormSelect()

	let telegram_buttons = document.querySelectorAll('.button_telegram')

	let rate_stars = document.querySelectorAll('.item-rating__option-value')
	for (let i = 0; i < rate_stars.length; i++) {
		rate_stars[i].addEventListener('click', changeConditionRate(i))
	}

	let file_input = document.querySelector('.photos-upload__loading-container')
	file_input.addEventListener('change', () => {previewFiles(file_input)})

	let filter_function = document.querySelector('.category-selection__input')
	filter_function.addEventListener('keyup', (event) => {filterFunction(filter_function, event)})
	filter_function.addEventListener('keyup', highlightSelectedValue)
	filter_function.addEventListener('mouseover', highlightSelectedValue)
})

function loadItemForm() {
	const first_container = document.querySelector(".item-description-wrapper");
	const template = document.querySelector(".template_item-description-wrapper");
	const firstClone = template.content.cloneNode(true);
	first_container.appendChild(firstClone);

	selectizeEventListener()
}



function fillItemFormSelect () {
	// запрос
	const values = ['Нерухомість','Транспорт', 'Побутова техніка', 'Электротехніка', 'Украшения', 'Антиквариат', 'Меблі', 'Інструменти', 'Інше', 'Тест']
	let select = document.querySelector('.category-selection__options-container')

	for (value of values) {
		let li = document.createElement('li')
		li.innerHTML = value
	    li.classList.add('category-selection__option-value')

	    select.appendChild(li)
	}
}

function highlightSelectedValue() {
	let input_value = document.querySelector('.category-selection__input').value
	let options = document.querySelectorAll('.category-selection__option-value')
	for (let option of options) {
		// option.style.color = '#005182'
		option.classList.remove('category-selection__option-value_selected')
		if (option.innerHTML === input_value) {
			// option.style.color = '#E96325'
			option.classList.add('category-selection__option-value_selected')
		}
	}
}

function changeConditionRate(rate) {
	return () => {
		let rate_stars = document.querySelectorAll('.item-rating__option-value')
		let input = document.querySelector('.item-rating__rate')
		let counter = rate_stars.length - 1
		while (counter >= 0) {
			counter >= rate ? 
				rate_stars[counter].classList.add('item-rating__option-value_selected') :
				rate_stars[counter].classList.remove('item-rating__option-value_selected')
			counter--
		}
		input.value = 5- rate
	}
}

function previewFiles(uploaded_files) {
  let files = uploaded_files.files
  files_len += files.length

  if (files_len > 10) {
  	files_len -= files.length
  	alert('Не более 10 картинок!')

  	return
  }


  function readAndPreview(file) {
  	// console.log(file.size)
    if (( /\.(jpe?g|png|tiff)$/i.test(file.name)) && (file.size <= 10000000) ) {
      var reader = new FileReader();

      reader.addEventListener("load", function () {

      	upload_images_container.push(this.result)

      	if (upload_images_container.length === files_len) {
      		// console.log(upload_images_container)
      		imageDrawer(upload_images_container)
      	}

      }, false);

      reader.readAsDataURL(file);
    } else {
    	if (file.size >= 10000000) {
    		let popup_error = document.querySelector('.popup-error')
    		popup_error.classList.add('popup-error_show')
    		document.body.classList.add('body_unscroll')
    		setTimeout(() => {
    			popup_error.classList.remove('popup-error_show')
    			document.body.classList.remove('body_unscroll')
    		}, 1500)
    	}
    	files_len--
    }
  }

  if (files) {
    [].forEach.call(files, readAndPreview);
  }
}


function imageDrawer(images) {
	let photo_upload_block = document.querySelector('.photos-upload__container_basic') //parent
	let сlick_upload_blocks = document.querySelectorAll('.photos-upload__container__photo-block')
	let amount_of_uploaded_photos = document.querySelector('.a-jsAddedText')

	cleanContainers()

	// amount_of_uploaded_photos.style.display = 'none'
	amount_of_uploaded_photos.classList.remove('a-jsAddedText_show')
	amount_of_uploaded_photos.innerHTML = '+' + (images.length - 4) 
	// amount_of_uploaded_photos.style.right = '6%'

	for (let index in images) {
		if ((images.length > 4 && index >= images.length - 4) || (images.length <= 4)) {

			let image = new Image()
			image.src = images[index]


			image.classList.add('a-jsAddedImage')

				// TODO remove function
			image.onload = function() {

				let added_container = document.createElement('div')
				added_container.appendChild(image)
				added_container.classList.add('m-jsAddedImageContainer')

				let close_button = document.createElement('button')
			  	close_button.classList.add('a-jsAddedCloseButton')
			  	close_button.onclick = removePhotos(index)
				added_container.appendChild(close_button)			


				// сlick_upload_blocks[0].style.display = 'none'
				сlick_upload_blocks[0].classList.add('photos-upload__container__photo-block_hide')

				switch (images.length) {
					case 1:
						сlick_upload_blocks[1].classList.remove('photos-upload__container__photo-block_hide')
						// сlick_upload_blocks[1].style.display = 'inherit'

						// сlick_upload_blocks[1].style.borderColor = '#a8d6e4'

						// сlick_upload_blocks[1].style.backgroundImage = 'url(images/upload-photo-active.svg)'
						сlick_upload_blocks[1].classList.add('photos-upload__container__photo-block_active')

						photo_upload_block.insertBefore(added_container, сlick_upload_blocks[0]);
						break

					case 2:
						photo_upload_block.insertBefore(added_container, сlick_upload_blocks[0]);
						photo_upload_block.insertBefore(added_container, сlick_upload_blocks[1]);

						сlick_upload_blocks[1].classList.add('photos-upload__container__photo-block_hide')
						// сlick_upload_blocks[1].style.display = 'none'

						// сlick_upload_blocks[2].style.borderColor = '#a8d6e4'

						// сlick_upload_blocks[2].style.backgroundImage = 'url(images/upload-photo-active.svg)'
						сlick_upload_blocks[2].classList.add('photos-upload__container__photo-block_active')
						break

					default:
						// сlick_upload_blocks[1].style.display = 'none'\
						сlick_upload_blocks[1].classList.add('photos-upload__container__photo-block_hide')

						// сlick_upload_blocks[2].style.borderColor = '#a8d6e4'

						// сlick_upload_blocks[2].style.backgroundImage = 'url(images/upload-photo-active.svg)'
						сlick_upload_blocks[2].classList.add('photos-upload__container__photo-block_active')


						photo_upload_block.appendChild(added_container)

						let added_image_containers = document.querySelectorAll('.m-jsAddedImageContainer')

						for (let i = 0; i < added_image_containers.length; i++) {
							added_image_containers[i].style.position = 'absolute'
							added_image_containers[i].style.marginLeft = 25*i + 'px'
						}

						if (images.length <= 4) {
							// amount_of_uploaded_photos.display = 'none'
							amount_of_uploaded_photos.classList.remove('a-jsAddedText_show')
						} else {
							// amount_of_uploaded_photos.style.display = 'inherit'
							amount_of_uploaded_photos.classList.add('a-jsAddedText_show')
						}
						break
				}
			}
		}
	}
	let photos_container = document.querySelector('.photos-upload__unloading-container')
	photos_container.value = upload_images_container
	// photos_container.value = photos_container.value.slice(1200000, -1)
	// console.log(photos_container.value.length)
}
		

function removePhotos(index) {

		return () => {
			upload_images_container.splice(index, 1)
			files_len -= 1

			let photos_container = document.querySelector('.photos-upload__unloading-container')
  			photos_container.value = upload_images_container

			imageDrawer(upload_images_container)
			let сlick_upload_blocks = document.querySelectorAll('.photos-upload__container__photo-block')

			// сlick_upload_blocks[0].style.display = 'inherit'
			сlick_upload_blocks[0].classList.remove('photos-upload__container__photo-block_hide')

			// сlick_upload_blocks[0].style.borderColor = '#a8d6e4'
			// сlick_upload_blocks[0].style.backgroundImage = 'url(images/upload-photo-active.svg)'


			for (let i = 1; i <= 2; i++) {
				// сlick_upload_blocks[i].style.borderColor = '#BEE0EB'
				// сlick_upload_blocks[i].style.backgroundImage = 'url(images/upload-photo.svg)'
				сlick_upload_blocks[i].classList.remove('photos-upload__container__photo-block_active')

			}
		}		
}

function cleanContainers() {
	let added_image_containers = document.querySelectorAll('.m-jsAddedImageContainer')
	for (let i = 0; i < added_image_containers.length; i++ ) {
	  added_image_containers[i].outerHTML = ""
	}
}