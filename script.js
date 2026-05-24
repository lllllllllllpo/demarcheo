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

  /* --- FAQ page : recherche + filtres catégoriels --------------------- */
  const faqSearch = document.querySelector('#faq-search-input');
  const faqPills = document.querySelectorAll('.faq-pill');
  const faqGroups = document.querySelectorAll('.faq-group');
  const faqEmpty = document.querySelector('.faq-empty');

  if (faqSearch && faqGroups.length) {
    let activeCategory = 'all';

    function normalize(str) {
      return str.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '');  // sans accents
    }

    function applyFilters() {
      const query = normalize(faqSearch.value.trim());
      let totalVisible = 0;

      faqGroups.forEach(function (group) {
        const groupCat = group.dataset.category;
        const categoryMatch = activeCategory === 'all' || activeCategory === groupCat;
        let groupVisible = 0;

        group.querySelectorAll('.faq-item').forEach(function (item) {
          const txt = normalize(item.textContent);
          const queryMatch = !query || txt.includes(query);

          if (categoryMatch && queryMatch) {
            item.classList.remove('hidden');
            groupVisible++;
            totalVisible++;
          } else {
            item.classList.add('hidden');
          }
        });

        // Cache le groupe entier s'il n'a aucun item visible
        group.style.display = groupVisible === 0 ? 'none' : '';
      });

      // Message "aucun résultat"
      if (faqEmpty) {
        faqEmpty.classList.toggle('show', totalVisible === 0);
      }
    }

    // Recherche en direct (debounce léger)
    let searchTimeout;
    faqSearch.addEventListener('input', function () {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(applyFilters, 120);
    });

    // Filtres catégoriels
    faqPills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        faqPills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        activeCategory = pill.dataset.category || 'all';
        applyFilters();
      });
    });

    // Effacer la recherche avec Échap
    faqSearch.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && faqSearch.value) {
        faqSearch.value = '';
        applyFilters();
      }
    });
  }

})();
