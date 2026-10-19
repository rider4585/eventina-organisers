/**
 * Eventina Organisers — Accessible FAQ Accordion & Live Filter System
 * Full WCAG AA ARIA Compliance & Keyboard Navigation
 * Pure Vanilla JavaScript (Zero Dependencies)
 */

(() => {
  'use strict';

  // 1. DOM REFERENCES
  const searchInput = document.getElementById('faq-search-input');
  const searchClearBtn = document.getElementById('faq-search-clear');
  const resultsCounter = document.getElementById('faq-results-counter');
  const categoryTabs = document.querySelectorAll('.faq-tab-btn');
  const faqItems = document.querySelectorAll('.faq-item');
  const emptyState = document.getElementById('faq-empty-state');
  const accordionContainer = document.getElementById('faq-accordion');

  let activeCategory = 'all';
  let searchQuery = '';

  // 2. ACCORDION TOGGLE BEHAVIOR
  function toggleAccordion(item, expand) {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');
    if (!trigger || !panel) return;

    const isOpen = item.classList.contains('is-open');
    const shouldOpen = typeof expand === 'boolean' ? expand : !isOpen;

    if (shouldOpen) {
      item.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      panel.removeAttribute('hidden');
    } else {
      item.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      panel.setAttribute('hidden', '');
    }
  }

  // 3. KEYBOARD NAVIGATION ACROSS ACCORDION HEADINGS
  function getVisibleTriggers() {
    return Array.from(document.querySelectorAll('.faq-item:not([hidden]) .faq-trigger'));
  }

  function handleTriggerKeydown(event, trigger) {
    const triggers = getVisibleTriggers();
    const currentIndex = triggers.indexOf(trigger);
    if (currentIndex === -1) return;

    let targetIndex = null;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        targetIndex = (currentIndex + 1) % triggers.length;
        break;
      case 'ArrowUp':
        event.preventDefault();
        targetIndex = (currentIndex - 1 + triggers.length) % triggers.length;
        break;
      case 'Home':
        event.preventDefault();
        targetIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        targetIndex = triggers.length - 1;
        break;
      default:
        break;
    }

    if (targetIndex !== null && triggers[targetIndex]) {
      triggers[targetIndex].focus();
    }
  }

  // 4. LIVE FILTER & SEARCH
  function updateFilter() {
    const query = searchQuery.trim().toLowerCase();
    let visibleCount = 0;

    faqItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category') || '';
      const questionText = item.querySelector('.faq-question-text')?.textContent.toLowerCase() || '';
      const answerText = item.querySelector('.faq-answer-content')?.textContent.toLowerCase() || '';

      const matchesCategory = activeCategory === 'all' || itemCategory === activeCategory;
      const matchesSearch = query === '' || questionText.includes(query) || answerText.includes(query);

      if (matchesCategory && matchesSearch) {
        item.removeAttribute('hidden');
        item.style.display = '';
        visibleCount++;

        // Auto-expand if user specifically searched for keywords
        if (query.length >= 3 && matchesSearch) {
          toggleAccordion(item, true);
        }
      } else {
        item.setAttribute('hidden', '');
        item.style.display = 'none';
        toggleAccordion(item, false);
      }
    });

    // Update Counter Text
    if (resultsCounter) {
      const totalCount = faqItems.length;
      if (query !== '' || activeCategory !== 'all') {
        resultsCounter.textContent = `Showing ${visibleCount} of ${totalCount} question${totalCount === 1 ? '' : 's'}`;
      } else {
        resultsCounter.textContent = `Showing all ${totalCount} questions`;
      }
    }

    // Toggle Empty State Display
    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.removeAttribute('hidden');
        emptyState.style.display = 'block';
      } else {
        emptyState.setAttribute('hidden', '');
        emptyState.style.display = 'none';
      }
    }

    // Toggle Clear Button Visibility
    if (searchClearBtn) {
      searchClearBtn.classList.toggle('is-visible', query.length > 0);
    }
  }

  // 5. ATTACH LISTENERS
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        toggleAccordion(item);
      });

      trigger.addEventListener('keydown', (e) => {
        handleTriggerKeydown(e, trigger);
      });
    }
  });

  // Search input live handler
  searchInput?.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    updateFilter();
  });

  // Search clear button
  searchClearBtn?.addEventListener('click', () => {
    if (searchInput) {
      searchInput.value = '';
      searchQuery = '';
      searchInput.focus();
    }
    updateFilter();
  });

  // Category filter tabs
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.getAttribute('data-category') || 'all';
      activeCategory = cat;

      categoryTabs.forEach(t => {
        const isSelected = t === tab;
        t.classList.toggle('is-active', isSelected);
        t.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
      });

      updateFilter();
    });
  });

  // Clear search on empty state action
  document.getElementById('faq-empty-clear-btn')?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    searchQuery = '';
    activeCategory = 'all';
    categoryTabs.forEach((t, idx) => {
      t.classList.toggle('is-active', idx === 0);
      t.setAttribute('aria-pressed', idx === 0 ? 'true' : 'false');
    });
    updateFilter();
  });

  // Initialize
  updateFilter();

})();
