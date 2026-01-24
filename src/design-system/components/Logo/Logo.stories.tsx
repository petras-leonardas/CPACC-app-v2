import type { Meta, StoryObj } from '@storybook/react'
import { Logo } from './Logo'

const meta: Meta<typeof Logo> = {
  title: 'Brand/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['icon', 'full'],
      description: 'Logo variant - icon only or full logo with text',
    },
    width: {
      control: 'number',
      description: 'Width in pixels (height auto-calculated)',
    },
  },
}

export default meta
type Story = StoryObj<typeof Logo>

export const IconOnly: Story = {
  args: {
    variant: 'icon',
    width: 48,
  },
}

export const FullLogo: Story = {
  args: {
    variant: 'full',
    width: 200,
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-12 p-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Icon Sizes
        </h3>
        <div className="flex items-end gap-8">
          <div className="text-center">
            <Logo variant="icon" width={32} />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">32px</p>
          </div>
          <div className="text-center">
            <Logo variant="icon" width={48} />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">48px</p>
          </div>
          <div className="text-center">
            <Logo variant="icon" width={64} />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">64px</p>
          </div>
          <div className="text-center">
            <Logo variant="icon" width={96} />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">96px</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Full Logo Sizes
        </h3>
        <div className="space-y-6">
          <div>
            <Logo variant="full" width={150} />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">150px width</p>
          </div>
          <div>
            <Logo variant="full" width={200} />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">200px width (default)</p>
          </div>
          <div>
            <Logo variant="full" width={300} />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">300px width</p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const DarkModeComparison: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div className="p-6 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>💡 Toggle Dark Mode:</strong> Use the Storybook toolbar to see how the logo 
          automatically adapts with colors from design tokens.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Icon Only
          </h3>
          <Logo variant="icon" width={96} />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Full Logo
          </h3>
          <Logo variant="full" width={250} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const UsageExamples: Story = {
  render: () => (
    <div className="space-y-12 p-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Navigation Header
        </h3>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <Logo variant="full" width={180} />
            <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-300">
              <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100">Home</a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100">Courses</a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100">About</a>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Mobile Navigation
        </h3>
        <div className="max-w-sm border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <Logo variant="icon" width={40} />
            <button className="text-gray-600 dark:text-gray-300">Menu</button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Footer
        </h3>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-900">
          <Logo variant="full" width={160} className="mb-4" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Master accessibility certification with confidence.
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const DesignTokens: Story = {
  render: () => (
    <div className="space-y-8 p-8 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Design Token Integration
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          The logo automatically uses colors from the design system tokens, ensuring consistency 
          and proper dark mode support.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Light Mode
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded" style={{ backgroundColor: '#E67E22' }}></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Orange</p>
                <p className="text-gray-600 dark:text-gray-400">brand.orange[500]</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded" style={{ backgroundColor: '#353A56' }}></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Navy</p>
                <p className="text-gray-600 dark:text-gray-400">brand.navy[500]</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded" style={{ backgroundColor: '#7BAEB5' }}></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Teal</p>
                <p className="text-gray-600 dark:text-gray-400">brand.teal[400]</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Dark Mode
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded" style={{ backgroundColor: '#F39C52' }}></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Orange</p>
                <p className="text-gray-600 dark:text-gray-400">brand.orange[400]</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded" style={{ backgroundColor: '#F3F4F6' }}></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Light Gray</p>
                <p className="text-gray-600 dark:text-gray-400">base.gray[100]</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded" style={{ backgroundColor: '#92C5CC' }}></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Teal</p>
                <p className="text-gray-600 dark:text-gray-400">brand.teal[300]</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <Logo variant="full" width={300} />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}
