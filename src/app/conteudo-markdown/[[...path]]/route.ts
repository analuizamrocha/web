import { getAllPostSlugs, getPostBySlug } from '@/lib/blog'
import { getHomepageMarkdown, markdownNotFound } from '@/lib/agent-markdown'
import { getLocationBySlug } from '@/lib/locations'
import { WEBSITE_URL } from '@/lib/constants'
import { absolutizeMarkdownUrls } from '@/lib/markdown-links'
import { getMarkdownPage } from '@/lib/markdown-pages'
import { renderPageMarkdown } from '@/lib/page-markdown'

export const dynamic = 'force-dynamic'

export async function GET(request: Request, context: { params: Promise<{ path?: string[] }> }) {
  const { path = [] } = await context.params
  let body: string | undefined
  let canonicalUrl: string | undefined
  const negotiated = request.headers.get('x-agent-markdown') === '1'
  const sharedPage = negotiated ? await getMarkdownPage(path.join('/')) : undefined

  if (negotiated && path.length === 0) {
    body = getHomepageMarkdown()
    canonicalUrl = WEBSITE_URL
  } else if (sharedPage) {
    canonicalUrl = `${WEBSITE_URL}/${path.join('/')}`
    body = renderPageMarkdown(sharedPage.default(), canonicalUrl)
  } else if (negotiated && path.length === 2 && path[0] === 'blog') {
    // Select a published slug, rather than passing URL input to filesystem APIs.
    const post = getAllPostSlugs().includes(path[1]) ? getPostBySlug(path[1]) : null
    if (post) {
      canonicalUrl = `${WEBSITE_URL}/blog/${post.slug}`
      body = `# ${post.title}\n\nPublicado em: ${post.publishDate}. Última atualização: ${post.lastModified}.\n\n[Fonte original](${canonicalUrl})\n\n${absolutizeMarkdownUrls(post.content, canonicalUrl)}`
    }
  } else if (negotiated && path.length === 2 && path[0] === 'locais-de-atendimento') {
    const location = getLocationBySlug(path[1])
    if (location) {
      canonicalUrl = `${WEBSITE_URL}/locais-de-atendimento/${location.slug}`
      body = `# ${location.pageTitle}\n\n${location.visibleRelationshipText}\n\n${location.overviewParagraphs.join('\n\n')}\n\n## Endereço e agendamento\n\n${location.addressLines.join(', ')}\n\n${location.schedulingDescription}\n\n[${location.primaryCtaLabel}](${location.whatsappHref})\n\nTelefone: ${location.phoneDisplay}\n\n[Informações completas](${WEBSITE_URL}/locais-de-atendimento/${location.slug})\n`
    }
  }

  const headers = new Headers({
    'Content-Type': 'text/markdown; charset=utf-8',
    'Content-Language': 'pt-BR',
    Vary: 'Accept',
    // Negotiated responses must not populate an HTML CDN cache entry.
    'Cache-Control': 'private, no-store',
    'X-Content-Type-Options': 'nosniff',
  })
  if (canonicalUrl) {
    headers.set('Link', `<${canonicalUrl}>; rel="canonical"`)
  }
  // A negotiated variant at an existing canonical URL must remain indexable.
  // Direct helper requests are real 404s, even when their path matches a page.
  if (!body || path.join('/') === 'politica-privacidade') {
    headers.set('X-Robots-Tag', body ? 'noindex, nofollow' : 'noindex')
  }

  return new Response(body ?? markdownNotFound, {
    status: body ? 200 : 404,
    headers,
  })
}
