import Link from 'next/link'

const navigation = [
  { name: 'Home', href: '#hero', id: 'hero' },
  { name: 'Tratamentos', href: '#tratamentos', id: 'tratamentos' },
  { name: 'Locais de atendimento', href: '#atendimento', id: 'atendimento' },
]

export function HeaderServer() {
  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main"
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
                className="-m-1.5 p-1.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-md"
              >
                <span className="font-serif text-base sm:text-lg text-primary">
                  Dra Ana Luiza M. Rocha
                </span>
                <p className="text-xs text-accent text-secondary justify-center mb-0">
                  Coloproctologista
                </p>
              </Link>
            </div>

            {/* Desktop navigation - enhanced styling */}
            <div className="hidden md:flex gap-x-8 lg:gap-x-12">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  data-header-nav
                  className="text-sm font-semibold leading-6 transition-all duration-200 relative py-2 text-secondary hover:text-primary focus:text-primary focus:outline-none after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 after:w-0 hover:after:w-full focus:after:w-full"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile menu placeholder - will be handled by client component */}
            <div className="md:hidden">
              <div className="w-10 h-10 flex items-center justify-center">
                {/* Placeholder for mobile menu button */}
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}
