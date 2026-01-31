import { useNavigate, useParams } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { Heading, Text } from '../design-system'

export function FlashcardsPage() {
  const navigate = useNavigate()
  const { topicId } = useParams<{ topicId: string }>()

  const handleBack = () => {
    navigate(`/topics/${topicId || 'all-topics'}`)
  }

  return (
    <>
      <SEO 
        title="Flashcards"
        description="CPACC flashcards for accessibility certification study."
        noindex
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
        <button
          onClick={handleBack}
          className="mb-6 px-6 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          ← Back
        </button>
        <div className="text-center">
          <Heading as="h1" className="mb-4">Flashcards</Heading>
          <Text variant="body1">Coming soon...</Text>
        </div>
      </div>
    </>
  )
}
