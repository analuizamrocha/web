import type { Metadata } from 'next'
import Link from 'next/link'
import {
  CONTACT_EMAIL,
  CRM_RQE_TEXT,
  DR_NAME,
  WEBSITE_URL,
  WHATSAPP_HREF_SECRETARY,
  WPP_NUMBER_SECRETARY_FORMATTED,
} from '@/lib/constants'
import { locationPages } from '@/lib/locations'
import { generateOpenGraphMetadata, generateTwitterMetadata } from '@/lib/seo-schemas'

const pageTitle = 'Contato e agendamento'
const pageDescription = 'Canais de contato para agendar consulta com a Dra. Ana Luiza Moraes Rocha, coloproctologista em Curitiba, e informações dos locais de atendimento.'
const pageUrl = `${WEBSITE_URL}/contact`

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: generateOpenGraphMetadata({ title: pageTitle, description: pageDescription, url: pageUrl }),
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, url: pageUrl }),
}

export default function ContactPage() {
  return (
    <section className="section bg-background pt-24 md:pt-28">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
            {pageTitle}
          </h1>
          <div className="prose prose-lg max-w-none">
            <p>
              Para agendar uma consulta com a {DR_NAME}, médica coloproctologista em Curitiba,
              entre em contato com a equipe de agendamento. O atendimento é voltado à avaliação
              e ao acompanhamento de doenças do intestino, reto e ânus. {CRM_RQE_TEXT}.
            </p>
            <h2>Como agendar sua consulta</h2>
            <p>
              O canal de agendamento pelo WhatsApp é{' '}
              <a href={WHATSAPP_HREF_SECRETARY} target="_blank" rel="noopener noreferrer">
                {WPP_NUMBER_SECRETARY_FORMATTED}
              </a>. A equipe pode orientar sobre a disponibilidade de consultas e o local de
              atendimento. Confirme diretamente com a equipe a data, o endereço e as orientações
              para sua visita antes de se deslocar. O contato inicial não confirma uma reserva.
            </p>
            <h2>Locais de atendimento em Curitiba</h2>
            {locationPages.map((location) => (
              <div key={location.slug}>
                <h3>{location.name}</h3>
                <p>{location.visibleRelationshipText} {location.addressLines.join(', ')}.</p>
                <p>
                  {location.summary} Telefone do local:{' '}
                  <a href={location.phoneHref}>{location.phoneDisplay}</a>.{' '}
                  <Link href={`/locais-de-atendimento/${location.slug}`}>
                    Veja informações de acesso e agendamento deste local
                  </Link>.
                </p>
              </div>
            ))}
            <h2>Dúvidas sobre o site e privacidade</h2>
            <p>
              O e-mail público para contato é{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Para informações
              sobre o tratamento de dados pessoais e solicitações de privacidade, consulte a{' '}
              <Link href="/politica-privacidade">Política de Privacidade</Link>. Ao solicitar
              agendamento, compartilhe apenas as informações necessárias para organizar a consulta.
            </p>
            <p>
              Os canais desta página destinam-se a contato e organização do atendimento.
              As informações do site têm caráter educativo e não substituem a consulta médica
              para diagnóstico e tratamento individualizados. Conheça também a{' '}
              <Link href="/sobre">formação e trajetória profissional da médica</Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
