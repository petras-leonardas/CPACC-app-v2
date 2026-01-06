import { Link, useNavigate } from 'react-router-dom'
import { cpacc_topics } from '../data/topics'

export function AllTopicsPage() {
  const navigate = useNavigate()

  const handleStartTest = () => {
    navigate('/test/all-topics', { state: { from: '/topics/all-topics' } })
  }

  const handleDomainTest = (domainNumber: number) => {
    navigate(`/test/domain-${domainNumber}-all`, { state: { from: '/topics/all-topics' } })
  }
  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-950 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
        
        {/* Page Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              All topics
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl">
              8 topics across 3 domains, organized to reflect the structure of the official Body of Knowledge. Use this page as a map to decide where to focus your preparation.
            </p>
          </div>
          <button 
            onClick={handleStartTest}
            className="ml-4 px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium whitespace-nowrap"
          >
            Start a test
          </button>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="inline-block px-3 py-1.5 text-xs md:text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-300 dark:border-gray-700">
            Structured by domain
          </span>
          <span className="inline-block px-3 py-1.5 text-xs md:text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-300 dark:border-gray-700">
            Designed for quick orientation
          </span>
          <span className="inline-block px-3 py-1.5 text-xs md:text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-300 dark:border-gray-700">
            Aligned to the Body of Knowledge
          </span>
        </div>

        {/* Exam Structure Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                How CPACC is organized
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The CPACC exam covers foundational knowledge across three domains. Each domain groups related concepts as per the IAAP Body of Knowledge. Understanding this structure helps you see where strong conceptual bases are built.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">
                      Disabilities, challenges & assistive technologies
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Disability models, barriers, demographics & AT
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">
                      Accessibility & universal design
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Principles, benefits & inclusive practice
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">
                      Standards, laws & management strategies
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Legal + organizational foundations
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                Tip: If you're new to this, start with Domain 1 and work through concepts slowly. Strong answers show you can recognize + apply context.
              </p>
            </div>
          </div>
        </div>

        {/* Domain Sections */}
        {cpacc_topics.map((domain, index) => {
          const domainNumber = index + 1
          const domainTitles = [
            'Disabilities, challenges & assistive technologies',
            'Accessibility & universal design',
            'Standards, laws & management strategies'
          ]
          const domainDescriptions = [
            'Understand disability models, barriers, and the role of assistive technologies.',
            'Learn accessibility principles, universal design, and how inclusive experiences are built.',
            'Explore standards, laws, and how organizations manage accessibility at scale.'
          ]
          
          // Filter out the "Test all Domain X" topics
          const regularTopics = domain.topics.filter(t => !t.id.includes('-all'))
          
          return (
            <div key={domain.id} className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {domainTitles[index]}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {domainDescriptions[index]}
                  </p>
                </div>
                <button 
                  onClick={() => handleDomainTest(domainNumber)}
                  className="ml-4 px-5 py-2.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium text-sm whitespace-nowrap"
                >
                  Test on Domain {domainNumber}
                </button>
              </div>
              
              <div className="space-y-2 mt-6">
                {regularTopics.map((topic) => (
                  <Link
                    key={topic.id}
                    to={`/topics/${topic.id}`}
                    className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {topic.subCategory}
                      </span>
                      <span className="text-sm text-gray-900 dark:text-gray-100 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                        {topic.title}
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
                  </Link>
                ))}
              </div>
            </div>
          )
        })}

        {/* Footer Attribution */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Based on the IAAP CPACC Body of Knowledge
          </p>
        </div>

      </div>
    </main>
  )
}
