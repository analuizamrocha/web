'use client'

import Link from 'next/link'
import { CRM_RQE_TEXT, TAG_INSTAGRAM, URL_INSTRAGRAM } from '@/lib/constants'
import Instagram from '../icons/instagram'

export function Footer() {
  return (
    <footer className="w-full bg-primary" aria-label="Footer">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="flex flex-col gap-y-4">
            <Link
              href="/"
              className="inline-block w-fit focus:outline-none focus:ring-2 focus:ring-background focus:ring-offset-2 focus:ring-offset-primary rounded-md p-1 -m-1"
            >
              <span className="font-serif text-xl text-background font-medium">
                Dra Ana Luiza M. Rocha
              </span>
              <p className="text-background/80 text-sm mt-1 mb-0">
                Coloproctologista
              </p>
            </Link>
            <div className="text-background/70 text-sm font-medium">
              {CRM_RQE_TEXT}
            </div>
          </div>

          <Link
            href={URL_INSTRAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-x-3 hover:opacity-90 transition-all duration-200 w-fit focus:outline-none focus:ring-2 focus:ring-background focus:ring-offset-2 focus:ring-offset-primary rounded-md p-2 -m-2 group"
          >
            <span className="text-background/90 text-base font-medium">
              {TAG_INSTAGRAM}
            </span>
            <Instagram fill="#fff9f3" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
