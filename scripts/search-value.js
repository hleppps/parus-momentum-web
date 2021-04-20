function filterFunction(that, event) {
    let container, input, filter, li, input_val;
    container = $(that).closest(".searchable");
    input_val = container.find("input").val().toUpperCase();

    if (["ArrowDown", "ArrowUp", "Enter"].indexOf(event.key) != -1) {
        keyControl(event, container)
    } else {
        li = container.find("ul li");
        li.each(function (i, obj) {
            if ($(this).text().toUpperCase().indexOf(input_val) > -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
        
        let li_amount = container.find("ul li:visible").length
        li_amount === 0 ? incorrectSearchValue(li_amount, true) : incorrectSearchValue(li_amount)
        container.find("ul li").removeClass("selected");
        setTimeout(function () {
            container.find("ul li:visible").first().addClass("selected");
        }, 1)
    }
}

function keyControl(e, container) {
    if (e.key == "ArrowDown") {

        if (container.find("ul li").hasClass("selected")) {
            if (container.find("ul li:visible").index(container.find("ul li.selected")) + 1 < container.find("ul li:visible").length) {
                container.find("ul li.selected").removeClass("selected").nextAll().not('[style*="display: none"]').first().addClass("selected");
            }

        } else {
            container.find("ul li:first-child").addClass("selected");
        }

    } else if (e.key == "ArrowUp") {

        if (container.find("ul li:visible").index(container.find("ul li.selected")) > 0) {
            container.find("ul li.selected").removeClass("selected").prevAll().not('[style*="display: none"]').first().addClass("selected");
        }
    } else if (e.key == "Enter") {
        container.find("input").val(container.find("ul li.selected").text()).blur();
        // onSelect(container.find("ul li.selected").text())
    }

    // container.find("ul li.selected")[0].scrollIntoView({
    //     behavior: "smooth",
    // });
}

function selectizeEventListener() {
    $(".searchable input").focus(function () {
        $(this).closest(".searchable").find("ul").show();
        $(this).closest(".searchable").find("ul li").show();
    });
    $(".searchable input").blur(function () {
        let that = this;
        setTimeout(function () {
            $(that).closest(".searchable").find("ul").hide();
            let input = document.querySelector('.category-selection__input')
            let options_list = fillItemFormSelect()
            if (!(options_list.includes(input.value))) {input.value = ''}
            incorrectSearchValue()
        }, 200);
    });

    $(document).on('click', '.searchable ul li', function () {
        $(this).closest(".searchable").find("input").val($(this).text()).blur();
        // onSelect($(this).text())
    });

    $(".searchable ul li").hover(function () {
        $(this).closest(".searchable").find("ul li.selected").removeClass("selected");
        $(this).addClass("selected");
    });
}

function incorrectSearchValue(len = 0, state = null) {
    console.log('q')
    let option_disabled = document.querySelector('.category-selection__option-value_disabled')
    option_disabled.classList.add('category-selection__option-value_disabled_hide')
    if (state) {
        option_disabled.classList.remove('category-selection__option-value_disabled_hide')
    }

}