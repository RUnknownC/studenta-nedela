/* 
   Viena darba nedēļa — galvenā loģika
   - Theme toggle (light / dark),
   - Mobile menu burger ikona,
   - Desktop day-carousel formas bultiņas.
*/

(function () {
  'use strict';

  /* Theme toggle  */
  const root = document.documentElement;
  const STORAGE_KEY = 'week-theme';

  function getInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    // update toggle for theme
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.setAttribute('aria-pressed', theme === 'dark');
  }

  applyTheme(getInitialTheme());

  document.addEventListener('click', function (e) {
    const btn = e.target.closest('#theme-toggle');
    if (!btn) return;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  /*  Mobile menu  */
  document.addEventListener('click', function (e) {
    const toggle = e.target.closest('#menu-toggle');
    const nav = document.getElementById('site-nav');
    if (!nav) return;

    if (toggle) {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
      return;
    }
    // close menu when clicking outside of the menu.
    if (nav.classList.contains('is-open')) {
      if (!e.target.closest('#site-nav') || e.target.closest('#site-nav a')) {
        nav.classList.remove('is-open');
        const t = document.getElementById('menu-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Close menu on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    const nav = document.getElementById('site-nav');
    if (nav && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      const t = document.getElementById('menu-toggle');
      if (t) {
        t.setAttribute('aria-expanded', 'false');
        t.focus();
      }
    }
  });

  /* Day carousel (desktop)*/
  /* Karuseļa tipa būtība, lai ietu cauri dienām */
  const carousel = document.querySelector('.day-carousel');
  if (carousel) {
    const track  = carousel.querySelector('.day-carousel__track');
    const prev   = carousel.querySelector('.carousel-arrow--prev');
    const next   = carousel.querySelector('.carousel-arrow--next');
    const cards  = track ? track.querySelectorAll('.day-card') : [];

    let index = 0;
    const visible = 3;
    const max = Math.max(0, cards.length - visible);

    function update() {
      if (!track) return;
      // Move by one card-width + gap each step. Use card 0's width as reference.
      if (cards.length === 0) return;
      const cardW = cards[0].getBoundingClientRect().width;
      const styles = getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || 0);
      const offset = (cardW + gap) * index;
      track.style.transform = `translateX(-${offset}px)`;

      if (prev) prev.disabled = index <= 0;
      if (next) next.disabled = index >= max;
    }

    if (prev) prev.addEventListener('click', () => { index = Math.max(0, index - 1); update(); });
    if (next) next.addEventListener('click', () => { index = Math.min(max, index + 1); update(); });

    // Keep correct position on resize
    window.addEventListener('resize', update);
    // Initial state
    requestAnimationFrame(update);

    const viewport = carousel.querySelector('.day-carousel__viewport');
    if (viewport) {
      viewport.setAttribute('tabindex', '0');
      viewport.setAttribute('role', 'region');
      viewport.setAttribute('aria-label', 'Dienu izvēle');
      viewport.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft')  { index = Math.max(0, index - 1); update(); e.preventDefault(); }
        if (e.key === 'ArrowRight') { index = Math.min(max, index + 1); update(); e.preventDefault(); }
      });
    }
  }
})();
