# Eventina Organisers — Website Planning Docs

Planning artefacts for the Eventina Organisers business website. **No development has started.**

Source: `Website_Quotation_Eventina_Organisers_Rev2 (2).pdf` (Rev 2, 8 Oct 2026). Raw text extract
kept at `docs/source/quotation-rev2.txt` for reference.

## Documents

| File | What it covers |
| --- | --- |
| `01-sitemap-and-content.md` | All 13 pages, final page sequence, per-page content spec, global elements, content inventory |
| `02-tech-stack.md` | Stack decision (vanilla + CDN), SPA-vs-MPA call, project structure, performance budget |
| `03-development-plan.md` | Phases, milestones, risks, out-of-scope, definition of done |

## The 13 pages (finalised, quote §1)

1. Home · 2. About Us · 3. Founders · 4. Services · 5. Artists · 6. Portfolio · 7. Events ·
8. Testimonials · 9. Event Locations Map · 10. Blogs · 11. FAQ · 12. Contact Us · 13. Enquiry Form

(+ Privacy, Terms, Cookie pages required by quote §11.)

## Headline decisions

- **Stack:** vanilla HTML/CSS/JS, **no npm**, CDN libs only where a page needs them.
- **Architecture:** **static multi-page site** (not a client-rendered SPA) with an SPA-*feel* layer
  (prefetch + View Transitions). Blogs are separate static pages. Rationale: the quote sells Basic SEO.
- **Budget:** Lighthouse mobile ≥ 95, per-page JS < 30 KB base.

## Client decisions / setup answers (resolved 2026-10-18)

1. **Enquiry form backend:** Form submissions saved to database to later display on a dashboard (Cloudflare Pages Functions + DB).
2. **Map provider:** Free & open-source Leaflet with a modern UI plugin / custom styled tiles.
3. **Google reviews:** Google Business Profile + Places API key.
4. **Analytics:** Google Analytics 4 (GA4).
5. **Hosting:** Cloudflare Pages (native clean URLs, zero server maintenance, fast global CDN).
6. **Brand & assets:** Built with sample tokens & elegant color palette (deep navy/charcoal, champagne gold, clean cream) during initial phases; final brand assets swapped in Phase 8 before publish.
7. **Skills:** Project-wide install at `.claude/skills/` (`frontend-design`, `impeccable`, `web-design-guidelines`, `frontcraft`).

## Status

- [x] Quote analysed — pages & scope extracted
- [x] Page sequence finalised
- [x] Tech stack decided
- [x] Development plan written
- [x] Setup decisions answered
- [ ] Development started (Phase 1-2 unblocked)
