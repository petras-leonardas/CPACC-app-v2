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
import { MOCK_QUESTION_COUNTS } from './data/mockQuestions'

function App() {
  const [questionCounts, setQuestionCounts] = useState<Record<string, number>>({})
  // Navigation interceptor for test mode
  const [navigationInterceptor, setNavigationInterceptor] = useState<((callback: () => void) => void) | null>(null)

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
      <Routes>
        <Route path="/" element={<Layout questionCounts={questionCounts} navigationInterceptor={navigationInterceptor} />}>
          {/* Home page */}
          <Route index element={<WelcomePage />} />
          
          {/* Practice hub */}
          <Route path="cpacc-practice-test" element={<MockExamPage />} />
          
          {/* Domain routes - SEO optimized URLs */}
          <Route path="disabilities-challenges-assistive-technology" element={<Domain1Page />} />
          <Route path="disabilities-challenges-assistive-technology/:topicId" element={<TopicDetailPage domainNumber={1} />} />
          <Route path="accessible-information-communication" element={<Domain2Page />} />
          <Route path="accessible-information-communication/:topicId" element={<TopicDetailPage domainNumber={2} />} />
          <Route path="assistive-products-services" element={<Domain3Page />} />
          <Route path="assistive-products-services/:topicId" element={<TopicDetailPage domainNumber={3} />} />
          
          {/* Legacy domain routes - redirect to new URLs */}
          <Route path="domain-1" element={<Navigate to="/disabilities-challenges-assistive-technology" replace />} />
          <Route path="domain-1/:topicId" element={<Navigate to="/disabilities-challenges-assistive-technology/:topicId" replace />} />
          <Route path="domain-2" element={<Navigate to="/accessible-information-communication" replace />} />
          <Route path="domain-2/:topicId" element={<Navigate to="/accessible-information-communication/:topicId" replace />} />
          <Route path="domain-3" element={<Navigate to="/assistive-products-services" replace />} />
          <Route path="domain-3/:topicId" element={<Navigate to="/assistive-products-services/:topicId" replace />} />
          <Route path="mock-exam" element={<Navigate to="/cpacc-practice-test" replace />} />
          
          {/* Legacy topic routes - redirect to mock exam */}
          <Route path="topics" element={<Navigate to="/mock-exam" replace />} />
          <Route path="topics/:topicId" element={<Navigate to="/mock-exam" replace />} />
          
          {/* Test routes */}
          <Route path="test/:topicId" element={
            <TestPage 
              onNavigationAttempt={(interceptor) => setNavigationInterceptor(() => interceptor)}
              onClearInterceptor={() => setNavigationInterceptor(null)}
            />
          } />
          
          {/* Flashcards routes */}
          <Route path="flashcards/:topicId" element={<FlashcardsPage />} />
          
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/cpacc-practice-test" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
