import type { Meta, StoryObj } from '@storybook/react'
import { useState, useRef } from 'react'
import { Toast } from './Toast'
import { ToastProvider, useToast } from './ToastContext'
import { Button } from '../Button/Button'
import { Text } from '../Text/Text'

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error'],
      description: 'Visual style variant',
    },
    message: {
      control: 'text',
      description: 'Message to display in the toast',
    },
    duration: {
      control: 'number',
      description: 'Auto-dismiss duration in milliseconds',
    },
  },
}

export default meta
type Story = StoryObj<typeof Toast>

// Demo component that shows toast in isolation (not using portal)
const ToastDemo = ({
  variant = 'success',
  message = 'Feedback submitted. Thank you!',
  duration = 4000,
}: {
  variant?: 'success' | 'error'
  message?: string
  duration?: number
}) => {
  const [key, setKey] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const handleReset = () => {
    setIsVisible(false)
    setTimeout(() => {
      setKey((k) => k + 1)
      setIsVisible(true)
    }, 100)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
        <Text className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Hover over the toast to pause the countdown. When you move away, it resets.
        </Text>
        <Button variant="secondary" size="sm" onClick={handleReset}>
          Reset toast
        </Button>
      </div>
      {isVisible && (
        <Toast
          key={key}
          id={`demo-${key}`}
          message={message}
          variant={variant}
          duration={duration}
          onDismiss={() => setIsVisible(false)}
        />
      )}
    </div>
  )
}

export const Default: Story = {
  render: () => <ToastDemo />,
}

export const Success: Story = {
  render: () => (
    <ToastDemo variant="success" message="Settings saved successfully" />
  ),
}

export const Error: Story = {
  render: () => (
    <ToastDemo variant="error" message="Failed to save. Please try again." />
  ),
}

export const LongMessage: Story = {
  render: () => (
    <ToastDemo
      variant="success"
      message="Your feedback has been submitted successfully and will be reviewed by our team."
    />
  ),
}

export const ShortDuration: Story = {
  render: () => (
    <ToastDemo
      variant="success"
      message="Quick notification"
      duration={2000}
    />
  ),
}

export const LongDuration: Story = {
  render: () => (
    <ToastDemo
      variant="success"
      message="This toast stays longer (8 seconds)"
      duration={8000}
    />
  ),
}

// Interactive demo using the ToastProvider and useToast hook
const InteractiveDemo = () => {
  const { success, error, showToast } = useToast()
  const countRef = useRef(0)

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800 max-w-md">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
          useToast hook
        </h3>
        <Text className="text-sm text-blue-800 dark:text-blue-200">
          Click the buttons below to trigger toasts. Multiple toasts will stack.
          Hover over any toast to pause its countdown.
        </Text>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          variant="primary"
          onClick={() => success('Feedback submitted. Thank you!')}
        >
          Success toast
        </Button>
        <Button
          variant="secondary"
          onClick={() => error('Something went wrong. Please try again.')}
        >
          Error toast
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            countRef.current += 1
            showToast(`Notification #${countRef.current}`, { variant: 'success' })
          }}
        >
          Increment counter
        </Button>
      </div>
    </div>
  )
}

export const WithUseToastHook: Story = {
  render: () => (
    <ToastProvider>
      <InteractiveDemo />
    </ToastProvider>
  ),
}

// Stacking demo
const StackingDemo = () => {
  const { success, error } = useToast()
  const messages = [
    'First notification',
    'Second notification',
    'Third notification',
  ]

  const showMultiple = () => {
    messages.forEach((msg, index) => {
      setTimeout(() => {
        if (index % 2 === 0) {
          success(msg)
        } else {
          error(msg)
        }
      }, index * 300)
    })
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800 max-w-md">
        <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-2">
          Toast stacking
        </h3>
        <Text className="text-sm text-purple-800 dark:text-purple-200">
          Multiple toasts stack vertically. Each toast has its own countdown timer.
        </Text>
      </div>
      <Button variant="primary" onClick={showMultiple}>
        Show multiple toasts
      </Button>
    </div>
  )
}

