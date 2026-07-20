// Cart Management
let cart = [];

// ===================================================
// ĐỊA CHỈ QUÁN — 128 Bạch Đằng, Hải Châu, Đà Nẵng
// ===================================================
const CAFE_LAT = 16.0678;
const CAFE_LNG = 108.2208;
const CAFE_ADDRESS = "128 Bạch Đằng, Quận Hải Châu, Đà Nẵng";

// Tính khoảng cách thực (km) bằng công thức Haversine
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Quy đổi khoảng cách → phí ship
function calcShippingFee(km) {
  if (km <= 2) return { fee: 0, label: "Miễn phí 🎉" };
  if (km <= 5) return { fee: 15000, label: "15.000₫" };
  if (km <= 10) return { fee: 25000, label: "25.000₫" };
  return { fee: 35000, label: "35.000₫" };
}

// Biến lưu phí ship hiện tại (null = chưa có địa chỉ hợp lệ)
let currentShippingFee = null;
let geocodeTimer = null;

// Geocode địa chỉ bằng Nominatim (OpenStreetMap — miễn phí)
async function geocodeAddress(address) {
  const query = encodeURIComponent(address + ", Việt Nam");
  const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;
  const res = await fetch(url, {
    headers: { "Accept-Language": "vi" },
  });
  const data = await res.json();
  if (!data.length) return null;
  return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
}

// Xử lý sau khi người dùng nhập địa chỉ (debounce 800ms)
function onAddressInput() {
  clearTimeout(geocodeTimer);
  const address = document.getElementById("customer-address").value.trim();
  const resultEl = document.getElementById("distance-result");
  const loaderEl = document.getElementById("distance-loader");
  const iconEl = document.getElementById("distance-icon");
  const textEl = document.getElementById("distance-text");
  const feeEl = document.getElementById("distance-fee-text");

  if (address.length < 10) {
    resultEl.style.display = "none";
    currentShippingFee = null;
    updateOrderSummary();
    return;
  }

  // Show loader
  resultEl.style.display = "block";
  loaderEl.style.display = "inline";
  iconEl.textContent = "";
  textEl.textContent = "";
  feeEl.textContent = "";

  geocodeTimer = setTimeout(async () => {
    try {
      const coords = await geocodeAddress(address);
      loaderEl.style.display = "none";

      if (!coords) {
        iconEl.textContent = "⚠️";
        textEl.textContent = "Không tìm thấy địa chỉ. Kiểm tra lại nhé!";
        textEl.className = "distance-text text-warn";
        feeEl.textContent = "";
        currentShippingFee = null;
        updateOrderSummary();
        return;
      }

      const km = haversine(CAFE_LAT, CAFE_LNG, coords.lat, coords.lng);
      const { fee, label } = calcShippingFee(km);
      currentShippingFee = fee;

      const isFree = fee === 0;
      iconEl.textContent = isFree ? "🎉" : "📍";
      textEl.textContent = `Khoảng cách: ~${km.toFixed(1)} km từ quán`;
      textEl.className = "distance-text";
      feeEl.textContent = `Phí giao hàng: ${label}`;
      feeEl.className = isFree
        ? "distance-fee-text fee-free"
        : "distance-fee-text";

      updateOrderSummary();
    } catch (err) {
      loaderEl.style.display = "none";
      iconEl.textContent = "⚠️";
      textEl.textContent = "Lỗi kết nối. Thử lại sau!";
      textEl.className = "distance-text text-warn";
      currentShippingFee = null;
      updateOrderSummary();
    }
  }, 800);
}

// Get shipping fee
function getShippingFee() {
  return currentShippingFee;
}

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem("fujiCafeCart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
  updateCartDisplay();
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("fujiCafeCart", JSON.stringify(cart));
}

// Update cart display
function updateCartDisplay() {
  const cartItemsContainer = document.getElementById("cart-items");
  const emptyCart = document.getElementById("empty-cart");
  const orderSummary = document.getElementById("order-summary");
  const cartCount = document.getElementById("cart-count");

  if (cart.length === 0) {
    emptyCart.style.display = "block";
    cartItemsContainer.innerHTML = "";
    orderSummary.style.display = "none";
    cartCount.textContent = "0";
  } else {
    emptyCart.style.display = "none";
    orderSummary.style.display = "block";
    cartCount.textContent = cart.length;

    // Render cart items
    cartItemsContainer.innerHTML = cart
      .map(
        (item, index) => `
            <div class="cart-item" data-index="${index}">
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <h3 class="item-name-cart">${item.name}</h3>
                    <p class="item-size">Size: ${item.size}</p>
                    <p class="item-price-cart">${item.price.toLocaleString("vi-VN")}₫</p>
                    <div class="item-actions">
                        <div class="quantity-control">
                            <button class="qty-btn qty-decrease" data-index="${index}" ${item.quantity <= 1 ? "disabled" : ""}>−</button>
                            <span class="qty-value">${item.quantity}</span>
                            <button class="qty-btn qty-increase" data-index="${index}">+</button>
                        </div>
                        <button class="remove-btn" data-index="${index}" title="Xóa sản phẩm">🗑️</button>
                    </div>
                </div>
            </div>
        `,
      )
      .join("");

    // Add event listeners
    addCartEventListeners();

    // Update summary
    updateOrderSummary();
  }
}

// Add event listeners to cart items
function addCartEventListeners() {
  // Quantity decrease
  document.querySelectorAll(".qty-decrease").forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = parseInt(this.dataset.index);
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
        saveCart();
        updateCartDisplay();
      }
    });
  });

  // Quantity increase
  document.querySelectorAll(".qty-increase").forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = parseInt(this.dataset.index);
      cart[index].quantity++;
      saveCart();
      updateCartDisplay();
    });
  });

  // Remove item
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = parseInt(this.dataset.index);
      showDeleteConfirm(index);
    });
  });
}

