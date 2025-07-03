'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Home', href: '/', id: 'hero' },
  { name: 'Missão', href: '/#missao', id: 'missao' },
  { name: 'Tratamentos', href: '/#tratamentos', id: 'tratamentos' },
  { name: 'Locais de atendimento', href: '/#atendimento', id: 'atendimento' },
]

export function HeaderServer() {
  const pathname = usePathname()
  const isRootPage = pathname === '/'

  return (
    <>
      {/* Skip to content link for accessibility - will be disabled by client component when mobile menu is open */}
      <a
        href="#main"
        id="skip-to-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-[100] bg-primary text-background px-4 py-2 rounded-md font-medium transition-all duration-200"
      >
        Pular para o conteúdo principal
      </a>

      <header className="fixed top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-primary/10 shadow-sm">
        <div className="w-full">
          <nav
            className="mx-auto flex max-w-[1760px] items-center justify-between px-6 py-3 sm:px-8 lg:px-10 xl:px-12"
            aria-label="Navegação principal"
          >
            <div className="flex lg:flex-1">
              <Link
                href="/"
                className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-md cursor-pointer"
              >
                <span className="font-serif text-base sm:text-lg text-primary font-bold">
                  Dra Ana Luiza M. Rocha
                </span>
                <p className="text-xs text-secondary font-medium mb-0">
                  Coloproctologista
                </p>
              </Link>
            </div>

            {/* Desktop navigation - show only on root page */}
            {isRootPage && (
              <div className="hidden md:flex gap-x-8 lg:gap-x-12">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    data-header-nav
                    className="text-sm font-semibold leading-6 transition-all duration-200 relative py-2 text-secondary hover:text-primary focus:text-primary focus:outline-none after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 after:w-0 hover:after:w-full focus:after:w-full cursor-pointer"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Mobile menu placeholder - PROPERLY HIDDEN from desktop tab navigation */}
            <div className="md:hidden">
              <button
                type="button"
                className="relative p-2 text-secondary hover:text-primary transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background rounded-md"
                aria-label="Menu de navegação móvel"
                tabIndex={-1}
                style={{ pointerEvents: 'none' }}
              >
                {/* Static hamburger icon */}
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className="block h-0.5 w-6 bg-current" />
                  <span className="block h-0.5 w-6 bg-current mt-1" />
                  <span className="block h-0.5 w-6 bg-current mt-1" />
                </div>
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}
