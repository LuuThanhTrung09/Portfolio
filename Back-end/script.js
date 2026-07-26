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
// Năm footer tự động
// ===============================

const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
