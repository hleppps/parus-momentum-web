let input_container = []
let image_container = document.querySelector('.m-uploadBlock')
let image_container_default = image_container.innerHTML
// let test = true

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
	let upload_file_input_container = document.querySelector('.a-uploadFileInputContainer').value
  let files = document.querySelector('.a-uploadFileInput').files;
  let files_len = files.length

  if ((files_len + input_container.length) > 10) {
  	alert('Не более 10 картинок')
  	return
  }

  function readAndPreview(file) {

    if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
      var reader = new FileReader();

      reader.addEventListener("load", function () {

      	input_container.push(this.result)
      	upload_file_input_container = input_container
      	
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

	let image_container = document.querySelector('.m-uploadBlock')

	image_container.innerHTML = ''
	for (image of input_container.slice(0,4)) {
		let img = document.createElement('img')
    img.classList.add('a-jsAddedImage')
    img.src = image
    image_container.appendChild(img)

    let close_button = document.createElement('img')
    close_button.classList.add('a-jsAddedCloseButton')
    close_button.src = 'images/remove-img-btn.svg'
    image_container.appendChild(close_button)
	}

	let close_buttons = document.querySelectorAll('.a-jsAddedCloseButton')
	
	for (let i = 0; i < close_buttons.length; i++) {
		close_buttons[i].style.marginLeft = (8 + (27*i)) + 'px'
	}

	handleCloseButtonEvent() 

}

// setViewport(document.getElementsByTagName("img")[0], 10, 10, 70, 70);

function setViewport(img, x, y, width, height) {
  img.style.left = "-" + x + "px";
  img.style.top  = "-" + y + "px";

  if (width !== undefined) {
      img.parentNode.style.width  = width  + "px";
      img.parentNode.style.height = height + "px";
  }
}

function removePhotos(number) {
	return () => {
		input_container.splice(number, 1)
		if (input_container.length === 0) {
			image_container.innerHTML = image_container_default
		} else { 
			for (value of input_container) {
				imageDrawer(value, input_container.length)
			}
		}
	}
}