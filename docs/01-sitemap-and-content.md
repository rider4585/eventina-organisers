# Eventina Organisers — Sitemap & Content Spec

Source: `docs/source/quotation-rev2.txt` (extracted from `Website_Quotation_Eventina_Organisers_Rev2 (2).pdf`).
Scope: **13 finalised pages** (₹15,000). Admin dashboard is a *separate* quotation and is out of scope for this build.

## 0. Page sequence (recommended)

The quote lists pages in a flat list. For navigation and user flow, group them into a primary
nav plus a footer, and keep the reading order below.

**Navigation sequence (primary nav — 7 items max on desktop):**

| # | Page | Nav slot | URL slug |
|---|------|----------|----------|
| 1 | Home | Primary | `/` |
| 2. | About Us | Primary | `/about` |
| 3. | Services | Primary | `/services` |
| 4. | Portfolio | Primary | `/portfolio` |
| 5. | Events | Primary | `/events` |
| 6. | Blogs | Primary | `/blog/` + `/blog/<slug>` |
| 12. | Contact Us | Primary | `/contact` |

**Pages grouped under a secondary nav / footer** (so the top nav stays light):

- **About:** `/about` → **Founders** `/founders`, **Artists** `/artists`, **Testimonials** `/testimonials`
- **Portfolio:** `/portfolio` → **Event Locations Map** `/locations`
- **Help:** **FAQ** `/faq`, **Contact** `/contact`, **Enquiry** `/enquiry`

**Full page order (13):**

1. Home — `/`
2. About Us — `/about`
3. Founders — `/founders`
4. Services — `/services`
5. Artists — `/artists`
6. Portfolio — `/portfolio`
7. Events — `/events`
8. Testimonials — `/testimonials`
9. Event Locations Map — `/locations`
10. Blogs — `/blog` (index) + `/blog/<slug>` (dedicated post pages)
11. FAQ — `/faq`
12. Contact Us — `/contact`
13. Enquiry Form — `/enquiry`

Plus mandatory legal pages (required by the quote, section 11 — "prepared as per government laws and norms"):

- Privacy Policy — `/privacy`
- Terms of Use — `/terms`
- Cookie Policy — `/cookies` (only if cookies/tracking are used)

> **Note on legal pages:** the quote says these are "prepared following the applicable government laws." They are *content* the developer lays out, but the wording should be reviewed/owned by the client (recommend a lawyer). Count them as extra pages beyond the 13, not part of the paid 13.

---

## 1. Page-by-page content spec

For each page: **purpose**, **sections top-to-bottom**, **content the client must supply**, and **reusable components**.

### 1.1 Home — `/`
**Purpose:** first impression; route visitors to services/enquiry fast.
**Sections:**
- **Hero** — headline + subline + primary CTA (**Enquire Now**) and secondary (**WhatsApp**). Background: hero image or muted looping video.
- **Value strip** — 3–4 icons (e.g. *End-to-end planning*, *Trusted vendors*, *On-time*, *Pan-India*).
- **Services preview** — 3–6 cards → `/services`.
- **Featured work** — 4–8 portfolio images → `/portfolio`.
- **Stats band** — e.g. events done, cities, years, happy clients.
- **Artists preview** — horizontal scroll of artist thumbnails → `/artists`.
- **Testimonials** — 2–3 quotes + Google rating badge → `/testimonials`.
- **CTA band** — "Planning an event?" → `/enquiry`.
**Client supplies:** hero image/video, headline copy, stats numbers, service names, featured images.
**Components:** hero, card grid, stat counter, marquee/carousel, CTA band.

### 1.2 About Us — `/about`
**Purpose:** build trust; tell the company story.
**Sections:**
- Intro / who we are (short story).
- Mission & what makes us different (bullet blocks).
- How we work (process strip: Consult → Plan → Execute → Deliver).
- By-the-numbers stats.
- Team/founders teaser → `/founders`.
- CTA.
**Client supplies:** brand story, mission, differentiators, process steps, supporting photos.
**Components:** split text/image blocks, process timeline, stat band.

### 1.3 Founders — `/founders`
**Purpose:** humanise the brand.
**Sections:**
- Page intro.
- Founder cards: photo, name, role, short bio, optional social links.
**Client supplies:** founder names, roles, bios, photos.
**Components:** profile card grid.

### 1.4 Services — `/services`
**Purpose:** show what the company offers, with visuals.
**Sections:**
- Page intro.
- Service sections/cards (each with image, title, description, "Enquire" CTA). Likely: weddings, corporate, birthdays, destination, and others TBD by client.
- Why choose us.
- CTA band.
**Client supplies:** service list, descriptions, images.
**Components:** alternating image/text blocks or card grid, anchor links per service.

### 1.5 Artists — `/artists`
**Purpose:** showcase the talent roster.
**Sections:**
- Intro.
- Artist grid/cards: photo, name, category (singer, DJ, dancer, anchor, band…), optional social links.
- Optional filter by category.
- CTA band.
**Client supplies:** artist photos, names, categories, any links.
**Components:** filterable card grid, lazy-loaded images.

