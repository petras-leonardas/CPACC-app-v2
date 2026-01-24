import { Icon } from '../Icon'
import { IconButton } from '../../design-system'

interface TTSMediaControlsProps {
  isPlaying: boolean
  isPaused: boolean
  currentIndex: number
  totalSections: number
  onPlay: () => void
  onPause: () => void
  onStop: () => void
  onPrevious: () => void
  onNext: () => void
}

/**
 * TTS Media Controls Component
 * 
 * Provides playback control buttons for text-to-speech:
 * - Play/Pause/Resume button (primary)
 * - Previous/Next buttons (when playing/paused)
 * - Stop button (when playing/paused)
 */
export function TTSMediaControls({
  isPlaying,
  isPaused,
  currentIndex,
  totalSections,
  onPlay,
  onPause,
  onStop,
  onPrevious,
  onNext
}: TTSMediaControlsProps) {
  return (
    <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
      {(isPlaying || isPaused) && (
        <IconButton
          onClick={onPrevious}
          disabled={currentIndex <= 0}
          icon={<Icon name="skip-back" customSize={18} />}
          tooltip="Previous"
          variant="secondary"
          size="md"
          data-tracking-id="tts-inline-previous"
          className="btn-appear"
          aria-label="Previous section"
        />
      )}
      
      {!isPlaying && !isPaused && (
        <IconButton
          onClick={onPlay}
          icon={<Icon name="play" customSize={18} />}
          tooltip="Play"
          variant="primary"
          size="md"
          data-tracking-id="tts-inline-play"
          aria-label="Play narration"
        />
      )}
      
      {isPlaying && (
        <IconButton
          onClick={onPause}
          icon={<Icon name="pause" customSize={18} />}
          tooltip="Pause"
          variant="primary"
          size="md"
          data-tracking-id="tts-inline-pause"
          aria-label="Pause narration"
        />
      )}
      
      {isPaused && (
        <IconButton
          onClick={onPlay}
          icon={<Icon name="play" customSize={18} />}
          tooltip="Resume"
          variant="primary"
          size="md"
          data-tracking-id="tts-inline-play"
          aria-label="Resume narration"
        />
      )}
      
      {(isPlaying || isPaused) && (
        <>
          <IconButton
            onClick={onNext}
            disabled={currentIndex >= totalSections - 1}
            icon={<Icon name="skip-forward" customSize={18} />}
            tooltip="Next"
            variant="secondary"
            size="md"
            data-tracking-id="tts-inline-next"
            className="btn-appear"
            aria-label="Next section"
          />
          <IconButton
            onClick={onStop}
            icon={<Icon name="square" customSize={18} />}
            tooltip="Stop"
            variant="secondary"
            size="md"
            data-tracking-id="tts-inline-stop"
            className="btn-appear"
            aria-label="Stop narration"
          />
        </>
      )}
    </div>
  )
}
