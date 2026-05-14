import { ButtonHTMLAttributes, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 transform active:scale-95 select-none cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-brand-primary text-background hover:bg-brand-primary/90 hover:shadow-lg focus:bg-brand-primary/80 active:bg-brand-primary/95 disabled:bg-brand-primary/40 disabled:cursor-not-allowed disabled:transform-none',
        primary:
          'bg-primary text-background hover:bg-primary/90 hover:shadow-md focus:bg-primary/80 active:bg-primary/95 disabled:bg-primary/40 disabled:cursor-not-allowed disabled:transform-none',
        secondary:
          'bg-secondary text-primary border border-secondary hover:bg-secondary/90 hover:shadow-sm focus:bg-secondary/80 active:bg-secondary/95 disabled:bg-secondary/40 disabled:text-primary/50 disabled:border-secondary/40 disabled:cursor-not-allowed disabled:transform-none',
        tertiary:
          'bg-brand-primary text-background hover:bg-brand-primary/90 hover:shadow-md focus:bg-brand-primary/80 active:bg-brand-primary/95 disabled:bg-brand-primary/40 disabled:cursor-not-allowed disabled:transform-none',
        sage:
          'bg-accent-neutral text-background hover:bg-accent-sage-deep hover:shadow-md focus:bg-accent-sage-deep active:bg-accent-sage-deep disabled:bg-accent-neutral/40 disabled:cursor-not-allowed disabled:transform-none',
        subtle:
          'bg-primary/5 text-primary border border-primary/20 hover:bg-primary/10 hover:border-primary/30 hover:shadow-sm focus:bg-primary/10 active:bg-primary/20 disabled:bg-primary/5 disabled:opacity-50 disabled:border-primary/10 disabled:cursor-not-allowed disabled:transform-none',
        outline:
          'border-2 border-primary text-primary hover:bg-primary hover:text-background hover:shadow-sm focus:bg-primary/10 focus:text-primary active:bg-primary/20 disabled:border-primary/30 disabled:text-primary/30 disabled:cursor-not-allowed disabled:transform-none',
        ghost:
          'text-primary hover:bg-neutral-100 hover:shadow-sm focus:bg-neutral-100 active:bg-neutral-200 disabled:text-primary/40 disabled:cursor-not-allowed disabled:transform-none',
        link: 'text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors font-medium disabled:text-primary/40 disabled:cursor-not-allowed bg-transparent border-none rounded-none p-0 h-auto transform-none hover:transform-none active:transform-none',
        destructive:
          'bg-red-600 text-white hover:bg-red-700 hover:shadow-md focus:bg-red-700 active:bg-red-800 disabled:bg-red-300 disabled:cursor-not-allowed disabled:transform-none',
      },
      size: {
        default: 'h-10 px-6 py-3',
        sm: 'h-8 px-4 py-2 text-xs',
        lg: 'h-12 px-8 py-4 text-lg',
        xl: 'h-14 px-10 py-5 text-xl',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
