'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { startWhatsAppTracking } from '@/lib/whatsapp-tracking'

export function WhatsAppTracking() {
  const pathname = usePathname()
  useEffect(() => startWhatsAppTracking(), [pathname])
  return null
}
