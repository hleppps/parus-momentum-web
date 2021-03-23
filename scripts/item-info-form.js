let input_container = []
let is_first_image_loaded = false
let is_second_image_loaded = false
let image_counter = 1


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

  function readAndPreview(file) {

    if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
      var reader = new FileReader();

      reader.addEventListener("load", function () {

      	input_container.push(this.result)
      	console.log(input_container)
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
	let first_image = document.querySelector('#uploadImage-1')
	let second_image = document.querySelector('#uploadImage-2')
	let image_container = document.querySelector('.m-uploadBlock')

	if (is_first_image_loaded === false && len <= 2) {
		applyImageStyleSettings(first_image)
		first_image.src = link
		is_first_image_loaded = true

	} else if (is_second_image_loaded === false && len <= 2) {
		applyImageStyleSettings(second_image)
		second_image.src = link
		is_second_image_loaded = true

	} else {
		image_container.innerHTML = ''

		for (image of input_container) {
			let img = document.createElement('img')
	    img.classList.add('a-jsAddedImage')
	    img.src = image
	    image_container.appendChild(img)
		}
	}
}

function applyImageStyleSettings(image) {
	image.src = ''
	image.style.width = '70px'
	image.style.height = '70px'
	image.style.border = '1px solid #fff'
	image.style.borderRadius = '15px'	
}
