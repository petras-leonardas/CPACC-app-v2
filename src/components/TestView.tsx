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
import { Heading, Text, Button, Container, IconButton } from '../design-system'
import { ArrowLeft } from '../design-system/icons'

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
  const [score, setScore] = useState(0)
  const [showExitModal, setShowExitModal] = useState(false)
  const [pendingNavigation, setPendingNavigation] = useState<(() => void) | null>(null)
  const [skippedQuestions, setSkippedQuestions] = useState<Set<number>>(new Set())
  const [exitMethod, setExitMethod] = useState<'ui-button' | 'browser-back' | 'sidebar-navigation' | null>(null)
  const [questionQueue, setQuestionQueue] = useState<number[]>([])
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState<Array<{ question: Question, selectedAnswer: number | null, isCorrect: boolean }>>([])
  const [isExiting, setIsExiting] = useState(false)
  
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
      // Mock exam: select 80 questions proportionally from domains
      selectedQuestions = selectMockExamQuestions(ALL_QUESTIONS)
    } else if (isQuickTest) {
      // Quick test: select 20 questions proportionally from domains
      selectedQuestions = selectQuickTestQuestions(ALL_QUESTIONS)
    } else if (isSuperQuickTest) {
      // Super quick test: select 10 questions proportionally from domains
      selectedQuestions = selectSuperQuickTestQuestions(ALL_QUESTIONS)
    } else if (isTopicQuickTest) {
      // Topic quick test: select 10 random questions from specific topic
      selectedQuestions = selectTopicQuickTestQuestions(ALL_QUESTIONS, topicId)
    } else if (isDomainQuickTest) {
      // Domain quick test: select 10 random questions from all topics in domain
      selectedQuestions = selectDomainQuickTestQuestions(ALL_QUESTIONS, domainNumber)
    } else if (isDomainComprehensiveTest) {
      // Domain comprehensive test: select all questions from domain
      selectedQuestions = selectDomainComprehensiveQuestions(ALL_QUESTIONS, domainNumber)
    } else {
      // Comprehensive test for specific topic - filter by topicId
      selectedQuestions = ALL_QUESTIONS.filter(q => q.topicId === topicId)
    }
    
    // Shuffle answer options for each question
    const shuffledQuestions = selectedQuestions.map(q => shuffleQuestionOptions(q))
    setQuestions(shuffledQuestions)
    // Initialize question queue
    setQuestionQueue(Array.from({length: shuffledQuestions.length}, (_, i) => i))
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
    if (selectedAnswer === null || questionQueue.length === 0 || !currentQuestion || isTransitioning) return

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

    const newScore = correct ? score + 1 : score
    if (correct) {
      setScore(newScore)
    }

    // Record the answer
    setAnsweredQuestions(prev => [...prev, { question: currentQuestion, selectedAnswer, isCorrect: correct }])

    // Fade out, then advance to next question
    setIsTransitioning(true)
    setTimeout(() => {
      const newQueue = questionQueue.slice(1)
      setQuestionQueue(newQueue)
      setSelectedAnswer(null)
      setIsTransitioning(false)
      
      // Focus the question heading for keyboard/screen reader users
      setTimeout(() => {
        questionHeadingRef.current?.focus()
      }, 0)
      
      // Show results if queue is empty
      if (newQueue.length === 0) {
        const finalScore = newScore
        const percentage = Math.round((finalScore / totalQuestions) * 100)
        const testTypeLabel = isMockExam ? 'Mock Exam' : isQuickTest ? 'Quick Test' : isSuperQuickTest ? 'Super Quick Test' : isTopicQuickTest ? 'Topic Quick Test' : isDomainQuickTest ? 'Domain Quick Test' : isDomainComprehensiveTest ? 'Domain Comprehensive Test' : 'Topic Test'
        const totalTime = Math.round((Date.now() - testStartTimeRef.current) / 1000)
        
        testCompletionTimeRef.current = Date.now()
        
        // Track test completion
        trackEvent('Test Finished', {
          score: finalScore,
          totalQuestions,
          correctAnswers: finalScore,
          percentage,
          testType: testTypeLabel,
          topicId,
          timeTaken: totalTime,
          averageTimePerQuestion: Math.round(totalTime / totalQuestions),
          completedVia: 'answered'
        })
        
        // Update user profile
        incrementTestCount(percentage, testTypeLabel)
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
    }, 150)
  }

  const handleSkip = () => {
    if (questionQueue.length === 0 || isTransitioning) return
    
    const currentQuestionOriginalIndex = questionQueue[0]
    const hasBeenSkippedBefore = skippedQuestions.has(currentQuestionOriginalIndex)
    
    trackEvent('Test Question Skipped', {
      skipType: hasBeenSkippedBefore ? 'forfeit' : 'defer',
      questionNumber: totalQuestions - questionQueue.length + 1,
      totalQuestions,
    })
    
    // Fade out, then advance
    setIsTransitioning(true)
    setTimeout(() => {
      if (hasBeenSkippedBefore) {
        // Second skip = forfeit (mark as wrong, remove from queue)
        setAnsweredQuestions(prev => [...prev, { question: questions[currentQuestionOriginalIndex], selectedAnswer: null, isCorrect: false }])
        const newQueue = questionQueue.slice(1)
        setQuestionQueue(newQueue)
        setSelectedAnswer(null)
        setIsTransitioning(false)
        
        // Focus the question heading for keyboard/screen reader users
        setTimeout(() => {
          questionHeadingRef.current?.focus()
        }, 0)
        
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
            completedVia: 'forfeit'
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
        setIsTransitioning(false)
        
        // Focus the question heading for keyboard/screen reader users
        setTimeout(() => {
          questionHeadingRef.current?.focus()
        }, 0)
      }
    }, 150)
  }

  const handleRestart = () => {
    trackEvent('Test Restarted', {
      previousScore: score,
      totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100),
    })
    
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnsweredQuestions([])
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
    
    // Close modal and animate exit
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
  if (showResult) {
    return (
      <TestResultsScreen
        score={score}
        totalQuestions={totalQuestions}
        answeredQuestions={answeredQuestions}
        onRestart={handleRestart}
        onBack={() => animateExit(onBack)}
        isExiting={isExiting}
      />
    )
  }

  // Question screen - early return if no current question
  if (!currentQuestion) {
    return null
  }

  const questionsAnswered = totalQuestions - questionQueue.length
  const progress = totalQuestions > 0 ? (questionsAnswered / totalQuestions) * 100 : 0

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
      {/* Progress bar */}
      <div className="sticky top-0 z-20 h-4" style={{ backgroundColor: 'var(--progress-bar-track)' }}>
        <div
          className="h-full rounded-r-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%`, backgroundColor: 'var(--progress-bar-color)' }}
        />
      </div>
      <Container size="md" padding="md" className="py-6 md:py-8">
        {/* Question content with fade transition */}
        <div className={`transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex flex-row items-start gap-3 md:gap-4 mb-8">
          {/* End test button */}
          <div>
            <IconButton
              icon={<ArrowLeft size={20} />}
              aria-label="End test"
              variant="ghost"
              size="md"
              tooltip="End test"
              tooltipPosition="bottom"
              onClick={handleExitClick}
              data-tracking-id="test-end"
            />
          </div>

          {/* Question */}
          <div className="flex-1">
            <Text variant="small" className="text-gray-500 dark:text-gray-400 mb-2">
              Question {questions.length - questionQueue.length + 1} of {questions.length}
            </Text>
            <Heading as="h2" ref={questionHeadingRef} tabIndex={-1} className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 outline-none">
              {currentQuestion.question}
            </Heading>
          </div>
        </div>

        <TestQuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={(index) => trackAnswerSelection(index, questionQueue[0], answerHistory, setAnswerHistory, setSelectedAnswer)}
          onSubmit={handleSubmit}
          onSkip={handleSkip}
          skipButtonText={questionQueue.length === 1 || (questionQueue.length > 0 && skippedQuestions.has(questionQueue[0])) ? "Pass" : "Come back later"}
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
