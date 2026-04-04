import { useNavigate } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { Heading, Text, Button } from '../design-system'
import { ArrowLeft } from '../design-system/icons'

export function FlashcardsPage() {
  const navigate = useNavigate()

  const handleBack = () => {
    // Navigate back in history, or fall back to home page
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <>
      <SEO 
        title="Flashcards"
        description="CPACC flashcards for accessibility certification study."
        noindex
      />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8">
        <Button
          variant="secondary"
          onClick={handleBack}
          leftIcon={<ArrowLeft size={16} />}
          className="mb-6"
        >
          Back
        </Button>
        <div className="text-center">
          <Heading as="h1" className="mb-4">Flashcards</Heading>
          <Text variant="body1" className="mb-6">Coming soon. This feature is currently in development.</Text>
          <Button variant="primary" onClick={() => navigate('/')}>
            Go to Home Page
          </Button>
        </div>
      </main>
    </>
  )
}
