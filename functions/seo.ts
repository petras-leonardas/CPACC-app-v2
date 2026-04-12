/**
 * Server-side SEO meta tag injection for Cloudflare Worker.
 *
 * This module contains all route metadata (titles, descriptions, canonical URLs,
 * structured data) and the logic to inject them into the SPA's index.html before
 * serving it. This ensures that crawlers and social media bots that don't execute
 * JavaScript still receive correct per-page meta tags, Open Graph data, and JSON-LD.
 *
 * The metadata here mirrors what the client-side <SEO> component and page components
 * produce via react-helmet-async. When updating SEO metadata on the client side,
 * keep this file in sync.
 */

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SITE_URL = 'https://cpaccmastery.com'
const SITE_NAME = 'CPACC Mastery'
const OG_IMAGE_DEFAULT = `${SITE_URL}/og-image.png`

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RouteMeta {
  title: string
  description: string
  canonical: string
  noindex?: boolean
  ogImage?: string
  structuredData?: object[]
}

// ---------------------------------------------------------------------------
// Topic data (minimal subset needed for SEO — mirrors src/data/topics.ts)
// ---------------------------------------------------------------------------

interface TopicSEO {
  id: string
  title: string
}

const DOMAIN_PATHS: Record<number, string> = {
  1: 'disabilities-challenges-assistive-technology',
  2: 'accessibility-universal-design',
  3: 'standards-laws-management-strategies',
}

const DOMAIN_TITLES: Record<number, string> = {
  1: 'Disabilities, challenges & assistive technologies',
  2: 'Accessibility & universal design',
  3: 'Standards, laws & management strategies',
}

/** Domain number keyed by URL path segment */
const DOMAIN_NUMBER_BY_PATH: Record<string, number> = {
  'disabilities-challenges-assistive-technology': 1,
  'accessibility-universal-design': 2,
  'standards-laws-management-strategies': 3,
}

const TOPICS_BY_DOMAIN: Record<number, TopicSEO[]> = {
  1: [
    { id: '1a-theoretical-models', title: 'Theoretical models of disability' },
    { id: '1b-categories-characteristics', title: 'Categories & characteristics of disabilities, associated barriers, and solutions' },
    { id: '1c-assistive-technologies', title: 'Assistive technologies & adaptive strategies' },
    { id: '1d-demographics-statistics', title: 'Disability demographics and statistics' },
    { id: '1e-disability-etiquette', title: 'Disability etiquette' },
  ],
  2: [
    { id: '2a-accommodations-universal-design', title: 'Individual accommodations vs universal design' },
    { id: '2b-benefits-accessibility', title: 'Benefits of accessibility' },
    { id: '2c-wcag-principles', title: 'Web accessibility principles (WCAG)' },
    { id: '2d-built-environment', title: 'Built environment accessibility principles' },
    { id: '2e-universal-design-principles', title: 'Principles of universal design' },
    { id: '2f-udl-ux', title: 'Universal design for learning (UDL) + UX' },
  ],
  3: [
    { id: '3a-international-conventions', title: 'International declaration and conventions' },
    { id: '3b-regional-instruments', title: 'Regional instruments on human & disability rights' },
    { id: '3c-national-provincial', title: 'National & provincial instruments' },
    { id: '3d-procurement-laws', title: 'Domain-specific & government procurement laws' },
    { id: '3e-ict-standards', title: 'Applying accessibility standards & regulations to ICT' },
    { id: '3f-integrating-ict', title: 'Integrating ICT accessibility across the organisation' },
  ],
}

// Quick topic lookup by id
const TOPIC_MAP = new Map<string, { topic: TopicSEO; domainNumber: number }>()
for (const [domainNum, topics] of Object.entries(TOPICS_BY_DOMAIN)) {
  for (const topic of topics) {
    TOPIC_MAP.set(topic.id, { topic, domainNumber: Number(domainNum) })
  }
}

// ---------------------------------------------------------------------------
// Domain page SEO config (mirrors src/config/domainConfig.ts)
// ---------------------------------------------------------------------------

interface DomainSEO {
  seoTitle: string
  seoDescription: string
  structuredDataName: string
  structuredDataDescription: string
}

