import { TopicContent } from '../components/TopicContent'
import { useParams } from 'react-router-dom'
import { cpacc_topics, allTopicsOverview } from '../data/topics'
import type { Topic } from '../data/topics'

interface HomePageProps {
  questionCounts: Record<string, number>
}

export function HomePage({ questionCounts: _questionCounts }: HomePageProps) {
  const { topicId } = useParams<{ topicId?: string }>()
  
  const getSelectedTopic = (): Topic => {
    if (!topicId || topicId === 'all-topics') {
      return allTopicsOverview
    }

    for (const domain of cpacc_topics) {
      const topic = domain.topics.find((t) => t.id === topicId)
      if (topic) return topic
    }

    return allTopicsOverview // fallback
  }

  const selectedTopic = getSelectedTopic()

  return (
    <TopicContent
      topic={selectedTopic}
    />
  )
}
