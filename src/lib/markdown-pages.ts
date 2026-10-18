// Reuse the existing synchronous server pages without moving their source or
// metadata. Load only the requested page; keep these imports out of the proxy.
export const markdownPages = {
  'perguntas-frequentes': () => import('@/app/perguntas-frequentes/page'),
  blog: () => import('@/app/blog/page'),
  tratamentos: () => import('@/app/tratamentos/page'),
  sobre: () => import('@/app/sobre/page'),
  contato: () => import('@/app/contato/page'),
  'politica-privacidade': () => import('@/app/politica-privacidade/page'),
  'locais-de-atendimento': () => import('@/app/locais-de-atendimento/page'),
  'tratamentos/hemorroidas': () => import('@/app/tratamentos/hemorroidas/page'),
  'tratamentos/cx-laser': () => import('@/app/tratamentos/cx-laser/page'),
  'tratamentos/cx-fistulas-anorretais': () => import('@/app/tratamentos/cx-fistulas-anorretais/page'),
  'tratamentos/toxina-botulinica': () => import('@/app/tratamentos/toxina-botulinica/page'),
  'tratamentos/rastreio-cancer-anal': () => import('@/app/tratamentos/rastreio-cancer-anal/page'),
  'tratamentos/hpv-anal': () => import('@/app/tratamentos/hpv-anal/page'),
  'tratamentos/cx-cisto-pilonidal': () => import('@/app/tratamentos/cx-cisto-pilonidal/page'),
  'tratamentos/doencas-inflamatorias-intestinais': () => import('@/app/tratamentos/doencas-inflamatorias-intestinais/page'),
  'tratamentos/sindrome-intestino-irritavel': () => import('@/app/tratamentos/sindrome-intestino-irritavel/page'),
}

export function getMarkdownPage(path: string) {
  return Object.hasOwn(markdownPages, path) ? markdownPages[path as keyof typeof markdownPages]() : undefined
}
