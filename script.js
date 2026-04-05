document.addEventListener("DOMContentLoaded", () => {
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

      const catalog = document.getElementById("catalog");
      if (catalog) {
        catalog.scrollIntoView({ behavior: "smooth" });
      }

      if (mobileMenu) {
        mobileMenu.classList.add("hidden");
      }
    });
  });
});
