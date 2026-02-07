import { Modal, Text } from '../../design-system'

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
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={hasUnsavedProgress ? 'Exit test?' : 'End test?'}
      size="sm"
      primaryActionLabel={hasUnsavedProgress ? 'Exit test' : 'End test'}
      onPrimaryAction={onConfirm}
      secondaryActionLabel="Cancel"
      onSecondaryAction={onCancel}
    >
      <Text variant="body1">
        {hasUnsavedProgress 
          ? 'Are you sure you want to exit? Your progress will be lost.' 
          : 'Are you sure you want to end the test?'}
      </Text>
    </Modal>
  )
}
