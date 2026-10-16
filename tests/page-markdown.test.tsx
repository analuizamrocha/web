// @vitest-environment node
import { describe, expect, it } from 'vitest'
import Image from 'next/image'
import { GET } from '@/app/conteudo-markdown/[[...path]]/route'
import { markdownPages } from '@/lib/markdown-pages'
import { markdownPagePaths } from '@/lib/markdown-page-paths'
import { renderPageMarkdown } from '@/lib/page-markdown'
import { WEBSITE_URL } from '@/lib/constants'
import { getAllPosts } from '@/lib/blog'
import { Badge } from '@/components/ui/Badge'

describe('shared page Markdown', () => {
  it('keeps the proxy document inventory aligned with the shared content loaders', () => {
    expect(Object.keys(markdownPages).map((path) => `/${path}`).sort()).toEqual([...markdownPagePaths].sort())
  })

  it.each(markdownPagePaths)('serves the existing content at %s with canonical headers', async (path) => {
    const response = await GET(new Request(`${WEBSITE_URL}${path}`, {
      headers: { 'x-agent-markdown': '1' },
    }), { params: Promise.resolve({ path: path.slice(1).split('/') }) })
    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toBe('text/markdown; charset=utf-8')
    expect(response.headers.get('link')).toBe(`<${WEBSITE_URL}${path}>; rel="canonical"`)
    expect(response.headers.get('x-robots-tag')).toBe(path === '/politica-privacidade' ? 'noindex, nofollow' : null)
    const body = await response.text()
    expect(body.length).toBeGreaterThan(500)
    expect(body).toMatch(/^# /m)
    expect(body).toContain('CRM-PR 45351 | RQE 36221')
    expect(body).not.toMatch(/<script|className|application\/ld\+json|\]\(\s*\/(?!\/)/)
    if (path === '/blog') {
      for (const post of getAllPosts()) expect(body).toContain(`${WEBSITE_URL}/blog/${post.slug}`)
    }
    if (path.startsWith('/tratamentos/')) {
      expect(body).toContain('## Perguntas frequentes')
      expect(body).toContain(`${WEBSITE_URL}/images/`)
      expect(body).toContain(`${WEBSITE_URL}/blog/`)
    }
  })

  it('preserves semantic structure and escapes text while excluding navigation and scripts', () => {
    const markdown = renderPageMarkdown(<>
      <nav>Menu sem conteúdo</nav>
      <h1>Opções de cuidado</h1>
      <div><Badge>Clínico/Cirúrgico</Badge><Badge>Ambulatorial</Badge></div>
      <p>Texto com <strong>ênfase</strong> e caracteres [literais].</p>
      <ul><li>Primeiro<ul><li>Detalhe</li></ul></li><li>Segundo</li></ul>
      <blockquote><p>Orientação existente.</p></blockquote>
      <p><a href="/sobre">Formação</a><Image src="/images/og.png" alt="Retrato" width={547} height={684} /></p>
      <script type="application/ld+json">{'{"secret":"schema"}'}</script>
      <span aria-hidden="true">Decoração</span>
    </>, `${WEBSITE_URL}/tratamentos`)
    expect(markdown).toContain('# Opções de cuidado')
    expect(markdown).toContain('Clínico/Cirúrgico Ambulatorial')
    expect(markdown).toContain('**ênfase**')
    expect(markdown).toContain('\\[literais]')
    expect(markdown).toContain('  - Detalhe')
    expect(markdown).toContain('> Orientação existente.')
    expect(markdown).toContain(`[Formação](${WEBSITE_URL}/sobre)`)
    expect(markdown).toContain(`![Retrato](${WEBSITE_URL}/images/og.png)`)
    expect(markdown).not.toMatch(/Menu sem conteúdo|schema|Decoração/)
  })

  it('requires an explicit adapter for new components instead of dropping their copy', () => {
    function Unsupported(): never { throw new Error('must not execute arbitrary components') }
    expect(() => renderPageMarkdown(<Unsupported />, WEBSITE_URL)).toThrow('Add a Markdown adapter')
  })
})
