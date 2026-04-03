import { useEffect } from 'react'
import { TestView } from '../components/TestView'
import type { TestType } from '../components/TestView'
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

  // Derive test type from URL pattern
  const testType: TestType = (() => {
    if (topicId === 'mock-exam') return 'mock-exam'
    if (topicId === 'quick-test') return 'quick-test'
    if (topicId === 'super-quick-test') return 'super-quick-test'
    if (location.pathname.includes('/topic-quick/')) return 'topic-quick'
    if (location.pathname.includes('/domain-quick/')) return 'domain-quick'
    if (topicId?.includes('domain-') && topicId?.includes('-all')) return 'domain-comprehensive'
    return 'topic-test'
  })()

  // Extract domain number from pattern like "domain-1-all"
  const domainNumber = topicId?.match(/domain-(\d+)-all/)?.[1] || '1'

  // Get the origin route from location state, fallback to practice test page
  const originRoute = (location.state as { from?: string })?.from || '/cpacc-practice-test'
  
  // Track page view with test type
  usePageTracking('Test')
  
  // Track test started event
  useEffect(() => {
    trackEvent('Test Started', {
      testType,
      topicId: topicId || 'all-topics',
    })
  }, [testType, topicId])
  
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

    return allTopicsOverview
  }

  const selectedTopic = getSelectedTopic()
  const isSpecialTest = testType !== 'topic-test'

  const handleBack = () => {
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
        topicId={topicId || 'all-topics'}
        topicTitle={isSpecialTest ? 'Practice' : selectedTopic.title}
        onBack={handleBack}
        onNavigationAttempt={onNavigationAttempt}
        testType={testType}
        domainNumber={domainNumber}
      />
    </>
  )
}
