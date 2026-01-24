import type { Meta, StoryObj } from '@storybook/react'
import { Link } from './Link'

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    underline: {
      control: 'select',
      options: ['none', 'hover', 'always'],
      description: 'Text decoration style',
    },
    external: {
      control: 'boolean',
      description: 'Opens in new tab with security attributes',
    },
  },
}

export default meta
type Story = StoryObj<typeof Link>

export const Default: Story = {
  args: {
    href: '/about',
    children: 'This is a link',
  },
}

export const InParagraph: Story = {
  render: () => (
    <div className="max-w-2xl">
      <p className="text-gray-700 dark:text-gray-300 text-base">
        This is a paragraph of text with a <Link href="/docs">link to the documentation</Link> embedded 
        within it. Links should flow naturally with the surrounding text and be distinguishable by their 
        color and underline.
      </p>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const UnderlineVariations: Story = {
  render: () => (
    <div className="space-y-6 p-8 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Always Underlined (Default)
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          This paragraph has a <Link href="/about">link with permanent underline</Link> for maximum visibility.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Underline on Hover
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          This paragraph has a <Link href="/about" underline="hover">link that underlines on hover</Link> for a cleaner look.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          No Underline
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          This paragraph has a <Link href="/about" underline="none">link with no underline</Link> relying on color alone.
        </p>
      </div>

      <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800 mt-6">
        <p className="text-sm text-orange-800 dark:text-orange-200">
          <strong>♿ Accessibility Note:</strong> Underlines help users with color blindness identify links. 
          The default is always underlined for best accessibility.
        </p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const ExternalLinks: Story = {
  render: () => (
    <div className="space-y-6 p-8 max-w-2xl">
      <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
        <p className="text-sm text-green-800 dark:text-green-200 mb-2">
          <strong>🔒 Secure External Links:</strong> External links automatically get target blank and rel noopener for security.
        </p>
        <p className="text-sm text-green-800 dark:text-green-200">
          <strong>💡 No Icons:</strong> Following gov.uk design system research, we don't use external link icons as they add confusion and noise.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          External Links
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3">
          Visit the <Link href="https://w3.org/WAI/WCAG21" external>WCAG 2.1 guidelines</Link> for more information 
          about web accessibility standards.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Check out <Link href="https://webaim.org" external>WebAIM resources</Link> for practical accessibility guidance.
        </p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const InContent: Story = {
  render: () => (
    <div className="space-y-8 p-8 max-w-3xl">
      <article>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Understanding Web Accessibility
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Web accessibility means that websites, tools, and technologies are designed so that people 
          with disabilities can use them. The <Link href="https://w3.org/WAI" external>Web Accessibility Initiative</Link> develops 
          standards to help you understand accessibility.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The <Link href="https://w3.org/WAI/WCAG21" external>WCAG guidelines</Link> are organized 
          around four principles. To learn more, visit our <Link href="/guides">implementation guides</Link> or explore <Link href="/courses">training courses</Link>.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          For additional resources, check out <Link href="https://webaim.org" external>WebAIM</Link> and <Link href="https://a11yproject.com" external>The A11Y Project</Link>.
        </p>
      </article>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const Navigation: Story = {
  render: () => (
    <div className="space-y-6 p-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Inline Navigation
        </h3>
        <nav className="flex gap-6">
          <Link href="/home">Home</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/practice">Practice</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const FocusState: Story = {
  render: () => (
    <div className="space-y-6 p-8">
      <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
        <p className="text-sm text-orange-800 dark:text-orange-200">
          <strong>🔍 Try Keyboard Navigation:</strong> Press Tab to navigate. Notice the orange focus ring!
        </p>
      </div>

      <div>
        <p className="text-gray-700 dark:text-gray-300">
          Navigate to <Link href="/home">home page</Link>, view the <Link href="/docs">documentation</Link>, 
          or check out <Link href="/examples">examples</Link> to get started.
        </p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const DarkMode: Story = {
  render: () => (
    <div className="space-y-6 p-8 max-w-2xl">
      <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>💡 Toggle Dark Mode:</strong> Use the toolbar to see link colors adapt with WCAG AAA compliance.
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-gray-700 dark:text-gray-300">
          This is body text with an <Link href="/inline">inline link</Link> that adapts to dark mode.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Visit <Link href="https://example.com" external>external resources</Link> for more information.
        </p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const Accessibility: Story = {
  render: () => (
    <div className="space-y-6 p-8 max-w-2xl">
      <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
        <h3 className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">
          ♿ Accessibility Features
        </h3>
        <ul className="text-sm text-green-800 dark:text-green-200 space-y-1 list-disc list-inside">
          <li>Same focus ring as buttons (orange accent, 2px)</li>
          <li>Underline by default for visibility</li>
          <li>External links open securely</li>
          <li>WCAG AAA color contrast</li>
          <li>Keyboard navigable</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Link Text Best Practices
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">❌ Bad</h4>
            <p className="text-gray-700 dark:text-gray-300">
              To learn more, <Link href="/docs">click here</Link>.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              No context for screen reader users.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">✅ Good</h4>
            <p className="text-gray-700 dark:text-gray-300">
              <Link href="/docs">Learn more about WCAG guidelines</Link> on our documentation page.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Descriptive link text explains where it goes.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}
