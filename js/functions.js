let timer;
let milisec;
let start;

document.getElementById('addToCartBtn').addEventListener('click', nextStep);

function setGiftCheckboxEvents() {
    document.getElementById('giftCheckbox').addEventListener('change', function(event) {
        if(event.target.checked) {
            Array.from(document.getElementById('giftContent').children).forEach(element => {
                element.disabled = false;
            });
        } else {
            Array.from(document.getElementById('giftContent').children).forEach(element => {
                element.disabled = true;
            });
        }
    });
}

function thankYou() {
    document.querySelector('#formBuyNow').classList.add('hidden_div');
    document.querySelector('#thankYouMsg').classList.toggle('hidden_div');
};


function setEventSubmitButton(elementId) {
    var el = document.getElementById(elementId);
    if(el) {        
        el.addEventListener('click', nextStep);      
    }
    if (elementId === 'shipping_NextBtn') setGiftCheckboxEvents();
    if (elementId === 'buyNowBtn') setBuyButtonCondition();
    if (elementId === 'profile_NextBtn') startCountdown();
}

function setTopBarStyle(step) {
    var stepDivId = {
        '1': 'step1',
        '2': 'step2',
        '3': 'step3',
        '4': 'step4'
    }
    var currentStep = stepDivId[step];

    document.getElementById(currentStep).classList.toggle('actualStep');
    document.getElementById(currentStep).children[0].classList.toggle('completed');
    document.getElementById(currentStep).children[1].classList.toggle('completedText');

    if (step > 1) {
        document.getElementById(stepDivId[step-1]).classList.toggle('actualStep');
    }
}

function hasAllProfileFields() {
    return (!userNameChecked || !userEmailChecked || !userPasswordChecked || !userPasswordConfirmedChecked);
}

function hasAllAddressFields() {
    return (!nameChecked || !lastNameChecked || !birthdayChecked || !addressChecked || !postalCodeChecked || !countryCodeChecked || !countryChecked || !phoneNumberChecked);
}

function nextStep(event) {
    event.preventDefault();
    
    var targetId = event.target.id;
    var domLists = {
        'addToCartBtn': ['step0MainDiv', '1', 'profile_NextBtn'], //idCurrentBtn - currentDiv - next template - next btn
        'profile_NextBtn': ['step1MainDiv', '2', 'address_NextBtn'],
        'address_NextBtn': ['step2MainDiv', '3', 'shipping_NextBtn'],
        'shipping_NextBtn': ['step3MainDiv', '4', 'buyNowBtn']
    };


    if (targetId === 'profile_NextBtn' && hasAllProfileFields()) {
        alert('You must fulfill the form correctly before continuing');
        return false;
    }

    if (targetId === 'address_NextBtn' && hasAllAddressFields()) {
        alert ('You must fulfill the form correctly before continuing');
        return false;
    }

    if (targetId === 'shipping_NextBtn' && !selectedRadiobutton) {
        alert('You must select a shipping type before continuing');
        return false;
    }
    if (targetId !== 'buyNowBtn') {
        document.getElementById(domLists[targetId][0]).remove();
        if (targetId === 'addToCartBtn') {
            var templateBars = document.querySelector('#bars');
            var cloneBars =  templateBars.content.cloneNode(true);
            document.body.getElementsByTagName('main')[0].appendChild(cloneBars);
        }
        var template = document.querySelector('#template' + domLists[targetId][1]);
        var clone =  template.content.cloneNode(true);
        document.body.getElementsByTagName('main')[0].appendChild(clone);
        if (domLists[targetId][2]) {
            setEventSubmitButton(domLists[targetId][2]);
            setTopBarStyle(domLists[targetId][1]);
        } else {
            document.getElementById('topBar')?.remove();
        }
    } else {
        clearTimeout(timer);
        document.getElementById('timeToPurchase').textContent = convertTime(getPurchaseTime()).minutes + ' minutos ' +  convertTime(getPurchaseTime()).seconds + ' seconds';
    }
}

function setBuyButtonCondition() {
    document.getElementById('conditions').addEventListener('change', function(event) {   
        document.getElementById('buyNowBtn').disabled = !event.target.checked;
    });
    changePage();
}

