// ============================================
// BARAC — Main Script
// ============================================

(function () {
  // ===== Menu =====
  const toggle   = document.querySelector('.nav__toggle');
  const links    = document.querySelector('.nav__links');
  const backdrop = document.querySelector('.nav__backdrop');
  const body     = document.body;

  function openMenu() {
    if (!links) return;
    links.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    if (toggle) {
      toggle.classList.add('active');
      toggle.textContent = '✕';
      toggle.setAttribute('aria-expanded', 'true');
    }
    body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!links) return;
    links.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    if (toggle) {
      toggle.classList.remove('active');
      toggle.textContent = '☰';
      toggle.setAttribute('aria-expanded', 'false');
    }
    body.style.overflow = '';
  }

  if (toggle && links) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      links.classList.contains('open') ? closeMenu() : openMenu();
    });

    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    if (backdrop) backdrop.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && links.classList.contains('open')) closeMenu();
    });
  }

  // ===== Nav shrink on scroll =====
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.padding = window.scrollY > 50 ? '0.75rem 0' : '1.25rem 0';
    });
  }

  // ===== Fade-in on scroll =====
  const fadeTargets = document.querySelectorAll(
    '.card, .about__text, .about__image, .trust__grid > div, .cta__inner'
  );

  console.log('[BARAC] Fade targets found:', fadeTargets.length);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        entry.target.classList.remove('is-visible');   // re-arm when out of view
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeTargets.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
}
})();