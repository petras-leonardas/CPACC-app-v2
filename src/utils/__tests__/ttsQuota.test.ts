import { hasQuotaAvailable, updateTTSQuota } from '../ttsQuota'

const QUOTA_KEY = 'ttsQuota'
const MONTHLY_LIMIT = 1_000_000

beforeEach(() => {
  localStorage.clear()
  vi.restoreAllMocks()
})

describe('hasQuotaAvailable', () => {
  it('returns true when no quota has been used', () => {
    expect(hasQuotaAvailable()).toBe(true)
  })

  it('returns true when usage is under the limit', () => {
    localStorage.setItem(
      QUOTA_KEY,
      JSON.stringify({
        used: 100_000,
        resetDate: new Date(Date.now() + 86400000).toISOString(),
        limit: MONTHLY_LIMIT,
      })
    )
    expect(hasQuotaAvailable(100)).toBe(true)
  })

  it('returns false when usage is at the limit', () => {
    localStorage.setItem(
      QUOTA_KEY,
      JSON.stringify({
        used: MONTHLY_LIMIT,
        resetDate: new Date(Date.now() + 86400000).toISOString(),
        limit: MONTHLY_LIMIT,
      })
    )
    expect(hasQuotaAvailable()).toBe(false)
  })

  it('returns false when usage would exceed the limit', () => {
    localStorage.setItem(
      QUOTA_KEY,
      JSON.stringify({
        used: MONTHLY_LIMIT - 50,
        resetDate: new Date(Date.now() + 86400000).toISOString(),
        limit: MONTHLY_LIMIT,
      })
    )
    expect(hasQuotaAvailable(100)).toBe(false)
  })

  it('returns true when usage plus needed is still under limit', () => {
    localStorage.setItem(
      QUOTA_KEY,
      JSON.stringify({
        used: MONTHLY_LIMIT - 200,
        resetDate: new Date(Date.now() + 86400000).toISOString(),
        limit: MONTHLY_LIMIT,
      })
    )
    expect(hasQuotaAvailable(100)).toBe(true)
  })
})

describe('updateTTSQuota', () => {
  it('increments character count correctly', () => {
    updateTTSQuota(5000)
    const stored = JSON.parse(localStorage.getItem(QUOTA_KEY)!)
    expect(stored.used).toBe(5000)
  })

  it('accumulates across multiple updates', () => {
    updateTTSQuota(1000)
    updateTTSQuota(2000)
    updateTTSQuota(3000)
    const stored = JSON.parse(localStorage.getItem(QUOTA_KEY)!)
    expect(stored.used).toBe(6000)
  })

  it('preserves existing usage when adding more', () => {
    localStorage.setItem(
      QUOTA_KEY,
      JSON.stringify({
        used: 50_000,
        resetDate: new Date(Date.now() + 86400000).toISOString(),
        limit: MONTHLY_LIMIT,
      })
    )
    updateTTSQuota(10_000)
    const stored = JSON.parse(localStorage.getItem(QUOTA_KEY)!)
    expect(stored.used).toBe(60_000)
  })
})

describe('monthly quota reset', () => {
  it('resets usage when the month has changed', () => {
    // Set a quota with a reset date in the past
    const pastDate = new Date(2024, 0, 1).toISOString() // Jan 1 2024
    localStorage.setItem(
      QUOTA_KEY,
      JSON.stringify({
        used: 500_000,
        resetDate: pastDate,
        limit: MONTHLY_LIMIT,
      })
    )

    // Querying quota should trigger the reset
    expect(hasQuotaAvailable()).toBe(true)

    const stored = JSON.parse(localStorage.getItem(QUOTA_KEY)!)
    expect(stored.used).toBe(0)
  })

  it('does not reset usage when still within the current period', () => {
    const futureDate = new Date(Date.now() + 30 * 86400000).toISOString()
    localStorage.setItem(
      QUOTA_KEY,
      JSON.stringify({
        used: 500_000,
        resetDate: futureDate,
        limit: MONTHLY_LIMIT,
      })
    )

    hasQuotaAvailable()

    const stored = JSON.parse(localStorage.getItem(QUOTA_KEY)!)
    expect(stored.used).toBe(500_000)
  })

  it('sets new reset date to first of next month after reset', () => {
    const pastDate = new Date(2024, 0, 1).toISOString()
    localStorage.setItem(
      QUOTA_KEY,
      JSON.stringify({
        used: 100_000,
        resetDate: pastDate,
        limit: MONTHLY_LIMIT,
      })
    )

    hasQuotaAvailable()

    const stored = JSON.parse(localStorage.getItem(QUOTA_KEY)!)
    const resetDate = new Date(stored.resetDate)
    // Reset date should be the 1st of a future month
    expect(resetDate.getDate()).toBe(1)
    expect(resetDate.getTime()).toBeGreaterThan(Date.now())
  })
})

describe('monthly limit value', () => {
  it('uses 1,000,000 as the monthly character limit', () => {
    // Initialize quota by reading it
    hasQuotaAvailable()

    const stored = JSON.parse(localStorage.getItem(QUOTA_KEY)!)
    expect(stored.limit).toBe(1_000_000)
  })
})
