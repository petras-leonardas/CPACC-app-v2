import { Link, useNavigate } from 'react-router-dom'
import { cpacc_topics } from '../data/topics'

export function Domain1Page() {
  const navigate = useNavigate()

  const handleDomainTest = () => {
    navigate('/test/domain-1-all', { state: { from: '/domain-1' } })
  }

  const domain = cpacc_topics[0]
  const regularTopics = domain.topics.filter(t => !t.id.includes('-all'))

  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-950 overflow-y-auto flex flex-col">
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
        
        {/* Page Header */}
        <div className="mb-6">
          {/* Domain label */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Disabilities, challenges & assistive technologies (Domain 1)
          </p>
          
          {/* Title and CTA */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                Disabilities, challenges & assistive technologies
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mb-3">
                This domain introduces how disability is understood, experienced, and supported. It covers theoretical models of disability, common barriers people encounter, and the role assistive technologies play in enabling participation.
              </p>
              <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl">
                Use this domain to build foundational language and perspectives that inform all other areas of accessibility.
              </p>
            </div>
            <button 
              onClick={handleDomainTest}
              className="ml-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-all font-medium whitespace-nowrap inline-flex items-center px-6 py-3 text-base"
            >
              Test your knowledge
            </button>
          </div>
        </div>

        {/* Topics Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="space-y-2">
            {regularTopics.map((topic) => (
              <Link
                key={topic.id}
                to={`/domain-1/${topic.id}`}
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
  )
}
