import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { SEO } from '../components/SEO'

export function WelcomePage() {
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Learn accessibility fundamentals, grounded in CPACC
          </h1>
          
          {/* Two-column layout for content and image */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4">
            
            {/* Left Column - Content */}
            <div className="lg:flex-1">
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                CPACC (Certified Professional in Accessibility Core Competencies) is a globally recognized certification covering the foundations of digital accessibility. CPACC Mastery is a structured learning resource for anyone who wants to understand these foundations deeply — designers, engineers, product teams, and future CPACC candidates alike.
              </p>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                The CPACC Body of Knowledge provides the structure, but the goal goes beyond exam preparation: building shared understanding, vocabulary, and confidence when working with accessibility.
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

        {/* Domain Navigation Cards */}
        <div className="space-y-6">
          
          {/* Three Column Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Domain 1: Disabilities, Challenges & Assistive Technologies */}
            <Link 
              to="/disabilities-challenges-assistive-technology"
              className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon name="eye" customSize={20} className="text-gray-700 dark:text-gray-300" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Disabilities, Challenges & Assistive Technologies
                </h2>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Learn about various disability types, assistive tech solutions, and how they impact digital accessibility.
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
              to="/accessible-information-communication"
              className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon name="lightbulb" customSize={20} className="text-gray-700 dark:text-gray-300" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Accessibility & Universal Design
                </h2>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Understand WCAG principles, universal design concepts, and how to create inclusive experiences.
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
              to="/assistive-products-services"
              className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon name="book-open" customSize={20} className="text-gray-700 dark:text-gray-300" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Standards, Laws & Management Strategies
                </h2>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Explore legal frameworks, standards, and organizational strategies for accessibility.
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:gap-3 transition-all">
                Explore topics
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </Link>

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
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              Terms
            </a>
            <span className="text-gray-400 dark:text-gray-600">·</span>
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              Privacy
            </a>
            <span className="text-gray-400 dark:text-gray-600">·</span>
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}
