// Keep the proxy lightweight: shared content is loaded only by the Markdown
// handler, and only for the requested page. These imports are also traced by Next.
export const markdownPages = {
  blog: () => import('@/content/pages/blog'),
  tratamentos: () => import('@/content/pages/tratamentos'),
  sobre: () => import('@/content/pages/sobre'),
  contato: () => import('@/content/pages/contato'),
  'politica-privacidade': () => import('@/content/pages/politica-privacidade'),
  'locais-de-atendimento': () => import('@/content/pages/locais-de-atendimento'),
  'tratamentos/hemorroidas': () => import('@/content/pages/tratamentos/hemorroidas'),
  'tratamentos/cx-laser': () => import('@/content/pages/tratamentos/cx-laser'),
  'tratamentos/cx-fistulas-anorretais': () => import('@/content/pages/tratamentos/cx-fistulas-anorretais'),
  'tratamentos/toxina-botulinica': () => import('@/content/pages/tratamentos/toxina-botulinica'),
  'tratamentos/rastreio-cancer-anal': () => import('@/content/pages/tratamentos/rastreio-cancer-anal'),
  'tratamentos/hpv-anal': () => import('@/content/pages/tratamentos/hpv-anal'),
  'tratamentos/cx-cisto-pilonidal': () => import('@/content/pages/tratamentos/cx-cisto-pilonidal'),
  'tratamentos/doencas-inflamatorias-intestinais': () => import('@/content/pages/tratamentos/doencas-inflamatorias-intestinais'),
  'tratamentos/sindrome-intestino-irritavel': () => import('@/content/pages/tratamentos/sindrome-intestino-irritavel'),
}

export function getMarkdownPage(path: string) {
  return Object.hasOwn(markdownPages, path) ? markdownPages[path as keyof typeof markdownPages]() : undefined
}
