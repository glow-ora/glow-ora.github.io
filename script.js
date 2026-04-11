document.addEventListener("DOMContentLoaded", () => {
  const searchDrawer = document.getElementById("searchDrawer");
  const mobileMenu = document.getElementById("mobileMenu");
  const searchToggle = document.getElementById("searchToggle");
  const menuToggle = document.getElementById("menuToggle");
  const slides = document.querySelectorAll(".slide");
  const catalogLinks = document.querySelectorAll('a[href="#catalog"]');

  const cartCount = document.getElementById("cart-count");
  const cartItemsContainer = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("subtotal");
  const deliveryEl = document.getElementById("deliveryTotal");
  const totalEl = document.getElementById("total");

  const cartDrawer = document.getElementById("cartDrawer");
  const cartOverlay = document.getElementById("cartOverlay");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const orderForm = document.getElementById("orderForm");
  const deliveryAreaSelect = document.getElementById("deliveryArea");

  let currentSlide = 0;
  let sliderInterval = null;
  const sliderDelay = 3000;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function showSlide(index) {
    if (!slides.length) return;

    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
      slide.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    if (!slides.length) return;
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function startSlider() {
    if (!slides.length) return;
    stopSlider();
    sliderInterval = setInterval(nextSlide, sliderDelay);
  }

  function stopSlider() {
    if (sliderInterval) {
      clearInterval(sliderInterval);
      sliderInterval = null;
    }
  }

  function openPanel(panelToOpen, panelToClose = null) {
    if (!panelToOpen) return;

    if (panelToClose && panelToClose !== panelToOpen) {
      closePanel(panelToClose);
    }

    panelToOpen.classList.remove("hidden");
    panelToOpen.classList.add("is-visible");
  }

  function closePanel(panel) {
    if (!panel) return;
    panel.classList.remove("is-visible");
    panel.classList.add("hidden");
  }

  function togglePanel(panelToToggle, panelToClose = null) {
    if (!panelToToggle) return;

    const isOpen = panelToToggle.classList.contains("is-visible");

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

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCartCount() {
    if (!cartCount) return;
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
  }

  function addToCart(product) {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1
      });
    }

    saveCart();
    updateCartCount();
    renderCart();
    openCartDrawer();
  }

  function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCart();
  }

  function changeQuantity(productId, change) {
    const item = cart.find((product) => product.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    saveCart();
    updateCartCount();
    renderCart();
  }

  function calculateSubtotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  function calculateDelivery(subtotal) {
    if (subtotal === 0) return 0;

    const selectedArea = deliveryAreaSelect ? deliveryAreaSelect.value : "dhaka";
    let delivery = selectedArea === "outside" ? 120 : 80;

    const acneItem = cart.find((item) => item.id === "acne");
    if (acneItem && acneItem.quantity >= 4) {
      delivery = 0;
    }

    return delivery;
  }

  function renderCart() {
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      if (subtotalEl) subtotalEl.textContent = "Subtotal: ৳0";
      if (deliveryEl) deliveryEl.textContent = "Delivery: ৳0";
      if (totalEl) totalEl.textContent = "Total: ৳0";
      return;
    }

    cart.forEach((item) => {
      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";

      itemEl.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p class="cart-item-desc">${item.description}</p>
          <p class="cart-item-meta">Price: ৳${item.price} | Quantity: ${item.quantity}</p>
          <div class="cart-item-actions">
            <button type="button" class="qty-btn minus-btn" data-id="${item.id}">-</button>
            <button type="button" class="qty-btn plus-btn" data-id="${item.id}">+</button>
            <button type="button" class="remove-btn" data-id="${item.id}">Remove</button>
          </div>
        </div>
      `;

      cartItemsContainer.appendChild(itemEl);
    });

    const subtotal = calculateSubtotal();
    const delivery = calculateDelivery(subtotal);
    const total = subtotal + delivery;

    if (subtotalEl) subtotalEl.textContent = `Subtotal: ৳${subtotal}`;
    if (deliveryEl) deliveryEl.textContent = `Delivery: ৳${delivery}`;
    if (totalEl) totalEl.textContent = `Total: ৳${total}`;

    document.querySelectorAll(".minus-btn").forEach((button) => {
      button.addEventListener("click", () => {
        changeQuantity(button.dataset.id, -1);
      });
    });

    document.querySelectorAll(".plus-btn").forEach((button) => {
      button.addEventListener("click", () => {
        changeQuantity(button.dataset.id, 1);
      });
    });

    document.querySelectorAll(".remove-btn").forEach((button) => {
      button.addEventListener("click", () => {
        removeFromCart(button.dataset.id);
      });
    });
  }

  function clearCart() {
    cart = [];
    saveCart();
    updateCartCount();
    renderCart();
  }

  function openCartDrawer() {
    if (!cartDrawer || !cartOverlay) return;

    cartDrawer.classList.remove("hidden");
    cartOverlay.classList.remove("hidden");

    requestAnimationFrame(() => {
      cartDrawer.classList.add("is-visible");
      cartOverlay.classList.add("is-visible");
    });
  }

  function closeCartDrawer() {
    if (!cartDrawer || !cartOverlay) return;

    cartDrawer.classList.remove("is-visible");
    cartOverlay.classList.remove("is-visible");

    setTimeout(() => {
      cartDrawer.classList.add("hidden");
      cartOverlay.classList.add("hidden");
    }, 300);
  }

  async function placeOrder(event) {
    event.preventDefault();

    if (!cart.length) {
      alert("Your cart is empty.");
      return;
    }

    const customerName = document.getElementById("customerName").value.trim();
    const customerPhone = document.getElementById("customerPhone").value.trim();
    const customerAddress = document.getElementById("customerAddress").value.trim();
    const deliveryArea = document.getElementById("deliveryArea").value;

    if (!customerName || !customerPhone || !customerAddress) {
      alert("Please fill in your name, phone, and address.");
      return;
    }

    const subtotal = calculateSubtotal();
    const delivery = calculateDelivery(subtotal);
    const total = subtotal + delivery;

    const payload = {
      customerName,
      customerPhone,
      customerAddress,
      deliveryArea,
      subtotal,
      delivery,
      total,
      items: cart
    };

    try {
      await fetch("YOUR_GOOGLE_APPS_SCRIPT_URL", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      alert("Order submitted successfully!");
      clearCart();
      orderForm.reset();
      closeCartDrawer();
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
    }
  }

  window.addToCart = addToCart;
  window.clearCart = clearCart;
  window.openCartDrawer = openCartDrawer;

  if (slides.length > 0) {
    showSlide(currentSlide);
    startSlider();
  }

  if (searchToggle && searchDrawer) {
    searchToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      togglePanel(searchDrawer, mobileMenu);
    });
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      togglePanel(mobileMenu, searchDrawer);
    });
  }

  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", closeCartDrawer);
  }

  if (cartOverlay) {
    cartOverlay.addEventListener("click", closeCartDrawer);
  }

  if (deliveryAreaSelect) {
    deliveryAreaSelect.addEventListener("change", renderCart);
  }

  if (orderForm) {
    orderForm.addEventListener("submit", placeOrder);
  }

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
      closeCartDrawer();
    }
  });

  document.addEventListener("click", (event) => {
    const clickedInsideSearch =
      (searchDrawer && searchDrawer.contains(event.target)) ||
      (searchToggle && searchToggle.contains(event.target));

    const clickedInsideMenu =
      (mobileMenu && mobileMenu.contains(event.target)) ||
      (menuToggle && menuToggle.contains(event.target));

    if (!clickedInsideSearch) {
      closePanel(searchDrawer);
    }

    if (!clickedInsideMenu) {
      closePanel(mobileMenu);
    }
  });

  updateCartCount();
  renderCart();
});
