import { SEO } from '../components/SEO'
import { usePageTracking } from '../hooks/usePageTracking'
import { cpacc_topics } from '../data/topics'
import { Heading, Text, Link, Container, Grid, Card, TopicNavigationList, TopicNavigationItem } from '../design-system'

export function Domain2Page() {
  usePageTracking('Domain 2: Accessibility & Universal Design')

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
      <main className="flex-1 overflow-y-auto flex flex-col">
      <div className="flex-1">
        <Container size="xl" padding="md" className="py-6 md:py-8">
        
        {/* Page Header */}
        <div className="mb-10">
          <Heading as="h1" className="mb-8">
            Accessibility & universal design
          </Heading>
          
          <Grid cols={12} gap="lg">
            {/* Left Column - Intro paragraphs (8 columns) */}
            <div className="col-span-12 lg:col-span-8">
              <Text variant="body1" className="mb-4">
                This domain focuses on how accessibility is applied through intentional design. It introduces principles and approaches that help create environments, products, and services usable by as many people as possible, without relying on individual accommodations.
              </Text>
              
              <Text variant="body1" className="mb-4">
                You'll learn how accessibility moves from reactive fixes to proactive, inclusive design. Topics include universal design, Universal Design for Learning (UDL), web accessibility principles (WCAG), and accessibility considerations across digital and physical environments.
              </Text>
              
              <Text variant="body1">
                This domain helps translate foundational understanding into practical, scalable design decisions.
              </Text>
            </div>

            {/* Right Column - CTA and Exam info (4 columns) */}
            <div className="col-span-12 lg:col-span-4">
              {/* Start learning card */}
              {regularTopics.length > 0 && (
                <Link
                  href={`/accessibility-universal-design/${regularTopics[0].id}`}
                  data-tracking-id="domain-2-start-learning"
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
              href={`/accessibility-universal-design/${topic.id}`}
              subCategory={topic.subCategory}
              data-tracking-id={`domain-2-topic-${topic.id}`}
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
