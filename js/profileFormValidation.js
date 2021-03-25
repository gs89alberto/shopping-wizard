const userNameVal = document.querySelector('#name');
const emailVal = document.querySelector('#email');
const pwdVal = document.querySelector('#pwd');
const pwdConfVal = document.querySelector('#pwdconfirm');
const pfDiv = document.querySelector('#pfDiv');

const lName = document.getElementById('step1name');
const lMail = document.getElementById('step1email');
const lpwd = document.getElementById('step1pwd');
const lConfPwd = document.getElementById('step1confirmpwd');

let pattUserName = new RegExp(userNameVal.getAttribute('pattern'));
let pattEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
let pattPswd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-._/\¡¿?!]).{8,}$/

let userNameErr = 'The user name must have from 5 to 20 characters.'
let userNameValid = 'Ok'

let emailErr = 'Please, insert a valid E-mail'
let emailValid = 'Email Ok'

let pwdErr = 'The password must contain at least one number, one uppercase letter, one lowercase letter and one special character'
let pwdValid = 'Ok'

let pwdConfErr = 'The passwords doesn\'t match'
let pwdConfValid = 'Ok'

function checkUserName() {
    if (userNameVal.value.length === 0) {
        lName.innerHTML = '';
    }   else {
        if (pattUserName.test(userNameVal.value)) {
            lName.innerHTML = userNameValid;
        } else {
            lName.innerHTML = userNameErr;
        }
    }
}

function checkEmail() {
    if (emailVal.value.length === 0) {
        label2.innerHTML = '';
    }   else {
        if (pattEmail.test(emailVal.value)) {
            label2.innerHTML = emailValid;
        } else {
            label2.innerHTML = emailErr;
        }
    }
    label2.setAttribute('for', 'email');
    pfDiv.insertBefore(label2, pfDiv.children[1])
}

function checkPassword() {
    label3.setAttribute('for', 'pwd');
    pfDiv.insertBefore(label3, pfDiv.children[3])
    if (pwdVal.value.length === 0) {
        label3.innerHTML = '';
    }   else {
        if (pattPswd.test(pwdVal.value)) {
            label3.innerHTML = pwdValid;
        } else {
            label3.innerHTML = pwdErr;
        };
    };
}

function checkConfirmPwd() {
    label4.setAttribute('for', 'pwdconfirm');
    pfDiv.insertBefore(label4, pfDiv.children[2])
    if (pwdConfVal.value.length === 0) {
        label4.innerHTML = '';
    }   else {
        if (pwdConfVal.value === pwdVal.value) {
            label4.innerHTML = pwdConfValid;
        } else {
            label4.innerHTML = pwdConfErr;
        };
    };
}





