export interface TopicSection {
  heading: string
  content: string | string[]
  subsections?: {
    heading: string
    content: string | string[]
  }[]
}

export interface DetailedTopicContent {
  topicId: string
  introduction: string[]
  learningPoints?: string[]
  sections: TopicSection[]
  practiceGuidance?: string[]
}
