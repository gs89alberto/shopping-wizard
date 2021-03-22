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