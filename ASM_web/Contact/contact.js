// Contact Form Handling
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  // ===== Mobile menu toggle (bị thiếu so với các trang khác) =====
  const menuOpenButton = document.querySelector("#menu-open-button");
  const menuCloseButton = document.querySelector("#menu-close-button");
  const navLinks = document.querySelectorAll(".nav-menu .nav-link");

  if (menuOpenButton && menuCloseButton) {
    menuOpenButton.addEventListener("click", () => {
      document.body.classList.toggle("show-mobile-menu");
    });

    menuCloseButton.addEventListener("click", () => menuOpenButton.click());

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (document.body.classList.contains("show-mobile-menu")) {
          menuOpenButton.click();
        }
      });
    });
  }
  // ===================================================================

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Validate form
      if (!name || !email || !message) {
        showMessage("Please fill in all fields", "error");
        return;
      }

      if (!validateEmail(email)) {
        showMessage("Please enter a valid email address", "error");
        return;
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        showMessage(
          "Thank you for your message! We will get back to you soon.",
          "success",
        );
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  // Smooth scroll for navigation
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
});

// Email validation function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Show message function
function showMessage(message, type) {
  // Remove existing messages
  const existingMsg = document.querySelector(".form-message");
  if (existingMsg) {
    existingMsg.remove();
  }

  // Create message element
  const messageDiv = document.createElement("div");
  messageDiv.className = `form-message ${type}`;
  messageDiv.textContent = message;

  // Add styles
  messageDiv.style.cssText = `
        padding: 15px 20px;
        margin-bottom: 20px;
        border-radius: 4px;
        font-size: 0.95rem;
        animation: slideIn 0.3s ease;
    `;

  if (type === "success") {
    messageDiv.style.backgroundColor = "#d4edda";
    messageDiv.style.color = "#155724";
    messageDiv.style.border = "1px solid #c3e6cb";
  } else {
    messageDiv.style.backgroundColor = "#f8d7da";
    messageDiv.style.color = "#721c24";
    messageDiv.style.border = "1px solid #f5c6cb";
  }

  // Insert message
  const form = document.getElementById("contactForm");
  form.insertBefore(messageDiv, form.firstChild);

  // Auto remove after 5 seconds
  setTimeout(() => {
    messageDiv.style.animation = "slideOut 0.3s ease";
    setTimeout(() => messageDiv.remove(), 300);
  }, 5000);
}

// Add animation styles
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(style);

// Input animation on focus
document.querySelectorAll("input, textarea").forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.style.transform = "translateY(-2px)";
    this.parentElement.style.transition = "transform 0.3s ease";
  });

  input.addEventListener("blur", function () {
    this.parentElement.style.transform = "translateY(0)";
  });
});

// Add active class to current nav item
const currentLocation = window.location.hash || "#contact";
document.querySelectorAll(".nav-menu a").forEach((link) => {
  if (link.getAttribute("href") === currentLocation) {
    link.classList.add("active");
  }
});
