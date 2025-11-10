import Link from 'next/link'
import { type ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface KeywordLink {
  keyword: RegExp | string
  href: string
  label?: string
}

interface InternalLinksProps {
  text: string
  className?: string
  keywordMap?: KeywordLink[]
}

const defaultLinkClass =
  'text-primary font-semibold underline underline-offset-4 hover:text-primary/80 transition-colors duration-200'

const defaultKeywordMap: KeywordLink[] = [
  {
    keyword: /hemorroidas?/gi,
    href: '/especialidades/hemorroidas-tratamento-laser',
    label: 'tratamento de hemorroidas',
  },
  {
    keyword: /coloproctologia/gi,
    href: '/tratamentos',
  },
  {
    keyword: /proctologista/gi,
    href: '/proctologia',
  },
  {
    keyword: /cisto pilonidal/gi,
    href: '/especialidades/cisto-pilonidal-cirurgia',
  },
  {
    keyword: /fissura anal/gi,
    href: '/especialidades/fissura-anal-toxina-botulinica',
  },
  {
    keyword: /endometriose intestinal/gi,
    href: '/especialidades/endometriose-intestinal',
  },
  {
    keyword: /laser/gi,
    href: '/procedimentos/laser-coloproctologia',
    label: 'laser em coloproctologia',
  },
]

/**
 * Replaces predefined keywords with internal links to avoid manual anchor management.
 */
export function InternalLinks({
  text,
  className,
  keywordMap = defaultKeywordMap,
}: InternalLinksProps) {
  const segments = keywordMap.reduce<ReactNode[]>(
    (acc, entry, entryIndex) => {
      const regex = ensureGlobalRegex(entry.keyword)

      return acc.flatMap((segment) => {
        if (typeof segment !== 'string') {
          return [segment]
        }

        const parts: ReactNode[] = []
        let lastIndex = 0
        let match: RegExpExecArray | null
        let localIndex = 0

        while ((match = regex.exec(segment)) !== null) {
          if (match.index > lastIndex) {
            parts.push(segment.slice(lastIndex, match.index))
          }

          const matchedText = match[0]
          parts.push(
            <Link
              key={`internal-link-${entryIndex}-${localIndex}-${matchedText}`}
              href={entry.href}
              className={defaultLinkClass}
            >
              {entry.label ?? matchedText}
            </Link>
          )

          lastIndex = match.index + matchedText.length
          localIndex += 1
        }

        if (lastIndex < segment.length) {
          parts.push(segment.slice(lastIndex))
        }

        return parts
      })
    },
    [text]
  )

  return (
    <p className={cn('leading-relaxed text-secondary', className)}>{segments}</p>
  )
}

function ensureGlobalRegex(pattern: RegExp | string) {
  if (pattern instanceof RegExp) {
    const flags = pattern.flags.includes('g')
      ? pattern.flags
      : `${pattern.flags}g`

    return new RegExp(pattern.source, flags)
  }

  return new RegExp(`(${escapeRegExp(pattern)})`, 'gi')
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
