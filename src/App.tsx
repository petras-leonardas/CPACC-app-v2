import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout questionCounts={questionCounts} navigationInterceptor={navigationInterceptor} />}>
          {/* Home page */}
          <Route index element={<WelcomePage />} />
          
          {/* Mock exam route */}
          <Route path="mock-exam" element={<MockExamPage />} />
          
          {/* Domain routes */}
          <Route path="domain-1" element={<Domain1Page />} />
          <Route path="domain-1/:topicId" element={<TopicDetailPage questionCounts={questionCounts} domainNumber={1} />} />
          <Route path="domain-2" element={<Domain2Page />} />
          <Route path="domain-2/:topicId" element={<TopicDetailPage questionCounts={questionCounts} domainNumber={2} />} />
          <Route path="domain-3" element={<Domain3Page />} />
          <Route path="domain-3/:topicId" element={<TopicDetailPage questionCounts={questionCounts} domainNumber={3} />} />
          
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
          <Route path="*" element={<Navigate to="/mock-exam" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
