import { Link } from 'react-router-dom'
import { cpacc_topics } from '../data/topics'
import { SEO } from '../components/SEO'
import { GridContainer, Grid } from '../components/Grid'

export function Domain1Page() {

  const domain = cpacc_topics[0]
  const regularTopics = domain.topics.filter(t => !t.id.includes('-all'))
  
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Disabilities, Challenges & Assistive Technology",
    "description": "Master Domain 1 of the CPACC certification covering theoretical models of disability, assistive technologies, and accessibility fundamentals.",
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
        title="Disabilities, Challenges & Assistive Technology - Domain 1"
        description="Master Domain 1 of the CPACC certification: theoretical models of disability, assistive technologies, and accessibility fundamentals for professional certification."
        canonical="/disabilities-challenges-assistive-technology"
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
            Disabilities, challenges & assistive technologies
          </h1>
          
          <Grid gap={8}>
            {/* Left Column - Intro paragraphs (8 columns) */}
            <div className="col-span-12 lg:col-span-8">
              <p className="cpacc-body-1 mb-4">
                Disability can be understood in many different ways, depending on the perspective used. This domain introduces how disability is defined, experienced, and shaped by the interaction between people, environments, and systems.
              </p>
              
              <p className="cpacc-body-1 mb-4">
                You'll explore key theoretical models of disability, common categories and characteristics, and the barriers people encounter in everyday life. The domain also introduces assistive technologies and adaptive strategies, focusing on how they support access and participation rather than "fixing" individuals.
              </p>
              
              <p className="cpacc-body-1">
                This content establishes shared language and foundational understanding that underpins all other accessibility work.
              </p>
            </div>

            {/* Right Column - CTA and Exam info (4 columns) */}
            <div className="col-span-12 lg:col-span-4">
              {/* Start learning button */}
              {regularTopics.length > 0 && (
                <Link
                  to={`/disabilities-challenges-assistive-technology/${regularTopics[0].id}`}
                  data-tracking-id="domain-1-start-learning"
                  className="flex items-center justify-center gap-2 w-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium mb-4"
                >
                  Start learning
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              )}

              {/* Exam info - subtle asterisk indicator */}
              <p className="cpacc-body-2 text-gray-600 dark:text-gray-400">* CPACC exam: ~40% of exam questions</p>
            </div>
          </Grid>
        </div>

        {/* Topics Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="space-y-2">
            {regularTopics.map((topic) => (
              <Link
                key={topic.id}
                to={`/disabilities-challenges-assistive-technology/${topic.id}`}
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
