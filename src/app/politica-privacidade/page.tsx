import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade | Dra. Ana Luiza Moraes Rocha',
  description: 'Política de Privacidade e Proteção de Dados conforme LGPD - Consultório de Coloproctologia',
  robots: 'noindex, nofollow', // Privacy policies shouldn't be indexed
}

export default function PoliticaPrivacidadePage() {
  return (
    <section className="section bg-background pt-24 md:pt-28">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
        <div className="mx-auto max-w-4xl">
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
              Política de Privacidade
            </h1>
            <p className="text-lg text-secondary leading-relaxed">
              Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais, 
              em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <h2>1. Responsável pelo Tratamento dos Dados</h2>
            <p>
              <strong>Controladora:</strong> Dra. Ana Luiza Moraes Rocha<br/>
              <strong>CRM-PR:</strong> 45351<br/>
              <strong>E-mail para contato:</strong> contato@analuizarocha.com.br<br/>
              <strong>Endereço:</strong> Curitiba, Paraná
            </p>

            <h2>2. Dados Pessoais Coletados</h2>
            <p>Coletamos os seguintes tipos de dados pessoais:</p>
            <ul>
              <li><strong>Dados de Contato:</strong> Nome, telefone, e-mail, endereço</li>
              <li><strong>Dados de Navegação:</strong> Cookies, endereço IP, páginas visitadas (apenas com consentimento)</li>
              <li><strong>Dados de Saúde:</strong> Informações médicas fornecidas durante consultas (tratamento baseado em consentimento e interesse legítimo médico)</li>
            </ul>

            <h2>3. Finalidades do Tratamento</h2>
            <p>Utilizamos seus dados pessoais para:</p>
            <ul>
              <li>Prestação de serviços médicos especializados em coloproctologia</li>
              <li>Agendamento e gestão de consultas</li>
              <li>Comunicação sobre tratamentos e cuidados médicos</li>
              <li>Cumprimento de obrigações legais e regulamentares do CFM</li>
              <li>Melhoria da experiência no site (apenas com consentimento para cookies)</li>
            </ul>

            <h2>4. Base Legal</h2>
            <p>O tratamento dos seus dados pessoais baseia-se em:</p>
            <ul>
              <li><strong>Consentimento:</strong> Para cookies e comunicações de marketing</li>
              <li><strong>Execução de contrato:</strong> Para prestação de serviços médicos</li>
              <li><strong>Interesse legítimo:</strong> Para melhorias do atendimento médico</li>
              <li><strong>Cumprimento de obrigação legal:</strong> Prontuários médicos (CFM)</li>
            </ul>

            <h2>5. Compartilhamento de Dados</h2>
            <p>
              Não compartilhamos seus dados pessoais com terceiros, exceto:
            </p>
            <ul>
              <li>Quando necessário para prestação do serviço médico (laboratórios, hospitais)</li>
              <li>Por determinação legal ou ordem judicial</li>
              <li>Com seu consentimento expresso</li>
            </ul>

            <h2>6. Retenção de Dados</h2>
            <ul>
              <li><strong>Prontuários médicos:</strong> 20 anos (conforme Resolução CFM)</li>
              <li><strong>Dados de contato:</strong> Enquanto houver relacionamento médico</li>
              <li><strong>Cookies:</strong> Conforme política de cookies específica</li>
            </ul>

            <h2>7. Seus Direitos (LGPD)</h2>
            <p>Você tem direito a:</p>
            <ul>
              <li>Confirmação da existência de tratamento</li>
              <li>Acesso aos dados</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados</li>
              <li>Anonimização, bloqueio ou eliminação (quando aplicável)</li>
              <li>Portabilidade dos dados</li>
              <li>Eliminação dos dados tratados com consentimento</li>
              <li>Revogação do consentimento</li>
            </ul>

            <h2>8. Segurança</h2>
            <p>
              Implementamos medidas técnicas e organizacionais adequadas para proteger 
              seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>

            <h2>9. Cookies e Tecnologias</h2>
            <p>
              Utilizamos cookies apenas mediante seu consentimento expresso. 
              Você pode gerenciar suas preferências através do banner de cookies ou 
              configurações do seu navegador.
            </p>

            <h2>10. Contato</h2>
            <p>
              Para exercer seus direitos ou esclarecer dúvidas sobre esta política:
            </p>
            <ul>
              <li><strong>E-mail:</strong> contato@analuizarocha.com.br</li>
              <li><strong>Telefone:</strong> Disponível no site</li>
            </ul>

            <h2>11. Alterações</h2>
            <p>
              Esta política pode ser atualizada periodicamente. A versão mais recente 
              estará sempre disponível nesta página.
            </p>

            <p className="text-sm text-secondary mt-8">
              <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}