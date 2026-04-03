import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Layout } from './components/Layout'
import { CookieConsent } from './components/CookieConsent'
import { ErrorBoundary } from './components/ErrorBoundary'
import { SkipLink, ToastProvider } from './design-system'
import { initializeAmplitude, getConsent } from './utils/analytics'
import { setupErrorTracking } from './utils/analyticsHelpers'
import { ScrollContainerProvider } from './contexts/ScrollContainerContext'

// ---------------------------------------------------------------------------
// Lazy-loaded page components -- each becomes its own chunk so the browser
// only downloads code for the page the user is actually visiting.
// ---------------------------------------------------------------------------
const WelcomePage = lazy(() => import('./pages/WelcomePage').then(m => ({ default: m.WelcomePage })))
const MockExamPage = lazy(() => import('./pages/MockExamPage').then(m => ({ default: m.MockExamPage })))
const DomainPage = lazy(() => import('./pages/DomainPage').then(m => ({ default: m.DomainPage })))
const TopicDetailPage = lazy(() => import('./pages/TopicDetailPage').then(m => ({ default: m.TopicDetailPage })))
const TestLayout = lazy(() => import('./components/TestLayout').then(m => ({ default: m.TestLayout })))
const TestQuestionScreen = lazy(() => import('./components/Test/TestQuestionScreen').then(m => ({ default: m.TestQuestionScreen })))
const TestReviewScreen = lazy(() => import('./components/Test/TestReviewScreen').then(m => ({ default: m.TestReviewScreen })))
const TestResultsScreen = lazy(() => import('./components/Test/TestResultsScreen').then(m => ({ default: m.TestResultsScreen })))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })))
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })))
const AccessibilityPage = lazy(() => import('./pages/AccessibilityPage').then(m => ({ default: m.AccessibilityPage })))
const AboutCreatorPage = lazy(() => import('./pages/AboutCreatorPage').then(m => ({ default: m.AboutCreatorPage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })))

// ---------------------------------------------------------------------------
// Lightweight loading fallback -- intentionally minimal to avoid layout shift.
// Uses a CSS animation for the pulse so it works before the full CSS loads.
// ---------------------------------------------------------------------------
function PageLoader() {
  return (
    <div className="flex items-center justify-center py-24" role="status" aria-label="Loading page">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-600 dark:border-gray-600 dark:border-t-gray-300" />
    </div>
  )
}

/** Redirect helper that forwards the :topicId route param into the target path. */
function RedirectWithTopic({ basePath }: { basePath: string }) {
  const { topicId } = useParams<{ topicId: string }>()
  return <Navigate to={`${basePath}/${topicId}`} replace />
}

function App() {
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


  return (
    <ErrorBoundary>
    <HelmetProvider>
      <ScrollContainerProvider>
      <ToastProvider>
        <BrowserRouter>
        <SkipLink href="#main-content">Skip to main content</SkipLink>
        <CookieConsent />
        <Suspense fallback={<PageLoader />}>
        <Routes>
        <Route path="/" element={<Layout navigationInterceptor={navigationInterceptor} />}>
          {/* Home page */}
          <Route index element={<WelcomePage />} />
          
          {/* Practice hub */}
          <Route path="cpacc-practice-test" element={<MockExamPage />} />
          
          {/* Domain routes - SEO optimized URLs */}
          <Route path="disabilities-challenges-assistive-technology" element={<DomainPage domainNumber={1} />} />
          <Route path="disabilities-challenges-assistive-technology/:topicId" element={<TopicDetailPage domainNumber={1} />} />
          <Route path="accessibility-universal-design" element={<DomainPage domainNumber={2} />} />
          <Route path="accessibility-universal-design/:topicId" element={<TopicDetailPage domainNumber={2} />} />
          <Route path="standards-laws-management-strategies" element={<DomainPage domainNumber={3} />} />
          <Route path="standards-laws-management-strategies/:topicId" element={<TopicDetailPage domainNumber={3} />} />
          
          {/* Legacy domain routes - redirect to new URLs */}
          <Route path="domain-1" element={<Navigate to="/disabilities-challenges-assistive-technology" replace />} />
          <Route path="domain-1/:topicId" element={<RedirectWithTopic basePath="/disabilities-challenges-assistive-technology" />} />
          <Route path="domain-2" element={<Navigate to="/accessibility-universal-design" replace />} />
          <Route path="domain-2/:topicId" element={<RedirectWithTopic basePath="/accessibility-universal-design" />} />
          <Route path="accessible-information-communication" element={<Navigate to="/accessibility-universal-design" replace />} />
          <Route path="accessible-information-communication/:topicId" element={<RedirectWithTopic basePath="/accessibility-universal-design" />} />
          <Route path="domain-3" element={<Navigate to="/standards-laws-management-strategies" replace />} />
          <Route path="domain-3/:topicId" element={<RedirectWithTopic basePath="/standards-laws-management-strategies" />} />
          <Route path="assistive-products-services" element={<Navigate to="/standards-laws-management-strategies" replace />} />
          <Route path="assistive-products-services/:topicId" element={<RedirectWithTopic basePath="/standards-laws-management-strategies" />} />
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
          
          {/* Test routes — nested: layout provides TestContext, child routes render screens */}
          <Route path="test/topic-quick/:topicId" element={
            <TestLayout
              onNavigationAttempt={(interceptor) => setNavigationInterceptor(() => interceptor)}
              onClearInterceptor={() => setNavigationInterceptor(null)}
            />
          }>
            <Route index element={<TestQuestionScreen />} />
            <Route path="review" element={<TestReviewScreen />} />
            <Route path="results" element={<TestResultsScreen />} />
          </Route>
          <Route path="test/domain-quick/:topicId" element={
            <TestLayout
              onNavigationAttempt={(interceptor) => setNavigationInterceptor(() => interceptor)}
              onClearInterceptor={() => setNavigationInterceptor(null)}
            />
          }>
            <Route index element={<TestQuestionScreen />} />
            <Route path="review" element={<TestReviewScreen />} />
            <Route path="results" element={<TestResultsScreen />} />
          </Route>
          <Route path="test/:topicId" element={
            <TestLayout
              onNavigationAttempt={(interceptor) => setNavigationInterceptor(() => interceptor)}
              onClearInterceptor={() => setNavigationInterceptor(null)}
            />
          }>
            <Route index element={<TestQuestionScreen />} />
            <Route path="review" element={<TestReviewScreen />} />
            <Route path="results" element={<TestResultsScreen />} />
          </Route>
          
          {/* About */}
          <Route path="about" element={<AboutCreatorPage />} />

          {/* Legal pages */}
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="accessibility" element={<AccessibilityPage />} />
          
          {/* 404 — show a proper "not found" page instead of silently redirecting */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        </Routes>
        </Suspense>
      </BrowserRouter>
      </ToastProvider>
      </ScrollContainerProvider>
    </HelmetProvider>
    </ErrorBoundary>
  )
}

export default App
