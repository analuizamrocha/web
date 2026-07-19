import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

import sitemap from '@/app/sitemap'
import { getAllPosts } from '@/lib/blog'
import { WEBSITE_URL } from '@/lib/constants'

describe('content discovery files', () => {
  it('keeps every published post in the sitemap and llms.txt', () => {
    const posts = getAllPosts()
    const postSlugs = posts.map((post) => post.slug).sort()
    const sitemapUrls = new Set(sitemap().map((entry) => entry.url))
    const llms = fs.readFileSync(path.join(process.cwd(), 'public', 'llms.txt'), 'utf8')
    const llmsPostSlugs = Array.from(
      new Set(
        Array.from(llms.matchAll(/\/blog\/([a-z0-9-]+)/g), ([, slug]) => slug)
      )
    ).sort()

    expect(posts.length).toBeGreaterThan(0)
    expect(llmsPostSlugs).toEqual(postSlugs)

    for (const slug of postSlugs) {
      expect(sitemapUrls.has(`${WEBSITE_URL}/blog/${slug}`), slug).toBe(true)
    }
  })
})
