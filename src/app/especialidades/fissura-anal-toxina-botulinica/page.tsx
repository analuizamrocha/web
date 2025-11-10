import type { Metadata } from 'next'

import { ServicePage } from '@/components/sections/ServicePage'
import { getRouteMetadata } from '@/lib/seo/meta-config'
import { servicePages } from '@/lib/services/data'

const pageData = servicePages.fissuraAnalBotox

export const metadata: Metadata = getRouteMetadata(
  '/especialidades/fissura-anal-toxina-botulinica'
)

export default function FissuraAnalBotoxPage() {
  return <ServicePage {...pageData} />
}
