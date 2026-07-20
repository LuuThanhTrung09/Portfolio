// Additional interactions for the Front-end showcase page
document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Demo buttons now all have real links, so no click-interception is
  // needed — the browser navigates normally via the anchor's href.

  // Scroll reveal for hero copy, section heads, project cards, tech items
  const revealEls = document.querySelectorAll('.reveal');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 4, 3) * 90}ms`;
      revealObserver.observe(el);
    });
  }

  // Lightweight hero parallax using transform (cheaper than background-position)
  const heroBg = document.querySelector('.hero--frontend .hero__bg');
  if (heroBg && !prefersReducedMotion) {
    let ticking = false;
    const updateParallax = () => {
      const offset = Math.min(window.scrollY * 0.25, 160);
      heroBg.style.transform = `translateY(${offset}px) scale(1.08)`;
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});