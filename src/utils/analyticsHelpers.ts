import { trackEvent, identifyUser } from './analytics'

// ===========================
// USER PROFILE MANAGEMENT
// ===========================

interface UserProfile {
  totalTestsTaken: number
  totalTopicsViewed: number
  averageScore: number
  preferredTestType: string
  userLevel: 'beginner' | 'intermediate' | 'advanced'
  prefersTTS: boolean
  hasSubmittedFeedback: boolean
  lastTestDate: string
  firstVisitDate: string
  totalSessionCount: number
  totalTimeSpentMinutes: number
}

const PROFILE_KEY = 'user_analytics_profile'

export function getUserProfile(): UserProfile {
  const stored = localStorage.getItem(PROFILE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return getDefaultProfile()
    }
  }
  return getDefaultProfile()
}

function getDefaultProfile(): UserProfile {
  return {
    totalTestsTaken: 0,
    totalTopicsViewed: 0,
    averageScore: 0,
    preferredTestType: '',
    userLevel: 'beginner',
    prefersTTS: false,
    hasSubmittedFeedback: false,
    lastTestDate: '',
    firstVisitDate: new Date().toISOString(),
    totalSessionCount: 0,
    totalTimeSpentMinutes: 0
  }
}

export function updateUserProfile(updates: Partial<UserProfile>) {
  const current = getUserProfile()
  const updated = { ...current, ...updates }
  localStorage.setItem(PROFILE_KEY, JSON.stringify(updated))
  
  // Update Amplitude user properties
  identifyUser({
    totalTestsTaken: updated.totalTestsTaken,
    totalTopicsViewed: updated.totalTopicsViewed,
    averageScore: updated.averageScore,
    userLevel: updated.userLevel,
    prefersTTS: updated.prefersTTS,
    hasSubmittedFeedback: updated.hasSubmittedFeedback,
    daysSinceFirstVisit: calculateDaysSince(updated.firstVisitDate)
  })
}

export function incrementTestCount(score: number, testType: string) {
  const profile = getUserProfile()
  const newTotal = profile.totalTestsTaken + 1
  const newAvg = ((profile.averageScore * profile.totalTestsTaken) + score) / newTotal
  
  updateUserProfile({
    totalTestsTaken: newTotal,
    averageScore: Math.round(newAvg),
    lastTestDate: new Date().toISOString(),
    preferredTestType: testType,
    userLevel: newAvg > 80 ? 'advanced' : newAvg > 60 ? 'intermediate' : 'beginner'
  })
}

export function incrementTopicViewCount() {
  const profile = getUserProfile()
  updateUserProfile({
    totalTopicsViewed: profile.totalTopicsViewed + 1
  })
}

export function markTTSUsed() {
  const profile = getUserProfile()
  if (!profile.prefersTTS) {
    updateUserProfile({ prefersTTS: true })
  }
}

export function markFeedbackSubmitted() {
  updateUserProfile({ hasSubmittedFeedback: true })
}

// ===========================
// FEATURE DISCOVERY TRACKING
// ===========================

const FEATURE_USAGE_KEY = 'feature_usage_'

export function trackFirstTimeFeatureUse(featureName: string, properties?: Record<string, string | number | boolean>) {
  const key = `${FEATURE_USAGE_KEY}${featureName}`
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, new Date().toISOString())
    const profile = getUserProfile()
    trackEvent('Feature First Used', {
      feature: featureName,
      daysSinceFirstVisit: calculateDaysSince(profile.firstVisitDate),
      ...properties
    })
  }
}

// ===========================
// SESSION TRACKING
// ===========================

interface StudySession {
  sessionId: string
  startTime: number
  topicsViewed: Set<string>
  testsTaken: number
  totalScore: number
  testsCompleted: number
}

let currentSession: StudySession | null = null

export function startStudySession() {
  if (!currentSession) {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    currentSession = {
      sessionId,
      startTime: Date.now(),
      topicsViewed: new Set(),
      testsTaken: 0,
      totalScore: 0,
      testsCompleted: 0
    }
    
    trackEvent('Study Session Started', {
      sessionId,
      timestamp: currentSession.startTime
    })
  }
}

export function addTopicToSession(topicId: string) {
  if (currentSession) {
    currentSession.topicsViewed.add(topicId)
  }
}

export function addTestToSession(score: number) {
  if (currentSession) {
    currentSession.testsTaken++
    currentSession.testsCompleted++
    currentSession.totalScore += score
  }
}

export function endStudySession() {
  if (currentSession) {
    const duration = Math.round((Date.now() - currentSession.startTime) / 1000 / 60) // minutes
    
    // Only track if session was at least 2 minutes
    if (duration >= 2) {
      trackEvent('Study Session Ended', {
        sessionId: currentSession.sessionId,
        duration,
        topicsViewed: currentSession.topicsViewed.size,
        testsTaken: currentSession.testsTaken,
        averageScore: currentSession.testsCompleted > 0 
          ? Math.round(currentSession.totalScore / currentSession.testsCompleted)
          : 0
      })
      
      // Update profile
      const profile = getUserProfile()
      updateUserProfile({
        totalSessionCount: profile.totalSessionCount + 1,
        totalTimeSpentMinutes: profile.totalTimeSpentMinutes + duration
      })
    }
    
    currentSession = null
  }
}

