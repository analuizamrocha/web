import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Declaração de Acessibilidade',
  description: 'Declaração de Acessibilidade do site da Dra. Ana Luiza Moraes Rocha - Comprometida com a acessibilidade digital para todos os usuários.',
}

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-24 sm:px-8 lg:px-10 xl:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif text-primary mb-8">
            Declaração de Acessibilidade
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-secondary mb-6">
              Esta Declaração de Acessibilidade se aplica ao site da Dra. Ana Luiza Moraes Rocha, coloproctologista.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
              Compromisso com a Acessibilidade
            </h2>
            <p className="text-secondary mb-6">
              A Dra. Ana Luiza está comprometida em garantir a acessibilidade digital para pessoas com deficiência. 
              Estamos continuamente melhorando a experiência do usuário para todos e aplicando os padrões de 
              acessibilidade relevantes.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
              Medidas para Apoiar a Acessibilidade
            </h2>
            <p className="text-secondary mb-4">
              Tomamos as seguintes medidas para garantir a acessibilidade do site:
            </p>
            <ul className="list-disc pl-6 text-secondary mb-6">
              <li>Auditorias regulares de acessibilidade são realizadas usando ferramentas como Google Lighthouse e axe-core.</li>
              <li>Testes manuais são realizados usando leitores de tela como VoiceOver e NVDA.</li>
              <li>Feedback dos usuários sobre problemas de acessibilidade é bem-vindo e abordado prontamente.</li>
              <li>Implementação de estrutura semântica adequada com HTML5.</li>
              <li>Uso de rótulos ARIA apropriados para elementos interativos.</li>
              <li>Verificação de contraste de cores para atender aos padrões WCAG 2.1 AA.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
              Status de Conformidade
            </h2>
            <p className="text-secondary mb-6">
              As Diretrizes de Acessibilidade para Conteúdo Web (WCAG) definem requisitos para designers e 
              desenvolvedores melhorarem a acessibilidade para pessoas com deficiência. Define três níveis de 
              conformidade: Nível A, Nível AA e Nível AAA. Nosso site está parcialmente em conformidade com 
              WCAG 2.1 nível AA. Parcialmente em conformidade significa que algumas partes do conteúdo não 
              estão totalmente em conformidade com o padrão de acessibilidade.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
              Feedback
            </h2>
            <p className="text-secondary mb-4">
              Damos as boas-vindas ao seu feedback sobre a acessibilidade do nosso site. Entre em contato 
              conosco se encontrar barreiras de acessibilidade:
            </p>
            <ul className="list-disc pl-6 text-secondary mb-6">
              <li>WhatsApp: <a href="https://wa.me/+5541988645800" className="text-primary hover:underline">(41) 98864-5800</a></li>
              <li>Telefone: <a href="tel:+5541988645800" className="text-primary hover:underline">(41) 98864-5800</a></li>
              <li>Endereço: Rua Bruno Filgueira, 489 Batel, Curitiba - PR</li>
            </ul>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
              Limitações e Alternativas
            </h2>
            <p className="text-secondary mb-4">
              Apesar de nossos melhores esforços para garantir a acessibilidade do site, podem existir algumas 
              limitações. Abaixo está uma descrição das limitações conhecidas e possíveis soluções.
            </p>
            <ul className="list-disc pl-6 text-secondary mb-6">
              <li><strong>Limitações conhecidas:</strong> Algumas imagens podem carecer de texto alternativo ou ter contraste insuficiente.</li>
              <li><strong>Solução:</strong> Nosso objetivo é trabalhar continuamente para melhorar essas áreas e acolhemos feedback.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
              Abordagem de Avaliação
            </h2>
            <p className="text-secondary mb-4">
              A Dra. Ana Luiza Moraes Rocha avaliou a acessibilidade deste site através das seguintes abordagens:
            </p>
            <ul className="list-disc pl-6 text-secondary mb-6">
              <li>Autoavaliação usando ferramentas automatizadas (Lighthouse, axe-core)</li>
              <li>Avaliação manual usando leitores de tela</li>
              <li>Testes de navegação por teclado</li>
              <li>Verificação de contraste de cores</li>
            </ul>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
              Melhorias Implementadas
            </h2>
            <ul className="list-disc pl-6 text-secondary mb-6">
              <li>Estrutura de cabeçalhos hierárquica (H1, H2, H3) para navegação adequada</li>
              <li>Rótulos aria-label em botões com apenas ícones</li>
              <li>Texto alternativo descritivo para imagens médicas</li>
              <li>Gerenciamento de foco para menu móvel</li>
              <li>Links de pular para conteúdo principal</li>
              <li>Atributos ARIA apropriados em elementos interativos</li>
            </ul>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
              Preparação desta Declaração de Acessibilidade
            </h2>
            <p className="text-secondary">
              Esta declaração foi preparada em julho de 2025 e foi revisada pela última vez na mesma data. 
              A declaração está sujeita a atualizações em resposta a melhorias contínuas e feedback dos usuários.
            </p>
          </div>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold text-primary mb-4">
              Entre em Contato
            </h3>
            <p className="text-secondary mb-4">
              Se você encontrar problemas de acessibilidade ou tiver sugestões para melhorias, entre em contato conosco:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://wa.me/+5541988645800?text=Olá! Gostaria de reportar um problema de acessibilidade no site."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                aria-label="Reportar problema de acessibilidade via WhatsApp"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
                </svg>
                Reportar via WhatsApp
              </a>
              <a 
                href="tel:+5541988645800"
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                aria-label="Ligar para reportar problema de acessibilidade"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                Ligar Agora
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
