/* ==========================================================================
   DÉMARCHÉO — Script principal
   Interactions minimales : menu mobile + smooth scroll + accessibilité FAQ
   ========================================================================== */

(function () {
  'use strict';

  /* --- Menu mobile ----------------------------------------------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navMain = document.querySelector('.nav-main');

  if (navToggle && navMain) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMain.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    });

    // Ferme le menu après clic sur un lien (mobile)
    navMain.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (navMain.classList.contains('open')) {
          navMain.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* --- FAQ : un seul ouvert à la fois (optionnel, plus propre) -------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item && other.open) other.open = false;
        });
      }
    });
  });

  /* --- Tracking événements (à brancher sur Make.com / GA4) ------------ */
  // Capture les clics sur les CTAs principaux pour analytics
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      const label = btn.textContent.trim();
      const href = btn.getAttribute('href') || '';

      // Hook pour Plausible / GA4 / Make.com webhook
      if (typeof window.plausible === 'function') {
        window.plausible('CTA Click', { props: { label: label, href: href } });
      }

      // Hook Make.com (à activer en production)
      // fetch('https://hook.eu1.make.com/XXX', {
      //   method: 'POST',
      //   body: JSON.stringify({ event: 'cta_click', label: label, href: href, ts: Date.now() })
      // });
    });
  });

  /* --- Lazy load des images (si ajoutées plus tard) ------------------- */
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[data-src]').forEach(function (img) {
      img.src = img.dataset.src;
      img.loading = 'lazy';
    });
  }

})();
