import { useState, useEffect } from 'react'
import { setConsent, initializeAmplitude, trackEvent } from '../utils/analytics'
import { Modal, Text, Link } from '../design-system'

// Cloudflare Web Analytics custom event — fires before Amplitude is initialised
// so it captures consent decisions from all visitors regardless of their choice.
function trackCFEvent(name: string) {
  if (typeof window !== 'undefined' && typeof (window as Window & { zaraz?: { track: (name: string) => void } }).zaraz?.track === 'function') {
    ;(window as Window & { zaraz?: { track: (name: string) => void } }).zaraz!.track(name)
  }
}

export const CookieConsent = () => {
  // Only show if the user hasn't already made a decision
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // If consent is already stored (either direction), don't show the modal
    const stored = localStorage.getItem('amplitude-consent')
    if (stored === null) {
      setVisible(true)
    }
  }, [])

  const handleAccept = () => {
    trackCFEvent('consent_accepted')
    setConsent(true)
    initializeAmplitude()
    trackEvent('Cookie Consent Given', { action: 'accept' })
    setVisible(false)
  }

  const handleDecline = () => {
    trackCFEvent('consent_declined')
    setConsent(false)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <Modal
      isOpen={visible}
      onClose={handleDecline}
      title="Your privacy"
      size="sm"
      closeOnBackdropClick={false}
      closeOnEscape={false}
      backdropBlur
      primaryActionLabel="Accept"
      onPrimaryAction={handleAccept}
      secondaryActionLabel="Decline"
      onSecondaryAction={handleDecline}
    >
      <Text className="text-base leading-relaxed">
        We use analytics to understand how people use CPACC Mastery — things like which topics are studied most and how tests are going. This helps make the app better over time.
      </Text>
      <Text className="text-base leading-relaxed mt-3">
        No data is sold or shared with advertisers.{' '}
        <Link href="/privacy" underline="always">
          Read our Privacy Policy
        </Link>
        .
      </Text>
    </Modal>
  )
}
