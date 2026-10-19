/**
 * Eventina Organisers — Testimonials & Social Proof Interactions
 * Pure Vanilla JavaScript (Zero Dependencies)
 */

(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('[data-testimonial-filter]');
    const testimonialCards = document.querySelectorAll('[data-testimonial-category]');

    if (!filterButtons.length || !testimonialCards.length) return;

    function applyFilter(category) {
      testimonialCards.forEach(card => {
        const itemCategory = card.getAttribute('data-testimonial-category');
        const matches = (category === 'all' || itemCategory === category);

        if (matches) {
          card.classList.remove('is-hidden');
          card.removeAttribute('hidden');
        } else {
          card.classList.add('is-hidden');
          card.setAttribute('hidden', '');
        }
      });

      filterButtons.forEach(btn => {
        const isCurrent = btn.getAttribute('data-testimonial-filter') === category;
        btn.classList.toggle('is-active', isCurrent);
        btn.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
      });
    }

    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const category = button.getAttribute('data-testimonial-filter');
        applyFilter(category);
      });
    });
  });
})();
