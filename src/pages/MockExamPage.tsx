import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { SEO } from '../components/SEO'
import { cpacc_topics } from '../data/topics'

export function MockExamPage() {
  const navigate = useNavigate()
  const [selectedTopic, setSelectedTopic] = useState<{ id: string; title: string; subCategory?: string } | null>(null)
  const [expandedDomain, setExpandedDomain] = useState<number | null>(null)

  const handleFullMock = () => {
    navigate('/test/mock-exam', { state: { from: '/cpacc-practice-test' } })
  }

  const handleQuickTest = () => {
    navigate('/test/quick-test', { state: { from: '/cpacc-practice-test' } })
  }

  const handleSuperQuickTest = () => {
    navigate('/test/super-quick-test', { state: { from: '/cpacc-practice-test' } })
  }

  const handleTopicQuickTest = (topicId: string) => {
    navigate(`/test/topic-quick/${topicId}`, { state: { from: '/cpacc-practice-test' } })
  }

  const handleTopicFullTest = (topicId: string) => {
    navigate(`/test/${topicId}`, { state: { from: '/cpacc-practice-test' } })
  }

  const handleTopicClick = (topic: { id: string; title: string; subCategory?: string }) => {
    setSelectedTopic(topic)
  }

  const handleCloseModal = () => {
    setSelectedTopic(null)
  }

  const handleStartTest = (mode: '10' | 'all') => {
    if (!selectedTopic) return
    
    // Check if this is a domain test (pattern: domain-X-all)
    const isDomainTest = selectedTopic.id.includes('domain-') && selectedTopic.id.includes('-all')
    
    if (isDomainTest) {
      // Domain test routing
      if (mode === '10') {
        // Route to domain quick test
        navigate(`/test/domain-quick/${selectedTopic.id}`, { state: { from: '/cpacc-practice-test' } })
      } else {
        // Route to domain comprehensive test
        navigate(`/test/${selectedTopic.id}`, { state: { from: '/cpacc-practice-test' } })
      }
    } else {
      // Regular topic test routing
      if (mode === '10') {
        handleTopicQuickTest(selectedTopic.id)
      } else {
        handleTopicFullTest(selectedTopic.id)
      }
    }
    setSelectedTopic(null)
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

        {/* Quick Knowledge Check Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Quick knowledge check
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl">
            Test your knowledge on all accessibility topics in random order. Both options cover all three CPACC domains with questions distributed proportionally.
          </p>
        </div>

        {/* Two quick test cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Super quick test card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                10 question test
              </h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                ~10 minutes
              </span>
            </div>
            
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Perfect for a quick confidence check
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Test one or two concepts rapidly
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Takes just a few minutes
                </span>
              </li>
            </ul>
            
            <button 
              onClick={handleSuperQuickTest}
              className="w-full md:w-auto px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium text-sm inline-flex items-center gap-2 justify-center"
            >
              Start test
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Quick knowledge check card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                20 question test
              </h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                ~20 minutes
              </span>
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
              className="w-full md:w-auto px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-2 border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-sm inline-flex items-center gap-2 justify-center"
            >
              Start test
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mock Exam Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            CPACC mock exam
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl">
            Experience a full-length CPACC practice exam. Get the closest simulation to exam day conditions with 80 questions covering all domains.
          </p>
        </div>

        {/* Full mock card */}
        <div className="mb-12">
          {/* Full mock card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                80 question test
              </h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                ~2 hours
              </span>
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
              className="w-full md:w-auto px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-2 border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-sm inline-flex items-center gap-2 justify-center"
            >
              Start test
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

        </div>

        {/* Topic-based testing section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Topic Deep Dive
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl mb-6">
            Focus your practice on specific topics within each domain. Choose quick 10-question tests or comprehensive tests with all available questions.
          </p>

          {/* Domain sections */}
          <div className="space-y-4">
            {cpacc_topics.map((domain, domainIndex) => {
              const regularTopics = domain.topics.filter(t => !t.id.includes('-all'))
              const domainTitles = [
                'Disabilities, Challenges & Assistive Technologies',
                'Accessibility & Universal Design',
                'Standards, Laws & Management Strategies'
              ]
              
              const isExpanded = expandedDomain === domainIndex
              
              return (
                <div key={domain.id} className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setExpandedDomain(isExpanded ? null : domainIndex)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors rounded-lg"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {domainTitles[domainIndex]}
                    </h3>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`text-gray-400 dark:text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  
                  {isExpanded && (
                  <div className="px-6 pb-6 space-y-2">
                    {regularTopics.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => handleTopicClick(topic)}
                        className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group w-full text-left"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-900 dark:text-gray-100 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                            {topic.subCategory && `${topic.subCategory}. `}{topic.title}
                          </span>
                        </div>
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                    ))}
                    
                    {/* Divider */}
                    <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                    
                    {/* Test entire domain option */}
                    <button
                      onClick={() => handleTopicClick({
                        id: `${domain.id}-all`,
                        title: domainTitles[domainIndex]
                      })}
                      className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group w-full text-left"
                    >
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        Test all topics
                      </span>
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                  )}
                </div>
              )
            })}
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

    {/* Topic Test Selection Modal */}
    {selectedTopic && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={handleCloseModal}>
        <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 max-w-2xl w-full relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close modal"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
            Test topic
          </p>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            {selectedTopic.subCategory && `${selectedTopic.subCategory}. `}{selectedTopic.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Choose your test time
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Quick test card */}
            <button
              onClick={() => handleStartTest('10')}
              className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md transition-all text-left group"
            >
              <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Quick knowledge check
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Perfect for a rapid knowledge check with 10 questions.
              </p>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                10 minutes
              </span>
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:gap-3 transition-all">
                <span>Choose test</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </button>
            
            {/* Full test card */}
            <button
              onClick={() => handleStartTest('all')}
              className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md transition-all text-left group"
            >
              <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Comprehensive
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Comprehensive practice on this topic. Test your complete understanding.
              </p>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                10 minutes or more
              </span>
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:gap-3 transition-all">
                <span>Choose test</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  )
}
