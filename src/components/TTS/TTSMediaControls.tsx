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
 * - Play/Pause/Resume button (primary) — single DOM element to preserve focus
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
  const isActive = isPlaying || isPaused

  // Determine play/pause button state — single button to preserve keyboard focus
  const playPauseIcon = isPlaying ? 'pause' : 'play'
  const playPauseLabel = isPlaying
    ? 'Pause narration'
    : isPaused
      ? 'Resume narration'
      : 'Play narration'
  const playPauseTooltip = isPlaying ? 'Pause' : isPaused ? 'Resume' : 'Play'
  const playPauseAction = isPlaying ? onPause : onPlay

  return (
    <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
      {isActive && (
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
      
      {/* Single play/pause button — preserves focus across state changes */}
      <IconButton
        onClick={playPauseAction}
        icon={<Icon name={playPauseIcon} customSize={18} />}
        tooltip={playPauseTooltip}
        variant="primary"
        size="md"
        data-tracking-id={isPlaying ? 'tts-inline-pause' : 'tts-inline-play'}
        aria-label={playPauseLabel}
      />
      
      {isActive && (
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
