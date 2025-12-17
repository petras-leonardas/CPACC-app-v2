import { useNavigate } from 'react-router-dom'

export function WelcomePage() {
  const navigate = useNavigate()

  const handleMockExam = () => {
    navigate('/test/mock-exam', { state: { from: '/' } })
  }

  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-950 overflow-y-auto flex flex-col">
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-8">
        
        {/* Hero Section */}
        <div className="mb-8">
          {/* Title at top */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Focused CPACC exam prep
          </h1>
          
          {/* Two-column layout for content and image */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4">
            
            {/* Left Column - Content */}
            <div className="lg:flex-1">
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                CPACC Mastery helps you prepare for the CPACC exam by focusing on what actually matters: understanding concepts, recognizing perspectives, and applying them in context.
              </p>
              
              {/* Feature Badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="inline-block px-3 py-1.5 text-xs md:text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-300 dark:border-gray-700">
                  Aligned with the official Body of Knowledge
                </span>
                <span className="inline-block px-3 py-1.5 text-xs md:text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-300 dark:border-gray-700">
                  Designed for conceptual understanding
                </span>
                <span className="inline-block px-3 py-1.5 text-xs md:text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-300 dark:border-gray-700">
                  Practice with realistic mock exams
                </span>
              </div>

              {/* CTA Button */}
              <div>
                <button 
                  onClick={handleMockExam}
                  className="px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium"
                >
                  Mock exam test
                </button>
              </div>
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
            
            {/* What you'll get */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                What you'll get
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Clear topic summaries
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Extra reading per topic
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Exam-style questions
                  </span>
                </li>
              </ul>
            </div>

            {/* How to use it */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                How to use it
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Study a domain
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Use additional reading
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Run a mock exam
                  </span>
                </li>
              </ul>
            </div>

            {/* What CPACC rewards */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                What CPACC rewards
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Conceptual understanding
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Recognizing trade-offs
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Thinking in context
                  </span>
                </li>
              </ul>
            </div>

          </div>

          {/* Why CPACC matters - Full Width */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Why CPACC matters
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The CPACC certification demonstrates a strong, foundational understanding of digital accessibility. It is widely recognized across industries and signals that you can reason about accessibility concepts, standards, and trade-offs — not just follow checklists.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              The exam rewards conceptual thinking, the ability to compare perspectives, and applying accessibility principles in real-world contexts.
            </p>
          </div>

        </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full border-t border-gray-200 dark:border-gray-800 py-6">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            © 2025 CPACC Mastery
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            Independent study tool · Not affiliated with the International Association of Accessibility Professionals (IAAP)
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
  )
}
