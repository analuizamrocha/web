import React from 'react'
import Image from 'next/image'

export function AboutSection() {
  return (
    <div id="quem-sou-eu" className="bg-background">
      {/* Title Section - Responsive */}
      <div className="py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-container px-6 sm:px-8 lg:px-10 xl:px-12">
          <h2 className="text-center text-3xl text-secondary sm:text-4xl md:text-5xl lg:text-6xl">
            Quem é Dra. Ana Luiza?
          </h2>
        </div>
      </div>

      {/* Full Width Image - Edge to edge on all screens */}
      <div className="w-full">
        <Image
          width={1366}
          height={768}
          src="/images/sobre-mim.png"
          alt="Dra. Ana Luiza - Formação e qualificações profissionais em coloproctologia"
          sizes="100vw"
          quality={100}
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  )
}
