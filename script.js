document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const searchToggle = document.getElementById("searchToggle");
  const menuToggle = document.getElementById("menuToggle");
  const searchDrawer = document.getElementById("searchDrawer");
  const mobileMenu = document.getElementById("mobileMenu");
  const catalogLinks = document.querySelectorAll('a[href="#catalog"]');

  let currentSlide = 0;
  let sliderInterval = null;
  const SLIDE_DELAY = 5500;
  const PANEL_ANIMATION_DURATION = 400;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active", "prev", "next");

      if (i === index) {
        slide.classList.add("active");
      } else if (i === (index - 1 + slides.length) % slides.length) {
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

  function openPanel(panelToOpen, panelToClose) {
    if (!panelToOpen) return;

    if (panelToClose) {
      closePanel(panelToClose);
    }

    panelToOpen.classList.remove("hidden");

    requestAnimationFrame(() => {
      panelToOpen.classList.add("is-visible");
    });
  }

  function closePanel(panel) {
    if (!panel || panel.classList.contains("hidden")) return;

    panel.classList.remove("is-visible");

    setTimeout(() => {
      panel.classList.add("hidden");
    }, PANEL_ANIMATION_DURATION);
  }

  function togglePanel(panelToToggle, panelToClose) {
    if (!panelToToggle) return;

    const isOpen =
      !panelToToggle.classList.contains("hidden") &&
      panelToToggle.classList.contains("is-visible");

    if (isOpen) {
      closePanel(panelToToggle);
    } else {
      openPanel(panelToToggle, panelToClose);
    }
  }

  function closeAllPanels() {
    closePanel(searchDrawer);
    closePanel(mobileMenu);
  }

  if (slides.length > 0) {
    showSlide(currentSlide);
    startSlider();
  }

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

  catalogLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const catalogSection = document.getElementById("catalog");
      if (catalogSection) {
        catalogSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      closeAllPanels();
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

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllPanels();
    }
  });

  document.addEventListener("click", (event) => {
    const clickedInsideSearch =
      searchDrawer?.contains(event.target) || searchToggle?.contains(event.target);

    const clickedInsideMenu =
      mobileMenu?.contains(event.target) || menuToggle?.contains(event.target);

    if (!clickedInsideSearch) {
      closePanel(searchDrawer);
    }

    if (!clickedInsideMenu) {
      closePanel(mobileMenu);
    }
  });
});
