# GMnR Consultants Website

## Project Overview
Business development consultancy website for Guy Molcho / GMnR Consultants.

## Tech Stack
- React 19 + Vite
- Tailwind CSS v4
- Framer Motion (animations)
- react-router-dom v7 (BrowserRouter, clean URLs; Spanish under /es/)

## Repository
- GitHub: asets-gobizit/web-gmnr
- Default branch: master
- Deployed via GitHub Actions → GitHub Pages

## Domain & DNS
- Live URL: https://gmnrconsultants.com
- DNS managed on Cloudflare (account: Asets@gobizit.com)
- Cloudflare proxy enabled on all A records (orange cloud)
- SSL mode: Full

## Structure
- src/components/ — UI components (Navbar, Blog, Hero, etc.)
- src/pages/BlogPost.jsx — Article page template
- src/i18n/en.js, es.js — ALL site text incl. blog posts (blog.posts list + blogContent); edit here
- scripts/prerender.mjs — build step: pre-renders every page (EN + /es/) to static HTML and writes sitemap.xml
- src/entry-server.jsx — SSR render entry used by the pre-renderer
- src/data/blogPosts.js — legacy, not imported by the app

## Build
`npm run build` = client build → SSR build (dist-ssr) → scripts/prerender.mjs.
Each route becomes dist/<path>/index.html (HTTP 200 with real content, title,
description, canonical and hreflang), and React hydrates it in the browser.

## Key Notes
- To add a new article: add it to blog.posts AND blogContent in BOTH src/i18n/en.js and src/i18n/es.js (same slug). It is then pre-rendered and added to sitemap.xml automatically on the next deploy.
- To add a new page/route: add the <Route> in src/App.jsx AND an entry in the `pages` list in scripts/prerender.mjs.
- Navbar shows dark background on all non-home pages (isHome check)
- All changes pushed to master auto-deploy via GitHub Actions
