import { TopicContent } from '../components/TopicContent'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { cpacc_topics, allTopicsOverview } from '../data/topics'
import type { Topic } from '../data/topics'

interface TopicDetailPageProps {
  questionCounts: Record<string, number>
  domainNumber?: number
}

export function TopicDetailPage({ questionCounts: _questionCounts, domainNumber }: TopicDetailPageProps) {
  const navigate = useNavigate()
  const { topicId } = useParams<{ topicId?: string }>()
  
  const domainTitles: Record<number, string> = {
    1: 'Domain 1',
    2: 'Domain 2',
    3: 'Domain 3'
  }
  
  const getSelectedTopic = (): Topic => {
    if (!topicId || topicId === 'all-topics') {
      return allTopicsOverview
    }

    for (const domain of cpacc_topics) {
      const topic = domain.topics.find((t) => t.id === topicId)
      if (topic) return topic
    }

    return allTopicsOverview
  }

  const selectedTopic = getSelectedTopic()

  const handleTestClick = () => {
    const fromPath = domainNumber ? `/domain-${domainNumber}/${topicId}` : `/topics/${topicId || 'all-topics'}`
    navigate(`/test/${topicId || 'all-topics'}`, { 
      state: { from: fromPath } 
    })
  }

  const handleFlashcardsClick = () => {
    navigate(`/flashcards/${topicId || 'all-topics'}`)
  }
  
  const domainPath = domainNumber ? `/domain-${domainNumber}` : null

  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-950 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-8">
        {/* Breadcrumbs */}
        {domainNumber && domainPath && (
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link
                  to={domainPath}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  {domainTitles[domainNumber]}
                </Link>
              </li>
              <li className="text-gray-400 dark:text-gray-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </li>
              <li className="text-gray-900 dark:text-gray-100 font-medium">
                {selectedTopic.title}
              </li>
            </ol>
          </nav>
        )}
        
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            {selectedTopic.title}
          </h1>
        </div>
        
        <TopicContent
          topic={selectedTopic}
          onFlashcardsClick={handleFlashcardsClick}
          onTestClick={handleTestClick}
        />
      </div>
    </main>
  )
}
