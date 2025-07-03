import Link from 'next/link'
import { LinkButton } from '@/components/ui/LinkButton'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-secondary mb-4">
            Página não encontrada
          </h2>
          <p className="text-muted leading-relaxed">
            A página que você está procurando não existe ou foi movida para outro local.
          </p>
        </div>

        <div className="space-y-4">
          <LinkButton 
            href="/" 
            variant="default" 
            size="lg"
            className="w-full"
          >
            Voltar à página inicial
          </LinkButton>
          
          <LinkButton 
            href="#hero" 
            variant="outline" 
            size="lg"
            className="w-full"
          >
            Agendar consulta
          </LinkButton>
        </div>

        <div className="mt-8 pt-8 border-t border-primary/10">
          <p className="text-sm text-muted">
            Precisa de ajuda? Entre em contato conosco:
          </p>
          <div className="mt-2 space-y-2">
            <p className="text-sm text-secondary">
              📞 (41) 98864-5800
            </p>
            <Link
              href="https://www.instagram.com/analuiza.mrocha/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:text-primary transition-colors duration-200"
            >
              📱 @analuiza.mrocha
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
