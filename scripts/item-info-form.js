let upload_files_container = []
let photos_counter = 0

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
			counter++
		}
	}
}

function previewFiles() {
  let files = document.querySelector('.a-uploadFilesInput').files
  let files_len = files.length

  if ((files_len + upload_files_container.length) > 10) {
  	alert('Не более 10 картинок!')
  	return
  }

  function readAndPreview(file) {

    if ( /\.(jpe?g|png|tiff)$/i.test(file.name) ) {
      var reader = new FileReader();

      reader.addEventListener("load", function () {

      	upload_files_container.push(this.result)
				imageDrawer(this.result, files_len)      	

      }, false);

      reader.readAsDataURL(file);
    }

  }

  if (files) {
    [].forEach.call(files, readAndPreview);
  }
}


function imageDrawer(link, len) {
	photos_counter++
	if (photos_counter > 4) {
		return
	}
	let photo_upload_block = document.querySelector('.m-uploadBlocksBasic') //parent
	let сlick_upload_blocks = document.querySelectorAll('.m-clickUploadBlock')
	let image = new Image()
	image.src = link
	image.onload = function() {

		if (image.width <= image.height) {
			image.classList.add('a-jsAddedImageWidth')
		} else {
			image.classList.add('a-jsAddedImageHeight')
		}

		let added_container = document.createElement('div')
		added_container.appendChild(image)
		added_container.classList.add('m-jsAddedImageContainer')

		сlick_upload_blocks[0].style.display = 'none'

		if (len >= 3 || upload_files_container.length >= 3) {


			сlick_upload_blocks[1].style.display = 'none'
			photo_upload_block.appendChild(added_container)

			let added_image_containers = document.querySelectorAll('.m-jsAddedImageContainer')

				for (let i = 0; i < added_image_containers.length; i++) {
					added_image_containers[i].style.position = 'absolute'
					added_image_containers[i].style.marginLeft = 25*i + 'px'
				}
			

		} else if (len === 2 || upload_files_container.length === 2) {
			photo_upload_block.insertBefore(added_container, сlick_upload_blocks[0]);
			photo_upload_block.insertBefore(added_container, сlick_upload_blocks[1]);
			сlick_upload_blocks[1].style.display = 'none'

		} else if (len === 1 && upload_files_container.length === 1) {
			сlick_upload_blocks[1].style.display = 'inherit'

			photo_upload_block.insertBefore(added_container, сlick_upload_blocks[0]);
		}
		let added_image_containers = document.querySelectorAll('.m-jsAddedImageContainer')

    let close_button = document.createElement('img')
    close_button.classList.add('a-jsAddedCloseButton')
    close_button.src = 'images/remove-img-btn.svg'
    added_image_containers[added_image_containers.length - 1].appendChild(close_button)
		handleCloseButtonEvent(added_image_containers.length - 1)

	}

}
// function imageDrawer(link, len) {

// 	let image_container = document.querySelector('.m-uploadBlock')

// 	image_container.innerHTML = ''
// 	for (image of input_container.slice(0,4)) {
// 		let img = document.createElement('img')
//     img.classList.add('a-jsAddedImage')
//     img.src = image
//     image_container.appendChild(img)

// 	}

// 	let close_buttons = document.querySelectorAll('.a-jsAddedCloseButton')
	
// 	for (let i = 0; i < close_buttons.length; i++) {
// 		close_buttons[i].style.marginLeft = (8 + (27*i)) + 'px'
// 	}


// }

function removePhotos(number) {
	return () => {
		photos_counter = 0
		upload_files_container.splice(number, 1)

		let сlick_upload_blocks = document.querySelectorAll('.m-clickUploadBlock')
		сlick_upload_blocks[0].style.display = 'inherit'
		сlick_upload_blocks[1].style.display = 'inherit'


		let added_image_containers = document.querySelectorAll('.m-jsAddedImageContainer')
		for (let i = 0; i < added_image_containers.length; i++ ) {
		  added_image_containers[i].outerHTML = ""
		}

		if (upload_files_container.length === 0) {
		} else { 
			for (value of upload_files_container) {
				imageDrawer(value, upload_files_container.length)
			}
		}
	}
}