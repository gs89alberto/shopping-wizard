//Start Page Vars
let size;
let colores;

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

//Shipping Type
let price1;
let price2;
let price3;


function shirtSize(sizes){
    size = sizes;
}

function shirtColor(colorS){
    colores = colorS;
}

function profileData(){
    username = document.getElementById("name").value;
    email = document.getElementById("email").value;
    pasword = document.getElementById("pwd").value;
}

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
    let regularAdress = document.getElementById("regularAdress");
        if(regularAdress.checked){
            regularAdressConfirm = true;
        }
    };

function vasonovas(precio){
    if(precio == "opt1"){
        price1 = 0;
        console.log("Has seleccionado el envio FREE");
    }else if(precio == "opt2"){
        price2 = 4.99;
        console.log("Has seleccionado el envio 4.99");
    }else if(precio == "opt3"){
        price3 = 9.99;
        console.log("Has seleccionado el envio de 9.99");
    }     
}
