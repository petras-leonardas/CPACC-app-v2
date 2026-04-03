/**
 * Server-side 301 redirect map for legacy URL paths.
 *
 * Previously, these redirects only existed as client-side <Navigate replace>
 * elements in React Router, which meant:
 *   - The HTTP response was always 200 (not 301/302)
 *   - Crawlers that don't execute JS never saw the redirect
 *   - Link equity from old URLs was not transferred to new URLs
 *   - Crawl budget was wasted indexing duplicate content
 *
 * This module moves them to the Cloudflare Worker so they return proper
 * HTTP 301 (Moved Permanently) responses, which search engines understand
 * without executing JavaScript.
 *
 * Keep this in sync with the legacy <Navigate> routes in src/App.tsx.
 */

const SITE_URL = 'https://cpaccmastery.com'

// ---------------------------------------------------------------------------
// Exact-match redirects: old path → new path
// ---------------------------------------------------------------------------

const EXACT_REDIRECTS: Record<string, string> = {
  // Legacy domain overview paths
  '/domain-1': '/disabilities-challenges-assistive-technology',
  '/domain-2': '/accessibility-universal-design',
  '/accessible-information-communication': '/accessibility-universal-design',
  '/domain-3': '/standards-laws-management-strategies',
  '/assistive-products-services': '/standards-laws-management-strategies',

  // Legacy practice test path
  '/mock-exam': '/cpacc-practice-test',

  // Legacy catch-all topics path
  '/topics': '/cpacc-practice-test',

  // Legacy topic ID redirects — Domain 1
  '/disabilities-challenges-assistive-technology/theoretical-models': '/disabilities-challenges-assistive-technology/1a-theoretical-models',
  '/disabilities-challenges-assistive-technology/categories-characteristics': '/disabilities-challenges-assistive-technology/1b-categories-characteristics',
  '/disabilities-challenges-assistive-technology/assistive-technologies': '/disabilities-challenges-assistive-technology/1c-assistive-technologies',
  '/disabilities-challenges-assistive-technology/demographics-statistics': '/disabilities-challenges-assistive-technology/1d-demographics-statistics',
  '/disabilities-challenges-assistive-technology/disability-etiquette': '/disabilities-challenges-assistive-technology/1e-disability-etiquette',

  // Legacy topic ID redirects — Domain 2
  '/accessibility-universal-design/accommodations-universal-design': '/accessibility-universal-design/2a-accommodations-universal-design',
  '/accessibility-universal-design/benefits-accessibility': '/accessibility-universal-design/2b-benefits-accessibility',
  '/accessibility-universal-design/wcag-principles': '/accessibility-universal-design/2c-wcag-principles',
  '/accessibility-universal-design/built-environment': '/accessibility-universal-design/2d-built-environment',
  '/accessibility-universal-design/universal-design-principles': '/accessibility-universal-design/2e-universal-design-principles',
  '/accessibility-universal-design/udl-ux': '/accessibility-universal-design/2f-udl-ux',

  // Legacy topic ID redirects — Domain 3
  '/standards-laws-management-strategies/international-conventions': '/standards-laws-management-strategies/3a-international-conventions',
  '/standards-laws-management-strategies/regional-instruments': '/standards-laws-management-strategies/3b-regional-instruments',
  '/standards-laws-management-strategies/national-provincial': '/standards-laws-management-strategies/3c-national-provincial',
  '/standards-laws-management-strategies/procurement-laws': '/standards-laws-management-strategies/3d-procurement-laws',
  '/standards-laws-management-strategies/ict-standards': '/standards-laws-management-strategies/3e-ict-standards',
  '/standards-laws-management-strategies/integrating-ict': '/standards-laws-management-strategies/3f-integrating-ict',
}

// ---------------------------------------------------------------------------
// Prefix-based redirects: old domain prefix → new domain prefix
// The topic segment is forwarded as-is.
// e.g. /domain-1/1a-theoretical-models → /disabilities-challenges-assistive-technology/1a-theoretical-models
// ---------------------------------------------------------------------------

const PREFIX_REDIRECTS: Array<{ oldPrefix: string; newPrefix: string }> = [
  { oldPrefix: '/domain-1/', newPrefix: '/disabilities-challenges-assistive-technology/' },
  { oldPrefix: '/domain-2/', newPrefix: '/accessibility-universal-design/' },
  { oldPrefix: '/accessible-information-communication/', newPrefix: '/accessibility-universal-design/' },
  { oldPrefix: '/domain-3/', newPrefix: '/standards-laws-management-strategies/' },
  { oldPrefix: '/assistive-products-services/', newPrefix: '/standards-laws-management-strategies/' },
]

// /topics/:anything → /cpacc-practice-test (drop the topic segment)
const TOPICS_PREFIX = '/topics/'

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Check if a pathname should be 301-redirected. Returns the redirect
 * `Response` if yes, or `null` if the path is not a legacy URL.
 */
export function getLegacyRedirect(pathname: string): Response | null {
  // Normalize: strip trailing slash (except root)
  const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')

  // 1. Exact match
  const exactTarget = EXACT_REDIRECTS[path]
  if (exactTarget) {
    return redirect301(exactTarget)
  }

  // 2. /topics/:anything → /cpacc-practice-test
  if (path.startsWith(TOPICS_PREFIX)) {
    return redirect301('/cpacc-practice-test')
  }

  // 3. Prefix-based: forward the remaining path segment
  for (const { oldPrefix, newPrefix } of PREFIX_REDIRECTS) {
    if (path.startsWith(oldPrefix)) {
      const rest = path.slice(oldPrefix.length)
      if (rest) {
        return redirect301(`${newPrefix}${rest}`)
      }
    }
  }

  return null
}

function redirect301(targetPath: string): Response {
  return new Response(null, {
    status: 301,
    headers: {
      Location: `${SITE_URL}${targetPath}`,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
