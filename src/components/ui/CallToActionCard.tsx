import { ReactNode } from 'react'

interface CallToActionCardProps {
  title: string
  body: ReactNode
  actions: ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
}

export function CallToActionCard({
  title,
  body,
  actions,
  variant = 'secondary',
  className = '',
}: CallToActionCardProps) {
  const variantClasses = {
    primary: 'bg-primary/5 border-primary/20',
    secondary: 'bg-secondary/10 border-secondary/20',
  }

  return (
    <div
      className={`rounded-3xl p-8 lg:p-10 border mb-8 text-start ${variantClasses[variant]} ${className}`}
    >
      <h2 className="text-xl lg:text-2xl font-serif font-bold text-primary mb-4">
        {title}
      </h2>

      <div className="text-lg lg:text-xl text-body leading-relaxed mb-6">
        {body}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-start">
        {actions}
      </div>
    </div>
  )
}
