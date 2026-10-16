import { NextRequest, NextResponse } from 'next/server'
import { negotiatePage } from '@/lib/content-negotiation'

export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers)
  // Never trust a client-supplied value used by the fallback rewrite.
  headers.delete('x-agent-markdown')

  // RSC navigation and server actions have their own Next.js protocol.
  if (!['GET', 'HEAD'].includes(request.method) || request.headers.has('rsc')) {
    return NextResponse.next({ request: { headers } })
  }

  const format = negotiatePage(request.headers.get('accept'))
  const pathname = request.nextUrl.pathname
  if (format === 'text/markdown') {
    headers.set('x-agent-markdown', '1')
    // Dynamic routes match even for missing slugs, so handle their Markdown
    // variants here rather than waiting for the filesystem fallback rewrite.
    if (pathname === '/' || pathname.startsWith('/blog/') || pathname.startsWith('/locais-de-atendimento/')) {
      const url = request.nextUrl.clone()
      url.pathname = `/conteudo-markdown${pathname === '/' ? '' : pathname}`
      return NextResponse.rewrite(url, { request: { headers } })
    }
  }

  if (pathname === '/' && !format) {
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
  return response
}

export const config = {
  matcher: ['/((?!_next/|api/|images/|conteudo-markdown(?:/|$)|robots\\.txt$|llms\\.txt$|sitemap\\.xml$|favicon\\.ico$|apple-icon\\.png$).*)'],
}
