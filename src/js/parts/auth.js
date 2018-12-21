const logBtn = document.getElementById('log-btn');
let passState = false;
let loginState = false;

const removeValidation = () => {
    const errors = document.querySelectorAll('.login-form__message');
    const inputGroup = document.querySelectorAll('.login-form__input-group');
    for (let i = 0; i < errors.length; i++) {
        errors[i].remove()
        inputGroup[i].classList.remove("login-form__input-group_error");
    }
};


const checkCorrectValue = () => {
    if (loginState && passState) {
        document.location.href = '/menu-schedule.html';
    }
}

const loginCheck = () => {
    const login = document.getElementById('email');
    const errorLoginMessage = "<span class='login-form__message'>Правильный логин - pvp@shoot.halal</span>";
    const emptyMessage = "<span class='login-form__message'>Поле должно быть заполнено</span>";

    if (!login.value) {
        login.parentNode.insertAdjacentHTML('beforeend', emptyMessage);
    } else if (login.value !== "pvp@shoot.halal") {
        login.parentNode.insertAdjacentHTML('beforeend', errorLoginMessage);
        login.parentNode.classList.add("login-form__input-group_error");
    } else {
        loginState = true;
    }
}
const passCheck = () => {
    const pass = document.getElementById('pass');
    const errorPassMessage = "<span class='login-form__message'>Правильный пароль - salam</span>";
    const emptyMessage = "<span class='login-form__message'>Поле должно быть заполнено</span>";

    if (!pass.value) {
        pass.parentNode.insertAdjacentHTML('beforeend', emptyMessage);
    } else if (pass.value !== "salam") {
        pass.parentNode.insertAdjacentHTML('beforeend', errorPassMessage);
        pass.parentNode.classList.add("login-form__input-group_error");
    } else {
        passState = true;
    }
}

if (logBtn) {
    const inputs = document.querySelectorAll('.login-form__input');
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', function () {
            removeValidation();
            loginCheck();
            passCheck();
        })
    }
    logBtn.addEventListener('click', function (event) {
        event.preventDefault();
        removeValidation();
        loginCheck();
        passCheck();
        checkCorrectValue();
    });
    document.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            removeValidation();
            loginCheck();
            passCheck();
            checkCorrectValue();
        }
    })
}