import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text displayed above the input',
    },
    error: {
      control: 'text',
      description: 'Error message displayed below the input',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    type: 'email',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'johndoe',
    helperText: 'Choose a unique username',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    type: 'email',
    error: 'Please enter a valid email address',
    defaultValue: 'invalid-email',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled input',
    placeholder: 'Cannot edit',
    disabled: true,
    defaultValue: 'Disabled value',
  },
}

export const AllStates: Story = {
  render: () => (
    <div className="space-y-6 p-8 bg-white dark:bg-gray-900 rounded-lg max-w-md">
      <Input label="Normal" placeholder="Enter text..." />
      
      <Input
        label="With helper text"
        placeholder="Enter text..."
        helperText="This is helpful information"
      />
      
      <Input
        label="With error"
        placeholder="Enter text..."
        error="This field is required"
        defaultValue="Invalid input"
      />
      
      <Input
        label="Disabled"
        placeholder="Cannot edit"
        disabled
        defaultValue="Disabled value"
      />
      
      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        helperText="Must be at least 8 characters"
      />
    </div>
  ),
}

export const FormExample: Story = {
  render: () => (
    <div className="p-8 bg-white dark:bg-gray-900 rounded-lg max-w-md">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
        Sign Up Form
      </h2>
      <form className="space-y-4">
        <Input
          label="Full name"
          placeholder="John Doe"
          helperText="Your first and last name"
        />
        
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          helperText="We'll never share your email"
        />
        
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          helperText="Must be at least 8 characters"
        />
        
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          Create Account
        </button>
      </form>
    </div>
  ),
}
