# Nguyễn Đình Thuyên

Website source for https://nguyenthuyen.vn. Astro static output, shared Liquid Glass styling, no runtime backend.

## Development

```sh
npm ci
npm run dev
npm run build
npm run preview
```

## Typography

Geneva is the primary typeface, with Verdana and Arial fallbacks. Courier New is used for technical labels and numbers. Headings are upright; no handwriting or italic serif styling is used. Fonts are loaded from the device, without external font requests.

## Appearance

`public/glass-material.css` implements the Fleet appearance principles: 0–100 opacity (35 default), opaque fill at 100, light/dark/system preference, per-origin persistence, pointer reflections, accessible keyboard controls, reduced motion/transparency and an opaque fallback without backdrop-filter. `public/appearance.js` owns the controls and cleans reflections on scroll/blur.

## Deployment

Build command: `npm run build`. Output directory: `dist`. Production hosting: Cloudflare Pages. The custom domain, canonical URL and sitemap must remain consistent. Both apex and www domains are attached to Pages; canonical URLs use the apex domain.

## Content

The public contact details were supplied by the owner. No invented certification, client logo, testimonial, legal registration number or performance claim is included. Edit copy in `src/data/content.json` and the shared renderer in `src/components/Page.astro`.

## Source backup

GitHub is the primary repository; GitLab is the backup. The initial GitLab backup is a source snapshot created through the authenticated GitLab connector; its commit message identifies the source GitHub commit. Git histories therefore differ. Future changes must also be copied to the backup; no scheduled mirror is configured. No credentials belong in this repository.

## Languages

English is the default. Vietnamese pages live under `/vi/` and Simplified Chinese under `/zh/`. The language menu preserves the current page. All copy and interface labels live in `src/data/content.json`; shared templates are `src/components/Page.astro` and `src/layouts/Layout.astro`. Canonical and hreflang metadata are generated per route.

## Publishing updates

Cloudflare Pages is connected to the GitHub `main` branch and builds new pushes. Direct upload is also available for an already verified local build.

```sh
npm ci
npm run build
npx wrangler pages deploy dist --project-name nguyenthuyen --branch main
```

Wrangler authentication belongs to the operator environment, never to committed source.


## Interactive content update — 2026-09-13

Expanded trilingual content is in `src/data/experience.json`. Original lightweight diagrams and CSS motion have a pause control and respect reduced-motion preferences. The contact brief builder generates a local email draft, without a backend or automatic email delivery. `public/experience.js` progressively enhances the static HTML.
