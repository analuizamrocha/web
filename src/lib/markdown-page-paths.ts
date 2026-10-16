// Public document routes only; never include framework or image endpoints here.
export const markdownPagePaths = [
  '/blog', '/tratamentos', '/sobre', '/contato', '/politica-privacidade',
  '/locais-de-atendimento',
  '/tratamentos/hemorroidas', '/tratamentos/cx-laser',
  '/tratamentos/cx-fistulas-anorretais', '/tratamentos/toxina-botulinica',
  '/tratamentos/rastreio-cancer-anal', '/tratamentos/hpv-anal',
  '/tratamentos/cx-cisto-pilonidal', '/tratamentos/doencas-inflamatorias-intestinais',
  '/tratamentos/sindrome-intestino-irritavel',
] as const

export function supportsPageMarkdown(pathname: string) {
  return pathname === '/' || markdownPagePaths.some((path) => path === pathname)
    || pathname.startsWith('/blog/') || pathname.startsWith('/locais-de-atendimento/')
}
