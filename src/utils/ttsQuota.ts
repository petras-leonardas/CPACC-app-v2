interface TTSQuotaState {
  used: number          // Characters used this month
  resetDate: string     // ISO date string for next reset (1st of next month)
  limit: number         // Monthly character limit (1M for Neural2 voices)
}

const QUOTA_KEY = 'ttsQuota'
const MONTHLY_LIMIT = 1_000_000 // 1 million characters for Neural2 voices

/**
 * Get the first day of next month
 */
function getNextMonthStart(): string {
  const now = new Date()
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  return nextMonth.toISOString()
}

/**
 * Initialize or get quota state from localStorage
 */
function isValidQuota(obj: unknown): obj is TTSQuotaState {
  if (typeof obj !== 'object' || obj === null) return false
  const o = obj as Record<string, unknown>
  return (
    typeof o.used === 'number' &&
    typeof o.resetDate === 'string' &&
    typeof o.limit === 'number' &&
    !isNaN(o.used as number) &&
    !isNaN(o.limit as number)
  )
}

function getTTSQuota(): TTSQuotaState {
  try {
    const stored = localStorage.getItem(QUOTA_KEY)
    
    if (stored) {
      const parsed: unknown = JSON.parse(stored)
      if (!isValidQuota(parsed)) {
        // Corrupted data — reinitialize
        const freshQuota: TTSQuotaState = { used: 0, resetDate: getNextMonthStart(), limit: MONTHLY_LIMIT }
        localStorage.setItem(QUOTA_KEY, JSON.stringify(freshQuota))
        return freshQuota
      }
      const quota = parsed
      const now = new Date()
      const resetDate = new Date(quota.resetDate)
      
      // Check if we need to reset (new month)
      if (now >= resetDate) {
        const newQuota: TTSQuotaState = {
          used: 0,
          resetDate: getNextMonthStart(),
          limit: MONTHLY_LIMIT
        }
        localStorage.setItem(QUOTA_KEY, JSON.stringify(newQuota))
        return newQuota
      }
      
      return quota
    }
    
    // First time - initialize
    const initialQuota: TTSQuotaState = {
      used: 0,
      resetDate: getNextMonthStart(),
      limit: MONTHLY_LIMIT
    }
    localStorage.setItem(QUOTA_KEY, JSON.stringify(initialQuota))
    return initialQuota
    
  } catch (error) {
    console.error('Error reading TTS quota:', error)
    // Return safe default
    return {
      used: 0,
      resetDate: getNextMonthStart(),
      limit: MONTHLY_LIMIT
    }
  }
}

/**
 * Update quota with character usage
 */
export function updateTTSQuota(charactersUsed: number): void {
  try {
    const quota = getTTSQuota()
    quota.used += charactersUsed
    localStorage.setItem(QUOTA_KEY, JSON.stringify(quota))
  } catch (error) {
    console.error('Error updating TTS quota:', error)
  }
}

/**
 * Check if quota is available for given character count
 */
export function hasQuotaAvailable(charactersNeeded: number = 0): boolean {
  const quota = getTTSQuota()
  return (quota.used + charactersNeeded) < quota.limit
}


