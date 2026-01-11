import { Link } from 'react-router-dom'
import { cpacc_topics } from '../data/topics'
import { SEO } from '../components/SEO'

export function Domain2Page() {

  const domain = cpacc_topics[1]
  const regularTopics = domain.topics.filter(t => !t.id.includes('-all'))
  
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Accessible Information & Communication",
    "description": "Learn Domain 2 of CPACC certification covering WCAG guidelines, accessible web design, and information accessibility.",
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
        title="Accessible Information & Communication - Domain 2"
        description="Learn Domain 2 of CPACC certification: WCAG guidelines, accessible web design, and information accessibility for professional certification."
        canonical="/accessibility-universal-design"
      />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <main className="flex-1 bg-gray-50 dark:bg-gray-950 overflow-y-auto flex flex-col">
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
        
        {/* Page Header */}
        <div className="mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Accessibility & universal design
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mb-3">
              This domain focuses on designing environments, products, and services that are usable by as many people as possible. It introduces core accessibility principles, universal design concepts, and how inclusive thinking scales beyond individual accommodations.
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl">
              Use this domain to understand how accessibility moves from reactive fixes to proactive, intentional design.
            </p>
          </div>
        </div>

        {/* Topics Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="space-y-2">
            {regularTopics.map((topic) => (
              <Link
                key={topic.id}
                to={`/accessibility-universal-design/${topic.id}`}
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
        </div>
      </div>
    </main>
    </>
  )
}
