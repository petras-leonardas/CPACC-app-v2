import { Button, Heading, Text } from '../../design-system'

interface TestErrorStateProps {
  error: string
  onBack: () => void
}

/**
 * Error state component for test view
 * Displays error message when questions fail to load
 */
export function TestErrorState({ error, onBack }: TestErrorStateProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 pt-24">
      <div className="max-w-3xl mx-auto">
        <Button
          onClick={onBack}
          variant="primary"
          size="md"
          className="mb-6"
        >
          ← Finish
        </Button>
        <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-red-300 dark:border-red-800 p-12 text-center">
          <Heading as="h1" className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Error Loading Questions
          </Heading>
          <Text variant="body1" className="text-gray-700 dark:text-gray-300 mb-6">
            {error}
          </Text>
          <Button
            onClick={onBack}
            variant="primary"
            size="lg"
          >
            Back to Topics
          </Button>
        </div>
      </div>
    </div>
  )
}