const DOMAIN_SEO: Record<number, DomainSEO> = {
  1: {
    seoTitle: 'CPACC Domain 1: Disabilities & Assistive Technology',
    seoDescription: 'CPACC Domain 1 study guide: disability models, assistive technologies, and accessibility fundamentals. Free certification prep.',
    structuredDataName: 'Disabilities, Challenges & Assistive Technology',
    structuredDataDescription: 'Master Domain 1 of the CPACC certification covering theoretical models of disability, assistive technologies, and accessibility fundamentals.',
  },
  2: {
    seoTitle: 'CPACC Domain 2: Accessibility & Universal Design',
    seoDescription: 'CPACC Domain 2 study guide: WCAG guidelines, universal design principles, and accessible web design. Free certification prep.',
    structuredDataName: 'Accessibility & Universal Design',
    structuredDataDescription: 'Learn Domain 2 of CPACC certification covering WCAG guidelines, accessible web design, and universal design principles.',
  },
  3: {
    seoTitle: 'CPACC Domain 3: Standards, Laws & Management',
    seoDescription: 'CPACC Domain 3 study guide: accessibility standards, laws, regulations, and management strategies. Free certification prep.',
    structuredDataName: 'Standards, Laws & Management Strategies',
    structuredDataDescription: 'Study Domain 3 of CPACC certification covering accessibility standards, laws, regulations, and organizational management strategies.',
  },
}

// ---------------------------------------------------------------------------
// Structured data generators (mirrors src/utils/seoStructuredData.ts)
// ---------------------------------------------------------------------------

function organizationSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Free comprehensive CPACC certification study guide and practice tests for accessibility professionals',
    sameAs: ['https://www.linkedin.com/in/leobacevicius'],
  }
}

function websiteSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Free comprehensive CPACC certification study guide with practice tests covering all three domains',
    inLanguage: 'en',
    about: {
      '@type': 'Thing',
      name: 'CPACC Certification',
      description: 'Certified Professional in Accessibility Core Competencies',
    },
  }
}

function courseSchema(domainNumber: number): object {
  const seo = DOMAIN_SEO[domainNumber]
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: seo.structuredDataName,
    description: seo.structuredDataDescription,
    provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    educationalLevel: 'Professional Certification',
    inLanguage: 'en',
    about: {
      '@type': 'Thing',
      name: 'CPACC Certification',
      description: 'Certified Professional in Accessibility Core Competencies',
    },
  }
}

function learningResourceSchema(topicTitle: string, domainTitle: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: topicTitle,
    description: `Learn about ${topicTitle} for CPACC certification. Comprehensive study guide with examples and practice questions.`,
    educationalLevel: 'Professional Certification',
    about: {
      '@type': 'Thing',
      name: 'CPACC Certification',
      description: 'Certified Professional in Accessibility Core Competencies',
    },
    isPartOf: {
      '@type': 'Course',
      name: domainTitle,
      provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    },
    inLanguage: 'en',
    learningResourceType: 'Study Guide',
  }
}

function breadcrumbSchema(
  domainTitle: string,
  domainPath: string,
  topicTitle: string,
  canonicalPath: string,
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: domainTitle, item: `${SITE_URL}/${domainPath}` },
      { '@type': 'ListItem', position: 3, name: topicTitle, item: `${SITE_URL}${canonicalPath}` },
    ],
  }
}

// ---------------------------------------------------------------------------
// Route matching → RouteMeta
// ---------------------------------------------------------------------------

/**
 * Given a URL pathname, return the SEO metadata for that route.
 * Returns `null` for paths that don't correspond to a known page route
 * (e.g. static asset paths like /assets/index-abc123.js).
 */
