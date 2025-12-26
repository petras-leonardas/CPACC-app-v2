import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = 'https://cpacc-mastery.pages.dev'

// Static routes with priorities and change frequencies
const staticRoutes = [
  { 
    path: '/', 
    priority: 1.0, 
    changefreq: 'weekly' 
  },
  { 
    path: '/cpacc-practice-test', 
    priority: 0.9, 
    changefreq: 'weekly' 
  },
  { 
    path: '/disabilities-challenges-assistive-technology', 
    priority: 0.9, 
    changefreq: 'monthly' 
  },
  { 
    path: '/accessible-information-communication', 
    priority: 0.9, 
    changefreq: 'monthly' 
  },
  { 
    path: '/assistive-products-services', 
    priority: 0.9, 
    changefreq: 'monthly' 
  }
]

// Domain paths mapping
const domainPaths = {
  1: 'disabilities-challenges-assistive-technology',
  2: 'accessible-information-communication',
  3: 'assistive-products-services'
}

// Topic data - manually defined since we can't import TS files directly
const cpacc_topics = [
  {
    id: 'domain-1',
    topics: [
      { id: 'theoretical-models' },
      { id: 'disability-etiquette' },
      { id: 'assistive-technology' },
      { id: 'ict-accessibility' }
    ]
  },
  {
    id: 'domain-2',
    topics: [
      { id: 'wcag-overview' },
      { id: 'accessible-design-principles' },
      { id: 'accessible-authoring' }
    ]
  },
  {
    id: 'domain-3',
    topics: [
      { id: 'accessibility-standards' },
      { id: 'disability-laws' },
      { id: 'organizational-governance' }
    ]
  }
]

// Generate topic routes dynamically
const topicRoutes = []
cpacc_topics.forEach((domain, domainIndex) => {
  const domainNumber = domainIndex + 1
  const domainPath = domainPaths[domainNumber]
  
  domain.topics.forEach(topic => {
    if (!topic.id.includes('-all')) { // Exclude test-all topics
      topicRoutes.push({
        path: `/${domainPath}/${topic.id}`,
        priority: 0.8,
        changefreq: 'monthly'
      })
    }
  })
})

// Combine all routes
const allRoutes = [...staticRoutes, ...topicRoutes]

// Generate XML sitemap
const generateSitemap = () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return xml
}

// Write sitemap to public folder
const writeSitemap = () => {
  try {
    const sitemap = generateSitemap()
    const publicDir = path.join(__dirname, '..', 'public')
    const sitemapPath = path.join(publicDir, 'sitemap.xml')
    
    // Ensure public directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }
    
    fs.writeFileSync(sitemapPath, sitemap, 'utf8')
    console.log('✅ Sitemap generated successfully!')
    console.log(`📍 Location: ${sitemapPath}`)
    console.log(`📊 Total URLs: ${allRoutes.length}`)
  } catch (error) {
    console.error('❌ Error generating sitemap:', error)
    process.exit(1)
  }
}

writeSitemap()