// ===========================
// CONTENT TRACKING
// ===========================

const VIEWED_TOPICS_KEY = 'viewed_topics_order'

export function trackTopicFirstView(topicId: string, topicTitle: string) {
  const viewedTopics = getViewedTopics()
  
  if (!viewedTopics.some(t => t.topicId === topicId)) {
    const viewOrder = viewedTopics.length + 1
    viewedTopics.push({ topicId, topicTitle, timestamp: Date.now() })
    localStorage.setItem(VIEWED_TOPICS_KEY, JSON.stringify(viewedTopics))
    
    const profile = getUserProfile()
    trackEvent('Content First Viewed', {
      contentType: 'topic',
      contentId: topicId,
      contentTitle: topicTitle,
      viewOrder,
      sessionNumber: profile.totalSessionCount
    })
  }
}

function getViewedTopics(): Array<{ topicId: string; topicTitle: string; timestamp: number }> {
  const stored = localStorage.getItem(VIEWED_TOPICS_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return []
    }
  }
  return []
}

export function getPreviousTestScore(topicId: string): number | null {
  const key = `test_score_${topicId}`
  const stored = localStorage.getItem(key)
  return stored ? parseInt(stored) : null
}

export function saveTestScore(topicId: string, score: number) {
  localStorage.setItem(`test_score_${topicId}`, score.toString())
  localStorage.setItem(`test_date_${topicId}`, Date.now().toString())
}

export function getTestHistory(topicId: string): { score: number; date: number } | null {
  const score = localStorage.getItem(`test_score_${topicId}`)
  const date = localStorage.getItem(`test_date_${topicId}`)
  
  if (score && date) {
    return { score: parseInt(score), date: parseInt(date) }
  }
  return null
}

// ===========================
// UTILITY FUNCTIONS
// ===========================

export function calculateDaysSince(dateString: string): number {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function getDeviceType(): string {
  const width = window.innerWidth
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

export function getConnectionType(): string {
  const connection = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection
  return connection?.effectiveType || 'unknown'
}

// ===========================
// ERROR TRACKING
// ===========================

export function setupErrorTracking() {
  // JavaScript errors
  window.addEventListener('error', (event) => {
    trackEvent('JavaScript Error', {
      errorMessage: event.message,
      errorSource: event.filename,
      errorLine: event.lineno,
      errorColumn: event.colno,
      page: window.location.pathname
    })
  })

  // Unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    trackEvent('Unhandled Promise Rejection', {
      errorMessage: event.reason?.message || String(event.reason),
      page: window.location.pathname
    })
  })
}

// ===========================
// PERFORMANCE TRACKING
// ===========================

export function trackPagePerformance(pageName: string) {
  if (typeof window === 'undefined' || !window.performance) return
  
  // Wait for load to complete
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      if (perfData) {
        trackEvent('Page Load Performance', {
          page: pageName,
          loadTime: Math.round(perfData.loadEventEnd - perfData.fetchStart),
          domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
          domInteractive: Math.round(perfData.domInteractive - perfData.fetchStart),
          connectionType: getConnectionType(),
          deviceType: getDeviceType()
        })
      }
    }, 0)
  }, { once: true })
}

// ===========================
// KEYBOARD & ACCESSIBILITY
// ===========================

let keyboardNavCount = 0
let keyboardUserDetected = false

export function setupAccessibilityTracking(pageName: string) {
  document.addEventListener('keydown', (e) => {
    if (['Tab', 'Enter', 'ArrowUp', 'ArrowDown', 'Escape', ' '].includes(e.key)) {
      keyboardNavCount++
      
      // Detect keyboard user after 5 keyboard navigation actions
      if (keyboardNavCount === 5 && !keyboardUserDetected) {
        keyboardUserDetected = true
        trackEvent('Keyboard Navigation Detected', {
          page: pageName,
          likelyKeyboardUser: true
        })
      }
    }
  })
}

// ===========================
// COPY/PASTE TRACKING
// ===========================

export function setupContentCopyTracking(topicId: string) {
  document.addEventListener('copy', () => {
    const selection = window.getSelection()?.toString()
    if (selection && selection.length > 10) {
      trackEvent('Content Copied', {
        topicId,
        textLength: selection.length,
        firstWords: selection.substring(0, 50)
      })
    }
  })
}

// ===========================
// THEME DETECTION TRACKING
// ===========================

const THEME_DETECTED_KEY = 'theme_detected_session'

export function trackInitialTheme(theme: 'light' | 'dark', source: 'saved-preference' | 'system-preference' | 'default') {
  // Only track once per session
  const sessionId = sessionStorage.getItem(THEME_DETECTED_KEY)
  if (sessionId) return
  
  sessionStorage.setItem(THEME_DETECTED_KEY, 'true')
  
  trackEvent('Theme Detected', {
    theme,
    source,
    systemPrefersDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
    deviceType: getDeviceType()
  })
}