export function getRouteMeta(pathname: string): RouteMeta | null {
  // Normalize: strip trailing slash (except root)
  const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')

  // Helper: build absolute OG image URL from slug
  const ogImg = (slug: string) => `${SITE_URL}/og/${slug}.png`

  // ── Home ────────────────────────────────────────────────────────────────
  if (path === '/') {
    return {
      title: `Free CPACC Study Guide & Practice Tests - ${SITE_NAME}`,
      description: 'Free CPACC study guide with practice tests covering all 3 domains. Prepare for your accessibility certification exam with expert content.',
      canonical: '/',
      ogImage: ogImg('home'),
      structuredData: [organizationSchema(), websiteSchema()],
    }
  }

  // ── Practice hub ────────────────────────────────────────────────────────
  if (path === '/cpacc-practice-test') {
    return {
      title: `Free CPACC Practice Tests — Test Your Accessibility Knowledge - ${SITE_NAME}`,
      description: 'Practice applying accessibility concepts with exam-style questions. Choose from quick, standard, or full-length practice tests covering all three CPACC domains.',
      canonical: '/cpacc-practice-test',
      ogImage: ogImg('cpacc-practice-test'),
    }
  }

  // ── About ───────────────────────────────────────────────────────────────
  if (path === '/about') {
    return {
      title: `About the creator - ${SITE_NAME}`,
      description: 'Learn about Leo Bacevicius, the product designer behind CPACC Mastery — a free accessibility certification study resource.',
      canonical: '/about',
      ogImage: ogImg('about'),
    }
  }

  // ── Legal pages ─────────────────────────────────────────────────────────
  if (path === '/privacy') {
    return {
      title: `Privacy Policy - ${SITE_NAME}`,
      description: 'Privacy policy for CPACC Mastery - how we collect, use, and protect your data',
      canonical: '/privacy',
      ogImage: ogImg('privacy'),
    }
  }
  if (path === '/terms') {
    return {
      title: `Terms of Use - ${SITE_NAME}`,
      description: 'Terms of use for CPACC Mastery',
      canonical: '/terms',
      ogImage: ogImg('terms'),
    }
  }
  if (path === '/accessibility') {
    return {
      title: `Accessibility Statement - ${SITE_NAME}`,
      description: 'Accessibility statement for CPACC Mastery',
      canonical: '/accessibility',
      ogImage: ogImg('accessibility'),
    }
  }

  // ── Test pages (noindex) ────────────────────────────────────────────────
  if (path.startsWith('/test/')) {
    return {
      title: `${SITE_NAME}`,
      description: 'Free CPACC study guide with practice tests covering all 3 domains.',
      canonical: path,
      noindex: true,
    }
  }

  // ── Domain & topic pages ────────────────────────────────────────────────
  // Check if the path starts with a known domain prefix
  const segments = path.slice(1).split('/')
  const domainSlug = segments[0]
  const topicId = segments[1]
  const domainNumber = DOMAIN_NUMBER_BY_PATH[domainSlug]

  if (domainNumber) {
    const domainTitle = DOMAIN_TITLES[domainNumber]

    // Domain overview page (e.g. /accessibility-universal-design)
    if (!topicId) {
      const seo = DOMAIN_SEO[domainNumber]
      return {
        title: seo.seoTitle,
        description: seo.seoDescription,
        canonical: `/${domainSlug}`,
        ogImage: ogImg(domainSlug),
        structuredData: [courseSchema(domainNumber)],
      }
    }

    // Topic detail page (e.g. /accessibility-universal-design/2c-wcag-principles)
    const topicEntry = TOPIC_MAP.get(topicId)
    if (topicEntry) {
      const { topic } = topicEntry
      const canonicalPath = `/${domainSlug}/${topicId}`
      const domainPath = DOMAIN_PATHS[domainNumber]
      return {
        title: `${topic.title} - ${SITE_NAME}`,
        description: `Learn about ${topic.title} for CPACC certification. Comprehensive study guide with examples and practice questions covering accessibility fundamentals.`,
        canonical: canonicalPath,
        ogImage: ogImg(topicId),
        structuredData: [
          learningResourceSchema(topic.title, domainTitle),
          breadcrumbSchema(domainTitle, domainPath, topic.title, canonicalPath),
        ],
      }
    }
  }

  // No matching route — return null so the worker can pass through unchanged
  return null
}

// ---------------------------------------------------------------------------
// HTML injection
// ---------------------------------------------------------------------------

