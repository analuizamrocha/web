import { cn } from '@/lib/utils'

interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Divider({ 
  orientation = 'horizontal', 
  size = 'md',
  className 
}: DividerProps) {
  const baseClasses = 'bg-secondary/20'
  
  const orientationClasses = {
    horizontal: 'w-full h-px',
    vertical: 'w-px h-full'
  }
  
  const sizeClasses = {
    sm: orientation === 'horizontal' ? 'h-px' : 'w-px',
    md: orientation === 'horizontal' ? 'h-0.5' : 'w-0.5', 
    lg: orientation === 'horizontal' ? 'h-1' : 'w-1'
  }

  return (
    <div 
      className={cn(
        baseClasses,
        orientationClasses[orientation],
        sizeClasses[size],
        className
      )}
      role="separator"
      aria-orientation={orientation}
    />
  )
}