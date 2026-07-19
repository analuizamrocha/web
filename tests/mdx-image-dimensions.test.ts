import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { describe, expect, it } from 'vitest'

import { getMdxImageDimensions } from '@/lib/mdx-image-dimensions'

const MARKDOWN_IMAGE_PATTERN = /!\[[^\]]*\]\((\/images\/[^)\s]+)(?:\s+[^)]*)?\)/g

describe('MDX image dimensions', () => {
  it('matches every image referenced by a blog post', async () => {
    const postsDirectory = path.join(process.cwd(), 'content', 'posts')
    const imageSources = new Set<string>()

    for (const postFile of fs.readdirSync(postsDirectory)) {
      if (!postFile.endsWith('.md')) continue

      const markdown = fs.readFileSync(path.join(postsDirectory, postFile), 'utf8')

      for (const match of markdown.matchAll(MARKDOWN_IMAGE_PATTERN)) {
        imageSources.add(match[1])
      }
    }

    expect(imageSources.size).toBeGreaterThan(0)

    for (const src of imageSources) {
      const assetPath = path.join(process.cwd(), 'public', src)
      const metadata = await sharp(assetPath).metadata()

      expect(getMdxImageDimensions(src), src).toEqual({
        width: metadata.width,
        height: metadata.height,
      })
    }
  })
})
