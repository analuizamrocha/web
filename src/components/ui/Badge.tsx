import { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex max-w-full min-w-0 items-center rounded-full text-left text-xs font-medium leading-tight whitespace-normal break-words',
  {
    variants: {
      variant: {
        primary: 'bg-primary/10 text-primary',
        secondary: 'bg-secondary/30 text-primary',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        error: 'bg-red-100 text-red-800',
        info: 'bg-blue-100 text-blue-800',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1 text-xs',
        lg: 'px-4 py-2 text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: ReactNode
}

export function Badge({
  className,
  variant,
  size,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </span>
  )
}
