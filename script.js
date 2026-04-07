document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;
  let sliderInterval = null;
  const SLIDE_DELAY = 5000;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active", "prev", "next");

      if (i === index) {
        slide.classList.add("active");
      } else if (i < index) {
        slide.classList.add("prev");
      } else {
        slide.classList.add("next");
      }
    });
  }

  function nextSlide() {
    if (slides.length <= 1) return;
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function startSlider() {
    if (slides.length > 1 && !sliderInterval) {
      sliderInterval = setInterval(nextSlide, SLIDE_DELAY);
    }
  }

  function stopSlider() {
    if (sliderInterval) {
      clearInterval(sliderInterval);
      sliderInterval = null;
    }
  }

  function togglePanel(panelToToggle, panelToClose) {
    if (!panelToToggle) return;

    const isHidden = panelToToggle.classList.contains("hidden");

    if (panelToClose) {
      panelToClose.classList.add("hidden");
      panelToClose.classList.remove("is-visible");
    }

    if (isHidden) {
      panelToToggle.classList.remove("hidden");
      requestAnimationFrame(() => {
        panelToToggle.classList.add("is-visible");
      });
    } else {
      panelToToggle.classList.remove("is-visible");
      setTimeout(() => {
        panelToToggle.classList.add("hidden");
      }, 350);
    }
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
      togglePanel(searchDrawer, mobileMenu);
    });
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      togglePanel(mobileMenu, searchDrawer);
    });
  }

  const catalogLinks = document.querySelectorAll('a[href="#catalog"]');

  catalogLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const catalogSection = document.getElementById("catalog");
      if (catalogSection) {
        catalogSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

      if (mobileMenu) {
        mobileMenu.classList.remove("is-visible");
        setTimeout(() => mobileMenu.classList.add("hidden"), 300);
      }

      if (searchDrawer) {
        searchDrawer.classList.remove("is-visible");
        setTimeout(() => searchDrawer.classList.add("hidden"), 300);
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
    } else {
      startSlider();
    }
  });
});
