import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  canonical?: string
  noindex?: boolean
}

export function SEO({ title, description, canonical, noindex }: SEOProps) {
  const fullTitle = `${title} - CPACC Mastery`
  const siteUrl = 'https://cpacc-mastery.pages.dev' // Update to your actual domain
  
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
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
