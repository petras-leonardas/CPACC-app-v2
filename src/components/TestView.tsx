import { useState, useEffect } from 'react'
import { Button } from '@leo-designs/components'
import type { Question } from '../data/questions'

interface TestViewProps {
  topicId: string
  topicTitle: string
  onBack: () => void
}

export function TestView({ topicId, topicTitle: _topicTitle, onBack }: TestViewProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/questions?topicId=${topicId}`)
        const data = await response.json()
        
        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch questions')
        }
        
        setQuestions(data.questions)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load questions')
      } finally {
        setLoading(false)
      }
    }
    
    fetchQuestions()
  }, [topicId])

  const currentQuestion = questions[currentQuestionIndex]
  const totalQuestions = questions.length
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1

  const handleSubmit = () => {
    if (selectedAnswer === null) return

    // Check if answer is correct
    const correct = selectedAnswer === currentQuestion.correctAnswer
    setIsCorrect(correct)
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

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setShowFeedback(false)
    setScore(0)
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={onBack}
            className="mb-6 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            ← Back to Topics
          </button>
          <div className="bg-white rounded-lg border-2 border-gray-300 p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading questions...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={onBack}
            className="mb-6 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            ← Back to Topics
          </button>
          <div className="bg-white rounded-lg border-2 border-red-300 p-12 text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Questions</h1>
            <p className="text-gray-700 mb-6">{error}</p>
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
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={onBack}
            className="mb-6 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            ← Back to Topics
          </button>
          <div className="bg-white rounded-lg border-2 border-gray-300 p-12 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">No Questions Available</h1>
            <p className="text-gray-700 mb-6">There are no questions available for this topic yet.</p>
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
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-3xl mx-auto">
          {/* Back button */}
          <button
            onClick={onBack}
            className="mb-6 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            ← Back to Topics
          </button>

          <div className="bg-white rounded-lg border-2 border-gray-300 p-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Test Complete!</h1>
            <p className="text-6xl font-bold text-blue-600 mb-4">
              {score}/{totalQuestions}
            </p>
            <p className="text-xl text-gray-600 mb-8">
              You got {Math.round((score / totalQuestions) * 100)}% correct
            </p>
            
            <div className="flex gap-4 justify-center">
              <Button variant="primary" size="md" onClick={handleRestart}>
                Retry Test
              </Button>
              <Button variant="secondary" size="md" onClick={onBack}>
                Back to Topics
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Question screen
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-7xl mx-auto p-8">
        {/* Top bar with Back button and Question */}
        <div className="flex gap-4 mb-8">
          {/* Back button */}
          <button
            onClick={onBack}
            className="flex-shrink-0 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            ← Back
          </button>

          {/* Question */}
          <div className="flex-1 bg-white border-2 border-gray-300 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {currentQuestion.question}{' '}
              <span className="text-sm text-gray-400 font-normal">[{currentQuestion.id}]</span>
            </h2>
            {currentQuestion.subject && (
              <div className="mt-3">
                <span className="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full border border-gray-200">
                  {currentQuestion.subject}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-8 items-start">
          {/* Left side - Options */}
          <div className="flex-1">
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index
                const isCorrectAnswer = index === currentQuestion.correctAnswer
                const showCorrectMark = showFeedback && isCorrectAnswer
                const showWrongMark = showFeedback && isSelected && !isCorrectAnswer

                return (
                  <label
                    key={index}
                    className={`block w-full px-6 py-4 rounded-lg border-2 transition-all ${
                      showFeedback
                        ? isCorrectAnswer
                          ? 'bg-green-50 border-green-500 text-gray-900'
                          : isSelected
                          ? 'bg-red-50 border-red-500 text-gray-900'
                          : 'bg-white border-gray-300 text-gray-700'
                        : isSelected
                        ? 'bg-blue-50 border-blue-500 text-gray-900'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400 cursor-pointer'
                    } ${showFeedback ? 'cursor-default' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Radio button or icon indicator */}
                      {showFeedback ? (
                        <>
                          {showCorrectMark && (
                            <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                          {showWrongMark && (
                            <div className="flex-shrink-0 w-6 h-6 bg-red-600 rounded flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                          )}
                          {!showCorrectMark && !showWrongMark && (
                            <div className="flex-shrink-0 w-6 h-6" />
                          )}
                        </>
                      ) : (
                        <input
                          type="radio"
                          name="answer"
                          checked={isSelected}
                          onChange={() => setSelectedAnswer(index)}
                          className="flex-shrink-0 w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                        />
                      )}
                      <span className="flex-1">{option}</span>
                    </div>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Right side - Rationale */}
          <div className="w-96">
            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 min-h-[400px]">
              {showFeedback ? (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Explanation</h3>
                  <p className="text-gray-700 leading-relaxed">
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
                  <p className="text-gray-500 text-sm font-medium">
                    Submit your answer to reveal the explanation! 🎯
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 shadow-lg">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between gap-6">
          {/* Question counter */}
          <div className="flex-shrink-0 px-6 py-3 bg-gray-100 border-2 border-gray-300 rounded-lg">
            <span className="text-lg font-semibold text-gray-700">
              {currentQuestionIndex + 1}/{totalQuestions}
            </span>
          </div>

          {/* Feedback message (center) */}
          {showFeedback && (
            <div className={`flex-1 px-6 py-3 rounded-lg border-2 text-center font-semibold ${
              isCorrect 
                ? 'bg-green-100 border-green-500 text-green-800' 
                : 'bg-red-100 border-red-500 text-red-800'
            }`}>
              {isCorrect 
                ? '🎉 Correct! Well done!' 
                : '❌ Not quite right. Better luck next time!'}
            </div>
          )}

          {/* Submit/Next button */}
          <div className="flex-shrink-0">
            {!showFeedback ? (
              <Button
                variant="primary"
                size="md"
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
              >
                Submit →
              </Button>
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
    </div>
  )
}
