import { Link } from 'react-router-dom'
import { cpacc_topics } from '../data/topics'
import { SEO } from '../components/SEO'
import { GridContainer, Grid } from '../components/Grid'

export function Domain3Page() {

  const domain = cpacc_topics[2]
  const regularTopics = domain.topics.filter(t => !t.id.includes('-all'))
  
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Assistive Products & Services",
    "description": "Study Domain 3 of CPACC certification covering assistive products, services, and support systems for professional accessibility certification.",
    "provider": {
      "@type": "Organization",
      "name": "CPACC Mastery",
      "url": "https://cpacc-mastery.pages.dev"
    },
    "educationalLevel": "Professional Certification",
    "inLanguage": "en",
    "about": {
      "@type": "Thing",
      "name": "CPACC Certification",
      "description": "Certified Professional in Accessibility Core Competencies"
    }
  }

  return (
    <>
      <SEO 
        title="Assistive Products & Services - Domain 3"
        description="Study Domain 3 of CPACC certification: assistive products, services, and support systems for professional accessibility certification."
        canonical="/standards-laws-management-strategies"
      />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <main className="flex-1 bg-gray-50 dark:bg-gray-950 overflow-y-auto flex flex-col">
      <div className="flex-1">
        <GridContainer className="py-6 md:py-8">
        
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="cpacc-heading-1 mb-8">
            Standards, laws & management strategies
          </h1>
          
          <Grid gap={8}>
            {/* Left Column - Intro paragraphs (8 columns) */}
            <div className="col-span-12 lg:col-span-8">
              <p className="cpacc-body-1 mb-4">
                Accessibility becomes effective and sustainable when it is embedded into policies, standards, and organizational practices. This domain focuses on how accessibility is formalized, regulated, and maintained at scale.
              </p>
              
              <p className="cpacc-body-1 mb-4">
                You'll explore international, regional, and national legal frameworks, accessibility standards, procurement requirements, and management strategies. The domain also covers how organizations integrate accessibility across teams, vendors, and systems over time.
              </p>
              
              <p className="cpacc-body-1">
                This content is essential for understanding accountability, compliance, and long-term accessibility maturity.
              </p>
            </div>

            {/* Right Column - CTA and Exam info (4 columns) */}
            <div className="col-span-12 lg:col-span-4">
              {/* Start learning button */}
              {regularTopics.length > 0 && (
                <Link
                  to={`/standards-laws-management-strategies/${regularTopics[0].id}`}
                  data-tracking-id="domain-3-start-learning"
                  className="flex items-center justify-center gap-2 w-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium mb-4"
                >
                  Start learning
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              )}

              {/* Exam info - subtle asterisk indicator */}
              <p className="cpacc-body-2 text-gray-600 dark:text-gray-400">* CPACC exam: ~20% of exam questions</p>
            </div>
          </Grid>
        </div>

        {/* Topics Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="space-y-2">
            {regularTopics.map((topic) => (
              <Link
                key={topic.id}
                to={`/standards-laws-management-strategies/${topic.id}`}
                className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-900 dark:text-gray-100 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                    {topic.subCategory && `${topic.subCategory}. `}{topic.title}
                  </span>
                </div>
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
        </GridContainer>
      </div>
    </main>
    </>
  )
}
