const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

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
// Scroll reveal cho feature card & gallery frame
// ===============================

const revealTargets = document.querySelectorAll(".feature-card, .frame");

if (!prefersReducedMotion && revealTargets.length) {
  revealTargets.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transition =
            "opacity .7s ease, transform .7s ease";
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  revealTargets.forEach((el) => revealObserver.observe(el));
}

// ===============================
// Năm footer tự động
// ===============================

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ===============================
// Gallery lightbox
// ===============================

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxNum = document.getElementById("lightboxNum");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxDesc = document.getElementById("lightboxDesc");
const lightboxClose = document.getElementById("lightboxClose");
const frames = document.querySelectorAll(".frame");

let lastFocused = null;

function openLightbox(frame) {
  const img = frame.querySelector("img");
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxNum.textContent = frame.dataset.index;
  lightboxTitle.textContent = frame.dataset.title;
  lightboxDesc.textContent = frame.dataset.desc;

  lastFocused = document.activeElement;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lastFocused) lastFocused.focus();
}

frames.forEach((frame) => {
  frame.addEventListener("click", () => openLightbox(frame));
});

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});
