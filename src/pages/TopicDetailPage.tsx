import { TopicContent } from '../components/TopicContent'
import { TableOfContents } from '../components/TableOfContents'
import { TextToSpeech } from '../components/TextToSpeech'
import { TopicNavigationSection } from '../components/Topic/TopicNavigationSection'
import { SEO } from '../components/SEO'
import { BreadcrumbDropdown } from '../components/BreadcrumbDropdown'
import { Container, SkipLink, Grid } from '../design-system'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { cpacc_topics, allTopicsOverview } from '../data/topics'
import { topicDetailedContent } from '../data/topicContent/index'
import type { Topic } from '../data/topics'
import { trackEvent } from '../utils/analytics'
import { DOMAIN_TITLES, DOMAIN_PATHS } from '../config/domainConfig'
import { generateTopicStructuredData, generateBreadcrumbStructuredData } from '../utils/seoStructuredData'
import { TopicStickyHeader } from '../components/Topic/TopicStickyHeader'
import { TopicBottomCTA } from '../components/Topic/TopicBottomCTA'
import { useTopicAnalytics } from '../hooks/useTopicAnalytics'

interface TopicDetailPageProps {
  domainNumber?: number
}

export function TopicDetailPage({ domainNumber }: TopicDetailPageProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { topicId } = useParams<{ topicId?: string }>()
  
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
  
  // Analytics tracking
  useTopicAnalytics({
    topicId,
    topicTitle: selectedTopic.title,
    domainNumber
  })
  
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
      domainPath: DOMAIN_PATHS[nextDomainNumber],
      domainTitle: DOMAIN_TITLES[nextDomainNumber]
    }
  }

  const nextDomainInfo = getNextDomainInfo()
  
  // Get previous domain info for cross-domain backward navigation
  const getPreviousDomainInfo = () => {
    if (!domainNumber || domainNumber <= 1) return null
    const previousDomainNumber = domainNumber - 1
    return {
      domainNumber: previousDomainNumber,
      domainPath: DOMAIN_PATHS[previousDomainNumber],
      domainTitle: DOMAIN_TITLES[previousDomainNumber]
    }
  }

  const previousDomainInfo = getPreviousDomainInfo()
  
  // Check if we're on the last topic of Domain 3
  const isLastTopicOfDomain3 = domainNumber === 3 && currentTopicIndex === domainTopics.length - 1

  // Generate TOC items from detailed content sections
  const tocItems = detailedContent ? [
    { id: 'overview', title: 'Overview' },
    ...detailedContent.sections.map(section => ({
      id: section.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      title: section.heading
    }))
  ] : []

  const handleTestClick = (location: string) => {
    trackEvent('Topic Test Button Clicked', {
      topicId: topicId || 'all-topics',
      topicTitle: selectedTopic.title,
      location,
      domainNumber: domainNumber || 0,
    })
    
    const fromPath = domainNumber ? `/${DOMAIN_PATHS[domainNumber]}/${topicId}` : `/topics/${topicId || 'all-topics'}`
    navigate(`/test/topic-quick/${topicId || 'all-topics'}`, { 
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
    trackEvent('Topic Navigation Clicked', {
      direction: 'previous',
      currentTopicId: topicId || 'unknown',
      currentTopicTitle: selectedTopic.title,
      domainNumber: domainNumber || 0,
    })
    
    if (currentTopicIndex > 0 && domainNumber) {
      const previousTopic = domainTopics[currentTopicIndex - 1]
      const domainPath = DOMAIN_PATHS[domainNumber]
      navigate(`/${domainPath}/${previousTopic.id}`)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (previousDomainInfo) {
      // Navigate to previous domain overview page
      navigate(`/${previousDomainInfo.domainPath}`)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNavigateToNextTopic = () => {
    trackEvent('Topic Navigation Clicked', {
      direction: 'next',
      currentTopicId: topicId || 'unknown',
      currentTopicTitle: selectedTopic.title,
      domainNumber: domainNumber || 0,
      isLastTopic: isLastTopicOfDomain3,
    })
    
    if (currentTopicIndex < domainTopics.length - 1 && domainNumber) {
      const nextTopic = domainTopics[currentTopicIndex + 1]
      const domainPath = DOMAIN_PATHS[domainNumber]
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
  
  const domainPath = domainNumber ? DOMAIN_PATHS[domainNumber] : null
  const domainTitle = domainNumber ? DOMAIN_TITLES[domainNumber] : ''
  const canonicalPath = domainNumber && topicId ? `/${DOMAIN_PATHS[domainNumber]}/${topicId}` : '/'
  
  // Structured data for SEO
  const structuredData = generateTopicStructuredData({
    topicTitle: selectedTopic.title,
    domainTitle: domainTitle
  })
  
  // Breadcrumb structured data
  const breadcrumbSchema = domainNumber && domainPath ? generateBreadcrumbStructuredData({
    domainTitle: DOMAIN_TITLES[domainNumber],
    domainPath,
    topicTitle: selectedTopic.title,
    canonicalPath
  }) : null

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
      <main className="flex-1 min-h-screen">
        {/* Skip Link to Table of Contents */}
        <SkipLink href="#table-of-contents">
          Skip to table of contents
        </SkipLink>
        
        {/* Combined Sticky Navigation Container */}
        {domainNumber && domainPath && (
          <div 
            className={`sticky top-0 z-40 bg-white dark:bg-gray-900 transition-shadow duration-300 ${isHeaderMinimized ? 'shadow-md' : ''}`}
            aria-label="Topic navigation"
            ref={headerRef}
          >
            {/* Breadcrumb with Dropdown Navigation */}
            <BreadcrumbDropdown
              domainNumber={domainNumber}
              domainTitle={DOMAIN_TITLES[domainNumber]}
              domainPath={domainPath}
              topics={domainTopics}
              currentTopicId={topicId}
              showCurrentTopicText={true}
            />

            {/* Sticky Header - back button, title, and test CTA */}
            <TopicStickyHeader
              isMinimized={isHeaderMinimized}
              topicTitle={selectedTopic.title}
              onBackClick={() => {
                trackEvent('Topic Back Button Clicked', {
                  topicId: topicId || 'unknown',
                  topicTitle: selectedTopic.title,
                  domainNumber: domainNumber || 0,
                })
                
                // Smart back: use history if available, fallback to domain page
                if (location.key !== 'default') {
                  navigate(-1)
                } else {
                  navigate(`/${domainPath}`)
                }
              }}
              onTestClick={() => handleTestClick('sticky-header')}
            />

            {/* Text-to-Speech Player - appears in sticky area when active */}
            {detailedContent && (ttsState.isPlaying || ttsState.isPaused) && (
              <TextToSpeech 
                content={detailedContent}
                title={selectedTopic.title}
                onStateChange={setTtsState}
                isInStickyContainer={true}
              />
            )}
          </div>
        )}

      {/* Sentinel element for scroll detection */}
      <div ref={sentinelRef} className="h-0" aria-hidden="true" />

      <Container size="xl" padding="md" className="py-6 md:py-8">
        <Grid cols={12} gap="lg">
          <div className="col-span-12 xl:col-span-9">
            {/* Text-to-Speech Player - normal position when not playing */}
            {detailedContent && !ttsState.isPlaying && !ttsState.isPaused && (
              <TextToSpeech 
                content={detailedContent}
                title={selectedTopic.title}
                onStateChange={setTtsState}
                isInStickyContainer={false}
              />
            )}
            
            <div className="mt-6">
              <TopicContent
                topic={selectedTopic}
                currentReadingIndex={ttsState.currentIndex}
              />
            </div>
            
            {/* Bottom CTA Card - permanent at end of content */}
            <div ref={bottomCtaRef}>
              <TopicBottomCTA onTestClick={() => handleTestClick('bottom-cta')} />
            </div>

            {/* Topic Navigation - only show when viewing a domain topic */}
            {domainNumber && domainTopics.length > 0 && currentTopicIndex !== -1 && (
              <TopicNavigationSection
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
          <aside className="hidden xl:block xl:col-span-3">
            {/* Table of Contents - sticky positioned */}
            {tocItems.length > 0 && (
              <div 
                id="table-of-contents" 
                className={`sticky ${
                  (ttsState.isPlaying || ttsState.isPaused) 
                    ? (isHeaderMinimized ? 'top-44' : 'top-52') 
                    : (isHeaderMinimized ? 'top-24' : 'top-32')
                }`}
                tabIndex={-1}
              >
                <TableOfContents items={tocItems} topicId={topicId} />
              </div>
            )}
          </aside>
        </Grid>
      </Container>

    </main>
    </>
  )
}
