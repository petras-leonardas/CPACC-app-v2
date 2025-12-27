import { 
  Headphones,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Square,
  ArrowLeft,
  Layers,
  BookOpen,
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  Settings,
  Check,
  ClipboardCheck,
  Lightbulb,
  Sparkles,
} from 'lucide-react'
import type { LucideProps } from 'lucide-react'

const iconMap = {
  'headphones': Headphones,
  'skip-back': SkipBack,
  'play': Play,
  'pause': Pause,
  'skip-forward': SkipForward,
  'square': Square,
  'arrow-left': ArrowLeft,
  'layers': Layers,
  'book-open': BookOpen,
  'eye': Eye,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'arrow-up': ArrowUp,
  'settings': Settings,
  'check': Check,
  'clipboard-check': ClipboardCheck,
  'lightbulb': Lightbulb,
  'sparkles': Sparkles,
}

interface IconProps extends Omit<LucideProps, 'size'> {
  name: keyof typeof iconMap
  customSize?: number
}

export function Icon({ name, customSize, className, ...props }: IconProps) {
  const IconComponent = iconMap[name]
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`)
    return null
  }

  return (
    <IconComponent
      size={customSize}
      className={className}
      {...props}
    />
  )
}
