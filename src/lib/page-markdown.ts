import { Fragment, isValidElement, type ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import { toMdast } from 'hast-util-to-mdast'
import { toHast } from 'mdast-util-to-hast'
import type { Element, ElementContent, Root } from 'hast'
import {
  GraduationCap, Stethoscope, Plane, BookOpen, Award, Heart, Shield,
  MessageCircle, Users, ArrowRight, Calendar, Clock, Info, MapPin, Phone,
  ChevronDown,
} from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons/whatsapp'
import { Badge } from '@/components/ui/Badge'
import { LinkButton } from '@/components/ui/LinkButton'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
import { TreatmentHeroImage } from '@/components/ui/TreatmentHeroImage'
import { RelatedBlogCard } from '@/components/ui/RelatedBlogCard'
import { TreatmentCard } from '@/components/ui/TreatmentCard'
import { PlaceCard } from '@/components/ui/PlaceCard'
import { ChoiceRow } from '@/components/ui/ChoiceRow'
import { FAQHighlights } from '@/components/ui/FAQHighlights'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { StickyCTABar } from '@/components/ui/StickyCTABar'
import { absolutizeMarkdownUrls } from '@/lib/markdown-links'
import { CRM_RQE_TEXT, DR_NAME } from '@/lib/constants'

// Only these synchronous, hook-free content components can be expanded. This is
// a second renderer for authored JSX, not a general React renderer. New content
// components must gain an explicit adapter rather than silently losing text.
const contentComponents = new Map<unknown, (props: never) => ReactNode>([
  [Breadcrumb, Breadcrumb], [CallToActionCard, CallToActionCard],
  [TreatmentHeroImage, TreatmentHeroImage], [RelatedBlogCard, RelatedBlogCard],
  [TreatmentCard, TreatmentCard], [PlaceCard, PlaceCard], [ChoiceRow, ChoiceRow],
  [FAQAccordion, FAQAccordion], [StickyCTABar, StickyCTABar],
  // The interactive carousel wraps server-authored cards; keep their copy.
  [FAQHighlights, (props: { children: ReactNode }) => props.children],
])
const decorativeComponents = new Set<unknown>([
  GraduationCap, Stethoscope, Plane, BookOpen, Award, Heart, Shield,
  MessageCircle, Users, ArrowRight, Calendar, Clock, Info, MapPin, Phone,
  ChevronDown, WhatsAppIcon,
])
const omittedTags = new Set(['script', 'style', 'svg', 'nav'])
const processor = remark().use(remarkGfm)

function contentNodes(node: ReactNode): ElementContent[] {
  if (node == null || typeof node === 'boolean') return []
  if (typeof node === 'string' || typeof node === 'number') {
    return [{ type: 'text', value: String(node) }]
  }
  if (Array.isArray(node)) return node.flatMap(contentNodes)
  if (!isValidElement<Record<string, unknown>>(node)) {
    throw new Error('Unsupported node in shared Markdown content')
  }

  const { type, props } = node
  if (props['aria-hidden'] === true || props['aria-hidden'] === 'true' || props.hidden) return []
  if (decorativeComponents.has(type)) return []
  if (type === Fragment) return contentNodes(props.children as ReactNode)
  // CSS gaps separate these labels in HTML; preserve the separation in text.
  if (type === Badge) return [
    { type: 'text', value: ' ' }, ...contentNodes(props.children as ReactNode),
    { type: 'text', value: ' ' },
  ]
  if (type === MDXRemote) {
    // Blog-card excerpts use the same Markdown source as their HTML renderer.
    const hast = toHast(processor.parse(String(props.source)))
    const children = hast.type === 'root' ? hast.children : [hast]
    return children.map((child) => {
      if (child.type === 'element' || child.type === 'text' || child.type === 'comment') return child
      throw new Error('Unsupported syntax in a blog-card excerpt')
    })
  }
  const expand = contentComponents.get(type)
  if (expand) return contentNodes(expand(props as never))

  let tagName: string
  if (type === Link || type === LinkButton) tagName = 'a'
  else if (type === Image) tagName = 'img'
  else if (typeof type === 'string') tagName = type
  else throw new Error('Add a Markdown adapter for the new shared content component')

  if (omittedTags.has(tagName)) return []
  const properties: Element['properties'] = {}
  for (const key of ['href', 'src', 'alt', 'title', 'start']) {
    if (typeof props[key] === 'string' || typeof props[key] === 'number') properties[key] = props[key]
  }
  if (props.dangerouslySetInnerHTML) {
    throw new Error('Raw HTML is not supported in shared Markdown content')
  }
  return [{
    type: 'element', tagName, properties,
    children: contentNodes(props.children as ReactNode),
  }]
}

export function renderPageMarkdown(content: ReactNode, canonicalUrl: string): string {
  const tree: Root = { type: 'root', children: contentNodes(content) }
  const markdown = toMdast(tree)
  if (markdown.type !== 'root') throw new Error('Expected a Markdown document')
  const document = processor.stringify(markdown)
  // These representations do not render the site footer, which carries the
  // professional identification on HTML pages.
  return absolutizeMarkdownUrls(`${document}\n---\n\n**${DR_NAME}**  \nMédica Coloproctologista  \n${CRM_RQE_TEXT}\n`, canonicalUrl)
}
