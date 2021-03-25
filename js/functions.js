
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

document.getElementById('addToCartBtn').addEventListener('click', nextStep);

function setEventSubmitButton(elementId) {
    var el = document.getElementById(elementId);
    if(el){
        el.addEventListener('click', nextStep);
    }
    if (elementId === 'shipping_NextBtn') setGiftCheckboxEvents();
    if (elementId === 'buyNowBtn') setBuyButtonCondition();
    // if (elementId !== 'addToCartBtn' || elementId !=== 'buyNowBtn') {
    //     showTimer();
    // }
}

function nextStep(event) {
    event.preventDefault();
    
    var targetId = event.target.id;
    var domLists = {
        'addToCartBtn': ['step0MainDiv', '1', 'profile_NextBtn'],
        'profile_NextBtn': ['step1MainDiv', '2', 'address_NextBtn'],
        'address_NextBtn': ['step2MainDiv', '3', 'shipping_NextBtn'],
        'shipping_NextBtn': ['step3MainDiv', '4', 'buyNowBtn'],
        'buyNowBtn': ['step4MainDiv', '5', null]
    };

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
let size;
let colores;
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
function vasonovas(precio){
    if(precio == "opt1"){
        price1 = 0;
        option1 = "72h";
    }else if(precio == "opt2"){
        price1 = 4.99;
        option1 = "48h";
    }else if(precio == "opt3"){
        price1 = 9.99;
        option1 = "24h";
    }     
}



//Finsh Page Functions
function changePage(){
    document.getElementById("sizeSelected").innerHTML = size;
    document.getElementById("colorSelected").style.backgroundColor=colores;
    document.getElementById("delDateText").innerHTML = "In "+ option1;
    document.getElementById("shippingPrice").innerHTML = price1 + "€";
    document.getElementById("productprice").innerHTML = productPrice + "€";
    document.getElementById("finishprice").innerHTML = productPrice + price1 + "€";
    document.getElementById("purchaseImg").style.backgroundImage= "url("+imageShirt[colores]+")";
}
//Final Recojer Datos ------------------------------------------------------------------------------------------------------------------------------
