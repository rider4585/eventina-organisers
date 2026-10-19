/**
 * Eventina Organisers — Blog Journal Interactive Features
 * Search & Category Filtering, Reading Progress Indicator, TOC Spy, and Share Handlers
 * Pure Vanilla JavaScript (Zero Dependencies)
 */

(() => {
  'use strict';

  // ==========================================================================
  // 1. BLOG INDEX: SEARCH & CATEGORY FILTERING
  // ==========================================================================
  const searchInput = document.getElementById('blog-search-input');
  const catButtons = document.querySelectorAll('.blog-cat-btn');
  const blogCards = document.querySelectorAll('.blog-card');
  const featuredCard = document.querySelector('.blog-featured-card');
  const countBadge = document.getElementById('blog-count-badge');
  const emptyState = document.getElementById('blog-empty-state');

  if (searchInput || catButtons.length > 0) {
    let activeCat = 'all';
    let searchQuery = '';

    function filterBlogPosts() {
      const q = searchQuery.trim().toLowerCase();
      let visibleCount = 0;

      // Filter Featured Hero Card
      if (featuredCard) {
        const featCat = featuredCard.getAttribute('data-category') || '';
        const featTitle = featuredCard.querySelector('.blog-featured-title')?.textContent.toLowerCase() || '';
        const featExcerpt = featuredCard.querySelector('.blog-featured-excerpt')?.textContent.toLowerCase() || '';

        const featCatMatch = activeCat === 'all' || featCat === activeCat;
        const featQueryMatch = q === '' || featTitle.includes(q) || featExcerpt.includes(q);

        if (featCatMatch && featQueryMatch) {
          featuredCard.style.display = '';
          visibleCount++;
        } else {
          featuredCard.style.display = 'none';
        }
      }

      // Filter Grid Cards
      blogCards.forEach(card => {
        const cardCat = card.getAttribute('data-category') || '';
        const cardTitle = card.querySelector('.blog-card-title')?.textContent.toLowerCase() || '';
        const cardExcerpt = card.querySelector('.blog-card-excerpt')?.textContent.toLowerCase() || '';
        const cardAuthor = card.querySelector('.blog-author-name')?.textContent.toLowerCase() || '';

        const catMatch = activeCat === 'all' || cardCat === activeCat;
        const queryMatch = q === '' || cardTitle.includes(q) || cardExcerpt.includes(q) || cardAuthor.includes(q);

        if (catMatch && queryMatch) {
          card.style.display = '';
          card.removeAttribute('hidden');
          visibleCount++;
        } else {
          card.style.display = 'none';
          card.setAttribute('hidden', '');
        }
      });

      // Update Count
      if (countBadge) {
        const total = blogCards.length + (featuredCard ? 1 : 0);
        if (q !== '' || activeCat !== 'all') {
          countBadge.textContent = `Showing ${visibleCount} of ${total} Dispatches`;
        } else {
          countBadge.textContent = `Showing all ${total} Dispatches`;
        }
      }

      // Empty State
      if (emptyState) {
        if (visibleCount === 0) {
          emptyState.removeAttribute('hidden');
          emptyState.style.display = 'block';
        } else {
          emptyState.setAttribute('hidden', '');
          emptyState.style.display = 'none';
        }
      }
    }

    searchInput?.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      filterBlogPosts();
    });

    catButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-category') || 'all';
        activeCat = cat;

        catButtons.forEach(b => {
          const isSelected = b === btn;
          b.classList.toggle('is-active', isSelected);
          b.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
        });

        filterBlogPosts();
      });
    });

    document.getElementById('blog-empty-clear-btn')?.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      activeCat = 'all';
      catButtons.forEach((b, idx) => {
        b.classList.toggle('is-active', idx === 0);
        b.setAttribute('aria-pressed', idx === 0 ? 'true' : 'false');
      });
      filterBlogPosts();
    });
  }

  // ==========================================================================
  // 2. ARTICLE PAGE: READING PROGRESS BAR
  // ==========================================================================
  const progressBar = document.getElementById('reading-progress');
  const articleContent = document.querySelector('.article-body');

  if (progressBar && articleContent) {
    window.addEventListener('scroll', () => {
      const rect = articleContent.getBoundingClientRect();
      const contentHeight = articleContent.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const contentTop = articleContent.offsetTop;

      const progress = Math.min(100, Math.max(0, ((scrollTop - contentTop + windowHeight * 0.5) / contentHeight) * 100));
      progressBar.style.width = `${progress}%`;
    }, { passive: true });
  }

  // ==========================================================================
  // 3. ARTICLE PAGE: TABLE OF CONTENTS ACTIVE SPY
  // ==========================================================================
  const tocLinks = document.querySelectorAll('.article-toc-link');
  const headings = document.querySelectorAll('.article-body h2[id]');

  if (tocLinks.length > 0 && headings.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          tocLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('is-active', href === `#${id}`);
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px'
    });

    headings.forEach(h => observer.observe(h));
  }

  // ==========================================================================
  // 4. COPY ARTICLE LINK TO CLIPBOARD
  // ==========================================================================
  const copyBtn = document.getElementById('copy-article-link');
  if (copyBtn) {
    copyBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(window.location.href);
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          <span>Link Copied!</span>
        `;
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
        }, 2400);
      } catch (err) {
        console.warn('Clipboard write failed:', err);
      }
    });
  }

})();
