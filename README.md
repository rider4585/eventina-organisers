# Eventina Organisers — Official Website

Official website for **Eventina Organisers**, premier luxury event and royal destination wedding planners in India.

## Overview

High-performance, content-driven static website engineered with **Astro 5** and deployed to **Cloudflare Pages**. Delivers zero client-side JavaScript by default, instant edge rendering, Astro Content Collections for blog management, and native Cloudflare D1 integration for enquiry leads.

- **Framework:** [Astro 5](https://astro.build/) (Static Site Generation / Islands Architecture)
- **Adapter:** `@astrojs/cloudflare`
- **Hosting:** Cloudflare Pages (Edge CDN, HTTP/3, global caching)
- **Database:** Cloudflare D1 (Serverless SQLite at the edge for enquiry submissions)
- **Styling:** Haute-Couture Wedding Design System (Warm Silk Alabaster, Petal Linen, Champagne Gold, Cormorant Garamond, Josefin Sans)
- **SEO & PWA:** Automated XML Sitemaps (`@astrojs/sitemap`), JSON-LD schemas (`Article`, `FAQPage`), OpenGraph, `robots.txt`, and web manifest.

## Project Structure

```
├── astro.config.mjs         # Astro & Cloudflare Pages configuration
├── d1/
│   └── schema.sql          # Cloudflare D1 enquiries database schema
├── functions/
│   └── api/
│       └── enquiry.ts      # Cloudflare Pages Function edge API for enquiries
├── public/                 # Static assets (fonts, icons, manifest, robots.txt)
├── src/
│   ├── components/         # Reusable Astro components (Header, Footer, WhatsAppButton)
│   ├── content/
│   │   └── blog/           # Markdown articles managed via Content Layer
│   ├── content.config.ts   # Content Collections Zod schema definitions
│   ├── layouts/
│   │   └── BaseLayout.astro # Global HTML document shell, meta tags, and schema slots
│   ├── pages/              # Static routes & dynamic [slug] pages
│   └── styles/             # Design tokens, reset, components, and page stylesheets
└── package.json
```

## Cloudflare Pages Deployment Settings

- **Framework preset:** `Astro`
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node.js version:** `20` (set environment variable `NODE_VERSION: 20`)

## Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run production build
npm run build

# Preview production build locally
npm run preview
```
