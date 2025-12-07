import { Button } from '@leo-designs/components'
import type { Topic } from '../data/topics'

interface TopicContentProps {
  topic: Topic
  onFlashcardsClick: () => void
  onTestClick: () => void
}

export function TopicContent({ topic, onFlashcardsClick, onTestClick }: TopicContentProps) {
  return (
    <main className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8">
        {/* Topic Selection Dropdown Visual */}
        <div className="mb-6">
          <input
            type="text"
            value={topic.subCategory ? `${topic.subCategory}: ${topic.title}` : topic.title}
            readOnly
            className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 cursor-default"
          />
        </div>

        {/* Topic Title */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 px-6 py-4 bg-white border-2 border-gray-300 rounded-lg">
            {topic.subCategory && <span className="font-bold">{topic.subCategory}: </span>}
            {topic.title}
          </h1>
        </div>

        {/* Description Box */}
        <div className="mb-8">
          <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
            <p className="text-gray-700 leading-relaxed">
              {topic.description}
            </p>
          </div>
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
            test new
          </Button>
        </div>
      </div>
    </main>
  )
}
