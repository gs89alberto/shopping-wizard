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


function confirmValidationProfile () {
    if (nameValue && lastName && psw && confirmPsw) {
        nextStep();
    } else {
        alert('Algo falla');
    }
}

function confirmValidationAddress () {
   if (nameValue && lastName && psw && confirmPsw) {
       nextStep();
   } else {
       alert('Algo falla');
   }
}

function setEventSubmitButton(elementId) {
   var el = document.getElementById(elementId);
   if(el){
       if (elementId === 'profile_NextBtn'){
           el.addEventListener('click', confirmValidationProfile);
       } if (elementId === 'address_NextBtn') {
           el.addEventListener('click', confirmValidationAddress);
       } else {
           el.addEventListener('click', nextStep);
       }        
   }
   if (elementId === 'shipping_NextBtn') setGiftCheckboxEvents();
   if (elementId === 'buyNowBtn') setBuyButtonCondition();

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