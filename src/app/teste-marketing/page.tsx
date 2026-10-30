import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { validateTrackingUrl } from '@/lib/whatsapp-tracking'

export const metadata: Metadata = {
  title: 'Teste de contato',
  robots: { index: false, follow: false },
}

export default function MarketingTestPage() {
  const href = validateTrackingUrl(process.env.WHATSAPP_TEST_TRACKING_URL)
  if (!href) notFound()

  return (
    <section className="section bg-background pt-28">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="font-serif text-3xl text-primary mb-6">Teste de contato</h1>
        <p className="text-body mb-6">
          Página de teste do contato por WhatsApp. Ao abrir a conversa, mantenha
          o código de referência no texto para conferir a origem da mensagem.
        </p>
        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full bg-primary px-6 py-3 text-white font-semibold">
          Testar contato pelo WhatsApp
        </a>
        <p className="text-body mt-6">
          Com sua permissão nas preferências de cookies, o link também leva os
          dados da campanha desta visita. Você pode revisar essa escolha a qualquer momento.
        </p>
        <Link href="/sobre" className="inline-block mt-6 text-primary underline">Conheça a médica</Link>
        <p><Link href="/politica-privacidade" className="inline-block mt-4 text-primary underline">Política de privacidade</Link></p>
      </div>
    </section>
  )
}
