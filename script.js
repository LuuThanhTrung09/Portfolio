// =====================
// CUSTOM CURSOR
// =====================
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");

let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";
});

function animateRing() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "translate(-50%,-50%) scale(2)";
    cursor.style.background = "#00e5ff";
    ring.style.borderColor = "rgba(0,229,255,0.7)";
    ring.style.transform = "translate(-50%,-50%) scale(1.4)";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "translate(-50%,-50%) scale(1)";
    cursor.style.background = "#00ff88";
    ring.style.borderColor = "rgba(0,255,136,0.6)";
    ring.style.transform = "translate(-50%,-50%) scale(1)";
  });
});

// =====================
// PARTICLES
// =====================
const particleContainer = document.getElementById("particles");
const colors = ["#00ff88", "#00e5ff", "#bf00ff", "#ff6b00"];

function createParticle() {
  const p = document.createElement("div");
  p.className = "particle";
  p.style.left = Math.random() * 100 + "%";
  p.style.background = colors[Math.floor(Math.random() * colors.length)];
  p.style.width = Math.random() * 3 + 2 + "px";
  p.style.height = p.style.width;
  p.style.boxShadow = `0 0 6px ${p.style.background}`;
  const dur = Math.random() * 12 + 8;
  p.style.animationDuration = dur + "s";
  p.style.animationDelay = Math.random() * 8 + "s";
  particleContainer.appendChild(p);
  setTimeout(() => p.remove(), (dur + 8) * 1000);
}

for (let i = 0; i < 20; i++) createParticle();
setInterval(createParticle, 1500);

// =====================
// SCROLL REVEAL
// =====================
const revealEls = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 100);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

revealEls.forEach((el) => observer.observe(el));

// =====================
// GLITCH EFFECT on hero title
// =====================
const heroLines = document.querySelectorAll(".hero-name .line2");
heroLines.forEach((el) => {
  setInterval(() => {
    if (Math.random() > 0.85) {
      el.style.transform = `translateX(${(Math.random() - 0.5) * 6}px)`;
      el.style.opacity = Math.random() * 0.3 + 0.7;
      setTimeout(() => {
        el.style.transform = "";
        el.style.opacity = 1;
      }, 80);
    }
  }, 2000);
});


// =====================
// LIGHTBOX
// =====================
let lbImages = [];
let lbIndex = 0;

function openLightbox(imgEl) {
  // Collect all images in the same .project-screenshots container
  const container = imgEl.closest(".project-screenshots");
  lbImages = container ? Array.from(container.querySelectorAll("img")) : [imgEl];
  lbIndex = lbImages.indexOf(imgEl);

  const overlay = document.getElementById("lightboxOverlay");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
  renderLightbox();
}

function renderLightbox() {
  const img = lbImages[lbIndex];
  const lbImg = document.getElementById("lightboxImg");
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  // Force re-trigger animation
  lbImg.style.animation = "none";
  lbImg.offsetHeight;
  lbImg.style.animation = "";

  document.getElementById("lightboxCaption").textContent = img.alt || "";
  document.getElementById("lightboxCounter").textContent =
    lbImages.length > 1 ? `${lbIndex + 1} / ${lbImages.length}` : "";

  // Hide nav arrows if only 1 image
  document.querySelector(".lightbox-prev").style.display =
    lbImages.length > 1 ? "flex" : "none";
  document.querySelector(".lightbox-next").style.display =
    lbImages.length > 1 ? "flex" : "none";
}

function closeLightbox() {
  document.getElementById("lightboxOverlay").classList.remove("active");
  document.body.style.overflow = "";
}

function lightboxNav(dir, e) {
  e.stopPropagation();
  lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
  renderLightbox();
}

// Keyboard support
document.addEventListener("keydown", (e) => {
  const overlay = document.getElementById("lightboxOverlay");
  if (!overlay.classList.contains("active")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") { lbIndex = (lbIndex + 1) % lbImages.length; renderLightbox(); }
  if (e.key === "ArrowLeft")  { lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; renderLightbox(); }
});

// Make screenshots clickable (cursor style)
document.querySelectorAll(".project-screenshots img").forEach((img) => {
  img.style.cursor = "zoom-in";
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.style.color = "";
    if (link.getAttribute("href") === "#" + current) {
      link.style.color = "#00ff88";
    }
  });
});