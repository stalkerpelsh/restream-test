function toggleMenu() {
    const toggler = document.getElementById('eating-toggle');
    const menuSchedule = document.querySelectorAll('.menu__day');
    const menuText = document.querySelectorAll('.menu__text');
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
}


var buttons = document.querySelectorAll(".menu-comment__btn");

buttons.forEach(button => {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        const radios = this.closest('.menu__list').querySelectorAll('.menu-item');
        for (let i = 0; i < radios.length; i++) {
            radios[i].querySelectorAll('.menu-item__radio')[0].checked = true;
        }
    })
});