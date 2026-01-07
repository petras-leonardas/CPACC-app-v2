import { useEffect } from 'react'
import { TestView } from '../components/TestView'
import { SEO } from '../components/SEO'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { cpacc_topics, allTopicsOverview } from '../data/topics'
import type { Topic } from '../data/topics'

interface TestPageProps {
  onNavigationAttempt: (interceptor: (callback: () => void) => void) => void
  onClearInterceptor: () => void
}

export function TestPage({ onNavigationAttempt, onClearInterceptor }: TestPageProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { topicId } = useParams<{ topicId: string }>()
  
  // Check if this is a mock exam, quick test, or super quick test
  const isMockExam = topicId === 'mock-exam'
  const isQuickTest = topicId === 'quick-test'
  const isSuperQuickTest = topicId === 'super-quick-test'
  
  // Get the origin route from location state, fallback to practice test page
  const originRoute = (location.state as { from?: string })?.from || '/cpacc-practice-test'
  
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
      topicId={topicId || 'all-topics'}
      topicTitle={isMockExam || isQuickTest || isSuperQuickTest ? 'Practice' : selectedTopic.title}
      onBack={handleBack}
      onNavigationAttempt={onNavigationAttempt}
      isMockExam={isMockExam}
      isQuickTest={isQuickTest}
      isSuperQuickTest={isSuperQuickTest}
    />
    </>
  )
}
