import { useState, useRef, useEffect, useCallback } from 'react'
import { Icon } from '../Icon'
import { IconButton } from '../../design-system'
import { focusRingClasses, getFocusRingStyle } from '../../design-system/utils/focusStyles'
import { useDarkMode } from '../../design-system/hooks/useDarkMode'
import type { TTSVoice } from '../../hooks/useTTSSettings'

interface TTSSettingsMenuProps {
  voice: TTSVoice
  playbackRate: number
  onVoiceChange: (voice: TTSVoice) => void
  onSpeedChange: (rate: number) => void
  onVoiceChangeComplete?: (oldVoice: string, newVoice: TTSVoice) => void
  onSpeedChangeComplete?: (oldRate: number, newRate: number) => void
}

type SettingsView = 'main' | 'voice' | 'speed'

/**
 * TTS Settings Menu Component
 * 
 * Dropdown menu for configuring text-to-speech settings:
 * - Voice selection (Female AI, Male AI, Browser)
 * - Playback speed (1.0x to 3.0x)
 * 
 * Features:
 * - Click outside to close
 * - Escape key to close
 * - Arrow key navigation between menu items
 * - ARIA menu/menuitem roles for screen readers
 * - Nested navigation (main → voice/speed → back)
 * - Visual indicator of current selection
 */
