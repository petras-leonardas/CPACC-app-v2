import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { SEO } from '../components/SEO'
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

  const handleIAAPLinkClick = () => {
    trackEvent('External Link Clicked', {
      linkText: 'Visit the official IAAP website',
      destination: 'IAAP',
      location: 'home',
    })
  }

  const handleFooterLinkClick = (linkType: string) => {
    trackEvent('Footer Link Clicked', {
      linkType,
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
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
        
        {/* Hero Section */}
        <div className="mb-8">
          {/* Title at top */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Learn accessibility fundamentals, grounded in CPACC
          </h1>
          
          {/* Subtext */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            A structured learning resource for designers, engineers, product teams, and future CPACC candidates who want to understand accessibility clearly, practically, and at scale.
          </p>
          
          {/* Two-column layout for content and image */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4">
            
            {/* Left Column - Content */}
            <div className="lg:flex-1">
              <p className="text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                CPACC Mastery helps you build a solid foundation in accessibility by explaining the core concepts defined in the Certified Professional in Accessibility Core Competencies (CPACC) Body of Knowledge.
              </p>
              <p className="text-base text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Whether you are preparing for the exam or simply want to work more confidently with accessibility, this site focuses on shared language, clear mental models, and real-world relevance — not memorization alone.
              </p>
            </div>

            {/* Right Column - Image */}
            <div className="mt-4 lg:mt-0 -mx-4 md:mx-0 flex-shrink-0">
              <img 
                src="https://pub-4e395a6ee72e47c4abad0c42f00f2141.r2.dev/Home%20image%20-%20Light.png" 
                alt="Conceptual clarity illustration"
                className="w-full md:w-64 h-auto md:h-64 rounded-none md:rounded-lg dark:hidden"
              />
              <img 
                src="https://pub-4e395a6ee72e47c4abad0c42f00f2141.r2.dev/Home%20image%20-%20Dark.png" 
                alt="Conceptual clarity illustration"
                className="w-full md:w-64 h-auto md:h-64 rounded-none md:rounded-lg hidden dark:block"
              />
            </div>

          </div>
        </div>

        {/* Content Organization Section */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            How is the content organized?
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            The site is structured around three core domains:
          </p>
        </div>

        {/* Domain Navigation Cards */}
        <div className="space-y-6">
          
          {/* Three Column Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Domain 1: Disabilities, Challenges & Assistive Technologies */}
            <Link 
              to="/disabilities-challenges-assistive-technology"
              onClick={() => handleDomainCardClick(1, 'Disabilities, Challenges & Assistive Technologies')}
              data-tracking-id="home-domain-1-card"
              className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon name="eye" customSize={20} className="text-gray-700 dark:text-gray-300" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Disabilities, challenges & assistive technologies
                </h2>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Understand disability, barriers, assistive technologies, and how people interact with environments.
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:gap-3 transition-all">
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
              className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon name="lightbulb" customSize={20} className="text-gray-700 dark:text-gray-300" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Accessibility & universal design
                </h2>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Learn how accessibility is applied through inclusive design principles, including WCAG and universal design.
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:gap-3 transition-all">
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
              className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon name="book-open" customSize={20} className="text-gray-700 dark:text-gray-300" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Standards, laws & management strategies
                </h2>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Explore how accessibility is regulated, implemented, and sustained within organizations.
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:gap-3 transition-all">
                Explore topics
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </Link>

          </div>

          {/* Practice & Exam Preparation Section */}
          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Practice & exam preparation
            </h2>
            <div className="max-w-3xl space-y-4">
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                The Practice section includes CPACC-style questions to help you check your understanding, identify gaps, and build confidence.
              </p>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                If you're preparing for the CPACC exam, this mirrors the exam format.
                If you're not, it still works as a structured knowledge check.
              </p>
            </div>
          </div>

          {/* Two-column layout for Who is this for & Official CPACC Resources */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Who is this for Section */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Who is this for?
              </h2>
              <div>
                <ul className="list-disc list-outside ml-5 space-y-2">
                  <li className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    Designers, engineers, and product managers
                  </li>
                  <li className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    Accessibility practitioners building foundational knowledge
                  </li>
                  <li className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    Teams looking for shared accessibility understanding
                  </li>
                  <li className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    CPACC candidates preparing for certification
                  </li>
                  <li className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    No prior accessibility expertise required.
                  </li>
                </ul>
              </div>
            </div>

            {/* Official CPACC Resources Section */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Official CPACC resources
              </h2>
              <div>
                <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  CPACC Mastery is an independent learning resource built around the CPACC structure.
                  For official certification details and reference materials, see:
                </p>
                <ul className="list-disc list-outside ml-5 space-y-2">
                  <li className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    <a 
                      href="https://www.accessibilityassociation.org/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 underline transition-colors"
                    >
                      International Association of Accessibility Professionals (IAAP)
                    </a>
                  </li>
                  <li className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    <a 
                      href="https://www.accessibilityassociation.org/sfsites/c/resource/CPACCBoK" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 underline transition-colors"
                    >
                      CPACC Body of Knowledge (BoK)
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
          </div>

          {/* About this resource */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-3xl">
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                This is a supplementary learning resource designed to help you explore the topics covered in the CPACC certification exam. Whether you're preparing for the exam or simply building your accessibility knowledge, these materials provide structured content aligned with the official CPACC Body of Knowledge.
              </p>
              <div className="flex items-center gap-4">
                <p className="text-base text-gray-600 dark:text-gray-400">
                  Ready to pursue the certification?
                </p>
                <a 
                  href="https://www.accessibilityassociation.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={handleIAAPLinkClick}
                  data-tracking-id="home-iaap-link"
                  className="inline-flex items-center gap-2 text-base font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition-colors group"
                >
                  Visit the official IAAP website
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full border-t border-gray-200 dark:border-gray-800 py-6">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            © 2026 CPACC Mastery · Independent study resource · Not affiliated with IAAP
          </p>
          <div className="flex gap-2 text-xs">
            <a href="#" onClick={() => handleFooterLinkClick('terms')} data-tracking-id="footer-terms" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              Terms
            </a>
            <span className="text-gray-400 dark:text-gray-600">·</span>
            <a href="#" onClick={() => handleFooterLinkClick('privacy')} data-tracking-id="footer-privacy" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              Privacy
            </a>
            <span className="text-gray-400 dark:text-gray-600">·</span>
            <a href="#" onClick={() => handleFooterLinkClick('accessibility')} data-tracking-id="footer-accessibility" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}
