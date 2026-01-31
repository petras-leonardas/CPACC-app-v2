import { Icon } from '../components/Icon'
import { SEO } from '../components/SEO'
import { usePageTracking } from '../hooks/usePageTracking'
import { trackEvent } from '../utils/analytics'
import { Heading, Text, Link, Container, Grid, Card } from '../design-system'

export function WelcomePage() {
  usePageTracking('Home')

  const handleDomainCardClick = (domainNumber: number, domainTitle: string) => {
    trackEvent('Domain Card Clicked', {
      domain: domainNumber,
      domainTitle,
      location: 'home',
    })
  }
  // Structured data for SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CPACC Mastery",
    "url": "https://cpaccmastery.com",
    "description": "Free comprehensive CPACC certification study guide and practice tests for accessibility professionals",
    "sameAs": [
      "https://www.linkedin.com/in/leobacevicius"
    ]
  }
  
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CPACC Mastery",
    "url": "https://cpaccmastery.com",
    "description": "Free comprehensive CPACC certification study guide with practice tests covering all three domains",
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
        title="Free CPACC Study Guide & Practice Tests"
        description="Free CPACC study guide with practice tests covering all 3 domains. Prepare for your accessibility certification exam with expert content."
        canonical="/"
      />
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    <main className="flex-1 overflow-y-auto flex flex-col">
      <div className="flex-1">
        <Container size="xl" padding="md" className="py-6 md:py-8">
        
        {/* Hero Section */}
        <div className="mb-10">
          {/* H1 at top - full width */}
          <Heading as="h1" className="mb-8">
            Learn accessibility fundamentals, grounded in CPACC
          </Heading>
          
          {/* Two-column layout for content and image */}
          <Grid cols={12} gap="lg">
            {/* Left Column - All content (8 columns on tablet+) */}
            <div className="col-span-12 md:col-span-8">
              <Text variant="body1" className="mb-6">
                A structured learning resource for designers, engineers, product teams, and future CPACC candidates who want to understand accessibility clearly, practically, and at scale.
              </Text>
              
              <Text variant="body2" className="mb-4">
                CPACC Mastery helps you build a solid foundation in accessibility by explaining the core concepts defined in the Certified Professional in Accessibility Core Competencies (CPACC) Body of Knowledge.
              </Text>
              
              <Text variant="body2">
                Whether you are preparing for the exam or simply want to work more confidently with accessibility, this site focuses on shared language, clear mental models, and real-world relevance — not memorization alone.
              </Text>
            </div>

            {/* Right Column - Image (4 columns on tablet+) */}
            <div className="col-span-12 md:col-span-4">
              <img 
                src="https://pub-4e395a6ee72e47c4abad0c42f00f2141.r2.dev/Home%20image%20-%20Light.png" 
                alt="Conceptual clarity illustration"
                className="w-full h-auto rounded-lg dark:hidden"
              />
              <img 
                src="https://pub-4e395a6ee72e47c4abad0c42f00f2141.r2.dev/Home%20image%20-%20Dark.png" 
                alt="Conceptual clarity illustration"
                className="w-full h-auto rounded-lg hidden dark:block"
              />
            </div>
          </Grid>
        </div>

        {/* Content Organization Section */}
        <div className="mb-8">
          <Heading as="h2" className="mb-4">
            How is the content organized?
          </Heading>
          <Text variant="body1" className="mb-6">
            The site is structured around three core domains:
          </Text>
        </div>

        {/* Domain Navigation Cards */}
        <div className="mb-10">
          {/* Three Column Cards - Each card spans 4 columns on desktop */}
          <Grid cols={12} gap="md">
            {/* Domain 1: Disabilities, Challenges & Assistive Technologies */}
            <Link 
              href="/disabilities-challenges-assistive-technology"
              onClick={() => handleDomainCardClick(1, 'Disabilities, Challenges & Assistive Technologies')}
              data-tracking-id="home-domain-1-card"
              className="col-span-12 md:col-span-4 group no-underline"
            >
              <Card interactive className="h-full">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="eye" customSize={20} className="text-gray-700 dark:text-gray-300" />
                  <h2 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Disabilities, challenges & assistive technologies
                  </h2>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Understand disability, barriers, assistive technologies, and how people interact with environments.
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:gap-3 transition-all">
                  Explore topics
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </Card>
            </Link>

            {/* Domain 2: Accessibility & Universal Design */}
            <Link 
              href="/accessibility-universal-design"
              onClick={() => handleDomainCardClick(2, 'Accessibility & Universal Design')}
              data-tracking-id="home-domain-2-card"
              className="col-span-12 md:col-span-4 group no-underline"
            >
              <Card interactive className="h-full">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="lightbulb" customSize={20} className="text-gray-700 dark:text-gray-300" />
                  <h2 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Accessibility & universal design
                  </h2>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Learn how accessibility is applied through inclusive design principles, including WCAG and universal design.
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:gap-3 transition-all">
                  Explore topics
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </Card>
            </Link>

            {/* Domain 3: Standards, Laws & Management Strategies */}
            <Link 
              href="/standards-laws-management-strategies"
              onClick={() => handleDomainCardClick(3, 'Standards, Laws & Management Strategies')}
              data-tracking-id="home-domain-3-card"
              className="col-span-12 md:col-span-4 group no-underline"
            >
              <Card interactive className="h-full">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="book-open" customSize={20} className="text-gray-700 dark:text-gray-300" />
                  <h2 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Standards, laws & management strategies
                  </h2>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Explore how accessibility is regulated, implemented, and sustained within organizations.
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:gap-3 transition-all">
                  Explore topics
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </Card>
            </Link>
          </Grid>

          {/* Practice & Exam Preparation Section */}
          <div className="mt-10">
            <Heading as="h2" className="mb-4">
              Practice & exam preparation
            </Heading>
            <Grid>
              <Text variant="body1" className="col-span-12 lg:col-span-8">
                The Practice section includes CPACC-style questions to help you check your understanding, identify gaps, and build confidence. If you're preparing for the CPACC exam, this mirrors the exam format. If you're not, it still works as a structured knowledge check.
              </Text>
            </Grid>
          </div>

          {/* Two-column layout for Who is this for & Official CPACC Resources */}
          <Grid cols={12} gap="lg" className="mt-10">
            {/* Who is this for Section (6 columns on desktop) */}
            <div className="col-span-12 lg:col-span-6">
              <Heading as="h2" className="mb-4">
                Who is this for?
              </Heading>
              <div>
                <ul className="list-disc list-outside ml-5 space-y-2">
                  <li className="cpacc-body-1">
                    Designers, engineers, and product managers
                  </li>
                  <li className="cpacc-body-1">
                    Accessibility practitioners building foundational knowledge
                  </li>
                  <li className="cpacc-body-1">
                    Teams looking for shared accessibility understanding
                  </li>
                  <li className="cpacc-body-1">
                    CPACC candidates preparing for certification
                  </li>
                  <li className="cpacc-body-1">
                    No prior accessibility expertise required.
                  </li>
                </ul>
              </div>
            </div>

            {/* Official CPACC Resources Section (6 columns on desktop) */}
            <div className="col-span-12 lg:col-span-6">
              <Heading as="h2" className="mb-4">
                Official CPACC resources
              </Heading>
              <div>
                <Text variant="body1" className="mb-4">
                  CPACC Mastery is an independent learning resource built around the CPACC structure.
                  For official certification details and reference materials, see:
                </Text>
                <ul className="list-disc list-outside ml-5 space-y-2">
                  <li className="cpacc-body-1">
                    <Link 
                      href="https://www.accessibilityassociation.org/" 
                      external
                      underline="hover"
                    >
                      International Association of Accessibility Professionals (IAAP)
                    </Link>
                  </li>
                  <li className="cpacc-body-1">
                    <Link 
                      href="https://www.accessibilityassociation.org/sfsites/c/resource/CPACCBoK" 
                      external
                      underline="hover"
                    >
                      CPACC Body of Knowledge (BoK)
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </Grid>

        </div>
        </Container>
      </div>
    </main>
    </>
  )
}
