import type { Metadata } from 'next'

import { ServicePage } from '@/components/sections/ServicePage'
import { getRouteMetadata } from '@/lib/seo/meta-config'
import { servicePages } from '@/lib/services/data'

const pageData = servicePages.cistoPilonidalCirurgia

export const metadata: Metadata = getRouteMetadata(
  '/especialidades/cisto-pilonidal-cirurgia'
)

export default function CistoPilonidalCirurgiaPage() {
  return <ServicePage {...pageData} />
}
