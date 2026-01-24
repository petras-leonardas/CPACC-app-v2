/**
 * SEO structured data generators for CPACC topics
 * Generates JSON-LD schema.org markup for better search engine visibility
 */

interface TopicStructuredDataParams {
  topicTitle: string
  topicDescription?: string
  domainTitle: string
}

interface BreadcrumbStructuredDataParams {
  domainTitle: string
  domainPath: string
  topicTitle: string
  canonicalPath: string
}

/**
 * Generate structured data for a learning resource (topic page)
 */
export function generateTopicStructuredData({
  topicTitle,
  topicDescription,
  domainTitle
}: TopicStructuredDataParams) {
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": topicTitle,
    "description": topicDescription || `Learn about ${topicTitle} for CPACC certification. Comprehensive study guide with examples and practice questions.`,
    "educationalLevel": "Professional Certification",
    "about": {
      "@type": "Thing",
      "name": "CPACC Certification",
      "description": "Certified Professional in Accessibility Core Competencies"
    },
    "isPartOf": {
      "@type": "Course",
      "name": domainTitle,
      "provider": {
        "@type": "Organization",
        "name": "CPACC Mastery",
        "url": "https://cpacc-mastery.pages.dev"
      }
    },
    "inLanguage": "en",
    "learningResourceType": "Study Guide"
  }
}

/**
 * Generate breadcrumb navigation structured data
 */
export function generateBreadcrumbStructuredData({
  domainTitle,
  domainPath,
  topicTitle,
  canonicalPath
}: BreadcrumbStructuredDataParams) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://cpacc-mastery.pages.dev/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": domainTitle,
        "item": `https://cpacc-mastery.pages.dev${domainPath}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": topicTitle,
        "item": `https://cpacc-mastery.pages.dev${canonicalPath}`
      }
    ]
  }
}
