import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  canonical?: string
  noindex?: boolean
  /** If true, omits the " - CPACC Mastery" suffix from the title */
  rawTitle?: boolean
}

export function SEO({ title, description, canonical, noindex, rawTitle }: SEOProps) {
  const fullTitle = rawTitle ? title : `${title} - CPACC Mastery`
  const siteUrl = 'https://cpaccmastery.com'
  const ogImage = `${siteUrl}/og-image.png`
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={`${siteUrl}${canonical}`} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph for social media */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${siteUrl}${canonical || ''}`} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
