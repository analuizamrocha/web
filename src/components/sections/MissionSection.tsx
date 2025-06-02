import Image from 'next/image'

export function MissionSection() {
  return (
    <section id="missao" className="bg-background">
      {/* Title Section - Responsive */}
      <div className="py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-container px-6 sm:px-8 lg:px-10 xl:px-12">
          <h2 className="text-center text-secondary">Missão</h2>
        </div>
      </div>

      {/* Full Width Image - Edge to edge on all screens */}
      <div className="w-full">
        <Image
          width={824}
          height={764}
          src="/images/missao.png"
          alt="Dra. Ana Luiza - Missão e valores em coloproctologia"
          sizes="100vw"
          quality={100}
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  )
}
