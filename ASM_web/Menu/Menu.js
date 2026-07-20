// ===== Cart Badge =====
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("fujiCafeCart") || "[]");
  const totalQty = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const badge = document.getElementById("cart-badge");
  if (!badge) return;
  if (totalQty > 0) {
    badge.textContent = totalQty > 99 ? "99+" : totalQty;
    badge.style.display = "flex";
    // Re-trigger animation
    badge.style.animation = "none";
    badge.offsetHeight; // reflow
    badge.style.animation = "badgePop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
  } else {
    badge.style.display = "none";
  }
}

// Update badge on page load
updateCartBadge();

// Filter functionality
const filterButtons = document.querySelectorAll(".filter-btn");
const menuSections = document.querySelectorAll(".menu-section");
const menuItems = document.querySelectorAll(".menu-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    // Update active button
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Filter menu sections and items
    if (filter === "all") {
      menuSections.forEach((section) => {
        section.style.display = "block";
        section.style.animation = "fadeInUp 0.6s ease-out forwards";
      });
    } else if (filter === "popular" || filter === "new") {
      // Hide all sections first
      menuSections.forEach((section) => {
        section.style.display = "block";
      });

      // Show/hide items based on badge
      menuItems.forEach((item) => {
        const badge = item.querySelector(`.item-badge.${filter}`);
        if (badge) {
          item.style.display = "block";
          item.style.animation = "fadeInUp 0.6s ease-out forwards";
        } else {
          item.style.display = "none";
        }
      });
    } else {
      // Filter by category
      menuSections.forEach((section) => {
        if (section.getAttribute("data-category") === filter) {
          section.style.display = "block";
          section.style.animation = "fadeInUp 0.6s ease-out forwards";
        } else {
          section.style.display = "none";
        }
      });

      // Show all items
      menuItems.forEach((item) => {
        item.style.display = "block";
      });
    }
  });
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add hover effect sound feedback (visual only)
menuItems.forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-8px) scale(1.02)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

menuSections.forEach((section) => {
  observer.observe(section);
});

// Mobile Menu Functionality
const menuOpenButton = document.getElementById("menu-open-button");
const menuCloseButton = document.getElementById("menu-close-button");
const body = document.body;

// Open mobile menu
if (menuOpenButton) {
  menuOpenButton.addEventListener("click", () => {
    body.classList.add("show-mobile-menu");
  });
}

// Close mobile menu
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

// Product Modal Functionality
const modal = document.getElementById("product-modal");
const modalOverlay = modal.querySelector(".modal-overlay");
const modalClose = modal.querySelector(".modal-close");

// Product data with images
const productImages = {
  "Cà Phê Đen":
    "https://i.pinimg.com/736x/40/a2/f8/40a2f8fa1abec9a2ed41bb7dc37e38c0.jpg",
  "Cà Phê Sữa":
    "https://i.pinimg.com/1200x/f5/79/43/f57943b99c98c2c790e6389458430ad7.jpg",
  Cappuccino:
    "https://i.pinimg.com/736x/52/41/31/52413159c7f291bbc186422481b3ac50.jpg",
  "Cà Phê Latte":
    "https://i.pinimg.com/736x/b5/5c/06/b55c06b03724413fb48baac017f4ac0d.jpg",
  "Matcha Latte":
    "https://i.pinimg.com/1200x/6b/c5/59/6bc5595361ab1769566eec2dbb767503.jpg",
  Espresso:
    "https://i.pinimg.com/736x/e9/23/1c/e9231c4ebfd1c901e50259882b9fffd9.jpg",
  "Cookie Bơ":
    "https://i.pinimg.com/736x/ae/c6/fe/aec6fe7f6f9f4cf2fd3663b785d61434.jpg",
  "Chocolate Nóng":
    "https://i.pinimg.com/736x/67/05/71/6705716f5dec624d372ae827c27f2df1.jpg",
  "Trà Hoa Anh Đào":
    "https://i.pinimg.com/736x/7e/4f/a6/7e4fa63e171d8ca6701024228bfe8689.jpg",
  "Yuzu Soda":
    "https://i.pinimg.com/736x/cf/04/a3/cf04a30b8167294537b8b78adaabed2d.jpg",
  "Hojicha Latte":
    "https://www.siftandsimmer.com/wp-content/uploads/2025/05/IMG_8933-2.jpg",
  "Cookie Cream":
    "https://i.pinimg.com/1200x/10/9c/d2/109cd288493a97b4232a0ee7565660ba.jpg",
  Tiramisu:
    "https://i.pinimg.com/1200x/24/1f/40/241f40cdb81ee38b3d1e87a593c5ace7.jpg",
  "Matcha Cheesecake":
    "https://i.pinimg.com/736x/09/4f/83/094f83a05768c20a2afa92b5ef2813d3.jpg",
  "Castella Cake":
    "https://i.pinimg.com/736x/3e/75/06/3e7506073b50fbe12e1140d6ca67b99d.jpg",
  Dorayaki:
    "https://i.pinimg.com/1200x/51/2f/88/512f88d1017a649998b0a433e69e77fd.jpg",
  "Strawberry Shortcake":
    "https://i.pinimg.com/736x/51/7c/aa/517caadd477607a943615b5fcdbd0b82.jpg",
  "Mille Crêpes":
    "https://i.pinimg.com/736x/0b/e4/46/0be4465b73ad9f9503bfff90e8b273cb.jpg",
};

