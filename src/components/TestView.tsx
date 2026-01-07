import { useState, useEffect } from 'react'
import type { Question } from '../data/questions'
import { MOCK_QUESTIONS } from '../data/mockQuestions'
import { Tooltip } from './Tooltip'

// Helper function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Helper function to shuffle answer options within a question and update correctAnswer index
function shuffleQuestionOptions(question: Question): Question {
  const optionsWithIndex = question.options.map((option, index) => ({ option, index }))
  const shuffled = shuffleArray(optionsWithIndex)
  
  // Find where the correct answer moved to
  const newCorrectAnswerIndex = shuffled.findIndex(item => item.index === question.correctAnswer)
  
  return {
    ...question,
    options: shuffled.map(item => item.option),
    correctAnswer: newCorrectAnswerIndex
  }
}

// Helper function to select mock exam questions proportionally from domains
function selectMockExamQuestions(allQuestions: Question[]): Question[] {
  // Separate questions by domain
  const domain1Questions = allQuestions.filter(q => q.topicId.startsWith('1'))
  const domain2Questions = allQuestions.filter(q => q.topicId.startsWith('2'))
  const domain3Questions = allQuestions.filter(q => q.topicId.startsWith('3'))
  
  // Calculate counts: 80 total, 40% D1, 40% D2, 20% D3
  const domain1Count = 32 // 40% of 80
  const domain2Count = 32 // 40% of 80
  const domain3Count = 16 // 20% of 80
  
  const selectedDomain1 = shuffleArray(domain1Questions).slice(0, Math.min(domain1Count, domain1Questions.length))
  const selectedDomain2 = shuffleArray(domain2Questions).slice(0, Math.min(domain2Count, domain2Questions.length))
  const selectedDomain3 = shuffleArray(domain3Questions).slice(0, Math.min(domain3Count, domain3Questions.length))
  
  // Combine and shuffle all selected questions
  const allSelected = [...selectedDomain1, ...selectedDomain2, ...selectedDomain3]
  return shuffleArray(allSelected)
}

// Helper function to select topic quick test questions (10 random from specific topic)
function selectTopicQuickTestQuestions(allQuestions: Question[], topicId: string): Question[] {
  // Filter questions for this specific topic
  const topicQuestions = allQuestions.filter(q => q.topicId === topicId)
  
  // Select 10 random questions (or all if fewer than 10)
  const shuffled = shuffleArray(topicQuestions)
  return shuffled.slice(0, Math.min(10, shuffled.length))
}

// Helper function to select domain quick test questions (10 random from all topics in domain)
function selectDomainQuickTestQuestions(allQuestions: Question[], domainNumber: string): Question[] {
  // Filter questions for all topics in this domain
  const domainQuestions = allQuestions.filter(q => q.topicId.startsWith(domainNumber))
  
  // Select 10 random questions (or all if fewer than 10)
  const shuffled = shuffleArray(domainQuestions)
  return shuffled.slice(0, Math.min(10, shuffled.length))
}

// Helper function to select all questions from a domain (comprehensive test)
function selectDomainComprehensiveQuestions(allQuestions: Question[], domainNumber: string): Question[] {
  // Filter and shuffle all questions for this domain
  const domainQuestions = allQuestions.filter(q => q.topicId.startsWith(domainNumber))
  return shuffleArray(domainQuestions)
}

// Helper function to select super quick test questions proportionally from domains
function selectSuperQuickTestQuestions(allQuestions: Question[]): Question[] {
  // Separate questions by domain
  const domain1Questions = allQuestions.filter(q => q.topicId.startsWith('1'))
  const domain2Questions = allQuestions.filter(q => q.topicId.startsWith('2'))
  const domain3Questions = allQuestions.filter(q => q.topicId.startsWith('3'))
  
  // Calculate counts: 10 total, 40% D1, 40% D2, 20% D3
  const domain1Count = 4 // 40% of 10
  const domain2Count = 4 // 40% of 10
  const domain3Count = 2 // 20% of 10
  
  const selectedDomain1 = shuffleArray(domain1Questions).slice(0, Math.min(domain1Count, domain1Questions.length))
  const selectedDomain2 = shuffleArray(domain2Questions).slice(0, Math.min(domain2Count, domain2Questions.length))
  const selectedDomain3 = shuffleArray(domain3Questions).slice(0, Math.min(domain3Count, domain3Questions.length))
  
  // Combine and shuffle all selected questions
  const allSelected = [...selectedDomain1, ...selectedDomain2, ...selectedDomain3]
  return shuffleArray(allSelected)
}

