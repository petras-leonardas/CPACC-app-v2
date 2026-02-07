export interface Question {
  id: string
  topicId: string
  question: string
  options: string[]
  correctAnswer: number // index of correct option (0-3)
  explanation?: string
  subject?: string
}
