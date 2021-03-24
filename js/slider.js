let colors = document.querySelectorAll('.colorButton');

function changePicturesOnSlide(color) {
  let picOne = document.querySelector('#imgSl1');
  let picTwo = document.querySelector('#imgSl2');
  let picThree = document.querySelector('#imgSl3');
  let picFour = document.querySelector('#imgSl4');
  picOne.src = `img/${color}Front.jpg`;
  picTwo.src = `img/${color}Back.jpg`;
  picThree.src = `img/${color}Left.jpg`;
  picFour.src = `img/${color}Right.jpg`;
  currentSlide(1);
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
};



