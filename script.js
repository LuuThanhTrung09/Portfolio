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
// Scroll Reveal cho các card
// ===============================

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.transition = "opacity .8s ease, transform .8s ease";
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 },
);

document.querySelectorAll(".card").forEach((card) => {
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
