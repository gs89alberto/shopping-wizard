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


function setEventSubmitButton(elementId) {
    var el = document.getElementById(elementId);
    if(el) {        
        el.addEventListener('click', nextStep);      
    }
    if (elementId === 'shipping_NextBtn') setGiftCheckboxEvents();
    if (elementId === 'buyNowBtn') setBuyButtonCondition();
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

function nextStep(event) {
    event.preventDefault();
    
    var targetId = event.target.id;
    var domLists = {
        'addToCartBtn': ['step0MainDiv', '1', 'profile_NextBtn'], //idCurrentBtn - currentDiv - next template - next btn
        'profile_NextBtn': ['step1MainDiv', '2', 'address_NextBtn'],
        'address_NextBtn': ['step2MainDiv', '3', 'shipping_NextBtn'],
        'shipping_NextBtn': ['step3MainDiv', '4', 'buyNowBtn'],
        'buyNowBtn': ['step4MainDiv', '5', null]
    };

    if (targetId === 'shipping_NextBtn' && !selectedRadiobutton) {
        alert('Selecciona un tipo de envio');
        return false;
    }
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
}

function setBuyButtonCondition() {
    document.getElementById('conditions').addEventListener('change', function(event) {   
        document.getElementById('buyNowBtn').disabled = !event.target.checked;
    });
    changePage();
}


const popUpDiv = document.querySelector('#popUpDiv');

function hide() {
    popUpDiv.classList.toggle('hidden');
};

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
    }else if(colores === "black"){
        productPrice = 120;
    }else if(colores === "red"){
        productPrice = 130;
    }else if(colores === "blue"){
        productPrice = 130;
    }else if(colores === "green"){
        productPrice = 130;
    }
}

//Profile Page Functions
function profileData(){
    username = document.getElementById("name").value;
    email = document.getElementById("email").value;
    pasword = document.getElementById("pwd").value;
}

//Adress Page Functions
function adressData(){
    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
    birthday = document.getElementById("birthday").value;
    adress1 = document.getElementById("adress1").value;
    adress2 = document.getElementById("adress2").value;
    postalCode = document.getElementById("postalCode").value;
    country = document.getElementById("country").value; 
    prefix = document.getElementById("prefix").value;
    telephone = document.getElementById("telephone").value;
    let regularAdress = document.getElementById("checkItem");
        if(regularAdress.checked){
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
