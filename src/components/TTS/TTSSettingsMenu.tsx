import { useState, useRef, useEffect } from 'react'
import { Icon } from '../Icon'
import { IconButton } from '../../design-system'
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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setView('main')
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleVoiceSelect = (newVoice: TTSVoice) => {
    const oldVoice = voice
    onVoiceChange(newVoice)
    onVoiceChangeComplete?.(oldVoice, newVoice)
    setIsOpen(false)
    setView('main')
  }

  const handleSpeedSelect = (newRate: number) => {
    const oldRate = playbackRate
    onSpeedChange(newRate)
    onSpeedChangeComplete?.(oldRate, newRate)
    setIsOpen(false)
    setView('main')
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

  return (
    <div className="relative flex items-center" ref={menuRef}>
      <IconButton
        onClick={() => {
          setIsOpen(!isOpen)
          setView('main')
        }}
        icon={<Icon name="settings" customSize={18} />}
        tooltip="Settings"
        variant="secondary"
        size="md"
        aria-label="Open settings"
      />
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          {view === 'main' && (
            <div className="py-1">
              <button
                onClick={() => setView('voice')}
                className="w-full px-4 py-2 text-left text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
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
                onClick={() => setView('speed')}
                className="w-full px-4 py-2 text-left text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
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
                onClick={() => setView('main')}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700"
              >
                <Icon name="chevron-left" customSize={16} />
                <span>Back</span>
              </button>
              {[
                { value: 'en-US-Neural2-C' as TTSVoice, label: 'Female (AI)' },
                { value: 'en-US-Wavenet-I' as TTSVoice, label: 'Male (AI)' },
                { value: 'browser' as TTSVoice, label: 'Browser' }
              ].map((voiceOption) => (
                <button
                  key={voiceOption.value}
                  onClick={() => handleVoiceSelect(voiceOption.value)}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between ${
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
                onClick={() => setView('main')}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700"
              >
                <Icon name="chevron-left" customSize={16} />
                <span>Back</span>
              </button>
              {[1.0, 1.25, 1.5, 2.0, 2.25, 2.5, 2.75, 3.0].map((rate) => (
                <button
                  key={rate}
                  onClick={() => handleSpeedSelect(rate)}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between ${
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
