import { describe, expect, it } from 'vitest'
import {
  generateOpenGraphMetadata,
  generateTwitterMetadata,
} from '@/lib/seo-schemas'

const baseMetadata = {
  title: 'Página de teste',
  description: 'Descrição de teste',
  url: 'https://www.analuizarocha.com.br/teste',
}

describe('social metadata helpers', () => {
  it('uses the real dimensions of the default social image', () => {
    const metadata = generateOpenGraphMetadata(baseMetadata)

    expect(metadata.images).toEqual([
      {
        url: 'https://www.analuizarocha.com.br/images/og.png',
        width: 547,
        height: 684,
        alt: baseMetadata.title,
      },
    ])
  })

  it('keeps custom image dimensions and URL consistent across social metadata', () => {
    const image = {
      url: 'https://www.analuizarocha.com.br/images/custom-social.png',
      width: 1200,
      height: 630,
      alt: 'Prévia social personalizada',
    }

    const openGraph = generateOpenGraphMetadata({ ...baseMetadata, image })
    const twitter = generateTwitterMetadata({ ...baseMetadata, image })

    expect(openGraph.images).toEqual([image])
    expect(twitter.images).toEqual([image.url])
  })

  it('does not invent dimensions for a custom image without them', () => {
    const metadata = generateOpenGraphMetadata({
      ...baseMetadata,
      image: {
        url: 'https://www.analuizarocha.com.br/images/custom-social.png',
      },
    })

    expect(metadata.images).toEqual([
      {
        url: 'https://www.analuizarocha.com.br/images/custom-social.png',
        alt: baseMetadata.title,
      },
    ])
  })
})
