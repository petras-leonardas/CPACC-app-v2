import { useNavigate } from 'react-router-dom'
import { cpacc_topics } from '../data/topics'
import { SEO } from '../components/SEO'
import { SITE_URL, SITE_NAME } from '../config/siteConfig'
import { DOMAIN_TITLES, DOMAIN_PATHS, DOMAIN_PAGE_CONFIG } from '../config/domainConfig'
import { usePageTracking } from '../hooks/usePageTracking'
import { Heading, Text, Link, Container, Grid, Card, TopicNavigationList, TopicNavigationItem, ChevronRight } from '../design-system'

interface DomainPageProps {
  domainNumber: 1 | 2 | 3
}

export function DomainPage({ domainNumber }: DomainPageProps) {
  const config = DOMAIN_PAGE_CONFIG[domainNumber]
  const domainPath = DOMAIN_PATHS[domainNumber]

  usePageTracking(config.pageTrackingName)
  const navigate = useNavigate()

  const domain = cpacc_topics[domainNumber - 1]
  const regularTopics = domain.topics.filter(t => !t.id.includes('-all'))

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": config.structuredDataName,
    "description": config.structuredDataDescription,
    "provider": {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL
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
        title={config.seoTitle}
        description={config.seoDescription}
        canonical={`/${domainPath}`}
        rawTitle
        ogImageSlug={domainPath}
      />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <div className="flex-1 flex flex-col">
      <div className="flex-1">
        <Container size="xl" padding="md" className="py-6 md:py-8">
        
        {/* Page Header */}
        <div className="mb-10">
          <Heading as="h1" className="mb-8">
            {DOMAIN_TITLES[domainNumber]}
          </Heading>
          
          <Grid cols={12} gap="lg">
            {/* Left Column - Intro paragraphs (8 columns) */}
            <div className="col-span-12 lg:col-span-8">
              <Text variant="body1" className="mb-4">
                {config.introParagraphs[0]}
              </Text>
              
              <Text variant="body1" className="mb-4">
                {config.introParagraphs[1]}
              </Text>
              
              <Text variant="body1">
                {config.introParagraphs[2]}
              </Text>
            </div>

            {/* Right Column - CTA and Exam info (4 columns) */}
            <div className="col-span-12 lg:col-span-4">
              {regularTopics.length > 0 && (
                <Link
                  href={`/${domainPath}/${regularTopics[0].id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    navigate(`/${domainPath}/${regularTopics[0].id}`)
                  }}
                  data-tracking-id={`domain-${domainNumber}-start-learning`}
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
                      <ChevronRight size={16} className="flex-shrink-0 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3">
                      * CPACC exam: {config.examWeight}
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
              href={`/${domainPath}/${topic.id}`}
              onClick={(e) => {
                e?.preventDefault()
                navigate(`/${domainPath}/${topic.id}`)
              }}
              subCategory={topic.subCategory}
              data-tracking-id={`domain-${domainNumber}-topic-${topic.id}`}
            >
              {topic.title}
            </TopicNavigationItem>
          ))}
        </TopicNavigationList>
        </Container>
      </div>
    </div>
    </>
  )
}
