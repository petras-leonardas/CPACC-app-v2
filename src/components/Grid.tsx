import type { ReactNode } from 'react';

interface GridContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * GridContainer - Main container for page content with max-width and responsive padding
 * Matches the 12-column grid system from Figma
 */
export function GridContainer({ children, className = '' }: GridContainerProps) {
  return (
    <div className={`max-w-7xl mx-auto px-4 md:px-8 ${className}`}>
      {children}
    </div>
  );
}

interface GridProps {
  children: ReactNode;
  gap?: number;
  className?: string;
}

/**
 * Grid - 12-column grid layout component
 * 
 * @param gap - Gap between columns in Tailwind scale (default: 6 = 24px)
 * 
 * Usage:
 * <Grid gap={6}>
 *   <div className="col-span-8">Content</div>
 *   <div className="col-span-4">Sidebar</div>
 * </Grid>
 */
export function Grid({ children, gap = 6, className = '' }: GridProps) {
  // Map gap values to Tailwind classes (required for JIT compiler)
  const gapClass = {
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
    12: 'gap-12',
  }[gap] || 'gap-6';

  return (
    <div className={`grid grid-cols-12 ${gapClass} ${className}`}>
      {children}
    </div>
  );
}
