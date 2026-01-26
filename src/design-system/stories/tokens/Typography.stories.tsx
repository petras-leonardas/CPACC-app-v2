import type { Meta, StoryObj } from '@storybook/react'
import { typography } from '../../tokens'

const meta: Meta = {
  title: 'Design tokens/Typography',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

const SystemFontInfo = () => (
  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
      ℹ️ System Font Strategy
    </h3>
    <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
      This application uses platform-native system fonts for optimal accessibility and performance.
    </p>
    
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-100 mb-2">
          Platform-Specific Rendering:
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• <strong>macOS/iOS:</strong> SF Pro (San Francisco)</li>
          <li>• <strong>Windows:</strong> Segoe UI</li>
          <li>• <strong>Android:</strong> Roboto</li>
          <li>• <strong>Linux:</strong> Ubuntu or system default</li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-100 mb-2">
          Accessibility Benefits:
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>✓ No font loading delay (instant rendering)</li>
          <li>✓ Familiar reading experience per platform</li>
          <li>✓ Optimized for each operating system</li>
          <li>✓ WCAG compliance tested by platform vendors</li>
          <li>✓ Better performance (no external font files)</li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-100 mb-2">
          Font Stack:
        </h4>
        <code className="text-xs text-blue-900 dark:text-blue-100 bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded">
          {typography.fontFamily.sans.join(', ')}
        </code>
      </div>
    </div>
  </div>
)

export const TypeScale: StoryObj = {
  render: () => (
    <div className="p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">Typography Scale</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Mobile-first responsive typography system. Resize your browser to see responsive behavior.
      </p>

      <SystemFontInfo />

      <div className="space-y-8 bg-white dark:bg-gray-900 p-8 rounded-lg">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
          <h1 className="cpacc-heading-1 mb-3">Heading 1 Sample Text</h1>
          <div className="space-y-1 text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Usage:</strong> {typography.fontSize.h1.usage}
            </p>
            <p className="text-gray-600 dark:text-gray-400 font-mono">
              Mobile: {typography.fontSize.h1.mobile} ({typography.fontSize.h1.lineHeight.mobile} line height, weight {typography.fontSize.h1.fontWeight})
            </p>
            <p className="text-gray-600 dark:text-gray-400 font-mono">
              Desktop: {typography.fontSize.h1.desktop} ({typography.fontSize.h1.lineHeight.desktop} line height, weight {typography.fontSize.h1.fontWeight})
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Class: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">.cpacc-heading-1</code>
            </p>
          </div>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
          <h2 className="cpacc-heading-2 mb-3">Heading 2 Sample Text</h2>
          <div className="space-y-1 text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Usage:</strong> {typography.fontSize.h2.usage}
            </p>
            <p className="text-gray-600 dark:text-gray-400 font-mono">
              Mobile: {typography.fontSize.h2.mobile} ({typography.fontSize.h2.lineHeight.mobile} line height, weight {typography.fontSize.h2.fontWeight})
            </p>
            <p className="text-gray-600 dark:text-gray-400 font-mono">
              Desktop: {typography.fontSize.h2.desktop} ({typography.fontSize.h2.lineHeight.desktop} line height, weight {typography.fontSize.h2.fontWeight})
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Class: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">.cpacc-heading-2</code>
            </p>
          </div>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
          <h3 className="cpacc-heading-3 mb-3">Heading 3 Sample Text</h3>
          <div className="space-y-1 text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Usage:</strong> {typography.fontSize.h3.usage}
            </p>
            <p className="text-gray-600 dark:text-gray-400 font-mono">
              Mobile: {typography.fontSize.h3.mobile} ({typography.fontSize.h3.lineHeight.mobile} line height, weight {typography.fontSize.h3.fontWeight})
            </p>
            <p className="text-gray-600 dark:text-gray-400 font-mono">
              Desktop: {typography.fontSize.h3.desktop} ({typography.fontSize.h3.lineHeight.desktop} line height, weight {typography.fontSize.h3.fontWeight})
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Class: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">.cpacc-heading-3</code>
            </p>
          </div>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
          <p className="cpacc-body-1 mb-3">
            Body 1 - This is the primary body text style. It's used for main content, paragraphs, and most text throughout the application. The text should be easily readable at this size with comfortable line height for extended reading.
          </p>
          <div className="space-y-1 text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Usage:</strong> {typography.fontSize['body-1'].usage}
            </p>
            <p className="text-gray-600 dark:text-gray-400 font-mono">
              {typography.fontSize['body-1'].size} / {typography.fontSize['body-1'].lineHeight} line height / weight {typography.fontSize['body-1'].fontWeight}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Class: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">.cpacc-body-1</code>
            </p>
          </div>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
          <p className="cpacc-body-2 mb-3">
            Body 2 - This is the secondary body text style. It's used for supporting text, captions, and less prominent content. Still readable but slightly smaller than Body 1.
          </p>
          <div className="space-y-1 text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Usage:</strong> {typography.fontSize['body-2'].usage}
            </p>
            <p className="text-gray-600 dark:text-gray-400 font-mono">
              {typography.fontSize['body-2'].size} / {typography.fontSize['body-2'].lineHeight} line height / weight {typography.fontSize['body-2'].fontWeight}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Class: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">.cpacc-body-2</code>
            </p>
          </div>
        </div>

        <div className="pb-6">
          <p className="cpacc-text-small mb-3">
            Small text - Used for labels, captions, and fine print. Smallest readable size in the system.
          </p>
          <div className="space-y-1 text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Usage:</strong> {typography.fontSize.small.usage}
            </p>
            <p className="text-gray-600 dark:text-gray-400 font-mono">
              {typography.fontSize.small.size} / {typography.fontSize.small.lineHeight} line height / weight {typography.fontSize.small.fontWeight}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Class: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">.cpacc-text-small</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const FontWeights: StoryObj = {
  render: () => (
    <div className="p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">Font Weights</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Weight variations for emphasis and hierarchy
      </p>

      <div className="space-y-6 bg-white dark:bg-gray-900 p-8 rounded-lg">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <p className="text-2xl font-normal text-gray-900 dark:text-gray-100 mb-1">
            Regular ({typography.fontWeight.regular})
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Used for body text and default content
          </p>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <p className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-1">
            Medium ({typography.fontWeight.medium})
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Used for button text and subtle emphasis
          </p>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
            Semibold ({typography.fontWeight.semibold})
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Used for subheadings and important labels
          </p>
        </div>

        <div className="pb-4">
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            Bold ({typography.fontWeight.bold})
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Used for headings and strong emphasis
          </p>
        </div>
      </div>
    </div>
  ),
}
