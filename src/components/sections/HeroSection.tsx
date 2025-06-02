'use client'

import Image from 'next/image'
import { LinkButton } from '@/components/ui/LinkButton'
import { WPP_NUMBER } from '@/lib/constants'

export function HeroSection() {
  return (
    <div
      className="relative isolate overflow-hidden bg-background"
      id="hero.section"
    >
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        {/* Mobile Text Section */}
        <div className="px-6 pt-32 pb-12 text-center">
          <h1 className="text-3xl font-serif tracking-tight text-secondary sm:text-4xl">
            Cada paciente uma história,
            <br />
            cada história um cuidado único
          </h1>
          <h2 className="my-10 text-lg font-serif text-secondary sm:text-xl">
            Cuidado Clínico e Cirúrgico do
            <br />
            Intestino, Reto e Ânus
          </h2>
          <div className="mt-8 flex justify-center">
            <LinkButton
              href={`https://wa.me/${WPP_NUMBER}`}
              variant="primary"
              size="lg"
              external
              newTab
              className="py-6"
            >
              Agende sua consulta agora
            </LinkButton>
          </div>
        </div>

        {/* Mobile Full-Width Image */}
        <div className="w-full">
          <Image
            src="/images/hero.png"
            alt="Dra Ana Luiza em seu consultório"
            width={1080}
            height={1080}
            sizes="100vw"
            quality={95}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="mx-auto max-w-container px-6 pt-10 sm:px-8 lg:px-10 lg:pt-24 xl:px-12">
          <div className="flex">
            <div className="flex-shrink-0 max-w-xl">
              <h2 className="text-4xl text-secondary sm:text-6xl mt-24">
                Cada paciente uma história,
                <br />
                cada história um cuidado único
              </h2>
              <h3 className="mt-10 text-2xl text-secondary">
                Cuidado Clínico e Cirúrgico do
                <br />
                Intestino, Reto e Ânus
              </h3>
              <div className="mt-10 flex items-center gap-x-6">
                <LinkButton
                  href={`https://wa.me/${WPP_NUMBER}`}
                  variant="primary"
                  size="lg"
                  external
                  newTab
                  className="py-6"
                >
                  Agende sua consulta agora
                </LinkButton>
              </div>
            </div>
            <div className="flex-1 flex justify-end ml-8">
              <Image
                src="/images/hero.png"
                alt="Dra Ana Luiza em seu consultório"
                width={1080}
                height={1080}
                sizes="(max-width: 1024px) 100vw, 40rem"
                quality={95}
                className="w-[40rem] h-auto rounded-md bg-neutral/5 object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
