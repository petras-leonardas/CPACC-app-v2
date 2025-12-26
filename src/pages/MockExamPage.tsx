import { useNavigate } from 'react-router-dom'
import { SEO } from '../components/SEO'

export function MockExamPage() {
  const navigate = useNavigate()

  const handleFullMock = () => {
    navigate('/test/mock-exam', { state: { from: '/cpacc-practice-test' } })
  }

  const handleQuickTest = () => {
    navigate('/test/quick-test', { state: { from: '/cpacc-practice-test' } })
  }

  return (
    <>
      <SEO 
        title="CPACC Practice Test - Free Mock Exams"
        description="Practice for CPACC certification with free 20 and 80-question mock exams covering all three domains. Build confidence before your CPACC exam."
        canonical="/cpacc-practice-test"
      />
      <main className="flex-1 bg-gray-50 dark:bg-gray-950 overflow-y-auto flex flex-col">
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Practice
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl">
            Use exam-style questions to practice applying accessibility concepts in context. This page works for CPACC candidates — and also for anyone who wants a structured way to check their accessibility fundamentals.
          </p>
        </div>

        {/* Two exam option cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          
          {/* Quick knowledge check card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
                  <polyline points="13 17 18 12 13 7" />
                  <polyline points="6 17 11 12 6 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Quick knowledge check
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  20 questions
                </p>
              </div>
            </div>
            
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Great for designers & engineers learning the basics
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Identify gaps fast — then jump back into a domain
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Easy to fit into a short break or team learning session
                </span>
              </li>
            </ul>
            
            <button 
              onClick={handleQuickTest}
              className="w-full md:w-auto px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium text-sm"
            >
              Start 20-question test
            </button>
          </div>

          {/* Full mock card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Full mock
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  80 questions
                </p>
              </div>
            </div>
            
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Closest to an end-to-end exam experience
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Best when you want a realistic readiness check
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Ideal 1–2 weeks before exam day (or as a milestone)
                </span>
              </li>
            </ul>
            
            <button 
              onClick={handleFullMock}
              className="w-full md:w-auto px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium text-sm"
            >
              Start 80-question mock
            </button>
          </div>

        </div>

        {/* Expectations card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Expectations
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                You can skip questions and review explanations after submitting an answer. Timing and scoring can be added later — for now, focus on building strong conceptual reasoning.
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full border-t border-gray-200 dark:border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            © 2026 CPACC Mastery
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
    </>
  )
}
