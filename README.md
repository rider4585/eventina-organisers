# Eventina Organisers — Official Website

Official website for **Eventina Organisers**, premier luxury event and wedding planners in India.

## Overview

A high-performance, mobile-first static multi-page website engineered with an instant "SPA-feel" navigation layer, built with zero npm runtime dependencies for maximum speed and SEO optimization.

- **Stack:** Vanilla HTML5, Modern CSS (Design Tokens, Grid, Flexbox), Vanilla JS (ES Modules)
- **External Libraries:** CDN-delivered only where required (Leaflet, GLightbox)
- **Hosting:** Cloudflare Pages (native clean URLs, edge caching, HTTP/3)
- **Performance Budget:** Lighthouse Mobile ≥ 95, base JS < 30 KB per page

## Key Features

- **Design System:** Bespoke luxury palette with Midnight Navy (`#070C16`), Champagne Gold (`#C9A75E`), and Pearl Cream (`#FAF8F5`).
- **Instant Page Transitions:** Speculation Rules API & hover prefetching for sub-100ms perceived page loads.
- **Accessible & Responsive:** Semantic landmarks, skip navigation, keyboard-accessible navigation drawer, and WCAG AA contrast compliance.
- **Conversion-Focused:** Persistent floating WhatsApp CTA, enquiry flow, and trust metrics.

## Site Structure

- `/` — Homepage (Hero, statistics, signature formats, design verification)
- `/about` — About Us
- `/founders` — Founders & leadership
- `/services` — Event services & planning tiers
- `/artists` — Curated artist & performer directory
- `/portfolio` — Event gallery with category filters & lightbox
- `/events` — Upcoming and featured occasions
- `/testimonials` — Client testimonials & Google reviews
- `/locations` — Interactive event locations map (Leaflet)
- `/blog` — Event planning guides & stories
- `/faq` — Frequently asked questions
- `/contact` — Direct contact details & social channels
- `/enquiry` — Comprehensive event consultation booking form

## Project Structure

```
├── index.html              # Homepage & shell preview
├── assets/
│   ├── css/
│   │   ├── tokens.css      # Design tokens (colors, typography, spacing, shadows)
│   │   └── base.css        # Base styles, layout grid, reset, component primitives
│   ├── js/
│   │   └── app.js          # Navigation drawer, header blur, and prefetch logic
│   └── img/                # Responsive images
├── partials/
│   ├── header.html         # Global header with responsive navigation
│   ├── footer.html         # Site footer & sitemap navigation
│   └── whatsapp.html       # Floating WhatsApp quick-action
```

## Local Development

Open `index.html` in any modern web browser or serve via a local static web server (e.g. MAMP, `python3 -m http.server`, or Cloudflare Wrangler).
