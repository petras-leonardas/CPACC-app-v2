import { Button, Heading, Text } from '../../design-system'

interface TestExitModalProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  hasUnsavedProgress?: boolean
}

/**
 * Exit confirmation modal for test view
 * Warns user about losing progress when exiting mid-test
 */
export function TestExitModal({ 
  isOpen, 
  onConfirm, 
  onCancel,
  hasUnsavedProgress = true
}: TestExitModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 shadow-xl">
        <Heading as="h2" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {hasUnsavedProgress ? 'Exit Test?' : 'End Test?'}
        </Heading>
        <Text variant="body1" className="text-gray-700 dark:text-gray-300 mb-6">
          {hasUnsavedProgress 
            ? 'Are you sure you want to exit? Your progress will be lost.' 
            : 'Are you sure you want to end the test?'}
        </Text>
        <div className="flex gap-3 justify-end">
          <Button
            onClick={onCancel}
            variant="secondary"
            size="md"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant="primary"
            size="md"
          >
            {hasUnsavedProgress ? 'Exit Test' : 'End Test'}
          </Button>
        </div>
      </div>
    </div>
  )
}
