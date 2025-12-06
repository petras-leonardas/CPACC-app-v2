import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { TopicContent } from './components/TopicContent'
import { TestView } from './components/TestView'
import { cpacc_topics, allTopicsOverview } from './data/topics'
import type { Topic } from './data/topics'

type ViewMode = 'home' | 'test' | 'flashcards'

function App() {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('all-topics')
  const [viewMode, setViewMode] = useState<ViewMode>('home')

  // Find the selected topic
  const getSelectedTopic = (): Topic => {
    if (selectedTopicId === 'all-topics') {
      return allTopicsOverview
    }

    for (const domain of cpacc_topics) {
      const topic = domain.topics.find((t) => t.id === selectedTopicId)
      if (topic) return topic
    }

    return allTopicsOverview // fallback
  }

  const selectedTopic = getSelectedTopic()

  const handleFlashcardsClick = () => {
    setViewMode('flashcards')
    // TODO: Implement flashcards view
  }

  const handleTestClick = () => {
    setViewMode('test')
  }

  const handleBackToHome = () => {
    setViewMode('home')
  }

  // Test view
  if (viewMode === 'test') {
    return (
      <TestView
        topicId={selectedTopicId}
        topicTitle={selectedTopic.title}
        onBack={handleBackToHome}
      />
    )
  }

  // Flashcards view (TODO)
  if (viewMode === 'flashcards') {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <button
          onClick={handleBackToHome}
          className="mb-6 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          ← Back
        </button>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Flashcards</h1>
          <p className="text-gray-600">Coming soon...</p>
        </div>
      </div>
    )
  }

  // Home view
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        domains={cpacc_topics}
        selectedTopicId={selectedTopicId}
        onTopicSelect={setSelectedTopicId}
      />
      <TopicContent
        topic={selectedTopic}
        onFlashcardsClick={handleFlashcardsClick}
        onTestClick={handleTestClick}
      />
    </div>
  )
}

export default App
