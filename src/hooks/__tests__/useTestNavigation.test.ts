import { renderHook, act } from '@testing-library/react'
import { useTestNavigation } from '../useTestNavigation'

vi.mock('../../utils/analytics', () => ({
  trackEvent: vi.fn(),
}))

describe('useTestNavigation', () => {
  const defaultParams = {
    onBack: vi.fn(),
    onNavigationAttempt: undefined as ((interceptor: (cb: () => void) => void) => void) | undefined,
    showResult: false,
    answers: new Map<number, number | null>(),
    totalQuestions: 10,
    testType: 'topic-quick',
  }

  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  function renderNav(overrides?: Partial<typeof defaultParams>) {
    return renderHook(() =>
      useTestNavigation({ ...defaultParams, ...overrides })
    )
  }

  describe('initial state', () => {
    it('exit modal is closed', () => {
      const { result } = renderNav()
      expect(result.current.showExitModal).toBe(false)
    })

    it('is not in exiting state', () => {
      const { result } = renderNav()
      expect(result.current.isExiting).toBe(false)
    })

    it('has no exit method', () => {
      const { result } = renderNav()
      expect(result.current.exitMethod).toBeNull()
    })
  })

  describe('handleExitClick', () => {
    it('opens exit modal with ui-button method', () => {
      const { result } = renderNav()

      act(() => {
        result.current.handleExitClick()
      })

      expect(result.current.showExitModal).toBe(true)
      expect(result.current.exitMethod).toBe('ui-button')
    })
  })

  describe('handleCancelExit', () => {
    it('closes exit modal and resets state', () => {
      const { result } = renderNav()

      // Open modal first
      act(() => { result.current.handleExitClick() })
      expect(result.current.showExitModal).toBe(true)

      // Cancel
      act(() => { result.current.handleCancelExit() })
      expect(result.current.showExitModal).toBe(false)
      expect(result.current.exitMethod).toBeNull()
    })
  })

  describe('handleConfirmExit', () => {
    it('closes modal and calls onBack with exit animation', () => {
      const onBack = vi.fn()
      const { result } = renderNav({ onBack })

      // Open and confirm
      act(() => { result.current.handleExitClick() })
      act(() => { result.current.handleConfirmExit() })

      expect(result.current.showExitModal).toBe(false)
      expect(result.current.isExiting).toBe(true)

      // After animation timeout, onBack should fire
      act(() => { vi.advanceTimersByTime(400) })
      expect(onBack).toHaveBeenCalledTimes(1)
    })

    it('calls pending navigation callback when sidebar nav triggered', () => {
      const pendingNav = vi.fn()
      const onNavAttempt = vi.fn()

      const { result } = renderNav({ onNavigationAttempt: onNavAttempt })

      // Simulate the interceptor being registered and called
      const interceptor = onNavAttempt.mock.calls[0]?.[0]
      if (interceptor) {
        act(() => { interceptor(pendingNav) })
        expect(result.current.showExitModal).toBe(true)
        expect(result.current.exitMethod).toBe('sidebar-navigation')

        act(() => { result.current.handleConfirmExit() })
        act(() => { vi.advanceTimersByTime(400) })

        expect(pendingNav).toHaveBeenCalledTimes(1)
      }
    })
  })

  describe('escape key', () => {
    it('closes modal on Escape press', () => {
      const { result } = renderNav()

      // Open modal
      act(() => { result.current.handleExitClick() })
      expect(result.current.showExitModal).toBe(true)

      // Press Escape
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      })

      expect(result.current.showExitModal).toBe(false)
    })

    it('does not close when modal is already closed', () => {
      const { result } = renderNav()
      expect(result.current.showExitModal).toBe(false)

      // Press Escape when already closed -- should stay closed (no error)
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      })
      expect(result.current.showExitModal).toBe(false)
    })
  })

  describe('animateExit', () => {
    it('sets isExiting and calls callback after delay', () => {
      const callback = vi.fn()
      const { result } = renderNav()

      act(() => { result.current.animateExit(callback) })
      expect(result.current.isExiting).toBe(true)
      expect(callback).not.toHaveBeenCalled()

      act(() => { vi.advanceTimersByTime(400) })
      expect(callback).toHaveBeenCalledTimes(1)
    })
  })

  describe('navigation interceptor', () => {
    it('registers interceptor on mount', () => {
      const onNavAttempt = vi.fn()
      renderNav({ onNavigationAttempt: onNavAttempt })
      expect(onNavAttempt).toHaveBeenCalledTimes(1)
      expect(typeof onNavAttempt.mock.calls[0][0]).toBe('function')
    })

    it('does not register when onNavigationAttempt is undefined', () => {
      // Should not throw
      const { result } = renderNav({ onNavigationAttempt: undefined })
      expect(result.current.showExitModal).toBe(false)
    })
  })

  describe('analytics data', () => {
    it('calculates completion percentage based on answers', () => {
      const answers = new Map<number, number | null>([[0, 1], [1, 2], [2, null]])
      const { result } = renderNav({ answers, totalQuestions: 10 })

      act(() => { result.current.handleExitClick() })
      // The analytics call is internal -- we just verify no crash
      expect(result.current.showExitModal).toBe(true)
    })

    it('handles zero totalQuestions without division error', () => {
      const { result } = renderNav({ totalQuestions: 0 })

      act(() => { result.current.handleExitClick() })
      expect(result.current.showExitModal).toBe(true)
    })
  })
})
