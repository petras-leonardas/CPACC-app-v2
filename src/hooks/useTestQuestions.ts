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
import type { TestType } from '../contexts/TestContext'
import { TEST_TYPE_LABELS } from '../contexts/TestContext'

interface UseTestQuestionsParams {
  topicId: string
  testType: TestType
  domainNumber: string
}

interface UseTestQuestionsReturn {
  questions: Question[]
  loading: boolean
  selectedAnswer: number | null
  setSelectedAnswer: (answer: number | null) => void
  currentQuestionIndex: number
  answers: Map<number, number | null>
  showReview: boolean
  reviewingIndex: number | null
  finalResults: { score: number; answeredQuestions: Array<{ question: Question; selectedAnswer: number | null; isCorrect: boolean }> } | null
  showResult: boolean
  isTransitioning: boolean
  answerHistory: Map<number, number[]>
  setAnswerHistory: (history: Map<number, number[]>) => void
  activeQuestionIndex: number
  currentQuestion: Question | null
  totalQuestions: number
  questionHeadingRef: React.RefObject<HTMLHeadingElement | null>
  testCompletionTimeRef: React.MutableRefObject<number>
  handleSubmit: () => void
  handleSkip: () => void
  handleReviewQuestion: (index: number) => void
  handleBackToReview: () => void
  handleSubmitTest: () => void
  handleRestart: () => void
}

// Track answer selection with change history
function trackAnswerSelection(
  optionIndex: number,
  currentQuestionIndex: number,
  answerHistory: Map<number, number[]>,
  setAnswerHistory: (history: Map<number, number[]>) => void,
  setSelectedAnswer: (answer: number | null) => void
) {
  const history = answerHistory.get(currentQuestionIndex) || []
  const newHistory = new Map(answerHistory).set(currentQuestionIndex, [...history, optionIndex])
  setAnswerHistory(newHistory)
  setSelectedAnswer(optionIndex)
}

export { trackAnswerSelection }

export function useTestQuestions({
  topicId,
  testType,
  domainNumber,
}: UseTestQuestionsParams): UseTestQuestionsReturn {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Map<number, number | null>>(new Map())
  const [showReview, setShowReview] = useState(false)
  const [reviewingIndex, setReviewingIndex] = useState<number | null>(null)
  const [finalResults, setFinalResults] = useState<{
    score: number
    answeredQuestions: Array<{ question: Question; selectedAnswer: number | null; isCorrect: boolean }>
  } | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [answerHistory, setAnswerHistory] = useState<Map<number, number[]>>(new Map())

  const questionStartTimeRef = useRef<number>(Date.now())
  const testStartTimeRef = useRef<number>(Date.now())
  const questionHeadingRef = useRef<HTMLHeadingElement>(null)
  const testCompletionTimeRef = useRef<number>(0)

  // Derived values
  const activeQuestionIndex = reviewingIndex !== null ? reviewingIndex : currentQuestionIndex
  const currentQuestion = questions.length > 0 ? questions[activeQuestionIndex] : null
  const totalQuestions = questions.length

  // Select and prepare questions from static data
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
    setLoading(false)
  }, [topicId, testType, domainNumber])

  // Initialize test start time
  useEffect(() => {
    testStartTimeRef.current = Date.now()
  }, [])

  // Reset question timer when question changes
  useEffect(() => {
    questionStartTimeRef.current = Date.now()
  }, [activeQuestionIndex])

  // Helper: advance to next question or show review screen
  function advanceOrReview() {
    if (reviewingIndex !== null) {
      const nextIndex = reviewingIndex + 1
      if (nextIndex < totalQuestions) {
        setReviewingIndex(nextIndex)
        const previousAnswer = answers.get(nextIndex)
        setSelectedAnswer(previousAnswer !== undefined && previousAnswer !== null ? previousAnswer : null)
        setIsTransitioning(false)
        setTimeout(() => {
          questionHeadingRef.current?.focus()
        }, 0)
      } else {
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
      setShowReview(true)
      setSelectedAnswer(null)
      setIsTransitioning(false)
    }
  }

  function handleSubmit() {
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
    setTimeout(() => {
      advanceOrReview()
    }, 150)
  }

  function handleSkip() {
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
    setTimeout(() => {
      advanceOrReview()
    }, 150)
  }

  function handleReviewQuestion(index: number) {
    trackEvent('Test Skipped Question Reviewed', {
      questionNumber: index + 1,
      totalQuestions,
    })
    setReviewingIndex(index)
    const previousAnswer = answers.get(index)
    setSelectedAnswer(previousAnswer !== undefined && previousAnswer !== null ? previousAnswer : null)
    setShowReview(false)
  }

  function handleBackToReview() {
    setReviewingIndex(null)
    setShowReview(true)
    setSelectedAnswer(null)
  }

  function handleSubmitTest() {
    let correctCount = 0
    const finalAnsweredQuestions: Array<{ question: Question; selectedAnswer: number | null; isCorrect: boolean }> = []

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
            previousTest.score > 0 ? Math.round(((percentage - previousTest.score) / previousTest.score) * 100) : 0,
        })
      }
    }

    setFinalResults({ score: correctCount, answeredQuestions: finalAnsweredQuestions })
    setShowResult(true)
    setShowReview(false)
  }

  function handleRestart() {
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

  return {
    questions,
    loading,
    selectedAnswer,
    setSelectedAnswer,
    currentQuestionIndex,
    answers,
    showReview,
    reviewingIndex,
    finalResults,
    showResult,
    isTransitioning,
    answerHistory,
    setAnswerHistory,
    activeQuestionIndex,
    currentQuestion,
    totalQuestions,
    questionHeadingRef,
    testCompletionTimeRef,
    handleSubmit,
    handleSkip,
    handleReviewQuestion,
    handleBackToReview,
    handleSubmitTest,
    handleRestart,
  }
}
