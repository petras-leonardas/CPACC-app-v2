import { cpacc_topics } from '../data/topics'
import { SEO } from '../components/SEO'
import { usePageTracking } from '../hooks/usePageTracking'
import { Heading, Text, Link, Container, Grid, Card, TopicNavigationList, TopicNavigationItem } from '../design-system'

export function Domain1Page() {
  usePageTracking('Domain 1: Disabilities, Challenges & Assistive Technology')

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
      "url": "https://cpaccmastery.com"
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
        title="CPACC Domain 1: Disabilities & Assistive Technology"
        description="CPACC Domain 1 study guide: disability models, assistive technologies, and accessibility fundamentals. Free certification prep."
        canonical="/disabilities-challenges-assistive-technology"
        rawTitle
      />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <main className="flex-1 overflow-y-auto flex flex-col">
      <div className="flex-1">
        <Container size="xl" padding="md" className="py-6 md:py-8">
        
        {/* Page Header */}
        <div className="mb-10">
          <Heading as="h1" className="mb-8">
            Disabilities, challenges & assistive technologies
          </Heading>
          
          <Grid cols={12} gap="lg">
            {/* Left Column - Intro paragraphs (8 columns) */}
            <div className="col-span-12 lg:col-span-8">
              <Text variant="body1" className="mb-4">
                Disability can be understood in many different ways, depending on the perspective used. This domain introduces how disability is defined, experienced, and shaped by the interaction between people, environments, and systems.
              </Text>
              
              <Text variant="body1" className="mb-4">
                You'll explore key theoretical models of disability, common categories and characteristics, and the barriers people encounter in everyday life. The domain also introduces assistive technologies and adaptive strategies, focusing on how they support access and participation rather than "fixing" individuals.
              </Text>
              
              <Text variant="body1">
                This content establishes shared language and foundational understanding that underpins all other accessibility work.
              </Text>
            </div>

            {/* Right Column - CTA and Exam info (4 columns) */}
            <div className="col-span-12 lg:col-span-4">
              {/* Start learning card */}
              {regularTopics.length > 0 && (
                <Link
                  href={`/disabilities-challenges-assistive-technology/${regularTopics[0].id}`}
                  data-tracking-id="domain-1-start-learning"
                  className="block group no-underline mb-4"
                >
                  <Card interactive>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
                          Ready to begin?
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Start with the first topic
                        </p>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 group-hover:translate-x-1 transition-transform">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3">
                      * CPACC exam: ~40% of exam questions
                    </div>
                  </Card>
                </Link>
              )}
            </div>
          </Grid>
        </div>

        {/* Topics Section */}
        <TopicNavigationList className="mb-6">
          {regularTopics.map((topic) => (
            <TopicNavigationItem
              key={topic.id}
              href={`/disabilities-challenges-assistive-technology/${topic.id}`}
              subCategory={topic.subCategory}
              data-tracking-id={`domain-1-topic-${topic.id}`}
            >
              {topic.title}
            </TopicNavigationItem>
          ))}
        </TopicNavigationList>
        </Container>
      </div>
    </main>
    </>
  )
}
