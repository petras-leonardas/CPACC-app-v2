import { useState, useEffect } from 'react'
import { Outlet, useParams, useLocation } from 'react-router-dom'
import { TestProvider } from '../contexts/TestContext'
import type { TestType } from '../contexts/TestContext'
import { TestExitModal } from './Test/TestExitModal'
import { useTest } from '../contexts/TestContext'
import { SEO } from './SEO'
import { trackEvent } from '../utils/analytics'

interface TestLayoutProps {
  onNavigationAttempt: (interceptor: (callback: () => void) => void) => void
  onClearInterceptor: () => void
}

/**
 * Parent route component for all test screens.
 * Provides TestContext to child routes and renders the exit modal overlay.
 *
 * Route structure:
 *   /test/.../:topicId          → TestLayout (this component)
 *     index                      → TestQuestionScreen
 *     /review                    → TestReviewScreen
 *     /results                   → TestResultsScreen
 */
export function TestLayout({ onNavigationAttempt, onClearInterceptor }: TestLayoutProps) {
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

  // Capture origin route once on mount (location.state is lost on nested navigations)
  const [originRoute] = useState(
    () => (location.state as { from?: string })?.from || '/cpacc-practice-test'
  )

  // Track test started event (once per test session)
  useEffect(() => {
    trackEvent('Test Started', {
      testType,
      topicId: topicId || 'all-topics',
    })
  }, [testType, topicId])

  // Clear navigation interceptor on unmount
  useEffect(() => {
    return () => onClearInterceptor()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <SEO
        title="CPACC Practice Test"
        description="Test your CPACC knowledge with interactive practice questions"
        noindex={true}
      />
      <TestProvider
        topicId={topicId || 'all-topics'}
        testType={testType}
        domainNumber={domainNumber}
        originRoute={originRoute}
        onNavigationAttempt={onNavigationAttempt}
      >
        <Outlet />
        <TestExitModalContainer />
      </TestProvider>
    </>
  )
}

/**
 * Reads exit modal state from TestContext and renders the modal.
 * Must be inside <TestProvider>.
 */
function TestExitModalContainer() {
  const { showExitModal, handleCancelExit, handleConfirmExit } = useTest()

  return (
    <TestExitModal
      isOpen={showExitModal}
      onCancel={handleCancelExit}
      onConfirm={handleConfirmExit}
      hasUnsavedProgress={true}
    />
  )
}
