
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
        setTopBarStyle(domLists[targetId][1]);
    } else {
        document.getElementById('topBar')?.remove();
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