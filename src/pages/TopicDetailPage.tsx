import { TopicContent } from '../components/TopicContent'
import { TableOfContents } from '../components/TableOfContents'
import { TextToSpeech } from '../components/TextToSpeech'
import { Icon } from '../components/Icon'
import { Tooltip } from '../components/Tooltip'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { cpacc_topics, allTopicsOverview } from '../data/topics'
import { topicDetailedContent } from '../data/topicContent'
import type { Topic } from '../data/topics'

interface TopicDetailPageProps {
  questionCounts: Record<string, number>
  domainNumber?: number
}

export function TopicDetailPage({ questionCounts, domainNumber }: TopicDetailPageProps) {
  const navigate = useNavigate()
  const { topicId } = useParams<{ topicId?: string }>()
  
  const domainTitles: Record<number, string> = {
    1: 'Disabilities, challenges & assistive technologies (Domain 1)',
    2: 'Accessibility & universal design (Domain 2)',
    3: 'Standards, laws & management strategies (Domain 3)'
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
  const detailedContent = topicDetailedContent[selectedTopic.id]
  const bottomCtaRef = useRef<HTMLDivElement>(null)
  const [ttsState, setTtsState] = useState({ isPlaying: false, isPaused: false, playbackRate: 2.0, currentIndex: -1 })
  const [isHeaderMinimized, setIsHeaderMinimized] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  // Generate TOC items from detailed content sections
  const tocItems = detailedContent?.sections.map(section => ({
    id: section.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    title: section.heading
  })) || []

  const handleTestClick = () => {
    const fromPath = domainNumber ? `/domain-${domainNumber}/${topicId}` : `/topics/${topicId || 'all-topics'}`
    navigate(`/test/${topicId || 'all-topics'}`, { 
      state: { from: fromPath } 
    })
  }

  // Scroll detection for sticky header
  useEffect(() => {
    let headerObserver: IntersectionObserver | null = null
    
    // Small delay to ensure DOM is fully rendered and positioned
    const timer = setTimeout(() => {
      // Observer for header to detect when it should minimize
      headerObserver = new IntersectionObserver(
        ([entry]) => {
          setIsHeaderMinimized(!entry.isIntersecting)
        },
        {
          threshold: 0,
          rootMargin: '-80px 0px 0px 0px'
        }
      )

      const headerRefCurrent = headerRef.current
      
      if (headerRefCurrent && headerObserver) {
        headerObserver.observe(headerRefCurrent)
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      if (headerObserver) headerObserver.disconnect()
    }
  }, [])
  
  const domainPath = domainNumber ? `/domain-${domainNumber}` : null

  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* Full-width Breadcrumbs */}
      {domainNumber && domainPath && (
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800" aria-label="Breadcrumb">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
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
          </div>
        </nav>
      )}

      {/* Sticky Header - combines back button, title, and test CTA */}
      <div 
        ref={headerRef}
        className={`sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-all duration-300 ${isHeaderMinimized ? 'shadow-md' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className={`flex items-center justify-between gap-6 transition-all duration-300 ${isHeaderMinimized ? 'py-3' : 'py-6'}`}>
            {/* Left: Back button + Title */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {domainNumber && domainPath && (
                <Tooltip content="Back to domain">
                  <button
                    onClick={() => navigate(domainPath)}
                    className="flex-shrink-0 p-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600 rounded-lg transition-colors"
                    aria-label="Back to domain"
                  >
                    <Icon name="arrow-left" customSize={20} />
                  </button>
                </Tooltip>
              )}
              <h1 className={`font-bold text-gray-900 dark:text-gray-100 truncate transition-all duration-300 ${isHeaderMinimized ? 'text-lg' : 'text-2xl md:text-3xl'}`}>
                {selectedTopic.title}
              </h1>
            </div>
            
            {/* Right: Question count + Test CTA */}
            <div className="flex items-center gap-3">
              {/* Question count badge */}
              {selectedTopic.subCategory && questionCounts[selectedTopic.subCategory] > 0 && (
                <div className={`flex items-center gap-2 text-gray-600 dark:text-gray-400 transition-all duration-300 ${isHeaderMinimized ? 'text-xs' : 'text-sm'}`}>
                  <span className="font-medium" aria-label={`${questionCounts[selectedTopic.subCategory]} questions available`}>
                    {questionCounts[selectedTopic.subCategory]} {questionCounts[selectedTopic.subCategory] === 1 ? 'question' : 'questions'}
                  </span>
                </div>
              )}
              
              {/* Test CTA button */}
              <button
                onClick={handleTestClick}
                className={`flex-shrink-0 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all font-medium whitespace-nowrap inline-flex items-center gap-2 ${isHeaderMinimized ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-base'}`}
              >
                <Icon name="play" customSize={isHeaderMinimized ? 14 : 16} />
                {isHeaderMinimized ? 'Test' : 'Test your knowledge'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
        <div className="flex gap-8">
          <div className="flex-1 min-w-0">
        
        {/* Text-to-Speech Player */}
        {detailedContent && (
          <TextToSpeech 
            content={detailedContent}
            onStateChange={setTtsState}
          />
        )}
        
        <div className="mt-6">
          <TopicContent
            topic={selectedTopic}
            currentReadingIndex={ttsState.currentIndex}
          />
        </div>
        
        {/* Bottom CTA Card - permanent at end of content */}
        <div ref={bottomCtaRef} className="mt-12 mb-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Ready to check your understanding?
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Take a short test on this topic anytime — the reading stands on its own.
              </p>
            </div>
            <button 
              onClick={handleTestClick}
              className="flex-shrink-0 px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium whitespace-nowrap inline-flex items-center gap-2"
            >
              <Icon name="play" customSize={16} />
              Start test
            </button>
          </div>
        </div>
          </div>
          
          {/* Right Sidebar - Table of Contents only */}
          <aside className="hidden xl:block w-80 flex-shrink-0">
            {/* Table of Contents - sticky positioned */}
            {tocItems.length > 0 && (
              <div className="sticky top-32">
                <TableOfContents items={tocItems} />
              </div>
            )}
          </aside>
        </div>
      </div>

    </main>
  )
}
