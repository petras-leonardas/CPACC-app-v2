import { Button, Text } from '../../design-system'

interface TestLoadingStateProps {
  onBack: () => void
}

/**
 * Loading state component for test view
 * Displays a spinner while questions are being fetched
 */
export function TestLoadingState({ onBack }: TestLoadingStateProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-24">
      <div className="max-w-3xl mx-auto">
        <Button
          onClick={onBack}
          variant="primary"
          size="md"
          className="mb-6"
        >
          ← Finish
        </Button>
        <div className="bg-white rounded-lg border-2 border-gray-300 p-12 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 dark:border-gray-100 mx-auto mb-4"></div>
          <Text variant="body1" className="text-xl text-gray-600 dark:text-gray-400">
            Loading questions...
          </Text>
        </div>
      </div>
    </div>
  )
}
