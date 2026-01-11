import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { SEO } from '../components/SEO'
import { GridContainer, Grid } from '../components/Grid'
import { usePageTracking } from '../hooks/usePageTracking'
import { trackEvent } from '../utils/analytics'

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
    "url": "https://cpacc-mastery.pages.dev",
    "description": "Free comprehensive CPACC certification study guide and practice tests for accessibility professionals",
    "sameAs": [
      "https://www.linkedin.com/in/leobacevicius"
    ]
  }
  
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CPACC Mastery",
    "url": "https://cpacc-mastery.pages.dev",
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
        title="CPACC Study Guide & Free Practice Tests"
        description="Free comprehensive CPACC certification study guide with practice tests, flashcards, and expert content for accessibility professionals. Master all three domains for your CPACC exam."
        canonical="/"
      />
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    <main className="flex-1 bg-gray-50 dark:bg-gray-950 overflow-y-auto flex flex-col">
      <div className="flex-1">
        <GridContainer className="py-6 md:py-8">
        
        {/* Hero Section */}
        <div className="mb-10">
          {/* H1 at top - full width */}
          <h1 className="cpacc-heading-1 mb-8">
            Learn accessibility fundamentals, grounded in CPACC
          </h1>
          
          {/* Two-column layout for content and image */}
          <Grid gap={8}>
            {/* Left Column - All content (8 columns on tablet+) */}
            <div className="col-span-12 md:col-span-8">
              <p className="cpacc-body-1 mb-6">
                A structured learning resource for designers, engineers, product teams, and future CPACC candidates who want to understand accessibility clearly, practically, and at scale.
              </p>
              
              <p className="cpacc-body-2 mb-4">
                CPACC Mastery helps you build a solid foundation in accessibility by explaining the core concepts defined in the Certified Professional in Accessibility Core Competencies (CPACC) Body of Knowledge.
              </p>
              
              <p className="cpacc-body-2">
                Whether you are preparing for the exam or simply want to work more confidently with accessibility, this site focuses on shared language, clear mental models, and real-world relevance — not memorization alone.
              </p>
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
          <h2 className="cpacc-heading-2 mb-4">
            How is the content organized?
          </h2>
          <p className="cpacc-body-1 mb-6">
            The site is structured around three core domains:
          </p>
        </div>

        {/* Domain Navigation Cards */}
        <div className="mb-10">
          {/* Three Column Cards - Each card spans 4 columns on desktop */}
          <Grid gap={6}>
            {/* Domain 1: Disabilities, Challenges & Assistive Technologies */}
            <Link 
              to="/disabilities-challenges-assistive-technology"
              onClick={() => handleDomainCardClick(1, 'Disabilities, Challenges & Assistive Technologies')}
              data-tracking-id="home-domain-1-card"
              className="col-span-12 md:col-span-4 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon name="eye" customSize={20} className="text-gray-700 dark:text-gray-300" />
                <h2 className="cpacc-heading-3">
                  Disabilities, challenges & assistive technologies
                </h2>
              </div>
              <p className="cpacc-body-2 mb-4">
                Understand disability, barriers, assistive technologies, and how people interact with environments.
              </p>
              <div className="flex items-center gap-2 cpacc-btn-text-lg group-hover:gap-3 transition-all">
                Explore topics
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </Link>

            {/* Domain 2: Accessibility & Universal Design */}
            <Link 
              to="/accessibility-universal-design"
              onClick={() => handleDomainCardClick(2, 'Accessibility & Universal Design')}
              data-tracking-id="home-domain-2-card"
              className="col-span-12 md:col-span-4 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon name="lightbulb" customSize={20} className="text-gray-700 dark:text-gray-300" />
                <h2 className="cpacc-heading-3">
                  Accessibility & universal design
                </h2>
              </div>
              <p className="cpacc-body-2 mb-4">
                Learn how accessibility is applied through inclusive design principles, including WCAG and universal design.
              </p>
              <div className="flex items-center gap-2 cpacc-btn-text-lg group-hover:gap-3 transition-all">
                Explore topics
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </Link>

            {/* Domain 3: Standards, Laws & Management Strategies */}
            <Link 
              to="/standards-laws-management-strategies"
              onClick={() => handleDomainCardClick(3, 'Standards, Laws & Management Strategies')}
              data-tracking-id="home-domain-3-card"
              className="col-span-12 md:col-span-4 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon name="book-open" customSize={20} className="text-gray-700 dark:text-gray-300" />
                <h2 className="cpacc-heading-3">
                  Standards, laws & management strategies
                </h2>
              </div>
              <p className="cpacc-body-2 mb-4">
                Explore how accessibility is regulated, implemented, and sustained within organizations.
              </p>
              <div className="flex items-center gap-2 cpacc-btn-text-lg group-hover:gap-3 transition-all">
                Explore topics
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </Link>
          </Grid>

          {/* Practice & Exam Preparation Section */}
          <div className="mt-10">
            <h2 className="cpacc-heading-2 mb-4">
              Practice & exam preparation
            </h2>
            <Grid>
              <p className="cpacc-body-1 col-span-12 lg:col-span-8">
                The Practice section includes CPACC-style questions to help you check your understanding, identify gaps, and build confidence. If you're preparing for the CPACC exam, this mirrors the exam format. If you're not, it still works as a structured knowledge check.
              </p>
            </Grid>
          </div>

          {/* Two-column layout for Who is this for & Official CPACC Resources */}
          <Grid gap={8} className="mt-10">
            {/* Who is this for Section (6 columns on desktop) */}
            <div className="col-span-12 lg:col-span-6">
              <h2 className="cpacc-heading-2 mb-4">
                Who is this for?
              </h2>
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
              <h2 className="cpacc-heading-2 mb-4">
                Official CPACC resources
              </h2>
              <div>
                <p className="cpacc-body-1 mb-4">
                  CPACC Mastery is an independent learning resource built around the CPACC structure.
                  For official certification details and reference materials, see:
                </p>
                <ul className="list-disc list-outside ml-5 space-y-2">
                  <li className="cpacc-body-1">
                    <a 
                      href="https://www.accessibilityassociation.org/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cpacc-body-1-link"
                    >
                      International Association of Accessibility Professionals (IAAP)
                    </a>
                  </li>
                  <li className="cpacc-body-1">
                    <a 
                      href="https://www.accessibilityassociation.org/sfsites/c/resource/CPACCBoK" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cpacc-body-1-link"
                    >
                      CPACC Body of Knowledge (BoK)
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Grid>

        </div>
        </GridContainer>
      </div>
    </main>
    </>
  )
}
