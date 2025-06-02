'use client'

import Link from 'next/link'
import { CRM_RQE_TEXT, TAG_INSTAGRAM, URL_INSTRAGRAM } from '@/lib/constants'
import Instagram from '../icons/instagram'

export function Footer() {
  return (
    <footer className="w-full bg-tertiary" aria-label="Footer">
      <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-10 xl:px-12 py-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex flex-col gap-y-3">
            <Link href="/" className="inline-block w-fit">
              <span className="font-serif text-lg text-background font-medium">
                Dra Ana Luiza M. Rocha
              </span>
            </Link>
            <div className="text-background/90 text-sm">{CRM_RQE_TEXT}</div>
          </div>

          <Link
            href={URL_INSTRAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-x-3 hover:opacity-80 transition-opacity duration-200 w-fit"
          >
            <Instagram fill="#fff9f3" />
            <span className="text-background/90 text-base">
              {TAG_INSTAGRAM}
            </span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
