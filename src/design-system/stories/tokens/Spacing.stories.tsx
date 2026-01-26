import type { Meta, StoryObj } from '@storybook/react'
import { spacing } from '../../tokens'

const meta: Meta = {
  title: 'Design tokens/Spacing',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

export const SpacingScale: StoryObj = {
  render: () => (
    <div className="p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">Spacing Scale</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Consistent spacing creates visual rhythm and hierarchy (4px base unit)
      </p>

      <div className="space-y-6 bg-white dark:bg-gray-900 p-8 rounded-lg">
        {Object.entries(spacing).map(([key, value]) => (
          <div key={key} className="flex items-center gap-6 border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
            <div className="w-32">
              <div className="text-sm font-mono text-gray-900 dark:text-gray-100">{key}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{value}</div>
            </div>
            <div className="flex-1 flex items-center gap-4">
              <div
                className="bg-blue-500 h-8"
                style={{ width: value }}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {value === '0' ? '0px' : `${parseFloat(value) * 16}px`}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white dark:bg-gray-900 p-8 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Usage Examples</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Component Padding</p>
            <div className="bg-blue-500 text-white p-4 rounded">padding: 1rem (16px)</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Element Gap</p>
            <div className="flex gap-4">
              <div className="bg-blue-500 text-white p-4 rounded flex-1">Item 1</div>
              <div className="bg-blue-500 text-white p-4 rounded flex-1">Item 2</div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">gap: 1rem (16px)</p>
          </div>
        </div>
      </div>
    </div>
  ),
}
