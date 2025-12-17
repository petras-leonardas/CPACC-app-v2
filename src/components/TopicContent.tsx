import { Button } from '@leo-designs/components'
import type { Topic } from '../data/topics'

interface TopicContentProps {
  topic: Topic
  onFlashcardsClick: () => void
  onTestClick: () => void
}

export function TopicContent({ topic, onFlashcardsClick, onTestClick }: TopicContentProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8">
      {/* Description */}
      <div className="mb-8">
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          {topic.description}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          variant="secondary"
          size="md"
          onClick={onFlashcardsClick}
        >
          Flashcards
        </Button>
        <Button
          variant="secondary"
          size="md"
          onClick={onTestClick}
        >
          Start a test
        </Button>
      </div>
    </div>
  )
}