export function TTSSettingsMenu({
  voice,
  playbackRate,
  onVoiceChange,
  onSpeedChange,
  onVoiceChangeComplete,
  onSpeedChangeComplete
}: TTSSettingsMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [view, setView] = useState<SettingsView>('main')
  const menuRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const [focusedIndex, setFocusedIndex] = useState(0)
  const isDark = useDarkMode()
  const focusRingStyle = getFocusRingStyle(isDark)

  // Close and return focus to the trigger button
  const closeMenu = useCallback(() => {
    setIsOpen(false)
    setView('main')
    setFocusedIndex(0)
    triggerRef.current?.focus()
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setView('main')
        setFocusedIndex(0)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Focus the active menu item when view or focusedIndex changes
  useEffect(() => {
    if (!isOpen) return
    const items = menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"], [role="menuitemradio"]')
    if (items && items.length > 0) {
      const idx = Math.min(focusedIndex, items.length - 1)
      items[idx]?.focus()
    }
  }, [isOpen, view, focusedIndex])

  // Keyboard navigation within the menu
  const handleMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    const items = menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"], [role="menuitemradio"]')
    if (!items || items.length === 0) return
    const totalItems = items.length

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault()
        const next = (focusedIndex + 1) % totalItems
        setFocusedIndex(next)
        break
      }
      case 'ArrowUp': {
        e.preventDefault()
        const prev = (focusedIndex - 1 + totalItems) % totalItems
        setFocusedIndex(prev)
        break
      }
      case 'Tab':
        if (e.shiftKey) {
          if (focusedIndex <= 0) {
            e.preventDefault()
            closeMenu()
          } else {
            e.preventDefault()
            setFocusedIndex(prev => prev - 1)
          }
        } else {
          if (focusedIndex >= totalItems - 1) {
            closeMenu()
          } else {
            e.preventDefault()
            setFocusedIndex(prev => prev + 1)
          }
        }
        break
      case 'Escape':
        e.preventDefault()
        closeMenu()
        break
      case 'Home':
        e.preventDefault()
        setFocusedIndex(0)
        break
      case 'End':
        e.preventDefault()
        setFocusedIndex(totalItems - 1)
        break
    }
  }, [focusedIndex, closeMenu])

  const handleVoiceSelect = (newVoice: TTSVoice) => {
    const oldVoice = voice
    onVoiceChange(newVoice)
    onVoiceChangeComplete?.(oldVoice, newVoice)
    closeMenu()
  }

  const handleSpeedSelect = (newRate: number) => {
    const oldRate = playbackRate
    onSpeedChange(newRate)
    onSpeedChangeComplete?.(oldRate, newRate)
    closeMenu()
  }

  const getVoiceLabel = (voiceValue: TTSVoice): string => {
    switch (voiceValue) {
      case 'en-US-Neural2-C':
        return 'Female'
      case 'en-US-Wavenet-I':
        return 'Male'
      case 'browser':
        return 'Browser'
      default:
        return 'Unknown'
    }
  }

  const openSubmenu = (submenu: SettingsView) => {
    setView(submenu)
    setFocusedIndex(0)
  }

  const goBack = () => {
    setView('main')
    setFocusedIndex(0)
  }

  const menuItemBase = `w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center ${focusRingClasses}`

  return (
    <div className="relative flex items-center" ref={menuRef}>
      <IconButton
        ref={triggerRef}
        onClick={() => {
          if (isOpen) {
            closeMenu()
          } else {
            setIsOpen(true)
            setView('main')
            setFocusedIndex(0)
          }
        }}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === 'ArrowDown' && !isOpen) {
            e.preventDefault()
            setIsOpen(true)
            setView('main')
            setFocusedIndex(0)
          }
        }}
        icon={<Icon name="settings" customSize={18} />}
        tooltip="Settings"
        variant="ghost"
        size="md"
        aria-label="Open settings"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      />
      
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50"
          role="menu"
          aria-label={view === 'main' ? 'TTS settings' : view === 'voice' ? 'Voice selection' : 'Speed selection'}
          onKeyDown={handleMenuKeyDown}
          style={focusRingStyle}
        >
          {view === 'main' && (
            <div className="py-1">
              <button
                role="menuitem"
                tabIndex={focusedIndex === 0 ? 0 : -1}
                onClick={() => openSubmenu('voice')}
                className={`${menuItemBase} justify-between text-gray-900 dark:text-gray-100`}
              >
                <span>Voice</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {getVoiceLabel(voice)}
                  </span>
                  <Icon name="chevron-right" customSize={16} />
                </div>
              </button>
              <button
                role="menuitem"
                tabIndex={focusedIndex === 1 ? 0 : -1}
                onClick={() => openSubmenu('speed')}
                className={`${menuItemBase} justify-between text-gray-900 dark:text-gray-100`}
              >
                <span>Speed</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{playbackRate}×</span>
                  <Icon name="chevron-right" customSize={16} />
                </div>
              </button>
            </div>
          )}
          
          {view === 'voice' && (
            <div className="py-1">
              <button
                role="menuitem"
                tabIndex={focusedIndex === 0 ? 0 : -1}
                onClick={goBack}
                className={`${menuItemBase} gap-2 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700`}
              >
                <Icon name="chevron-left" customSize={16} />
                <span>Back</span>
              </button>
              {[
                { value: 'en-US-Neural2-C' as TTSVoice, label: 'Female (AI)' },
                { value: 'en-US-Wavenet-I' as TTSVoice, label: 'Male (AI)' },
                { value: 'browser' as TTSVoice, label: 'Browser' }
              ].map((voiceOption, index) => (
                <button
                  key={voiceOption.value}
                  role="menuitemradio"
                  tabIndex={focusedIndex === index + 1 ? 0 : -1}
                  aria-checked={voice === voiceOption.value}
                  onClick={() => handleVoiceSelect(voiceOption.value)}
                  className={`${menuItemBase} justify-between ${
                    voice === voiceOption.value 
                      ? 'text-gray-900 dark:text-gray-100 font-medium' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span>{voiceOption.label}</span>
                  {voice === voiceOption.value && (
                    <Icon name="check" customSize={16} className="text-gray-900 dark:text-gray-100" />
                  )}
                </button>
              ))}
            </div>
          )}
          
          {view === 'speed' && (
            <div className="py-1">
              <button
                role="menuitem"
                tabIndex={focusedIndex === 0 ? 0 : -1}
                onClick={goBack}
                className={`${menuItemBase} gap-2 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700`}
              >
                <Icon name="chevron-left" customSize={16} />
                <span>Back</span>
              </button>
               {[1.0, 1.25, 1.5, 2.0, 2.25, 2.5, 2.75, 3.0].map((rate, index) => (
                <button
                  key={rate}
                  role="menuitemradio"
                  tabIndex={focusedIndex === index + 1 ? 0 : -1}
                  aria-checked={playbackRate === rate}
                  onClick={() => handleSpeedSelect(rate)}
                  className={`${menuItemBase} justify-between ${
                    playbackRate === rate 
                      ? 'text-gray-900 dark:text-gray-100 font-medium' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span>{rate}×</span>
                  {playbackRate === rate && (
                    <Icon name="check" customSize={16} className="text-gray-900 dark:text-gray-100" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
