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
  const PANEL_ANIMATION_DURATION = 350;

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
      const cartPanel = document.getElementById("cartPanel");
      if (cartPanel) {
        cartPanel.classList.add("hidden");
      }
    }
  });

  document.addEventListener("click", (event) => {
    const clickedInsideSearch =
      (searchDrawer && searchDrawer.contains(event.target)) ||
      (searchToggle && searchToggle.contains(event.target));

    const clickedInsideMenu =
      (mobileMenu && mobileMenu.contains(event.target)) ||
      (menuToggle && menuToggle.contains(event.target));

    const floatingCart = document.getElementById("floatingCart");
    const cartPanel = document.getElementById("cartPanel");

    const clickedInsideCart =
      (cartPanel && cartPanel.contains(event.target)) ||
      (floatingCart && floatingCart.contains(event.target));

    if (!clickedInsideSearch) {
      closePanel(searchDrawer);
    }

    if (!clickedInsideMenu) {
      closePanel(mobileMenu);
    }

    if (!clickedInsideCart && cartPanel) {
      cartPanel.classList.add("hidden");
    }
  });

  let cart = JSON.parse(localStorage.getItem("gloworaCart")) || [];

  function saveCart() {
    localStorage.setItem("gloworaCart", JSON.stringify(cart));
  }

  function renderCart() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const subtotalEl = document.getElementById("subtotal");
    const deliveryEl = document.getElementById("deliveryCharge");
    const grandTotalEl = document.getElementById("grandTotal");

    if (!cartItems || !cartCount || !subtotalEl || !deliveryEl || !grandTotalEl) {
      return;
    }

    cartItems.innerHTML = "";

    let subtotal = 0;
    let totalQty = 0;
    let freeDelivery = false;

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      totalQty += item.quantity;

      if (item.name === "Hydrocolloid Acne Patch" && item.quantity >= 4) {
        freeDelivery = true;
      }

      cartItems.innerHTML += `
        <div class="cart-item">
          <p><strong>${item.name}</strong></p>
          <p>${item.quantity} × ${item.price} tk = ${itemTotal} tk</p>
          <button onclick="removeFromCart(${index})">Remove</button>
        </div>
      `;
    });

    let delivery = 0;
    if (cart.length > 0) {
      delivery = freeDelivery ? 0 : 80;
    }

    const grandTotal = subtotal + delivery;

    cartCount.innerText = totalQty;
    subtotalEl.innerText = subtotal;
    deliveryEl.innerText = delivery;
    grandTotalEl.innerText = grandTotal;
  }

  window.addToCart = function (name, price, qtyId) {
    const qtyInput = document.getElementById(qtyId);
    const quantity = parseInt(qtyInput.value);

    if (!quantity || quantity < 1) {
      alert("Please enter a valid quantity");
      return;
    }

    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        name: name,
        price: price,
        quantity: quantity,
      });
    }

    saveCart();
    renderCart();
    alert(name + " added to cart");
  };

  window.removeFromCart = function (index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
  };

  window.toggleCart = function () {
    const cartPanel = document.getElementById("cartPanel");
    if (cartPanel) {
      cartPanel.classList.toggle("hidden");
    }
  };

  window.checkout = function () {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    let subtotal = 0;
    let freeDelivery = false;
    let message = "Hello, I want to order:%0A%0A";

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      if (item.name === "Hydrocolloid Acne Patch" && item.quantity >= 4) {
        freeDelivery = true;
      }

      message += `- ${item.name} x ${item.quantity} = ${itemTotal} tk%0A`;
    });

    const delivery = freeDelivery ? 0 : 80;
    const grandTotal = subtotal + delivery;

    message += `%0AProducts Total: ${subtotal} tk`;
    message += `%0ADelivery: ${delivery} tk`;
    message += `%0AGrand Total: ${grandTotal} tk`;

    window.open(`https://wa.me/8801581836550?text=${message}`, "_blank");
  };

  renderCart();
});