/**
 * Build the HTML string to inject before </head>.
 * This includes meta description, canonical, OG tags, Twitter cards,
 * robots directives, and JSON-LD structured data.
 */
function buildMetaTagsHtml(meta: RouteMeta): string {
  const canonicalUrl = `${SITE_URL}${meta.canonical}`
  const lines: string[] = []

  // Basic meta
  lines.push(`<meta name="description" content="${escapeAttr(meta.description)}" />`)
  // Omit canonical on noindex pages to avoid sending mixed signals to crawlers
  if (!meta.noindex) {
    lines.push(`<link rel="canonical" href="${escapeAttr(canonicalUrl)}" />`)
  }

  // Robots
  if (meta.noindex) {
    lines.push('<meta name="robots" content="noindex, nofollow" />')
  }

  // Open Graph
  lines.push(`<meta property="og:title" content="${escapeAttr(meta.title)}" />`)
  lines.push(`<meta property="og:description" content="${escapeAttr(meta.description)}" />`)
  lines.push(`<meta property="og:url" content="${escapeAttr(canonicalUrl)}" />`)
  const ogImage = meta.ogImage || OG_IMAGE_DEFAULT
  lines.push(`<meta property="og:image" content="${escapeAttr(ogImage)}" />`)
  lines.push('<meta property="og:image:width" content="1200" />')
  lines.push('<meta property="og:image:height" content="630" />')
  lines.push('<meta property="og:type" content="website" />')
  lines.push(`<meta property="og:site_name" content="${SITE_NAME}" />`)
  lines.push('<meta property="og:locale" content="en_US" />')

  // Twitter Card
  lines.push('<meta name="twitter:card" content="summary_large_image" />')
  lines.push(`<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`)
  lines.push(`<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`)
  lines.push(`<meta name="twitter:image" content="${escapeAttr(ogImage)}" />`)

  // Structured data — sanitize to prevent breaking out of script tags
  if (meta.structuredData) {
    for (const schema of meta.structuredData) {
      const json = JSON.stringify(schema).replace(/<\//g, '<\\/')
      lines.push(`<script type="application/ld+json">${json}</script>`)
    }
  }

  return lines.join('\n    ')
}

/** Escape a string for use inside an HTML attribute value (double-quoted). */
function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

// Regex to match the fallback SEO block in index.html (<!-- SEO:START ... --> ... <!-- SEO:END -->)
const SEO_BLOCK_RE = /<!-- SEO:START[^]*?<!-- SEO:END -->/

/**
 * Replace the fallback SEO block in index.html with per-page meta tags.
 * If the block markers aren't found (e.g. index.html was modified), falls back
 * to appending before </head>.
 */
function replaceSEOBlock(html: string, metaHtml: string): string {
  if (SEO_BLOCK_RE.test(html)) {
    return html.replace(SEO_BLOCK_RE, metaHtml)
  }
  // Fallback: append before </head>
  return html.replace('</head>', `    ${metaHtml}\n  </head>`)
}

/**
 * Inject server-side meta tags into the SPA's index.html for the given pathname.
 * If the pathname doesn't match a known route, the HTML is returned unmodified.
 */
export function injectSEO(html: string, pathname: string): string {
  const meta = getRouteMeta(pathname)
  if (!meta) return html

  // Replace the generic <title> with the page-specific one
  let result = html.replace(
    /<title>CPACC Mastery<\/title>/,
    `<title>${escapeAttr(meta.title)}</title>`,
  )

  // Replace the fallback SEO block with per-page meta tags
  const metaHtml = buildMetaTagsHtml(meta)
  result = replaceSEOBlock(result, metaHtml)

  return result
}

/**
 * Inject noindex meta into the SPA's index.html for unknown routes (404s).
 * Replaces the fallback SEO block with a noindex directive so search engines
 * don't index garbage URLs that reach the SPA shell.
 */
export function inject404SEO(html: string): string {
  const noindexHtml = '<meta name="robots" content="noindex, nofollow" />'
  const result = html.replace(
    /<title>CPACC Mastery<\/title>/,
    `<title>Page not found - ${SITE_NAME}</title>`,
  )
  return replaceSEOBlock(result, noindexHtml)
}
