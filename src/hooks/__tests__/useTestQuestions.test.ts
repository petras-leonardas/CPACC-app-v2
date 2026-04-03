import { renderHook, act } from '@testing-library/react'
import { useTestQuestions } from '../useTestQuestions'
import type { TestType } from '../../components/TestView'

// Mock analytics -- these fire during hook operations but we don't need to verify them here
vi.mock('../../utils/analytics', () => ({
  trackEvent: vi.fn(),
}))

vi.mock('../../utils/analyticsHelpers', () => ({
  incrementTestCount: vi.fn(),
  addTestToSession: vi.fn(),
  saveTestScore: vi.fn(),
  getTestHistory: vi.fn(() => null),
}))

describe('useTestQuestions', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    localStorage.clear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  function renderTestQuestions(overrides?: Partial<{ topicId: string; testType: TestType; domainNumber: string }>) {
    return renderHook(() =>
      useTestQuestions({
        topicId: '1a-theoretical-models',
        testType: 'topic-quick',
        domainNumber: '1',
        ...overrides,
      })
    )
  }

  describe('question loading', () => {
    it('loads questions and sets loading to false', () => {
      const { result } = renderTestQuestions()
      expect(result.current.loading).toBe(false)
      expect(result.current.questions.length).toBeGreaterThan(0)
    })

    it('loads topic-quick questions (max 10)', () => {
      const { result } = renderTestQuestions({ testType: 'topic-quick' })
      expect(result.current.totalQuestions).toBeLessThanOrEqual(10)
      expect(result.current.totalQuestions).toBeGreaterThan(0)
    })

    it('loads mock-exam questions (80)', () => {
      const { result } = renderTestQuestions({ testType: 'mock-exam' })
      expect(result.current.totalQuestions).toBe(80)
    })

    it('loads super-quick-test questions (10)', () => {
      const { result } = renderTestQuestions({ testType: 'super-quick-test' })
      expect(result.current.totalQuestions).toBe(10)
    })

    it('filters topic-test questions by topicId', () => {
      const { result } = renderTestQuestions({ testType: 'topic-test', topicId: '1a-theoretical-models' })
      for (const q of result.current.questions) {
        expect(q.topicId).toBe('1a-theoretical-models')
      }
    })
  })

  describe('initial state', () => {
    it('starts at question index 0', () => {
      const { result } = renderTestQuestions()
      expect(result.current.currentQuestionIndex).toBe(0)
      expect(result.current.activeQuestionIndex).toBe(0)
    })

    it('has no selected answer', () => {
      const { result } = renderTestQuestions()
      expect(result.current.selectedAnswer).toBeNull()
    })

    it('has empty answers map', () => {
      const { result } = renderTestQuestions()
      expect(result.current.answers.size).toBe(0)
    })

    it('is not in review or result mode', () => {
      const { result } = renderTestQuestions()
      expect(result.current.showReview).toBe(false)
      expect(result.current.showResult).toBe(false)
      expect(result.current.reviewingIndex).toBeNull()
      expect(result.current.finalResults).toBeNull()
    })

    it('has a current question', () => {
      const { result } = renderTestQuestions()
      expect(result.current.currentQuestion).not.toBeNull()
      expect(result.current.currentQuestion?.question).toBeTruthy()
    })
  })

  describe('answer submission', () => {
    it('does nothing when no answer is selected', () => {
      const { result } = renderTestQuestions()
      act(() => {
        result.current.handleSubmit()
      })
      // Should still be on question 0
      expect(result.current.currentQuestionIndex).toBe(0)
      expect(result.current.answers.size).toBe(0)
    })

    it('records the answer and transitions to next question', () => {
      const { result } = renderTestQuestions()

      // Select an answer
      act(() => {
        result.current.setSelectedAnswer(0)
      })
      expect(result.current.selectedAnswer).toBe(0)

      // Submit
      act(() => {
        result.current.handleSubmit()
      })

      // Answer should be recorded
      expect(result.current.answers.get(0)).toBe(0)
      expect(result.current.isTransitioning).toBe(true)

      // After transition timeout, should advance
      act(() => {
        vi.advanceTimersByTime(200)
      })

      expect(result.current.currentQuestionIndex).toBe(1)
      expect(result.current.selectedAnswer).toBeNull()
      expect(result.current.isTransitioning).toBe(false)
    })
  })

  describe('skip', () => {
    it('marks question as skipped (null) and advances', () => {
      const { result } = renderTestQuestions()

      act(() => {
        result.current.handleSkip()
      })

      expect(result.current.answers.get(0)).toBeNull()
      expect(result.current.isTransitioning).toBe(true)

      act(() => {
        vi.advanceTimersByTime(200)
      })

      expect(result.current.currentQuestionIndex).toBe(1)
    })
  })

  describe('review flow', () => {
    it('shows review screen after answering all questions', () => {
      const { result } = renderTestQuestions({ testType: 'super-quick-test' })
      const total = result.current.totalQuestions

      // Answer every question
      for (let i = 0; i < total; i++) {
        act(() => { result.current.setSelectedAnswer(0) })
        act(() => { result.current.handleSubmit() })
        act(() => { vi.advanceTimersByTime(200) })
      }

      expect(result.current.showReview).toBe(true)
    })

    it('handleReviewQuestion navigates to that question', () => {
      const { result } = renderTestQuestions({ testType: 'super-quick-test' })
      const total = result.current.totalQuestions

      // Skip all to get to review
      for (let i = 0; i < total; i++) {
        act(() => { result.current.handleSkip() })
        act(() => { vi.advanceTimersByTime(200) })
      }
      expect(result.current.showReview).toBe(true)

      // Review question 3
      act(() => { result.current.handleReviewQuestion(2) })
      expect(result.current.reviewingIndex).toBe(2)
      expect(result.current.activeQuestionIndex).toBe(2)
      expect(result.current.showReview).toBe(false)
    })

    it('handleBackToReview returns to review screen', () => {
      const { result } = renderTestQuestions({ testType: 'super-quick-test' })
      const total = result.current.totalQuestions

      // Skip all, enter review, then review a question
      for (let i = 0; i < total; i++) {
        act(() => { result.current.handleSkip() })
        act(() => { vi.advanceTimersByTime(200) })
      }
      act(() => { result.current.handleReviewQuestion(0) })
      expect(result.current.showReview).toBe(false)

      act(() => { result.current.handleBackToReview() })
      expect(result.current.showReview).toBe(true)
      expect(result.current.reviewingIndex).toBeNull()
    })
  })

  describe('test submission', () => {
    it('calculates score correctly', () => {
      const { result } = renderTestQuestions({ testType: 'super-quick-test' })
      const total = result.current.totalQuestions

      // Answer all with the correct answer
      for (let i = 0; i < total; i++) {
        const correctAnswer = result.current.currentQuestion!.correctAnswer
        act(() => { result.current.setSelectedAnswer(correctAnswer) })
        act(() => { result.current.handleSubmit() })
        act(() => { vi.advanceTimersByTime(200) })
      }

      // Submit from review
      act(() => { result.current.handleSubmitTest() })

      expect(result.current.showResult).toBe(true)
      expect(result.current.finalResults).not.toBeNull()
      expect(result.current.finalResults!.score).toBe(total)
      expect(result.current.finalResults!.answeredQuestions).toHaveLength(total)
    })

    it('counts skipped questions as incorrect', () => {
      const { result } = renderTestQuestions({ testType: 'super-quick-test' })
      const total = result.current.totalQuestions

      // Skip all questions
      for (let i = 0; i < total; i++) {
        act(() => { result.current.handleSkip() })
        act(() => { vi.advanceTimersByTime(200) })
      }

      act(() => { result.current.handleSubmitTest() })

      expect(result.current.finalResults!.score).toBe(0)
      const skipped = result.current.finalResults!.answeredQuestions.filter(
        q => q.selectedAnswer === null
      )
      expect(skipped.length).toBe(total)
    })
  })

  describe('restart', () => {
    it('resets all state to initial values', () => {
      const { result } = renderTestQuestions({ testType: 'super-quick-test' })
      const total = result.current.totalQuestions

      // Complete a test
      for (let i = 0; i < total; i++) {
        act(() => { result.current.setSelectedAnswer(0) })
        act(() => { result.current.handleSubmit() })
        act(() => { vi.advanceTimersByTime(200) })
      }
      act(() => { result.current.handleSubmitTest() })
      expect(result.current.showResult).toBe(true)

      // Restart
      act(() => { result.current.handleRestart() })

      expect(result.current.showResult).toBe(false)
      expect(result.current.showReview).toBe(false)
      expect(result.current.currentQuestionIndex).toBe(0)
      expect(result.current.selectedAnswer).toBeNull()
      expect(result.current.answers.size).toBe(0)
      expect(result.current.finalResults).toBeNull()
    })
  })
})
