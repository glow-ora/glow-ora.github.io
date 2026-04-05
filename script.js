const searchToggle = document.getElementById("searchToggle");
const menuToggle = document.getElementById("menuToggle");
const searchDrawer = document.getElementById("searchDrawer");
const mobileMenu = document.getElementById("mobileMenu");

searchToggle.addEventListener("click", () => {
  searchDrawer.classList.toggle("hidden");
  mobileMenu.classList.add("hidden");
});

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  searchDrawer.classList.add("hidden");
});

const heroSlides = document.querySelectorAll(".hero-slide");
let heroIndex = 0;

function showHeroSlide(index) {
  heroSlides.forEach((slide) => slide.classList.remove("active"));
  heroSlides[index].classList.add("active");
}

setInterval(() => {
  heroIndex = (heroIndex + 1) % heroSlides.length;
  showHeroSlide(heroIndex);
}, 4000);

const productTrack = document.getElementById("productTrack");
const prevProduct = document.getElementById("prevProduct");
const nextProduct = document.getElementById("nextProduct");
const productSlides = document.querySelectorAll(".product-slide");

let productIndex = 0;

function updateProductSlider() {
  productTrack.style.transform = `translateX(-${productIndex * 100}%)`;
}

prevProduct.addEventListener("click", () => {
  productIndex = (productIndex - 1 + productSlides.length) % productSlides.length;
  updateProductSlider();
});

nextProduct.addEventListener("click", () => {
  productIndex = (productIndex + 1) % productSlides.length;
  updateProductSlider();
});
