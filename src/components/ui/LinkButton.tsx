'use client'

import Link from 'next/link'
import { forwardRef } from 'react'
import { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { buttonVariants } from './Button'

interface LinkButtonProps extends VariantProps<typeof buttonVariants> {
  href: string
  children: React.ReactNode
  className?: string
  external?: boolean
  newTab?: boolean
}

const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      className,
      variant,
      size,
      href,
      children,
      external = false,
      newTab = false,
      ...props
    },
    ref
  ) => {
    const linkProps = {
      className: cn(buttonVariants({ variant, size, className })),
      ref,
      ...props,
    }

    if (external || newTab) {
      return (
        <a
          href={href}
          target={newTab ? '_blank' : undefined}
          rel={external || newTab ? 'noopener noreferrer' : undefined}
          {...linkProps}
        >
          {children}
        </a>
      )
    }

    return (
      <Link href={href} {...linkProps}>
        {children}
      </Link>
    )
  }
)

LinkButton.displayName = 'LinkButton'

export { LinkButton }
