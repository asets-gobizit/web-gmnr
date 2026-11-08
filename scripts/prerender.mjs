// Post-build step: pre-renders every route (English + Spanish) to static HTML
// so crawlers (Google, ElevenLabs KB, ...) get real content and a 200 status,
// and generates sitemap.xml from the same route list.
//
// Run order (see package.json "build"): client build -> SSR build -> this script.
// New blog posts only need to be added to src/i18n/en.js and es.js (blog.posts
// and blogContent); they are pre-rendered and added to the sitemap automatically.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import en from '../src/i18n/en.js'
import es from '../src/i18n/es.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const SITE = 'https://gmnrconsultants.com'
const SUFFIX = 'GMnR Consultants'

const MONTHS = ['january','february','march','april','may','june','july','august','september','october','november','december']
const isoDate = (label) => {
  const [m, y] = String(label || '').trim().toLowerCase().split(/\s+/)
  const i = MONTHS.indexOf(m)
  return i === -1 || !/^\d{4}$/.test(y || '') ? null : `${y}-${String(i + 1).padStart(2, '0')}-01`
}
const today = new Date().toISOString().slice(0, 10)
const strip = (s) => String(s).replace(/\s+/g, ' ').trim()
const esc = (s) => strip(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// ---- Route list: one entry per page, with EN + ES meta ----------------------
const homeMeta = {
  en: {
    title: 'GMnR Consultants | Business Development Outsourced',
    description: 'GMnR Consultants — outsourced business development for companies seeking international growth. Market expansion, M&A advisory, and strategic partnerships.',
  },
  es: {
    title: 'GMnR Consultants | Desarrollo de Negocios Externalizado',
    description: 'GMnR Consultants — desarrollo de negocios externalizado para empresas que buscan crecimiento internacional. Expansión de mercados, asesoría en M&A y alianzas estratégicas.',
  },
}
const pages = [
  { path: '/', lastmod: today, changefreq: 'monthly', priority: '1.0', meta: homeMeta },
  {
    path: '/projects/carbon-ets', lastmod: today, changefreq: 'monthly', priority: '0.8',
    meta: {
      en: { title: `${en.carbonEts.hero.heading} | ${SUFFIX}`, description: en.carbonEts.hero.description },
      es: { title: `${es.carbonEts.hero.heading} | ${SUFFIX}`, description: es.carbonEts.hero.description },
    },
  },
  {
    path: '/projects/renewable-energy', lastmod: today, changefreq: 'monthly', priority: '0.8',
    meta: {
      en: { title: `${en.renewableEnergy.hero.heading} ${en.renewableEnergy.hero.headingAccent} | ${SUFFIX}`, description: en.renewableEnergy.hero.description },
      es: { title: `${es.renewableEnergy.hero.heading} ${es.renewableEnergy.hero.headingAccent} | ${SUFFIX}`, description: es.renewableEnergy.hero.description },
    },
  },
  ...en.blog.posts.map((post) => {
    const esPost = es.blog.posts.find((p) => p.slug === post.slug) || post
    return {
      path: `/blog/${post.slug}`, lastmod: isoDate(post.date) || today, changefreq: 'yearly', priority: '0.7',
      meta: {
        en: { title: `${post.title} | ${SUFFIX}`, description: post.excerpt },
        es: { title: `${esPost.title} | ${SUFFIX}`, description: esPost.excerpt },
      },
    }
  }),
]

// Canonical URL form: trailing slash (GitHub Pages serves dir/index.html at "dir/")
const urlFor = (lang, p) => {
  const full = lang === 'es' ? (p === '/' ? '/es/' : `/es${p}`) : p
  return `${SITE}${full.endsWith('/') ? full : full + '/'}`
}

// ---- Render ------------------------------------------------------------------
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href)

const setMeta = (html, re, replacement, what) => {
  if (!re.test(html)) throw new Error(`prerender: template is missing ${what}`)
  return html.replace(re, replacement)
}

function build(lang, page) {
  const { title, description } = page.meta[lang]
  const url = urlFor(lang, page.path)
  const enUrl = urlFor('en', page.path)
  const esUrl = urlFor('es', page.path)
  const routePath = lang === 'es' ? (page.path === '/' ? '/es/' : `/es${page.path}`) : page.path

  let html = template
  html = setMeta(html, /<html lang="[^"]*"/, `<html lang="${lang}"`, '<html lang>')
  html = setMeta(html, /<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`, '<title>')
  html = setMeta(html, /<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${esc(description)}" />`, 'meta description')
  html = setMeta(html, /<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${url}" />`, 'canonical')
  html = setMeta(html, /<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${esc(title)}" />`, 'og:title')
  html = setMeta(html, /<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${esc(description)}" />`, 'og:description')
  html = setMeta(html, /<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${url}" />`, 'og:url')
  html = setMeta(html, /<meta property="og:locale" content="[^"]*"\s*\/>/, `<meta property="og:locale" content="${lang === 'es' ? 'es_ES' : 'en_US'}" />`, 'og:locale')
  html = setMeta(html, /<meta property="og:locale:alternate" content="[^"]*"\s*\/>/, `<meta property="og:locale:alternate" content="${lang === 'es' ? 'en_US' : 'es_ES'}" />`, 'og:locale:alternate')
  html = setMeta(html, /<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${esc(title)}" />`, 'twitter:title')
  html = setMeta(html, /<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${esc(description)}" />`, 'twitter:description')
  html = setMeta(
    html,
    /(<link rel="alternate" hreflang="[^"]*" href="[^"]*"\s*\/>\s*)+/,
    `<link rel="alternate" hreflang="en" href="${enUrl}" />\n    <link rel="alternate" hreflang="es" href="${esUrl}" />\n    <link rel="alternate" hreflang="x-default" href="${enUrl}" />\n    `,
    'hreflang links',
  )

  const body = render(routePath)
  html = setMeta(html, /<div id="root"><\/div>/, () => `<div id="root">${body}</div>`, '<div id="root">')

  const outDir = routePath === '/' ? dist : path.join(dist, routePath)
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'index.html'), html)
  return { url, routePath, bytes: html.length }
}

const results = []
for (const page of pages) {
  for (const lang of ['en', 'es']) results.push(build(lang, page))
}

// ---- sitemap.xml ----------------------------------------------------------------
const entry = (lang, page) => `  <url>
    <loc>${urlFor(lang, page.path)}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${urlFor('en', page.path)}"/>
    <xhtml:link rel="alternate" hreflang="es" href="${urlFor('es', page.path)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor('en', page.path)}"/>
  </url>`
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.flatMap((p) => [entry('en', p), entry('es', p)]).join('\n')}
</urlset>
`
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)

console.log(`prerender: ${results.length} pages + sitemap.xml`)
for (const r of results) console.log(`  ${r.routePath.padEnd(60)} ${r.bytes} bytes`)
