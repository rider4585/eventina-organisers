/**
 * Eventina Organisers — Portfolio Gallery & Accessible Lightbox
 * Pure Vanilla JavaScript (Zero Dependencies)
 */

(() => {
  'use strict';

  // 1. FILTER FUNCTIONALITY
  const filterButtons = document.querySelectorAll('[data-filter]');
  const galleryItems = document.querySelectorAll('[data-category]');

  if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const selectedFilter = button.getAttribute('data-filter');

        // Update active filter chip state
        filterButtons.forEach(btn => {
          btn.classList.remove('is-active');
          btn.setAttribute('aria-pressed', 'false');
        });
        button.classList.add('is-active');
        button.setAttribute('aria-pressed', 'true');

        // Filter cards with smooth transition
        galleryItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          if (selectedFilter === 'all' || itemCategory === selectedFilter) {
            item.classList.remove('is-hidden');
            item.removeAttribute('hidden');
          } else {
            item.classList.add('is-hidden');
            item.setAttribute('hidden', '');
          }
        });
      });
    });
  }

  // 2. ACCESSIBLE LIGHTBOX MODAL
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxDialog = document.getElementById('lightbox-dialog');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCloseBtn = document.getElementById('lightbox-close');
  const lightboxPrevBtn = document.getElementById('lightbox-prev');
  const lightboxNextBtn = document.getElementById('lightbox-next');

  if (!lightboxBackdrop || !lightboxDialog) return;

  let activeIndex = -1;
  let triggerElement = null;

  // Collect all lightbox trigger elements currently visible
  function getVisibleItems() {
    return Array.from(document.querySelectorAll('.portfolio-card:not([hidden]):not(.is-hidden)'));
  }

  function openLightbox(index) {
    const visibleItems = getVisibleItems();
    if (index < 0 || index >= visibleItems.length) return;

    activeIndex = index;
    triggerElement = document.activeElement;

    const currentItem = visibleItems[activeIndex];
    const fullImgUrl = currentItem.getAttribute('data-lightbox-img') || currentItem.querySelector('img')?.src;
    const title = currentItem.getAttribute('data-lightbox-title') || currentItem.querySelector('h3, .portfolio-card-title')?.textContent;
    const caption = currentItem.getAttribute('data-lightbox-desc') || '';

    if (lightboxImg) {
      lightboxImg.src = fullImgUrl;
      lightboxImg.alt = title || 'Event showcase photograph';
    }
    if (lightboxTitle) lightboxTitle.textContent = title || '';
    if (lightboxCaption) lightboxCaption.textContent = caption || '';

    lightboxBackdrop.classList.add('is-open');
    lightboxBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button inside lightbox
    setTimeout(() => {
      lightboxCloseBtn?.focus();
    }, 50);

    document.addEventListener('keydown', handleLightboxKeydown);
  }

  function closeLightbox() {
    if (!lightboxBackdrop.classList.contains('is-open')) return;

    lightboxBackdrop.classList.remove('is-open');
    lightboxBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    document.removeEventListener('keydown', handleLightboxKeydown);

    if (triggerElement && typeof triggerElement.focus === 'function') {
      triggerElement.focus();
    }
  }

  function showPrev() {
    const visibleItems = getVisibleItems();
    if (visibleItems.length === 0) return;
    const newIndex = (activeIndex - 1 + visibleItems.length) % visibleItems.length;
    openLightbox(newIndex);
  }

  function showNext() {
    const visibleItems = getVisibleItems();
    if (visibleItems.length === 0) return;
    const newIndex = (activeIndex + 1) % visibleItems.length;
    openLightbox(newIndex);
  }

  function handleLightboxKeydown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeLightbox();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPrev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showNext();
    }
  }

  // Bind trigger click on all portfolio cards
  document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const visibleItems = getVisibleItems();
      const index = visibleItems.indexOf(card);
      if (index !== -1) {
        openLightbox(index);
      }
    });

    // Keyboard ENTER / SPACE support for cards
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const visibleItems = getVisibleItems();
        const index = visibleItems.indexOf(card);
        if (index !== -1) {
          openLightbox(index);
        }
      }
    });
  });

  lightboxCloseBtn?.addEventListener('click', closeLightbox);
  lightboxPrevBtn?.addEventListener('click', showPrev);
  lightboxNextBtn?.addEventListener('click', showNext);

  lightboxBackdrop.addEventListener('click', (e) => {
    if (e.target === lightboxBackdrop) {
      closeLightbox();
    }
  });

})();
