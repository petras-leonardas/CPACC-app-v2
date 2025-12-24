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
