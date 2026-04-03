import CookieConsentBanner from 'react-cookie-consent'
import { setConsent, initializeAmplitude, trackEvent } from '../utils/analytics'
import { Link, useDarkMode, components, semantic } from '../design-system'

export const CookieConsent = () => {
  const isDark = useDarkMode()

  const handleAccept = () => {
    setConsent(true)
    initializeAmplitude()
    // Note: trackEvent will work now that Amplitude is initialized
    trackEvent('Cookie Consent Given', {
      action: 'accept',
    })
  }

  const handleDecline = () => {
    setConsent(false)
  }

  // Theme-aware colors pulled from design tokens
  const bg = isDark ? components.background.elevated.dark : components.background.elevated.light
  const border = isDark ? components.border.default.dark : components.border.default.light
  const textColor = isDark ? components.text.primary.dark : components.text.primary.light
  const secondaryText = isDark ? components.text.secondary.dark : components.text.secondary.light
  const primaryBg = isDark ? semantic.brandPrimary.dark : semantic.brandPrimary.light

  return (
    <CookieConsentBanner
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      enableDeclineButton
      onAccept={handleAccept}
      onDecline={handleDecline}
      cookieName="amplitude-consent"
      style={{
        background: bg,
        padding: '20px',
        alignItems: 'center',
        gap: '20px',
        borderTop: `1px solid ${border}`,
        boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}
      buttonStyle={{
        background: primaryBg,
        color: '#ffffff',
        fontSize: '14px',
        padding: '12px 24px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: '500',
      }}
      declineButtonStyle={{
        background: 'transparent',
        color: secondaryText,
        fontSize: '14px',
        padding: '12px 24px',
        borderRadius: '6px',
        border: `1px solid ${border}`,
        cursor: 'pointer',
        fontWeight: '500',
      }}
      contentStyle={{
        flex: '1 0 300px',
        margin: '0',
      }}
      buttonWrapperClasses="cookie-buttons"
    >
      <span style={{ fontSize: '14px', lineHeight: '1.6', color: textColor }}>
        We use cookies and analytics to understand how you use our site and improve your experience. 
        We track page views, interactions, and learning progress to help make CPACC Mastery better. 
        <Link 
          href="/privacy" 
          underline="always"
        >
          Read our Privacy Policy
        </Link>
      </span>
    </CookieConsentBanner>
  )
}
