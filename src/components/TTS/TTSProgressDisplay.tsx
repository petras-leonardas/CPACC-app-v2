import { Icon } from '../Icon'
import { Heading, Text } from '../../design-system'

interface TTSProgressDisplayProps {
  isPlaying: boolean
  isPaused: boolean
  timeRemaining: number | null
  selectedVoice: string
}

/**
 * TTS Progress Display Component
 * 
 * Displays the current status of the text-to-speech player including:
 * - Status text (Playing/Paused/Listen to this page)
 * - Headphones icon (hidden on mobile when playing/paused)
 * - Time remaining (when playing or paused)
 */
export function TTSProgressDisplay({ 
  isPlaying, 
  isPaused, 
  timeRemaining,
  selectedVoice
}: TTSProgressDisplayProps) {
  // Format time in MM:SS format
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex items-center gap-2 md:gap-3 min-w-0">
      <Icon 
        name="headphones" 
        customSize={20} 
        className={`text-gray-700 dark:text-gray-300 flex-shrink-0 ${(isPlaying || isPaused) ? 'hidden md:block' : ''}`} 
      />
      <div className="min-w-0">
        <Heading as="h3" className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
          {isPlaying ? 'Playing' : isPaused ? 'Paused' : 'Listen to this page'}
        </Heading>
        {(isPlaying || isPaused) && timeRemaining !== null && (
          <Text variant="small" className="text-xs text-gray-500 dark:text-gray-500 mt-0.5 truncate">
            {selectedVoice === 'browser' ? '~' : ''}{formatTime(timeRemaining)} remaining
          </Text>
        )}
      </div>
    </div>
  )
}
