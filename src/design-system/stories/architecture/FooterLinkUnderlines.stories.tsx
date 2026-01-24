import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Architecture/Design Decisions/Footer Link Underlines',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj

export const Documentation: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-8">
      <article className="prose dark:prose-invert prose-lg">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Footer Link Underlines: A Design Decision
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Why we always underline footer links in the CPACC Mastery design system
        </p>

        <div className="border-l-4 border-orange-500 pl-6 my-8 bg-orange-50 dark:bg-orange-950 p-6 rounded-r">
          <p className="text-lg text-gray-800 dark:text-gray-200 font-semibold mb-2">
            Our Decision
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            In CPACC Mastery, footer links are <strong>always underlined</strong>, not just on hover. 
            This ensures they are immediately recognizable as links without relying on color alone, 
            maintaining WCAG compliance and accessibility best practices.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
          The Common Pattern: Hover-Only Underlines
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Many modern websites and design systems use hover-only underlines in their footers. 
          This pattern has become popular for aesthetic reasons:
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
          <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Why Brands Use Hover-Only Underlines
          </h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            <li><strong>Visual minimalism:</strong> Creates a cleaner, less cluttered footer appearance</li>
            <li><strong>Modern aesthetic:</strong> Follows contemporary web design trends</li>
            <li><strong>Reduced noise:</strong> In content-heavy footers with many links</li>
            <li><strong>Brand consistency:</strong> Matches overall minimal design language</li>
            <li><strong>Progressive disclosure:</strong> Links reveal themselves on interaction</li>
          </ul>

          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Examples of hover-only footer patterns:</strong> Vercel, Stripe, many modern SaaS products, 
              e-commerce sites, marketing pages, and portfolio sites commonly use this approach.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
          The Accessibility Problem
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          While hover-only underlines create a clean visual design, they introduce accessibility challenges 
          that conflict with WCAG guidelines:
        </p>

        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-6 rounded-lg mb-6">
          <h4 className="text-xl font-semibold text-red-900 dark:text-red-100 mb-3">
            WCAG 1.4.1: Use of Color (Level A)
          </h4>
          <div className="bg-white dark:bg-gray-900 p-4 rounded border border-red-300 dark:border-red-700 mb-4">
            <p className="text-gray-700 dark:text-gray-300 italic">
              "Color is not used as the only visual means of conveying information, indicating an action, 
              prompting a response, or distinguishing a visual element."
            </p>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-3 font-semibold">The Issue:</p>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            When footer links only appear on hover and are distinguished from regular text solely by color 
            (e.g., blue links vs gray text), they violate this guideline.
          </p>

          <p className="text-gray-700 dark:text-gray-300 font-semibold mb-2">Who This Affects:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            <li><strong>Users with color blindness:</strong> Cannot distinguish links from regular text</li>
            <li><strong>Users with low vision:</strong> May not perceive color differences</li>
            <li><strong>Keyboard-only users:</strong> Don't trigger hover states while tabbing</li>
            <li><strong>Touch device users:</strong> No hover state on mobile/tablet</li>
            <li><strong>Screen magnifier users:</strong> May not see hover effects if focused elsewhere</li>
            <li><strong>Users with cognitive disabilities:</strong> Need clear, consistent link indicators</li>
          </ul>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-400 p-4 mb-8">
          <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Real-World Impact:</p>
          <p className="text-gray-700 dark:text-gray-300">
            A user with deuteranopia (red-green color blindness) viewing a footer with blue links on gray 
            background may see all text as the same color. Without underlines, they cannot identify which 
            text is clickable.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
          What Accessibility Leaders Do
        </h2>

        <div className="space-y-6 mb-8">
          <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-3">
              GOV.UK Design System
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>Approach:</strong> Always underlines footer links
            </p>
            <p className="text-gray-700 dark:text-gray-300 italic mb-3">
              "Links must be visually distinguishable for all users. Underlines are the most universally 
              recognized link indicator and should not be removed in favor of color-only differentiation."
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              GOV.UK conducted extensive research with users with disabilities and concluded that always-visible 
              underlines are essential for accessibility.
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
              WebAIM (Web Accessibility In Mind)
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>Approach:</strong> Always underlines all text links
            </p>
            <p className="text-gray-700 dark:text-gray-300 italic mb-3">
              "Underlines are the most common and recognizable way to identify a link. Removing underlines 
              reduces usability and accessibility."
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              WebAIM's recommendation applies to all links, including footer navigation.
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-3">
              Nielsen Norman Group
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>Research Finding:</strong> "Users scan for underlines when looking for links"
            </p>
            <p className="text-gray-700 dark:text-gray-300 italic">
              "Link underlines are a strong perceived affordance. Removing them makes users work harder to 
              identify interactive elements and can reduce task success rates."
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
          Link Underline Patterns: When to Use Each
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Our Link component supports three underline modes. Here's when each is appropriate:
        </p>

        <div className="space-y-6 mb-8">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">underline="always"</code> (Default)
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>Use for:</strong> All standard text links in content, navigation, footers
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>Why:</strong> Ensures WCAG compliance, maximum accessibility, universal recognition
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
              <code className="text-sm text-gray-800 dark:text-gray-200">
                {`<Link href="/terms">Terms</Link>`}
              </code>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">underline="hover"</code>
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>Use sparingly:</strong> Only when additional visual affordances exist
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>Warning:</strong> May violate WCAG 1.4.1 if color is the only differentiator
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Consider this only for supplementary links where context makes the interactive nature obvious, 
              or when other non-color indicators are present (icons, buttons, etc.)
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
              <code className="text-sm text-gray-800 dark:text-gray-200">
                {`<Link href="/optional" underline="hover">Supplementary Link</Link>`}
              </code>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">underline="none"</code>
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>Use only when:</strong> Link wraps an interactive component that provides its own affordances
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>Valid scenarios:</strong> Wrapping cards, buttons, or other components with clear interactive styling
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
              <code className="text-sm text-gray-800 dark:text-gray-200">
                {`<Link href="/domain" underline="none">
  <Card interactive>
    <h3>Domain Title</h3>
    <p>Card provides the visual affordance</p>
  </Card>
</Link>`}
              </code>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
          Why CPACC Mastery Always Underlines Footer Links
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          For our accessibility education platform, we made a deliberate choice to prioritize accessibility 
          over aesthetic trends:
        </p>

        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-6">
          <ol className="space-y-4 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-gray-100">1. Mission Alignment</strong>
              <br />
              As an accessibility education platform, we must model best practices. Teaching WCAG compliance 
              while violating it ourselves would undermine our credibility.
            </li>
            
            <li>
              <strong className="text-gray-900 dark:text-gray-100">2. WCAG Compliance</strong>
              <br />
              Always-underlined links ensure we meet WCAG 1.4.1 (Use of Color) at Level A. Color is not the 
              only means of distinguishing links from regular text.
            </li>
            
            <li>
              <strong className="text-gray-900 dark:text-gray-100">3. Universal Accessibility</strong>
              <br />
              Underlines work for everyone: keyboard users, touch device users, screen magnifier users, 
              users with color vision deficiencies, and users with cognitive disabilities.
            </li>
            
            <li>
              <strong className="text-gray-900 dark:text-gray-100">4. Consistency</strong>
              <br />
              Our body content links are always underlined. Footer links should follow the same pattern 
              for predictable, consistent user experience.
            </li>
            
            <li>
              <strong className="text-gray-900 dark:text-gray-100">5. Evidence-Based Design</strong>
              <br />
              We follow research from accessibility leaders (GOV.UK, WebAIM, Nielsen Norman Group) rather 
              than aesthetic trends.
            </li>
            
            <li>
              <strong className="text-gray-900 dark:text-gray-100">6. Educational Value</strong>
              <br />
              Our design system serves as a teaching tool. Every decision should demonstrate accessibility 
              principles students can learn from and apply.
            </li>
          </ol>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
          Aesthetic vs Accessibility: A False Choice
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Some might argue that always-underlined links look "dated" or "cluttered." We reject this framing:
        </p>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-6 rounded-lg mb-6">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>Accessible design is good design.</strong> Underlines are a universal affordance that has 
            worked reliably for decades. They are familiar, predictable, and effective.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The goal isn't to chase the latest visual trends—it's to create an inclusive experience that works 
            for the widest possible audience, including those with disabilities.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            When aesthetics and accessibility conflict, <strong>accessibility must win</strong>.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
          Implementation
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          In our Footer component, we use the Link component with its default underline behavior:
        </p>

        <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
{`// Footer links - always underlined (default)
<Link 
  href="/terms"
  onClick={() => handleFooterLinkClick('terms')} 
  data-tracking-id="footer-terms"
>
  Terms
</Link>

// Default underline="always" ensures:
// - WCAG 1.4.1 compliance
// - Visual indicator beyond color
// - Consistency with body links
// - Accessibility for all users`}
        </pre>

        <div className="bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-400 p-4 mb-8">
          <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Note:</p>
          <p className="text-gray-700 dark:text-gray-300">
            We previously used <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">underline="hover"</code> in 
            our footer, following common modern patterns. After analysis, we changed to default (always underlined) 
            to align with our accessibility mission and WCAG compliance.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
          When This Decision Might Change
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          We would reconsider this decision if:
        </p>

        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4 mb-6">
          <li>WCAG guidelines change to allow color-only link differentiation (unlikely)</li>
          <li>We find an alternative non-color indicator that tests equally well (e.g., consistent icons)</li>
          <li>User research shows our audience strongly prefers hover-only underlines without accessibility impact</li>
          <li>New web standards provide better native link affordances</li>
        </ul>

        <p className="text-gray-700 dark:text-gray-300">
          Until then, we prioritize universal accessibility over visual trends.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
          Key Takeaway
        </h2>

        <div className="border-l-4 border-orange-500 pl-6 my-8 bg-orange-50 dark:bg-orange-950 p-6 rounded-r">
          <p className="text-lg text-gray-800 dark:text-gray-200">
            <strong>Context drives decisions, but accessibility is non-negotiable.</strong> While hover-only 
            underlines work for some contexts, an accessibility education platform must demonstrate best 
            practices. Always-underlined links ensure WCAG compliance and universal accessibility.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-4">
            Don't sacrifice accessibility for aesthetic trends. Underlines are a proven, universal affordance 
            that work for everyone.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
          Further Reading
        </h2>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <strong>WCAG 1.4.1: Use of Color:</strong> Understanding success criterion for color usage
            </li>
            <li>
              <strong>GOV.UK Design System:</strong> Link styling and accessibility research
            </li>
            <li>
              <strong>WebAIM:</strong> Links and Hypertext - Accessibility best practices
            </li>
            <li>
              <strong>Nielsen Norman Group:</strong> Guidelines for Visualizing Links
            </li>
            <li>
              <strong>W3C Techniques:</strong> G183: Using a contrast ratio of 3:1 with surrounding text and providing 
              additional visual cues for links
            </li>
          </ul>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: January 2026 • This is a living document and may be updated as we gather more 
            user research and evidence.
          </p>
        </div>
      </article>
    </div>
  ),
}
