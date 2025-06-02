import Link from 'next/link'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Tratamentos', href: '#tratamentos' },
  { name: 'Locais de atendimento', href: '#atendimento' },
]

export function HeaderServer() {
  return (
    <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
      <nav
        className="mx-auto flex max-w-container items-center justify-between px-6 py-3 sm:px-8 lg:px-10 xl:px-12"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="font-serif text-base sm:text-lg text-primary">
              Dra Ana Luiza M. Rocha
            </span>
            <p className="text-xs text-accent text-secondary text-center">
              Coloproctologista
            </p>
          </Link>
        </div>

        {/* Desktop navigation - always visible on server component */}
        <div className="hidden md:flex gap-x-8 lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-secondary hover:text-primary transition-colors duration-200 px-2"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
