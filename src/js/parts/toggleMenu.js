const toggler = document.getElementById('eating-toggle');
const menuSchedule = document.querySelectorAll('.menu__day');
const menuText = document.querySelectorAll('.menu__text');
const eatVar = document.querySelectorAll(".header__switch-variant");

if (toggler) {
    toggler.addEventListener("change", function (event) {
        event.preventDefault();
        if (toggler.checked != true) {
            for (let i = 0; i < menuSchedule.length; i++) {
                menuSchedule[i].classList.remove("menu__day_visible");
            }
            menuText[0].classList.add("menu__text_visible");
        } else {
            for (let i = 0; i < menuSchedule.length; i++) {
                menuSchedule[i].classList.add("menu__day_visible");
            }
            menuText[0].classList.remove("menu__text_visible");
        }
    })

    eatVar[0].addEventListener("click", function (event) {
        event.preventDefault();
        for (let i = 0; i < menuSchedule.length; i++) {
            menuSchedule[i].classList.remove("menu__day_visible");
        }
        menuText[0].classList.add("menu__text_visible");
        toggler.checked = false;
    })

    eatVar[1].addEventListener("click", function (event) {
        event.preventDefault();
        for (let i = 0; i < menuSchedule.length; i++) {
            menuSchedule[i].classList.add("menu__day_visible");
        }
        menuText[0].classList.remove("menu__text_visible");
        toggler.checked = true;
    })
}
