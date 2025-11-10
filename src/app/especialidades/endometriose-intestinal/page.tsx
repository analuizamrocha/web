import type { Metadata } from 'next'

import { ServicePage } from '@/components/sections/ServicePage'
import { getRouteMetadata } from '@/lib/seo/meta-config'
import { servicePages } from '@/lib/services/data'

const pageData = servicePages.endometrioseIntestinal

export const metadata: Metadata = getRouteMetadata(
  '/especialidades/endometriose-intestinal'
)

export default function EndometrioseIntestinalPage() {
  return <ServicePage {...pageData} />
}
