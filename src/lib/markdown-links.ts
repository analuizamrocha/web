import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'

/** Resolve real Markdown destinations without rewriting code examples or prose. */
export function absolutizeMarkdownUrls(markdown: string, canonicalUrl: string): string {
  const processor = remark().use(remarkGfm).data('settings', { bullet: '-', emphasis: '_', fences: true })
  const tree = processor.parse(markdown)

  visit(tree, (node) => {
    if (node.type !== 'link' && node.type !== 'image' && node.type !== 'definition') return
    if (/^[a-z][a-z\d+.-]*:/i.test(node.url)) return
    node.url = new URL(node.url, canonicalUrl).href
  })

  return processor.stringify(tree)
}
