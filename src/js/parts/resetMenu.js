const buttons = document.querySelectorAll(".menu-comment__btn");

buttons.forEach(button => {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        const radios = this.closest('.menu__list').querySelectorAll('.menu-item');
        for (let i = 0; i < radios.length; i++) {
            radios[i].querySelectorAll('.menu-item__radio')[0].checked = true;
        }
    })
});