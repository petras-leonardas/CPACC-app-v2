import { useState, useEffect, useRef } from 'react'
import { ALL_QUESTIONS } from '../data/questions'
import type { Question } from '../data/questions'
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
import { TestReviewScreen } from './Test/TestReviewScreen'
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
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showExitModal, setShowExitModal] = useState(false)
  const [pendingNavigation, setPendingNavigation] = useState<(() => void) | null>(null)
  const [exitMethod, setExitMethod] = useState<'ui-button' | 'browser-back' | 'sidebar-navigation' | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  // Linear progression: simple index instead of queue
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  // Answers map: index -> selected answer index (null = skipped, undefined = not yet seen)
  const [answers, setAnswers] = useState<Map<number, number | null>>(new Map())
  // Review screen state
  const [showReview, setShowReview] = useState(false)
  // When reviewing a skipped question from the review screen
  const [reviewingIndex, setReviewingIndex] = useState<number | null>(null)
  // Final computed results for the results screen
  const [finalResults, setFinalResults] = useState<{ score: number, answeredQuestions: Array<{ question: Question, selectedAnswer: number | null, isCorrect: boolean }> } | null>(null)
  
  // Advanced analytics tracking
  const [answerHistory, setAnswerHistory] = useState<Map<number, number[]>>(new Map())
  const questionStartTimeRef = useRef<number>(Date.now())
  const testStartTimeRef = useRef<number>(Date.now())
  const questionHeadingRef = useRef<HTMLHeadingElement>(null)
  const testCompletionTimeRef = useRef<number>(0)

  // Select and prepare questions from static data
  useEffect(() => {
    let selectedQuestions: Question[]
    
    if (isMockExam) {
      selectedQuestions = selectMockExamQuestions(ALL_QUESTIONS)
    } else if (isQuickTest) {
      selectedQuestions = selectQuickTestQuestions(ALL_QUESTIONS)
    } else if (isSuperQuickTest) {
      selectedQuestions = selectSuperQuickTestQuestions(ALL_QUESTIONS)
    } else if (isTopicQuickTest) {
      selectedQuestions = selectTopicQuickTestQuestions(ALL_QUESTIONS, topicId)
    } else if (isDomainQuickTest) {
      selectedQuestions = selectDomainQuickTestQuestions(ALL_QUESTIONS, domainNumber)
    } else if (isDomainComprehensiveTest) {
      selectedQuestions = selectDomainComprehensiveQuestions(ALL_QUESTIONS, domainNumber)
    } else {
      selectedQuestions = ALL_QUESTIONS.filter(q => q.topicId === topicId)
    }
    
    const shuffledQuestions = selectedQuestions.map(q => shuffleQuestionOptions(q))
    setQuestions(shuffledQuestions)
    setLoading(false)
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
    if (showResult) return
    
    const handlePopState = () => {
      setExitMethod('browser-back')
      setShowExitModal(true)
      window.history.pushState(null, '', window.location.href)
    }
    
    window.history.pushState(null, '', window.location.href)
    window.addEventListener('popstate', handlePopState)
    
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [showResult])

  // Derive the active question index (review mode vs linear progression)
  const activeQuestionIndex = reviewingIndex !== null ? reviewingIndex : currentQuestionIndex
  const currentQuestion = questions.length > 0 ? questions[activeQuestionIndex] : null
  const totalQuestions = questions.length

  // Initialize test start time
  useEffect(() => {
    testStartTimeRef.current = Date.now()
  }, [])

  // Reset question timer when question changes
  useEffect(() => {
    questionStartTimeRef.current = Date.now()
  }, [activeQuestionIndex])

  // Track test pause/resume (tab visibility)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!currentQuestion || showResult || showReview) return
      
      const testType = isMockExam ? 'mock-exam' : isQuickTest ? 'quick-test' : isSuperQuickTest ? 'super-quick-test' : isTopicQuickTest ? 'topic-quick-test' : isDomainQuickTest ? 'domain-quick-test' : isDomainComprehensiveTest ? 'domain-comprehensive-test' : 'topic-test'
      
      if (document.hidden) {
        trackEvent('Test Session Paused', {
          questionNumber: activeQuestionIndex + 1,
          testType,
          progress: Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100),
          pauseReason: 'tab_hidden'
        })
      } else {
        trackEvent('Test Session Resumed', {
          questionNumber: activeQuestionIndex + 1,
          testType
        })
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [currentQuestion, activeQuestionIndex, currentQuestionIndex, totalQuestions, showResult, showReview, isMockExam, isQuickTest, isSuperQuickTest, isTopicQuickTest, isDomainQuickTest, isDomainComprehensiveTest])

  // Scroll to top when question changes or review screen appears
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [activeQuestionIndex, showReview])

  // Update URL with current question ID and subject for tracking/debugging
  useEffect(() => {
    if (currentQuestion && !showResult && !showReview) {
      const url = new URL(window.location.href)
      url.searchParams.set('q', currentQuestion.id)
      if (currentQuestion.subject) {
        url.searchParams.set('subject', currentQuestion.subject)
      }
      window.history.replaceState(null, '', url.toString())
    }
  }, [currentQuestion, showResult, showReview])

  // Helper: advance to next question or show review screen
  const advanceOrReview = () => {
    if (reviewingIndex !== null) {
      // Coming from review: advance to the next question linearly
      const nextIndex = reviewingIndex + 1
      if (nextIndex < totalQuestions) {
        setReviewingIndex(nextIndex)
        // Pre-fill with previously selected answer for next question (if any)
        const previousAnswer = answers.get(nextIndex)
        setSelectedAnswer(previousAnswer !== undefined && previousAnswer !== null ? previousAnswer : null)
        setIsTransitioning(false)
        setTimeout(() => {
          questionHeadingRef.current?.focus()
        }, 0)
      } else {
        // No more questions after this one — go back to review
        setReviewingIndex(null)
        setShowReview(true)
        setSelectedAnswer(null)
        setIsTransitioning(false)
      }
      return
    }
    
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setIsTransitioning(false)
      
      setTimeout(() => {
        questionHeadingRef.current?.focus()
      }, 0)
    } else {
      // Last question — show review screen
      setShowReview(true)
      setSelectedAnswer(null)
      setIsTransitioning(false)
    }
  }

  const handleSubmit = () => {
    if (selectedAnswer === null || !currentQuestion || isTransitioning) return

    const correct = selectedAnswer === currentQuestion.correctAnswer
    const timeToAnswer = Math.round((Date.now() - questionStartTimeRef.current) / 1000)
    const testType = isMockExam ? 'mock-exam' : isQuickTest ? 'quick-test' : isSuperQuickTest ? 'super-quick-test' : isTopicQuickTest ? 'topic-quick-test' : isDomainQuickTest ? 'domain-quick-test' : isDomainComprehensiveTest ? 'domain-comprehensive-test' : 'topic-test'
    
    // Track answer change if applicable
    const history = answerHistory.get(activeQuestionIndex) || []
    if (history.length > 0 && history[history.length - 1] !== selectedAnswer) {
      trackEvent('Test Answer Changed', {
        questionNumber: activeQuestionIndex + 1,
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
      questionNumber: activeQuestionIndex + 1,
      totalQuestions,
      topicId: currentQuestion.topicId,
      timeToAnswer,
      answerSpeed: timeToAnswer < 10 ? 'fast' : timeToAnswer < 30 ? 'medium' : 'slow',
      testType,
      isReview: reviewingIndex !== null
    })

    // Record the answer
    setAnswers(prev => new Map(prev).set(activeQuestionIndex, selectedAnswer))

    // Fade out, then advance
    setIsTransitioning(true)
    setTimeout(() => {
      advanceOrReview()
    }, 150)
  }

  const handleSkip = () => {
    if (!currentQuestion || isTransitioning) return
    
    trackEvent('Test Question Skipped', {
      questionNumber: activeQuestionIndex + 1,
      totalQuestions,
      isReview: reviewingIndex !== null
    })
    
    // Mark as skipped (null) only if not already answered
    if (!answers.has(activeQuestionIndex)) {
      setAnswers(prev => new Map(prev).set(activeQuestionIndex, null))
    }
    
    // Fade out, then advance
    setIsTransitioning(true)
    setTimeout(() => {
      advanceOrReview()
    }, 150)
  }

  // Navigate from review screen to a specific question
  const handleReviewQuestion = (index: number) => {
    trackEvent('Test Skipped Question Reviewed', {
      questionNumber: index + 1,
      totalQuestions
    })
    setReviewingIndex(index)
    // Pre-fill with previously selected answer (if any)
    const previousAnswer = answers.get(index)
    setSelectedAnswer(previousAnswer !== undefined && previousAnswer !== null ? previousAnswer : null)
    setShowReview(false)
  }

  // Go back to review screen without changing anything
  const handleBackToReview = () => {
    setReviewingIndex(null)
    setShowReview(true)
    setSelectedAnswer(null)
  }

  // Submit the test from the review screen — calculate final results
  const handleSubmitTest = () => {
    let correctCount = 0
    const finalAnsweredQuestions: Array<{ question: Question, selectedAnswer: number | null, isCorrect: boolean }> = []
    
    for (let i = 0; i < questions.length; i++) {
      const answer = answers.get(i) ?? null
      const question = questions[i]
      const isCorrect = answer !== null && answer === question.correctAnswer
      if (isCorrect) correctCount++
      finalAnsweredQuestions.push({ question, selectedAnswer: answer, isCorrect })
    }
    
    const percentage = Math.round((correctCount / totalQuestions) * 100)
    const testTypeLabel = isMockExam ? 'Mock Exam' : isQuickTest ? 'Quick Test' : isSuperQuickTest ? 'Super Quick Test' : isTopicQuickTest ? 'Topic Quick Test' : isDomainQuickTest ? 'Domain Quick Test' : isDomainComprehensiveTest ? 'Domain Comprehensive Test' : 'Topic Test'
    const totalTime = Math.round((Date.now() - testStartTimeRef.current) / 1000)
    const skippedCount = [...answers.values()].filter(v => v === null).length
    
    testCompletionTimeRef.current = Date.now()
    
    trackEvent('Test Finished', {
      score: correctCount,
      totalQuestions,
      correctAnswers: correctCount,
      percentage,
      testType: testTypeLabel,
      topicId,
      timeTaken: totalTime,
      averageTimePerQuestion: Math.round(totalTime / totalQuestions),
      skippedQuestions: skippedCount,
      completedVia: 'review-submit'
    })
    
    incrementTestCount(percentage, testTypeLabel)
    addTestToSession(percentage)
    
    if (topicId && topicId !== 'all-topics') {
      const previousTest = getTestHistory(topicId)
      saveTestScore(topicId, percentage)
      
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
    
    setFinalResults({ score: correctCount, answeredQuestions: finalAnsweredQuestions })
    setShowResult(true)
    setShowReview(false)
  }

  const handleRestart = () => {
    trackEvent('Test Restarted', {
      previousScore: finalResults?.score || 0,
      totalQuestions,
      percentage: Math.round(((finalResults?.score || 0) / totalQuestions) * 100),
    })
    
    setSelectedAnswer(null)
    setShowResult(false)
    setShowReview(false)
    setReviewingIndex(null)
    setCurrentQuestionIndex(0)
    setAnswers(new Map())
    setAnswerHistory(new Map())
    setFinalResults(null)
  }

  const handleExitClick = () => {
    const questionsAnswered = answers.size
    const completionPercentage = totalQuestions > 0 ? Math.round((questionsAnswered / totalQuestions) * 100) : 0
    
    trackEvent('Test Exit Clicked', {
      questionsRemaining: totalQuestions - questionsAnswered,
      totalQuestions,
      exitMethod: 'ui-button',
      questionsAnswered,
      completionPercentage,
    })
    
    setExitMethod('ui-button')
    setPendingNavigation(null)
    setShowExitModal(true)
  }

  const handleCancelExit = () => {
    const questionsAnswered = answers.size
    const completionPercentage = totalQuestions > 0 ? Math.round((questionsAnswered / totalQuestions) * 100) : 0
    
    trackEvent('Test Exit Cancelled', {
      questionsRemaining: totalQuestions - questionsAnswered,
      totalQuestions,
      exitMethod: exitMethod || 'unknown',
      questionsAnswered,
      completionPercentage,
    })
    
    setShowExitModal(false)
    setPendingNavigation(null)
    setExitMethod(null)
  }

  const handleConfirmExit = () => {
    const questionsAnswered = answers.size
    const completionPercentage = totalQuestions > 0 ? Math.round((questionsAnswered / totalQuestions) * 100) : 0
    const testType = isMockExam ? 'mock-exam' : isQuickTest ? 'quick-test' : isSuperQuickTest ? 'super-quick-test' : isTopicQuickTest ? 'topic-quick-test' : isDomainQuickTest ? 'domain-quick-test' : isDomainComprehensiveTest ? 'domain-comprehensive-test' : 'topic-test'
    
    trackEvent('Test Exit Confirmed', {
      questionsRemaining: totalQuestions - questionsAnswered,
      totalQuestions,
      questionsAnswered,
      exitMethod: exitMethod || 'unknown',
      completionPercentage,
      testType,
    })
    
    setShowExitModal(false)
    setExitMethod(null)
    if (pendingNavigation) {
      animateExit(() => {
        pendingNavigation()
        setPendingNavigation(null)
      })
    } else {
      animateExit(onBack)
    }
  }

  const animateExit = (callback: () => void) => {
    setIsExiting(true)
    setTimeout(() => {
      callback()
    }, 350)
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 pt-24">
        <div className="max-w-3xl mx-auto">
          <Button
            onClick={onBack}
            variant="primary"
            size="md"
            className="mb-6"
          >
            ← Finish
          </Button>
          <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-300 dark:border-gray-700 p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 dark:border-gray-100 mx-auto mb-4"></div>
            <Text variant="body1" className="text-xl text-gray-600 dark:text-gray-400">Loading questions...</Text>
          </div>
        </div>
      </div>
    )
  }

  // No questions found
  if (questions.length === 0) {
    return <TestErrorState error="There are no questions available for this topic yet." onBack={onBack} />
  }

  // Results screen
  if (showResult && finalResults) {
    return (
      <TestResultsScreen
        score={finalResults.score}
        totalQuestions={totalQuestions}
        answeredQuestions={finalResults.answeredQuestions}
        onRestart={handleRestart}
        onBack={() => animateExit(onBack)}
        isExiting={isExiting}
      />
    )
  }

  // Review screen (shown after all questions have been seen)
  if (showReview && reviewingIndex === null) {
    const reviewQuestions = questions.map((question, index) => ({
      question,
      selectedAnswer: answers.get(index) ?? null
    }))

    return (
      <>
        <TestReviewScreen
          questions={reviewQuestions}
          onReviewQuestion={handleReviewQuestion}
          onSubmitTest={handleSubmitTest}
          onExitClick={handleExitClick}
          isExiting={isExiting}
        />
        <TestExitModal
          isOpen={showExitModal}
          onCancel={handleCancelExit}
          onConfirm={handleConfirmExit}
          hasUnsavedProgress={true}
        />
      </>
    )
  }

  // Question screen - early return if no current question
  if (!currentQuestion) {
    return null
  }

  const progress = totalQuestions > 0 ? ((activeQuestionIndex + 1) / totalQuestions) * 100 : 0

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isExiting ? 'animate-[fadeOut_350ms_ease-in_forwards]' : 'animate-[fadeIn_700ms_ease-out]'}`}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        :root { --progress-bar-color: #E67E22; --progress-bar-track: #353A56; }
        .dark { --progress-bar-color: #F39C52; --progress-bar-track: #2A2E44; }
      `}</style>
      <Container size="md" padding="md" className="py-6 md:py-10">
        {/* Progress toolbar: counter | progress bar | finish test */}
        <div className="flex items-center gap-4 mb-8">
          <Text variant="body2" className="text-gray-500 dark:text-gray-400 whitespace-nowrap font-medium tabular-nums">
            {activeQuestionIndex + 1}/{questions.length}
          </Text>
          <div className="flex-1 h-3.5 rounded-full" style={{ backgroundColor: 'var(--progress-bar-track)' }}>
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%`, backgroundColor: 'var(--progress-bar-color)' }}
            />
          </div>
          <Button
            onClick={handleExitClick}
            variant="secondary"
            size="sm"
            data-tracking-id="test-end"
          >
            End test
          </Button>
        </div>

        {/* Question content with fade transition */}
        <div className={`transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {/* Question */}
        <div className="mb-8">
          <Text variant="small" className="text-gray-500 dark:text-gray-400 mb-2">
            Question {activeQuestionIndex + 1}
          </Text>
          <Heading as="h2" ref={questionHeadingRef} tabIndex={-1} className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 outline-none">
            {currentQuestion.question}
          </Heading>
        </div>

        <TestQuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={(index) => trackAnswerSelection(index, activeQuestionIndex, answerHistory, setAnswerHistory, setSelectedAnswer)}
          onSubmit={handleSubmit}
          onSkip={handleSkip}
          isReviewMode={reviewingIndex !== null}
          onBackToReview={handleBackToReview}
        />
        </div>
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
