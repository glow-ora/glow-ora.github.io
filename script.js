const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwzSlf54-naWf-R3dGNFIFqeQD1sUOSeY8G8D9VKZLpP8a6l_JNcyh2GuUP_QgXJ2Bo/exec";

const products = [
  {
    id: 1,
    name: "Judydoll Iron Mascara",
    price: 999,
    images: [
      "images/mascara.png"
    ],
    shortDescription: "Slim metal wand mascara for clean, defined lashes.",
    description: "Get precise lash definition with a slim metal wand that helps separate lashes neatly, reduce clumping, and create a longer-looking finish for everyday makeup."
  },
  {
    id: 2,
    name: "Hydrocolloid Acne Patch",
    price: 150,
    images: [
      "images/acne-patch.png",
      "images/acne-patch1.png",
      "images/acne-patch2.png"
    ],
    shortDescription: "Cute pimple patches in fun styles for daily blemish care.",
    description: "These hydrocolloid patches help protect pimples from dirt and touching while supporting a cleaner healing process. Cute star and cartoon styles make skincare more fun."
  },
  {
    id: 3,
    name: "Hisyi Eyeshadow Palette",
    price: 299,
    images: [
      "images/eyeshadow.png"
    ],
    shortDescription: "Soft nude tones for easy everyday glam.",
    description: "A wearable 9-colour palette with soft neutrals and shimmer shades. Great for simple daytime looks, warm glam, and beginner-friendly blending."
  },
  {
    id: 4,
    name: "Blotting Paper",
    price: 350,
    images: [
      "images/blotting-paper.png",
      "images/blotting-paper1.png",
      "images/blotting-paper2.png"
    ],
    shortDescription: "Travel-friendly oil control sheets with 100 sheets per pack.",
    description: "Portable blotting sheets designed to absorb excess oil without ruining makeup. Great for touch-ups during hot days, oily skin moments, and on-the-go freshness."
  }
];

let cart = [];

const productList = document.getElementById("product-list");
const cartToggle = document.getElementById("cart-toggle");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const closeCartBtn = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const subtotalEl = document.getElementById("subtotal");
const deliveryChargeEl = document.getElementById("delivery-charge");
const grandTotalEl = document.getElementById("grand-total");
const deliveryAreaEl = document.getElementById("delivery-area");
const checkoutForm = document.getElementById("checkout-form");
const orderMessage = document.getElementById("order-message");

function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product, index) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const thumbs = product.images
      .map(
        (img, imgIndex) => `
          <img
            src="${img}"
            alt="${product.name} thumbnail ${imgIndex + 1}"
            class="thumb"
            onclick="changeImage(${product.id}, '${img}')"
          />
        `
      )
      .join("");

    const badge = index < 2 ? `<div class="product-badge">Best Seller</div>` : "";

    card.innerHTML = `
      <div class="product-image-wrap">
        ${badge}
        <img
          src="${product.images[0]}"
          alt="${product.name}"
          id="main-img-${product.id}"
          class="main-img"
        />
      </div>

      <div class="thumbs">
        ${thumbs}
      </div>

      <div class="product-content">
        <h3>${product.name}</h3>
        <p>${product.description}</p >
        <div class="product-meta">
          <div class="price">${product.price} tk</div>
        </div>
        <button class="product-btn" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;

    productList.appendChild(card);
  });
}

function changeImage(productId, imagePath) {
  const mainImg = document.getElementById(`main-img-${productId}`);
  if (mainImg) {
    mainImg.src = imagePath;
  }
}

function addToCart(productId) {
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const product = products.find((item) => item.id === productId);
    if (product) {
      cart.push({ ...product, quantity: 1 });
    }
  }

  updateCartCount();
  renderCart();
  openCart();
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = count;
}

function increaseQty(productId) {
  const item = cart.find((product) => product.id === productId);
  if (!item) return;
  item.quantity += 1;
  updateCartCount();
  renderCart();
}

function decreaseQty(productId) {
  const item = cart.find((product) => product.id === productId);
  if (!item) return;

  item.quantity -=
