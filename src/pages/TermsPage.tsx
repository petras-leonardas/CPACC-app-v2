import { SEO } from '../components/SEO'
import { usePageTracking } from '../hooks/usePageTracking'
import { useNavigate } from 'react-router-dom'
import { Heading, Text, Container } from '../design-system'

export function TermsPage() {
  usePageTracking('Terms of Use')
  const navigate = useNavigate()

  return (
    <>
      <SEO 
        title="Terms of Use"
        description="Terms of use and disclaimer for CPACC Mastery"
        canonical="/terms"
      />
      <main className="flex-1 overflow-y-auto">
        <Container size="md" padding="md" className="py-8 md:py-12">
          
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

          <Heading as="h1" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Terms of Use
          </Heading>
          
          <Text variant="small" className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Last updated: January 11, 2026
          </Text>

          <div className="space-y-8 text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            
            {/* Introduction */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Introduction
              </Heading>
              <Text variant="body1">
                Welcome to CPACC Mastery. By accessing or using our website at cpacc-mastery.pages.dev (the "Site"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Site.
              </Text>
            </section>

            {/* About This Resource */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                About This Resource
              </Heading>
              <Text variant="body1" className="mb-3">
                CPACC Mastery is an independent educational resource designed to help individuals learn about accessibility concepts based on the Certified Professional in Accessibility Core Competencies (CPACC) Body of Knowledge published by the International Association of Accessibility Professionals (IAAP).
              </Text>
              <Text variant="body1" className="font-semibold">
                This Site is not affiliated with, endorsed by, or sponsored by IAAP.
              </Text>
            </section>

            {/* Educational Purpose */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Educational Purpose Only
              </Heading>
              <Text variant="body1" className="mb-3">
                The content provided on this Site is for educational and informational purposes only. It is intended to:
              </Text>
              <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
                <li>Help users understand accessibility concepts</li>
                <li>Provide practice questions and learning materials</li>
                <li>Support CPACC exam preparation</li>
                <li>Foster accessibility knowledge sharing</li>
              </ul>
              <Text variant="body1" className="font-semibold">
                This Site does not guarantee success on the CPACC certification exam or any other professional certification.
              </Text>
            </section>

            {/* No Professional Advice */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                No Professional Advice
              </Heading>
              <Text variant="body1">
                The information on this Site should not be construed as professional, legal, medical, or technical advice. Always consult with qualified professionals for specific guidance related to accessibility implementation, compliance requirements, or certification preparation.
              </Text>
            </section>

            {/* Content Accuracy */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Content Accuracy and Updates
              </Heading>
              <Text variant="body1" className="mb-3">
                While we strive to provide accurate and up-to-date information:
              </Text>
              <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
                <li>Content may not reflect the most current CPACC exam format or requirements</li>
                <li>Information may contain errors or omissions</li>
                <li>The CPACC Body of Knowledge and exam may be updated by IAAP at any time</li>
                <li>We make no guarantees about the completeness or accuracy of the content</li>
              </ul>
              <Text variant="body1">
                Users should verify all information with official IAAP resources and the current CPACC Body of Knowledge.
              </Text>
            </section>

            {/* Intellectual Property */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Intellectual Property
              </Heading>
              <Text variant="body1" className="mb-3">
                The content structure, design, code, and original materials on this Site are the intellectual property of CPACC Mastery and are protected by copyright laws.
              </Text>
              <Text variant="body1" className="mb-3">
                The CPACC Body of Knowledge and related certification materials are the intellectual property of IAAP. This Site references and is based upon publicly available IAAP materials but does not claim ownership of IAAP's intellectual property.
              </Text>
              <Text variant="body1">
                Users may access the Site for personal, non-commercial educational purposes. You may not reproduce, distribute, or create derivative works without permission.
              </Text>
            </section>

            {/* User Conduct */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                User Conduct
              </Heading>
              <Text variant="body1" className="mb-3">When using the Site, you agree not to:</Text>
              <ul className="list-disc list-outside ml-6 space-y-2">
                <li>Use the Site for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to the Site or its systems</li>
                <li>Interfere with the proper functioning of the Site</li>
                <li>Submit false, misleading, or malicious content through feedback forms</li>
                <li>Scrape, copy, or redistribute content without permission</li>
                <li>Misrepresent affiliation with IAAP or the CPACC certification</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Limitation of Liability
              </Heading>
              <Text variant="body1" className="mb-4 font-semibold">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, CPACC MASTERY SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM:
              </Text>
              <ul className="list-disc list-outside ml-6 space-y-2">
                <li>Your use or inability to use the Site</li>
                <li>Any errors or omissions in the content</li>
                <li>Failure to pass the CPACC exam or other certifications</li>
                <li>Reliance on information provided on the Site</li>
                <li>Unauthorized access to your data</li>
                <li>Any other matter relating to the Site</li>
              </ul>
            </section>

            {/* Disclaimer of Warranties */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Disclaimer of Warranties
              </Heading>
              <Text variant="body1" className="mb-3">
                THE SITE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
              </Text>
              <ul className="list-disc list-outside ml-6 space-y-2">
                <li>Warranties of merchantability or fitness for a particular purpose</li>
                <li>Warranties regarding accuracy, completeness, or currency of content</li>
                <li>Warranties that the Site will be uninterrupted or error-free</li>
                <li>Warranties regarding exam success or certification outcomes</li>
              </ul>
            </section>

            {/* Third-Party Links */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Third-Party Links and Resources
              </Heading>
              <Text variant="body1">
                The Site may contain links to third-party websites, including IAAP's official website. We are not responsible for the content, accuracy, or availability of external sites. Links do not imply endorsement unless explicitly stated.
              </Text>
            </section>

            {/* Modifications */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Changes to These Terms
              </Heading>
              <Text variant="body1">
                We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting. Your continued use of the Site after changes constitutes acceptance of the updated terms.
              </Text>
            </section>

            {/* Termination */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Termination
              </Heading>
              <Text variant="body1">
                We reserve the right to suspend or terminate access to the Site at any time, for any reason, without notice.
              </Text>
            </section>

            {/* Governing Law */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Governing Law
              </Heading>
              <Text variant="body1">
                These Terms of Use shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
              </Text>
            </section>

            {/* Contact */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Contact Us
              </Heading>
              <Text variant="body1" className="mb-3">
                If you have questions about these Terms of Use, please contact us:
              </Text>
              <Text variant="body1" className="font-medium">
                Email: [Your contact email - to be added]
              </Text>
            </section>

            {/* Acknowledgment */}
            <section className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <Text variant="small" className="text-sm italic">
                By using CPACC Mastery, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use.
              </Text>
            </section>

          </div>
        </Container>
      </main>
    </>
  )
}
