// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { existsSync, readFileSync } from 'node:fs'
import Page, { metadata } from '@/app/perguntas-frequentes/page'
import { patientFAQs, patientFAQTopics } from '@/lib/patient-faqs'
import { renderPageMarkdown } from '@/lib/page-markdown'
import { WEBSITE_URL } from '@/lib/constants'
import sitemap from '@/app/sitemap'
import { getAllPosts } from '@/lib/blog'
import { getLocationBySlug } from '@/lib/locations'
import { getExternalRoutes, globalNavigation } from '@/lib/navigation'

const path = '/perguntas-frequentes'
const url = `${WEBSITE_URL}${path}`

describe('patient FAQ hub', () => {
  it('publishes each unique answer in native disclosures and matching JSON-LD', () => {
    const html = renderToStaticMarkup(<Page />)
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(
      (match) => JSON.parse(match[1])
    )
    const faq = schemas.find((schema) => schema['@type'] === 'FAQPage')
    expect(faq.mainEntity).toHaveLength(patientFAQs.length)
    expect(new Set(patientFAQs.map((item) => item.id)).size).toBe(patientFAQs.length)
    expect(new Set(patientFAQs.map((item) => item.question)).size).toBe(patientFAQs.length)
    const disclosures = [...html.matchAll(/<details\b[^>]*>(.*?)<\/details>/g)].map(
      (match) => match[1]
    )
    expect(disclosures).toHaveLength(patientFAQs.length)
    patientFAQs.forEach((item, index) => {
      expect(faq.mainEntity[index].name).toBe(item.question)
      expect(faq.mainEntity[index].acceptedAnswer.text).toBe(item.answer)
      expect(disclosures[index]).toContain(item.question)
      expect(disclosures[index]).toContain(item.answer)
    })
    expect(schemas.find((schema) => schema['@type'] === 'BreadcrumbList')).toBeTruthy()
    expect(html).toContain('CRM-PR 45351 | RQE 36221')
    expect(html).toContain('não substitui a consulta médica')
  })

  it('connects all topic chips to unique sections and existing destination pages', () => {
    const html = renderToStaticMarkup(<Page />)
    expect(new Set(patientFAQTopics.map((topic) => topic.id)).size).toBe(patientFAQTopics.length)
    for (const topic of patientFAQTopics) {
      expect(html).toContain(`href="#faq-${topic.id}"`)
      expect(html).toContain(`id="faq-${topic.id}"`)
      expect(
        existsSync(`src/app${topic.href}/page.tsx`) ||
          getAllPosts().some((post) => `/blog/${post.slug}` === topic.href) ||
          (topic.href.startsWith('/locais-de-atendimento/') &&
            Boolean(getLocationBySlug(topic.href.split('/').pop()!)))
      ).toBe(true)
    }
  })

  it('keeps the complete answers available in the negotiated Markdown representation', () => {
    const markdown = renderPageMarkdown(Page(), url)
    for (const item of patientFAQs) {
      expect(markdown).toContain(item.question)
      expect(markdown).toContain(item.answer)
    }
    expect(markdown).not.toMatch(/<script|application\/ld\+json/)
  })

  it('makes the hub discoverable with canonical metadata and navigation', () => {
    expect(metadata.alternates?.canonical).toBe(url)
    expect(sitemap().some((entry) => entry.url === url)).toBe(true)
    expect(readFileSync('public/llms.txt', 'utf8')).toContain(url)
    expect(getExternalRoutes().some((item) => item.href === path)).toBe(true)
    expect(globalNavigation.some((item) => item.href === path)).toBe(true)
  })
})
