import { Helmet } from 'react-helmet-async'
import { SITE_URL, SITE_NAME } from '../config/siteConfig'

interface SEOProps {
  title: string
  description: string
  canonical?: string
  noindex?: boolean
  /** If true, omits the " - {SITE_NAME}" suffix from the title */
  rawTitle?: boolean
}

export function SEO({ title, description, canonical, noindex, rawTitle }: SEOProps) {
  const fullTitle = rawTitle ? title : `${title} - ${SITE_NAME}`
  const ogImage = `${SITE_URL}/og-image.png`
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={`${SITE_URL}${canonical}`} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph for social media */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${SITE_URL}${canonical || ''}`} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
