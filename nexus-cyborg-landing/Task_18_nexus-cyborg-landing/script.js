const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

// Count-up figures animate once when they enter the viewport.
const counters = document.querySelectorAll('[data-count]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const start = performance.now();
    const duration = 1200;
    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = String(Math.round(target * (1 - Math.pow(1 - progress, 3)))).padStart(2, '0');
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    observer.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach(counter => observer.observe(counter));

// Subtle pointer parallax on the hero artwork (disabled for touch/reduced motion).
const visual = document.querySelector('.hero-visual');
if (visual && matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  visual.addEventListener('pointermove', event => {
    const rect = visual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    visual.style.setProperty('--mx', `${x * 9}px`);
    visual.style.setProperty('--my', `${y * 9}px`);
  });
  visual.addEventListener('pointerleave', () => {
    visual.style.setProperty('--mx', '0px');
    visual.style.setProperty('--my', '0px');
  });
}
