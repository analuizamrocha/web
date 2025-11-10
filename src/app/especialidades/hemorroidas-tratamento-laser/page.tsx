import type { Metadata } from 'next'

import { ServicePage } from '@/components/sections/ServicePage'
import { getRouteMetadata } from '@/lib/seo/meta-config'
import { servicePages } from '@/lib/services/data'

const pageData = servicePages.hemorroidasLaser

export const metadata: Metadata = getRouteMetadata(
  '/especialidades/hemorroidas-tratamento-laser'
)

export default function HemorroidasLaserPage() {
  return <ServicePage {...pageData} />
}
