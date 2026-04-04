import { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo, type ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
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
  selectDomainComprehensiveQuestions,
} from '../utils/testQuestionSelection'

// ─── Types ───────────────────────────────────────────────────────────────────

export type TestType =
  | 'mock-exam'
  | 'quick-test'
  | 'super-quick-test'
  | 'topic-quick'
  | 'domain-quick'
  | 'domain-comprehensive'
  | 'topic-test'

export const TEST_TYPE_LABELS: Record<TestType, string> = {
  'mock-exam': 'Mock Exam',
  'quick-test': 'Quick Test',
  'super-quick-test': 'Super Quick Test',
  'topic-quick': 'Topic Quick Test',
  'domain-quick': 'Domain Quick Test',
  'domain-comprehensive': 'Domain Comprehensive Test',
  'topic-test': 'Topic Test',
}

/**
 * Explicit test phase — the single source of truth for "which screen".
 * Replaces the implicit state machine of boolean flags.
 */
export type TestPhase =
  | 'loading'             // questions being loaded/shuffled
  | 'error'               // no questions available
  | 'answering'           // actively answering questions (index route)
  | 'reviewing'           // review screen — all questions seen (/review)
  | 'reviewing-question'  // re-answering a specific question from review (index route)
  | 'completed'           // results screen — test submitted (/results)

export interface AnsweredQuestion {
  question: Question
  selectedAnswer: number | null
  isCorrect: boolean
}

export interface FinalResults {
  score: number
  answeredQuestions: AnsweredQuestion[]
}

// ─── Context Shape ───────────────────────────────────────────────────────────

interface TestContextValue {
  // Phase
  phase: TestPhase

  // Questions
  questions: Question[]
  currentQuestionIndex: number
  activeQuestionIndex: number
  currentQuestion: Question | null
  totalQuestions: number

  // Answers
  answers: Map<number, number | null>
  selectedAnswer: number | null
  selectAnswer: (optionIndex: number) => void
  answeredCount: number
  skippedCount: number

  // Results
  finalResults: FinalResults | null

  // Actions
  submitAnswer: () => void
  skipQuestion: () => void
  goToReviewQuestion: (index: number) => void
  backToReview: () => void
  submitTest: () => void
  restartTest: () => void
  exitToOrigin: () => void

  // UI state
  isTransitioning: boolean
  isReviewMode: boolean

  // Exit/Navigation
  showExitModal: boolean
  isExiting: boolean
  handleExitClick: () => void
  handleCancelExit: () => void
  handleConfirmExit: () => void

  // Meta
  testType: TestType
  topicId: string
  originRoute: string

  // Refs
  questionHeadingRef: React.RefObject<HTMLHeadingElement | null>
}

const TestContext = createContext<TestContextValue | null>(null)

/**
 * Hook to consume the test context.
 * Must be used within a <TestProvider>.
 */
export function useTest(): TestContextValue {
  const context = useContext(TestContext)
  if (!context) {
    throw new Error('useTest must be used within a TestProvider')
  }
  return context
}

// ─── Provider ────────────────────────────────────────────────────────────────

interface TestProviderProps {
  topicId: string
  testType: TestType
  domainNumber: string
  originRoute: string
  onNavigationAttempt?: (interceptor: (callback: () => void) => void) => void
  children: ReactNode
}

