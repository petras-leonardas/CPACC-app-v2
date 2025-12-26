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
            <div className="mt-8 lg:mt-0 flex-shrink-0">
              <img 
                src="https://pub-4e395a6ee72e47c4abad0c42f00f2141.r2.dev/Home%20image%20-%20Light.png" 
                alt="Conceptual clarity illustration"
                className="w-64 h-64 rounded-lg dark:hidden"
              />
              <img 
                src="https://pub-4e395a6ee72e47c4abad0c42f00f2141.r2.dev/Home%20image%20-%20Dark.png" 
                alt="Conceptual clarity illustration"
                className="w-64 h-64 rounded-lg hidden dark:block"
              />
            </div>

          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          
          {/* Three Column Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Official Body of Knowledge */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="book-open" customSize={20} className="text-gray-700 dark:text-gray-300" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Official Body of Knowledge
                </h2>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Content aligned with IAAP's CPACC framework, covering all three domains — from foundational concepts to standards and organizational strategy.
              </p>
            </div>

            {/* Useful Beyond Certification */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="eye" customSize={20} className="text-gray-700 dark:text-gray-300" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Useful Beyond Certification
                </h2>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Whether preparing for CPACC or building team expertise, these concepts strengthen how you think about and discuss accessibility in practice.
              </p>
            </div>

            {/* Practice & Test Your Knowledge */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="play" customSize={20} className="text-gray-700 dark:text-gray-300" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Practice & Test Your Knowledge
                </h2>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Test your understanding with exam-style questions that mirror the CPACC format, helping you validate knowledge and identify gaps.
              </p>
            </div>

          </div>

          {/* Why CPACC matters - Full Width */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Why CPACC matters
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              CPACC is widely recognized because it validates foundational knowledge across accessibility domains. More importantly, it emphasizes the ability to reason about accessibility — understanding context, recognizing limitations, and making informed decisions.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Even if you never sit the exam, the CPACC framework is a strong guide for learning and discussing accessibility in professional teams.
            </p>
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
