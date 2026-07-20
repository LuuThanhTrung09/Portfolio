// ===============================
// Unity page — gallery lightbox
// ===============================

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || "";
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

// Gallery images link straight to the file in the code (href="images/...").
// Clicking opens the lightbox instead of navigating away.
document.querySelectorAll(".gallery__slot").forEach((slot) => {
  slot.addEventListener("click", (e) => {
    e.preventDefault();
    const img = slot.querySelector("img");
    openLightbox(slot.getAttribute("href"), img ? img.alt : "");
  });
});
