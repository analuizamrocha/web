/**
 * Navigation item interface
 */
export interface NavigationItem {
  name: string;
  href: string;
  id: string;
  type?: "section" | "route";
}

/**
 * Navigation sections for the homepage/landing page
 * These are sections within the same page that use scroll navigation
 */
const homepageSections: NavigationItem[] = [
  { name: "Início", href: "/", id: "hero", type: "section" },
  { name: "Missão", href: "/#missao", id: "missao", type: "section" },
  { name: "Serviços", href: "/#servicos", id: "servicos", type: "section" },
  {
    name: "Tratamentos",
    href: "/#tratamentos",
    id: "tratamentos",
    type: "section",
  },
  {
    name: "Locais de atendimento",
    href: "/#atendimento",
    id: "atendimento",
    type: "section",
  },
];

/**
 * External routes that navigate to different pages
 */
const externalRoutes: NavigationItem[] = [
  { name: "Blog", href: "/blog", id: "blog", type: "route" },
  {
    name: "Tratamentos",
    href: "/tratamentos",
    id: "tratamentos",
    type: "route",
  },
  { name: "Sobre", href: "/sobre", id: "sobre", type: "route" },
];

/**
 * Global navigation for non-homepage pages
 */
export const globalNavigation: NavigationItem[] = [
  { name: "Início", href: "/", id: "home", type: "route" },
  { name: "Blog", href: "/blog", id: "blog", type: "route" },
  {
    name: "Tratamentos",
    href: "/tratamentos",
    id: "tratamentos",
    type: "route",
  },
  { name: "Sobre", href: "/sobre", id: "sobre", type: "route" },
];

/**
 * Returns navigation items for the landing page sections (scroll navigation)
 * @returns Array of navigation items for homepage sections
 */
export function getPageSections(): NavigationItem[] {
  return homepageSections;
}

/**
 * Returns external route navigation items (separate pages)
 * @returns Array of navigation items for external routes
 */
export function getExternalRoutes(): NavigationItem[] {
  return externalRoutes;
}

/**
 * Returns complete landing page navigation including sections and external routes
 * @returns Object with sections and routes separated for easy rendering
 */
export function getPageNavigation() {
  return {
    sections: getPageSections(),
    routes: getExternalRoutes(),
    all: [...getPageSections(), ...getExternalRoutes()],
  };
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
      item.href === "/"
        ? "#hero"
        : item.href.startsWith("/#")
        ? item.href.slice(1)
        : item.href,
  }));
}

/**
 * Returns navigation items with hash-only hrefs for scroll navigation
 * @returns Array of navigation items with hash hrefs for homepage sections
 */
export function getHashNavigation(): NavigationItem[] {
  return convertToHashNavigation(getPageSections());
}

// Legacy exports for backward compatibility
export const pageNavigation = getPageNavigation().all;
export const hashNavigation = getHashNavigation();
