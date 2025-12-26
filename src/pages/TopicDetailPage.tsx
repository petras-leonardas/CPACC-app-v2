import { TopicContent } from '../components/TopicContent'
import { TableOfContents } from '../components/TableOfContents'
import { TextToSpeech } from '../components/TextToSpeech'
import { TopicNavigation } from '../components/SectionNavigation'
import { Icon } from '../components/Icon'
import { Tooltip } from '../components/Tooltip'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { cpacc_topics, allTopicsOverview } from '../data/topics'
import { topicDetailedContent } from '../data/topicContent'
import type { Topic } from '../data/topics'

interface TopicDetailPageProps {
  domainNumber?: number
}

export function TopicDetailPage({ domainNumber }: TopicDetailPageProps) {
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
  const sentinelRef = useRef<HTMLDivElement>(null)

  // Get domain topics for navigation (exclude "Test all Domain X" topics)
  const getDomainTopics = () => {
    if (!domainNumber) return []
    const domain = cpacc_topics.find(d => d.id === `domain-${domainNumber}`)
    if (!domain) return []
    // Filter out the "Test all Domain X" topic
    return domain.topics.filter(t => !t.id.includes('-all'))
  }

  const domainTopics = getDomainTopics()
  const currentTopicIndex = domainTopics.findIndex(t => t.id === topicId)

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
    let sentinelObserver: IntersectionObserver | null = null
    
    // Small delay to ensure DOM is fully rendered and positioned
    const timer = setTimeout(() => {
      // Observer for sentinel element to detect when header should minimize
      sentinelObserver = new IntersectionObserver(
        ([entry]) => {
          // When sentinel scrolls out of view, minimize header
          setIsHeaderMinimized(!entry.isIntersecting)
        },
        {
          threshold: 0,
          rootMargin: '0px'
        }
      )

      const sentinelRefCurrent = sentinelRef.current
      
      if (sentinelRefCurrent && sentinelObserver) {
        sentinelObserver.observe(sentinelRefCurrent)
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      if (sentinelObserver) sentinelObserver.disconnect()
    }
  }, [])

  const handleScrollToTop = () => {
    console.log('handleScrollToTop called')
    // Find the scrollable main content container (from Layout component)
    const mainContent = document.querySelector('.flex-1.overflow-auto')
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // Fallback to window scroll
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNavigateToPreviousTopic = () => {
    if (currentTopicIndex > 0 && domainNumber) {
      const previousTopic = domainTopics[currentTopicIndex - 1]
      navigate(`/domain-${domainNumber}/${previousTopic.id}`)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNavigateToNextTopic = () => {
    if (currentTopicIndex < domainTopics.length - 1 && domainNumber) {
      const nextTopic = domainTopics[currentTopicIndex + 1]
      navigate(`/domain-${domainNumber}/${nextTopic.id}`)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  
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

      {/* Sentinel element for scroll detection */}
      <div ref={sentinelRef} className="h-0" aria-hidden="true" />

      {/* Sticky Header - combines back button, title, and test CTA */}
      <div 
        ref={headerRef}
        className={`sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-all duration-300 ${isHeaderMinimized ? 'shadow-md' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className={`flex items-center justify-between gap-6 transition-all duration-300 ${isHeaderMinimized ? 'py-4' : 'py-6'}`}>
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
              <h1 className={`font-bold text-gray-900 dark:text-gray-100 truncate transition-[font-size,line-height] duration-150 ease-in-out ${isHeaderMinimized ? 'text-lg' : 'text-2xl md:text-3xl'}`}>
                {selectedTopic.title}
              </h1>
            </div>
            
            {/* Right: Test CTA */}
            <div className="flex items-center">
              {/* Test CTA button with question count chip inside */}
              <button
                onClick={handleTestClick}
                className={`flex-shrink-0 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-all font-medium whitespace-nowrap inline-flex items-center ${isHeaderMinimized ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-base'}`}
              >
                Test your knowledge
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
            isHeaderMinimized={isHeaderMinimized}
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
              className="flex-shrink-0 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-all font-medium whitespace-nowrap inline-flex items-center px-6 py-3 text-base"
            >
              Test your knowledge
            </button>
          </div>
        </div>

        {/* Topic Navigation - only show when viewing a domain topic */}
        {domainNumber && domainTopics.length > 0 && currentTopicIndex !== -1 && (
          <TopicNavigation
            topics={domainTopics}
            currentTopicIndex={currentTopicIndex}
            onNavigateToPreviousTopic={handleNavigateToPreviousTopic}
            onNavigateToNextTopic={handleNavigateToNextTopic}
            onScrollToTop={handleScrollToTop}
          />
        )}
          </div>
          
          {/* Right Sidebar - Table of Contents only */}
          <aside className="hidden xl:block w-80 flex-shrink-0">
            {/* Table of Contents - sticky positioned */}
            {tocItems.length > 0 && (
              <div className={`sticky transition-[top] duration-150 ${isHeaderMinimized ? 'top-28' : 'top-32'}`}>
                <TableOfContents items={tocItems} />
              </div>
            )}
          </aside>
        </div>
      </div>

    </main>
  )
}
