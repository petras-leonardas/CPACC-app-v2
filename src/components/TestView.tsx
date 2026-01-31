import { useState, useEffect, useRef } from 'react'
import type { Question } from '../data/questions'
import { MOCK_QUESTIONS } from '../data/mockQuestions'
import { Tooltip } from './Tooltip'
import { trackEvent } from '../utils/analytics'
import { incrementTestCount, addTestToSession, saveTestScore, getTestHistory } from '../utils/analyticsHelpers'
import { 
  shuffleQuestionOptions,
  selectMockExamQuestions,
  selectQuickTestQuestions,
  selectSuperQuickTestQuestions,
  selectTopicQuickTestQuestions,
  selectDomainQuickTestQuestions,
  selectDomainComprehensiveQuestions
} from '../utils/testQuestionSelection'
import { TestErrorState } from './Test/TestErrorState'
import { TestResultsScreen } from './Test/TestResultsScreen'
import { TestExitModal } from './Test/TestExitModal'
import { TestQuestionCard } from './Test/TestQuestionCard'
import { TestBottomBar } from './Test/TestBottomBar'
import { Heading, Text, Button, Container } from '../design-system'

interface TestViewProps {
  topicId: string
  topicTitle: string
  onBack: () => void
  onNavigationAttempt?: (interceptor: (callback: () => void) => void) => void
  isMockExam?: boolean
  isQuickTest?: boolean
  isSuperQuickTest?: boolean
  isTopicQuickTest?: boolean
  isDomainQuickTest?: boolean
  isDomainComprehensiveTest?: boolean
  domainNumber?: string
}

// Track answer selection with change history
const trackAnswerSelection = (
  optionIndex: number,
  currentQuestionIndex: number,
  answerHistory: Map<number, number[]>,
  setAnswerHistory: (history: Map<number, number[]>) => void,
  setSelectedAnswer: (answer: number | null) => void
) => {
  const history = answerHistory.get(currentQuestionIndex) || []
  const newHistory = new Map(answerHistory).set(currentQuestionIndex, [...history, optionIndex])
  setAnswerHistory(newHistory)
  setSelectedAnswer(optionIndex)
}

