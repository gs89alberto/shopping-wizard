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

document.getElementById('conditions').addEventListener('change', function(event) {    
    if(event.target.checked) {
        document.getElementById('buyNowBtn').disabled = false;
    } else {
        document.getElementById('buyNowBtn').disabled = true;
    }
});

const popUpDiv = document.querySelector('#popUpDiv');

function hide() {
    popUpDiv.classList.toggle('hidden');
};