// Custom delete confirm dialog
function showDeleteConfirm(index) {
  const dialog = document.getElementById("delete-confirm");
  dialog.classList.add("active");

  document.getElementById("btn-delete-ok").onclick = () => {
    dialog.classList.remove("active");
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
  };

  document.getElementById("btn-delete-cancel").onclick = () => {
    dialog.classList.remove("active");
  };

  document.getElementById("delete-confirm-backdrop").onclick = () => {
    dialog.classList.remove("active");
  };
}

// Update order summary
function updateOrderSummary() {
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shippingFee = currentShippingFee;
  const shippingEl = document.getElementById("shipping-fee");
  const totalEl = document.getElementById("total");

  if (shippingFee === null) {
    shippingEl.textContent = "-- (nhập địa chỉ)";
    totalEl.textContent = subtotal.toLocaleString("vi-VN") + "₫";
  } else if (shippingFee === 0) {
    shippingEl.innerHTML = '<span class="fee-free">Miễn phí 🎉</span>';
    totalEl.textContent = subtotal.toLocaleString("vi-VN") + "₫";
  } else {
    shippingEl.textContent = shippingFee.toLocaleString("vi-VN") + "₫";
    totalEl.textContent =
      (subtotal + shippingFee).toLocaleString("vi-VN") + "₫";
  }

  document.getElementById("subtotal").textContent =
    subtotal.toLocaleString("vi-VN") + "₫";
}

// Form validation
function validateForm() {
  const name = document.getElementById("customer-name").value.trim();
  const phone = document.getElementById("customer-phone").value.trim();
  const address = document.getElementById("customer-address").value.trim();

  if (!name) {
    alert("Vui lòng nhập họ và tên!");
    return false;
  }

  if (!phone || !/^[0-9]{10,11}$/.test(phone)) {
    alert("Vui lòng nhập số điện thoại hợp lệ (10-11 số)!");
    return false;
  }

  if (!address) {
    alert("Vui lòng nhập địa chỉ giao hàng!");
    return false;
  }

  if (currentShippingFee === null) {
    alert(
      "Hệ thống chưa tính được khoảng cách. Vui lòng kiểm tra lại địa chỉ!",
    );
    document.getElementById("customer-address").focus();
    return false;
  }

  return true;
}

// Place order
document
  .getElementById("place-order-btn")
  ?.addEventListener("click", function () {
    if (cart.length === 0) {
      alert("Giỏ hàng của bạn đang trống!");
      return;
    }

    if (!validateForm()) {
      return;
    }

    const shippingFee = currentShippingFee || 0;
    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    const orderData = {
      customer: {
        name: document.getElementById("customer-name").value,
        phone: document.getElementById("customer-phone").value,
        email: document.getElementById("customer-email").value,
        address: document.getElementById("customer-address").value,
        deliveryTime: document.getElementById("delivery-time").value,
        note: document.getElementById("customer-note").value,
        payment: document.querySelector('input[name="payment"]:checked').value,
      },
      items: cart,
      summary: {
        subtotal: subtotal,
        shipping: shippingFee,
        total: subtotal + shippingFee,
      },
      orderDate: new Date().toISOString(),
    };

    const orders = JSON.parse(localStorage.getItem("fujiCafeOrders") || "[]");
    orders.push(orderData);
    localStorage.setItem("fujiCafeOrders", JSON.stringify(orders));

    cart = [];
    saveCart();

    const successModal = document.getElementById("success-modal");
    successModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });

// Bind address input to geocoding
document.addEventListener("DOMContentLoaded", () => {
  const addressEl = document.getElementById("customer-address");
  if (addressEl) {
    addressEl.addEventListener("input", onAddressInput);
    addressEl.addEventListener("paste", () => setTimeout(onAddressInput, 100));
  }
});

// View order button
document
  .getElementById("view-order-btn")
  ?.addEventListener("click", function () {
    const orders = JSON.parse(localStorage.getItem("fujiCafeOrders") || "[]");
    const lastOrder = orders[orders.length - 1];

    if (lastOrder) {
      alert(
        "Thông tin đơn hàng:\n\n" +
          "Khách hàng: " +
          lastOrder.customer.name +
          "\n" +
          "Số điện thoại: " +
          lastOrder.customer.phone +
          "\n" +
          "Địa chỉ: " +
          lastOrder.customer.address +
          "\n" +
          "Tổng tiền: " +
          lastOrder.summary.total.toLocaleString("vi-VN") +
          "₫",
      );
    }

    // Redirect to menu
    window.location.href = "/ASM_web/ASM_web/ASM_web/Menu/Menu.html";
  });

// Mobile menu functionality
const menuOpenButton = document.getElementById("menu-open-button");
const menuCloseButton = document.getElementById("menu-close-button");
const body = document.body;

if (menuOpenButton) {
  menuOpenButton.addEventListener("click", () => {
    body.classList.add("show-mobile-menu");
  });
}

if (menuCloseButton) {
  menuCloseButton.addEventListener("click", () => {
    body.classList.remove("show-mobile-menu");
  });
}

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    body.classList.contains("show-mobile-menu") &&
    !e.target.closest(".nav-links") &&
    !e.target.closest("#menu-open-button")
  ) {
    body.classList.remove("show-mobile-menu");
  }
});

// Close menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("show-mobile-menu");
  });
});

// Initialize cart on page load
document.addEventListener("DOMContentLoaded", loadCart);
