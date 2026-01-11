import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Layout } from './components/Layout'
import { WelcomePage } from './pages/WelcomePage'
import { MockExamPage } from './pages/MockExamPage'
import { Domain1Page } from './pages/Domain1Page'
import { Domain2Page } from './pages/Domain2Page'
import { Domain3Page } from './pages/Domain3Page'
import { TopicDetailPage } from './pages/TopicDetailPage'
import { TestPage } from './pages/TestPage'
import { FlashcardsPage } from './pages/FlashcardsPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { TermsPage } from './pages/TermsPage'
import { AccessibilityPage } from './pages/AccessibilityPage'
import { MOCK_QUESTION_COUNTS } from './data/mockQuestions'
import { CookieConsent } from './components/CookieConsent'
import { initializeAmplitude, getConsent } from './utils/analytics'
import { setupErrorTracking } from './utils/analyticsHelpers'

function App() {
  const [questionCounts, setQuestionCounts] = useState<Record<string, number>>({})
  // Navigation interceptor for test mode
  const [navigationInterceptor, setNavigationInterceptor] = useState<((callback: () => void) => void) | null>(null)

  // Initialize analytics if user has already consented
  useEffect(() => {
    if (getConsent()) {
      initializeAmplitude()
    }
    // Setup global error tracking
    setupErrorTracking()
  }, [])

  // Fetch question counts on mount
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch('/api/question-counts')
        const data = await response.json()
        if (data.success) {
          setQuestionCounts(data.counts)
        }
      } catch {
        console.log('API unavailable, using mock question counts for development')
        setQuestionCounts(MOCK_QUESTION_COUNTS)
      }
    }
    fetchCounts()
  }, [])

  return (
    <HelmetProvider>
      <BrowserRouter>
      <CookieConsent />
      <Routes>
        <Route path="/" element={<Layout questionCounts={questionCounts} navigationInterceptor={navigationInterceptor} />}>
          {/* Home page */}
          <Route index element={<WelcomePage />} />
          
          {/* Practice hub */}
          <Route path="cpacc-practice-test" element={<MockExamPage />} />
          
          {/* Domain routes - SEO optimized URLs */}
          <Route path="disabilities-challenges-assistive-technology" element={<Domain1Page />} />
          <Route path="disabilities-challenges-assistive-technology/:topicId" element={<TopicDetailPage domainNumber={1} />} />
          <Route path="accessibility-universal-design" element={<Domain2Page />} />
          <Route path="accessibility-universal-design/:topicId" element={<TopicDetailPage domainNumber={2} />} />
          <Route path="standards-laws-management-strategies" element={<Domain3Page />} />
          <Route path="standards-laws-management-strategies/:topicId" element={<TopicDetailPage domainNumber={3} />} />
          
          {/* Legacy domain routes - redirect to new URLs */}
          <Route path="domain-1" element={<Navigate to="/disabilities-challenges-assistive-technology" replace />} />
          <Route path="domain-1/:topicId" element={<Navigate to="/disabilities-challenges-assistive-technology/:topicId" replace />} />
          <Route path="domain-2" element={<Navigate to="/accessibility-universal-design" replace />} />
          <Route path="domain-2/:topicId" element={<Navigate to="/accessibility-universal-design/:topicId" replace />} />
          <Route path="accessible-information-communication" element={<Navigate to="/accessibility-universal-design" replace />} />
          <Route path="accessible-information-communication/:topicId" element={<Navigate to="/accessibility-universal-design/:topicId" replace />} />
          <Route path="domain-3" element={<Navigate to="/standards-laws-management-strategies" replace />} />
          <Route path="domain-3/:topicId" element={<Navigate to="/standards-laws-management-strategies/:topicId" replace />} />
          <Route path="assistive-products-services" element={<Navigate to="/standards-laws-management-strategies" replace />} />
          <Route path="assistive-products-services/:topicId" element={<Navigate to="/standards-laws-management-strategies/:topicId" replace />} />
          <Route path="mock-exam" element={<Navigate to="/cpacc-practice-test" replace />} />
          
          {/* Legacy topic ID redirects - Domain 1 */}
          <Route path="disabilities-challenges-assistive-technology/theoretical-models" element={<Navigate to="/disabilities-challenges-assistive-technology/1a-theoretical-models" replace />} />
          <Route path="disabilities-challenges-assistive-technology/categories-characteristics" element={<Navigate to="/disabilities-challenges-assistive-technology/1b-categories-characteristics" replace />} />
          <Route path="disabilities-challenges-assistive-technology/assistive-technologies" element={<Navigate to="/disabilities-challenges-assistive-technology/1c-assistive-technologies" replace />} />
          <Route path="disabilities-challenges-assistive-technology/demographics-statistics" element={<Navigate to="/disabilities-challenges-assistive-technology/1d-demographics-statistics" replace />} />
          <Route path="disabilities-challenges-assistive-technology/disability-etiquette" element={<Navigate to="/disabilities-challenges-assistive-technology/1e-disability-etiquette" replace />} />
          
          {/* Legacy topic ID redirects - Domain 2 */}
          <Route path="accessibility-universal-design/accommodations-universal-design" element={<Navigate to="/accessibility-universal-design/2a-accommodations-universal-design" replace />} />
          <Route path="accessibility-universal-design/benefits-accessibility" element={<Navigate to="/accessibility-universal-design/2b-benefits-accessibility" replace />} />
          <Route path="accessibility-universal-design/wcag-principles" element={<Navigate to="/accessibility-universal-design/2c-wcag-principles" replace />} />
          <Route path="accessibility-universal-design/built-environment" element={<Navigate to="/accessibility-universal-design/2d-built-environment" replace />} />
          <Route path="accessibility-universal-design/universal-design-principles" element={<Navigate to="/accessibility-universal-design/2e-universal-design-principles" replace />} />
          <Route path="accessibility-universal-design/udl-ux" element={<Navigate to="/accessibility-universal-design/2f-udl-ux" replace />} />
          
          {/* Legacy topic ID redirects - Domain 3 */}
          <Route path="standards-laws-management-strategies/international-conventions" element={<Navigate to="/standards-laws-management-strategies/3a-international-conventions" replace />} />
          <Route path="standards-laws-management-strategies/regional-instruments" element={<Navigate to="/standards-laws-management-strategies/3b-regional-instruments" replace />} />
          <Route path="standards-laws-management-strategies/national-provincial" element={<Navigate to="/standards-laws-management-strategies/3c-national-provincial" replace />} />
          <Route path="standards-laws-management-strategies/procurement-laws" element={<Navigate to="/standards-laws-management-strategies/3d-procurement-laws" replace />} />
          <Route path="standards-laws-management-strategies/ict-standards" element={<Navigate to="/standards-laws-management-strategies/3e-ict-standards" replace />} />
          <Route path="standards-laws-management-strategies/integrating-ict" element={<Navigate to="/standards-laws-management-strategies/3f-integrating-ict" replace />} />
          
          {/* Legacy topic routes - redirect to mock exam */}
          <Route path="topics" element={<Navigate to="/mock-exam" replace />} />
          <Route path="topics/:topicId" element={<Navigate to="/mock-exam" replace />} />
          
          {/* Test routes */}
          <Route path="test/topic-quick/:topicId" element={
            <TestPage 
              onNavigationAttempt={(interceptor) => setNavigationInterceptor(() => interceptor)}
              onClearInterceptor={() => setNavigationInterceptor(null)}
            />
          } />
          <Route path="test/domain-quick/:topicId" element={
            <TestPage 
              onNavigationAttempt={(interceptor) => setNavigationInterceptor(() => interceptor)}
              onClearInterceptor={() => setNavigationInterceptor(null)}
            />
          } />
          <Route path="test/:topicId" element={
            <TestPage 
              onNavigationAttempt={(interceptor) => setNavigationInterceptor(() => interceptor)}
              onClearInterceptor={() => setNavigationInterceptor(null)}
            />
          } />
          
          {/* Flashcards routes */}
          <Route path="flashcards/:topicId" element={<FlashcardsPage />} />
          
          {/* Legal pages */}
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="accessibility" element={<AccessibilityPage />} />
          
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/cpacc-practice-test" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
