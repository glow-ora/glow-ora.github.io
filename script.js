const products = [
  {
    id: 1,
    name: "Judydoll Iron Mascara",
    price: 999,
    images: ["images/mascara.png"],
    description: "Slim metal wand mascara for clean, long lashes."
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
    description: "Cute acne patches (star, Hello Kitty, cartoon)."
  },
  {
    id: 3,
    name: "Hisyi Eyeshadow Palette",
    price: 299,
    images: ["images/eyeshadow.png"],
    description: "Neutral everyday shades with shimmer + matte."
  },
  {
    id: 4,
    name: "Oil Blotting Paper",
    price: 350,
    images: [
      "images/blotting-paper.png",
      "images/blotting-paper1.png",
      "images/blotting-paper2.png"
    ],
    description: "100 sheets, oil control, compact case."
  }
];

let cart = [];

const productList = document.getElementById("product-list");
const cartCount = document.getElementById("cart-count");

function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const thumbnails = product.images
      .map(
        (img) =>
          `< img src="${img}" class="thumb" onclick="changeImage(this, ${product.id})">`
      )
      .join("");

    card.innerHTML = `
      <div class="image-box">
        < img src="${product.images[0]}" id="main-${product.id}" class="main-img">
        <div class="thumbs">${thumbnails}</div>
      </div>

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

function changeImage(el, id) {
  document.getElementById("main-" + id).src = el.src;
}

function addToCart(id) {
  const item = cart.find((i) => i.id === id);
  if (item) {
    item.quantity++;
  } else {
    const product = products.find((p) => p.id === id);
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  const total = cart.reduce((sum, i) => sum + i.quantity, 0);
  cartCount.textContent = total;
}

renderProducts();
