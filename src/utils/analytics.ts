import * as amplitude from '@amplitude/analytics-browser'

const AMPLITUDE_API_KEY = '5239a3d3f98603c3698d05941df91c3e'
const CONSENT_KEY = 'amplitude-consent'

let isInitialized = false

export const initializeAmplitude = () => {
  if (isInitialized) return

  const hasConsent = getConsent()
  
  if (hasConsent) {
    amplitude.init(AMPLITUDE_API_KEY, undefined, {
      autocapture: {
        elementInteractions: true,
      },
    })
    isInitialized = true
  }
}

export const setConsent = (granted: boolean) => {
  localStorage.setItem(CONSENT_KEY, granted ? 'true' : 'false')
  
  if (granted && !isInitialized) {
    initializeAmplitude()
  }
}

export const getConsent = (): boolean => {
  return localStorage.getItem(CONSENT_KEY) === 'true'
}

export const trackEvent = (eventName: string, eventProperties?: Record<string, string | number | boolean>) => {
  if (!isInitialized || !getConsent()) return
  
  amplitude.track(eventName, eventProperties)
}

export const trackPageView = (pageName: string, properties?: Record<string, string | number | boolean>) => {
  trackEvent('Page Viewed', {
    page: pageName,
    ...properties,
  })
}

export const setUserId = (userId: string) => {
  if (!isInitialized || !getConsent()) return
  
  amplitude.setUserId(userId)
}

export const identifyUser = (userProperties: Record<string, string | number | boolean>) => {
  if (!isInitialized || !getConsent()) return
  
  const identifyEvent = new amplitude.Identify()
  Object.entries(userProperties).forEach(([key, value]) => {
    identifyEvent.set(key, value)
  })
  amplitude.identify(identifyEvent)
}
