# Eventina Organisers — Development Plan

**Scope:** the 13-page business website (quote §1) + legal pages. Admin dashboard is a
**separate quotation** and is *not* in this plan.
**Timeline:** quote §7 says "about 2 weeks" for the first version (sample content), assuming
content/feedback arrive on time.
**Delivery model:** built with **sample content** first (quote §4), final content swapped **before publish**.

> Status: **planning only — no development started** (per instruction).

## 1. Principles

- Mobile-first, lightweight, fast (budgets in `docs/02-tech-stack.md` §6).
- Static multi-page site; vanilla HTML/CSS/JS; CDN libs only where used.
- Build the **design system first**, then pages, so everything stays consistent.
- Every page is fully usable and indexable without JavaScript (progressive enhancement).

## 2. Work breakdown (phases)

### Phase 0 — Decisions & setup
- Confirm open questions (`docs/README.md`).
- Lock stack, host, form backend, map provider, analytics.
- Repo structure, `.gitignore`, starter `assets/` skeleton.
- **Deliverable:** repo scaffold + decided config.

### Phase 1 — Design system (foundation)
- CSS tokens: colour, spacing scale, typography, radii, shadows, breakpoints.
- Base layout: container, grid, section rhythm.
- Core components: buttons, cards, nav/header, footer, WhatsApp button, cookie banner.
- Placeholder logo/brand palette.
- **Deliverable:** `assets/css/tokens.css + base.css`, component gallery page (internal).

### Phase 2 — Global shell & routing-feel
- `partials/`: header (sticky, mobile drawer), footer, WhatsApp float, cookie banner.
- SPA-feel layer: prefetch on hover, Speculation Rules, cross-document View Transitions.
- `app.js`: nav toggle, active-link, theme niceties.
- **Deliverable:** one page renders with full shell on mobile + desktop.

### Phase 3 — Core pages (Wave A)
Order the highest-value pages first:
1. Home (`/`) — hero, service preview, featured work, stats, testimonials, CTA.
2. Services (`/services`).
3. Portfolio (`/portfolio`) — filter chips + lightbox.
4. Contact (`/contact`) — details, socials, WhatsApp.
5. Enquiry (`/enquiry`) — the 8-field form + validation + submit + success state + privacy consent.
- **Deliverable:** the primary conversion path works end-to-end.

### Phase 4 — Content pages (Wave B)
6. About Us (`/about`) + Founders (`/founders`).
7. Artists (`/artists`) — filterable grid.
8. Events (`/events`).
9. Testimonials (`/testimonials`) — incl. Google reviews widget.
- **Deliverable:** all storytelling pages live with sample content.

### Phase 5 — Interactive & advanced (Wave C)
10. Event Locations Map (`/locations`) — Leaflet map, pins, per-event gallery panel.
11. Blogs (`/blog` + `/blog/<slug>`) — index + post template; sample posts.
12. FAQ (`/faq`) — accordion + FAQ JSON-LD.
- **Deliverable:** interactive features complete.

### Phase 6 — Legal, SEO & polish
- Privacy, Terms, Cookies pages (client/lawyer-approved wording).
- `robots.txt`, `sitemap.xml`, `site.webmanifest`, favicons.
- Per-page `<title>`/meta, Open Graph/Twitter cards, JSON-LD (Organization, LocalBusiness, FAQ, Article).
- `404.html`.
- Accessibility pass (keyboard, contrast, reduced-motion).
- **Deliverable:** SEO + a11y checklist green.

### Phase 7 — QA, performance & sign-off
- Cross-browser/device testing; responsive breakpoints.
- Performance budget verification (Lighthouse mobile ≥ 95; JS/CSS/image budgets).
- Broken-link & form submission test.
- **Deliverable:** QA report + preview URL for client review.

### Phase 8 — Content swap & launch
- Replace sample content with client's final text/images (quote §4).
- Final client review against **5 included small changes** (quote §8).
- Connect domain (client already owns it), go live on balance payment (quote §12).
- Analytics verification (quote §2).
- **Deliverable:** published site; 30-day support window starts (quote §9).

## 3. Milestones

| # | Milestone | Ends after |
| --- | --- | --- |
| M1 | Design system + shell approved | Phase 2 |
| M2 | Conversion path live (Home/Services/Portfolio/Contact/Enquiry) | Phase 3 |
| M3 | All 13 pages + blogs on sample content | Phase 5 |
| M4 | SEO + a11y + performance green | Phase 7 |
| M5 | Final content in & published | Phase 8 |

## 4. Dependencies & risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Client content late | Blocks Phase 8 | Build with sample content; chase assets early (inventory in `docs/01`) |
| Enquiry form backend undecided | Blocks Enquiry page | Pick Web3Forms/Formspree at Phase 0 |
| Google Places API key/cost | Blocks reviews widget | Decide provider; fallback = static testimonial quotes |
| Map provider cost | Blocks Locations page | Default to free Leaflet + OSM |
| Host lacks clean URLs | Broken links | Choose host at Phase 0; fallback to `.html` URLs |
| Legal wording | Blocks legal pages | Client/lawyer owns copy; developer only lays out |
| "Events" vs "Services" vs "Portfolio" overlap | Rework | Clarify boundaries before Phase 4 |

## 5. Out of scope (this plan)

- Admin dashboard (separate quotation, quote §3).
- Blog **authoring** admin (dashboard); until then posts are added as static files by the developer.
- Ongoing SEO (content writing, ads) — quote §6 excludes it.
- Paid/3rd-party services beyond first-year hosting — billed directly to client (quote §10).

## 6. Definition of done

- All 13 pages + legal pages published and responsive (mobile/tablet/desktop).
- Enquiry form delivers to the client's inbox; success/error states work.
- Map, gallery, reviews, FAQ interactive features work with graceful fallbacks.
- SEO: sitemap, robots, per-page meta, structured data validated.
- Performance budget met; accessibility pass done.
- Domain connected; analytics recording; 30-day support clock stated.
