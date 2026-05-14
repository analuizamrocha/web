import Link from 'next/link'
import {
  CRM_RQE_TEXT,
  TAG_INSTAGRAM,
  URL_INSTAGRAM,
  URL_LINKEDIN,
  URL_TIKTOK,
  URL_YOUTUBE,
  DR_NAME_ABBREVIATED,
} from '@/lib/constants'
import Instagram from '../icons/instagram'
import LinkedIn from '../icons/linkedin'
import TikTok from '../icons/tiktok'
import YouTube from '../icons/youtube'

const socialLinks = [
  {
    href: URL_INSTAGRAM,
    label: TAG_INSTAGRAM,
    ariaLabel: `Instagram ${TAG_INSTAGRAM}`,
    Icon: Instagram,
  },
  {
    href: URL_YOUTUBE,
    label: '@analuizarochaprocto',
    ariaLabel: 'YouTube @analuizarochaprocto',
    Icon: YouTube,
  },
  {
    href: URL_TIKTOK,
    label: '@luizamrocha',
    ariaLabel: 'TikTok @luizamrocha',
    Icon: TikTok,
  },
  {
    href: URL_LINKEDIN,
    label: 'Ana Luiza Moraes Rocha',
    ariaLabel: 'LinkedIn Ana Luiza Moraes Rocha',
    Icon: LinkedIn,
  },
]

export function Footer() {
  return (
    <footer className="w-full bg-primary" aria-label="Footer">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12 pt-8 pb-24 lg:pt-12 lg:pb-20">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div className="flex flex-col gap-y-4">
            <Link
              href="/"
              className="inline-block w-fit focus:outline-none focus:ring-2 focus:ring-background focus:ring-offset-2 focus:ring-offset-primary rounded-md p-1 -m-1"
            >
              <span className="font-serif text-xl text-background font-medium">
                {DR_NAME_ABBREVIATED}
              </span>
              <p className="text-background/80 text-sm mt-1 mb-0">
                Coloproctologista
              </p>
            </Link>
            <div className="text-background/70 text-sm font-medium">
              {CRM_RQE_TEXT}
            </div>

            {/* Navigation links */}
            <nav className="flex flex-wrap gap-4 mt-2">
              <Link
                href="/blog"
                className="text-background/70 hover:text-background text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-background/50 rounded-sm"
              >
                Blog
              </Link>
              <Link
                href="/politica-privacidade"
                className="text-background/70 hover:text-background text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-background/50 rounded-sm"
              >
                Privacidade
              </Link>
              <Link
                href="/sobre"
                className="text-background/70 hover:text-background text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-background/50 rounded-sm"
              >
                Sobre
              </Link>
              <Link
                href="/locais-de-atendimento"
                className="text-background/70 hover:text-background text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-background/50 rounded-sm"
              >
                Locais
              </Link>
              <Link
                href="/tratamentos"
                className="text-background/70 hover:text-background text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-background/50 rounded-sm"
              >
                Tratamentos
              </Link>
            </nav>
          </div>

          <ul className="flex flex-col gap-3 lg:items-end" aria-label="Redes sociais">
            {socialLinks.map(({ href, label, ariaLabel, Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ariaLabel}
                  className="flex items-center gap-x-3 w-fit p-2 -m-2 group transition-all duration-300 ease-out hover:drop-shadow-[0_0_4px_rgba(255,249,243,0.15)] active:drop-shadow-[0_0_6px_rgba(255,249,243,0.25)] focus:outline-none focus:drop-shadow-[0_0_4px_rgba(255,249,243,0.2)]"
                >
                  <span className="text-background/90 text-base font-medium group-hover:text-background group-active:text-background transition-all duration-300 group-hover:drop-shadow-[0_0_2px_rgba(255,249,243,0.15)]">
                    {label}
                  </span>
                  <div className="text-background group-hover:scale-105 group-active:scale-95 transition-all duration-300 group-hover:drop-shadow-[0_0_3px_rgba(255,249,243,0.2)]">
                    <Icon width="18" height="18" fill="currentColor" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
