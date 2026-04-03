import { ALL_QUESTIONS } from '../../data/questions'
import type { Question } from '../../data/questions'
import {
  selectMockExamQuestions,
  selectQuickTestQuestions,
  selectSuperQuickTestQuestions,
  selectTopicQuickTestQuestions,
  selectDomainQuickTestQuestions,
  shuffleQuestionOptions,
} from '../testQuestionSelection'

// Helpers to categorize questions by domain
function countByDomain(questions: Question[]) {
  const d1 = questions.filter(q => q.topicId.startsWith('1')).length
  const d2 = questions.filter(q => q.topicId.startsWith('2')).length
  const d3 = questions.filter(q => q.topicId.startsWith('3')).length
  return { d1, d2, d3 }
}

describe('selectMockExamQuestions', () => {
  it('returns exactly 80 questions', () => {
    const result = selectMockExamQuestions(ALL_QUESTIONS)
    expect(result).toHaveLength(80)
  })

  it('includes questions from all 3 domains', () => {
    const result = selectMockExamQuestions(ALL_QUESTIONS)
    const { d1, d2, d3 } = countByDomain(result)
    expect(d1).toBeGreaterThan(0)
    expect(d2).toBeGreaterThan(0)
    expect(d3).toBeGreaterThan(0)
  })

  it('follows approximate 40/40/20 distribution (32/32/16)', () => {
    const result = selectMockExamQuestions(ALL_QUESTIONS)
    const { d1, d2, d3 } = countByDomain(result)
    expect(d1).toBe(32)
    expect(d2).toBe(32)
    expect(d3).toBe(16)
  })

  it('returns all questions if fewer than 80 available', () => {
    const small = ALL_QUESTIONS.slice(0, 10)
    const result = selectMockExamQuestions(small)
    expect(result.length).toBeLessThanOrEqual(10)
  })
})

describe('selectQuickTestQuestions', () => {
  it('returns exactly 20 questions', () => {
    const result = selectQuickTestQuestions(ALL_QUESTIONS)
    expect(result).toHaveLength(20)
  })

  it('includes questions from all 3 domains', () => {
    const result = selectQuickTestQuestions(ALL_QUESTIONS)
    const { d1, d2, d3 } = countByDomain(result)
    expect(d1).toBeGreaterThan(0)
    expect(d2).toBeGreaterThan(0)
    expect(d3).toBeGreaterThan(0)
  })

  it('follows 40/40/20 distribution (8/8/4)', () => {
    const result = selectQuickTestQuestions(ALL_QUESTIONS)
    const { d1, d2, d3 } = countByDomain(result)
    expect(d1).toBe(8)
    expect(d2).toBe(8)
    expect(d3).toBe(4)
  })
})

describe('selectSuperQuickTestQuestions', () => {
  it('returns exactly 10 questions', () => {
    const result = selectSuperQuickTestQuestions(ALL_QUESTIONS)
    expect(result).toHaveLength(10)
  })

  it('includes questions from all 3 domains', () => {
    const result = selectSuperQuickTestQuestions(ALL_QUESTIONS)
    const { d1, d2, d3 } = countByDomain(result)
    expect(d1).toBeGreaterThan(0)
    expect(d2).toBeGreaterThan(0)
    expect(d3).toBeGreaterThan(0)
  })

  it('follows 40/40/20 distribution (4/4/2)', () => {
    const result = selectSuperQuickTestQuestions(ALL_QUESTIONS)
    const { d1, d2, d3 } = countByDomain(result)
    expect(d1).toBe(4)
    expect(d2).toBe(4)
    expect(d3).toBe(2)
  })
})

describe('selectTopicQuickTestQuestions', () => {
  const topicId = '1a-theoretical-models'

  it('returns at most 10 questions', () => {
    const result = selectTopicQuickTestQuestions(ALL_QUESTIONS, topicId)
    expect(result.length).toBeLessThanOrEqual(10)
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns only questions matching the specified topicId', () => {
    const result = selectTopicQuickTestQuestions(ALL_QUESTIONS, topicId)
    result.forEach(q => {
      expect(q.topicId).toBe(topicId)
    })
  })

  it('returns all questions when topic has fewer than 10', () => {
    const topicQuestions = ALL_QUESTIONS.filter(q => q.topicId === topicId)
    if (topicQuestions.length <= 10) {
      const result = selectTopicQuickTestQuestions(ALL_QUESTIONS, topicId)
      expect(result).toHaveLength(topicQuestions.length)
    }
  })
})

