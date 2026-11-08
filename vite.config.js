import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import blogPosts from './src/data/blogPosts.js'

const SITE = 'https://gmnrconsultants.com'

const MONTHS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
]

// "January 2026" -> "2026-01-01" (null if it cannot be parsed)
function postDateToIso(label) {
  const [month, year] = String(label || '').trim().toLowerCase().split(/\s+/)
  const m = MONTHS.indexOf(month)
  if (m === -1 || !/^\d{4}$/.test(year || '')) return null
  return `${year}-${String(m + 1).padStart(2, '0')}-01`
}

// Generates dist/sitemap.xml on every build. Add a page here (or a post to
// src/data/blogPosts.js) and it is listed automatically on the next deploy.
function sitemapPlugin() {
  return {
    name: 'gmnr-sitemap',
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)

      const pages = [
        { path: '/', lastmod: today, changefreq: 'monthly', priority: '1.0' },
        { path: '/projects/carbon-ets', lastmod: today, changefreq: 'monthly', priority: '0.8' },
        { path: '/projects/renewable-energy', lastmod: today, changefreq: 'monthly', priority: '0.8' },
        ...blogPosts.map((post) => ({
          path: `/blog/${post.slug}`,
          lastmod: postDateToIso(post.date) || today,
          changefreq: 'yearly',
          priority: '0.7',
        })),
      ]

      // English at /path, Spanish at /es/path (same routes, see App.jsx)
      const esPath = (p) => (p === '/' ? '/es/' : `/es${p}`)

      const entry = (loc, page, enUrl, esUrl) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
    <xhtml:link rel="alternate" hreflang="es" href="${esUrl}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}"/>
  </url>`

      const urls = pages.flatMap((page) => {
        const enUrl = `${SITE}${page.path}`
        const esUrl = `${SITE}${esPath(page.path)}`
        return [entry(enUrl, page, enUrl, esUrl), entry(esUrl, page, enUrl, esUrl)]
      })

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), sitemapPlugin()],
  base: '/',
})
