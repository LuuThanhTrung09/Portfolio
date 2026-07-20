// ===============================
// Unity page — gallery upload + lightbox
// ===============================

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add("is-open");
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightboxImg.src = "";
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

document.querySelectorAll(".gallery__slot").forEach((slot) => {
  const input = slot.querySelector(".gallery__input");

  input.addEventListener("change", () => {
    const file = input.files && input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target.result;

      let img = slot.querySelector("img");
      if (!img) {
        img = document.createElement("img");
        slot.prepend(img);
      }
      img.src = src;
      img.alt = file.name;
      slot.classList.add("has-image");
      slot.dataset.src = src;
    };
    reader.readAsDataURL(file);
  });

  // Clicking a slot that already has an image opens the lightbox
  // instead of re-triggering the file picker.
  slot.addEventListener("click", (e) => {
    if (slot.classList.contains("has-image")) {
      e.preventDefault();
      openLightbox(slot.dataset.src);
    }
  });
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // ===============================
  // Fade khi trang tải
  // ===============================

  window.addEventListener("load", () => {
    const hero = document.querySelector(".hero");
    if (hero) {
      hero.style.opacity = "1";
      hero.style.transform = "translateY(0)";
    }
  });

  // ===============================
  // Scroll Reveal cho các card
  // ===============================

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transition =
            "opacity .8s ease, transform .8s ease";
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  document.querySelectorAll(".card, .project").forEach((card) => {
    revealObserver.observe(card);
  });

  // ===============================
  // Navbar blur khi scroll
  // ===============================

  const nav = document.querySelector("nav");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      nav.style.background = "rgba(245, 244, 239, .96)";
      nav.style.boxShadow = "0 5px 25px rgba(0,0,0,.06)";
    } else {
      nav.style.background = "rgba(245, 244, 239, .85)";
      nav.style.boxShadow = "none";
    }
  });

  // ===============================
  // Hiệu ứng gõ chữ cho tên
  // ===============================

  const nameEl = document.querySelector(".hero__name");

  if (nameEl) {
    const fullText = nameEl.textContent;

    if (prefersReducedMotion) {
      nameEl.textContent = fullText;
    } else {
      nameEl.textContent = "";
      let i = 0;

      function typing() {
        if (i < fullText.length) {
          nameEl.textContent += fullText.charAt(i);
          i++;
          setTimeout(typing, 65);
        }
      }

      typing();
    }
  }

  // ===============================
  // Năm footer tự động
  // ===============================

  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
