import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { Metadata } from "next";
import { WPP_NUMBER_NASSIF, WHATSAPP_MSG_TEXT_ENCODED } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/LinkButton";

export const metadata: Metadata = {
  title: "Tratamentos de Coloproctologia | Dra. Ana Luiza Moraes Rocha",
  description:
    "Tratamentos especializados em coloproctologia: cirurgias a laser, tratamento de hemorroidas, fístulas anorretais e muito mais em Curitiba.",
  keywords: [
    "coloproctologia curitiba",
    "cirurgia hemorroidas curitiba",
    "tratamento fissura anal",
    "proctologista curitiba",
    "cirurgia laser curitiba",
    "HPV anal curitiba",
    "cisto pilonidal curitiba",
  ],
  alternates: {
    canonical: "https://analuizarocha.com.br/tratamentos",
  },
};

const treatments = [
  {
    title: "Cirurgias a Laser",
    description:
      "Procedimentos minimamente invasivos com tecnologia laser para tratamento de hemorroidas e fissuras anais.",
    slug: "cx-laser",
    category: "Cirúrgico",
  },
  {
    title: "Tratamento de Hemorroidas",
    description:
      "Ligadura elástica, escleroterapia e outros procedimentos para alívio definitivo das hemorroidas.",
    slug: "hemorroidas",
    category: "Clínico/Cirúrgico",
  },
  {
    title: "Cirurgias para Fístulas Anorretais",
    description:
      "Tratamento cirúrgico especializado para fístulas complexas com preservação da continência.",
    slug: "cx-fistulas-anorretais",
    category: "Cirúrgico",
  },
  {
    title: "Toxina Botulínica",
    description:
      "Aplicação de botox para tratamento de fissura anal e dores crônicas na região anorretal.",
    slug: "toxina-botulinica",
    category: "Clínico",
  },
  {
    title: "Rastreio do Câncer de Canal Anal",
    description:
      "Prevenção e detecção precoce de lesões pré-cancerosas e câncer anal.",
    slug: "rastreio-cancer-anal",
    category: "Preventivo",
  },
  {
    title: "Tratamento de HPV Anal",
    description:
      "Diagnóstico e tratamento de condilomas acuminados (verrugas) na região anal.",
    slug: "hpv-anal",
    category: "Clínico",
  },
  {
    title: "Cirurgia de Cisto Pilonidal",
    description:
      "Remoção cirúrgica de cistos pilonidais com técnicas modernas e baixa recidiva.",
    slug: "cx-cisto-pilonidal",
    category: "Cirúrgico",
  },
  {
    title: "Doenças Inflamatórias Intestinais",
    description:
      "Acompanhamento especializado de Doença de Crohn e Retocolite Ulcerativa.",
    slug: "doencas-inflamatorias-intestinais",
    category: "Clínico",
  },
  {
    title: "Síndrome do Intestino Irritável",
    description:
      "Diagnóstico e tratamento personalizado para controle dos sintomas intestinais.",
    slug: "sindrome-intestino-irritavel",
    category: "Clínico",
  },
];

export default function ServicosPage() {
  return (
    <>
      {/* Medical Services Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            "@id": "https://analuizarocha.com.br/#organization",
            medicalSpecialty: ["Coloproctologia", "Proctologia"],
            availableService: treatments.map((treatment) => ({
              "@type": "MedicalProcedure",
              name: treatment.title,
              description: treatment.description,
              procedureType: treatment.category,
              url: `https://analuizarocha.com.br/tratamentos/${treatment.slug}`,
            })),
          }),
        }}
      />

      <section className="section bg-background pt-24 md:pt-28 animate-fade-in">
        <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
          {/* Header Section */}
          <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-20">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary mb-8">
              Tratamentos de Coloproctologia
            </h1>
            <div className="text-lg md:text-xl lg:text-2xl leading-relaxed text-secondary font-medium space-y-4">
              <p>
                Oferecemos tratamentos especializados com tecnologia avançada e
                cuidado humanizado para todas as condições coloproctológicas.
              </p>
              <p>
                Nossa abordagem é sempre individualizada, buscando o melhor
                resultado com o menor desconforto possível.
              </p>
            </div>
          </div>

          {/* Treatments Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-8 xl:gap-10 mb-16">
            {treatments.map((treatment) => (
              <Link
                className="group"
                key={treatment.slug}
                href={`/tratamentos/${treatment.slug}`}
              >
                <Card
                  title={treatment.title}
                  description={treatment.description}
                  variant="service"
                  className="h-full transition-transform duration-300 cursor-pointer"
                >
                  <div className="flex mt-auto pt-4 justify-between">
                    <Badge variant="primary">{treatment.category}</Badge>
                    <span className="inline-flex items-center justify-center text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-300">
                      Saiba mais&nbsp;
                      <ArrowRight size={14} className="ml-1" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Call to Action Section */}
          <div className="mx-auto max-w-4xl">
            <div className="bg-secondary/10 rounded-3xl p-8 lg:p-10 border border-secondary/20 text-center">
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-primary mb-4">
                Precisa de um diagnóstico especializado?
              </h2>
              <p className="text-lg lg:text-xl text-secondary leading-relaxed mb-6">
                Agende sua consulta e receba o cuidado especializado que você
                merece.
                <br />
                Atendimento humanizado com a mais alta qualidade técnica.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <LinkButton
                  href={`https://wa.me/${WPP_NUMBER_NASSIF}/?text=${WHATSAPP_MSG_TEXT_ENCODED}`}
                  external
                  newTab
                  variant="primary"
                  size="xl"
                  className="bg-primary hover:bg-primary/90 text-background shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold text-nowrap"
                  aria-label="Enviar mensagem para Dra. Ana Luiza Moraes Rocha por WhatsApp"
                >
                  Agendar consulta
                </LinkButton>
                <LinkButton
                  href="/blog"
                  size="xl"
                  variant="outline"
                  className="text-lg px-8 py-4 font-semibold text-nowrap shadow-lg hover:shadow-xl transform  transition-all duration-300"
                >
                  Confira meus artigos
                </LinkButton>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors text-lg"
            >
              ← Voltar ao início
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
