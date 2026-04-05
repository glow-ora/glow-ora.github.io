const searchToggle = document.getElementById("searchToggle");
const menuToggle = document.getElementById("menuToggle");
const searchDrawer = document.getElementById("searchDrawer");
const mobileMenu = document.getElementById("mobileMenu");

if (searchToggle) {
  searchToggle.addEventListener("click", () => {
    searchDrawer.classList.toggle("hidden");
    mobileMenu.classList.add("hidden");
  });
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    searchDrawer.classList.add("hidden");
  });
}

const heroSlides = document.querySelectorAll(".hero-slide");
let heroIndex = 0;

function showHeroSlide(index) {
  heroSlides.forEach((slide) => slide.classList.remove("active"));
  if (heroSlides[index]) {
    heroSlides[index].classList.add("active");
  }
}

if (heroSlides.length > 0) {
  setInterval(() => {
    heroIndex = (heroIndex + 1) % heroSlides.length;
    showHeroSlide(heroIndex);
  }, 4000);
}

const productTrack = document.getElementById("productTrack");
const prevProduct = document.getElementById("prevProduct");
const nextProduct = document.getElementById("nextProduct");
const productSlides = document.querySelectorAll(".product-card");

let productIndex = 0;

function updateProductSlider() {
  if (productTrack) {
    productTrack.style.transform = `translateX(-${productIndex * 100}%)`;
  }
}

if (prevProduct) {
  prevProduct.addEventListener("click", () => {
    productIndex = (productIndex - 1 + productSlides.length) % productSlides.length;
    updateProductSlider();
  });
}

if (nextProduct) {
  nextProduct.addEventListener("click", () => {
    productIndex = (productIndex + 1) % productSlides.length;
    updateProductSlider();
  });
}
