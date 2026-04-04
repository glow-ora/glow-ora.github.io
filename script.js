const products = [
  {
    id: 1,
    name: "Judydoll Iron Mascara",
    price: 999,
    image: "images/mascara.jpg",
    description: "A slim metal wand mascara designed to define lashes neatly, separate each lash beautifully, and give a clean long-look finish."
  },
  {
    id: 2,
    name: "Hydrocolloid Acne Patch",
    price: 150,
    image: "images/acne-patch.jpg",
    description: "Cute acne patches in star, Hello Kitty, and cartoon styles that help protect blemishes while adding a fun touch to your skincare routine."
  },
  {
    id: 3,
    name: "Hisyi 9-Colour Eye Shadow Palette - Oat Latte",
    price: 299,
    image: "images/eyeshadow.jpg",
    description: "A soft neutral palette featuring wearable matte and shimmer tones, perfect for everyday makeup and simple glam looks."
  },
  {
    id: 4,
    name: "Oil Absorbing Blotting Paper",
    price: 350,
    image: "images/blotting-paper.jpg",
    description: "Portable oil blotting sheets with 100 sheets per pack. Makeup-friendly, gentle on skin, and available in Black, Dark Green, and Light Green."
  }
];

let cart = [];

const productList = document.getElementById("product-list");
const cartButton = document.getElementById("cart-button");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const subtotalEl = document.getElementById("subtotal");
const deliveryChargeEl = document.getElementById("delivery-charge");
const grandTotalEl = document.getElementById("grand-total");
const deliveryArea = document.getElementById("delivery-area");
const checkoutForm = document.getElementById("checkout-form");
const orderMessage = document.getElementById("order-message");

function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      < img src="${product.image}" alt="${product.name}">
      <div class="product-content">
        <h3>${product.name}</h3>
        <p>${product.description}</p >
        <div class="price">${product.price} tk</div>
        <button class="add-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;

    productList.appendChild(card);
  });
}

function addToCart(id) {
  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    const product = products.find((item) => item.id === id);
    cart.push({ ...product, quantity: 1 });
  }

  updateCartCount();
  renderCart();
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = count;
}

function increaseQty(id) {
  const item = cart.find((product) => product.id === id);
  if (item) {
    item.quantity += 1;
    renderCart();
    updateCartCount();
  }
}

function decreaseQty(id) {
  const item = cart.find((product) => product.id === id);
  if (!item) return;

  item.quantity -= 1;

  if (item.quantity <= 0) {
    cart = cart.filter((product) => product.id !== id);
  }

  renderCart();
  updateCartCount();
}

function removeItem(id) {
  cart = cart.filter((product) => product.id !== id);
  renderCart();
  updateCartCount();
}

function getSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function getDeliveryCharge() {
  if (deliveryArea.value === "Inside Dhaka") return 80;
  if (deliveryArea.value === "Outside Dhaka") return 120;
  return 0;
}

function updateTotals() {
  const subtotal = getSubtotal();
  const delivery = getDeliveryCharge();
  const grandTotal = subtotal + delivery;

  subtotalEl.textContent = subtotal;
  deliveryChargeEl.textContent = delivery;
  grandTotalEl.textContent = grandTotal;
}

function renderCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-cart">Your cart is empty.</p >`;
    updateTotals();
    return;
  }

  cart.forEach((item) => {
    const row = document.createElement("div");
    row.className = "cart-item";

    row.innerHTML = `
      <div>
        <strong>${item.name}</strong><br>
        ${item.price} tk x ${item.quantity}
      </div>
      <div class="qty-controls">
        <button class="qty-btn" onclick="decreaseQty(${item.id})">-</button>
        <span>${item.quantity}</span>
        <button class="qty-btn" onclick="increaseQty(${item.id})">+</button>
      </div>
      <div><strong>${item.price * item.quantity} tk</strong></div>
      <div><button class="remove-btn" onclick="removeItem(${item.id})">Remove</button></div>
    `;

    cartItems.appendChild(row);
  });

  updateTotals();
}

cartButton.addEventListener("click", () => {
  cartModal.classList.remove("hidden");
  renderCart();
});

closeCart.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

deliveryArea.addEventListener("change", updateTotals);

checkoutForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (cart.length === 0) {
    orderMessage.textContent = "Your cart is empty.";
    return;
  }

  const name = document.getElementById("customer-name").value.trim();
  const phone = document.getElementById("customer-phone").value.trim();
  const address = document.getElementById("customer-address").value.trim();
  const area = deliveryArea.value;
  const paymentMethod = document.getElementById("payment-method").value;
  const subtotal = getSubtotal();
  const deliveryCharge = getDeliveryCharge();
  const total = subtotal + deliveryCharge;

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

  orderMessage.textContent = "Order ready. Google Sheets connection will be added next.";

  console.log(orderData);
});

renderProducts();
updateCartCount();
updateTotals();
