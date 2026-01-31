import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Modal } from './Modal'
import { Button } from '../Button/Button'
import { Text } from '../Text/Text'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
    title: {
      control: 'text',
      description: 'Modal title displayed in the header',
    },
    primaryActionLabel: {
      control: 'text',
      description: 'Primary action button label',
    },
    secondaryActionLabel: {
      control: 'text',
      description: 'Secondary action button label',
    },
    primaryActionLoading: {
      control: 'boolean',
      description: 'Whether primary action is in loading state',
    },
    primaryActionDisabled: {
      control: 'boolean',
      description: 'Whether primary action is disabled',
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Whether to close when clicking the backdrop',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether to close when pressing Escape key',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Modal size variant - sm (448px) or md (576px)',
    },
  },
}

export default meta
type Story = StoryObj<typeof Modal>

// Interactive wrapper component for stories
const ModalDemo = ({
  title = 'Modal title',
  size = 'sm',
  primaryActionLabel = 'Confirm',
  secondaryActionLabel = 'Cancel',
  primaryActionLoading = false,
  primaryActionDisabled = false,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  children,
}: {
  title?: string
  size?: 'sm' | 'md'
  primaryActionLabel?: string
  secondaryActionLabel?: string
  primaryActionLoading?: boolean
  primaryActionDisabled?: boolean
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
  children?: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        size={size}
        primaryActionLabel={primaryActionLabel}
        onPrimaryAction={() => {
          console.log('Primary action clicked')
          setIsOpen(false)
        }}
        secondaryActionLabel={secondaryActionLabel}
        onSecondaryAction={() => {
          console.log('Secondary action clicked')
          setIsOpen(false)
        }}
        primaryActionLoading={primaryActionLoading}
        primaryActionDisabled={primaryActionDisabled}
        closeOnBackdropClick={closeOnBackdropClick}
        closeOnEscape={closeOnEscape}
      >
        {children || (
          <Text>
            This is the modal body content. You can place any content here including
            forms, messages, or other components.
          </Text>
        )}
      </Modal>
    </>
  )
}

export const Default: Story = {
  render: () => <ModalDemo />,
}

export const ConfirmationDialog: Story = {
  render: () => (
    <ModalDemo
      title="Confirm action"
      primaryActionLabel="Delete"
      secondaryActionLabel="Cancel"
    >
      <Text>
        Are you sure you want to delete this item? This action cannot be undone.
      </Text>
    </ModalDemo>
  ),
}

export const WithLoadingState: Story = {
  render: () => {
    const LoadingDemo = () => {
      const [isOpen, setIsOpen] = useState(false)
      const [isLoading, setIsLoading] = useState(false)

      const handleConfirm = () => {
        setIsLoading(true)
        setTimeout(() => {
          setIsLoading(false)
          setIsOpen(false)
        }, 2000)
      }

      return (
        <>
          <Button variant="primary" onClick={() => setIsOpen(true)}>
            Open Modal
          </Button>
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Submit form"
            primaryActionLabel="Submit"
            onPrimaryAction={handleConfirm}
            secondaryActionLabel="Cancel"
            primaryActionLoading={isLoading}
          >
            <Text>
              Click Submit to see the loading state. The modal will close
              automatically after 2 seconds.
            </Text>
          </Modal>
        </>
      )
    }

    return <LoadingDemo />
  },
}

export const WithDisabledPrimary: Story = {
  render: () => (
    <ModalDemo
      title="Complete required fields"
      primaryActionLabel="Submit"
      secondaryActionLabel="Cancel"
      primaryActionDisabled={true}
    >
      <Text>
        The primary action button is disabled until all required fields are
        completed.
      </Text>
    </ModalDemo>
  ),
}

export const WithoutFooter: Story = {
  render: () => {
    const NoFooterDemo = () => {
      const [isOpen, setIsOpen] = useState(false)

      return (
        <>
          <Button variant="primary" onClick={() => setIsOpen(true)}>
            Open Modal
          </Button>
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Information"
          >
            <Text>
              This modal has no footer actions. Close it using the X button or by
              pressing Escape.
            </Text>
          </Modal>
        </>
      )
    }

    return <NoFooterDemo />
  },
}

