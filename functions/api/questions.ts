// @ts-ignore - Cloudflare Workers types
interface Env {
  DB: any // D1Database
}

interface DBCard {
  ID: number
  domain_category: string
  domain_category_name: string
  'domain_sub-category': string
  'domain_sub-category_name': string
  subject: string
  question: string
  correct_answer: string
  false_answer_1: string
  false_answer_2: string
  false_answer_3: string
  rationale: string
}

interface Question {
  id: string
  topicId: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

// Function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Convert database card to question format
function convertCardToQuestion(card: DBCard): Question {
  // Create options array with all answers
  const allOptions = [
    card.correct_answer,
    card.false_answer_1,
    card.false_answer_2,
    card.false_answer_3
  ]
  
  // Shuffle options
  const shuffledOptions = shuffleArray(allOptions)
  
  // Find the new index of the correct answer
  const correctAnswerIndex = shuffledOptions.indexOf(card.correct_answer)
  
  // Create a topic ID from domain_sub-category
  const topicId = card['domain_sub-category'].toLowerCase().replace(/\s+/g, '-')
  
  return {
    id: `q${card.ID}`,
    topicId: topicId,
    question: card.question,
    options: shuffledOptions,
    correctAnswer: correctAnswerIndex,
    explanation: card.rationale,
    subject: card.subject
  }
}

// Map app topic IDs to database sub-category codes
const topicToSubCategoryMap: Record<string, string> = {
  'theoretical-models': '1A',
  'wcag-principles': '1B',
  'categories-characteristics': '1C',
  'assistive-technologies': '1D',
  'universal-design-principles': '1E',
  'benefits-accessibility': '2A',
  'international-conventions': '3A',
  'disability-etiquette': '4A',
  // Add more mappings as needed
}

// Mock data for local development when D1 is not available
const getMockQuestions = (): DBCard[] => [
  {
    ID: 101,
    domain_category: 'Domain 1',
    domain_category_name: 'Disabilities, challenges, and assistive technologies (40%)',
    'domain_sub-category': '1A',
    'domain_sub-category_name': 'Theoretical models of disability',
    subject: 'Purpose of disability models',
    question: 'What is the purpose of theoretical models of disability?',
    correct_answer: 'Theoretical models of disability provide perspectives and frameworks for understanding disability, with each model offering partial insights and limitations, so organizations often draw from multiple models.',
    false_answer_1: 'Theoretical models of disability determine which single, correct definition of disability should guide all accessibility practices across organizations.',
    false_answer_2: 'Theoretical models of disability classify disabilities strictly by medical categories to support treatment-oriented interventions.',
    false_answer_3: 'Theoretical models of disability are designed primarily to measure economic productivity impacts related to impairment.',
    rationale: 'Theoretical models offer perspectives and frameworks. No single model is complete, so organizations typically use multiple models.'
  },
  {
    ID: 102,
    domain_category: 'Domain 1',
    domain_category_name: 'Disabilities, challenges, and assistive technologies (40%)',
    'domain_sub-category': '1A',
    'domain_sub-category_name': 'Theoretical models of disability',
    subject: 'Medical model',
    question: 'How does the medical model view disability?',
    correct_answer: 'The medical model views disability as an individual problem caused by disease, trauma, or other health conditions that require medical care, cure, or personal adjustment.',
    false_answer_1: 'The medical model views disability as primarily the result of societal barriers that restrict participation.',
    false_answer_2: 'The medical model views disability mainly as a cultural identity rooted in shared experiences.',
    false_answer_3: 'The medical model views disability as a condition defined by reduced economic productivity.',
    rationale: 'The medical model emphasizes impairment, treatment, and cure as central to understanding disability.'
  }
]

export const onRequestGet = async (context: { request: Request; env: Env }) => {
  try {
    const { searchParams } = new URL(context.request.url)
    const topicId = searchParams.get('topicId')
    const limitParam = searchParams.get('limit')
    const limit = limitParam ? parseInt(limitParam) : null
    
    let dbResults: DBCard[] = []
    
    // Try to query D1 database
    if (context.env.DB) {
      try {
        let query = 'SELECT * FROM cards_v2'
        const params: string[] = []
        
        // Filter by topic if provided
        if (topicId && topicId !== 'all-topics') {
          const subCategory = topicToSubCategoryMap[topicId]
          
          if (subCategory) {
            query += ' WHERE "domain_sub-category" = ?'
            params.push(subCategory)
          }
        }
        
        query += ' ORDER BY RANDOM()'
        
        // Only add LIMIT if explicitly requested
        if (limit !== null) {
          query += ' LIMIT ?'
          params.push(limit.toString())
        }
        
        const { results } = await context.env.DB.prepare(query)
          .bind(...params)
          .all()
        
        dbResults = results as DBCard[]
      } catch (dbError) {
        console.warn('D1 query failed, using mock data:', dbError)
        dbResults = []
      }
    }
    
    // Fallback to mock data if no results from DB
    if (dbResults.length === 0) {
      console.log('Using mock data for development')
      let mockData = getMockQuestions()
      
      // Filter mock data by topic if needed
      if (topicId && topicId !== 'all-topics') {
        const subCategory = topicToSubCategoryMap[topicId]
        if (subCategory) {
          mockData = mockData.filter(q => q['domain_sub-category'] === subCategory)
        }
      }
      
      dbResults = limit !== null ? mockData.slice(0, limit) : mockData
    }
    
    const questions: Question[] = dbResults.map(convertCardToQuestion)
    
    return Response.json({
      success: true,
      questions,
      _dev: dbResults.length > 0 ? undefined : 'Using mock data'
    })
  } catch (error) {
    console.error('Error fetching questions:', error)
    return Response.json({
      success: false,
      error: 'Failed to fetch questions',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
