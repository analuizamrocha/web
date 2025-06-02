import { HeaderServer } from './HeaderServer'
import { HeaderClient } from './HeaderClient'

export function Header() {
  return (
    <>
      {/* Server-side header for desktop - better SEO, no JavaScript */}
      <div className="hidden md:block">
        <HeaderServer />
      </div>

      {/* Client-side header for mobile - interactive features */}
      <div className="block md:hidden">
        <HeaderClient />
      </div>
    </>
  )
}