function loadComponent (file) {
    return new Promise ((resolve, reject) => {
      fetch (file)
        .then (result => {
          return result.text ();
        })
        .then (txt => {
          const parser           = new DOMParser ();
          const fragment         = parser.parseFromString (txt, 'text/html');
          const originalTemplate = fragment.getElementsByTagName ('TEMPLATE')[ 0 ];
          let template;
          if (originalTemplate) {
            template           = document.createElement ('template');
            template.innerHTML = originalTemplate.innerHTML;
            template.id        = originalTemplate.id;
            document.body.appendChild (template);
          }
          const originalScript = fragment.getElementsByTagName ('SCRIPT')[ 0 ];
          let script;
          if (originalScript) {
            script           = document.createElement ('script');
            script.innerHTML = originalScript.innerHTML;
            document.body.appendChild (script);
          }
          resolve ({template, script});
        })
        .catch (reject);
    });
  }

//Principio Recojer Datos-----------------------------------------------------------------------------------------------------------------

  //Start Page Vars
let size = 'XS';
let colores = 'white';
let imageShirt = {
    "white":"img/whiteFront.jpg",
    "black":"img/blackFront.jpg",
    "blue":"img/blueFront.jpg",
    "red":"img/redFront.jpg",
    "green":"img/greenFront.jpg",
}

//Profile Page Vars
let username;
let email;
let pasword;

//Adress Page Vars
let firstName;
let lastName;
let birthday;
let adress1;
let adress2;
let postalCode;
let country;
let prefix;
let telephone;
let regularAdressConfirm = false;
//Shipping Type Vars
let price1;
let option1;
let productPrice = document.getElementById("productprice").getAttribute("value");
let firstPriceText = document.getElementById("productprice").innerHTML;
var selectedRadiobutton = false;
var shippingType = 0;

//Start Page Functions
function shirtSize(sizes){
    size = sizes;
}

function shirtColor(colorS){
    colores = colorS;
    if(colores === "white"){
        productPrice = 100;
        firstPriceText = '100 €';
    }else if(colores === "black"){
        productPrice = 120;
        firstPriceText = '120 €';
    }else if(colores === "red"){
        productPrice = 130;
        firstPriceText = '130 €';
    }else if(colores === "blue"){
        productPrice = 130;
        firstPriceText = '130 €';
    }else if(colores === "green"){
        productPrice = 130;
        firstPriceText = '130 €';
    }
    document.getElementById("productprice").innerHTML = firstPriceText;
}

//Profile Page Functions
function profileData(){
    username = document.getElementById("name").value;
    email = document.getElementById("email").value;
    pasword = document.getElementById("pwd").value;
}

//Adress Page Functions
function adressData(){
    firstName = document.getElementById("firstName")?.value;
    lastName = document.getElementById("lastName")?.value;
    birthday = document.getElementById("birthday")?.value;
    adress1 = document.getElementById("adress1")?.value;
    adress2 = document.getElementById("adress2")?.value;
    postalCode = document.getElementById("postalCode")?.value;
    country = document.getElementById("country")?.value; 
    prefix = document.getElementById("prefix")?.value;
    telephone = document.getElementById("telephone")?.value;
    let regularAdress = document.getElementById("checkItem");
        if(regularAdress && regularAdress.checked){
            regularAdressConfirm = true;
        }
    };

//Shipping Type Functions
function setShippingType(precio){
    if(precio === "opt1") {
        price1 = 0;
        option1 = "72h";
        shippingType = 3;
    }else if(precio === "opt2") {
        price1 = 4.99;
        option1 = "48h";
        shippingType = 2;
    }else if(precio === "opt3") {
        price1 = 9.99;
        option1 = "24h";
        shippingType = 1;
    }
    selectedRadiobutton = true;
}



//Finsh Page Functions
function changePage(){    
    document.getElementById("sizeSelected").innerHTML = size;
    document.getElementById("colorSelected").style.backgroundColor=colores;

    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + Number(shippingType));
    document.getElementById("deliveryDate").innerHTML = currentDate.toLocaleDateString();

    document.getElementById("shippingPrice").innerHTML = price1 + "€";
    document.getElementById("productprice").innerHTML = productPrice + "€";
    document.getElementById("finishprice").innerHTML = Number(productPrice) + price1 + "€";
    if (imageShirt[colores]) {
        document.getElementById("purchaseImg").style.backgroundImage = "url("+imageShirt[colores]+")";
    }
    
}
//Final Recojer Datos ------------------------------------------------------------------------------------------------------------------------------

