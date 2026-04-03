import { renderHook, act } from '@testing-library/react'
import { useDarkMode } from '../useDarkMode'

describe('useDarkMode', () => {
  afterEach(() => {
    // Clean up dark class after each test
    document.documentElement.classList.remove('dark')
  })

  it('returns false when dark class is absent', () => {
    document.documentElement.classList.remove('dark')
    const { result } = renderHook(() => useDarkMode())
    expect(result.current).toBe(false)
  })

  it('returns true when dark class is present', () => {
    document.documentElement.classList.add('dark')
    const { result } = renderHook(() => useDarkMode())
    expect(result.current).toBe(true)
  })

  it('reacts to dark class being added', async () => {
    document.documentElement.classList.remove('dark')
    const { result } = renderHook(() => useDarkMode())
    expect(result.current).toBe(false)

    // MutationObserver is async -- wrap class change in act
    await act(async () => {
      document.documentElement.classList.add('dark')
      // Give MutationObserver time to fire
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(result.current).toBe(true)
  })

  it('reacts to dark class being removed', async () => {
    document.documentElement.classList.add('dark')
    const { result } = renderHook(() => useDarkMode())
    expect(result.current).toBe(true)

    await act(async () => {
      document.documentElement.classList.remove('dark')
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(result.current).toBe(false)
  })
})
