import { useNavigate } from 'react-router-dom'

export function MockExamPage() {
  const navigate = useNavigate()

  const handleFullMock = () => {
    navigate('/test/mock-exam', { state: { from: '/mock-exam' } })
  }

  const handleQuickTest = () => {
    navigate('/test/quick-test', { state: { from: '/mock-exam' } })
  }

  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-950 overflow-y-auto flex flex-col">
      <div className="flex-1">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-8">
        
        {/* Page Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Mock exam
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl">
              8 topics across 3 domains, organized to reflect the structure of the official Body of Knowledge. Use this page as a map to decide where to focus your preparation.
            </p>
          </div>
          <button 
            onClick={handleFullMock}
            className="ml-4 px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium whitespace-nowrap"
          >
            Start 80-question mock
          </button>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="inline-block px-3 py-1.5 text-xs md:text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-300 dark:border-gray-700">
            Mixed across all domains
          </span>
          <span className="inline-block px-3 py-1.5 text-xs md:text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-300 dark:border-gray-700">
            Scenario + concept questions
          </span>
          <span className="inline-block px-3 py-1.5 text-xs md:text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-300 dark:border-gray-700">
            Explanations after submit
          </span>
        </div>

        {/* Two exam option cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          
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
                  Best for realistic prep
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Great 1–2 weeks before exam
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Builds endurance
                </span>
              </li>
            </ul>
            
            <button 
              onClick={handleFullMock}
              className="w-full px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium text-sm"
            >
              Start 80-question mock
            </button>
          </div>

          {/* Quick exam test card */}
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
                  Quick exam test
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
                  Perfect for daily practice
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Quick confidence check
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Lower time commitment
                </span>
              </li>
            </ul>
            
            <button 
              onClick={handleQuickTest}
              className="w-full px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium text-sm"
            >
              Start 20-question test
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
        <div className="max-w-5xl mx-auto px-4 md:px-8">
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
