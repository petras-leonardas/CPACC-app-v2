import { useState, useEffect } from 'react'
import { setConsent, initializeAmplitude, trackEvent } from '../utils/analytics'
import { Modal, Text, useDarkMode, components } from '../design-system'
import { ChevronDown } from '../design-system/icons'

// Cloudflare Web Analytics custom event — fires before Amplitude is initialised
// so it captures consent decisions from all visitors regardless of their choice.
function trackCFEvent(name: string) {
  if (typeof window !== 'undefined' && typeof (window as Window & { zaraz?: { track: (name: string) => void } }).zaraz?.track === 'function') {
    ;(window as Window & { zaraz?: { track: (name: string) => void } }).zaraz!.track(name)
  }
}

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const isDark = useDarkMode()

  useEffect(() => {
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

  const subtleText = isDark ? components.text.secondary.dark : components.text.secondary.light

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
      <Text className="text-base leading-relaxed mt-2">
        No data is sold or shared with advertisers.
      </Text>

      {/* Accordion toggle */}
      <button
        type="button"
        onClick={() => setDetailsOpen((prev) => !prev)}
        aria-expanded={detailsOpen}
        className="mt-4 flex items-center gap-1.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded"
        style={{ color: subtleText }}
      >
        <ChevronDown
          size={16}
          style={{
            transform: detailsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 200ms ease',
          }}
        />
        {detailsOpen ? 'Hide details' : 'What data do we collect?'}
      </button>

      {/* Accordion content */}
      {detailsOpen && (
        <div className="mt-3 space-y-2">
          <Text variant="small" className="leading-relaxed">
            <strong>What we collect:</strong> page views, which topics and tests you use, test scores, scroll depth, and general interaction patterns. No names, emails, or personal details.
          </Text>
          <Text variant="small" className="leading-relaxed">
            <strong>How it's stored:</strong> via Amplitude, a third-party analytics service. Data is retained for 12 months.
          </Text>
          <Text variant="small" className="leading-relaxed">
            <strong>Why:</strong> to understand which parts of the app are useful and where people get stuck, so the content and experience can be improved.
          </Text>
          <Text variant="small" className="leading-relaxed">
            <strong>Your choice:</strong> declining means no analytics data is collected. You can change your mind any time in the Privacy Policy page.
          </Text>
        </div>
      )}
    </Modal>
  )
}
