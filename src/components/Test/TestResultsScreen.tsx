import { Button, Heading, Text } from '../../design-system'

interface TestResultsScreenProps {
  score: number
  totalQuestions: number
  onRestart: () => void
  onBack: () => void
}

/**
 * Results screen component for test view
 * Displays final score and offers retry or finish options
 */
export function TestResultsScreen({ 
  score, 
  totalQuestions, 
  onRestart, 
  onBack 
}: TestResultsScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100)
  
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

        <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-300 dark:border-gray-700 p-12 text-center">
          <Heading as="h1" className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Test Complete!
          </Heading>
          <Text variant="body1" className="text-6xl font-bold text-blue-600 mb-4">
            {score}/{totalQuestions}
          </Text>
          <Text variant="body1" className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            You got {percentage}% correct
          </Text>
          
          <div className="flex gap-4 justify-center">
            <Button
              onClick={onRestart}
              data-tracking-id="test-retry"
              variant="primary"
              size="lg"
            >
              Retry Test
            </Button>
            <Button
              onClick={onBack}
              data-tracking-id="test-finish"
              variant="secondary"
              size="lg"
            >
              Finish
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
