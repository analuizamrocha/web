import { NextRequest, NextResponse } from 'next/server'
import { LLMS_INDEX_LINK } from '@/lib/constants'
import { negotiatePage } from '@/lib/content-negotiation'
import { supportsPageMarkdown } from '@/lib/markdown-page-paths'
import { trustPageAliases } from '@/lib/trust-page-aliases'

export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers)
  // Never trust a client-supplied value used by the fallback rewrite.
  headers.delete('x-agent-markdown')

  // Only an internal rewrite may identify the helper as a negotiated request.
  // Direct requests, including spoofed markers, continue with the marker removed.
  const pathname = request.nextUrl.pathname
  if (pathname === '/conteudo-markdown' || pathname.startsWith('/conteudo-markdown/')) {
    return NextResponse.next({ request: { headers } })
  }
  // Extensionless social-image routes are binary resources, not documents.
  if (pathname.endsWith('/opengraph-image') || pathname.endsWith('/twitter-image')) {
    return NextResponse.next({ request: { headers } })
  }

  // RSC navigation and server actions have their own Next.js protocol.
  if (!['GET', 'HEAD'].includes(request.method) || request.headers.has('rsc') || request.headers.has('next-router-prefetch') || request.headers.has('next-action')) {
    return NextResponse.next({ request: { headers } })
  }

  const pagePathname = trustPageAliases.get(pathname) ?? pathname
  const supportsMarkdown = supportsPageMarkdown(pagePathname)
  const format = negotiatePage(request.headers.get('accept'))
  if (format === 'text/markdown') {
    headers.set('x-agent-markdown', '1')
    // Dynamic routes match even for missing slugs, so handle their Markdown
    // variants here rather than waiting for the filesystem fallback rewrite.
    if (supportsMarkdown) {
      const url = request.nextUrl.clone()
      url.pathname = `/conteudo-markdown${pagePathname === '/' ? '' : pagePathname}`
      return NextResponse.rewrite(url, { request: { headers } })
    }
  }

  if (supportsMarkdown && !format) {
    return new NextResponse('Representações disponíveis: text/html, text/markdown.\n', {
      status: 406,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        Vary: 'Accept',
        'Cache-Control': 'private, no-store',
      },
    })
  }

  const response = NextResponse.next({ request: { headers } })
  response.headers.set('Vary', 'Accept')
  if (pathname === '/' && format === 'text/html') response.headers.append('Link', LLMS_INDEX_LINK)
  return response
}

export const config = {
  matcher: ['/((?!_next/|api/|images/|robots\\.txt$|llms\\.txt$|sitemap\\.xml$|favicon\\.ico$|apple-icon\\.png$).*)'],
}