export const MultipleToasts: Story = {
  render: () => (
    <ToastProvider>
      <StackingDemo />
    </ToastProvider>
  ),
}

// Progress bar demo
export const ProgressBarBehavior: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-6 max-w-lg">
      <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800 w-full">
        <h3 className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">
          Progress indicator
        </h3>
        <ul className="text-sm text-green-800 dark:text-green-200 space-y-1 list-disc list-inside">
          <li>3px bar at the top shrinks left to right</li>
          <li>Hover pauses the countdown</li>
          <li>Moving mouse away resets timer to full</li>
          <li>No close button - toasts auto-dismiss</li>
        </ul>
      </div>
      <ToastDemo duration={6000} message="Watch the progress bar above" />
    </div>
  ),
}

// Accessibility demo
export const Accessibility: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-6 max-w-lg">
      <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800 w-full">
        <h3 className="text-sm font-semibold text-orange-900 dark:text-orange-100 mb-2">
          Accessibility features
        </h3>
        <ul className="text-sm text-orange-800 dark:text-orange-200 space-y-1 list-disc list-inside">
          <li>Uses <code className="bg-orange-100 dark:bg-orange-900 px-1 rounded">role="alert"</code> for screen readers</li>
          <li>Uses <code className="bg-orange-100 dark:bg-orange-900 px-1 rounded">aria-live="polite"</code> for non-intrusive announcements</li>
          <li>AAA contrast ratios (7:1+) for text</li>
          <li>Icons provide redundant meaning (not color-only)</li>
          <li>Hover-to-pause supports users who need more reading time</li>
        </ul>
      </div>
      <ToastDemo message="Accessible toast notification" />
    </div>
  ),
}

// Dark mode demo
export const DarkModeSupport: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-6 max-w-lg">
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 w-full">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Dark mode colors
        </h3>
        <Text className="text-sm text-gray-700 dark:text-gray-300">
          Toggle dark mode in the Storybook toolbar to see how toast colors adapt.
          Both light and dark modes maintain AAA contrast compliance.
        </Text>
      </div>
      <div className="flex gap-4">
        <ToastDemo variant="success" message="Success in current theme" />
      </div>
    </div>
  ),
}

// Variant comparison
export const VariantComparison: Story = {
  render: () => {
    const VariantDemo = () => {
      const [successVisible, setSuccessVisible] = useState(true)
      const [errorVisible, setErrorVisible] = useState(true)
      const [successKey, setSuccessKey] = useState(0)
      const [errorKey, setErrorKey] = useState(0)

      const resetAll = () => {
        setSuccessVisible(false)
        setErrorVisible(false)
        setTimeout(() => {
          setSuccessKey((k) => k + 1)
          setErrorKey((k) => k + 1)
          setSuccessVisible(true)
          setErrorVisible(true)
        }, 100)
      }

      return (
        <div className="flex flex-col items-center gap-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
            <Text className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Compare success and error variants side by side
            </Text>
            <Button variant="secondary" size="sm" onClick={resetAll}>
              Reset both
            </Button>
          </div>
          <div className="flex gap-4 flex-wrap justify-center">
            {successVisible && (
              <Toast
                key={`success-${successKey}`}
                id={`success-${successKey}`}
                message="Operation completed"
                variant="success"
                duration={10000}
                onDismiss={() => setSuccessVisible(false)}
              />
            )}
            {errorVisible && (
              <Toast
                key={`error-${errorKey}`}
                id={`error-${errorKey}`}
                message="Operation failed"
                variant="error"
                duration={10000}
                onDismiss={() => setErrorVisible(false)}
              />
            )}
          </div>
        </div>
      )
    }

    return <VariantDemo />
  },
}
