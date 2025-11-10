import type { Metadata } from 'next'

import { ServicePage } from '@/components/sections/ServicePage'
import { getRouteMetadata } from '@/lib/seo/meta-config'
import { servicePages } from '@/lib/services/data'

const pageData = servicePages.cirurgiaMinimamenteInvasiva

export const metadata: Metadata = getRouteMetadata(
  '/procedimentos/cirurgia-minimamente-invasiva'
)

export default function CirurgiaMinimamenteInvasivaPage() {
  return <ServicePage {...pageData} />
}