let currentBasePrice = 0;

// Open modal when clicking on menu item
menuItems.forEach((item) => {
  item.addEventListener("click", function (e) {
    // Prevent opening if clicking on a badge
    if (e.target.closest(".item-badge")) return;

    const name = this.querySelector(".item-name").textContent;
    const description = this.querySelector(".item-description").textContent;
    const priceText = this.querySelector(".item-price").textContent;

    // Extract price number
    currentBasePrice = parseInt(priceText.replace(/[^\d]/g, ""));

    // Set modal content
    document.getElementById("modal-title").textContent = name;
    document.getElementById("modal-price").textContent = priceText;
    document.getElementById("modal-description").textContent = description;

    // Set images
    const imageUrl =
      productImages[name] ||
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500";
    document.getElementById("modal-img").src = imageUrl;
    document.getElementById("modal-img").alt = name;
    document.getElementById("modal-thumb").src = imageUrl;
    document.getElementById("modal-thumb").alt = name;

    // Reset selections
    document.querySelector('input[name="size"][value="Nhỏ"]').checked = true;

    // Update price display
    updateModalPrice();

    // Show modal
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

// Close modal
function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

// Prevent closing when clicking inside modal content
modal.querySelector(".modal-content").addEventListener("click", (e) => {
  e.stopPropagation();
});

// Size selection - update price
document.querySelectorAll('input[name="size"]').forEach((radio) => {
  radio.addEventListener("change", updateModalPrice);
});

// Update price based on selected size
function updateModalPrice() {
  const selectedSize = document.querySelector('input[name="size"]:checked');
  const sizePrice = parseInt(selectedSize.dataset.price || 0);
  const totalPrice = currentBasePrice + sizePrice;

  document.getElementById("modal-price").textContent =
    totalPrice.toLocaleString("vi-VN") + "₫";
}

// Order button - Add to cart
const orderBtn = document.querySelector(".order-btn");
orderBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const productName = document.getElementById("modal-title").textContent;
  const size = document.querySelector('input[name="size"]:checked').value;
  const priceText = document.getElementById("modal-price").textContent;
  const price = parseInt(priceText.replace(/[^\d]/g, ""));
  const imageUrl = document.getElementById("modal-img").src;

  // Get cart from localStorage
  let cart = JSON.parse(localStorage.getItem("fujiCafeCart") || "[]");

  // Check if item already exists in cart
  const existingItemIndex = cart.findIndex(
    (item) => item.name === productName && item.size === size,
  );

  if (existingItemIndex !== -1) {
    // If exists, increase quantity
    cart[existingItemIndex].quantity++;
  } else {
    // Add new item
    cart.push({
      name: productName,
      size: size,
      price: price,
      image: imageUrl,
      quantity: 1,
    });
  }

  // Save to localStorage
  localStorage.setItem("fujiCafeCart", JSON.stringify(cart));

  // Update cart badge
  updateCartBadge();

  // Show success message
  const originalText = orderBtn.querySelector(".btn-text").textContent;
  orderBtn.querySelector(".btn-text").textContent = "✓ Đã thêm vào giỏ!";
  orderBtn.style.background =
    "linear-gradient(135deg, #28a745 0%, #20c997 100%)";

  setTimeout(() => {
    orderBtn.querySelector(".btn-text").textContent = originalText;
    orderBtn.style.background = "";
    closeModal();

    const customConfirm = document.getElementById("cart-confirm");

    const confirmShown = localStorage.getItem("cartConfirmShown");

    if (!confirmShown) {
      customConfirm.classList.add("active");
      localStorage.setItem("cartConfirmShown", "true");
    }

    document.getElementById("btn-go-cart").onclick = () => {
      customConfirm.classList.remove("active");
      window.location.href = "/Cart/Cart.html";
    };

    document.getElementById("btn-stay").onclick = () => {
      customConfirm.classList.remove("active");
    };

    document.getElementById("cart-confirm-backdrop").onclick = () => {
      customConfirm.classList.remove("active");
    };
  }, 1500);
});

// Close modal with ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});
