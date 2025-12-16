import { useState, useEffect } from 'react'
import { Button } from '@leo-designs/components'
import type { Question } from '../data/questions'
import { MOCK_QUESTIONS } from '../data/mockQuestions'

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
  
  // Shuffle and select questions from each domain
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }
  
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
}

export function TestView({ topicId, topicTitle: _topicTitle, onBack, onNavigationAttempt, isMockExam = false }: TestViewProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [showExitModal, setShowExitModal] = useState(false)
  const [pendingNavigation, setPendingNavigation] = useState<(() => void) | null>(null)

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true)
        setError(null)
        
        let allQuestions: Question[] = []
        
        if (isMockExam) {
          // For mock exam, fetch questions from all domains
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
          setQuestions(selectedQuestions)
        } else {
          setQuestions(allQuestions)
        }
      } catch {
        console.log('API unavailable, using mock questions for development')
        
        if (isMockExam) {
          // For mock exam with fallback, select proportionally from all mock questions
          const selectedQuestions = selectMockExamQuestions(MOCK_QUESTIONS)
          setQuestions(selectedQuestions)
        } else {
          // Use mock questions for local development
          setQuestions(MOCK_QUESTIONS)
        }
        setError(null) // Clear error since we have fallback data
      } finally {
        setLoading(false)
      }
    }
    
    fetchQuestions()
  }, [topicId, isMockExam])

  // Scroll to top when question changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentQuestionIndex])

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

  const currentQuestion = questions[currentQuestionIndex]
  const totalQuestions = questions.length
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1

  const handleSubmit = () => {
    if (selectedAnswer === null) return

    // Check if answer is correct
    const correct = selectedAnswer === currentQuestion.correctAnswer
    setShowFeedback(true)

    if (correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    // Move to next question or show results
    if (isLastQuestion) {
      setShowResult(true)
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    }
  }

  const handleSkip = () => {
    // Treat skipped question as incorrect (don't increment score)
    // Move directly to next question without showing feedback
    if (isLastQuestion) {
      setShowResult(true)
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setShowFeedback(false)
    setScore(0)
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
            <Button variant="primary" size="md" onClick={onBack}>
              Back to Topics
            </Button>
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
            <Button variant="primary" size="md" onClick={onBack}>
              Back to Topics
            </Button>
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
              <Button variant="primary" size="md" onClick={handleRestart}>
                Retry Test
              </Button>
              <Button variant="secondary" size="md" onClick={onBack}>
                Finish
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Question screen
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-24 pt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-8">
        {/* Top bar with Back button and Question */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* End test button */}
          <button
            onClick={handleExitClick}
            className="flex-shrink-0 px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-colors font-medium w-full md:w-auto"
          >
            End test
          </button>

          {/* Question */}
          <div className="flex-1 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-lg p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
              {currentQuestion.question}{' '}
              <span className="text-sm text-gray-400 dark:text-gray-500 font-normal">[{currentQuestion.id}]</span>
            </h2>
            {currentQuestion.subject && (
              <div className="mt-3">
                <span className="inline-block px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-600">
                  {currentQuestion.subject}
                </span>
              </div>
            )}
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
                        className="animate-pulse"
                      />
                      <path
                        d="M 35 60 Q 40 65 50 65 L 50 75"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        className="animate-pulse"
                        style={{ animationDelay: '0.1s' }}
                      />
                      <circle
                        cx="50"
                        cy="90"
                        r="4"
                        fill="currentColor"
                        className="animate-pulse"
                        style={{ animationDelay: '0.2s' }}
                      />
                      <circle cx="85" cy="30" r="3" fill="currentColor" className="animate-ping" style={{ animationDuration: '2s' }} />
                      <circle cx="25" cy="45" r="2" fill="currentColor" className="animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.3s' }} />
                      <circle cx="75" cy="85" r="2" fill="currentColor" className="animate-ping" style={{ animationDuration: '2.2s', animationDelay: '0.6s' }} />
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
          <div className="flex-shrink-0 px-4 md:px-6 py-2 md:py-3 bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-lg text-left">
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              {currentQuestionIndex + 1}/{totalQuestions}
            </span>
          </div>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Skip and Submit/Next buttons */}
          <div className="flex-shrink-0 flex gap-2 md:gap-3">
            {!showFeedback ? (
              <>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={handleSkip}
                >
                  Skip
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                >
                  Submit →
                </Button>
              </>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={handleNext}
              >
                {isLastQuestion ? 'Finish →' : 'Next →'}
              </Button>
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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">End Test?</h3>
              <button
                onClick={handleCancelExit}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Are you sure you want to end this test? Your progress will be lost.
              </p>
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-900 dark:text-blue-200">
                  {(() => {
                    const remaining = totalQuestions - (currentQuestionIndex + 1)
                    return (
                      <>
                        <span className="font-semibold">You have {remaining} {remaining === 1 ? 'question' : 'questions'} remaining.</span>
                        {' '}Keep going to complete the test!
                      </>
                    )
                  })()}
                </p>
              </div>
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
                className="flex-1 px-6 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium"
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
                className="flex-1 px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium"
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
