/**
 * Eventina Organisers — Artists & Talent Roster Interactions
 * Pure Vanilla JavaScript (Zero Dependencies)
 */

(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('[data-artist-filter]');
    const artistCards = document.querySelectorAll('[data-artist-category]');
    const countDisplay = document.getElementById('artist-count-display');
    const emptyState = document.getElementById('artist-empty-state');
    const totalCount = artistCards.length;

    if (!filterButtons.length || !artistCards.length) return;

    function applyFilter(category) {
      let visibleCount = 0;

      artistCards.forEach(card => {
        const itemCategory = card.getAttribute('data-artist-category');
        const matches = (category === 'all' || itemCategory === category);

        if (matches) {
          card.classList.remove('is-hidden');
          card.removeAttribute('hidden');
          visibleCount++;
        } else {
          card.classList.add('is-hidden');
          card.setAttribute('hidden', '');
        }
      });

      // Update button active state
      filterButtons.forEach(btn => {
        const isCurrent = btn.getAttribute('data-artist-filter') === category;
        btn.classList.toggle('is-active', isCurrent);
        btn.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
      });

      // Update count text
      if (countDisplay) {
        if (category === 'all') {
          countDisplay.textContent = `Showing all ${totalCount} master talents & performance ensembles`;
        } else {
          countDisplay.textContent = `Showing ${visibleCount} of ${totalCount} talents in this genre`;
        }
      }

      // Empty state display
      if (emptyState) {
        if (visibleCount === 0) {
          emptyState.classList.add('is-visible');
          emptyState.removeAttribute('hidden');
        } else {
          emptyState.classList.remove('is-visible');
          emptyState.setAttribute('hidden', '');
        }
      }
    }

    // Attach click events
    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const category = button.getAttribute('data-artist-filter');
        applyFilter(category);
      });
    });

    // Check URL query parameters (e.g., ?genre=vocalists)
    const urlParams = new URLSearchParams(window.location.search);
    const genreParam = urlParams.get('genre');
    if (genreParam) {
      const targetBtn = document.querySelector(`[data-artist-filter="${genreParam}"]`);
      if (targetBtn) {
        applyFilter(genreParam);
      }
    }
  });
})();
