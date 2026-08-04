const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// ===============================
// Fade khi trang tải
// ===============================

window.addEventListener("load", () => {
  const hero = document.querySelector(".hero");
  hero.style.opacity = "1";
  hero.style.transform = "translateY(0)";
});

// ===============================
// Scroll Reveal cho arch-card & gallery-item
// ===============================

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.transition = "opacity .7s ease, transform .7s ease";
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

document
  .querySelectorAll(".arch-card, .gallery-item")
  .forEach((el) => revealObserver.observe(el));

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
// Lightbox — phóng to ảnh khi click
// ===============================

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

function openLightbox(src, caption) {
  lightboxImg.src = src;
  lightboxImg.alt = caption || "";
  lightboxCaption.textContent = caption || "";
  lightbox.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  document.body.style.overflow = "";
  lightboxImg.src = "";
}

document.querySelectorAll(".lightbox-trigger").forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    openLightbox(trigger.getAttribute("href"), trigger.dataset.caption);
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});

// ===============================
// Năm footer tự động
// ===============================

const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