export const WithCustomContent: Story = {
  render: () => (
    <ModalDemo
      title="Select topic"
      primaryActionLabel="Start Test"
      secondaryActionLabel="Back"
    >
      <div className="space-y-4">
        <Text>Choose a topic to begin your practice test:</Text>
        <div className="space-y-2">
          <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Text className="font-medium">Disabilities</Text>
            <Text className="text-sm text-gray-500">15 questions</Text>
          </div>
          <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Text className="font-medium">Universal Design</Text>
            <Text className="text-sm text-gray-500">12 questions</Text>
          </div>
          <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Text className="font-medium">Standards & Guidelines</Text>
            <Text className="text-sm text-gray-500">18 questions</Text>
          </div>
        </div>
      </div>
    </ModalDemo>
  ),
}

export const ExitTest: Story = {
  render: () => (
    <ModalDemo
      title="Exit test?"
      primaryActionLabel="Exit Test"
      secondaryActionLabel="Continue Test"
    >
      <Text>
        Are you sure you want to exit the test? Your progress will not be saved.
      </Text>
    </ModalDemo>
  ),
}

export const FocusManagement: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Keyboard Navigation
        </h3>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Open the modal and try pressing Tab to navigate between focusable elements.
          Press Escape to close the modal.
        </p>
      </div>
      <ModalDemo
        title="Keyboard accessible"
        primaryActionLabel="Confirm"
        secondaryActionLabel="Cancel"
      >
        <Text>
          This modal traps focus within it while open. Use Tab to navigate between
          the close button and action buttons. Press Escape to close.
        </Text>
      </ModalDemo>
    </div>
  ),
}

export const DarkModeComparison: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
        <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-2">
          Toggle Dark Mode
        </h3>
        <p className="text-sm text-purple-800 dark:text-purple-200">
          Use the Storybook toolbar to toggle dark mode and see how the modal
          adapts automatically.
        </p>
      </div>
      <ModalDemo
        title="Dark mode support"
        primaryActionLabel="Save Changes"
        secondaryActionLabel="Discard"
      >
        <Text>
          The modal uses design system tokens to automatically adapt to dark mode.
          Background, borders, and text colors all change appropriately.
        </Text>
      </ModalDemo>
    </div>
  ),
}

export const SmallSize: Story = {
  render: () => (
    <ModalDemo
      title="Small modal"
      size="sm"
      primaryActionLabel="Confirm"
      secondaryActionLabel="Cancel"
    >
      <Text>
        This is the small size modal (max-width: 448px). It's ideal for simple
        confirmations, alerts, and short forms.
      </Text>
    </ModalDemo>
  ),
}

export const MediumSize: Story = {
  render: () => (
    <ModalDemo
      title="Medium modal"
      size="md"
      primaryActionLabel="Confirm"
      secondaryActionLabel="Cancel"
    >
      <Text>
        This is the medium size modal (max-width: 576px). It provides more space
        for content like longer forms, detailed information, or lists with more items.
      </Text>
    </ModalDemo>
  ),
}

export const SizeComparison: Story = {
  render: () => {
    const SizeComparisonDemo = () => {
      const [smallOpen, setSmallOpen] = useState(false)
      const [mediumOpen, setMediumOpen] = useState(false)

      return (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">
              Modal sizes
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              Two size variants are available: small (448px) for simple dialogs,
              and medium (576px) for more complex content.
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="primary" onClick={() => setSmallOpen(true)}>
              Open small modal
            </Button>
            <Button variant="secondary" onClick={() => setMediumOpen(true)}>
              Open medium modal
            </Button>
          </div>
          <Modal
            isOpen={smallOpen}
            onClose={() => setSmallOpen(false)}
            title="Small modal"
            size="sm"
            primaryActionLabel="Got it"
            onPrimaryAction={() => setSmallOpen(false)}
          >
            <Text>
              This is the small size (max-width: 448px). Perfect for confirmations
              and simple alerts.
            </Text>
          </Modal>
          <Modal
            isOpen={mediumOpen}
            onClose={() => setMediumOpen(false)}
            title="Medium modal"
            size="md"
            primaryActionLabel="Got it"
            onPrimaryAction={() => setMediumOpen(false)}
          >
            <Text>
              This is the medium size (max-width: 576px). Better for forms or
              content that needs more horizontal space.
            </Text>
          </Modal>
        </div>
      )
    }

    return <SizeComparisonDemo />
  },
}
