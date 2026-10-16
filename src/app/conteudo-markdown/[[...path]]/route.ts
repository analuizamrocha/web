import { getAllPostSlugs, getPostBySlug } from '@/lib/blog'
import { getHomepageMarkdown, markdownNotFound } from '@/lib/agent-markdown'
import { getLocationBySlug } from '@/lib/locations'
import { WEBSITE_URL } from '@/lib/constants'

export const dynamic = 'force-dynamic'

export async function GET(request: Request, context: { params: Promise<{ path?: string[] }> }) {
  const { path = [] } = await context.params
  let body: string | undefined

  if (path.length === 0) {
    body = getHomepageMarkdown()
  } else if (path.length === 2 && path[0] === 'blog') {
    // Select a published slug, rather than passing URL input to filesystem APIs.
    const post = getAllPostSlugs().includes(path[1]) ? getPostBySlug(path[1]) : null
    if (post) {
      body = `# ${post.title}\n\nPublicado em: ${post.publishDate}. Última atualização: ${post.lastModified}.\n\n[Fonte original](${WEBSITE_URL}/blog/${post.slug})\n\n${post.content.trim()}\n`
    }
  } else if (path.length === 2 && path[0] === 'locais-de-atendimento') {
    const location = getLocationBySlug(path[1])
    if (location) {
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
  // Keep direct helper URLs and errors out of indexes. A negotiated variant at
  // an existing canonical URL must not tell crawlers to deindex that page.
  if (!body || request.headers.get('x-agent-markdown') !== '1') {
    headers.set('X-Robots-Tag', 'noindex')
  }

  return new Response(body ?? markdownNotFound, {
    status: body ? 200 : 404,
    headers,
  })
}
