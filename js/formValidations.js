const userNameVal = document.querySelector('#name');
const emailVal = document.querySelector('#email')
const pfDiv = document.querySelector('#pfDiv');

let pattUserName = new RegExp(userNameVal.getAttribute('pattern'));
let pattEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

let label = document.createElement('label');
let label2 = document.createElement('label');

let userNameErr = 'The user name must have from 5 to 20 characters.'
let userNameValid = 'Ok'

let emailErr = 'Please, insert a valid E-mail'
let emailValid = 'Email Ok'

function checkUserName() {
    label.setAttribute('for', 'name');
    pfDiv.insertBefore(label, pfDiv.children[0])
    if (userNameVal.value.length === 0) {
        label.innerHTML = '';
    }   else {
        if (pattUserName.test(userNameVal.value)) {
            label.innerHTML = userNameValid;
        } else {
            label.innerHTML = userNameErr;
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
    label2.setAttribute('for', 'email');
    pfDiv.insertBefore(label2, pfDiv.children[1])
    if (emailVal.value.length === 0) {
        label2.innerHTML = '';
    }   else {
        if (pattEmail.test(emailVal.value)) {
            label2.innerHTML = emailValid;
        } else {
            label2.innerHTML = emailErr;
        }
    }
}



emailVal.addEventListener('keyup', checkEmail)





