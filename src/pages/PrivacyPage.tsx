import { SEO } from '../components/SEO'
import { usePageTracking } from '../hooks/usePageTracking'
import { useNavigate } from 'react-router-dom'

export function PrivacyPage() {
  usePageTracking('Privacy Policy')
  const navigate = useNavigate()

  return (
    <>
      <SEO 
        title="Privacy Policy"
        description="Privacy policy for CPACC Mastery - how we collect, use, and protect your data"
        canonical="/privacy"
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
            Privacy Policy
          </h1>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Last updated: January 11, 2026
          </p>

          <div className="space-y-8 text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Introduction
              </h2>
              <p>
                CPACC Mastery ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website at cpacc-mastery.pages.dev (the "Site").
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Information We Collect
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-4">
                Analytics Data
              </h3>
              <p className="mb-3">
                We use Amplitude Analytics to understand how users interact with our Site. This includes:
              </p>
              <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
                <li>Pages visited and time spent on pages</li>
                <li>Click events and navigation patterns</li>
                <li>Device type, browser, and operating system</li>
                <li>General location (country/city level)</li>
                <li>Referral source (how you found our site)</li>
              </ul>
              <p>
                Analytics are only collected after you provide cookie consent. You can opt out at any time by managing your cookie preferences.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-4">
                Feedback Form Data
              </h3>
              <p className="mb-3">
                When you submit feedback through our feedback form, we collect:
              </p>
              <ul className="list-disc list-outside ml-6 space-y-2">
                <li>Your email address (optional, if provided)</li>
                <li>Feedback message content</li>
                <li>Page or topic you're providing feedback about</li>
                <li>Timestamp of submission</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                How We Use Your Information
              </h2>
              <p className="mb-3">We use the collected information to:</p>
              <ul className="list-disc list-outside ml-6 space-y-2">
                <li>Improve the Site's content and user experience</li>
                <li>Understand which topics and features are most valuable</li>
                <li>Identify and fix technical issues</li>
                <li>Respond to feedback and suggestions (if email provided)</li>
                <li>Monitor Site performance and usage patterns</li>
              </ul>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Cookies and Tracking Technologies
              </h2>
              <p className="mb-3">
                We use cookies to:
              </p>
              <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
                <li>Remember your cookie consent preferences</li>
                <li>Store your theme preference (light/dark mode)</li>
                <li>Enable Amplitude Analytics (only with your consent)</li>
              </ul>
              <p>
                You can manage or disable cookies through your browser settings. However, disabling cookies may affect some Site functionality.
              </p>
            </section>

            {/* Third-Party Services */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Third-Party Services
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-4">
                Amplitude Analytics
              </h3>
              <p className="mb-3">
                We use Amplitude to analyze user behavior. Amplitude may collect and process data according to their privacy policy. You can learn more at:
              </p>
              <p className="mb-4">
                <a 
                  href="https://amplitude.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-900 dark:text-gray-100 underline hover:text-gray-700 dark:hover:text-gray-300"
                >
                  https://amplitude.com/privacy
                </a>
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-4">
                Cloudflare
              </h3>
              <p>
                Our Site is hosted on Cloudflare Pages and uses Cloudflare D1 for data storage. Cloudflare may collect technical information as part of their service. Learn more at:
              </p>
              <p className="mt-2">
                <a 
                  href="https://www.cloudflare.com/privacypolicy/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-900 dark:text-gray-100 underline hover:text-gray-700 dark:hover:text-gray-300"
                >
                  https://www.cloudflare.com/privacypolicy/
                </a>
              </p>
            </section>

            {/* Data Storage and Security */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Data Storage and Security
              </h2>
              <p className="mb-3">
                Your data is stored securely:
              </p>
              <ul className="list-disc list-outside ml-6 space-y-2">
                <li>Feedback submissions are stored in Cloudflare D1 database</li>
                <li>Analytics data is processed by Amplitude</li>
                <li>We use industry-standard security measures</li>
                <li>Data is transmitted over HTTPS encryption</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Your Rights
              </h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc list-outside ml-6 space-y-2">
                <li>Opt out of analytics by declining cookie consent</li>
                <li>Request deletion of your feedback submissions</li>
                <li>Request a copy of data we have about you</li>
                <li>Update or correct your information</li>
              </ul>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Children's Privacy
              </h2>
              <p>
                Our Site is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date. Continued use of the Site after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Contact Us
              </h2>
              <p className="mb-3">
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>
              <p className="font-medium">
                Email: [Your contact email - to be added]
              </p>
            </section>

          </div>
        </div>
      </main>
    </>
  )
}
