
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
    if (elementId === 'profile_NextBtn') startCountdown();
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

/* COUNTDOWN FUNCTIONS ------------------------*/

function getPurchaseTime(){
    var purchaseTime = new Date() - start;
    return purchaseTime
};

function convertTime(milisec){
    var minutes = ~~(milisec/60000);
    var seconds = ~~(milisec/1000) - minutes*60;
    return {minutes : minutes, seconds : seconds};
};

function activatePopUp(){
    var popUpDiv = document.querySelector('#popUpDiv');
    popUpDiv.classList.remove('hidden');

    window.setTimeout("popUpDiv.classList.add('hidden')",5000);

    var remaining = milisec - getPurchaseTime();
    if (convertTime(remaining).minutes <= 2){
        document.getElementById("hurry").classList.remove('hidden');
    }
    document.getElementById("timerPopUp").innerHTML = (convertTime(remaining).minutes) + " minutes";
    console.log(getPurchaseTime());
    console.log(convertTime(remaining).minutes);
}

function toStep0(){
    document.querySelector('#popUpDiv').setAttribute("hidden","");
    alert("The purchase time has ended. You will be redirected");
    window.location.href = "index.html";
}

function startCountdown(){
    milisec = 301000;
    start = new Date();

    setTimeout("toStep0()",milisec);
    activatePopUp();
    setInterval("activatePopUp()",60000);
};