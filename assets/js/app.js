/**
 * Eventina Organisers — Global Application Scripts
 * Phase 2: Shell Interactions, Mobile Navigation Drawer, and SPA-Feel Prefetching
 */

(() => {
  'use strict';

  // ==========================================================================
  // 1. DOM REFERENCES
  // ==========================================================================
  const header = document.getElementById('site-header');
  const navToggleBtn = document.getElementById('nav-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const drawerBackdrop = document.getElementById('mobile-drawer-backdrop');
  const drawerCloseBtn = document.getElementById('mobile-drawer-close');

  // ==========================================================================
  // 2. MOBILE DRAWER INTERACTION & ACCESSIBILITY
  // ==========================================================================
  let lastFocusedElement = null;

  function openMobileDrawer() {
    if (!mobileDrawer) return;

    lastFocusedElement = document.activeElement;
    navToggleBtn?.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('is-open');
    drawerBackdrop?.classList.add('is-open');

    mobileDrawer.removeAttribute('inert');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    drawerBackdrop?.setAttribute('aria-hidden', 'false');

    document.body.style.overflow = 'hidden';

    // Focus close button or first link inside drawer
    setTimeout(() => {
      drawerCloseBtn?.focus();
    }, 50);

    document.addEventListener('keydown', handleDrawerKeydown);
  }

  function closeMobileDrawer() {
    if (!mobileDrawer || !mobileDrawer.classList.contains('is-open')) return;

    navToggleBtn?.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('is-open');
    drawerBackdrop?.classList.remove('is-open');

    mobileDrawer.setAttribute('inert', '');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    drawerBackdrop?.setAttribute('aria-hidden', 'true');

    document.body.style.overflow = '';

    document.removeEventListener('keydown', handleDrawerKeydown);

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  function handleDrawerKeydown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeMobileDrawer();
    }
  }

  if (navToggleBtn && mobileDrawer) {
    navToggleBtn.addEventListener('click', () => {
      const isExpanded = navToggleBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });

    drawerCloseBtn?.addEventListener('click', closeMobileDrawer);
    drawerBackdrop?.addEventListener('click', closeMobileDrawer);

    // Auto-close when clicking any drawer link
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileDrawer);
    });
  }

  // ==========================================================================
  // 3. STICKY HEADER SCROLL EFFECT
  // ==========================================================================
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
  }

  // ==========================================================================
  // 4. ACTIVE NAVIGATION LINK DETECTION
  // ==========================================================================
  function updateActiveNavLinks() {
    const currentPath = window.location.pathname.replace(/\/index\.html$/, '/') || '/';
    const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    allNavLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      if (!linkHref) return;

      const normalizedHref = linkHref.replace(/\/index\.html$/, '/') || '/';
      const isMatch = (normalizedHref === '/' && currentPath === '/') ||
                      (normalizedHref !== '/' && currentPath.startsWith(normalizedHref));

      if (isMatch) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('is-active');
        link.removeAttribute('aria-current');
      }
    });
  }

  updateActiveNavLinks();

  // ==========================================================================
  // 5. SPA-FEEL PREFETCHING LAYER (Hover / Touch Prefetch)
  // ==========================================================================
  const prefetchedUrls = new Set();

  function prefetchUrl(url) {
    if (!url || prefetchedUrls.has(url) || url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('http')) {
      return;
    }

    try {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
      prefetchedUrls.add(url);
    } catch {
      // Fallback silently if browser restricts prefetch
    }
  }

  // Listen to mouseenter and touchstart on internal links
  document.addEventListener('mouseover', (e) => {
    const anchor = e.target.closest('a');
    if (anchor && anchor.getAttribute('href')?.startsWith('/')) {
      prefetchUrl(anchor.getAttribute('href'));
    }
  }, { passive: true });

  document.addEventListener('touchstart', (e) => {
    const anchor = e.target.closest('a');
    if (anchor && anchor.getAttribute('href')?.startsWith('/')) {
      prefetchUrl(anchor.getAttribute('href'));
    }
  }, { passive: true });

})();
