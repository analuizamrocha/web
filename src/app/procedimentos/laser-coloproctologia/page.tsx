import type { Metadata } from 'next'

import { ServicePage } from '@/components/sections/ServicePage'
import { getRouteMetadata } from '@/lib/seo/meta-config'
import { servicePages } from '@/lib/services/data'

const pageData = servicePages.laserColoproctologia

export const metadata: Metadata = getRouteMetadata(
  '/procedimentos/laser-coloproctologia'
)

export default function LaserColoproctologiaPage() {
  return <ServicePage {...pageData} />
}
