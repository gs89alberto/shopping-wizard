let pattAddressUserName = /^[A-Za-z0-9 ]{5,}$/;
let pattBirthday = /^([0-9]{4})\/([0-9]{2})\/([0-9]{2})$/;
let pattAddAddressOne = /^\s*\S+(?:\s+\S+){2}/;
let pattAddPC = /^([0-9]{5})$/

let addFirstNameErr = 'The first name must have from 5 to 20 characters.';
let addLastNameErr = 'The last name must have from 5 to 20 characters.';
let addBirthdErr = 'Please insert a valid date.'
let addAddressErr = 'Please insert a valid address.'
let addPostalCErr = 'The Postal Code must have 5 digits.'
let addCountryErr = 'Please select a country.'

function checkName() {
    const addFirstNameVal = document.querySelector('#addFirstName');
    const lAName = document.getElementById('step2name');
    if (addFirstNameVal.value.length === 0) {
        lAName.innerHTML = '';
        addFirstNameVal.classList.remove('invalidForm', 'validForm');
        lAName.classList.remove('labelFormValidationStyle');
    }   else {
        if (!pattAddressUserName.test(addFirstNameVal.value)) {
            addFirstNameVal.classList.add('invalidForm');
            lAName.classList.add('labelFormValidationStyle');
            lAName.innerHTML = addFirstNameErr;
        } else {
            lAName.classList.remove('labelFormValidationStyle');
            addFirstNameVal.classList.remove('invalidForm');
            lAName.innerHTML = '';
            addFirstNameVal.classList.add('validForm');
        }
    }
}

function checkLastName() {
    const addLastNameVal = document.querySelector('#addLastName');
    const lALName = document.getElementById('step2lastname');
    if (addLastNameVal.value.length === 0) {
        lALName.innerHTML = '';
        addLastNameVal.classList.remove('invalidForm', 'validForm');
        lALName.classList.remove('labelFormValidationStyle');
    }   else {
        if (!pattAddressUserName.test(addLastNameVal.value)) {
            addLastNameVal.classList.add('invalidForm');
            lALName.classList.add('labelFormValidationStyle');
            lALName.innerHTML = addLastNameErr;
        } else {
            lALName.classList.remove('labelFormValidationStyle');
            addLastNameVal.classList.remove('invalidForm');
            lALName.innerHTML = '';
            addLastNameVal.classList.add('validForm');
        }
    }
}

function checkBirthday() {
    const addBirthdayVal = document.querySelector('#addBirthday');
    const lABirth = document.getElementById('step2birthday');
    if (!addBirthdayVal.checkValidity()) {
        addBirthdayVal.classList.add('invalidForm');
        lABirth.classList.add('labelFormValidationStyle');
        lABirth.innerHTML = addBirthdErr;
    } else {
        lABirth.classList.remove('labelFormValidationStyle');
        addBirthdayVal.classList.remove('invalidForm');
        lABirth.innerHTML = '';
        addBirthdayVal.classList.add('validForm');
    }
}

function checkAddress() {
    const addAddressVal = document.querySelector('#addAddress1');
    const lAAdd = document.getElementById('step2address');
    if (addAddressVal.value.length === 0) {
        lAAdd.innerHTML = '';
        addAddressVal.classList.remove('invalidForm', 'validForm');
        lAAdd.classList.remove('labelFormValidationStyle');
    }   else {
        if (!pattAddAddressOne.test(addAddressVal.value)) {
            addAddressVal.classList.add('invalidForm');
            lAAdd.classList.add('labelFormValidationStyle');
            lAAdd.innerHTML = addAddressErr;
        } else {
            lAAdd.classList.remove('labelFormValidationStyle');
            addAddressVal.classList.remove('invalidForm');
            lAAdd.innerHTML = '';
            addAddressVal.classList.add('validForm');
        }
    }
}

function checkPostalCode() {
    const addPostalCodeVal = document.querySelector('#addPostalCode');
    const lAPostalC = document.getElementById('step2postalcode');
    if (addPostalCodeVal.value.length === 0) {
        lAPostalC.innerHTML = '';
        addPostalCodeVal.classList.remove('invalidForm', 'validForm');
        lAPostalC.classList.remove('labelFormValidationStyle');
    }   else {
        if (!pattAddPC.test(addPostalCodeVal.value)) {
            addPostalCodeVal.classList.add('invalidForm');
            lAPostalC.classList.add('labelFormValidationStyle');
            lAPostalC.innerHTML = addPostalCErr;
        } else {
            lAPostalC.classList.remove('labelFormValidationStyle');
            addPostalCodeVal.classList.remove('invalidForm');
            lAPostalC.innerHTML = '';
            addPostalCodeVal.classList.add('validForm');
        }
    }
}

function setCountryCode(country) {
    const addCountryCodeVal = document.querySelector('#addCountryCode');
    const addPhoneVal = document.querySelector('#addPhone');
    if (country === 'Andorra') {
        addCountryCodeVal.value = 'Andorra';
        addPhoneVal.value = '(+376)';
    }   else if (country === 'France') {
        addCountryCodeVal.value = 'France';
        addPhoneVal.value = '(+33)';
    }   else if (country === 'Germany') {
        addCountryCodeVal.value = 'Germany';
        addPhoneVal.value= '(+49)';
    }   else if (country === 'Greece') {
        addCountryCodeVal.value = 'Greece';
        addPhoneVal.value = '(+30)';
    }   else if (country === 'Spain') {
        addCountryCodeVal.value = 'Spain';
        addPhoneVal.value = '(+34)';
    }   
};

function checkCountry() {
    const addCountryVal = document.querySelector('#addCountry');
    const lACountry = document.getElementById('step2country');
    if (!addCountryVal.checkValidity()) {
        addCountryVal.classList.add('invalidForm');
        lACountry.classList.add('labelFormValidationStyle');
        lACountry.innerHTML = addCountryErr;
    } else {
        lACountry.classList.remove('labelFormValidationStyle');
        addCountryVal.classList.remove('invalidForm');
        lACountry.innerHTML = '';
        addCountryVal.classList.add('validForm');
        setCountryCode(addCountryVal.value);
    }
}

function checkCountryCode() {
    const addCountryCodeVal = document.querySelector('#addCountryCode');
    const addPhoneVal = document.querySelector('#addPhone');
    if (addCountryCodeVal.value = 'Andorra') {
        addPhoneVal.value = '(+376)';
    }   else if (addCountryCodeVal.value = 'France') {
        addPhoneVal.value = '(+33)';
    }   else if (addCountryCodeVal.value = 'Germany') {
        addPhoneVal.value= '(+49)';
    }   else if (addCountryCodeVal.value = 'Greece') {
        addPhoneVal.value = '(+30)';
    }   else if (addCountryCodeVal.value = 'Spain') {
        addPhoneVal.value = '(+34)';
    }   
}

function checkPhoneNumber() {
    const addPhoneVal = document.querySelector('#addPhone');
}
