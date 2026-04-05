document.addEventListener("DOMContentLoaded", () => {

  // HERO SLIDER
  const slides = document.querySelectorAll(".hero-slide");
  let index = 0;

  function showSlide(i) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[i].classList.add("active");
  }

  if (slides.length > 0) {
    setInterval(() => {
      index = (index + 1) % slides.length;
      showSlide(index);
    }, 4000); // change every 4 seconds
  }
const slides = document.querySelectorAll(".slide");
let index = 0;

function changeSlide() {
  slides.forEach(s => s.classList.remove("active"));
  slides[index].classList.add("active");

  index = (index + 1) % slides.length;
}

setInterval(changeSlide, 4000);
});
