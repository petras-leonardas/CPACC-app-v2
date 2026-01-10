import { useEffect } from 'react'
import { TestView } from '../components/TestView'
import { SEO } from '../components/SEO'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { cpacc_topics, allTopicsOverview } from '../data/topics'
import type { Topic } from '../data/topics'
import { usePageTracking } from '../hooks/usePageTracking'
import { trackEvent } from '../utils/analytics'

interface TestPageProps {
  onNavigationAttempt: (interceptor: (callback: () => void) => void) => void
  onClearInterceptor: () => void
}

export function TestPage({ onNavigationAttempt, onClearInterceptor }: TestPageProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { topicId } = useParams<{ topicId: string }>()
  
  // Check if this is a mock exam, quick test, super quick test, or topic quick test
  const isMockExam = topicId === 'mock-exam'
  const isQuickTest = topicId === 'quick-test'
  const isSuperQuickTest = topicId === 'super-quick-test'
  // Check if URL contains 'topic-quick' pattern (e.g., /test/topic-quick/theoretical-models)
  const isTopicQuickTest = location.pathname.includes('/topic-quick/')
  // Check if URL contains 'domain-quick' pattern (e.g., /test/domain-quick/domain-1-all)
  const isDomainQuickTest = location.pathname.includes('/domain-quick/')
  // Check if this is a domain comprehensive test (pattern: /test/domain-X-all without domain-quick)
  const isDomainComprehensiveTest = topicId?.includes('domain-') && topicId?.includes('-all') && !isDomainQuickTest
  // Extract domain number from pattern like "domain-1-all"
  const domainNumber = (topicId?.includes('domain-') && topicId?.includes('-all')) ? topicId?.match(/domain-(\d+)-all/)?.[1] || '1' : '1'
  // Extract actual topic ID if it's a topic-quick test
  const actualTopicId = isTopicQuickTest ? topicId : topicId
  
  // Get the origin route from location state, fallback to practice test page
  const originRoute = (location.state as { from?: string })?.from || '/cpacc-practice-test'
  
  // Track page view with test type
  usePageTracking('Test')
  
  // Track test started event
  useEffect(() => {
    const testType = isMockExam ? 'Mock Exam' : isQuickTest ? 'Quick Test' : isSuperQuickTest ? 'Super Quick Test' : isTopicQuickTest ? 'Topic Quick Test' : isDomainQuickTest ? 'Domain Quick Test' : isDomainComprehensiveTest ? 'Domain Comprehensive Test' : 'Topic Test'
    
    trackEvent('Test Started', {
      testType,
      topicId: actualTopicId || 'all-topics',
    })
  }, [isMockExam, isQuickTest, isSuperQuickTest, isTopicQuickTest, isDomainQuickTest, isDomainComprehensiveTest, actualTopicId])
  
  // Clear interceptor when component unmounts
  useEffect(() => {
    return () => {
      onClearInterceptor()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const getSelectedTopic = (): Topic => {
    if (!topicId || topicId === 'all-topics') {
      return allTopicsOverview
    }

    for (const domain of cpacc_topics) {
      const topic = domain.topics.find((t) => t.id === topicId)
      if (topic) return topic
    }

    return allTopicsOverview // fallback
  }

  const selectedTopic = getSelectedTopic()

  const handleBack = () => {
    console.log('TestPage handleBack called, navigating to:', originRoute)
    navigate(originRoute)
  }

  return (
    <>
      <SEO 
        title="CPACC Practice Test"
        description="Test your CPACC knowledge with interactive practice questions"
        noindex={true}
      />
      <TestView
      topicId={actualTopicId || 'all-topics'}
      topicTitle={isMockExam || isQuickTest || isSuperQuickTest || isTopicQuickTest || isDomainQuickTest || isDomainComprehensiveTest ? 'Practice' : selectedTopic.title}
      onBack={handleBack}
      onNavigationAttempt={onNavigationAttempt}
      isMockExam={isMockExam}
      isQuickTest={isQuickTest}
      isSuperQuickTest={isSuperQuickTest}
      isTopicQuickTest={isTopicQuickTest}
      isDomainQuickTest={isDomainQuickTest}
      isDomainComprehensiveTest={isDomainComprehensiveTest}
      domainNumber={domainNumber}
    />
    </>
  )
}
