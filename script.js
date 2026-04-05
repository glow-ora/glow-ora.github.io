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

});
