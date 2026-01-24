import type { Question } from '../data/questions'

/**
 * Shuffle an array using Fisher-Yates algorithm
 * @param array - Array to shuffle
 * @returns New shuffled array (does not mutate original)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Shuffle answer options within a question and update correctAnswer index
 * @param question - Question to shuffle
 * @returns New question with shuffled options
 */
export function shuffleQuestionOptions(question: Question): Question {
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

/**
 * Select mock exam questions proportionally from domains
 * Distribution: 80 total (40% D1, 40% D2, 20% D3)
 * @param allQuestions - All available questions
 * @returns 80 selected questions
 */
export function selectMockExamQuestions(allQuestions: Question[]): Question[] {
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

/**
 * Select quick test questions proportionally from domains
 * Distribution: 20 total (40% D1, 40% D2, 20% D3)
 * @param allQuestions - All available questions
 * @returns 20 selected questions
 */
export function selectQuickTestQuestions(allQuestions: Question[]): Question[] {
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

/**
 * Select super quick test questions proportionally from domains
 * Distribution: 10 total (40% D1, 40% D2, 20% D3)
 * @param allQuestions - All available questions
 * @returns 10 selected questions
 */
export function selectSuperQuickTestQuestions(allQuestions: Question[]): Question[] {
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

/**
 * Select topic quick test questions (10 random from specific topic)
 * @param allQuestions - All available questions
 * @param topicId - Specific topic ID
 * @returns Up to 10 random questions from topic
 */
export function selectTopicQuickTestQuestions(allQuestions: Question[], topicId: string): Question[] {
  // Filter questions for this specific topic
  const topicQuestions = allQuestions.filter(q => q.topicId === topicId)
  
  // Select 10 random questions (or all if fewer than 10)
  const shuffled = shuffleArray(topicQuestions)
  return shuffled.slice(0, Math.min(10, shuffled.length))
}

/**
 * Select domain quick test questions (10 random from all topics in domain)
 * @param allQuestions - All available questions
 * @param domainNumber - Domain number (e.g., '1', '2', '3')
 * @returns Up to 10 random questions from domain
 */
export function selectDomainQuickTestQuestions(allQuestions: Question[], domainNumber: string): Question[] {
  // Filter questions for all topics in this domain
  const domainQuestions = allQuestions.filter(q => q.topicId.startsWith(domainNumber))
  
  // Select 10 random questions (or all if fewer than 10)
  const shuffled = shuffleArray(domainQuestions)
  return shuffled.slice(0, Math.min(10, shuffled.length))
}

/**
 * Select all questions from a domain (comprehensive test)
 * @param allQuestions - All available questions
 * @param domainNumber - Domain number (e.g., '1', '2', '3')
 * @returns All questions from domain, shuffled
 */
export function selectDomainComprehensiveQuestions(allQuestions: Question[], domainNumber: string): Question[] {
  // Filter and shuffle all questions for this domain
  const domainQuestions = allQuestions.filter(q => q.topicId.startsWith(domainNumber))
  return shuffleArray(domainQuestions)
}
