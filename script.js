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
  const deliveryEl = document.getElementById("delivery");
  const totalEl = document.getElementById("total");

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
    alert(product.name + " added to cart");
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
    return 80;
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
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>Price: ৳${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
        </div>
        <div class="cart-item-actions">
          <button class="qty-btn minus-btn" data-id="${item.id}">-</button>
          <button class="qty-btn plus-btn" data-id="${item.id}">+</button>
          <button class="remove-btn" data-id="${item.id}">Remove</button>
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

  window.addToCart = addToCart;
  window.clearCart = clearCart;
  window.goToCart = function () {
    window.location.href = "cart.html";
  };

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
