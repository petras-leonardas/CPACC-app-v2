import { useNavigate } from 'react-router-dom'

export function WelcomePage() {
  const navigate = useNavigate()

  const handleMockExam = () => {
    navigate('/test/mock-exam', { state: { from: '/' } })
  }

  const handleTestAllQuestions = () => {
    navigate('/test/all-topics', { state: { from: '/' } })
  }

  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-950 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
        
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Prepare for CPACC with clarity.
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            A focused study platform for the Certified Professional in Accessibility Core Competencies exam. Learn the core concepts, reinforce them with practice, and test your readiness.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button 
              onClick={handleMockExam}
              className="px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium"
            >
              Mock exam test
            </button>
            <button 
              onClick={handleTestAllQuestions}
              className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-2 border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Test on all questions
            </button>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="inline-block px-3 py-1.5 text-xs md:text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-300 dark:border-gray-700">
              Aligned to the Body of Knowledge
            </span>
            <span className="inline-block px-3 py-1.5 text-xs md:text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-300 dark:border-gray-700">
              Built for understanding, not memorization
            </span>
            <span className="inline-block px-3 py-1.5 text-xs md:text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-300 dark:border-gray-700">
              Topic mode + all-topics mode
            </span>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          
          {/* Welcome & Purpose */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
                  <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                  <path d="M12 12v10a10 10 0 0 0 8.66-5" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Welcome & purpose
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  CPACC Mastery is a structured place to learn and practice the foundational concepts behind accessibility. It's designed to feel calm and focused, so you can build understanding first — then test yourself with confidence.
                </p>
              </div>
            </div>
          </div>

          {/* What to Expect */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  What to expect from the exam
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  CPACC rewards broad conceptual understanding. Strong answers show you can recognize different perspectives, identify strengths and limitations, and apply concepts to real-world scenarios.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Understand key concepts and terminology
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Recognize models and their trade-offs
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Apply knowledge in realistic situations
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Think in context — not absolutes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How to Use */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  How to use CPACC Mastery
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  Use the platform in a simple loop: learn the topic, practice key terms, then test your understanding. Start anywhere — consistency matters more than speed.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Based on the IAAP CPACC Body of Knowledge.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Attribution */}
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            CPACC Mastery is an independent study tool and is not affiliated with or endorsed by the International Association of Accessibility Professionals (IAAP).
          </p>
        </div>

      </div>
    </main>
  )
}