export function TestView({ topicId, topicTitle: _topicTitle, onBack, onNavigationAttempt, isMockExam = false, isQuickTest = false, isSuperQuickTest = false, isTopicQuickTest = false, isDomainQuickTest = false, isDomainComprehensiveTest = false, domainNumber = '1' }: TestViewProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [showExitModal, setShowExitModal] = useState(false)
  const [pendingNavigation, setPendingNavigation] = useState<(() => void) | null>(null)
  const [skippedQuestions, setSkippedQuestions] = useState<Set<number>>(new Set())
  const [exitMethod, setExitMethod] = useState<'ui-button' | 'browser-back' | 'sidebar-navigation' | null>(null)
  const [questionQueue, setQuestionQueue] = useState<number[]>([])
  
  // Advanced analytics tracking
  const [answerHistory, setAnswerHistory] = useState<Map<number, number[]>>(new Map())
  const questionStartTimeRef = useRef<number>(Date.now())
  const testStartTimeRef = useRef<number>(Date.now())
  const testCompletionTimeRef = useRef<number>(0)

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true)
        setError(null)
        
        let allQuestions: Question[] = []
        
        if (isMockExam || isQuickTest || isSuperQuickTest || isDomainQuickTest || isDomainComprehensiveTest) {
          // For mock exam, quick test, super quick test, or domain tests, fetch questions from all domains
          const response = await fetch('/api/questions?topicId=all-topics')
          const data = await response.json()
          
          if (!data.success) {
            throw new Error(data.error || 'Failed to fetch questions')
          }
          
          allQuestions = data.questions
        } else {
          // For topic quick test or regular test, fetch questions for specific topic
          const response = await fetch(`/api/questions?topicId=${topicId}`)
          const data = await response.json()
          
          if (!data.success) {
            throw new Error(data.error || 'Failed to fetch questions')
          }
          
          allQuestions = data.questions
        }
        
        // If mock exam, select 80 questions proportionally from domains
        if (isMockExam) {
          const selectedQuestions = selectMockExamQuestions(allQuestions)
          // Shuffle answer options for each question
          const shuffledQuestions = selectedQuestions.map(q => shuffleQuestionOptions(q))
          setQuestions(shuffledQuestions)
          // Initialize question queue
          setQuestionQueue(Array.from({length: shuffledQuestions.length}, (_, i) => i))
        } else if (isQuickTest) {
          // For quick test, select 20 questions proportionally from domains
          const selectedQuestions = selectQuickTestQuestions(allQuestions)
          // Shuffle answer options for each question
          const shuffledQuestions = selectedQuestions.map(q => shuffleQuestionOptions(q))
          setQuestions(shuffledQuestions)
          // Initialize question queue
          setQuestionQueue(Array.from({length: shuffledQuestions.length}, (_, i) => i))
        } else if (isSuperQuickTest) {
          // For super quick test, select 10 questions proportionally from domains
          const selectedQuestions = selectSuperQuickTestQuestions(allQuestions)
          // Shuffle answer options for each question
          const shuffledQuestions = selectedQuestions.map(q => shuffleQuestionOptions(q))
          setQuestions(shuffledQuestions)
          // Initialize question queue
          setQuestionQueue(Array.from({length: shuffledQuestions.length}, (_, i) => i))
        } else if (isTopicQuickTest) {
          // For topic quick test, select 10 random questions from specific topic
          const selectedQuestions = selectTopicQuickTestQuestions(allQuestions, topicId)
          // Shuffle answer options for each question
          const shuffledQuestions = selectedQuestions.map(q => shuffleQuestionOptions(q))
          setQuestions(shuffledQuestions)
          // Initialize question queue
          setQuestionQueue(Array.from({length: shuffledQuestions.length}, (_, i) => i))
        } else if (isDomainQuickTest) {
          // For domain quick test, select 10 random questions from all topics in domain
          const selectedQuestions = selectDomainQuickTestQuestions(allQuestions, domainNumber)
          // Shuffle answer options for each question
          const shuffledQuestions = selectedQuestions.map(q => shuffleQuestionOptions(q))
          setQuestions(shuffledQuestions)
          // Initialize question queue
          setQuestionQueue(Array.from({length: shuffledQuestions.length}, (_, i) => i))
        } else if (isDomainComprehensiveTest) {
          // For domain comprehensive test, select all questions from domain
          const selectedQuestions = selectDomainComprehensiveQuestions(allQuestions, domainNumber)
          // Shuffle answer options for each question
          const shuffledQuestions = selectedQuestions.map(q => shuffleQuestionOptions(q))
          setQuestions(shuffledQuestions)
          // Initialize question queue
          setQuestionQueue(Array.from({length: shuffledQuestions.length}, (_, i) => i))
        } else {
          // Comprehensive test for specific topic - use all fetched questions
          // Shuffle answer options for each question
          const shuffledQuestions = allQuestions.map(q => shuffleQuestionOptions(q))
          setQuestions(shuffledQuestions)
          // Initialize question queue
          setQuestionQueue(Array.from({length: shuffledQuestions.length}, (_, i) => i))
        }
      } catch {
        console.log('API unavailable, using mock questions for development')
        
        if (isMockExam) {
          // For mock exam with fallback, select proportionally from all mock questions
          const selectedQuestions = selectMockExamQuestions(MOCK_QUESTIONS)
          // Shuffle answer options for each question
          const shuffledQuestions = selectedQuestions.map(q => shuffleQuestionOptions(q))
          setQuestions(shuffledQuestions)
          // Initialize question queue
          setQuestionQueue(Array.from({length: shuffledQuestions.length}, (_, i) => i))
        } else if (isQuickTest) {
          // For quick test with fallback, select 20 questions proportionally
          const selectedQuestions = selectQuickTestQuestions(MOCK_QUESTIONS)
          // Shuffle answer options for each question
          const shuffledQuestions = selectedQuestions.map(q => shuffleQuestionOptions(q))
          setQuestions(shuffledQuestions)
          // Initialize question queue
          setQuestionQueue(Array.from({length: shuffledQuestions.length}, (_, i) => i))
        } else if (isSuperQuickTest) {
          // For super quick test with fallback, select 10 questions proportionally
          const selectedQuestions = selectSuperQuickTestQuestions(MOCK_QUESTIONS)
          // Shuffle answer options for each question
          const shuffledQuestions = selectedQuestions.map(q => shuffleQuestionOptions(q))
          setQuestions(shuffledQuestions)
          // Initialize question queue
          setQuestionQueue(Array.from({length: shuffledQuestions.length}, (_, i) => i))
        } else if (isTopicQuickTest) {
          // For topic quick test with fallback, select 10 random questions from specific topic
          const selectedQuestions = selectTopicQuickTestQuestions(MOCK_QUESTIONS, topicId)
          // Shuffle answer options for each question
          const shuffledQuestions = selectedQuestions.map(q => shuffleQuestionOptions(q))
          setQuestions(shuffledQuestions)
          // Initialize question queue
          setQuestionQueue(Array.from({length: shuffledQuestions.length}, (_, i) => i))
        } else if (isDomainQuickTest) {
          // For domain quick test with fallback, select 10 random questions from domain
          const selectedQuestions = selectDomainQuickTestQuestions(MOCK_QUESTIONS, domainNumber)
          // Shuffle answer options for each question
          const shuffledQuestions = selectedQuestions.map(q => shuffleQuestionOptions(q))
          setQuestions(shuffledQuestions)
          // Initialize question queue
          setQuestionQueue(Array.from({length: shuffledQuestions.length}, (_, i) => i))
        } else if (isDomainComprehensiveTest) {
          // For domain comprehensive test with fallback, select all questions from domain
          const selectedQuestions = selectDomainComprehensiveQuestions(MOCK_QUESTIONS, domainNumber)
          // Shuffle answer options for each question
          const shuffledQuestions = selectedQuestions.map(q => shuffleQuestionOptions(q))
          setQuestions(shuffledQuestions)
          // Initialize question queue
          setQuestionQueue(Array.from({length: shuffledQuestions.length}, (_, i) => i))
        } else {
          // Use mock questions for local development
          // Shuffle answer options for each question
          const shuffledQuestions = MOCK_QUESTIONS.map(q => shuffleQuestionOptions(q))
          setQuestions(shuffledQuestions)
          // Initialize question queue
          setQuestionQueue(Array.from({length: shuffledQuestions.length}, (_, i) => i))
        }
        setError(null) // Clear error since we have fallback data
      } finally {
        setLoading(false)
      }
    }
    
    fetchQuestions()
  }, [topicId, isMockExam, isQuickTest, isSuperQuickTest, isTopicQuickTest, isDomainQuickTest, isDomainComprehensiveTest, domainNumber])

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showExitModal) {
        handleCancelExit()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [showExitModal])

  // Register navigation interceptor with parent
  useEffect(() => {
    if (onNavigationAttempt) {
      // Register a function that will be called when user tries to navigate away
      const interceptor = (callback: () => void) => {
        setExitMethod('sidebar-navigation')
        setPendingNavigation(() => callback)
        setShowExitModal(true)
      }
      onNavigationAttempt(interceptor)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Track browser back button
  useEffect(() => {
    if (showResult) return // Don't track if test is completed
    
    const handlePopState = () => {
      // Prevent the navigation and show exit modal
      setExitMethod('browser-back')
      setShowExitModal(true)
      // Push state back to prevent leaving
      window.history.pushState(null, '', window.location.href)
    }
    
    // Push initial state so we can detect back button
    window.history.pushState(null, '', window.location.href)
    window.addEventListener('popstate', handlePopState)
    
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [showResult])

  const currentQuestion = questionQueue.length > 0 ? questions[questionQueue[0]] : null
  const totalQuestions = questions.length
  const isLastQuestion = questionQueue.length === 1

  // Initialize test start time
  useEffect(() => {
    testStartTimeRef.current = Date.now()
  }, [])

  // Reset question timer when question changes
  useEffect(() => {
    questionStartTimeRef.current = Date.now()
  }, [currentQuestion])

  // Track test pause/resume (tab visibility)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!currentQuestion || showResult) return
      
      const testType = isMockExam ? 'mock-exam' : isQuickTest ? 'quick-test' : isSuperQuickTest ? 'super-quick-test' : isTopicQuickTest ? 'topic-quick-test' : isDomainQuickTest ? 'domain-quick-test' : isDomainComprehensiveTest ? 'domain-comprehensive-test' : 'topic-test'
      
      if (document.hidden) {
        trackEvent('Test Session Paused', {
          questionNumber: totalQuestions - questionQueue.length + 1,
          testType,
          progress: Math.round(((totalQuestions - questionQueue.length) / totalQuestions) * 100),
          pauseReason: 'tab_hidden'
        })
      } else {
        trackEvent('Test Session Resumed', {
          questionNumber: totalQuestions - questionQueue.length + 1,
          testType
        })
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [currentQuestion, questionQueue, totalQuestions, showResult, isMockExam, isQuickTest, isSuperQuickTest, isTopicQuickTest, isDomainQuickTest, isDomainComprehensiveTest])

  // Scroll to top when question changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [currentQuestion])

  // Update URL with current question ID and subject for tracking/debugging
  useEffect(() => {
    if (currentQuestion && !showResult) {
      const url = new URL(window.location.href)
      url.searchParams.set('q', currentQuestion.id)
      if (currentQuestion.subject) {
        url.searchParams.set('subject', currentQuestion.subject)
      }
      window.history.replaceState(null, '', url.toString())
    }
  }, [currentQuestion, showResult])

  const handleSubmit = () => {
    if (selectedAnswer === null || questionQueue.length === 0 || !currentQuestion) return

    const currentQuestionIndex = questionQueue[0]
    const correct = selectedAnswer === currentQuestion.correctAnswer
    const timeToAnswer = Math.round((Date.now() - questionStartTimeRef.current) / 1000)
    const testType = isMockExam ? 'mock-exam' : isQuickTest ? 'quick-test' : isSuperQuickTest ? 'super-quick-test' : isTopicQuickTest ? 'topic-quick-test' : isDomainQuickTest ? 'domain-quick-test' : isDomainComprehensiveTest ? 'domain-comprehensive-test' : 'topic-test'
    
    // Track answer change if applicable
    const history = answerHistory.get(currentQuestionIndex) || []
    if (history.length > 0 && history[history.length - 1] !== selectedAnswer) {
      trackEvent('Test Answer Changed', {
        questionNumber: totalQuestions - questionQueue.length + 1,
        fromAnswer: history[history.length - 1],
        toAnswer: selectedAnswer,
        changeCount: history.length,
        questionId: currentQuestion.id,
        topicId: currentQuestion.topicId,
        testType
      })
    }
    
    trackEvent('Test Answer Submitted', {
      questionId: currentQuestion.id,
      isCorrect: correct,
      questionNumber: totalQuestions - questionQueue.length + 1,
      totalQuestions,
      topicId: currentQuestion.topicId,
      timeToAnswer,
      answerSpeed: timeToAnswer < 10 ? 'fast' : timeToAnswer < 30 ? 'medium' : 'slow',
      testType
    })
    
    setShowFeedback(true)

    if (correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (questionQueue.length === 0) return
    
    trackEvent('Test Next Question Clicked', {
      questionNumber: totalQuestions - questionQueue.length + 1,
      totalQuestions,
      isLastQuestion: questionQueue.length === 1,
    })
    
    // Remove current question from queue
    const newQueue = questionQueue.slice(1)
    setQuestionQueue(newQueue)
    setSelectedAnswer(null)
    setShowFeedback(false)
    
    // Show results if queue is empty
    if (newQueue.length === 0) {
      const finalScore = score
      const percentage = Math.round((finalScore / totalQuestions) * 100)
      const testType = isMockExam ? 'Mock Exam' : isQuickTest ? 'Quick Test' : isSuperQuickTest ? 'Super Quick Test' : isTopicQuickTest ? 'Topic Quick Test' : isDomainQuickTest ? 'Domain Quick Test' : isDomainComprehensiveTest ? 'Domain Comprehensive Test' : 'Topic Test'
      const totalTime = Math.round((Date.now() - testStartTimeRef.current) / 1000)
      
      testCompletionTimeRef.current = Date.now()
      
      // Track test completion
      trackEvent('Test Finished', {
        score: finalScore,
        totalQuestions,
        correctAnswers: finalScore,
        percentage,
        testType,
        topicId,
        timeTaken: totalTime,
        averageTimePerQuestion: Math.round(totalTime / totalQuestions),
        completedVia: 'answered' // Indicates test ended by answering last question
      })
      
      // Update user profile
      incrementTestCount(percentage, testType)
      addTestToSession(percentage)
      
      // Save test score for this topic
      if (topicId && topicId !== 'all-topics') {
        const previousTest = getTestHistory(topicId)
        saveTestScore(topicId, percentage)
        
        // Track if this is a repeat test
        if (previousTest) {
          const daysSince = Math.round((Date.now() - previousTest.date) / (1000 * 60 * 60 * 24))
          trackEvent('Test Repeated', {
            topicId,
            daysSinceLastTest: daysSince,
            previousScore: previousTest.score,
            currentScore: percentage,
            scoreChange: percentage - previousTest.score,
            improvementRate: previousTest.score > 0 ? Math.round(((percentage - previousTest.score) / previousTest.score) * 100) : 0
          })
        }
      }
      
      setShowResult(true)
    }
  }

  const handleSkip = () => {
    if (questionQueue.length === 0) return
    
    const currentQuestionOriginalIndex = questionQueue[0]
    const hasBeenSkippedBefore = skippedQuestions.has(currentQuestionOriginalIndex)
    
    trackEvent('Test Question Skipped', {
      skipType: hasBeenSkippedBefore ? 'forfeit' : 'defer',
      questionNumber: totalQuestions - questionQueue.length + 1,
      totalQuestions,
    })
    
    if (hasBeenSkippedBefore) {
      // Second skip = forfeit (mark as wrong, remove from queue)
      // Don't increment score - this counts as incorrect
      const newQueue = questionQueue.slice(1)
      setQuestionQueue(newQueue)
      setSelectedAnswer(null)
      setShowFeedback(false)
      
      // Show results if queue is empty
      if (newQueue.length === 0) {
        const finalScore = score
        const percentage = Math.round((finalScore / totalQuestions) * 100)
        const testType = isMockExam ? 'Mock Exam' : isQuickTest ? 'Quick Test' : isSuperQuickTest ? 'Super Quick Test' : isTopicQuickTest ? 'Topic Quick Test' : isDomainQuickTest ? 'Domain Quick Test' : isDomainComprehensiveTest ? 'Domain Comprehensive Test' : 'Topic Test'
        const totalTime = Math.round((Date.now() - testStartTimeRef.current) / 1000)
        
        // Track test completion
        trackEvent('Test Finished', {
          score: finalScore,
          totalQuestions,
          correctAnswers: finalScore,
          percentage,
          testType,
          topicId,
          timeTaken: totalTime,
          averageTimePerQuestion: Math.round(totalTime / totalQuestions),
          completedVia: 'forfeit' // Indicates test ended by forfeiting last question
        })
        
        // Update user profile
        incrementTestCount(percentage, testType)
        addTestToSession(percentage)
        
        // Save test score for this topic
        if (topicId && topicId !== 'all-topics') {
          saveTestScore(topicId, percentage)
        }
        
        setShowResult(true)
      }
    } else {
      // First skip = defer (move to end of queue)
      const newQueue = [...questionQueue.slice(1), currentQuestionOriginalIndex]
      setQuestionQueue(newQueue)
      setSkippedQuestions(new Set([...skippedQuestions, currentQuestionOriginalIndex]))
      setSelectedAnswer(null)
      setShowFeedback(false)
    }
  }

  const handleRestart = () => {
    trackEvent('Test Restarted', {
      previousScore: score,
      totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100),
    })
    
    setSelectedAnswer(null)
    setShowResult(false)
    setShowFeedback(false)
    setScore(0)
    // Reset queue and skip tracking
    setQuestionQueue(Array.from({length: questions.length}, (_, i) => i))
    setSkippedQuestions(new Set())
  }

  const handleExitClick = () => {
    const questionsAnswered = totalQuestions - questionQueue.length
    const completionPercentage = totalQuestions > 0 ? Math.round((questionsAnswered / totalQuestions) * 100) : 0
    
    trackEvent('Test Exit Clicked', {
      questionsRemaining: questionQueue.length,
      totalQuestions,
      currentScore: score,
      exitMethod: 'ui-button',
      questionsAnswered,
      completionPercentage,
    })
    
    // Show confirmation modal instead of immediately exiting
    setExitMethod('ui-button')
    setPendingNavigation(null) // No pending navigation, just exit
    setShowExitModal(true)
  }

  const handleCancelExit = () => {
    const questionsAnswered = totalQuestions - questionQueue.length
    const completionPercentage = totalQuestions > 0 ? Math.round((questionsAnswered / totalQuestions) * 100) : 0
    
    trackEvent('Test Exit Cancelled', {
      questionsRemaining: questionQueue.length,
      totalQuestions,
      exitMethod: exitMethod || 'unknown',
      questionsAnswered,
      completionPercentage,
    })
    
    // Close modal and continue test
    setShowExitModal(false)
    setPendingNavigation(null) // Clear pending navigation
    setExitMethod(null) // Reset exit method
  }

  const handleConfirmExit = () => {
    const questionsAnswered = totalQuestions - questionQueue.length
    const completionPercentage = totalQuestions > 0 ? Math.round((questionsAnswered / totalQuestions) * 100) : 0
    const testType = isMockExam ? 'mock-exam' : isQuickTest ? 'quick-test' : isSuperQuickTest ? 'super-quick-test' : isTopicQuickTest ? 'topic-quick-test' : isDomainQuickTest ? 'domain-quick-test' : isDomainComprehensiveTest ? 'domain-comprehensive-test' : 'topic-test'
    
    trackEvent('Test Exit Confirmed', {
      questionsRemaining: questionQueue.length,
      totalQuestions,
      questionsAnswered,
      currentScore: score,
      exitMethod: exitMethod || 'unknown',
      completionPercentage,
      testType,
    })
    
    // Close modal and complete exit/navigation
    if (pendingNavigation) {
      // User was trying to navigate away - execute the pending navigation
      setShowExitModal(false)
      pendingNavigation()
      setPendingNavigation(null)
    } else {
      // User clicked "End test" button - go back
      setShowExitModal(false)
      // Use setTimeout to ensure modal closes before navigation
      setTimeout(() => {
        onBack()
      }, 0)
    }
    setExitMethod(null) // Reset exit method
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 pt-24">
        <div className="max-w-3xl mx-auto">
          <Button
            onClick={onBack}
            variant="primary"
            size="md"
            className="mb-6"
          >
            ← Finish
          </Button>
          <div className="bg-white rounded-lg border-2 border-gray-300 p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 dark:border-gray-100 mx-auto mb-4"></div>
            <Text variant="body1" className="text-xl text-gray-600 dark:text-gray-400">Loading questions...</Text>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return <TestErrorState error={error} onBack={onBack} />
  }

  // No questions found
  if (questions.length === 0) {
    return <TestErrorState error="There are no questions available for this topic yet." onBack={onBack} />
  }

  // Results screen
  if (showResult) {
    return (
      <TestResultsScreen
        score={score}
        totalQuestions={totalQuestions}
        onRestart={handleRestart}
        onBack={onBack}
      />
    )
  }

  // Question screen - early return if no current question
  if (!currentQuestion) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-24 pt-6">
      <Container size="xl" padding="md" className="py-6 md:py-8">
        {/* Top bar with Back button and Question */}
        <div className="flex flex-row items-start gap-3 md:gap-4 mb-8">
          {/* End test button */}
          <div>
            <Tooltip content="End test" position="bottom">
              <button
                onClick={handleExitClick}
                data-tracking-id="test-end"
                className="flex-shrink-0 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-label="End test"
              >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-700 dark:text-gray-300"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
          </Tooltip>
          </div>

          {/* Question */}
          <div className="flex-1">
            <Heading as="h2" className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {currentQuestion.question}
            </Heading>
            <Text variant="body2" className="text-sm text-gray-600 dark:text-gray-400">
              Select one answer
            </Text>
          </div>
        </div>

        <TestQuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          showFeedback={showFeedback}
          onSelectAnswer={(index) => trackAnswerSelection(index, questionQueue[0], answerHistory, setAnswerHistory, setSelectedAnswer)}
          onSubmit={handleSubmit}
          onNext={handleNext}
          isLastQuestion={isLastQuestion}
        />

        <TestBottomBar
          currentQuestionNumber={questions.length - questionQueue.length + 1}
          totalQuestions={questions.length}
          showFeedback={showFeedback}
          skipButtonText={questionQueue.length === 1 || (questionQueue.length > 0 && skippedQuestions.has(questionQueue[0])) ? "I don't know" : "Skip Question"}
          onSkip={handleSkip}
        />
      </Container>

      <TestExitModal
        isOpen={showExitModal}
        onCancel={handleCancelExit}
        onConfirm={handleConfirmExit}
        hasUnsavedProgress={true}
      />
    </div>
  )
}
