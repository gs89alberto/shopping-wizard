let pattUserName = /^[A-Za-z0-9 ]{5,}$/;
let pattEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
let pattPswd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-._/\¡¿?!]).{8,}$/;

let userNameErr = 'The user name must have from 5 to 20 characters.';


function checkUserName() {
    const userNameVal = document.querySelector('#name');
    const lName = document.getElementById('step1name');
    if (userNameVal.value.length === 0) {
        lName.innerHTML = '';
        userNameVal.classList.remove('invalidForm', 'validForm');
        lName.classList.remove('labelFormValidationStyle');
    }   else {
        if (!pattUserName.test(userNameVal.value)) {
            userNameVal.classList.add('invalidForm');
            lName.classList.add('labelFormValidationStyle');
            lName.innerHTML = userNameErr;
        } else {
            lName.classList.remove('labelFormValidationStyle');
            userNameVal.classList.remove('invalidForm');
            lName.innerHTML = '';
            userNameVal.classList.add('validForm');
        }
    }
}

function checkEmail() {
    const emailVal = document.querySelector('#email');
    const lMail = document.getElementById('step1email');
    let emailErr = 'Please, insert a valid E-mail'
    if (emailVal.value.length === 0) {
        lMail.innerHTML = '';
        emailVal.classList.remove('invalidForm', 'validForm');
        lMail.classList.remove('labelFormValidationStyle');
    }   else {
        if (!pattEmail.test(emailVal.value)) {
            emailVal.classList.add('invalidForm');
            lMail.classList.add('labelFormValidationStyle');
            lMail.innerHTML = emailErr;
        } else {
            lMail.classList.remove('labelFormValidationStyle');
            emailVal.classList.remove('invalidForm');
            lMail.innerHTML = '';
            emailVal.classList.add('validForm');
        }
    }
}

function checkPassword() {
    const pwdVal = document.querySelector('#pwd');
    const lpwd = document.getElementById('step1pwd');
    let pwdErr = 'The password must contain at least one number, one uppercase letter, one lowercase letter and one special character'
    if (pwdVal.value.length === 0) {
        lpwd.innerHTML = '';
        pwdVal.classList.remove('invalidForm', 'validForm');
        lpwd.classList.remove('labelFormValidationStyle');
    }   else {
        if (!pattPswd.test(pwdVal.value)) {
            pwdVal.classList.add('invalidForm');
            lpwd.classList.add('labelFormValidationStyle');
            lpwd.innerHTML = pwdErr;
        } else {
            lpwd.classList.remove('labelFormValidationStyle');
            pwdVal.classList.remove('invalidForm');
            lpwd.innerHTML = '';
            pwdVal.classList.add('validForm');
        };
    };
}

function checkConfirmPwd() {
    const pwdVal = document.querySelector('#pwd');
    const pwdConfVal = document.querySelector('#pwdconfirm');
    const lConfPwd = document.getElementById('step1confirmpwd');
    let pwdConfErr = 'The passwords doesn\'t match'
    if (pwdConfVal.value.length === 0) {
        lConfPwd.innerHTML = '';
        pwdConfVal.classList.remove('invalidForm', 'validForm');
        lConfPwd.classList.remove('labelFormValidationStyle');
    }   else {
        if (pwdConfVal.value !== pwdVal.value) {
            pwdConfVal.classList.add('invalidForm');
            lConfPwd.classList.add('labelFormValidationStyle');
            lConfPwd.innerHTML = pwdConfErr;
        } else {
            lConfPwd.classList.remove('labelFormValidationStyle');
            pwdConfVal.classList.remove('invalidForm');
            lConfPwd.innerHTML = '';
            pwdConfVal.classList.add('validForm');
        };
    };
}

function clearLabelForms() {
    const userNameVal = document.querySelector('#name');
    const emailVal = document.querySelector('#email');
    const pwdVal = document.querySelector('#pwd');
    const pwdConfVal = document.querySelector('#pwdconfirm');
    
    const lName = document.getElementById('step1name');
    const lMail = document.getElementById('step1email');
    const lpwd = document.getElementById('step1pwd');
    const lConfPwd = document.getElementById('step1confirmpwd');

    userNameVal.classList.remove('invalidForm', 'validForm');
    emailVal.classList.remove('invalidForm', 'validForm');
    pwdVal.classList.remove('invalidForm', 'validForm');
    pwdConfVal.classList.remove('invalidForm', 'validForm');

    lName.innerHTML = '';
    lMail.innerHTML = '';
    lpwd.innerHTML = '';
    lConfPwd.innerHTML = '';

    lName.classList.remove('labelFormValidationStyle');
    lMail.classList.remove('labelFormValidationStyle');
    lpwd.classList.remove('labelFormValidationStyle');
    lConfPwd.classList.remove('labelFormValidationStyle');
}


