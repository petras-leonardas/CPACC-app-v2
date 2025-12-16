import { useNavigate, useParams } from 'react-router-dom'

export function FlashcardsPage() {
  const navigate = useNavigate()
  const { topicId } = useParams<{ topicId: string }>()

  const handleBack = () => {
    navigate(`/topics/${topicId || 'all-topics'}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
      <button
        onClick={handleBack}
        className="mb-6 px-6 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
      >
        ← Back
      </button>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Flashcards</h1>
        <p className="text-gray-600 dark:text-gray-400">Coming soon...</p>
      </div>
    </div>
  )
}
