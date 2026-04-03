import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { SITE_URL } from '../src/config/siteConfig'
import { DOMAIN_PATHS } from '../src/config/domainConfig'
import { cpacc_topics } from '../src/data/topics'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Current date in YYYY-MM-DD format for lastmod
const today = new Date().toISOString().split('T')[0]

interface SitemapRoute {
  path: string
  priority: number
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly'
}

// Static routes with priorities and change frequencies
const staticRoutes: SitemapRoute[] = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/cpacc-practice-test', priority: 0.9, changefreq: 'weekly' }
]

// Domain overview pages
const domainRoutes: SitemapRoute[] = Object.values(DOMAIN_PATHS).map(domainPath => ({
  path: `/${domainPath}`,
  priority: 0.9,
  changefreq: 'monthly'
}))

// Topic pages — generated from the source of truth in topics.ts
const topicRoutes: SitemapRoute[] = cpacc_topics.flatMap((domain, index) => {
  const domainNumber = index + 1
  const domainPath = DOMAIN_PATHS[domainNumber]

  return domain.topics
    .filter(topic => !topic.id.includes('-all'))
    .map(topic => ({
      path: `/${domainPath}/${topic.id}`,
      priority: 0.8,
      changefreq: 'monthly' as const
    }))
})

// Legal / info pages
const infoRoutes: SitemapRoute[] = [
  { path: '/about', priority: 0.4, changefreq: 'monthly' },
  { path: '/privacy', priority: 0.3, changefreq: 'yearly' },
  { path: '/terms', priority: 0.3, changefreq: 'yearly' },
  { path: '/accessibility', priority: 0.3, changefreq: 'yearly' }
]

// Combine all routes
const allRoutes = [...staticRoutes, ...domainRoutes, ...topicRoutes, ...infoRoutes]

// Generate XML sitemap
function generateSitemap(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`
}

// Write sitemap to public folder
function writeSitemap(): void {
  try {
    const sitemap = generateSitemap()
    const publicDir = path.join(__dirname, '..', 'public')
    const sitemapPath = path.join(publicDir, 'sitemap.xml')

    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }

    fs.writeFileSync(sitemapPath, sitemap, 'utf8')
    console.log('Sitemap generated successfully!')
    console.log(`Location: ${sitemapPath}`)
    console.log(`Total URLs: ${allRoutes.length}`)
  } catch (error) {
    console.error('Error generating sitemap:', error)
    process.exit(1)
  }
}

writeSitemap()
