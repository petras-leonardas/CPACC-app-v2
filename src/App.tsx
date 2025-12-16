import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { WelcomePage } from './pages/WelcomePage'
import { AllTopicsPage } from './pages/AllTopicsPage'
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
          
          {/* Topic routes */}
          <Route path="topics" element={<Navigate to="/topics/all-topics" replace />} />
          <Route path="topics/all-topics" element={<AllTopicsPage />} />
          <Route path="topics/:topicId" element={<TopicDetailPage questionCounts={questionCounts} />} />
          
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
          <Route path="*" element={<Navigate to="/topics/all-topics" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
