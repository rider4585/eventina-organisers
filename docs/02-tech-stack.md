# Eventina Organisers — Tech Stack & Architecture Decision

Goal restated by client: **very lightweight, loads super fast, mobile-first.** Prefer
**vanilla HTML/CSS/JS with no npm packages** if everything can be met via CDNs.

## 1. Recommendation (summary)

| Concern | Decision |
| --- | --- |
| Language | **Vanilla HTML5 + CSS + JavaScript (ES modules)** — no framework, no build step required |
| Packages | **Zero npm runtime deps.** Optional dev-only tooling is not needed |
| External libs | A few **CDN** libraries, loaded only on pages that use them |
| Architecture | **Static multi-page site (MPA)** with a lightweight "SPA-feel" layer — *not* a client-rendered SPA |
| Blogs | **Separate static pages**, one HTML file per post (pre-rendered) |
| Hosting | Any static host / shared cPanel (first year covered by quote §10) |
| SEO | Fully server-delivered HTML → crawlable, plus `sitemap.xml`, `robots.txt`, meta, JSON-LD |

## 2. The big decision: SPA vs static multi-page

The client's instinct was "whole website as an SPA, but dedicated pages for blogs." I recommend
**against a client-rendered SPA**, for one decisive reason: **the quote sells Basic SEO as an
included deliverable** (quote §6: crawlable pages list/sitemap, per-page titles & meta, fast load).

- A client-rendered SPA ships an empty `<div id="app">`; search engines and social previews get little
  or no per-page content, no per-page `<title>`/meta, and no distinct URLs to index.
- Making an SPA SEO-correct usually needs SSR/prerendering — which drags in a build step and a
  framework, directly against "no npm, lightweight."

### What we get instead (SPA *feel*, MPA *bones*)

1. **Real HTML per page** → fast first paint, crawlable, shareable, per-page meta.
2. **Instant navigation** via `<link rel="prefetch">` / `fetch` on hover + **Speculation Rules API**
   (Chromium) → clicks feel instant like an SPA, at ~0 cost.
3. **Cross-document View Transitions** (a few lines of CSS; progressive enhancement) → smooth
   page-to-page animation. Degrades gracefully in unsupported browsers.
4. Blog posts are simply more static pages — exactly the "dedicated pages" the client wanted.

> If the client insists on a true SPA later, the fallback is a small hash/history router that `fetch`es
> HTML partials into `index.html`. That is **not recommended** here because it recreates the SEO
> problem; we'd only do it if SEO is dropped and all content is client-visible-only.

**Result:** the site behaves like an SPA on fast connections but is a plain, fast, indexable website.

## 3. Why no npm

Everything needed is either native platform features or a single `<script>`/`<link>` tag:

| Need | Native or CDN | Notes |
| --- | --- | --- |
| Layout, responsive, dark mode | **CSS** (grid, flex, custom props) | no lib |
| Animation | CSS + **View Transitions API** | no lib |
| Nav / hamburger drawer | **Vanilla JS** | ~1 KB |
| Filterable gallery | **Vanilla JS** + CSS | no lib |
| Carousels | CSS `scroll-snap` (default) or **Swiper** (only if richer needs) | CDN, ~0 on most pages |
| Gallery lightbox | **GLightbox** (CDN) or PhotoSwipe | load only on `/portfolio`, `/locations` |
| Interactive map | **Leaflet** (CDN) + OpenStreetMap/Carto tiles | free, load only on `/locations` |
| Enquiry form submit | **Web3Forms / Formspree / Getform** (CDN-free fetch) | no backend |
| Google reviews | **Google Places API JS** | load only on `/testimonials` |
| Analytics | **GA4** or **Plausible** (privacy-friendly) | quote §2 |
| Icons | **Inline SVG** (sprite) | no lib |
| Fonts | **Self-hosted WOFF2** (preferred) | avoid render-blocking external fonts |

No bundler, no transpiler, no `node_modules`, no CI. Editing a page = editing an HTML file.

## 4. Optional: a tiny static build (only if content grows)

If keeping 13+ pages consistent by hand becomes painful, we *may* add a **dev-only** static templating
step. Options, in order of preference for "no npm":
1. **PHP includes** (the client stack is MAMP) — `<?php include 'partials/header.php'; ?>`. Zero npm.
2. A tiny Node script with no deps (built already available) to stamp partials.
3. Only if forced: 11ty/Astro — **not planned**, adds npm + build.

**Default: hand-written static pages with copied partials.** Revisit only if it hurts.

## 5. Project structure (proposed)

```
/
├─ index.html                 # Home
├─ about/index.html
├─ founders/index.html
├─ services/index.html
├─ artists/index.html
├─ portfolio/index.html
├─ events/index.html
├─ testimonials/index.html
├─ locations/index.html
├─ blog/index.html            # blog listing
├─ blog/<slug>/index.html     # one folder per post
├─ faq/index.html
├─ contact/index.html
├─ enquiry/index.html
├─ privacy/index.html  terms/index.html  cookies/index.html
├─ 404.html
├─ assets/
│  ├─ css/  (tokens.css, base.css, components.css, pages.css)
│  ├─ js/   (app.js, router-feel.js, forms.js, gallery.js, map.js)
│  ├─ img/  (responsive WebP/AVIF, one folder per page)
│  ├─ fonts/
│  └─ icons/sprite.svg
├─ partials/ (header, footer, whatsapp, cookie-banner — source for copy/include)
├─ robots.txt
├─ sitemap.xml
└─ site.webmanifest
```

Clean URLs (`/about/`) via `folder/index.html` work on static hosts and most cPanel setups; falls back
to `.html` files if the host can't do directory index — decide at deploy (see open questions).

## 6. Performance budget (targets)

| Metric | Target |
| --- | --- |
| Lighthouse (mobile) Performance | ≥ 95 |
| LCP | < 2.0 s (mobile 4G) |
| CLS | < 0.05 |
| Total JS (per page) | < 30 KB gzip baseline; < 60 KB on gallery/map pages |
| Total CSS | < 25 KB gzip |
| Hero image | < 200 KB (AVIF/WebP, responsive `srcset`) |
| Fonts | ≤ 2 weights, self-hosted, `font-display: swap` |
| Third-party scripts | ≤ 2 per page, `defer`/async |

Rules: images in **AVIF/WebP** with `width`/`height` set; **lazy-load** below-the-fold; **critical CSS**
inlined for the hero; no render-blocking JS; CDN libs loaded **only on their page**.

## 7. Accessibility & mobile-first

- Mobile-first CSS (start at 320px, progressive enhancement up).
- Semantic landmarks, keyboard-navigable nav/accordion/lightbox.
- Tap targets ≥ 44px; contrast ≥ WCAG AA.
- `prefers-reduced-motion` respected (View Transitions/animations off).
- Forms: labels, inline validation, clear error messages.

## 8. Dependencies we must settle before build

These are external/paid or need a decision (detailed in `docs/README.md` → Open Questions):

1. **Enquiry form backend** — Web3Forms/Formspree (no server) vs a small endpoint on the host.
2. **Map provider** — free **Leaflet + OSM/Carto** (recommended) vs **Google Maps** (API key, may cost).
3. **Google reviews** — needs **Google Places API key** (may cost) + the client's Business Profile place ID.
4. **Analytics** — **GA4** (free) vs **Plausible** (paid, privacy).
5. **Hosting + clean URLs** — which host, and does it support directory-index clean URLs?
