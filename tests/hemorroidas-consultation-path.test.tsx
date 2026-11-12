import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import TratamentoHemorroidasPage from '@/app/tratamentos/hemorroidas/page'
import { getPostBySlug } from '@/lib/blog'
import {
  SPECTA_ENDOSCOPIA,
  WHATSAPP_HREF_SECRETARY,
  WPP_NUMBER_NASSIF,
  WPP_NUMBER_SECRETARY,
} from '@/lib/constants'

const TREATMENT_PATH = '/tratamentos/hemorroidas'
const CONTEXTUAL_PATHS = [
  '/blog/ligadura-elastica-ou-cirurgia-hemorroida',
  '/blog/recuperacao-cirurgia-hemorroida-quanto-tempo',
  '/blog/cirurgia-laser-hemorroida-quando-faz-sentido',
  '/tratamentos/cx-laser',
  '/blog/hemorroida-sempre-cirurgica-tratamento',
] as const
const SUPPORTING_POSTS = [
  'hemorroida-ou-prolapso-retal',
  'laser-hemorroida-co2-ou-diodo',
  'sangue-papel-higienico-sempre-hemorroida',
  'sangue-nas-fezes-quando-procurar-coloproctologista',
] as const
const PRESERVED_NUMBERS = [WPP_NUMBER_NASSIF.replace(/\D/g, ''), SPECTA_ENDOSCOPIA.wppNumber]

afterEach(() => {
  cleanup()
})

const hrefs = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('a[href]'), (anchor) => anchor.getAttribute('href') ?? '')

describe('hemorrhoids consultation path', () => {
  it('renders contextual reading links and keeps the consultation CTA on the secretary WhatsApp', () => {
    const { container } = render(<TratamentoHemorroidasPage />)
    const links = hrefs(container)
    const consultation = container.querySelector('a[aria-label*="Agendar consulta"]')

    expect(consultation?.getAttribute('href')).toBe(WHATSAPP_HREF_SECRETARY)
    expect(consultation?.textContent).toBe('Agendar consulta')

    const destination = new URL(WHATSAPP_HREF_SECRETARY)
    expect(destination.hostname).toBe('wa.me')
    expect(destination.pathname).toBe(`/${WPP_NUMBER_SECRETARY}`)
    expect(decodeURIComponent(destination.searchParams.get('text') ?? '')).not.toMatch(
      /hemorroid|sangue|prolapso|laser|fissura|condi/i
    )

    for (const path of CONTEXTUAL_PATHS) {
      expect(links).toContain(path)
    }
    expect(links.some((href) => href.includes('go.mdxstudio.com.br'))).toBe(false)
    for (const number of PRESERVED_NUMBERS) {
      expect(links.some((href) => href.includes(number))).toBe(false)
    }
  })

  it('connects existing related articles to the treatment page without extra tracking parameters', () => {
    for (const slug of SUPPORTING_POSTS) {
      const post = getPostBySlug(slug)
      expect(post).not.toBeNull()
      const matches = post?.content.match(/\[([^\]]+)\]\(([^)\s]+)\)/g) ?? []
      const destinations = matches.map((link) => link.slice(link.lastIndexOf('](') + 2, -1))

      expect(destinations).toContain(TREATMENT_PATH)
      expect(destinations.some((href) => href.startsWith(`${TREATMENT_PATH}?`))).toBe(false)
      expect(destinations.some((href) => href.includes('go.mdxstudio.com.br'))).toBe(false)
    }

    const laserPost = getPostBySlug('laser-hemorroida-co2-ou-diodo')
    expect(laserPost?.content).toContain('](/tratamentos/cx-laser)')
  })
})