### 1.6 Portfolio — `/portfolio`
**Purpose:** prove quality with visuals across event types (destination weddings, etc.).
**Sections:**
- Intro.
- Filter chips by event type (e.g. *Destination Weddings*, *Corporate*, *Birthdays*…).
- Masonry/grid gallery with **lightbox** (fullscreen, swipe on mobile).
**Client supplies:** portfolio photos/videos, category labels.
**Components:** filter chips, masonry grid, lightbox.

### 1.7 Events — `/events`
**Purpose:** explain the kinds of events organised and show details.
**Sections:**
- Intro.
- Event-type blocks (each: image, title, description, what's included).
- Optionally upcoming/past event listings.
- CTA band.
**Client supplies:** event types, descriptions, images; upcoming events if any.
**Components:** content blocks, optional listing cards.
**Note:** overlap with Portfolio/Services — clarify boundaries with client (see open questions).

### 1.8 Testimonials — `/testimonials`
**Purpose:** social proof.
**Sections:**
- Client feedback cards: quote, client name, client photo, event type.
- **Google reviews** pulled from the client's Google Business Profile (rating badge + reviews) via Google Places API.
- CTA.
**Client supplies:** testimonial text, client names, client photos; **Google Business Profile access** (place ID).
**Components:** testimonial grid, star rating, Google reviews widget (JS).
**Dependency:** Google Places API key (outside service — may have cost; see open questions).

### 1.9 Event Locations Map — `/locations`
**Purpose:** show where they've worked; each pin opens that event's photos.
**Sections:**
- Intro.
- Interactive map with pins.
- Clicking a pin → popup/panel with that event's photo gallery.
**Client supplies:** location coords/city, one set of photos per location.
**Components:** map library + pin → gallery panel.
**Dependency:** map provider (Leaflet + OpenStreetMap is free; Google Maps needs a key). See tech doc.

### 1.10 Blogs — `/blog` + `/blog/<slug>`
**Purpose:** news & updates; **SEO engine** (dedicated, crawlable pages).
**Sections (index):** list/grid of post cards (image, title, date, excerpt, read-more); pagination or "load more".
**Sections (post):** hero image, title, date/author, rich body (headings, images, lists), share links, related posts.
**Client supplies:** posts (text + images). Authoring is via the **separate admin dashboard** (out of scope) — so posts may be delivered as content/files until that ships.
**Components:** post list, post template, related posts. Each post is a **static, pre-rendered page** for SEO.

### 1.11 FAQ — `/faq`
**Purpose:** answer common questions; reduce enquiry friction.
**Sections:** accordion of Q&A grouped by topic; "still have questions?" → `/contact` or `/enquiry`.
**Client supplies:** questions & answers.
**Components:** accordion. Add **FAQ schema (JSON-LD)** for SEO.

### 1.12 Contact Us — `/contact`
**Purpose:** all the ways to reach the company.
**Sections:**
- Contact details (phone, email, address).
- Social media links.
- **WhatsApp chat** button/link.
- Optional embedded map.
- Short contact form or link to `/enquiry`.
**Client supplies:** phone, email, address, social URLs, WhatsApp number.
**Components:** contact block, social icons, WhatsApp float button.

### 1.13 Enquiry Form — `/enquiry`
**Purpose:** capture leads.
**Fields (exact, from quote):**
`Name` · `Phone number` · `Email` · `Event type` · `Event date` · `City` · `Budget` · `Service requirements`
**Sections:** short intro + form + success state. Include privacy-policy consent checkbox (quote §11).
**Client supplies:** destination for submissions (email inbox), and agreement on spam protection.
**Components:** form with validation, date picker, select dropdowns, submission handler.
**Dependency:** form backend / service (see open questions — no server is defined yet).

---

## 2. Global elements (every page)

- **Header** — logo (client to supply), nav, sticky on scroll, mobile hamburger drawer.
- **Footer** — quick links, social icons, contact, legal links, copyright.
- **WhatsApp floating button** — site-wide.
- **Cookie/consent banner** — if analytics/tracking is enabled (quote §11).
- **404 page** — friendly, links home.

## 3. Content inventory (what the client must deliver)

| Asset | Needed for | Status |
| --- | --- | --- |
| Logo (SVG/PNG) | Header/footer | ⬜ |
| Brand colours / fonts | Theme | ⬜ |
| Headlines & body copy | All pages | ⬜ |
| Founder details + photos | Founders | ⬜ |
| Service list + images | Services, Home | ⬜ |
| Artist photos + names | Artists, Home | ⬜ |
| Portfolio photos + labels | Portfolio, Home | ⬜ |
| Event-type descriptions | Events | ⬜ |
| Testimonials + client images | Testimonials | ⬜ |
| Google Business Profile (place ID) | Testimonials | ⬜ |
| Location coords + event photos | Locations Map | ⬜ |
| Blog posts | Blogs | ⬜ |
| FAQ Q&A | FAQ | ⬜ |
| Contact details + socials + WhatsApp no. | Contact | ⬜ |
| Enquiry destination email | Enquiry | ⬜ |
| Domain registrar access | Launch | ⬜ |

Due to quote §4, placeholder/sample content is used during the build; final content swap happens before publish.
