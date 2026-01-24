import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Introduction',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

export const Welcome: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            CPACC Design System
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            A comprehensive, accessible design system for the CPACC certification application
          </p>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-blue-600 dark:text-blue-400 text-2xl mb-3">♿</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Accessibility First
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Built with WCAG 2.1 AA compliance. Every component tested for keyboard navigation, screen readers, and color contrast.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-purple-600 dark:text-purple-400 text-2xl mb-3">🎨</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Single Source of Truth
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Design tokens live in TypeScript. Tailwind imports from tokens. Update once, changes everywhere.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-green-600 dark:text-green-400 text-2xl mb-3">🌓</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Dark Mode Native
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              All components designed for both light and dark themes. Toggle in the toolbar to preview.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-amber-600 dark:text-amber-400 text-2xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              System Fonts
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Platform-native fonts for optimal performance and accessibility. No loading delays, familiar UX.
            </p>
          </div>
        </div>

        {/* Architecture */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg border border-gray-200 dark:border-gray-700 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Architecture
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This design system follows a <strong>single source of truth</strong> pattern:
          </p>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Design Tokens (Source of Truth)
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                    src/design-system/tokens/
                  </code>
                  <br />
                  All colors, typography, spacing defined in TypeScript with full documentation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Tailwind Config (Imports Tokens)
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                    tailwind.config.js
                  </code>
                  <br />
                  Imports tokens to generate utility classes like{' '}
                  <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">.cpacc-heading-1</code>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Components (Use Tokens)
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                    src/design-system/components/
                  </code>
                  <br />
                  React components that consume tokens directly or via Tailwind classes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center font-semibold">
                4
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Storybook (Documents Everything)
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This site! Visual documentation of tokens and interactive component examples.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>💡 Key Benefit:</strong> Update a token once, and the change propagates to Tailwind, components, and documentation automatically.
            </p>
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg border border-gray-200 dark:border-gray-700 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Getting Started
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                📚 Explore Design Tokens
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Start with <strong>Design Tokens</strong> in the sidebar to understand:
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                <li>• Color palette and semantic colors</li>
                <li>• Typography scale and system font strategy</li>
                <li>• Spacing system based on 4px units</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                🧩 Browse Components
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Explore the <strong>Components</strong> section to see:
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                <li>• All variants and sizes for each component</li>
                <li>• Interactive examples you can click and test</li>
                <li>• Auto-generated prop documentation</li>
                <li>• Usage in real-world contexts</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                🌗 Toggle Dark Mode
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Use the theme switcher in the toolbar (top-right) to preview all components in dark mode.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                ♿ Check Accessibility
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Open the <strong>Accessibility</strong> panel (bottom toolbar) to see WCAG compliance for any component.
              </p>
            </div>
          </div>
        </div>

        {/* Usage in App */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Using in Your Application
          </h2>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Import Components
              </h4>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200">
{`import { Button, Input, Card } from '@/design-system'

function MyComponent() {
  return (
    <Card variant="elevated">
      <Input label="Email" type="email" />
      <Button variant="primary">Submit</Button>
    </Card>
  )
}`}
                </code>
              </pre>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Use Utility Classes
              </h4>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200">
{`<h1 className="cpacc-heading-1">Page Title</h1>
<p className="cpacc-body-1">Body text</p>`}
                </code>
              </pre>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Access Tokens Directly
              </h4>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200">
{`import { typography, base } from '@/design-system/tokens'

const fontSize = typography.fontSize.h1.desktop
const primaryColor = base.blue[600]`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}
