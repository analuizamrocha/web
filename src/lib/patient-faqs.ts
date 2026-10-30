import { CLINICA_NASSIF, WPP_NUMBER_SECRETARY_FORMATTED } from './constants'
import type { FAQItem } from './seo-schemas'

export type PatientFAQ = FAQItem & { id: string; featured?: boolean }
export type FAQTopic = {
  id: string
  label: string
  description: string
  href: string
  linkLabel: string
  items: PatientFAQ[]
}

// One editorial source for the visible answers, highlights and FAQPage JSON-LD.
// Questions reflect the site's existing scope; they are not search-volume claims.
export const patientFAQTopics: FAQTopic[] = [
  {
    id: 'consulta',
    label: 'Primeira consulta',
    description: 'O cuidado começa com uma conversa, sem constrangimento.',
    href: '/sobre',
    linkLabel: 'Conheça a Dra. Ana Luiza',
    items: [
      {
        id: 'o-que-trata',
        question: 'O que faz uma coloproctologista?',
        answer:
          'É a médica que avalia e trata doenças do intestino grosso, reto e ânus. A coloproctologia inclui cuidados clínicos, prevenção e cirurgia, quando indicada.',
        featured: true,
      },
      {
        id: 'quando-procurar',
        question: 'Quando devo procurar uma proctologista?',
        answer:
          'Sangramento anal, dor ao evacuar, coceira persistente, alterações do hábito intestinal ou dificuldade para controlar as fezes merecem avaliação. A consulta também pode orientar a prevenção, mesmo sem sintomas.',
      },
      {
        id: 'vergonha',
        question: 'Tenho vergonha do exame proctológico. Como é a consulta?',
        answer:
          'A consulta começa com uma conversa sobre seus sintomas, hábitos, histórico de saúde e dúvidas. A necessidade de exame é avaliada individualmente e deve ser explicada, respeitando sua privacidade e seu consentimento.',
      },
      {
        id: 'levar',
        question: 'Preciso fazer exames antes da primeira consulta?',
        answer:
          'Não é necessário solicitar exames por conta própria. Leve os resultados que já possui, a lista de medicamentos e informações sobre doenças e cirurgias anteriores. Confirme com a equipe se há alguma orientação específica para sua visita.',
      },
    ],
  },
  {
    id: 'sintomas',
    label: 'Sintomas e sinais de atenção',
    description: 'Entenda por que sintomas parecidos podem ter causas diferentes.',
    href: '/blog/sangue-nas-fezes-quando-procurar-coloproctologista',
    linkLabel: 'Leia sobre sangue nas fezes',
    items: [
      {
        id: 'sangue',
        question: 'Sangue nas fezes ou no papel é sempre hemorroida?',
        answer:
          'Não. Hemorroidas e fissuras podem causar sangramento, mas existem outras causas. A avaliação médica ajuda a identificar a origem e decidir se são necessários exames. Não atribua um sangramento recorrente apenas à hemorroida.',
        featured: true,
      },
      {
        id: 'dor-evacuar',
        question: 'Dor ao evacuar pode ser fissura anal?',
        answer:
          'Pode, mas esse sintoma também ocorre em outras condições. A fissura é uma pequena lesão no canal anal que pode causar dor durante ou após a evacuação e sangramento. O exame é necessário para diferenciar as causas.',
      },
      {
        id: 'coceira',
        question: 'Coceira anal persistente precisa de avaliação?',
        answer:
          'Sim. Irritação da pele, umidade e doenças da região anal são algumas possibilidades. A causa não pode ser definida apenas pelo sintoma. Evite usar pomadas por conta própria e procure avaliação se a coceira persistir.',
      },
    ],
  },
  {
    id: 'hemorroidas',
    label: 'Hemorroidas',
    description: 'Tratamento clínico, ligadura e cirurgia: cada caso tem uma indicação.',
    href: '/tratamentos/hemorroidas',
    linkLabel: 'Conheça os tratamentos para hemorroidas',
    items: [
      {
        id: 'hemorroida-cirurgia',
        question: 'Toda hemorroida precisa de cirurgia?',
        answer:
          'Não. Mudanças nos hábitos intestinais e tratamentos clínicos ou ambulatoriais podem ser suficientes em alguns casos. A indicação de cirurgia depende dos sintomas, do exame e da resposta ao tratamento anterior.',
        featured: true,
      },
      {
        id: 'ligadura',
        question: 'O que é ligadura elástica para hemorroidas?',
        answer:
          'É um procedimento em que um pequeno anel elástico é colocado na base de uma hemorroida interna. A indicação depende do tipo de hemorroida e da avaliação médica; não é uma opção para todas as alterações da região anal.',
      },
      {
        id: 'recidiva',
        question: 'A hemorroida pode voltar depois do tratamento?',
        answer:
          'Pode haver persistência ou retorno de sintomas. O controle da constipação e do esforço para evacuar faz parte do cuidado, inclusive após procedimentos. Sangramento ou dor que retornam precisam ser reavaliados.',
      },
    ],
  },
  {
    id: 'fissuras-fistulas',
    label: 'Fissura e fístula anal',
    description: 'Nomes semelhantes, condições e cuidados diferentes.',
    href: '/tratamentos/cx-fistulas-anorretais',
    linkLabel: 'Saiba mais sobre fístulas anorretais',
    items: [
      {
        id: 'fissura-fistula',
        question: 'Qual a diferença entre fissura e fístula anal?',
        answer:
          'A fissura é uma lesão no revestimento do canal anal. A fístula é um trajeto anormal que pode ligar o canal anal à pele ao redor do ânus e causar secreção. O diagnóstico e o tratamento são diferentes.',
      },
      {
        id: 'toxina',
        question: 'Para que serve a toxina botulínica na fissura anal?',
        answer:
          'Em casos selecionados, a toxina botulínica pode ser usada para relaxar temporariamente a musculatura do esfíncter anal. A decisão considera a duração da fissura, os tratamentos já realizados e os riscos de cada opção.',
      },
      {
        id: 'secrecao',
        question: 'Saída de secreção perto do ânus pode ser fístula?',
        answer:
          'Pode ser uma das causas, mas é necessário examinar a região para esclarecer a origem. Dor, inchaço ou secreção recorrente merecem avaliação. Não tente espremer ou tratar a lesão por conta própria.',
      },
    ],
  },
  {
    id: 'colonoscopia',
    label: 'Colonoscopia e prevenção',
    description: 'Exames e rastreamento definidos a partir da sua história.',
    href: '/locais-de-atendimento/specta-endoscopia-digestiva',
    linkLabel: 'Veja o local de atendimento para colonoscopia',
    items: [
      {
        id: 'colonoscopia-indicacao',
        featured: true,
        question: 'Quando é necessário fazer colonoscopia?',
        answer:
          'A colonoscopia pode ser indicada para investigar sintomas, acompanhar alterações já conhecidas ou realizar o rastreamento do câncer colorretal. Idade, histórico familiar e resultados de exames anteriores ajudam a definir quando realizar o exame.',
      },
      {
        id: 'colonoscopia-preparo',
        question: 'Como é o preparo para a colonoscopia?',
        answer:
          'O preparo segue um protocolo do serviço de endoscopia e pode incluir mudanças na alimentação e medicamentos prescritos para a limpeza intestinal. Siga as instruções recebidas e informe seus medicamentos e condições de saúde. Não ajuste doses ou suspenda remédios por conta própria.',
      },
      {
        id: 'prevencao-sem-sintomas',
        question: 'Preciso conversar sobre prevenção mesmo sem sintomas?',
        answer:
          'Sim. O rastreamento busca alterações antes que causem sintomas. A estratégia deve ser individualizada conforme idade, histórico pessoal e familiar. Na consulta, informe se há casos de câncer colorretal ou pólipos na família.',
      },
    ],
  },
  {
    id: 'intestino',
    label: 'Saúde intestinal',
    description: 'Prisão de ventre, diarreia e acompanhamento contínuo.',
    href: '/tratamentos/sindrome-intestino-irritavel',
    linkLabel: 'Entenda a síndrome do intestino irritável',
    items: [
      {
        id: 'constipacao',
        question: 'Prisão de ventre frequente precisa de investigação?',
        answer:
          'Sim. Fezes endurecidas, esforço para evacuar e sensação de evacuação incompleta merecem atenção quando são frequentes. A avaliação considera alimentação, medicamentos, hábitos e possíveis doenças, sem depender apenas do número de evacuações.',
      },
      {
        id: 'diarreia',
        question: 'Diarreia que não passa pode ser intestino irritável?',
        answer:
          'Existem diferentes causas de diarreia persistente. A síndrome do intestino irritável é uma possibilidade em determinados contextos, mas o diagnóstico exige avaliação. Sangramento, perda de peso ou outros sintomas associados devem ser relatados à médica.',
      },
      {
        id: 'crohn-retocolite',
        question: 'Doença de Crohn e retocolite precisam de acompanhamento contínuo?',
        answer:
          'Sim. São doenças inflamatórias intestinais que precisam de acompanhamento individualizado, inclusive em períodos de melhora. O objetivo é controlar a inflamação e ajustar o cuidado conforme a evolução. Não interrompa o tratamento sem orientação.',
      },
    ],
  },
  {
    id: 'hpv',
    label: 'HPV e saúde anal',
    description: 'Avaliação de lesões e orientação para prevenção.',
    href: '/tratamentos/hpv-anal',
    linkLabel: 'Leia sobre avaliação e tratamento de HPV anal',
    items: [
      {
        id: 'verrugas',
        question: 'Verrugas na região anal podem ser HPV?',
        answer:
          'Podem, mas outras lesões podem ter aparência semelhante. O exame médico é importante para confirmar a suspeita e orientar o cuidado. Não utilize produtos para verrugas comuns na região anal sem prescrição.',
      },
      {
        id: 'hpv-tratamento',
        question: 'O tratamento do HPV anal é igual para todas as pessoas?',
        answer:
          'Não. O cuidado depende da localização e extensão das lesões e das condições de saúde da pessoa. As opções e a necessidade de acompanhamento devem ser discutidas em consulta. O tratamento das lesões não garante a eliminação do vírus.',
      },
    ],
  },
  {
    id: 'cirurgias',
    label: 'Cirurgias e recuperação',
    description: 'Indicação, alternativas e expectativas sem promessas.',
    href: '/tratamentos',
    linkLabel: 'Explore os tratamentos disponíveis',
    items: [
      {
        id: 'laser',
        question: 'Cirurgia a laser é indicada para qualquer caso?',
        answer:
          'Não. O laser é uma ferramenta que pode ser utilizada em situações selecionadas. A escolha depende da doença, da anatomia e dos objetivos do tratamento. Nenhuma técnica garante ausência de dor, complicações ou retorno dos sintomas.',
      },
      {
        id: 'cisto-pilonidal',
        question: 'Cisto pilonidal é a mesma coisa que fístula anal?',
        answer:
          'Não. O cisto pilonidal costuma ocorrer na região do sulco entre as nádegas, próximo ao cóccix. A fístula anal envolve a região do canal anal. A localização e o exame ajudam a diferenciar as condições e a definir o tratamento.',
      },
      {
        id: 'recuperacao',
        question: 'Quanto tempo leva para voltar às atividades após uma cirurgia proctológica?',
        answer:
          'O prazo varia conforme o procedimento, a evolução da cicatrização e as atividades de cada pessoa. O retorno ao trabalho, aos exercícios e aos demais hábitos deve seguir a orientação da equipe que acompanha o pós-operatório.',
      },
    ],
  },
  {
    id: 'atendimento',
    label: 'Atendimento em Curitiba',
    description: 'Organize sua visita e confirme os detalhes com a equipe.',
    href: '/contato',
    linkLabel: 'Veja os canais de contato',
    items: [
      {
        id: 'onde',
        question: 'Onde a Dra. Ana Luiza atende em Curitiba?',
        answer: `As consultas são realizadas na ${CLINICA_NASSIF.name}, na ${CLINICA_NASSIF.address}, ${CLINICA_NASSIF.neighborhood}, Curitiba. Para colonoscopia e procedimentos endoscópicos, consulte as informações da Specta Endoscopia Digestiva. Confirme o endereço do seu atendimento antes de se deslocar.`,
      },
      {
        id: 'agendar',
        question: 'Como agendar uma consulta com a coloproctologista?',
        answer: `Entre em contato com a equipe pelo WhatsApp ${WPP_NUMBER_SECRETARY_FORMATTED}. Confirme diretamente a disponibilidade, o local e as orientações para a consulta. O envio de uma mensagem não confirma uma reserva.`,
      },
      {
        id: 'convenios',
        question: 'Como confirmar valores e convênios?',
        answer:
          'Consulte a equipe de agendamento para informações atualizadas sobre valores, formas de pagamento e convênios. Essas condições podem variar conforme o local e o tipo de atendimento.',
      },
    ],
  },
]

export const patientFAQs = patientFAQTopics.flatMap((topic) => topic.items)
