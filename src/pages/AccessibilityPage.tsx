import { SEO } from '../components/SEO'
import { usePageTracking } from '../hooks/usePageTracking'
import { useNavigate } from 'react-router-dom'

export function AccessibilityPage() {
  usePageTracking('Accessibility Statement')
  const navigate = useNavigate()

  return (
    <>
      <SEO 
        title="Accessibility Statement"
        description="Accessibility commitment and statement for CPACC Mastery"
        canonical="/accessibility"
      />
      <main className="flex-1 bg-gray-50 dark:bg-gray-950 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
          
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mb-6"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Accessibility Statement
          </h1>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Last updated: January 11, 2026
          </p>

          <div className="space-y-8 text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            
            {/* Commitment */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Our Commitment to Accessibility
              </h2>
              <p>
                CPACC Mastery is committed to ensuring digital accessibility for all users, including people with disabilities. As a resource dedicated to accessibility education, we strive to practice what we teach and continuously improve the user experience for everyone.
              </p>
            </section>

            {/* Standards */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Accessibility Standards
              </h2>
              <p className="mb-3">
                We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards, which include:
              </p>
              <ul className="list-disc list-outside ml-6 space-y-2">
                <li><strong>Perceivable:</strong> Information and user interface components must be presentable to users in ways they can perceive</li>
                <li><strong>Operable:</strong> User interface components and navigation must be operable</li>
                <li><strong>Understandable:</strong> Information and the operation of user interface must be understandable</li>
                <li><strong>Robust:</strong> Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies</li>
              </ul>
            </section>

            {/* Current Features */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Accessibility Features
              </h2>
              <p className="mb-3">
                Our website includes the following accessibility features:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-4">
                Visual Design
              </h3>
              <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
                <li>High contrast color schemes for readability</li>
                <li>Dark mode option to reduce eye strain</li>
                <li>Consistent and clear visual hierarchy</li>
                <li>Readable font sizes and line spacing</li>
                <li>Color is not the only means of conveying information</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-4">
                Navigation
              </h3>
              <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
                <li>Keyboard navigation support throughout the site</li>
                <li>Skip navigation links for screen reader users</li>
                <li>Clear and descriptive link text</li>
                <li>Consistent navigation structure</li>
                <li>Breadcrumb navigation for orientation</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-4">
                Content
              </h3>
              <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
                <li>Semantic HTML for proper structure</li>
                <li>Descriptive headings and labels</li>
                <li>Alternative text for images</li>
                <li>Clear and simple language</li>
                <li>Properly structured content with lists and sections</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-4">
                Interactive Features
              </h3>
              <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
                <li>Text-to-speech functionality for content reading</li>
                <li>Accessible form controls with proper labels</li>
                <li>Focus indicators for keyboard navigation</li>
                <li>Sufficient time to read and interact with content</li>
                <li>No time limits on practice tests (untimed mode available)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-4">
                Responsive Design
              </h3>
              <ul className="list-disc list-outside ml-6 space-y-2">
                <li>Mobile-responsive layout that works on all devices</li>
                <li>Content reflows properly at different screen sizes</li>
                <li>Touch targets sized appropriately for mobile use</li>
                <li>Zoom support up to 200% without loss of functionality</li>
              </ul>
            </section>

            {/* Testing */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Accessibility Testing
              </h2>
              <p className="mb-3">
                We regularly test our site using:
              </p>
              <ul className="list-disc list-outside ml-6 space-y-2">
                <li>Automated accessibility testing tools</li>
                <li>Manual testing with keyboard-only navigation</li>
                <li>Screen reader testing (NVDA, JAWS, VoiceOver)</li>
                <li>Browser testing across multiple browsers</li>
                <li>Mobile device testing</li>
              </ul>
            </section>

            {/* Known Issues */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Known Limitations
              </h2>
              <p className="mb-3">
                We are continuously working to improve accessibility. Currently known limitations include:
              </p>
              <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
                <li>Some complex interactive features may have reduced functionality with certain assistive technologies</li>
                <li>Text-to-speech feature may not work in all browsers</li>
                <li>Some third-party embedded content may not meet WCAG 2.1 AA standards</li>
              </ul>
              <p>
                We are actively working to address these limitations in future updates.
              </p>
            </section>

            {/* Compatible Technologies */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Compatible Technologies
              </h2>
              <p className="mb-3">
                Our site is designed to be compatible with:
              </p>
              <ul className="list-disc list-outside ml-6 space-y-2">
                <li>Modern web browsers (Chrome, Firefox, Safari, Edge)</li>
                <li>Screen readers (NVDA, JAWS, VoiceOver, TalkBack)</li>
                <li>Browser zoom and text resizing features</li>
                <li>Voice control software</li>
                <li>Keyboard-only navigation</li>
                <li>Mobile and tablet devices</li>
              </ul>
            </section>

            {/* Feedback */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Feedback and Assistance
              </h2>
              <p className="mb-3">
                We welcome your feedback on the accessibility of CPACC Mastery. If you encounter any accessibility barriers or have suggestions for improvement:
              </p>
              <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
                <li>Use our feedback form on any topic page</li>
                <li>Email us at: [Your contact email - to be added]</li>
                <li>Provide specific details about the issue and your assistive technology setup</li>
              </ul>
              <p>
                We aim to respond to accessibility feedback within 5 business days and strive to resolve issues as quickly as possible.
              </p>
            </section>

            {/* Complaints */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Formal Complaints
              </h2>
              <p>
                If you are not satisfied with our response to your accessibility concern, you may contact us directly with a formal complaint. We take all accessibility concerns seriously and will work with you to find a resolution.
              </p>
            </section>

            {/* Ongoing Efforts */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Ongoing Improvements
              </h2>
              <p className="mb-3">
                Our commitment to accessibility is ongoing. We continuously work to:
              </p>
              <ul className="list-disc list-outside ml-6 space-y-2">
                <li>Conduct regular accessibility audits</li>
                <li>Incorporate user feedback into design decisions</li>
                <li>Train our team on accessibility best practices</li>
                <li>Stay current with WCAG guidelines and emerging standards</li>
                <li>Test with diverse users and assistive technologies</li>
                <li>Remediate identified accessibility issues promptly</li>
              </ul>
            </section>

            {/* Third-Party Content */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Third-Party Content
              </h2>
              <p>
                While we strive to ensure that all content on CPACC Mastery is accessible, some third-party content or links to external resources may not meet the same accessibility standards. We are not responsible for the accessibility of external websites but welcome reports of accessibility issues you encounter.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Contact Information
              </h2>
              <p className="mb-3">
                For questions about accessibility or to report accessibility issues:
              </p>
              <p className="font-medium mb-2">
                Email: [Your contact email - to be added]
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We aim to respond to all accessibility inquiries within 5 business days.
              </p>
            </section>

            {/* Closing */}
            <section className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <p className="text-sm italic">
                This statement reflects our ongoing commitment to accessibility and will be updated as we continue to improve and expand our site.
              </p>
            </section>

          </div>
        </div>
      </main>
    </>
  )
}
