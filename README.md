# Nguyễn Đình Thuyên

Website source for https://nguyenthuyen.vn. Astro static output, shared Liquid Glass styling, no runtime backend.

## Development

```sh
npm ci
npm run dev
npm run build
npm run preview
```

## Appearance

`public/glass-material.css` implements the Fleet appearance principles: 0–100 opacity (35 default), opaque fill at 100, light/dark/system preference, per-origin persistence, pointer reflections, accessible keyboard controls, reduced motion/transparency and an opaque fallback without backdrop-filter. `public/appearance.js` owns the controls and cleans reflections on scroll/blur.

## Deployment

Build command: `npm run build`. Output directory: `dist`. Cloudflare Pages or any static host. The custom domain, canonical URL and sitemap must remain consistent. Configure redirects from www at the hosting/DNS provider; do not redirect to an unrelated domain.

## Content

The public contact details were supplied by the owner. No invented certification, client logo, testimonial, legal registration number or performance claim is included. Edit pages in `src/pages/` and the common navigation in `src/layouts/Layout.astro`.

## Source backup

GitHub is the primary repository; GitLab is the backup. Push the same commits and tags to both remotes. No credentials belong in this repository.
