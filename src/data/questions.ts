export interface Question {
  id: string
  topicId: string
  question: string
  options: string[]
  correctAnswer: number // index of correct option (0-3)
  explanation?: string
  subject?: string
}

// Sample questions for demonstration
export const sampleQuestions: Question[] = [
  {
    id: 'q1',
    topicId: 'theoretical-models',
    question: 'Which model of disability focuses on the person\'s impairment as the primary problem?',
    options: [
      'Medical model',
      'Social model',
      'Biopsychosocial model',
      'Human rights model'
    ],
    correctAnswer: 0,
    explanation: 'The medical model views disability as a problem of the person, directly caused by disease, trauma, or other health condition.'
  },
  {
    id: 'q2',
    topicId: 'theoretical-models',
    question: 'The social model of disability emphasizes that disability is caused by:',
    options: [
      'Individual health conditions',
      'Societal barriers and attitudes',
      'Genetic factors',
      'Lack of medical treatment'
    ],
    correctAnswer: 1,
    explanation: 'The social model shifts focus from individual limitations to societal barriers that disable people.'
  },
  {
    id: 'q3',
    topicId: 'wcag-principles',
    question: 'What does the "P" in POUR stand for in WCAG principles?',
    options: [
      'Practical',
      'Perceivable',
      'Portable',
      'Permanent'
    ],
    correctAnswer: 1,
    explanation: 'POUR stands for Perceivable, Operable, Understandable, and Robust.'
  },
  {
    id: 'q4',
    topicId: 'wcag-principles',
    question: 'Which WCAG principle addresses the need for content to work with current and future technologies?',
    options: [
      'Perceivable',
      'Operable',
      'Understandable',
      'Robust'
    ],
    correctAnswer: 3,
    explanation: 'Robust content must be compatible with current and future user tools, including assistive technologies.'
  },
  {
    id: 'q5',
    topicId: 'categories-characteristics',
    question: 'Which of the following is an example of an environmental barrier?',
    options: [
      'Visual impairment',
      'Lack of wheelchair ramps',
      'Hearing loss',
      'Cognitive disability'
    ],
    correctAnswer: 1,
    explanation: 'Environmental barriers are external obstacles in the physical or digital environment that prevent access.'
  },
  {
    id: 'q6',
    topicId: 'assistive-technologies',
    question: 'Which assistive technology is primarily used by people who are blind?',
    options: [
      'Hearing aids',
      'Screen readers',
      'Mobility scooters',
      'Voice recognition software'
    ],
    correctAnswer: 1,
    explanation: 'Screen readers convert digital text into synthesized speech or refreshable braille for blind users.'
  },
  {
    id: 'q7',
    topicId: 'universal-design-principles',
    question: 'How many principles of universal design are there?',
    options: [
      'Five',
      'Six',
      'Seven',
      'Eight'
    ],
    correctAnswer: 2,
    explanation: 'There are seven principles of universal design, developed by the Center for Universal Design at NC State University.'
  },
  {
    id: 'q8',
    topicId: 'benefits-accessibility',
    question: 'Which is NOT a benefit of implementing accessibility?',
    options: [
      'Improved SEO',
      'Larger potential audience',
      'Increased development costs only',
      'Better usability for everyone'
    ],
    correctAnswer: 2,
    explanation: 'While accessibility may require initial investment, it provides numerous benefits and is not solely a cost.'
  },
  {
    id: 'q9',
    topicId: 'international-conventions',
    question: 'The UN Convention on the Rights of Persons with Disabilities was adopted in which year?',
    options: [
      '1990',
      '2000',
      '2006',
      '2010'
    ],
    correctAnswer: 2,
    explanation: 'The CRPD was adopted by the UN General Assembly in 2006 and entered into force in 2008.'
  },
  {
    id: 'q10',
    topicId: 'disability-etiquette',
    question: 'When communicating with a person who uses a wheelchair, you should:',
    options: [
      'Stand above them to show authority',
      'Lean on their wheelchair',
      'Position yourself at eye level when possible',
      'Speak loudly and slowly'
    ],
    correctAnswer: 2,
    explanation: 'Positioning yourself at eye level shows respect and makes communication more comfortable and natural.'
  }
]

// Function to get questions for a specific topic or all topics
export function getQuestionsForTopic(topicId: string): Question[] {
  if (topicId === 'all-topics') {
    return sampleQuestions
  }
  return sampleQuestions.filter(q => q.topicId === topicId)
}
