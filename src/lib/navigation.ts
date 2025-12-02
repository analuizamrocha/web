/**
 * Navigation item interface
 */
export interface NavigationItem {
  name: string
  href: string
  id: string
  type?: 'section' | 'route'
}

/**
 * Navigation sections for the homepage/landing page
 * These are sections within the same page that use scroll navigation
 */
const homepageSections: NavigationItem[] = [
  { name: 'Início', href: '/', id: 'hero', type: 'section' },
  { name: 'Missão', href: '/#missao', id: 'missao', type: 'section' },
  { name: 'Serviços', href: '/#servicos', id: 'servicos', type: 'section' },
  {
    name: 'Tratamentos',
    href: '/#tratamentos',
    id: 'tratamentos',
    type: 'section',
  },
  {
    name: 'Locais de atendimento',
    href: '/#atendimento',
    id: 'atendimento',
    type: 'section',
  },
]

/**
 * External routes that navigate to different pages
 */
const externalRoutes: NavigationItem[] = [
  { name: 'Blog', href: '/blog', id: 'blog', type: 'route' },
]

/**
 * Global navigation for non-homepage pages
 */
export const globalNavigation: NavigationItem[] = [
  { name: 'Início', href: '/', id: 'home', type: 'route' },
  { name: 'Blog', href: '/blog', id: 'blog', type: 'route' },
  {
    name: 'Tratamentos',
    href: '/tratamentos',
    id: 'tratamentos',
    type: 'route',
  },
  { name: 'Sobre', href: '/sobre', id: 'sobre', type: 'route' },
]

/**
 * Returns navigation items for the landing page sections (scroll navigation)
 * @returns Array of navigation items for homepage sections
 */
export function getLandingPageSections(): NavigationItem[] {
  return homepageSections
}

/**
 * Returns external route navigation items (separate pages)
 * @returns Array of navigation items for external routes
 */
export function getExternalRoutes(): NavigationItem[] {
  return externalRoutes
}

/**
 * Returns complete landing page navigation including sections and external routes
 * @returns Object with sections and routes separated for easy rendering
 */
export function getLandingPageNavigation() {
  return {
    sections: getLandingPageSections(),
    routes: getExternalRoutes(),
    all: [...getLandingPageSections(), ...getExternalRoutes()],
  }
}

/**
 * Converts navigation items to hash-only hrefs for scroll navigation
 * Used by useActiveSection hook and section scroll handlers
 * @param items - Array of navigation items to convert
 * @returns Array of navigation items with hash-only hrefs
 */
export function convertToHashNavigation(
  items: NavigationItem[]
): NavigationItem[] {
  return items.map((item) => ({
    ...item,
    href:
      item.href === '/'
        ? '#hero'
        : item.href.startsWith('/#')
        ? item.href.slice(1)
        : item.href,
  }))
}

/**
 * Returns navigation items with hash-only hrefs for scroll navigation
 * @returns Array of navigation items with hash hrefs for homepage sections
 */
export function getHashNavigation(): NavigationItem[] {
  return convertToHashNavigation(getLandingPageSections())
}

/**
 * Checks if a navigation item should be highlighted based on current pathname
 * Supports exact matches and parent route matching (e.g., /blog matches /blog/slug)
 * @param itemHref - The href of the navigation item
 * @param currentPathname - The current pathname from usePathname()
 * @returns true if the nav item should be highlighted
 */
export function isNavItemActive(itemHref: string, currentPathname: string): boolean {
  // Exact match
  if (currentPathname === itemHref) {
    return true
  }

  // Parent route matching (e.g., /blog for /blog/slug, /tratamentos for /tratamentos/hemorroidas)
  // Don't match root path '/' to everything
  if (itemHref !== '/' && currentPathname.startsWith(itemHref + '/')) {
    return true
  }

  return false
}

// Legacy exports for backward compatibility
export const navigation = getLandingPageNavigation().all
export const homepageNavigation = getLandingPageNavigation().all
export const navigationWithHashes = getHashNavigation()