export function TestProvider({
  topicId,
  testType,
  domainNumber,
  originRoute,
  onNavigationAttempt,
  children,
}: TestProviderProps) {
  const navigate = useNavigate()
  const location = useLocation()

  // ─── Core Question State ─────────────────────────────────────────
  const [questions, setQuestions] = useState<Question[]>([])
  const [phase, setPhase] = useState<TestPhase>('loading')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Map<number, number | null>>(new Map())
  const [reviewingIndex, setReviewingIndex] = useState<number | null>(null)
  const [finalResults, setFinalResults] = useState<FinalResults | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [answerHistory, setAnswerHistory] = useState<Map<number, number[]>>(new Map())
  const [restartKey, setRestartKey] = useState(0)

  // ─── Exit/Navigation State ───────────────────────────────────────
  const [showExitModal, setShowExitModal] = useState(false)
  const [pendingNavigation, setPendingNavigation] = useState<(() => void) | null>(null)
  const [exitMethod, setExitMethod] = useState<string | null>(null)
  const [isExiting, setIsExiting] = useState(false)

  // ─── Refs ────────────────────────────────────────────────────────
  const questionStartTimeRef = useRef<number>(Date.now())
  const testStartTimeRef = useRef<number>(Date.now())
  const questionHeadingRef = useRef<HTMLHeadingElement>(null)
  const testCompletionTimeRef = useRef<number>(0)

  // ─── Derived Values (memoized to avoid recomputation) ────────────
  const activeQuestionIndex = reviewingIndex !== null ? reviewingIndex : currentQuestionIndex
  const currentQuestion = questions.length > 0 ? questions[activeQuestionIndex] ?? null : null
  const totalQuestions = questions.length
  const answeredCount = useMemo(
    () => [...answers.values()].filter(v => v !== null).length,
    [answers],
  )
  const skippedCount = answers.size - answeredCount
  const isReviewMode = reviewingIndex !== null

  // Compute base path by stripping /review or /results suffix
  const basePath = location.pathname.replace(/\/(review|results)$/, '')

  // ─── Question Selection ──────────────────────────────────────────
  useEffect(() => {
    const selectors: Record<TestType, () => Question[]> = {
      'mock-exam': () => selectMockExamQuestions(ALL_QUESTIONS),
      'quick-test': () => selectQuickTestQuestions(ALL_QUESTIONS),
      'super-quick-test': () => selectSuperQuickTestQuestions(ALL_QUESTIONS),
      'topic-quick': () => selectTopicQuickTestQuestions(ALL_QUESTIONS, topicId),
      'domain-quick': () => selectDomainQuickTestQuestions(ALL_QUESTIONS, domainNumber),
      'domain-comprehensive': () => selectDomainComprehensiveQuestions(ALL_QUESTIONS, domainNumber),
      'topic-test': () => ALL_QUESTIONS.filter(q => q.topicId === topicId),
    }

    const selectedQuestions = selectors[testType]()
    const shuffledQuestions = selectedQuestions.map(q => shuffleQuestionOptions(q))
    setQuestions(shuffledQuestions)
    setPhase(shuffledQuestions.length === 0 ? 'error' : 'answering')
  }, [topicId, testType, domainNumber, restartKey])

  // Initialize test start time
  useEffect(() => {
    testStartTimeRef.current = Date.now()
  }, [restartKey])

  // Reset question timer when question changes
  useEffect(() => {
    questionStartTimeRef.current = Date.now()
  }, [activeQuestionIndex])

  // ─── Navigation Helpers ──────────────────────────────────────────

  const navigateToReview = useCallback(() => {
    setPhase('reviewing')
    setReviewingIndex(null)
    setSelectedAnswer(null)
    navigate(`${basePath}/review`)
  }, [navigate, basePath])

  const navigateToResults = useCallback(() => {
    setPhase('completed')
    navigate(`${basePath}/results`, { replace: true })
  }, [navigate, basePath])

  const navigateToQuestion = useCallback((index: number) => {
    setReviewingIndex(index)
    setPhase('reviewing-question')
    const previousAnswer = answers.get(index)
    setSelectedAnswer(previousAnswer !== undefined && previousAnswer !== null ? previousAnswer : null)
    navigate(basePath, { replace: true })
  }, [navigate, basePath, answers])

  // ─── Answer Selection ────────────────────────────────────────────

  function selectAnswer(optionIndex: number) {
    const history = answerHistory.get(activeQuestionIndex) || []
    const newHistory = new Map(answerHistory).set(activeQuestionIndex, [...history, optionIndex])
    setAnswerHistory(newHistory)
    setSelectedAnswer(optionIndex)
  }

  // ─── Core Actions ────────────────────────────────────────────────

  function advanceOrReview() {
    if (reviewingIndex !== null) {
      // In review mode — advance to next question or go back to review
      const nextIndex = reviewingIndex + 1
      if (nextIndex < totalQuestions) {
        setReviewingIndex(nextIndex)
        const previousAnswer = answers.get(nextIndex)
        setSelectedAnswer(previousAnswer !== undefined && previousAnswer !== null ? previousAnswer : null)
        setIsTransitioning(false)
        setTimeout(() => questionHeadingRef.current?.focus(), 0)
      } else {
        setIsTransitioning(false)
        navigateToReview()
      }
      return
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setIsTransitioning(false)
      setTimeout(() => questionHeadingRef.current?.focus(), 0)
    } else {
      // Last question answered — go to review
      setIsTransitioning(false)
      navigateToReview()
    }
  }

  function submitAnswer() {
    if (selectedAnswer === null || !currentQuestion || isTransitioning) return

    const correct = selectedAnswer === currentQuestion.correctAnswer
    const timeToAnswer = Math.round((Date.now() - questionStartTimeRef.current) / 1000)

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
        testType,
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
      isReview: reviewingIndex !== null,
    })

    setAnswers(prev => new Map(prev).set(activeQuestionIndex, selectedAnswer))

    setIsTransitioning(true)
    setTimeout(() => advanceOrReview(), 150)
  }

  function skipQuestion() {
    if (!currentQuestion || isTransitioning) return

    trackEvent('Test Question Skipped', {
      questionNumber: activeQuestionIndex + 1,
      totalQuestions,
      isReview: reviewingIndex !== null,
    })

    if (!answers.has(activeQuestionIndex)) {
      setAnswers(prev => new Map(prev).set(activeQuestionIndex, null))
    }

    setIsTransitioning(true)
    setTimeout(() => advanceOrReview(), 150)
  }

  const goToReviewQuestion = useCallback((index: number) => {
    trackEvent('Test Skipped Question Reviewed', {
      questionNumber: index + 1,
      totalQuestions,
    })
    navigateToQuestion(index)
  }, [totalQuestions, navigateToQuestion])

  const backToReview = useCallback(() => {
    navigateToReview()
  }, [navigateToReview])

  function submitTest() {
    if (totalQuestions === 0) return

    let correctCount = 0
    const finalAnsweredQuestions: AnsweredQuestion[] = []

    for (let i = 0; i < questions.length; i++) {
      const answer = answers.get(i) ?? null
      const question = questions[i]
      const isCorrect = answer !== null && answer === question.correctAnswer
      if (isCorrect) correctCount++
      finalAnsweredQuestions.push({ question, selectedAnswer: answer, isCorrect })
    }

    const percentage = Math.round((correctCount / totalQuestions) * 100)
    const testTypeLabel = TEST_TYPE_LABELS[testType]
    const totalTime = Math.round((Date.now() - testStartTimeRef.current) / 1000)
    const skippedTotal = [...answers.values()].filter(v => v === null).length

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
      skippedQuestions: skippedTotal,
      completedVia: 'review-submit',
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
          improvementRate:
            previousTest.score > 0
              ? Math.round(((percentage - previousTest.score) / previousTest.score) * 100)
              : 0,
        })
      }
    }

    setFinalResults({ score: correctCount, answeredQuestions: finalAnsweredQuestions })
    navigateToResults()
  }

  function restartTest() {
    trackEvent('Test Restarted', {
      previousScore: finalResults?.score || 0,
      totalQuestions,
      percentage: Math.round(((finalResults?.score || 0) / totalQuestions) * 100),
    })

    // Reset all state
    setSelectedAnswer(null)
    setReviewingIndex(null)
    setCurrentQuestionIndex(0)
    setAnswers(new Map())
    setAnswerHistory(new Map())
    setFinalResults(null)
    setPhase('loading')

    // Trigger question re-selection and reshuffling
    setRestartKey(prev => prev + 1)

    // Navigate to question screen
    navigate(basePath, { replace: true })
  }

  // ─── Exit / Navigation ───────────────────────────────────────────

  const animateExit = useCallback((callback: () => void) => {
    setIsExiting(true)
    setTimeout(callback, 350)
  }, [])

  const exitToOrigin = useCallback(() => {
    animateExit(() => navigate(originRoute))
  }, [animateExit, navigate, originRoute])

  // Register navigation interceptor with Layout (for sidebar links)
  useEffect(() => {
    if (onNavigationAttempt) {
      onNavigationAttempt((callback: () => void) => {
        setExitMethod('sidebar-navigation')
        setPendingNavigation(() => callback)
        setShowExitModal(true)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Browser back interception (only during active test, not on results)
  useEffect(() => {
    if (phase === 'completed') return

    const handlePopState = () => {
      setExitMethod('browser-back')
      setShowExitModal(true)
      window.history.pushState(null, '', window.location.href)
    }

    window.history.pushState(null, '', window.location.href)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [phase])

  // BUG-6 FIX: Warn user before page refresh/tab close during active test
  useEffect(() => {
    if (phase === 'completed' || phase === 'loading' || phase === 'error') return

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      // Setting returnValue is required for cross-browser compatibility
      e.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [phase])

  const handleExitClick = useCallback(() => {
    const completionPercentage = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0

    trackEvent('Test Exit Clicked', {
      questionsRemaining: totalQuestions - answeredCount,
      totalQuestions,
      exitMethod: 'ui-button',
      questionsAnswered: answeredCount,
      completionPercentage,
    })

    setExitMethod('ui-button')
    setPendingNavigation(null)
    setShowExitModal(true)
  }, [answeredCount, totalQuestions])

  const handleCancelExit = useCallback(() => {
    const completionPercentage = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0

    trackEvent('Test Exit Cancelled', {
      questionsRemaining: totalQuestions - answeredCount,
      totalQuestions,
      exitMethod: exitMethod || 'unknown',
      questionsAnswered: answeredCount,
      completionPercentage,
    })

    setShowExitModal(false)
    setPendingNavigation(null)
    setExitMethod(null)
  }, [answeredCount, totalQuestions, exitMethod])

  const handleConfirmExit = useCallback(() => {
    const completionPercentage = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0

    trackEvent('Test Exit Confirmed', {
      questionsRemaining: totalQuestions - answeredCount,
      totalQuestions,
      questionsAnswered: answeredCount,
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
      exitToOrigin()
    }
  }, [answeredCount, totalQuestions, exitMethod, testType, pendingNavigation, animateExit, exitToOrigin])

  // Escape key closes exit modal (placed after handleCancelExit declaration)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showExitModal) {
        handleCancelExit()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [showExitModal, handleCancelExit])

  // ─── Visibility Tracking ─────────────────────────────────────────
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!currentQuestion || phase === 'completed' || phase === 'reviewing') return

      if (document.hidden) {
        trackEvent('Test Session Paused', {
          questionNumber: activeQuestionIndex + 1,
          testType,
          progress: Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100),
          pauseReason: 'tab_hidden',
        })
      } else {
        trackEvent('Test Session Resumed', {
          questionNumber: activeQuestionIndex + 1,
          testType,
        })
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [currentQuestion, activeQuestionIndex, currentQuestionIndex, totalQuestions, phase, testType])

  // ─── URL Query Params (debugging/tracking) ───────────────────────
  useEffect(() => {
    if (currentQuestion && (phase === 'answering' || phase === 'reviewing-question')) {
      const url = new URL(window.location.href)
      url.searchParams.set('q', currentQuestion.id)
      if (currentQuestion.subject) {
        url.searchParams.set('subject', currentQuestion.subject)
      }
      window.history.replaceState(null, '', url.toString())
    }
  }, [currentQuestion, phase])

  // ─── Context Value (memoized to prevent unnecessary consumer re-renders) ──

  const value: TestContextValue = useMemo(() => ({
    phase,
    questions,
    currentQuestionIndex,
    activeQuestionIndex,
    currentQuestion,
    totalQuestions,
    answers,
    selectedAnswer,
    selectAnswer,
    answeredCount,
    skippedCount,
    finalResults,
    submitAnswer,
    skipQuestion,
    goToReviewQuestion,
    backToReview,
    submitTest,
    restartTest,
    exitToOrigin,
    isTransitioning,
    isReviewMode,
    showExitModal,
    isExiting,
    handleExitClick,
    handleCancelExit,
    handleConfirmExit,
    testType,
    topicId,
    originRoute,
    questionHeadingRef,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [
    phase, questions, currentQuestionIndex, activeQuestionIndex,
    currentQuestion, totalQuestions, answers, selectedAnswer,
    answeredCount, skippedCount, finalResults, isTransitioning,
    isReviewMode, showExitModal, isExiting,
    // Stable refs: testType, topicId, originRoute, questionHeadingRef
    // useCallback-wrapped: goToReviewQuestion, backToReview, exitToOrigin,
    //   handleExitClick, handleCancelExit, handleConfirmExit
    goToReviewQuestion, backToReview, exitToOrigin,
    handleExitClick, handleCancelExit, handleConfirmExit,
  ])

  return <TestContext.Provider value={value}>{children}</TestContext.Provider>
}
