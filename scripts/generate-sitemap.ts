import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import { SITE_URL } from '../src/config/siteConfig'
import { DOMAIN_PATHS } from '../src/config/domainConfig'
import { cpacc_topics } from '../src/data/topics'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.join(__dirname, '..')

// ---------------------------------------------------------------------------
// Git-based lastmod dates
// ---------------------------------------------------------------------------

/**
 * Get the last git commit date (ISO 8601) for a file or directory.
 * Falls back to the current date if git is unavailable or the path is untracked.
 */
function getLastModified(relativePath: string): string {
  try {
    const result = execSync(
      `git log -1 --format=%aI -- "${relativePath}"`,
      { cwd: ROOT, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] },
    ).trim()
    if (result) {
      // Return just the date portion (YYYY-MM-DD)
      return result.split('T')[0]
    }
  } catch {
    // git not available or other error
  }
  return new Date().toISOString().split('T')[0]
}

/**
 * Get the most recent git commit date across multiple files/directories.
 */
function getLatestModified(relativePaths: string[]): string {
  let latest = '1970-01-01'
  for (const p of relativePaths) {
    const date = getLastModified(p)
    if (date > latest) latest = date
  }
  return latest
}

// ---------------------------------------------------------------------------
// Topic ID → content file path mapping
// ---------------------------------------------------------------------------

/** Strip the domain prefix (e.g. "1a-", "2c-") from a topic ID to get the content slug. */
function topicIdToContentSlug(topicId: string): string {
  return topicId.replace(/^\d[a-f]-/, '')
}

/** Get the content source path(s) for a topic, used for lastmod tracking. */
function getTopicContentPaths(topicId: string): string[] {
  const slug = topicIdToContentSlug(topicId)
  const dirPath = `src/data/topicContent/${slug}`
  const filePath = `${dirPath}.ts`

  // Some topics are directories (categories-characteristics, regional-instruments, national-provincial)
  if (fs.existsSync(path.join(ROOT, dirPath)) && fs.statSync(path.join(ROOT, dirPath)).isDirectory()) {
    return [dirPath]
  }
  return [filePath]
}

// ---------------------------------------------------------------------------
// Route definitions
// ---------------------------------------------------------------------------

interface SitemapRoute {
  path: string
  priority: number
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly'
  /** File paths (relative to repo root) to track for lastmod */
  sourceFiles: string[]
}

// Static routes
const staticRoutes: SitemapRoute[] = [
  {
    path: '/',
    priority: 1.0,
    changefreq: 'weekly',
    sourceFiles: ['src/pages/WelcomePage.tsx', 'src/config/siteConfig.ts'],
  },
  {
    path: '/cpacc-practice-test',
    priority: 0.9,
    changefreq: 'weekly',
    sourceFiles: ['src/pages/MockExamPage.tsx'],
  },
]

// Domain overview pages — lastmod is the latest across all topic content in that domain
const domainRoutes: SitemapRoute[] = Object.entries(DOMAIN_PATHS).map(([num, domainPath]) => {
  const domainNumber = Number(num)
  const domain = cpacc_topics[domainNumber - 1]
  const topicContentPaths = domain.topics
    .filter(t => !t.id.includes('-all'))
    .flatMap(t => getTopicContentPaths(t.id))

  return {
    path: `/${domainPath}`,
    priority: 0.9,
    changefreq: 'monthly' as const,
    sourceFiles: ['src/config/domainConfig.ts', ...topicContentPaths],
  }
})

// Topic pages — lastmod tracks the actual content file
const topicRoutes: SitemapRoute[] = cpacc_topics.flatMap((domain, index) => {
  const domainNumber = index + 1
  const domainPath = DOMAIN_PATHS[domainNumber]

  return domain.topics
    .filter(topic => !topic.id.includes('-all'))
    .map(topic => ({
      path: `/${domainPath}/${topic.id}`,
      priority: 0.8,
      changefreq: 'monthly' as const,
      sourceFiles: getTopicContentPaths(topic.id),
    }))
})

// Legal / info pages
const infoRoutes: SitemapRoute[] = [
  { path: '/about', priority: 0.4, changefreq: 'monthly', sourceFiles: ['src/pages/AboutCreatorPage.tsx'] },
  { path: '/privacy', priority: 0.3, changefreq: 'yearly', sourceFiles: ['src/pages/PrivacyPage.tsx'] },
  { path: '/terms', priority: 0.3, changefreq: 'yearly', sourceFiles: ['src/pages/TermsPage.tsx'] },
  { path: '/accessibility', priority: 0.3, changefreq: 'yearly', sourceFiles: ['src/pages/AccessibilityPage.tsx'] },
]

// Combine all routes
const allRoutes = [...staticRoutes, ...domainRoutes, ...topicRoutes, ...infoRoutes]

// ---------------------------------------------------------------------------
// Generate and write
// ---------------------------------------------------------------------------

function generateSitemap(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => {
  const lastmod = getLatestModified(route.sourceFiles)
  return `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
}).join('\n')}
</urlset>`
}

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