// VALIDATION PROFILE FORM -------------------------

let pattUserName = /^[A-Za-z0-9 ]{5,}$/;
let pattEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
let pattPswd = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

let userNameErr = 'The user name must have from 5 to 20 characters.';
let emailErr = 'Please, insert a valid E-mail.'
let pwdErr = 'The password must contain at least one number, one uppercase letter, one lowercase letter and one special character.'
let pwdConfErr = 'The passwords doesn\'t match.'

let userNameChecked = false;
let userEmailChecked = false;
let userPasswordChecked = false;
let userPasswordConfirmedChecked = false;

function checkUserName() {
    const userNameVal = document.querySelector('#name');
    const lName = document.getElementById('step1name');
    if (userNameVal.value.length === 0) {
        lName.innerHTML = '';
        userNameVal.classList.remove('invalidForm', 'validForm');
        lName.classList.remove('labelFormValidationStyle');
        userNameChecked = false;
    }   else {
        if (!pattUserName.test(userNameVal.value)) {
            userNameVal.classList.add('invalidForm');
            lName.classList.add('labelFormValidationStyle');
            lName.innerHTML = userNameErr;
            userNameChecked = false;
        } else {
            lName.classList.remove('labelFormValidationStyle');
            userNameVal.classList.remove('invalidForm');
            lName.innerHTML = '';
            userNameVal.classList.add('validForm');
            userNameChecked = true;
        }
    }
}

function checkEmail() {
    const emailVal = document.querySelector('#email');
    const lMail = document.getElementById('step1email');
    if (emailVal.value.length === 0) {
        lMail.innerHTML = '';
        emailVal.classList.remove('invalidForm', 'validForm');
        lMail.classList.remove('labelFormValidationStyle');
        userEmailChecked = false;
    }   else {
        if (!pattEmail.test(emailVal.value)) {
            emailVal.classList.add('invalidForm');
            lMail.classList.add('labelFormValidationStyle');
            lMail.innerHTML = emailErr;
            userEmailChecked = false;
        } else {
            lMail.classList.remove('labelFormValidationStyle');
            emailVal.classList.remove('invalidForm');
            lMail.innerHTML = '';
            emailVal.classList.add('validForm');
            userEmailChecked = true;
        }
    }
}

function checkPassword() {
    const pwdVal = document.querySelector('#pwd');
    const lpwd = document.getElementById('step1pwd');
    if (pwdVal.value.length === 0) {
        lpwd.innerHTML = '';
        pwdVal.classList.remove('invalidForm', 'validForm');
        lpwd.classList.remove('labelFormValidationStyle');
        userPasswordChecked = false;
    }   else {
        if (!pattPswd.test(pwdVal.value)) {
            pwdVal.classList.add('invalidForm');
            lpwd.classList.add('labelFormValidationStyle');
            lpwd.innerHTML = pwdErr;
            userPasswordChecked = false;
        } else {
            lpwd.classList.remove('labelFormValidationStyle');
            pwdVal.classList.remove('invalidForm');
            lpwd.innerHTML = '';
            pwdVal.classList.add('validForm');
            userPasswordChecked = true;
        };
    };
}

