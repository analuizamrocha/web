import { WEBSITE_URL } from './constants'
import type { FAQItem } from './seo-schemas'

export interface ServiceContent {
  slug: string
  name: string
  category: string
  cardDescription: string
  heroDescription: string
  metaDescription: string
  keywords: string[]
  symptoms: string[]
  approaches: string[]
  highlights: string[]
  faqs: FAQItem[]
}

export const services: ServiceContent[] = [
  {
    slug: 'hemorroidas',
    name: 'Hemorroidas',
    category: 'Clínico e cirúrgico',
    cardDescription:
      'Sangramento, dor ou coceira ao evacuar? Tratamentos modernos e minimamente invasivos para hemorroidas.',
    heroDescription:
      'Avaliação cuidadosa e tratamentos ambulatoriais ou cirúrgicos, incluindo ligadura elástica, escleroterapia e técnicas a laser, com foco em alívio rápido e recuperação confortável em Curitiba.',
    metaDescription:
      'Tratamento de hemorroidas com proctologia em Curitiba: ligadura elástica, escleroterapia e técnicas a laser para alívio rápido e seguro.',
    keywords: [
      'proctologia curitiba',
      'hemorroidas curitiba',
      'tratamento hemorroidas curitiba',
      'ligadura elastica curitiba',
      'cirurgia hemorroidas laser curitiba',
    ],
    symptoms: [
      'Sangramento ao evacuar ou no papel higiênico',
      'Dor, coceira ou ardência ao sentar',
      'Nódulos ou sensação de peso na região anal',
      'Incômodo após longos períodos sentado ou em pé',
    ],
    approaches: [
      'Consulta detalhada para classificar o grau da doença',
      'Medidas clínicas e ajustes de hábitos para reduzir crises',
      'Ligadura elástica e escleroterapia em consultório quando indicado',
      'Cirurgia ou técnicas a laser para casos avançados, priorizando recuperação confortável',
    ],
    highlights: [
      'Avaliação individualizada com foco em preservar a rotina do paciente',
      'Procedimentos ambulatoriais com retorno rápido às atividades',
      'Orientações claras de dieta e cuidados para evitar recidiva',
    ],
    faqs: [
      {
        question: 'Toda hemorroida precisa de cirurgia?',
        answer:
          'Não. Muitos casos respondem bem a medidas clínicas, ligadura elástica ou escleroterapia. Cirurgia é reservada para casos específicos.',
      },
      {
        question: 'A ligadura elástica dói muito?',
        answer:
          'Pode causar leve pressão ou cólica nos primeiros dias, mas é um procedimento rápido, feito em consultório e com recuperação curta.',
      },
      {
        question: 'Como evitar que a hemorroida volte?',
        answer:
          'Manter evacuações sem esforço, boa hidratação, fibras e acompanhamento regular reduz bastante as chances de novas crises.',
      },
    ],
  },
  {
    slug: 'fissura-anal',
    name: 'Fissura anal',
    category: 'Clínico e procedimentos',
    cardDescription:
      'Dor e ardência intensa ao evacuar? Avaliação e tratamentos que aceleram a cicatrização e controlam a dor.',
    heroDescription:
      'Plano de cuidado para controlar dor, reduzir espasmos e favorecer cicatrização, com opções clínicas, toxina botulínica e, quando necessário, cirurgia delicada.',
    metaDescription:
      'Fissura anal: proctologia em Curitiba com controle de dor, cicatrização guiada e opções de toxina botulínica ou cirurgia quando indicado.',
    keywords: [
      'proctologia curitiba',
      'fissura anal curitiba',
      'tratamento fissura anal curitiba',
      'botox fissura anal curitiba',
      'cirurgia fissura anal curitiba',
    ],
    symptoms: [
      'Dor em “corte” ou queimação ao evacuar',
      'Sangue vivo no papel higiênico',
      'Medo de evacuar por causa da dor',
      'Espasmo ou fechamento intenso do ânus',
    ],
    approaches: [
      'Avaliação cuidadosa para diferenciar fissura aguda de crônica',
      'Pomadas vasodilatadoras e controle da dor para estimular a cicatrização',
      'Toxina botulínica para relaxar a musculatura e aliviar o espasmo',
      'Cirurgia em casos resistentes, preservando a continência',
    ],
    highlights: [
      'Priorização de alívio rápido da dor e orientação de hábitos intestinais',
      'Opções ambulatoriais que evitam afastamento prolongado',
      'Acompanhamento próximo para prevenir recorrências',
    ],
    faqs: [
      {
        question: 'Toda fissura vira caso cirúrgico?',
        answer:
          'A maioria cicatriza com tratamento clínico e ajustes de hábitos. Cirurgia é reservada para fissuras crônicas resistentes.',
      },
      {
        question: 'Botox ajuda a cicatrizar fissura?',
        answer:
          'Sim. A toxina botulínica diminui o espasmo, melhora a dor e favorece a cicatrização em fissuras crônicas.',
      },
      {
        question: 'Quanto tempo demora para melhorar?',
        answer:
          'Casos agudos podem melhorar em poucas semanas. Fissuras crônicas exigem acompanhamento mais longo e disciplina com hábitos.',
      },
    ],
  },
  {
    slug: 'fistula-anal',
    name: 'Fístula anal',
    category: 'Cirúrgico',
    cardDescription:
      'Secreção persistente ou dor próxima ao ânus podem indicar fístula. Tratamentos que preservam a continência.',
    heroDescription:
      'Planejamento cirúrgico individualizado, incluindo técnicas que priorizam preservação da continência, cicatrização adequada e prevenção de recidivas.',
    metaDescription:
      'Fístula anal em Curitiba: proctologia com avaliação precisa, drenagem segura e técnicas cirúrgicas que protegem a continência.',
    keywords: [
      'proctologia curitiba',
      'fistula anal curitiba',
      'cirurgia fistula anal curitiba',
      'tratamento fistula anorretal curitiba',
    ],
    symptoms: [
      'Saída de secreção ou pus perto do ânus',
      'Dor localizada e inchaço recorrente',
      'Episódios de abscesso que drenam e retornam',
      'Irritação de pele ao redor do orifício',
    ],
    approaches: [
      'Mapeamento do trajeto da fístula e avaliação de continência',
      'Drenagem adequada do abscesso, quando presente',
      'Técnicas cirúrgicas personalizadas para fístulas simples ou complexas',
      'Cuidados pós-operatórios para cicatrização segura',
    ],
    highlights: [
      'Foco em preservar a função anal e reduzir risco de recidiva',
      'Orientação clara sobre higiene, curativos e sinais de alerta',
      'Acompanhamento próximo até a cicatrização completa',
    ],
    faqs: [
      {
        question: 'Toda fístula exige cirurgia?',
        answer:
          'A maioria precisa de abordagem cirúrgica para fechar o trajeto. O tipo de técnica é escolhido após avaliação individual.',
      },
      {
        question: 'Existe risco de incontinência?',
        answer:
          'Usamos técnicas que buscam preservar a musculatura esfincteriana. Avaliação cuidadosa minimiza esse risco.',
      },
      {
        question: 'Por que o abscesso volta?',
        answer:
          'Enquanto o trajeto da fístula não for tratado, o acúmulo de secreção pode gerar novos abscessos.',
      },
    ],
  },
  {
    slug: 'coceira-anal-prurido',
    name: 'Coceira anal (prurido)',
    category: 'Clínico',
    cardDescription:
      'Coceira persistente na região anal precisa de investigação: causas dermatológicas, alimentares ou infecciosas.',
    heroDescription:
      'Investigação completa das causas do prurido anal e plano de cuidado que combina tratamentos tópicos, ajustes de hábitos e orientação de higiene gentil.',
    metaDescription:
      'Prurido anal em Curitiba: avaliação proctológica completa, tratamento das causas e orientação de higiene suave para acabar com a coceira.',
    keywords: [
      'proctologia curitiba',
      'prurido anal curitiba',
      'coceira anal curitiba',
      'tratamento coceira anal curitiba',
    ],
    symptoms: [
      'Coceira intensa, principalmente à noite',
      'Pele irritada ou rachada na região perianal',
      'Ardência após evacuar ou limpar',
      'Sensação de umidade constante',
    ],
    approaches: [
      'Avaliação das causas: dermatológicas, alimentares, infecciosas ou hábito intestinal',
      'Tratamentos tópicos específicos e orientação de higiene sem agressão à pele',
      'Ajustes alimentares e de hábitos que reduzem irritação local',
      'Seguimento para evitar cronificação e recidivas',
    ],
    highlights: [
      'Cuidados que priorizam alívio rápido da coceira',
      'Evita uso excessivo de produtos que irritam a pele',
      'Plano personalizado conforme a causa identificada',
    ],
    faqs: [
      {
        question: 'Usar lenço umedecido piora a coceira?',
        answer:
          'Alguns lenços têm fragrâncias ou álcool que irritam a pele. Preferimos limpeza suave com água e sabão neutro quando indicado.',
      },
      {
        question: 'A coceira sempre é verme ou fungo?',
        answer:
          'Nem sempre. Pode ter origem dermatológica, alimentar ou vir de pequenos vazamentos anais. Por isso a avaliação completa é importante.',
      },
      {
        question: 'Quanto tempo leva para melhorar?',
        answer:
          'Depende da causa. Muitas vezes há alívio em poucos dias com o tratamento correto e ajustes de higiene.',
      },
    ],
  },
  {
    slug: 'hpv-anal',
    name: 'HPV anal',
    category: 'Clínico e procedimentos',
    cardDescription:
      'Diagnóstico e tratamento de verrugas anais com abordagem cuidadosa e sigilosa, incluindo prevenção de recidivas.',
    heroDescription:
      'Cuidado integrado para condilomas anais: diagnóstico preciso, tratamentos tópicos ou em consultório e acompanhamento para reduzir recidivas e orientar prevenção.',
    metaDescription:
      'HPV anal em Curitiba: proctologia com diagnóstico preciso, tratamentos de verrugas e prevenção de recidivas com cuidado sigiloso.',
    keywords: [
      'proctologia curitiba',
      'hpv anal curitiba',
      'tratamento condiloma anal curitiba',
      'verruga anal curitiba',
    ],
    symptoms: [
      'Lesões ou verrugas na região anal ou perianal',
      'Coceira, ardor ou sangramento discreto',
      'Desconforto ao evacuar ou ao sentar',
      'Ansiedade quanto à transmissão e recidiva',
    ],
    approaches: [
      'Exame cuidadoso para definir extensão das lesões',
      'Tratamentos tópicos ou procedimentos em consultório/cirúrgicos quando indicado',
      'Orientação sobre prevenção, vacinação e cuidados com parceiros',
      'Acompanhamento regular para monitorar recidivas',
    ],
    highlights: [
      'Atendimento sigiloso e acolhedor',
      'Opções de tratamento que equilibram eficácia e conforto',
      'Educação clara sobre prevenção e autocuidado',
    ],
    faqs: [
      {
        question: 'Todo condiloma precisa de cirurgia?',
        answer:
          'Nem sempre. Pequenas lesões podem ser tratadas com medicamentos tópicos. Procedimentos são indicados conforme número e localização das verrugas.',
      },
      {
        question: 'Posso transmitir HPV mesmo sem lesão visível?',
        answer:
          'Sim. O vírus pode estar presente sem lesões aparentes. Uso de preservativos e acompanhamento reduzem o risco de transmissão.',
      },
      {
        question: 'A vacina ajuda quem já teve HPV?',
        answer:
          'A vacina não trata lesões existentes, mas pode proteger contra outros subtipos e reduzir novas infecções. Avaliamos caso a caso.',
      },
    ],
  },
  {
    slug: 'cisto-pilonidal',
    name: 'Cisto pilonidal',
    category: 'Cirúrgico',
    cardDescription:
      'Dor ou secreção perto do cóccix? Avaliação e técnicas modernas para tratar cisto pilonidal com recuperação mais confortável.',
    heroDescription:
      'Tratamentos que vão da drenagem correta a técnicas cirúrgicas menos invasivas, buscando cicatrização eficaz e menor tempo afastado.',
    metaDescription:
      'Cisto pilonidal em Curitiba: proctologia com drenagem adequada e cirurgias modernas para reduzir dor, recidiva e tempo de recuperação.',
    keywords: [
      'proctologia curitiba',
      'cisto pilonidal curitiba',
      'cirurgia cisto pilonidal curitiba',
      'tratamento cisto sacrococcigeo curitiba',
    ],
    symptoms: [
      'Dor, inchaço ou caroço dolorido perto do cóccix',
      'Saída de secreção ou sangue na região',
      'Episódios repetidos de inflamação ou abscesso',
      'Desconforto ao sentar ou praticar esportes',
    ],
    approaches: [
      'Avaliação do estágio: inflamação, abscesso ou cisto crônico',
      'Drenagem do abscesso quando necessário, com alívio da dor',
      'Planejamento cirúrgico personalizado para fechar o trajeto com menor recidiva',
      'Orientações de cuidados pós-operatórios e higiene local',
    ],
    highlights: [
      'Técnicas que buscam menor tempo de recuperação',
      'Explicação clara sobre curativos e retorno às atividades',
      'Foco em reduzir recidivas a longo prazo',
    ],
    faqs: [
      {
        question: 'Dá para evitar cirurgia?',
        answer:
          'Abscessos exigem drenagem. O cisto crônico costuma precisar de cirurgia para resolver de forma definitiva e evitar repetição de infecções.',
      },
      {
        question: 'Quanto tempo para voltar a trabalhar?',
        answer:
          'Depende da técnica e do tipo de atividade. Planejamos para minimizar afastamento sempre que possível.',
      },
      {
        question: 'Por que o cisto volta?',
        answer:
          'Recidivas podem ocorrer se restarem trajetos ou pelos na região. Técnicas adequadas e cuidados de higiene reduzem esse risco.',
      },
    ],
  },
  {
    slug: 'constipacao-intestinal',
    name: 'Constipação intestinal',
    category: 'Clínico',
    cardDescription:
      'Ficar dias sem evacuar, fezes ressecadas ou esforço intenso? Abordagem completa para recuperar o ritmo intestinal.',
    heroDescription:
      'Investigação das causas da prisão de ventre e plano que combina ajustes de dieta, treino evacuatório e, quando necessário, medicamentos seguros.',
    metaDescription:
      'Constipação intestinal em Curitiba: proctologia com avaliação completa, orientação alimentar e tratamentos personalizados para regular o intestino.',
    keywords: [
      'proctologia curitiba',
      'constipacao intestinal curitiba',
      'prisao de ventre curitiba',
      'tratamento constipacao curitiba',
    ],
    symptoms: [
      'Evacuar menos de 3 vezes por semana',
      'Fezes muito ressecadas ou em “bolinhas”',
      'Esforço intenso ou sensação de esvaziamento incompleto',
      'Distensão abdominal e desconforto após comer',
    ],
    approaches: [
      'Avaliação clínica e de hábitos alimentares',
      'Plano de fibras, hidratação e treino evacuatório',
      'Medicamentos ou probióticos quando indicados e de forma segura',
      'Investigação de sinais de alerta que exigem exames complementares',
    ],
    highlights: [
      'Orientação prática para organizar rotina intestinal',
      'Acompanhamento para ajustar dieta e medicações',
      'Foco em evitar complicações como fissuras e hemorroidas',
    ],
    faqs: [
      {
        question: 'Laxante pode ser usado todo dia?',
        answer:
          'O uso contínuo sem orientação pode piorar a motilidade. Preferimos ajustes de dieta e medicamentos específicos, prescritos com critério.',
      },
      {
        question: 'Constipação causa hemorroidas?',
        answer:
          'O esforço repetido favorece hemorroidas e fissuras. Tratar a constipação ajuda a prevenir essas complicações.',
      },
      {
        question: 'Quando preciso fazer exames?',
        answer:
          'Sinais como sangue nas fezes, perda de peso, anemia ou dor intensa indicam investigação complementar. Avaliamos cada caso.',
      },
    ],
  },
  {
    slug: 'diarreia-cronica',
    name: 'Diarreia crônica',
    category: 'Clínico',
    cardDescription:
      'Evacuações frequentes e líquidas por semanas merecem investigação. Tratamento direcionado conforme a causa.',
    heroDescription:
      'Busca ativa das causas de diarreia prolongada, correção de hidratação e eletrólitos e planos terapêuticos personalizados para recuperar a saúde intestinal.',
    metaDescription:
      'Diarreia crônica em Curitiba: avaliação proctológica para identificar a causa, corrigir hidratação e tratar de forma direcionada.',
    keywords: [
      'proctologia curitiba',
      'diarreia cronica curitiba',
      'tratamento diarreia curitiba',
      'proctologista curitiba',
    ],
    symptoms: [
      'Fezes líquidas ou pastosas por mais de 2 semanas',
      'Cólicas, gases e urgência para evacuar',
      'Perda de peso ou sinais de desidratação',
      'Presença de muco ou sangue nas fezes',
    ],
    approaches: [
      'História clínica detalhada e exames conforme suspeita',
      'Reposição de líquidos e eletrólitos quando necessário',
      'Tratamento específico para causas infecciosas, inflamatórias ou funcionais',
      'Orientação alimentar para reconstruir a saúde intestinal',
    ],
    highlights: [
      'Diagnóstico direcionado para evitar tratamentos genéricos',
      'Monitoramento próximo para prevenir desidratação',
      'Educação sobre sinais de alerta que exigem reavaliação imediata',
    ],
    faqs: [
      {
        question: 'Posso tomar remédio para parar a diarreia sozinho?',
        answer:
          'Remédios sem avaliação podem mascarar infecções ou agravar quadros inflamatórios. É importante investigar a causa primeiro.',
      },
      {
        question: 'Diarreia prolongada sempre é infecciosa?',
        answer:
          'Não. Pode estar ligada a intolerâncias, doenças inflamatórias, síndrome do intestino irritável ou medicamentos. A investigação direciona o tratamento.',
      },
      {
        question: 'Quando devo procurar ajuda urgente?',
        answer:
          'Sinais de desidratação, febre alta, sangue nas fezes ou dor abdominal intensa exigem avaliação imediata.',
      },
    ],
  },
  {
    slug: 'sindrome-intestino-irritavel',
    name: 'Síndrome do Intestino Irritável',
    category: 'Clínico',
    cardDescription:
      'Dor abdominal, gases e alternância entre diarreia e constipação? Plano personalizado para SII.',
    heroDescription:
      'Combinação de ajustes alimentares, manejo do estresse e, quando necessário, medicações específicas para controlar sintomas e melhorar qualidade de vida.',
    metaDescription:
      'Síndrome do Intestino Irritável em Curitiba: proctologia com plano integrado de alimentação, manejo do estresse e medicações quando indicadas.',
    keywords: [
      'proctologia curitiba',
      'sindrome do intestino irritavel curitiba',
      'sii curitiba',
      'tratamento sii curitiba',
    ],
    symptoms: [
      'Dor ou desconforto abdominal recorrente',
      'Gases, distensão e sensação de barriga estufada',
      'Alternância entre diarreia e constipação',
      'Sintomas que pioram em períodos de estresse',
    ],
    approaches: [
      'Diagnóstico clínico e exclusão de outras condições',
      'Plano alimentar personalizado e manejo de gatilhos',
      'Medicações para aliviar dor, gases e regular o trânsito intestinal',
      'Estratégias de manejo do estresse e qualidade do sono',
    ],
    highlights: [
      'Abordagem multidimensional: alimentação, hábitos e saúde mental',
      'Acompanhamento para ajustar o plano conforme resposta',
      'Foco em autonomia do paciente para controlar crises',
    ],
    faqs: [
      {
        question: 'SII tem cura?',
        answer:
          'É uma condição crônica funcional. O objetivo é controlar sintomas e melhorar a qualidade de vida com plano personalizado.',
      },
      {
        question: 'Preciso cortar muitos alimentos?',
        answer:
          'Nem sempre. Identificamos gatilhos pessoais e adaptamos a dieta de forma sustentável, evitando restrições desnecessárias.',
      },
      {
        question: 'Estresse piora a SII?',
        answer:
          'Sim, pode intensificar sintomas. Técnicas de manejo do estresse ajudam no controle das crises.',
      },
    ],
  },
  {
    slug: 'doencas-inflamatorias-intestinais',
    name: 'Doenças Inflamatórias Intestinais',
    category: 'Clínico',
    cardDescription:
      'Doença de Crohn e Retocolite Ulcerativa exigem acompanhamento contínuo e tratamento especializado.',
    heroDescription:
      'Seguimento próximo, escolha criteriosa de medicações e coordenação com exames para manter a doença controlada e proteger a saúde intestinal.',
    metaDescription:
      'Doenças inflamatórias intestinais em Curitiba: proctologia com monitoramento contínuo, tratamento medicamentoso e suporte ao paciente.',
    keywords: [
      'proctologia curitiba',
      'doenca de crohn curitiba',
      'retocolite ulcerativa curitiba',
      'doencas inflamatorias intestinais curitiba',
    ],
    symptoms: [
      'Diarreia persistente, muitas vezes com sangue ou muco',
      'Cólicas, urgência evacuatória e perda de peso',
      'Fadiga e anemia frequente',
      'Possíveis fissuras, abscessos ou fístulas em fases ativas',
    ],
    approaches: [
      'Avaliação clínica e laboratorial para definir atividade da doença',
      'Ajuste de terapia medicamentosa e monitoramento de efeitos',
      'Orientação nutricional e suporte em fases de crise ou remissão',
      'Coordenação de exames endoscópicos quando necessários',
    ],
    highlights: [
      'Acompanhamento contínuo para prevenir complicações',
      'Planos individualizados considerando rotina e qualidade de vida',
      'Comunicação clara para decisões compartilhadas',
    ],
    faqs: [
      {
        question: 'Crohn e Retocolite têm cura?',
        answer:
          'São doenças crônicas. O objetivo é alcançar e manter remissão, reduzindo inflamação e prevenindo complicações.',
      },
      {
        question: 'Preciso mudar muito a alimentação?',
        answer:
          'Adaptamos a dieta conforme fase da doença e tolerâncias individuais, sem restrições desnecessárias.',
      },
      {
        question: 'Quando pensar em cirurgia?',
        answer:
          'Cirurgia é indicada em complicações específicas ou falha de tratamento clínico. A decisão é sempre discutida em conjunto.',
      },
    ],
  },
  {
    slug: 'saude-sexual',
    name: 'Saúde sexual',
    category: 'Acolhimento e prevenção',
    cardDescription:
      'Espaço seguro para tirar dúvidas, tratar ISTs anorretais e receber orientações personalizadas.',
    heroDescription:
      'Atendimento sigiloso para prevenção, diagnóstico e tratamento de infecções anorretais, além de orientações para viver a sexualidade com conforto e segurança.',
    metaDescription:
      'Saúde sexual com proctologia em Curitiba: prevenção e tratamento de ISTs anorretais, cuidado sigiloso e orientações personalizadas.',
    keywords: [
      'proctologia curitiba',
      'saude sexual curitiba',
      'ists anorretais curitiba',
      'proctologista curitiba',
    ],
    symptoms: [
      'Dor, sangramento ou lesões após relação sexual',
      'Coceira, secreção ou verrugas na região anal',
      'Dúvidas sobre prevenção de ISTs anorretais',
      'Ansiedade sobre desconforto durante relações',
    ],
    approaches: [
      'Avaliação clínica sigilosa e testes quando necessários',
      'Tratamento de ISTs anorretais com foco em conforto e adesão',
      'Orientação sobre prevenção, vacinas e cuidados com parceiros',
      'Ajustes de lubrificação e cuidados locais para evitar lesões',
    ],
    highlights: [
      'Ambiente acolhedor e sem julgamentos',
      'Planos de cuidado individualizados',
      'Educação clara para decisões seguras',
    ],
    faqs: [
      {
        question: 'Posso tratar ISTs anorretais no consultório?',
        answer:
          'Sim. Muitas condições são manejadas em consultório com sigilo e conforto. Casos específicos podem exigir procedimentos.',
      },
      {
        question: 'Vacinas ajudam na prevenção?',
        answer:
          'Vacinas para HPV e hepatite B são importantes medidas preventivas. Avaliamos o calendário de cada paciente.',
      },
      {
        question: 'Como reduzir dor ou lesões após relação?',
        answer:
          'Lubrificação adequada, ritmo gradual e avaliação de condições pré-existentes ajudam a evitar fissuras ou irritações.',
      },
    ],
  },
  {
    slug: 'disturbios-assoalho-pelvico',
    name: 'Distúrbios do assoalho pélvico',
    category: 'Clínico e reabilitação',
    cardDescription:
      'Incontinência fecal, dificuldade para evacuar ou sensação de evacuação incompleta? Avaliação integrada.',
    heroDescription:
      'Diagnóstico preciso de disfunções do assoalho pélvico e plano que combina reabilitação, biofeedback e, quando necessário, procedimentos para recuperar o controle evacuatório.',
    metaDescription:
      'Distúrbios do assoalho pélvico em Curitiba: proctologia com reabilitação, biofeedback e tratamentos para incontinência ou evacuação difícil.',
    keywords: [
      'proctologia curitiba',
      'incontinencia fecal curitiba',
      'assoalho pelvico curitiba',
      'dificuldade evacuar curitiba',
    ],
    symptoms: [
      'Escape de fezes ou gases sem controle',
      'Sensação de que o intestino não esvazia por completo',
      'Necessidade de manobras para evacuar',
      'Dor ou pressão pélvica associada à evacuação',
    ],
    approaches: [
      'Avaliação funcional do assoalho pélvico e hábitos intestinais',
      'Reabilitação e biofeedback para melhorar coordenação muscular',
      'Ajustes de dieta e ritmo evacuatório para reduzir esforço',
      'Procedimentos ou cirurgias selecionadas quando indicados',
    ],
    highlights: [
      'Plano integrado que une clínica e reabilitação',
      'Objetivo de recuperar confiança e autonomia do paciente',
      'Orientações práticas para o dia a dia',
    ],
    faqs: [
      {
        question: 'Biofeedback ajuda de verdade?',
        answer:
          'Sim. Técnicas de reeducação muscular podem melhorar controle e coordenação, reduzindo escapes e esforço evacuatório.',
      },
      {
        question: 'Incontinência sempre precisa de cirurgia?',
        answer:
          'Não. Muitos casos melhoram com reabilitação e ajustes de hábitos. Cirurgia é considerada em situações específicas.',
      },
      {
        question: 'Quanto tempo leva para ver melhora?',
        answer:
          'Varia conforme o quadro. Em geral, algumas semanas de reabilitação já trazem ganho de controle e confiança.',
      },
    ],
  },
]

export const servicesIndexUrl = `${WEBSITE_URL}/servicos`

// Map service slugs to the existing /tratamentos slugs for redirects and linking.
export const serviceToTreatmentSlug: Record<string, string | undefined> = {
  hemorroidas: 'hemorroidas',
  'hpv-anal': 'hpv-anal',
  'cisto-pilonidal': 'cx-cisto-pilonidal',
  'fistula-anal': 'cx-fistulas-anorretais',
  'doencas-inflamatorias-intestinais': 'doencas-inflamatorias-intestinais',
  'sindrome-intestino-irritavel': 'sindrome-intestino-irritavel',
}

export const getServiceTargetPath = (slug: string) => {
  const mapped = serviceToTreatmentSlug[slug]
  return mapped ? `/tratamentos/${mapped}` : '/tratamentos'
}
