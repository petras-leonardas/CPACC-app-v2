import type { Meta, StoryObj } from '@storybook/react'
import { components } from '../../tokens'

const meta: Meta = {
  title: 'Design Tokens/Semantic Utilities',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

export const Overview: StoryObj = {
  render: () => (
    <div className="p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Semantic Utility Classes</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-3xl">
          Intent-based utility classes that automatically handle dark mode. These classes pull directly from design system tokens 
          and ensure consistent color usage across the application.
        </p>

        {/* Architecture Overview */}
        <div className="mb-16 bg-surface-primary border border-semantic rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">How It Works</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Design System Tokens</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Color values are defined in <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">src/design-system/tokens/colors/components.ts</code> with separate light and dark mode values.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Tailwind Config Extension</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Tokens are mapped to semantic color names and utility classes in <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">tailwind.config.js</code>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Automatic Dark Mode</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Classes automatically apply correct colors based on the <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">.dark</code> class on the HTML element - no <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">dark:</code> prefix needed.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Surface Backgrounds */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Surface Backgrounds</h2>
          <p className="text-base text-gray-600 dark:text-gray-400 mb-8">
            Use these for component backgrounds. Each class automatically adapts to light and dark modes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Primary Surface */}
            <div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">.bg-surface-primary</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Main surfaces like cards, headers, modals, and panels.
                </p>
                <div className="flex gap-2 text-xs font-mono text-gray-600 dark:text-gray-400">
                  <span>Light: {components.background.primary.light}</span>
                  <span>•</span>
                  <span>Dark: {components.background.primary.dark}</span>
                </div>
              </div>
              <div className="bg-surface-primary border border-semantic rounded-xl p-6 h-32 flex items-center justify-center">
                <span className="text-gray-900 dark:text-gray-100 font-semibold">Primary Surface</span>
              </div>
              <pre className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs overflow-x-auto">
                <code>{`<div className="bg-surface-primary">
  Content
</div>`}</code>
              </pre>
            </div>

            {/* Secondary Surface */}
            <div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">.bg-surface-secondary</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Page backgrounds and subtle container backgrounds.
                </p>
                <div className="flex gap-2 text-xs font-mono text-gray-600 dark:text-gray-400">
                  <span>Light: {components.background.secondary.light}</span>
                  <span>•</span>
                  <span>Dark: {components.background.secondary.dark}</span>
                </div>
              </div>
              <div className="bg-surface-secondary border border-semantic rounded-xl p-6 h-32 flex items-center justify-center">
                <span className="text-gray-900 dark:text-gray-100 font-semibold">Secondary Surface</span>
              </div>
              <pre className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs overflow-x-auto">
                <code>{`<main className="bg-surface-secondary">
  Page content
</main>`}</code>
              </pre>
            </div>

            {/* Tertiary Surface */}
            <div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">.bg-surface-tertiary</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Hover states, subtle backgrounds, and nested containers.
                </p>
                <div className="flex gap-2 text-xs font-mono text-gray-600 dark:text-gray-400">
                  <span>Light: {components.background.tertiary.light}</span>
                  <span>•</span>
                  <span>Dark: {components.background.tertiary.dark}</span>
                </div>
              </div>
              <div className="bg-surface-tertiary border border-semantic rounded-xl p-6 h-32 flex items-center justify-center">
                <span className="text-gray-900 dark:text-gray-100 font-semibold">Tertiary Surface</span>
              </div>
              <pre className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs overflow-x-auto">
                <code>{`<div className="hover:bg-surface-tertiary">
  Hover background
</div>`}</code>
              </pre>
            </div>

            {/* Elevated Surface */}
            <div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">.bg-surface-elevated</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Floating elements like dropdowns, popovers, and tooltips.
                </p>
                <div className="flex gap-2 text-xs font-mono text-gray-600 dark:text-gray-400">
                  <span>Light: {components.background.elevated.light}</span>
                  <span>•</span>
                  <span>Dark: {components.background.elevated.dark}</span>
                </div>
              </div>
              <div className="bg-surface-elevated border border-semantic rounded-xl p-6 h-32 flex items-center justify-center shadow-lg">
                <span className="text-gray-900 dark:text-gray-100 font-semibold">Elevated Surface</span>
              </div>
              <pre className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs overflow-x-auto">
                <code>{`<div className="bg-surface-elevated shadow-lg">
  Dropdown menu
</div>`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Border Colors */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Border Colors</h2>
          <p className="text-base text-gray-600 dark:text-gray-400 mb-8">
            Semantic border colors that provide consistent contrast in both light and dark modes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Default Border */}
            <div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">.border-semantic</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Default border for cards, panels, and dividers.
                </p>
                <div className="flex gap-2 text-xs font-mono text-gray-600 dark:text-gray-400">
                  <span>Light: {components.border.default.light}</span>
                  <span>•</span>
                  <span>Dark: {components.border.default.dark}</span>
                </div>
              </div>
              <div className="bg-surface-primary border-2 border-semantic rounded-xl p-6 h-32 flex items-center justify-center">
                <span className="text-gray-900 dark:text-gray-100 font-semibold">Default Border</span>
              </div>
              <pre className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs overflow-x-auto">
                <code>{`<div className="border border-semantic">
  Content with border
</div>`}</code>
              </pre>
            </div>

            {/* Hover Border */}
            <div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">.border-semantic-hover</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Hover state border for interactive elements.
                </p>
                <div className="flex gap-2 text-xs font-mono text-gray-600 dark:text-gray-400">
                  <span>Light: {components.border.hover.light}</span>
                  <span>•</span>
                  <span>Dark: {components.border.hover.dark}</span>
                </div>
              </div>
              <div className="bg-surface-primary border-2 border-semantic-hover rounded-xl p-6 h-32 flex items-center justify-center">
                <span className="text-gray-900 dark:text-gray-100 font-semibold">Hover Border</span>
              </div>
              <pre className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs overflow-x-auto">
                <code>{`<div className="border border-semantic 
     hover:border-semantic-hover">
  Interactive element
</div>`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Real-World Examples */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Real-World Examples</h2>
          
          <div className="space-y-8">
            {/* Header Example */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Header Component</h3>
              <div className="bg-surface-primary border-b border-semantic h-16 flex items-center justify-between px-6 rounded-t-xl">
                <div className="font-semibold text-gray-900 dark:text-gray-100">Logo</div>
                <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>Navigation</span>
                  <span>Settings</span>
                </div>
              </div>
              <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-b-xl text-xs overflow-x-auto">
                <code>{`<header className="bg-surface-primary border-b border-semantic">
  <nav>...</nav>
</header>`}</code>
              </pre>
            </div>

            {/* Card Example */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Card Component</h3>
              <div className="bg-surface-primary border border-semantic rounded-xl p-6 hover:border-semantic-hover transition-colors">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Card Title</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  This card uses semantic utilities for background and borders, ensuring consistent appearance in both light and dark modes.
                </p>
              </div>
              <pre className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-xs overflow-x-auto">
                <code>{`<div className="bg-surface-primary 
     border border-semantic 
     rounded-xl p-6 
     hover:border-semantic-hover">
  <h4>Card Title</h4>
  <p>Card content...</p>
</div>`}</code>
              </pre>
            </div>

            {/* Page Layout Example */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Page Layout</h3>
              <div className="bg-surface-secondary rounded-xl p-6">
                <div className="bg-surface-primary border border-semantic rounded-lg p-4 mb-4">
                  <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Content Card 1</div>
                </div>
                <div className="bg-surface-primary border border-semantic rounded-lg p-4">
                  <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Content Card 2</div>
                </div>
              </div>
              <pre className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-xs overflow-x-auto">
                <code>{`<main className="bg-surface-secondary">
  <div className="bg-surface-primary border border-semantic">
    Card 1
  </div>
  <div className="bg-surface-primary border border-semantic">
    Card 2
  </div>
</main>`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-100">Benefits of Semantic Utilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-900 dark:text-blue-100">
            <div>
              <h3 className="font-semibold mb-2">✅ Single Source of Truth</h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">All colors pull from design system tokens</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">✅ Automatic Dark Mode</h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">No manual dark: prefix needed</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">✅ Intent-Based Naming</h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">surface-primary vs gray-950</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">✅ Easy Maintenance</h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">Update tokens, everything updates</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">✅ Consistent Colors</h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">Prevents color drift</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">✅ Better DX</h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">Cleaner, more readable code</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const ComparisonOldVsNew: StoryObj = {
  render: () => (
    <div className="p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Migration Guide</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Comparison between the old hardcoded approach and the new semantic utility approach.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Old Approach */}
          <div>
            <div className="mb-4 px-4 py-2 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg">
              <h2 className="text-xl font-bold text-red-900 dark:text-red-100">❌ Old Approach</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Header Component</h3>
                <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs overflow-x-auto">
                  <code>{`<header className="bg-white 
         dark:bg-gray-900 
         border-b 
         border-gray-200 
         dark:border-gray-800">
  Navigation
</header>`}</code>
                </pre>
                <div className="mt-3 text-sm text-red-700 dark:text-red-300">
                  <strong>Problems:</strong>
                  <ul className="list-disc ml-5 mt-1 space-y-1">
                    <li>Not using design tokens</li>
                    <li>Manual dark mode</li>
                    <li>Values can drift</li>
                    <li>Verbose class names</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Card Component</h3>
                <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs overflow-x-auto">
                  <code>{`<div className="bg-white 
     dark:bg-gray-800 
     border 
     border-gray-200 
     dark:border-gray-700">
  Card content
</div>`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Page Background</h3>
                <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs overflow-x-auto">
                  <code>{`<main className="bg-gray-50 
      dark:bg-gray-950">
  Page content
</main>`}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* New Approach */}
          <div>
            <div className="mb-4 px-4 py-2 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-800 rounded-lg">
              <h2 className="text-xl font-bold text-green-900 dark:text-green-100">✅ New Approach</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Header Component</h3>
                <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs overflow-x-auto">
                  <code>{`<header className="bg-surface-primary 
         border-b 
         border-semantic">
  Navigation
</header>`}</code>
                </pre>
                <div className="mt-3 text-sm text-green-700 dark:text-green-300">
                  <strong>Benefits:</strong>
                  <ul className="list-disc ml-5 mt-1 space-y-1">
                    <li>Uses design tokens</li>
                    <li>Auto dark mode</li>
                    <li>Single source of truth</li>
                    <li>Cleaner code</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Card Component</h3>
                <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs overflow-x-auto">
                  <code>{`<div className="bg-surface-primary 
     border 
     border-semantic">
  Card content
</div>`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Page Background</h3>
                <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs overflow-x-auto">
                  <code>{`<main className="bg-surface-secondary">
  Page content
</main>`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-100">Migration Summary</h2>
          <div className="space-y-3 text-blue-900 dark:text-blue-100">
            <p><strong>Before:</strong> 6-8 classes with manual dark mode</p>
            <p><strong>After:</strong> 2-3 classes with automatic dark mode</p>
            <p className="text-sm text-blue-800 dark:text-blue-200 pt-4">
              <strong>Code reduction:</strong> ~50% fewer classes, ~60% easier to read, 100% design system compliant
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
}