function checkConfirmPwd() {
    const pwdVal = document.querySelector('#pwd');
    const pwdConfVal = document.querySelector('#pwdconfirm');
    const lConfPwd = document.getElementById('step1confirmpwd');
    if (pwdConfVal.value.length === 0) {
        lConfPwd.innerHTML = '';
        pwdConfVal.classList.remove('invalidForm', 'validForm');
        lConfPwd.classList.remove('labelFormValidationStyle');
        userPasswordConfirmedChecked = false;
    }   else {
        if (pwdConfVal.value !== pwdVal.value) {
            pwdConfVal.classList.add('invalidForm');
            lConfPwd.classList.add('labelFormValidationStyle');
            lConfPwd.innerHTML = pwdConfErr;
            userPasswordConfirmedChecked = false;
        } else {
            lConfPwd.classList.remove('labelFormValidationStyle');
            pwdConfVal.classList.remove('invalidForm');
            lConfPwd.innerHTML = '';
            pwdConfVal.classList.add('validForm');
            userPasswordConfirmedChecked = true;
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

    userNameChecked = false;
    userEmailChecked = false;
    userPasswordChecked = false;
    userPasswordConfirmedChecked = false;
}

// END OF VALIDATION PROFILE FORM -------------------------

// VALIDATION ADDRESS FORM -------------------------

let pattAddressUserName = /^[A-Za-z0-9 ]{,20}$/;
let pattBirthday = /^([0-9]{4})\/([0-9]{2})\/([0-9]{2})$/;
let pattAddAddressOne = /^\s*\S+(?:\s+\S+){2}/;
let pattAddPC = /^([0-9]{5})$/;
let pattAddPhone = /^\+?([(0-9)]{2,3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;

let addFirstNameErr = 'The first name must have less than 20 characters.';
let addLastNameErr = 'The last name must have less than 20 characters.';
let addBirthdErr = 'Please insert a valid date.';
let addAddressErr = 'Please insert a valid address.';
let addPostalCErr = 'The Postal Code must have 5 digits.';
let addCountryErr = 'Please select a country.';
let addPhoneErr = 'Please insert a valid phone number. The format must be: +XX XXX XXX XXX';

let nameChecked = false;
let lastNameChecked = false;
let birthdayChecked = false;
let addressChecked = false;
let postalCodeChecked = false;
let countryCodeChecked = false;
let countryChecked = false;
let phoneNumberChecked = false;

function checkName() {
    const addFirstNameVal = document.querySelector('#addFirstName');
    const lAName = document.getElementById('step2name');
    if (addFirstNameVal.value.length === 0) {
        lAName.innerHTML = '';
        addFirstNameVal.classList.remove('invalidForm', 'validForm');
        lAName.classList.remove('labelFormValidationStyle');
    }   else {
        if (!addFirstNameVal.checkValidity()) {
            addFirstNameVal.classList.add('invalidForm');
            lAName.classList.add('labelFormValidationStyle');
            lAName.innerHTML = addFirstNameErr;
        } else {
            lAName.classList.remove('labelFormValidationStyle');
            addFirstNameVal.classList.remove('invalidForm');
            lAName.innerHTML = '';
            addFirstNameVal.classList.add('validForm');
            nameChecked = true;
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
        if (!addLastNameVal.checkValidity()) {
            addLastNameVal.classList.add('invalidForm');
            lALName.classList.add('labelFormValidationStyle');
            lALName.innerHTML = addLastNameErr;
        } else {
            lALName.classList.remove('labelFormValidationStyle');
            addLastNameVal.classList.remove('invalidForm');
            lALName.innerHTML = '';
            addLastNameVal.classList.add('validForm');
            lastNameChecked = true;
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
        birthdayChecked = true;
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
        if (!addAddressVal.checkValidity()) {
            addAddressVal.classList.add('invalidForm');
            lAAdd.classList.add('labelFormValidationStyle');
            lAAdd.innerHTML = addAddressErr;
        } else {
            lAAdd.classList.remove('labelFormValidationStyle');
            addAddressVal.classList.remove('invalidForm');
            lAAdd.innerHTML = '';
            addAddressVal.classList.add('validForm');
            addressChecked = true;
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
            postalCodeChecked = true;
        }
    }
}

function setCountryCode(country) {
    const addCountryCodeVal = document.querySelector('#addCountryCode');
    const addPhoneVal = document.querySelector('#addPhone');
    if (!addCountryCodeVal.checkValidity()) {
        addCountryCodeVal.classList.add('invalidForm');
    } else if (country === 'Andorra') {
        addCountryCodeVal.value = 'Andorra';
        addPhoneVal.value = '+376';
        countryCodeChecked = true;
    }   else if (country === 'France') {
        addCountryCodeVal.value = 'France';
        addPhoneVal.value = '+33';
        countryCodeChecked = true;
    }   else if (country === 'Germany') {
        addCountryCodeVal.value = 'Germany';
        addPhoneVal.value= '+49';
        countryCodeChecked = true;
    }   else if (country === 'Greece') {
        addCountryCodeVal.value = 'Greece';
        addPhoneVal.value = '+30';
        countryCodeChecked = true;
    }   else if (country === 'Spain') {
        addCountryCodeVal.value = 'Spain';
        addPhoneVal.value = '+34';
        countryCodeChecked = true;
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
        countryChecked = true;
    }
}

function checkCountryCode() {
    const addCountryCodeVal = document.querySelector('#addCountryCode');
    const addPhoneVal = document.querySelector('#addPhone');
    if (addCountryCodeVal.value === 'Andorra') {
        addPhoneVal.value = '+376';
    }   else if (addCountryCodeVal.value === 'France') {
        addPhoneVal.value = '+33';
    }   else if (addCountryCodeVal.value === 'Germany') {
        addPhoneVal.value= '+49';
    }   else if (addCountryCodeVal.value === 'Greece') {
        addPhoneVal.value = '+30';
    }   else if (addCountryCodeVal.value === 'Spain') {
        addPhoneVal.value = '+34';
    }
}

function checkPhoneNumber() {
    const addPhoneVal = document.querySelector('#addPhone');
    const lAPhone = document.getElementById('step2phone');
    if (addPhoneVal.value.length === 0) {
        lAPhone.innerHTML = '';
        addPhoneVal.classList.remove('invalidForm', 'validForm');
        lAPhone.classList.remove('labelFormValidationStyle');
    }   else {
        if (!pattAddPhone.test(addPhoneVal.value)) {
            addPhoneVal.classList.add('invalidForm');
            lAPhone.classList.add('labelFormValidationStyle');
            lAPhone.innerHTML = addPhoneErr;
        } else {
            lAPhone.classList.remove('labelFormValidationStyle');
            addPhoneVal.classList.remove('invalidForm');
            lAPhone.innerHTML = '';
            addPhoneVal.classList.add('validForm');
            phoneNumberChecked = true;
        }
    }
}

function clearLabelAddForms() {
    document.querySelector('#addFirstName').classList.remove('invalidForm', 'validForm');
    document.querySelector('#addLastName').classList.remove('invalidForm', 'validForm');;
    document.querySelector('#addBirthday').classList.remove('invalidForm', 'validForm');;
    document.querySelector('#addAddress1').classList.remove('invalidForm', 'validForm');;
    document.querySelector('#addPostalCode').classList.remove('invalidForm', 'validForm');;
    document.querySelector('#addCountryCode').classList.remove('invalidForm', 'validForm');
    document.querySelector('#addCountry').classList.remove('invalidForm', 'validForm');;
    document.querySelector('#addPhone').classList.remove('invalidForm', 'validForm');;
    
    document.getElementById('step2phone').innerHTML = '';
    document.getElementById('step2country').innerHTML = '';
    document.getElementById('step2postalcode').innerHTML = '';
    document.getElementById('step2address').innerHTML = '';
    document.getElementById('step2birthday').innerHTML = '';
    document.getElementById('step2lastname').innerHTML = '';
    document.getElementById('step2name').innerHTML = '';

    document.getElementById('step2phone').classList.remove('labelFormValidationStyle');
    document.getElementById('step2country').classList.remove('labelFormValidationStyle');
    document.getElementById('step2postalcode').classList.remove('labelFormValidationStyle');
    document.getElementById('step2address').classList.remove('labelFormValidationStyle');
    document.getElementById('step2birthday').classList.remove('labelFormValidationStyle');
    document.getElementById('step2lastname').classList.remove('labelFormValidationStyle');
    document.getElementById('step2name').classList.remove('labelFormValidationStyle');
}

// END OF ADDRESS FORM VALIDATION -----------------------------
/* COUNTDOWN FUNCTIONS ------------------------*/

function getPurchaseTime() {
    var purchaseTime = new Date() - start;
    return purchaseTime
}

function convertTime(milisec) {
    var minutes = ~~(milisec/60000);
    var seconds = ~~(milisec/1000) - minutes*60;
    return {minutes : minutes, seconds : seconds};
}

function activatePopUp() {
    var popUpDiv = document.querySelector('#popUpDiv');
    popUpDiv.classList.remove('hidden');

    window.setTimeout("popUpDiv.classList.add('hidden')",5000);

    var remaining = milisec - getPurchaseTime();
    if (convertTime(remaining).minutes <= 2){
        document.getElementById("hurry").classList.remove('hidden');
    }
    document.getElementById("timerPopUp").innerHTML = (convertTime(remaining).minutes) + " minutes";
}

function toStep0() {
    document.querySelector('#popUpDiv').setAttribute("hidden","");
    alert("The purchase time has ended. You will be redirected");
    window.location.href = "index.html";
}

function startCountdown() {
    milisec = 301000;
    start = new Date();

    timer = setTimeout("toStep0()",milisec);
    activatePopUp();
    setInterval("activatePopUp()",60000);
}
