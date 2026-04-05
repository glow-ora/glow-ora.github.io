document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    if (slides[index]) {
      slides[index].classList.add("active");
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function startSlider() {
    if (slides.length > 1) {
      slideInterval = setInterval(nextSlide, 4000);
    }
  }

  function stopSlider() {
    clearInterval(slideInterval);
  }

  if (slides.length > 0) {
    showSlide(currentSlide);
    startSlider();
  }

  const searchToggle = document.getElementById("searchToggle");
  const menuToggle = document.getElementById("menuToggle");
  const searchDrawer = document.getElementById("searchDrawer");
  const mobileMenu = document.getElementById("mobileMenu");

  if (searchToggle && searchDrawer) {
    searchToggle.addEventListener("click", () => {
      searchDrawer.classList.toggle("hidden");

      if (mobileMenu) {
        mobileMenu.classList.add("hidden");
      }
    });
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");

      if (searchDrawer) {
        searchDrawer.classList.add("hidden");
      }
    });
  }

  const catalogLinks = document.querySelectorAll('a[href="#catalog"]');

  catalogLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const catalogSection = document.getElementById("catalog");
      if (catalogSection) {
        catalogSection.scrollIntoView({
          behavior: "smooth"
        });
      }

      if (mobileMenu) {
        mobileMenu.classList.add("hidden");
      }
    });
  });

  slides.forEach((slide) => {
    slide.addEventListener("mouseenter", stopSlider);
    slide.addEventListener("mouseleave", startSlider);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopSlider();
    } else if (slides.length > 1) {
      startSlider();
    }
  });
});
