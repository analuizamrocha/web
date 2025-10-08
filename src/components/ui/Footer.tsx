import Link from 'next/link'
import { CRM_RQE_TEXT, TAG_INSTAGRAM, URL_INSTRAGRAM } from '@/lib/constants'
import Instagram from '../icons/instagram'

export function Footer() {
  return (
    <footer className="w-full bg-primary" aria-label="Footer">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="flex flex-col gap-y-4">
            <Link
              href="/"
              className="inline-block w-fit focus:outline-none focus:ring-2 focus:ring-background focus:ring-offset-2 focus:ring-offset-primary rounded-md p-1 -m-1"
            >
              <span className="font-serif text-xl text-background font-medium">
                Dra Ana Luiza M. Rocha
              </span>
              <p className="text-background/80 text-sm mt-1 mb-0">
                Coloproctologista
              </p>
            </Link>
            <div className="text-background/70 text-sm font-medium">
              {CRM_RQE_TEXT}
            </div>

            {/* Minimalistic navigation links */}
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
                href="/tratamentos"
                className="text-background/70 hover:text-background text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-background/50 rounded-sm"
              >
                Tratamentos
              </Link>
            </nav>
          </div>

          <Link
            href={URL_INSTRAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-x-3 w-fit p-2 -m-2 group transition-all duration-300 ease-out hover:drop-shadow-[0_0_4px_rgba(255,249,243,0.15)] active:drop-shadow-[0_0_6px_rgba(255,249,243,0.25)] focus:outline-none focus:drop-shadow-[0_0_4px_rgba(255,249,243,0.2)]"
          >
            <span className="text-background/90 text-base font-medium group-hover:text-background group-active:text-background transition-all duration-300 group-hover:drop-shadow-[0_0_2px_rgba(255,249,243,0.15)]">
              {TAG_INSTAGRAM}
            </span>
            <div className="group-hover:scale-105 group-active:scale-95 transition-all duration-300 group-hover:drop-shadow-[0_0_3px_rgba(255,249,243,0.2)]">
              <Instagram fill="#fff9f3" />
            </div>
          </Link>
        </div>
      </div>
    </footer>
  )
}
