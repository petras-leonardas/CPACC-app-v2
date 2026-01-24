import CookieConsentBanner from 'react-cookie-consent'
import { setConsent, initializeAmplitude, trackEvent } from '../utils/analytics'
import { Link } from '../design-system'

export const CookieConsent = () => {
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
    // Note: This won't track since consent was declined
    console.log('Cookie consent declined')
  }

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
        background: 'rgba(0, 0, 0, 0.95)',
        padding: '20px',
        alignItems: 'center',
        gap: '20px',
      }}
      buttonStyle={{
        background: '#4F46E5',
        color: 'white',
        fontSize: '14px',
        padding: '12px 24px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: '500',
      }}
      declineButtonStyle={{
        background: 'transparent',
        color: 'white',
        fontSize: '14px',
        padding: '12px 24px',
        borderRadius: '6px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        cursor: 'pointer',
        fontWeight: '500',
      }}
      contentStyle={{
        flex: '1 0 300px',
        margin: '0',
      }}
      buttonWrapperClasses="cookie-buttons"
    >
      <span style={{ fontSize: '14px', lineHeight: '1.6' }}>
        We use cookies and analytics to understand how you use our site and improve your experience. 
        We track page views, interactions, and learning progress to help make CPACC Mastery better. 
        <Link 
          href="/privacy" 
          underline="always"
          style={{ color: '#93C5FD' }}
        >
          Read our Privacy Policy
        </Link>
      </span>
    </CookieConsentBanner>
  )
}
