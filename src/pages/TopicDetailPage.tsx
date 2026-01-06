import { TopicContent } from '../components/TopicContent'
import { TableOfContents } from '../components/TableOfContents'
import { TextToSpeech } from '../components/TextToSpeech'
import { TopicNavigation } from '../components/SectionNavigation'
import { Icon } from '../components/Icon'
import { Tooltip } from '../components/Tooltip'
import { SEO } from '../components/SEO'
import { BreadcrumbDropdown } from '../components/BreadcrumbDropdown'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { cpacc_topics, allTopicsOverview } from '../data/topics'
import { topicDetailedContent } from '../data/topicContent/index'
import type { Topic } from '../data/topics'

interface TopicDetailPageProps {
  domainNumber?: number
}

export function TopicDetailPage({ domainNumber }: TopicDetailPageProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { topicId } = useParams<{ topicId?: string }>()
  
  const domainTitles: Record<number, string> = {
    1: 'Disabilities, challenges & assistive technologies (Domain 1)',
    2: 'Accessibility & universal design (Domain 2)',
    3: 'Standards, laws & management strategies (Domain 3)'
  }
  
  const domainPaths: Record<number, string> = {
    1: 'disabilities-challenges-assistive-technology',
    2: 'accessible-information-communication',
    3: 'assistive-products-services'
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
  const [isHeaderMinimizedByScroll, setIsHeaderMinimizedByScroll] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  
  // Force header to minimized state during TTS to prevent animation glitching
  const isHeaderMinimized = (ttsState.isPlaying || ttsState.isPaused) ? true : isHeaderMinimizedByScroll

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

  // Get next domain info for cross-domain navigation
  const getNextDomainInfo = () => {
    if (!domainNumber || domainNumber >= 3) return null
    const nextDomainNumber = domainNumber + 1
    return {
      domainNumber: nextDomainNumber,
      domainPath: domainPaths[nextDomainNumber as keyof typeof domainPaths],
      domainTitle: domainTitles[nextDomainNumber as keyof typeof domainTitles]
    }
  }

  const nextDomainInfo = getNextDomainInfo()
  
  // Get previous domain info for cross-domain backward navigation
  const getPreviousDomainInfo = () => {
    if (!domainNumber || domainNumber <= 1) return null
    const previousDomainNumber = domainNumber - 1
    return {
      domainNumber: previousDomainNumber,
      domainPath: domainPaths[previousDomainNumber as keyof typeof domainPaths],
      domainTitle: domainTitles[previousDomainNumber as keyof typeof domainTitles]
    }
  }

  const previousDomainInfo = getPreviousDomainInfo()
  
  // Check if we're on the last topic of Domain 3
  const isLastTopicOfDomain3 = domainNumber === 3 && currentTopicIndex === domainTopics.length - 1

  // Generate TOC items from detailed content sections
  const tocItems = detailedContent?.sections.map(section => ({
    id: section.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    title: section.heading
  })) || []

  const handleTestClick = () => {
    const domainPaths: Record<number, string> = {
      1: 'disabilities-challenges-assistive-technology',
      2: 'accessible-information-communication',
      3: 'assistive-products-services'
    }
    const fromPath = domainNumber ? `/${domainPaths[domainNumber]}/${topicId}` : `/topics/${topicId || 'all-topics'}`
    navigate(`/test/${topicId || 'all-topics'}`, { 
      state: { from: fromPath } 
    })
  }

  // Scroll detection for sticky header
  useEffect(() => {
    let minimizeTimer: number | null = null
    const scrollThreshold = 50 // Minimize after scrolling 50px down
    
    // Find the scrollable container (from Layout component)
    const scrollContainer = document.querySelector('.flex-1.overflow-auto') as HTMLElement
    
    if (!scrollContainer) return
    
    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop
      
      if (scrollTop > scrollThreshold) {
        // User has scrolled past threshold - wait 500ms before minimizing
        if (!minimizeTimer && !isHeaderMinimizedByScroll) {
          minimizeTimer = window.setTimeout(() => {
            setIsHeaderMinimizedByScroll(true)
            minimizeTimer = null
          }, 500)
        }
      } else {
        // User scrolled back up - expand immediately
        if (minimizeTimer) {
          clearTimeout(minimizeTimer)
          minimizeTimer = null
        }
        if (isHeaderMinimizedByScroll) {
          setIsHeaderMinimizedByScroll(false)
        }
      }
    }
    
    scrollContainer.addEventListener('scroll', handleScroll)
    
    return () => {
      if (minimizeTimer) clearTimeout(minimizeTimer)
      scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [isHeaderMinimizedByScroll])

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
      const domainPath = domainPaths[domainNumber]
      navigate(`/${domainPath}/${previousTopic.id}`)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (previousDomainInfo) {
      // Navigate to previous domain overview page
      navigate(`/${previousDomainInfo.domainPath}`)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNavigateToNextTopic = () => {
    if (currentTopicIndex < domainTopics.length - 1 && domainNumber) {
      const nextTopic = domainTopics[currentTopicIndex + 1]
      const domainPath = domainPaths[domainNumber]
      navigate(`/${domainPath}/${nextTopic.id}`)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (isLastTopicOfDomain3) {
      // Navigate to practice page after completing all domains
      navigate('/cpacc-practice-test')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (nextDomainInfo) {
      // Navigate to next domain overview page
      navigate(`/${nextDomainInfo.domainPath}`)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  
  const domainPath = domainNumber ? domainPaths[domainNumber] : null
  const domainTitle = domainNumber ? domainTitles[domainNumber] : ''
  const canonicalPath = domainNumber && topicId ? `/${domainPaths[domainNumber]}/${topicId}` : '/'
  
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": selectedTopic.title,
    "description": `Learn about ${selectedTopic.title} for CPACC certification. Comprehensive study guide with examples and practice questions.`,
    "educationalLevel": "Professional Certification",
    "about": {
      "@type": "Thing",
      "name": "CPACC Certification",
      "description": "Certified Professional in Accessibility Core Competencies"
    },
    "isPartOf": {
      "@type": "Course",
      "name": domainTitle,
      "provider": {
        "@type": "Organization",
        "name": "CPACC Mastery",
        "url": "https://cpacc-mastery.pages.dev"
      }
    },
    "inLanguage": "en",
    "learningResourceType": "Study Guide"
  }
  
  // Breadcrumb structured data
  const breadcrumbSchema = domainNumber && domainPath ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://cpacc-mastery.pages.dev/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": domainTitles[domainNumber],
        "item": `https://cpacc-mastery.pages.dev${domainPath}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": selectedTopic.title,
        "item": `https://cpacc-mastery.pages.dev${canonicalPath}`
      }
    ]
  } : null

  return (
    <>
      <SEO 
        title={`${selectedTopic.title} - ${domainTitle}`}
        description={`Learn about ${selectedTopic.title} for CPACC certification. Comprehensive study guide with examples and practice questions covering accessibility fundamentals.`}
        canonical={canonicalPath}
      />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      <main className="flex-1 bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* Breadcrumb with Dropdown Navigation */}
      {domainNumber && domainPath && (
        <BreadcrumbDropdown
          domainNumber={domainNumber}
          domainTitle={domainTitles[domainNumber]}
          domainPath={domainPath}
          topics={domainTopics}
          currentTopicId={topicId}
          showCurrentTopicText={true}
        />
      )}

      {/* Sentinel element for scroll detection */}
      <div ref={sentinelRef} className="h-0" aria-hidden="true" />

      {/* Sticky Header - combines back button, title, and test CTA */}
      <div 
        ref={headerRef}
        className={`sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 ${isHeaderMinimized ? 'shadow-md' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className={`flex items-center justify-between gap-6 ${isHeaderMinimized ? 'py-4' : 'py-6'}`}>
            {/* Left: Back button + Title */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {domainNumber && domainPath && (
                <Tooltip content="Back">
                  <button
                    onClick={() => {
                      // Smart back: use history if available, fallback to domain page
                      if (location.key !== 'default') {
                        navigate(-1)
                      } else {
                        navigate(`/${domainPath}`)
                      }
                    }}
                    className="flex-shrink-0 p-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600 rounded-lg transition-colors"
                    aria-label="Back"
                  >
                    <Icon name="arrow-left" customSize={20} />
                  </button>
                </Tooltip>
              )}
              <h1 className={`font-bold text-gray-900 dark:text-gray-100 line-clamp-2 ${isHeaderMinimized ? 'text-lg' : 'text-xl md:text-3xl'}`}>
                {selectedTopic.title}
              </h1>
            </div>
            
            {/* Right: Test CTA - Desktop only */}
            <div className="hidden md:flex items-center">
              {/* Test CTA button */}
              <button
                onClick={handleTestClick}
                className={`flex-shrink-0 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 font-medium whitespace-nowrap inline-flex items-center gap-2 ${isHeaderMinimized ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-base'}`}
                aria-label="Test your knowledge"
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
            title={selectedTopic.title}
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
              className="w-full md:w-auto flex-shrink-0 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-all font-medium whitespace-nowrap flex items-center justify-center px-6 py-3 text-base"
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
            nextDomainInfo={nextDomainInfo ? {
              domainTitle: nextDomainInfo.domainTitle,
              domainNumber: nextDomainInfo.domainNumber
            } : undefined}
            previousDomainInfo={previousDomainInfo ? {
              domainTitle: previousDomainInfo.domainTitle,
              domainNumber: previousDomainInfo.domainNumber
            } : undefined}
            showPracticeOption={isLastTopicOfDomain3}
          />
        )}
          </div>
          
          {/* Right Sidebar - Table of Contents only */}
          <aside className="hidden xl:block w-80 flex-shrink-0">
            {/* Table of Contents - sticky positioned */}
            {tocItems.length > 0 && (
              <div className={`sticky ${isHeaderMinimized ? 'top-28' : 'top-32'}`}>
                <TableOfContents items={tocItems} />
              </div>
            )}
          </aside>
        </div>
      </div>

    </main>
    </>
  )
}
