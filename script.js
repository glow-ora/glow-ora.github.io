const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwzSlf54-naWf-R3dGNFIFqeQD1sUOSeY8G8D9VKZLpP8a6l_JNcyh2GuUP_QgXJ2Bo/exec";

const products = [
  {
    id: 1,
    name: "Judydoll Iron Mascara",
    price: 999,
    images: ["images/mascara.png"],
    shortDescription: "Precision lash definition with a sleek metal wand.",
    description:
      "Designed for refined, separated lashes, this slim metal mascara wand helps coat even smaller lashes with better control. It creates a cleaner, longer-looking lash finish that feels elegant and polished rather than heavy or overly dramatic.",
    bullets: [
      "Defines and separates lashes for a neat finish",
      "Slim applicator helps with detail and control",
      "Perfect for natural makeup and lower lashes",
      "Great for clean girl beauty looks and everyday wear"
    ]
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
    shortDescription: "Cute blemish care with practical skin protection.",
    description:
      "These hydrocolloid patches help cover active blemishes while keeping them protected from outside dirt, touching, and irritation. The playful designs add charm to your skincare routine while still serving a useful everyday purpose.",
    bullets: [
      "Helps protect pimples from touching and friction",
      "Supports a cleaner healing environment",
      "Cute star and cartoon designs for fun skincare",
      "Easy to use at home, overnight, or during the day"
    ]
  },
  {
    id: 3,
    name: "Hisyi 9-Colour Eye Shadow Palette",
    price: 299,
    images: ["images/eyeshadow.png"],
    shortDescription: "Soft neutral tones for elegant everyday eyes.",
    description:
      "A wearable eyeshadow palette with flattering nude and warm brown tones that work beautifully for day-to-day makeup. The balanced mix of matte and shimmer shades makes it easy to create soft glam, office looks, or gentle evening definition.",
    bullets: [
      "Beginner-friendly shade story",
      "Matte and shimmer mix for versatile looks",
      "Soft neutral palette for daily wear",
      "Perfect for polished, feminine eye makeup"
    ]
  },
  {
    id: 4,
    name: "Oil Absorbing Blotting Paper",
    price: 350,
    images: [
      "images/blotting-paper.png",
      "images/blotting-paper1.png",
      "images/blotting-paper2.png"
    ],
    shortDescription: "Portable shine control for fresh-looking skin.",
    description:
      "A simple beauty-bag essential for oily or combination skin. These blotting sheets help remove excess shine without ruining makeup, making them ideal for mid-day touch-ups, humid weather, and on-the-go freshness.",
    bullets: [
      "Absorbs excess oil quickly",
      "Helps keep makeup looking cleaner for longer",
      "Travel-friendly format for your bag or pouch",
      "Useful for touch-ups in hot or humid weather"
    ]
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

    const bulletList = product.bullets
      .map((bullet) => `<li>${bullet}</li>`)
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
        <p class="product-short">${product.shortDescription}</p>
        <p class="product-description">${product.description}</p>
        <ul class="product-bullets">${bulletList}</ul>

        <div class="price-row">
          <div class="price">${product.price} tk</div>
          <button class="product-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    `;

    productList.appendChild(card);
  });
}

function changeImage(productId, imagePath) {
  const mainImg = document.getElementById(`main-img-${productId}`);
  if (mainImg) mainImg.src = imagePath;
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

  item.quantity -= 1;

  if (item.quantity <= 0) {
    cart = cart.filter((product) => product.id !== productId);
  }

  updateCartCount();
  renderCart();
}

function removeItem(productId) {
  cart = cart.filter((product) => product.id !== productId);
  updateCartCount();
  renderCart();
}

function getSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function getDeliveryCharge() {
  if (deliveryAreaEl.value === "Inside Dhaka") return 80;
  if (deliveryAreaEl.value === "Outside Dhaka") return 120;
  return 0;
}

function updateTotals() {
  const subtotal = getSubtotal();
  const deliveryCharge = getDeliveryCharge();
  const grandTotal = subtotal + deliveryCharge;

  subtotalEl.textContent = subtotal;
  deliveryChargeEl.textContent = deliveryCharge;
  grandTotalEl.textContent = grandTotal;
}

function renderCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `<div class="empty-cart">Your cart is empty.</div>`;
    updateTotals();
    return;
  }

  cart.forEach((item) => {
    const row = document.createElement("div");
    row.className = "cart-item";

    row.innerHTML = `
      <div>
        <div class="cart-item-title">${item.name}</div>
        <div>${item.price} tk × ${item.quantity}</div>
      </div>

      <div class="qty-box">
        <button class="qty-btn" onclick="decreaseQty(${item.id})">−</button>
        <span>${item.quantity}</span>
        <button class="qty-btn" onclick="increaseQty(${item.id})">+</button>
      </div>

      <div>
        <div><strong>${item.price * item.quantity} tk</strong></div>
        <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
      </div>
    `;

    cartItems.appendChild(row);
  });

  updateTotals();
}

function openCart() {
  cartModal.classList.remove("hidden");
}

function closeCart() {
  cartModal.classList.add("hidden");
}

cartToggle.addEventListener("click", () => {
  renderCart();
  openCart();
});

closeCartBtn.addEventListener("click", closeCart);

window.addEventListener("click", (e) => {
  if (e.target === cartModal) {
    closeCart();
  }
});

deliveryAreaEl.addEventListener("change", updateTotals);

checkoutForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (cart.length === 0) {
    orderMessage.textContent = "Your cart is empty.";
    return;
  }

  const name = document.getElementById("customer-name").value.trim();
  const phone = document.getElementById("customer-phone").value.trim();
  const address = document.getElementById("customer-address").value.trim();
  const area = deliveryAreaEl.value;
  const paymentMethod = document.getElementById("payment-method").value;
  const subtotal = getSubtotal();
  const deliveryCharge = getDeliveryCharge();
  const total = subtotal + deliveryCharge;

  if (!name || !phone || !address || !area || !paymentMethod) {
    orderMessage.textContent = "Please fill in all fields.";
    return;
  }

  const productSummary = cart
    .map((item) => `${item.name} x ${item.quantity}`)
    .join(", ");

  const orderData = {
    name,
    phone,
    address,
    area,
    paymentMethod,
    products: productSummary,
    subtotal,
    deliveryCharge,
    total
  };

  orderMessage.textContent = "Placing order...";

  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(orderData)
    });

    let result = null;
    try {
      result = await response.json();
    } catch (error) {
      result = { result: "success" };
    }

    if (result.result === "success") {
      orderMessage.textContent = "Order placed successfully!";
      checkoutForm.reset();
      cart = [];
      updateCartCount();
      renderCart();
    } else {
      orderMessage.textContent = "Something went wrong. Please try again.";
    }
  } catch (error) {
    orderMessage.textContent = "Order failed. Check your Apps Script URL and deployment settings.";
    console.error(error);
  }
});

renderProducts();
updateCartCount();
updateTotals();