describe('selectDomainQuickTestQuestions', () => {
  it('returns exactly 10 questions', () => {
    const result = selectDomainQuickTestQuestions(ALL_QUESTIONS, '1')
    expect(result).toHaveLength(10)
  })

  it('returns only questions from the specified domain', () => {
    const result = selectDomainQuickTestQuestions(ALL_QUESTIONS, '2')
    result.forEach(q => {
      expect(q.topicId).toMatch(/^2/)
    })
  })

  it('works for domain 3', () => {
    const result = selectDomainQuickTestQuestions(ALL_QUESTIONS, '3')
    expect(result).toHaveLength(10)
    result.forEach(q => {
      expect(q.topicId).toMatch(/^3/)
    })
  })
})

describe('shuffleQuestionOptions', () => {
  const sampleQuestion: Question = {
    id: 'test-q1',
    topicId: '1a-theoretical-models',
    question: 'What is accessibility?',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: 0,
  }

  it('preserves all option text values', () => {
    const shuffled = shuffleQuestionOptions(sampleQuestion)
    expect([...shuffled.options].sort()).toEqual([...sampleQuestion.options].sort())
  })

  it('maintains correct answer mapping after shuffle', () => {
    const shuffled = shuffleQuestionOptions(sampleQuestion)
    // The correct answer text should still be the same regardless of new index
    const originalCorrectText = sampleQuestion.options[sampleQuestion.correctAnswer]
    const shuffledCorrectText = shuffled.options[shuffled.correctAnswer]
    expect(shuffledCorrectText).toBe(originalCorrectText)
  })

  it('does not mutate the original question', () => {
    const original = { ...sampleQuestion, options: [...sampleQuestion.options] }
    shuffleQuestionOptions(sampleQuestion)
    expect(sampleQuestion.options).toEqual(original.options)
    expect(sampleQuestion.correctAnswer).toBe(original.correctAnswer)
  })

  it('preserves all other question fields', () => {
    const shuffled = shuffleQuestionOptions(sampleQuestion)
    expect(shuffled.id).toBe(sampleQuestion.id)
    expect(shuffled.topicId).toBe(sampleQuestion.topicId)
    expect(shuffled.question).toBe(sampleQuestion.question)
  })
})

describe('proportional distribution across selection functions', () => {
  it('mock exam has roughly 40/40/20 split with +-2 tolerance', () => {
    const result = selectMockExamQuestions(ALL_QUESTIONS)
    const { d1, d2, d3 } = countByDomain(result)
    // Exact values are 32/32/16, but allow +-2 for robustness
    expect(d1).toBeGreaterThanOrEqual(30)
    expect(d1).toBeLessThanOrEqual(34)
    expect(d2).toBeGreaterThanOrEqual(30)
    expect(d2).toBeLessThanOrEqual(34)
    expect(d3).toBeGreaterThanOrEqual(14)
    expect(d3).toBeLessThanOrEqual(18)
  })

  it('quick test has roughly 40/40/20 split with +-2 tolerance', () => {
    const result = selectQuickTestQuestions(ALL_QUESTIONS)
    const { d1, d2, d3 } = countByDomain(result)
    expect(d1).toBeGreaterThanOrEqual(6)
    expect(d1).toBeLessThanOrEqual(10)
    expect(d2).toBeGreaterThanOrEqual(6)
    expect(d2).toBeLessThanOrEqual(10)
    expect(d3).toBeGreaterThanOrEqual(2)
    expect(d3).toBeLessThanOrEqual(6)
  })

  it('super quick test has roughly 40/40/20 split with +-2 tolerance', () => {
    const result = selectSuperQuickTestQuestions(ALL_QUESTIONS)
    const { d1, d2, d3 } = countByDomain(result)
    expect(d1).toBeGreaterThanOrEqual(2)
    expect(d1).toBeLessThanOrEqual(6)
    expect(d2).toBeGreaterThanOrEqual(2)
    expect(d2).toBeLessThanOrEqual(6)
    expect(d3).toBeGreaterThanOrEqual(0)
    expect(d3).toBeLessThanOrEqual(4)
  })
})