// Helper function to select quick test questions proportionally from domains
function selectQuickTestQuestions(allQuestions: Question[]): Question[] {
  // Separate questions by domain
  const domain1Questions = allQuestions.filter(q => q.topicId.startsWith('1'))
  const domain2Questions = allQuestions.filter(q => q.topicId.startsWith('2'))
  const domain3Questions = allQuestions.filter(q => q.topicId.startsWith('3'))
  
  // Calculate counts: 20 total, 40% D1, 40% D2, 20% D3
  const domain1Count = 8 // 40% of 20
  const domain2Count = 8 // 40% of 20
  const domain3Count = 4 // 20% of 20
  
  const selectedDomain1 = shuffleArray(domain1Questions).slice(0, Math.min(domain1Count, domain1Questions.length))
  const selectedDomain2 = shuffleArray(domain2Questions).slice(0, Math.min(domain2Count, domain2Questions.length))
  const selectedDomain3 = shuffleArray(domain3Questions).slice(0, Math.min(domain3Count, domain3Questions.length))
  
  // Combine and shuffle all selected questions
  const allSelected = [...selectedDomain1, ...selectedDomain2, ...selectedDomain3]
  return shuffleArray(allSelected)
}

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
  const [questionQueue, setQuestionQueue] = useState<number[]>([])

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true)
        setError(null)
        
        let allQuestions: Question[] = []
        
        if (isMockExam || isQuickTest || isSuperQuickTest || isTopicQuickTest || isDomainQuickTest || isDomainComprehensiveTest) {
          // For mock exam, quick test, super quick test, topic quick test, or domain tests, fetch questions from all domains
          const response = await fetch('/api/questions?topicId=all-topics')
          const data = await response.json()
          
          if (!data.success) {
            throw new Error(data.error || 'Failed to fetch questions')
          }
          
          allQuestions = data.questions
        } else {
          // For regular test, fetch questions for specific topic
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
        setPendingNavigation(() => callback)
        setShowExitModal(true)
      }
      onNavigationAttempt(interceptor)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const currentQuestion = questionQueue.length > 0 ? questions[questionQueue[0]] : null
  const totalQuestions = questions.length
  const isLastQuestion = questionQueue.length === 1

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

    // Check if answer is correct
    const correct = selectedAnswer === currentQuestion.correctAnswer
    setShowFeedback(true)

    if (correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (questionQueue.length === 0) return
    
    // Remove current question from queue
    const newQueue = questionQueue.slice(1)
    setQuestionQueue(newQueue)
    setSelectedAnswer(null)
    setShowFeedback(false)
    
    // Show results if queue is empty
    if (newQueue.length === 0) {
      setShowResult(true)
    }
  }

  const handleSkip = () => {
    if (questionQueue.length === 0) return
    
    const currentQuestionOriginalIndex = questionQueue[0]
    const hasBeenSkippedBefore = skippedQuestions.has(currentQuestionOriginalIndex)
    
    if (hasBeenSkippedBefore) {
      // Second skip = forfeit (mark as wrong, remove from queue)
      // Don't increment score - this counts as incorrect
      const newQueue = questionQueue.slice(1)
      setQuestionQueue(newQueue)
      setSelectedAnswer(null)
      setShowFeedback(false)
      
      // Show results if queue is empty
      if (newQueue.length === 0) {
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
    setSelectedAnswer(null)
    setShowResult(false)
    setShowFeedback(false)
    setScore(0)
    // Reset queue and skip tracking
    setQuestionQueue(Array.from({length: questions.length}, (_, i) => i))
    setSkippedQuestions(new Set())
  }

  const handleExitClick = () => {
    // Show confirmation modal instead of immediately exiting
    setPendingNavigation(null) // No pending navigation, just exit
    setShowExitModal(true)
  }

  const handleCancelExit = () => {
    // Close modal and continue test
    setShowExitModal(false)
    setPendingNavigation(null) // Clear pending navigation
  }

  const handleConfirmExit = () => {
    // Close modal and complete exit/navigation
    console.log('handleConfirmExit called')
    console.log('pendingNavigation:', pendingNavigation)
    console.log('onBack:', onBack)
    
    if (pendingNavigation) {
      // User was trying to navigate away - execute the pending navigation
      console.log('Executing pending navigation')
      setShowExitModal(false)
      pendingNavigation()
      setPendingNavigation(null)
    } else {
      // User clicked "End test" button - go back
      console.log('Calling onBack')
      setShowExitModal(false)
      // Use setTimeout to ensure modal closes before navigation
      setTimeout(() => {
        onBack()
      }, 0)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 pt-24">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={onBack}
            className="mb-6 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            ← Finish
          </button>
          <div className="bg-white rounded-lg border-2 border-gray-300 p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 dark:border-gray-100 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400">Loading questions...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 pt-24">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={onBack}
            className="mb-6 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            ← Finish
          </button>
          <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-red-300 dark:border-red-800 p-12 text-center">
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error Loading Questions</h1>
            <p className="text-gray-700 dark:text-gray-300 mb-6">{error}</p>
            <button
              onClick={onBack}
              className="px-4 md:px-6 py-2 md:py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium text-sm md:text-base"
            >
              Back to Topics
            </button>
          </div>
        </div>
      </div>
    )
  }

  // No questions found
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 pt-24">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={onBack}
            className="mb-6 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            ← Finish
          </button>
          <div className="bg-white rounded-lg border-2 border-gray-300 p-12 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">No Questions Available</h1>
            <p className="text-gray-700 dark:text-gray-300 mb-6">There are no questions available for this topic yet.</p>
            <button
              onClick={onBack}
              className="px-4 md:px-6 py-2 md:py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium text-sm md:text-base"
            >
              Back to Topics
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Results screen
  if (showResult) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 pt-24">
        <div className="max-w-3xl mx-auto">
          {/* Back button */}
          <button
            onClick={onBack}
            className="mb-6 px-6 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            ← Finish
          </button>

          <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-300 dark:border-gray-700 p-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Test Complete!</h1>
            <p className="text-6xl font-bold text-blue-600 mb-4">
              {score}/{totalQuestions}
            </p>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              You got {Math.round((score / totalQuestions) * 100)}% correct
            </p>
            
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleRestart}
                className="px-4 md:px-6 py-2 md:py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium text-sm md:text-base"
              >
                Retry Test
              </button>
              <button
                onClick={onBack}
                className="px-4 md:px-6 py-2 md:py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium text-sm md:text-base"
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Question screen - early return if no current question
  if (!currentQuestion) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-24 pt-6">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-8">
        {/* Top bar with Back button and Question */}
        <div className="flex flex-row items-start gap-3 md:gap-4 mb-8">
          {/* End test button */}
          <div>
            <Tooltip content="End test" position="bottom">
              <button
                onClick={handleExitClick}
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
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {currentQuestion.question}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Select one answer
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Left side - Options */}
          <div className="flex-1 w-full">
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index
                const isCorrectAnswer = index === currentQuestion.correctAnswer
                const showCorrectMark = showFeedback && isCorrectAnswer
                const showWrongMark = showFeedback && isSelected && !isCorrectAnswer

                // After feedback, only show: correct answer + selected wrong answer (if applicable)
                if (showFeedback) {
                  const shouldShow = isCorrectAnswer || isSelected
                  if (!shouldShow) return null
                }

                return (
                  <label
                    key={index}
                    className={`block w-full px-4 md:px-6 py-3 md:py-4 rounded-lg border-2 transition-all ${
                      showFeedback
                        ? isCorrectAnswer
                          ? 'bg-green-50 dark:bg-green-950 border-green-500 dark:border-green-600 text-gray-900 dark:text-gray-100 cursor-default'
                          : 'bg-red-50 dark:bg-red-950 border-red-500 dark:border-red-600 text-gray-900 dark:text-gray-100 cursor-default'
                        : isSelected
                        ? 'bg-blue-50 dark:bg-blue-950 border-blue-500 dark:border-blue-600 text-gray-900 dark:text-gray-100'
                        : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600 cursor-pointer'
                    }`}
                    role={showFeedback ? 'status' : undefined}
                    aria-label={showFeedback ? (isCorrectAnswer ? 'Correct answer' : 'Your incorrect answer') : undefined}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon indicator */}
                      {showFeedback ? (
                        <div className="flex-shrink-0 pt-1">
                          {showCorrectMark && (
                            <div className="w-6 h-6 bg-green-600 dark:bg-green-500 rounded flex items-center justify-center" aria-hidden="true">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                          {showWrongMark && (
                            <div className="w-6 h-6 bg-red-600 dark:bg-red-500 rounded flex items-center justify-center" aria-hidden="true">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                          )}
                        </div>
                      ) : (
                        <input
                          type="radio"
                          name="answer"
                          checked={isSelected}
                          onChange={() => setSelectedAnswer(index)}
                          className="flex-shrink-0 w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer mt-0.5"
                        />
                      )}
                      
                      {/* Answer content with label above */}
                      <div className="flex-1">
                        {showFeedback && (
                          <div className="mb-2">
                            {showCorrectMark && (
                              <span className="text-sm font-medium text-green-800 dark:text-green-300">Correct answer</span>
                            )}
                            {showWrongMark && (
                              <span className="text-sm font-medium text-red-800 dark:text-red-300">Incorrect answer</span>
                            )}
                          </div>
                        )}
                        <span>{option}</span>
                      </div>
                    </div>
                  </label>
                )
              })}
            </div>

            {/* Desktop only: Submit/Next button below options */}
            <div className="hidden md:block mt-6">
              {!showFeedback ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-2 border-transparent rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Answer →
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-2 border-transparent rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium"
                >
                  {isLastQuestion ? 'Finish →' : 'Next Question →'}
                </button>
              )}
            </div>
          </div>

          {/* Right side - Rationale */}
          <div className="w-full lg:w-96">
            <div className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-lg p-4 md:p-6 min-h-[300px] lg:min-h-[400px]">
              {showFeedback ? (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Explanation</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {currentQuestion.explanation || 'No explanation available for this question.'}
                  </p>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-8">
                  <div className="mb-4 relative">
                    <svg width="120" height="120" viewBox="0 0 120 120" className="text-gray-300">
                      <path
                        d="M 60 20 Q 45 20 35 35 Q 25 50 35 60"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 35 60 Q 40 65 50 65 L 50 75"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="50"
                        cy="90"
                        r="4"
                        fill="currentColor"
                      />
                      <circle cx="85" cy="30" r="3" fill="currentColor" />
                      <circle cx="25" cy="45" r="2" fill="currentColor" />
                      <circle cx="75" cy="85" r="2" fill="currentColor" />
                    </svg>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                    Submit your answer to reveal the explanation! 🎯
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t-2 border-gray-300 dark:border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-row items-center justify-between gap-3">
          {/* Question counter */}
          <div className="flex-shrink-0">
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Question {totalQuestions - questionQueue.length + 1} of {totalQuestions}
            </span>
          </div>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Desktop: Skip button (always visible, disabled after feedback) */}
          <div className="hidden md:flex flex-shrink-0">
            <button
              onClick={handleSkip}
              disabled={showFeedback}
              className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:underline transition-colors font-medium disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-600 dark:disabled:hover:text-gray-400 disabled:no-underline"
            >
              {questionQueue.length === 1 || (questionQueue.length > 0 && skippedQuestions.has(questionQueue[0])) ? "I don't know" : "Skip Question"}
            </button>
          </div>

          {/* Mobile: Skip and Submit/Next buttons (all states) */}
          <div className="md:hidden flex-shrink-0 flex gap-2">
            <button
              onClick={handleSkip}
              disabled={showFeedback}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:underline transition-colors font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-600 dark:disabled:hover:text-gray-400 disabled:no-underline"
            >
              {questionQueue.length === 1 || (questionQueue.length > 0 && skippedQuestions.has(questionQueue[0])) ? "I don't know" : "Skip"}
            </button>
            {!showFeedback ? (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-2 border-transparent rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit →
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-2 border-transparent rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium text-sm"
              >
                {isLastQuestion ? 'Finish →' : 'Next →'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          onClick={(e) => {
            // Only close if clicking the overlay, not the modal content
            if (e.target === e.currentTarget) {
              handleCancelExit()
            }
          }}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">End test?</h3>
              <button
                onClick={handleCancelExit}
                className="flex-shrink-0 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                aria-label="Close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 dark:text-gray-400">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Are you sure you want to end this test? Your progress will be lost.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">You have {questionQueue.length} {questionQueue.length === 1 ? 'question' : 'questions'} remaining.</span>
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col-reverse sm:flex-row gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleCancelExit()
                }}
                className="flex-1 px-6 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log('End test button clicked!')
                  handleConfirmExit()
                }}
                className="flex-1 px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium"
              >
                End test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
