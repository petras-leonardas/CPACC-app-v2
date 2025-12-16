import { TopicContent } from '../components/TopicContent'
import { useNavigate, useParams } from 'react-router-dom'
import { cpacc_topics, allTopicsOverview } from '../data/topics'
import type { Topic } from '../data/topics'

interface TopicDetailPageProps {
  questionCounts: Record<string, number>
}

export function TopicDetailPage({ questionCounts }: TopicDetailPageProps) {
  const navigate = useNavigate()
  const { topicId } = useParams<{ topicId?: string }>()
  
  const getSelectedTopic = (): Topic => {
    if (!topicId || topicId === 'all-topics') {
      return allTopicsOverview
    }

    for (const domain of cpacc_topics) {
      const topic = domain.topics.find((t) => t.id === topicId)
      if (topic) return topic
    }

    return allTopicsOverview
  }

  const selectedTopic = getSelectedTopic()

  const handleTestClick = () => {
    navigate(`/test/${topicId || 'all-topics'}`, { 
      state: { from: `/topics/${topicId || 'all-topics'}` } 
    })
  }

  const handleFlashcardsClick = () => {
    navigate(`/flashcards/${topicId || 'all-topics'}`)
  }

  return (
    <TopicContent
      topic={selectedTopic}
      onFlashcardsClick={handleFlashcardsClick}
      onTestClick={handleTestClick}
      questionCount={selectedTopic.subCategory ? (() => {
        if (selectedTopic.subCategory.includes('-ALL')) {
          const domainPrefix = selectedTopic.subCategory.charAt(0)
          return Object.keys(questionCounts)
            .filter(key => key.startsWith(domainPrefix))
            .reduce((sum, key) => sum + (questionCounts[key] || 0), 0)
        }
        return questionCounts[selectedTopic.subCategory]
      })() : undefined}
    />
  )
}
