# Spec: SEO de páginas de serviço cirúrgicas

**Status** · Proposta. O primeiro lançamento é a revisão de `/tratamentos/hemorroidas`, após registrar a linha de base e validar o conteúdo com a Dra. Ana Luiza.

**Site:** Dra. Ana Luiza Moraes Rocha, coloproctologista, Curitiba — `https://www.analuizarocha.com.br`

**Data da leitura do repositório:** 2026-11-17, em `main` (`d46e214`, merge do PR #79).

**Onde este arquivo fica:** o repositório guarda documentos em `docs/` (relatórios e estratégia na raiz; séries em `docs/seo-reports/` e `docs/blog-releases/`). Não havia pasta de specs. Este desenho entra em `docs/specs/` para ficar separado dos relatórios do que já foi publicado.

## Como ler as posições citadas

A pesquisa de palavras que motivou este spec veio de uma ferramenta que não é o Google. As posições são indicativas. Não há volume de busca. A demanda está estimada. Autocomplete do Google confirma que as frases existem como consulta; não confirma impressão, clique nem posição real.

A observação de que o artigo do blog aparece em primeiro lugar para “cirurgia de hemorroida a laser”, e de que plicoma já gerou resultado, é relato do Diego. O Search Console é quem confirma qual URL ranqueia, com quantas impressões e em que posição. Até essa exportação, nenhuma mudança abaixo promete ganho de posição ou de consulta marcada.

Concorrentes que apareceram nessa pesquisa (Dr. William Hilbig, Dr. Ivan de Barcelos em `cirurgiahemorroidas.com.br`, e páginas de serviço + cidade no Doctoralia) servem só como leitura do tipo de URL que o resultado mostra: página de serviço com a cirurgia e a cidade. Este spec não compara a Dra. Ana Luiza com esses médicos e não copia a estrutura deles.

O autocomplete e as ferramentas de terceiros podem omitir consultas com “anal”. O Search Console mostra impressões para as consultas disponíveis no relatório e omite algumas por privacidade ou pelos limites da exportação. Use a ausência de uma consulta como dado insuficiente para estimar a demanda.

## 1. O que o repositório tem hoje

Rotas de tratamento, todas estáticas em `src/app/tratamentos/` e listadas no sitemap (`src/app/sitemap.ts`, prioridade 0,9) e em `src/lib/markdown-page-paths.ts`:

| Slug | Título (`metadata.title`) | H1 visível | Cidade no título/H1 |
| --- | --- | --- | --- |
| `/tratamentos` | Tratamentos em Coloproctologia | Tratamentos de Coloproctologia | não |
| `/tratamentos/hemorroidas` | Hemorroidas — quando tratar e como funciona | Tratamento de Hemorroidas | não |
| `/tratamentos/cx-laser` | Cirurgia a Laser Proctológica | Cirurgias a Laser em Proctologia | não (a meta description cita Curitiba) |
| `/tratamentos/cx-fistulas-anorretais` | Fístula Anal: Cirurgia Especializada | Cirurgias para Fístulas Anorretais | não (a meta description cita Curitiba) |
| `/tratamentos/cx-cisto-pilonidal` | Cisto Pilonidal: Cirurgia e Recuperação | Cirurgia para Cisto Pilonidal | não (a meta description cita Curitiba) |
| `/tratamentos/toxina-botulinica` | Toxina Botulínica para Fissura Anal | Toxina Botulínica na Proctologia | não (a meta description cita Curitiba) |
| `/tratamentos/hpv-anal` | HPV Anal: Condilomas e Tratamento | Tratamento das Lesões de HPV Anal: Condilomas e Verrugas | não (a meta description cita Curitiba) |

Não existe `/tratamentos/plicoma` nem página de fissura anal. O template de título em `src/app/layout.tsx` é `%s | Dra. Ana Luiza M. Rocha`. “em Curitiba” precisa caber no título da página; o sufixo não acrescenta a cidade. O título padrão do site (“Coloproctologista Curitiba”) vale só para a home.

O catálogo do hub está em `src/lib/treatments.ts`. A ficha de laser diz “hemorroidas e fissuras anais”. A ficha de hemorroidas fala de ligadura e escleroterapia, não de cirurgia como assunto principal. `src/lib/treatment-images.ts` não tem slug de plicoma nem de fissura. Uma página nova sem entrada nesses dois arquivos quebra o hub e o tipo `TreatmentSlug`.

`/tratamentos/hemorroidas` já descreve ligadura elástica, escleroterapia, hemorroidectomia convencional (bisturi, eletrocautério ou grampeador), hemorroidoplastia a laser, hemorroidectomia a laser e THD. As palavras-chave da página já incluem `cirurgia hemorroidas laser curitiba`, `THD curitiba` e `hemorroidectomia curitiba`. O piloto testa título, H1 e introdução que incluam Curitiba e expliquem as opções ambulatoriais e cirúrgicas. A página também pode orientar como confirmar cobertura e custos e explicar os fatores que afetam a recuperação. A estratégia já publicada em `docs/seo-strategy-implementation.md` entrega o cluster de hemorroidas a esta URL. Uma segunda URL para o mesmo serviço dividiria o que essa página já acumula.

`/tratamentos/cx-laser` lista hemorroida, fissura, fístula, plicoma e cisto pilonidal em bullets sem link. O schema `MedicalProcedure` dessa página descreve só hemorroidas e fissuras. O card do hub repete essa descrição curta. O PR #79 deixou `plicoma-anal-cirurgia-laser` sem o bloco “Tratamento relacionado” por causa dessa ficha, não porque a página de laser ignore plicoma no corpo.

Posts em `content/posts/` (67 arquivos). O sitemap inclui todos via `getAllPosts()`. `public/llms.txt` também lista o inventário; o teste `tests/content-discovery.test.ts` exige que cada post publicado esteja nos dois.

Onze posts contêm a palavra “hemorroidectomia”:

| Post | Ligação atual com `/tratamentos/hemorroidas` |
| --- | --- |
| `hemorroida-grau-3-tratamento` | sim |
| `hemorroida-ou-plicoma-diferenca` | sim, só para hemorroidas |
| `hemorroida-sempre-precisa-cirurgia` | sim; a âncora é “melhor forma de tratamento” |
| `laser-co2-diodo-eletrocauterio-diferenca` | não; aponta só para `/tratamentos/cx-laser` |
| `laser-hemorroida-co2-ou-diodo` | sim, e também para o laser |
| `ligadura-elastica-ou-cirurgia-hemorroida` | sim |
| `recuperacao-cirurgia-hemorroida-quanto-tempo` | sim |
| `cirurgia-laser-hemorroida-quando-faz-sentido` | sim |
| `dor-anal-relacao-sexual` | não; a palavra aparece numa frase de comparação de recuperação, não como convite ao serviço |
| `fases-cicatrizacao-cirurgia-hemorroida` | sim |
| `toxina-botulinica-cirurgia-hemorroida` | sim |

Posts cujo assunto é plicoma: `plicoma-anal-cirurgia-laser`, `plicoma-anal-por-que-aparece`, `plicoma-anal-vale-a-pena-retirar` e `hemorroida-ou-plicoma-diferenca`. Não há um quarto post dedicado a plicoma. Menções laterais (bolinha no ânus, hemorroida grau 3, hemorroida trombosada, comparação de lasers) não são posts de plicoma. O PR #79 deixou posts de sintoma com várias causas fora do card de tratamento para não sugerir diagnóstico. Esse critério continua valendo.

Posts de fissura: `fissura-anal-tratamento`, `fissura-anal-quando-cirurgia-indicada` (keyword `esfincterotomia lateral interna`), `fissura-anal-toxina-botulinica-tratamento` e `fissura-anal-pode-cicatrizar-sozinha`. A página de toxina botulínica não cita esfincterotomia. O PR #79 recusou ligar “a fissura pode cicatrizar sozinha” ao card de botox.

Schema hoje:

- Grafo global em `src/lib/structured-data.ts`: `MedicalOrganization`, `Physician` (CRM-PR 45351 e RQE 36221), `MedicalProcedure` genérico de serviços, `WebSite`, `LocalBusiness`. `areaServed` é Curitiba. `workLocation` e `containedInPlace` são `MedicalClinic` da Clínica Nassif, Batel (Rua Bruno Filgueira, 489, CEP 80240-220).
- Cada página de tratamento repete um `MedicalProcedure` local, com FAQ e breadcrumb (`src/lib/seo-schemas.ts`). O procedimento local cita o CRM e não o RQE, não aponta para `#physician` / `#organization`, e não traz endereço, bairro nem cidade.
- A página `/tratamentos` emite `availableService` a partir de `TREATMENTS`. Página nova entra nesse schema quando entra no catálogo.
- `priceRange: '$$'` existe na organização. Não há `Offer` nem preço de procedimento.

WhatsApp e medição:

- Consulta do site: `WPP_NUMBER_SECRETARY` = `554130739732`, exibido como `(41) 3073-9732`, helper `WHATSAPP_HREF_SECRETARY` em `src/lib/constants.ts`. Texto único: “Olá! Gostaria de agendar uma consulta com a Dra Ana Luiza Rocha”. Header, blog, hub de tratamentos e cada `CallToActionCard` de tratamento usam esse href. O `aria-label` muda por página; o texto enviado ao WhatsApp não muda.
- Clínica Nassif: `WPP_NUMBER_NASSIF` = `+5541988645800`, exibido como `(41) 98864-5800`, usado em `src/lib/locations.ts` no card e na página `/locais-de-atendimento/clinica-nassif`. Não é um número antigo abandonado. É o WhatsApp do bloco da Nassif, ao lado do telefone fixo `(41) 3244-1022`.
- Specta tem o número próprio de colonoscopia.
- O piloto `go.mdxstudio.com.br` (`src/lib/whatsapp-tracking.ts`, `WHATSAPP_HOME_TRACKING_URL`) decora só o CTA do herói da home, e só com consentimento de cookie. O código não define um evento customizado de clique no WhatsApp. A coleta automática de cliques externos depende da configuração do GA4, que ainda precisa ser verificada. `AnalyticsProvider` só carrega GA/GTM depois de `lgpd-cookie-consent = accepted`.

O que os PRs já fizeram, e o que este spec não repete:

- [PR #78](https://github.com/analuizamrocha/web/pull/78), merge em 2026-11-12. Ligou, no corpo de `/tratamentos/hemorroidas`, os artigos de ligadura, recuperação e laser, e a página `/tratamentos/cx-laser`. Quatro artigos passaram a apontar para `/tratamentos/hemorroidas` com link simples, sem parâmetro: `hemorroida-ou-prolapso-retal`, `laser-hemorroida-co2-ou-diodo`, `sangue-papel-higienico-sempre-hemorroida`, `sangue-nas-fezes-quando-procurar-coloproctologista`. O texto do WhatsApp continuou genérico, sem a condição. O piloto de rastreamento continuou só no herói. A frase “opção mais moderna” em sangue nas fezes ficou para revisão clínica e não foi reescrita.
- [PR #79](https://github.com/analuizamrocha/web/pull/79), merge em 2026-11-12. Bloco “Tratamento relacionado” só quando a ficha do hub nomeia a mesma condição: `cisto-pilonidal-precisa-cirurgia` → `/tratamentos/cx-cisto-pilonidal` e `hpv-anal-vaporizacao-laser-co2` → `/tratamentos/hpv-anal`. Plicoma e fissura ficaram de fora de propósito. Nenhum CTA, número ou mensagem de WhatsApp mudou.

Identificação profissional: o rodapé (`src/components/ui/Footer.tsx`) e o header mostram `CRM-PR 45351 | RQE 36221` em todas as páginas. As páginas de tratamento não repetem o RQE no schema do procedimento.

SIBO: um post, `content/posts/disbiose-sibo-tratamento.md`. Meta description atual: “Disbiose intestinal e SIBO causam inchaço, gases e dor abdominal. Entenda as diferenças, diagnóstico e tratamentos eficazes com coloproctologista em Curitiba.” Nenhum outro markdown aponta para esse slug. `public/llms.txt` o lista. O sitemap o inclui porque inclui todo post. Menções soltas a “disbiose” existem em `por-que-meus-sintomas-nunca-melhoram.md` e `sindrome-intestino-irritavel-sintomas-diagnostico-tratamento.md`; não são links para o post de SIBO.

Convênio no site hoje, sem preço e sem lista de planos: FAQ “Como confirmar valores e convênios?” em `src/lib/patient-faqs.ts`, e “Os dois locais aceitam convênio?” em `/locais-de-atendimento` (“depende do plano e do tipo de atendimento”). A página `/design` tem uma resposta de rascunho (“a consulta é particular”) e não é superfície pública de SEO.

## 2. Objetivo e não-objetivos

### Objetivo

Fortalecer as páginas de serviço para buscas locais de quem está avaliando atendimento em Curitiba. As prioridades incluem hemorroidectomia e cirurgia de hemorroida a laser, retirada de plicoma a laser, cisto pilonidal, fístula (incluindo FiLaC e fistulotomia), fissura (esfincterotomia e toxina botulínica) e HPV com laser de CO₂. O blog continua respondendo a pergunta informacional e aponta para essa página com âncora que descreve o destino.

A meta de negócio é gerar consultas de pessoas avaliando tratamento ou cirurgia. O piloto mede visibilidade e cliques orgânicos. Consultas marcadas exigem uma fonte que registre o agendamento.

### Não-objetivos

- O post de SIBO permanece no ar, indexável, no sitemap e no `llms.txt`. Sem `noindex`, sem 301, sem canonical para outra URL, sem remoção.
- Não criar post, seção ou FAQ novo sobre SIBO, disbiose ou microbiota.
- Não acrescentar links internos para `/blog/disbiose-sibo-tratamento`. Os links que não existem continuam não existindo. Não varrer o site para apagar a palavra “disbiose” onde ela já explica outra condição.
- Em um ajuste editorial separado do piloto, a edição proposta para esse post é suavizar a meta description que diz “tratamentos eficazes”. O corpo e a FAQ “SIBO tem cura?” ficam como estão nesta leva, salvo se uma leitura CFM posterior apontar a mesma promessa no corpo. A meta sugerida, ainda educativa e sem promessa de resultado: “Disbiose intestinal e SIBO podem causar inchaço, gases e dor abdominal. Veja as diferenças, como é o diagnóstico e quando procurar avaliação em Curitiba.” Confirmar o texto na implementação; não publicar outro adjetivo de resultado no lugar.
- Não prometer que a queda de impressões de SIBO, se acontecer, é efeito desta mudança. Deixar de linkar e de produzir conteúdo novo não desindexa o que já ranqueia.
- Não estimar volume, não fixar meta numérica de posição e não tratar autocomplete como demanda.
- Valores de consulta e de procedimentos são tratados no atendimento. Serviços oferecidos, cobertura e eventuais faixas de recuperação dependem da validação da seção 5.
- O piloto de SEO usa o fluxo de WhatsApp atual. A instrumentação tem escopo próprio na seção 4.f.
- Não reescrever os links que o #78 e o #79 já colocaram, exceto a âncora “melhor forma de tratamento”, que pode sugerir superioridade.
- Fora do repositório, só listado: perfil Doctoralia com serviços cirúrgicos e Google Business Profile. Nenhuma tarefa de código cobre isso.

## 3. Tiers de palavra-chave

Cada linha diz a URL que deve ser a dona, a URL que hoje pode estar ranqueando, e o buraco. “Dona” segue a tabela de `docs/seo-strategy-implementation.md`: uma URL comercial por cluster. Artigos mantêm sua cobertura editorial e podem continuar aparecendo para buscas cirúrgicas. A seção 7 acompanha o desempenho das duas URLs no piloto.

### Tier 1 — cirurgia, cidade, particular

Intenção de quem já nomeia o procedimento e, em geral, Curitiba, preço, convênio ou laser.

| Consulta (autocomplete ou relato) | URL dona proposta | O que existe | Buraco |
| --- | --- | --- | --- |
| cirurgia de hemorroida em Curitiba; cirurgia de hemorroida a laser Curitiba; hemorroidectomia a laser | `/tratamentos/hemorroidas` | Página e vários artigos. Diego viu o artigo `cirurgia-laser-hemorroida-quando-faz-sentido` em primeiro para a variante a laser | Título e H1 ainda podem refletir atendimento local, ligadura e cirurgia. Comparar as duas URLs no Search Console |
| hemorroidectomia a laser preço; quanto custa uma cirurgia de hemorroida em Curitiba | a mesma página, seção de custo | Não há página de preço | Explicar como a equipe orienta sobre custos, com avaliação individual para procedimentos |
| hemorroidectomia a laser pós-operatório | a mesma página, com apoio dos artigos de recuperação e de fases da cicatrização | Artigos já linkam a página | Explicar os fatores que afetam a retomada das atividades |
| hemorroidectomia THD; THD | a mesma página, seção que já existe | Seção “THD – Desarterialização Hemorroidária Transanal” | Mencionar a técnica como serviço somente após confirmação |
| unimed cobre cirurgia de hemorroida a laser; convênio cobre laser | a mesma página, seção de convênio; artigo de Tier 3 só depois da resposta dela | FAQ genérica em `/perguntas-frequentes` e em locais | Não afirmar cobertura da Unimed nem de outro plano |
| quantos dias de atestado cirurgia hemorroida | artigo atual de recuperação | Já há uma seção sobre volta ao trabalho | Avaliar se a seção comporta uma pergunta sobre atestado |
| retirada de plicoma a laser; valor; recuperação; cirurgia plicoma Curitiba; plicoma laser Curitiba | `/tratamentos/plicoma` (nova) | Três artigos e o comparativo hemorroida/plicoma. Nenhum slug de serviço | Página inexistente. “Valor” cai na seção sem preço |
| cisto pilonidal laser Curitiba | `/tratamentos/cx-cisto-pilonidal` | Página, keywords já incluem a frase, três artigos | H1 sem “em Curitiba”; hub de laser não linka esta página |
| esfincterotomia lateral interna | `/tratamentos/fissura-anal` (nova), se ela realiza a técnica | Artigo `fissura-anal-quando-cirurgia-indicada`. Página de botox não cita a cirurgia | Sem URL de serviço. Não colocar a cirurgia na página de botox como se fosse o mesmo procedimento |
| botox fissura valor | `/tratamentos/toxina-botulinica` | Página existente, keyword `botox fissura anal curitiba` | Sem seção de custo. “Valor” não vira preço publicado |
| fistulotomia; laser para fístula; FiLaC | `/tratamentos/cx-fistulas-anorretais` | Página cita FiLaC, fistulotomia, retalho, LIFT e seton. Artigo `laser-fistula-anal-filac-indicacoes` | H1 sem cidade; hub de laser não linka |
| laser CO2 HPV preço | `/tratamentos/hpv-anal` | Página e artigos de vaporização com CO₂ e de laser versus eletrocautério | Sem seção de custo; hub de laser não linka |

### Tier 2 — escolha de tratamento

A pessoa compara técnicas. A URL dona continua sendo a página de serviço. O artigo explica a diferença e linka com âncora descritiva.

| Consulta aproximada | Artigo que já responde | Página dona |
| --- | --- | --- |
| ligadura elástica ou cirurgia | `ligadura-elastica-ou-cirurgia-hemorroida` | `/tratamentos/hemorroidas` (link já existe) |
| laser de CO₂ ou diodo na hemorroida | `laser-hemorroida-co2-ou-diodo` | hemorroidas e, como hub, `cx-laser` (links já existem) |
| CO₂, diodo ou eletrocautério | `laser-co2-diodo-eletrocauterio-diferenca` | `cx-laser` já; falta âncora para hemorroidas no trecho da hemorroidectomia, e para as páginas filhas quando existirem |
| hemorroida grau 3: ligadura, cirurgia ou laser | `hemorroida-grau-3-tratamento` | `/tratamentos/hemorroidas` (link já existe) |
| hemorroida ou plicoma | `hemorroida-ou-plicoma-diferenca` | hemorroidas já; plicoma quando a página existir |
| FiLaC: indicações e limites | `laser-fistula-anal-filac-indicacoes` | `/tratamentos/cx-fistulas-anorretais` (link já existe) |
| fissura cicatriza sozinha / quando operar / botox | os quatro artigos de fissura | página de fissura, não o card de botox, pelo motivo do PR #79 |
| cisto pilonidal: operar, laser ou recidiva | os três artigos de cisto | `/tratamentos/cx-cisto-pilonidal` |
| HPV: CO₂ ou eletrocautério | `hpv-anal-vaporizacao-laser-co2`, `laser-ou-eletrocauterizacao-hpv-anal` | `/tratamentos/hpv-anal` |

### Tier 3 — informacional que alimenta o Tier 1

Sintoma, tempo, recuperação, medo, diferença entre condições. Já existem e devem continuar artigos: sangue no papel, sangue nas fezes, hemorroida na gravidez, hemorroida trombosada, quanto tempo a hemorroida dura, prolapso retal, bolinha no ânus, dor na relação, fases da cicatrização, recuperação da cirurgia de hemorroida, abscesso que vira fístula. Não criar outro artigo para a mesma pergunta. A regra de sobreposição está em `docs/seo-strategy-implementation.md` e em `docs/blog-content-playbook.md`.

Pautas para revisar após as páginas de serviço, considerando o que os artigos já cobrem e as confirmações da seção 5.

1. Dias de atestado após a cirurgia de hemorroida. Avaliar primeiro a seção “Quando posso voltar ao trabalho?” de `recuperacao-cirurgia-hemorroida-quanto-tempo`. A decisão sobre uma nova URL depende de intenção distinta e pauta própria.
2. Hemorroida grau 4 precisa de cirurgia. O artigo de grau 3 e o artigo “sempre precisa de cirurgia” não respondem grau 4 como pergunta principal. A página de hemorroidas já diz que grau IV volumoso costuma ir para cirurgia; o artigo não pode contradizer isso nem transformar a frase em indicação universal.
3. Recuperação da retirada de plicoma a laser. O post `plicoma-anal-cirurgia-laser` já trata da recuperação no título, no texto e na FAQ. Revisar esse artigo primeiro e ligar à página de plicoma quando ela existir. Uma nova URL exige uma pergunta distinta que o artigo atual não consiga atender.
4. Convênio cobre cirurgia a laser. Sem lista de planos e sem preço. Depende da resposta sobre convênios. Se a resposta for “não publicamos convênio”, este artigo não sai; a seção da página de serviço basta.

A pesquisa por consulta e URL ajuda a decidir quais perguntas merecem ampliação em páginas existentes.

## 4. Mudanças propostas, em ordem

Nada desta seção é texto pronto para publicar. Frases clínicas saem do que ela confirmar ou do que os artigos já dizem, reescritas no tom de `docs/cfm-compliance-guidelines.md`. Onde a copy atual promete “menos dor”, “recuperação rápida” ou “melhor”, a implementação não copia essa frase para título, H1, meta ou FAQ nova. Exemplos já no ar, para não espalhar:

- meta de `/tratamentos/cx-laser`: “recuperação rápida e menos dor”;
- hemorroidoplastia em `/tratamentos/hemorroidas`: “menos dor e recuperação rápida”;
- título do artigo de ligadura: “qual é o melhor tratamento”;
- âncora em `hemorroida-sempre-precisa-cirurgia`: “melhor forma de tratamento”;
- `sangue-nas-fezes-quando-procurar-coloproctologista`: “opção mais moderna”, já deixada em aberto pelo PR #78. Não entra nesta leva, a menos que o parágrafo seja editado por outro motivo.

### 4.a Tratamento e cirurgia de hemorroidas em Curitiba

Manter a URL `/tratamentos/hemorroidas`. Não criar `/tratamentos/cirurgia-de-hemorroida` nem variante com “curitiba” no slug. A estratégia vigente já nomeia esta URL como dona do cluster, o sitemap e os artigos já apontam para ela, e uma página paralela passaria a disputar as mesmas consultas.

Usar “Tratamento e cirurgia de hemorroidas em Curitiba” como título e H1 propostos. A introdução explica o que a avaliação inclui e em que situações se consideram cuidados clínicos, procedimentos ambulatoriais e cirurgia. O texto identifica a Clínica Nassif, no Batel, como local de consulta e informa que as cirurgias são organizadas em hospitais parceiros. A meta resume as opções confirmadas em tom educativo.

O corpo continua com o que a página já separa, na ordem de decisão do paciente, e só nomeia técnica que ela confirmar:

- ligadura elástica, como alternativa ambulatorial, não como cirurgia;
- escleroterapia, se ela ainda a oferece;
- hemorroidectomia convencional;
- hemorroidectomia a laser e hemorroidoplastia a laser (LHP), como técnicas diferentes, não como sinônimos;
- THD, só se ela realiza;
- PPH, LigaSure, laser de CO₂ e laser de diodo só se ela realiza. O artigo `laser-hemorroida-co2-ou-diodo` já discute CO₂ e diodo; a página não afirma um aparelho que ela não usa.

A seção de recuperação explica de que fatores depende a volta às atividades e indica quando esses prazos são discutidos com a médica. Use uma faixa somente se ela validar o contexto e a redação. A página pode apontar para `recuperacao-cirurgia-hemorroida-quanto-tempo` e `fases-cicatrizacao-cirurgia-hemorroida` para explicar o pós-operatório em mais detalhe.

Seção de particular, convênio e reembolso: ver 4.e. Sem preço.

Links a partir dos onze posts com “hemorroidectomia”:

- Preservar os links existentes para a página e evitar duplicatas. Trocar só a âncora “melhor forma de tratamento” por uma âncora descritiva, por exemplo “tratamento de hemorroidas”.
- Em `laser-co2-diodo-eletrocauterio-diferenca`, no parágrafo da hemorroidectomia e da hemorroidoplastia, acrescentar uma âncora descritiva para `/tratamentos/hemorroidas`. O link existente para `/tratamentos/cx-laser` fica.
- Em `dor-anal-relacao-sexual`, não forçar link de serviço. A frase compara portes de cirurgia dentro de outro assunto. Ligar aqui sugeriria que dor na relação se resolve com hemorroidectomia.

No card do hub em `TREATMENTS`, usar “Tratamento de hemorroidas” e mencionar avaliação, opções ambulatoriais e cirurgia quando indicada. Assim, o card representa a mesma oferta que o título e a introdução da página.

### 4.b Página nova: retirada de plicoma a laser em Curitiba

Slug proposto: `/tratamentos/plicoma`. Título e H1: `Retirada de plicoma a laser em Curitiba`. Se o título com o sufixo do layout estourar no resultado, encurtar o título para `Plicoma a laser em Curitiba` e deixar a forma longa no H1.

Conteúdo, depois da confirmação clínica: o que é plicoma (sobra de pele, não hemorroida interna), quando a retirada é uma escolha e quando não é, o que o laser muda e o que não muda, fatores da recuperação, com faixa quando aprovada, e orientação de custos e cobertura conforme a seção 4.e. Não dizer que todo plicoma deve sair. Os artigos `plicoma-anal-vale-a-pena-retirar` e `plicoma-anal-por-que-aparece` já carregam esse cuidado; a página não os contradiz.

Registrar a página em:

- `src/app/tratamentos/plicoma/page.tsx`, no mesmo padrão das páginas atuais (metadados, FAQ visível, breadcrumb, `TreatmentHeroImage`, `CallToActionCard`);
- `TREATMENTS` e `TREATMENT_IMAGE_BY_SLUG` (imagem já usada em post de plicoma, com alt descritivo e dimensões se forem diferentes de 1200×800);
- `STATIC_ROUTE_LAST_MODIFIED` e a lista `treatmentPages` em `src/app/sitemap.ts`;
- `src/lib/markdown-page-paths.ts`;
- `public/llms.txt`;
- `RELATED_BLOG_BY_TREATMENT` com um dos artigos de plicoma, não com um artigo de hemorroida.

Links de entrada, com âncora descritiva (“retirada de plicoma a laser”, “quando o plicoma pode ser retirado”):

- `plicoma-anal-cirurgia-laser`
- `plicoma-anal-por-que-aparece`
- `plicoma-anal-vale-a-pena-retirar` (hoje aponta para `cx-laser`; passa a apontar para a página de plicoma, e pode manter o laser como segunda leitura)
- `hemorroida-ou-plicoma-diferenca` (mantém o link de hemorroidas e ganha o de plicoma)

Não mapear `bolinha-no-anus-causas-avaliacao` para esta página. O PR #79 excluiu sintoma com várias causas. Quando a ficha do hub nomear plicoma, aí sim `plicoma-anal-cirurgia-laser` pode entrar em `RELATED_TREATMENT_BY_POST`. Até lá, o link no corpo basta. Não reabrir o card do #79 para hemorroidas.

### 4.c Hub em `/tratamentos/cx-laser`

A URL permanece. O papel muda de “página de um procedimento” para hub: o laser é uma ferramenta usada em condições que têm página própria.

H1 proposto: `Cirurgia a laser em Curitiba`. O corpo linka, cada item para a página dona:

- hemorroida → `/tratamentos/hemorroidas`
- plicoma → `/tratamentos/plicoma`
- cisto pilonidal → `/tratamentos/cx-cisto-pilonidal`
- fístula (FiLaC) → `/tratamentos/cx-fistulas-anorretais`
- HPV (laser de CO₂) → `/tratamentos/hpv-anal`
- fissura → a página de fissura, quando existir; enquanto não existir, não mandar fissura para a página de botox como se laser e toxina fossem a mesma conduta

A ficha em `treatments.ts` deixa de dizer só “hemorroidas e fissuras”. Descrição de hub: organiza as cirurgias a laser e leva à página de cada condição. Os dados estruturados devem refletir o papel de hub, conforme a seção 4.i.

O card “Tratamento relacionado” do #79 não usa o hub como destino de plicoma, fissura ou hemorroida. Cada um aponta para a página da condição.

### 4.d Títulos, H1, âncoras e FAQ de recuperação

Nas páginas cirúrgicas que permanecem, alinhar título e H1 a “Cirurgia de … em Curitiba”, sem mudar o slug:

| URL | Título / H1 propostos |
| --- | --- |
| `/tratamentos/cx-cisto-pilonidal` | Cirurgia de cisto pilonidal em Curitiba |
| `/tratamentos/cx-fistulas-anorretais` | Cirurgia de fístula anal em Curitiba |
| `/tratamentos/hpv-anal` | Tratamento de HPV anal em Curitiba |
| `/tratamentos/toxina-botulinica` | Toxina botulínica para fissura anal em Curitiba |

HPV e toxina não são “cirurgia de” no H1. Forçar “cirurgia” no HPV misturaria vaporização, eletrocautério e conduta clínica. A página de toxina não vira a página de esfincterotomia (ver 4.g).

Âncoras novas são descritivas (“cirurgia de cisto pilonidal em Curitiba”, “quando a fistulotomia entra na avaliação”). Evitar “clique aqui”, “saiba mais” solto e qualquer “melhor”. Não duplicar link no mesmo post para a mesma URL.

FAQ visível em cada página de serviço cirúrgico. Se a página já emitir `FAQPage`, manter o texto igual ao conteúdo visível. Pontos a tratar com aprovação clínica:

- como é a anestesia neste tipo de procedimento, em linguagem de possibilidades (local, raqui, geral), sem fixar uma só;
- fatores que influenciam a recuperação e, quando a médica aprovar, as faixas aplicáveis;
- afastamento do trabalho e atestado, sem número de dias até ela confirmar; a resposta pode ser “o prazo é definido na consulta, porque depende da técnica e da atividade”.

Preservar as perguntas atuais de hemorroidas sobre indicação, ligadura, técnicas e recidiva. Revisar a redação das respostas ao validar o conteúdo com a médica.

### 4.e Como orientar sobre custos, convênio e reembolso

A página explica o que a avaliação inclui e como entrar em contato com a equipe para confirmar as condições de atendimento. Valores de consulta e de procedimentos ficam no atendimento, onde a equipe pode informar os valores vigentes e esclarecer o que está incluído. Custos de procedimentos são discutidos individualmente após a avaliação.

O bloco pode apontar para a FAQ de convênios em `/perguntas-frequentes`. Até a equipe validar as condições, use a orientação pública de que cobertura depende do plano e do tipo de atendimento. Inclua orientações específicas de reembolso ou nomes de convênios apenas com confirmação da equipe. No schema das páginas de serviço, mantenha o foco nos procedimentos confirmados e na identificação profissional.

### 4.f WhatsApp e medição de cliques

As páginas de serviço usam `WHATSAPP_HREF_SECRETARY`, com o número de agendamento e a mensagem genérica atuais. A Clínica Nassif conserva seu contato próprio na página de locais. O piloto `go.mdxstudio.com.br` segue restrito ao CTA do herói da home.

Uma proposta futura de medição de cliques deve vir em PR próprio. Antes de escolher o evento ou alterar o link, verificar a configuração de GA4/GTM e inspecionar as requisições do navegador. A medição automática de cliques externos pode capturar o `link_url` completo. O teste de aceite deve verificar o comportamento com e sem o consentimento exigido e garantir que eventos não enviem mensagem, número de contato ou informação sobre condição ou procedimento associado à pessoa. A avaliação deve incluir os parâmetros automáticos e as tags em uso, além de qualquer evento customizado. [Documentação do GA4](https://support.google.com/analytics/answer/9216061?hl=pt-BR)

### 4.g Fissura anal e esfincterotomia

Preferência: página nova `/tratamentos/fissura-anal`, título `Fissura anal em Curitiba`, H1 no mesmo sentido. A página explica fissura aguda e crônica, cuidado intestinal, toxina botulínica como uma opção (link para `/tratamentos/toxina-botulinica`) e esfincterotomia lateral interna como outra, só se ela realizar a cirurgia. Recuperação, anestesia, afastamento e custo seguem 4.d e 4.e.

Por que não só ampliar `/tratamentos/toxina-botulinica`: o H1 e o schema são a injeção. Esfincterotomia é outro procedimento, com outro risco (continência), já descrito com cautela nos artigos. Colocar a cirurgia dentro da página de botox faz a URL de botox disputar “esfincterotomia” e repete o problema que o PR #79 evitou ao não ligar “pode cicatrizar sozinha” ao card de toxina.

Ampliar a página de toxina fica como alternativa se ela não quiser URL nova ou se não realizar esfincterotomia. Nesse caso a página ganha um parágrafo “quando a cirurgia é conversada”, linka o artigo `fissura-anal-quando-cirurgia-indicada`, e não muda o H1 para “cirurgia de fissura”. O card de tratamento relacionado da fissura que cicatriza sozinha continua desligado até existir página de fissura cujo texto não apresente botox como único caminho.

Artigos a linkar para a página de fissura, com âncora descritiva: os quatro slugs de fissura. `dissinergia-evacuatoria-toxina-botulinica` continua na página de toxina; dissinergia não é fissura.

### 4.h Artigos de Tier 3

As quatro pautas estão no Tier 3. Para novos posts, seguir o contrato de `AGENTS.md` e `docs/blog-content-playbook.md` (frontmatter completo, linha em itálico para o card, FAQ, assinatura com CRM-PR 45351 e RQE 36221, disclaimer educativo, imagem com dimensão real em `src/lib/mdx-image-dimensions.ts`, slug em `public/llms.txt`). Cada artigo linka a página de serviço dona no corpo. Nenhum linka SIBO.

Após as páginas de serviço, priorizar as atualizações nos artigos de recuperação de hemorroidas e de plicoma. Avaliar novas pautas sobre grau 4, atestado e cobertura de laser pelos dados de busca, pela lacuna editorial e pela validação clínica.

### 4.i Schema nas páginas de serviço

Manter o breadcrumb e os identificadores do grafo global. Modelar somente procedimentos confirmados e descritos na página. A entidade `Physician` com `@id` `https://www.analuizarocha.com.br/#physician` carrega CRM e RQE. Para ligar a médica aos procedimentos, usar `Physician.availableService` com referência ao `@id` estável de cada `MedicalProcedure`. Validar os tipos e as propriedades do JSON-LD renderizado da rota, inclusive as relações duplicadas no grafo global quando afetarem a página. [Schema.org](https://schema.org/availableService)

A associação descreve quem oferece o procedimento. Manter a área atendida no nó da organização e a Nassif no local de consulta da médica. Reservar dados de local cirúrgico a hospitais identificados e confirmados. O hub de laser pode descrever a coleção de serviços sem modelá-la como um único procedimento.

Manter as FAQs visíveis para os pacientes e a paridade de texto quando já houver `FAQPage`. A marcação de FAQ fica fora dos critérios de ganho de visibilidade no Google, que descontinuou seu resultado enriquecido em maio de 2026. [Google Search Central](https://developers.google.com/search/updates#june-2026)

`public/llms.txt` ganha uma linha por página nova e atualiza a descrição das páginas cujo H1 mudou. O teste de descoberta e o e2e que percorre o sitemap passam a incluir a URL nova.

### 4.j Fora do repositório

Só registro, sem tarefa neste projeto:

- Doctoralia: serviços cirúrgicos confirmados, cidade e como agendar a avaliação.
- Google Business Profile da prática em Curitiba/Batel, com as mesmas categorias de serviço e o contato responsável pelo agendamento.

Conferir nome, CRM, endereço e função de cada contato em relação ao que está publicado no site.

## 5. Confirmações com a Dra. Ana Luiza e a equipe

### Para a página de hemorroidas

1. Quais opções o atendimento oferece hoje? Confirmar ligadura elástica, escleroterapia, hemorroidectomia convencional, hemorroidectomia a laser, hemorroidoplastia a laser (LHP), THD, PPH, LigaSure, laser de CO₂ e laser de diodo. O texto e o schema atribuem à Dra. apenas as opções confirmadas.
2. Validar a descrição da avaliação, os fatores que influenciam recuperação e afastamento e a redação das FAQs. Até validar uma faixa, informar que o prazo é individual.
3. Se a página mencionar regras específicas de atendimento particular, convênios ou reembolso, confirmar com a equipe. O texto geral sobre como verificar cobertura pode usar a orientação já publicada.

### Para as próximas páginas

- Confirmar, por condição, quais procedimentos a laser são oferecidos em plicoma, cisto pilonidal, fístula (FiLaC), HPV (CO₂) e fissura. Usar essa lista para decidir as páginas e os links do hub.
- Confirmar quais opções a Dra. oferece para fissura anal, incluindo toxina botulínica e esfincterotomia lateral interna.
- Confirmar se ela opera prolapso retal antes de avaliar uma página de serviço para essa condição.

## 6. Regras de CFM

Base: Resolução CFM nº 2.336/2023, vigente desde 11 de março de 2024, e `docs/cfm-compliance-guidelines.md`. Vale para página de serviço, FAQ, meta, âncora, schema, mensagem de WhatsApp e artigo novo.

- Tom educativo e sóbrio. Sem “melhor”, “referência”, “exclusivo”, “único”, “revolucionário”, “sem dor”, “indolor”, “garantido”, “cura”.
- Sem antes-e-depois, sem foto de paciente, sem caso identificável.
- Sem prazo fechado de recuperação, de retorno ao trabalho ou de atestado. Faixa só com ressalva e com o número que ela confirmou. “Recuperação rápida” e “menos dor”, já usados na página de laser, não entram em título, H1 ou meta novos. Quando uma dessas páginas for editada, a frase antiga sai se o parágrafo estiver sendo reescrito; não se faz uma caça global fora do escopo do PR.
- O site orienta como confirmar valores com a equipe. O manual do CFM permite divulgar valores de consulta e orienta acordar valores de procedimentos individualmente, fora dos anúncios. A decisão editorial é tratar ambos no atendimento. [Manual de Publicidade Médica do CFM](https://publicidademedica.cfm.org.br/manual/aplicacao-pratica/capitulo-8)
- Sem superioridade em relação a outro médico ou a outra técnica apresentada como sempre melhor. Ligadura, convencional, laser e THD aparecem como opções com indicação diferente.
- Manter nome, CRM e RQE visíveis no site. O grafo identifica a Dra. Ana Luiza Moraes Rocha e suas credenciais no nó `#physician`.
- Artigo novo fecha com o bloco de identificação e o disclaimer educativo já padronizados em `AGENTS.md`.
- Não inventar conduta, taxa de sucesso, nome de aparelho ou convênio. Se o dado não está no repositório nem na resposta dela, a frase não entra.
- Usar a mensagem genérica de agendamento no WhatsApp. Qualquer medição adicional segue a verificação de privacidade da seção 4.f.
- Depoimento e avaliação não entram neste trabalho.

## 7. Linha de base e avaliação do piloto

Antes de publicar a página de hemorroidas, exportar o relatório de desempenho do Search Console para Pesquisa Web no Brasil. Usar os 28 dias completos mais recentes como referência e guardar um histórico de 3 a 6 meses para contexto. Registrar filtros e datas. Guardar a exportação fora do repositório.

- Cruzar consulta e URL. Incluir `/tratamentos/hemorroidas` e `/blog/cirurgia-laser-hemorroida-quando-faz-sentido`. Registrar cliques, impressões, CTR e posição média por URL para as buscas de tratamento, ligadura, cirurgia, laser e variantes com Curitiba. Guardar também os totais das duas páginas sem filtro por consulta.
- Separar as consultas locais das variantes mais gerais e observar se aparecem outras URLs do site para as mesmas buscas. Consultas ausentes do relatório podem ter sido omitidas pelo Google. [Como ler os dados do Search Console](https://developers.google.com/search/blog/2022/10/performance-data-deep-dive)
- Após a publicação, comparar 28 dias completos com os 28 dias de referência, usando os mesmos filtros e excluindo dados preliminares. Ler a evolução da página de tratamento, a do artigo e os cliques somados das duas URLs. Uma troca da página que aparece na busca, com cliques somados estáveis, deve ser registrada como redistribuição. Se os cliques em buscas por ligadura ou tratamento caírem, verificar as consultas e avaliar o título, a introdução e os links.
- Usar os dados de plicoma, fissura e demais condições para priorizar os próximos PRs. Acompanhar o ajuste de SIBO em separado, com a série de desempenho da URL e a data da alteração.

## 8. Fases e critérios de aceite

A página de hemorroidas é o primeiro PR de implementação. As etapas posteriores dependem dos dados e das confirmações específicas para cada serviço.

### Fase 0 · Proposta

Aceite com o plano revisado neste PR de documentação.

### Fase 1 · Linha de base

Aceite com a exportação do Search Console descrita na seção 7, incluindo o cruzamento de consultas e páginas do piloto. A revisão clínica pode avançar em paralelo.

### Fase 2 · Tratamento e cirurgia de hemorroidas

Publicar o piloto após registrar a linha de base e validar a redação com a Dra. Ana Luiza. O escopo é a página existente e os links diretamente associados.

- Preservar URL e canonical de `/tratamentos/hemorroidas`. Incluir tratamento, cirurgia e Curitiba no título e no H1.
- Indicar o que a avaliação inclui. Manter visíveis as opções ambulatoriais confirmadas e explicar quando se considera cirurgia.
- Descrever técnicas e recuperação conforme a validação clínica. Usar a orientação da seção 4.e para custos e cobertura.
- Preservar os links existentes, aplicar os ajustes de âncora da seção 4.a e manter o artigo sobre cirurgia a laser e seus metadados para a comparação.
- Publicar as FAQs visíveis com redação clínica aprovada. Validar o JSON-LD da rota conforme a seção 4.i e verificar o canonical e a entrada no sitemap.
- Conferir que o CTA usa o link de agendamento e a mensagem genérica atuais. Rodar lint, build, testes e o cenário de agendamento de hemorroidas.

### Fase 3 · Plicoma

Revisar os dados de busca e confirmar a oferta de retirada a laser e o conteúdo clínico.

- Registrar `/tratamentos/plicoma` no hub, na imagem, no sitemap, em `markdown-page-paths` e no `llms.txt`.
- Incluir os links descritos na seção 4.b e validar a rota no build e no teste de URLs do sitemap.
- Usar as mesmas regras de custos, WhatsApp e schema do piloto de hemorroidas.

### Fase 4 · Hub de laser

- Apresentar cada condição confirmada com link para sua página de serviço publicada.
- Alinhar a ficha em `TREATMENTS` e os dados estruturados ao papel de hub, conforme 4.c e 4.i.
- Preservar os links do PR #78. Incluir fissura quando o tratamento a laser para essa condição estiver confirmado e a página correspondente estiver publicada.

### Fase 5 · Fissura

Confirmar a oferta clínica antes de escolher entre página própria e um ajuste na página de toxina, conforme a seção 4.g. Se houver página nova, registrá-la nos mesmos pontos de plicoma, manter o link cruzado com toxina e direcionar os artigos relevantes conforme a indicação clínica.

### Fase 6 · Demais páginas de serviço

Aplicar os títulos, FAQs e ajustes locais da seção 4.d, com os slugs atuais, após a validação de cada página. Usar o contato de agendamento, a mensagem genérica e a orientação de custos do piloto.

### Fase 7 · Artigos e ajustes editoriais

Priorizar melhorias em artigos existentes conforme 4.h. Se houver pauta nova, seguir o contrato de `AGENTS.md` e do playbook, com testes de descoberta, imagens e metadados, lint e build. A revisão da meta de SIBO pode entrar em PR separado, preservando slug, canonical, indexação, sitemap e linha do `llms.txt`.

### Fase 8 · Perfis externos

Alinhar Doctoralia e Google Business Profile com os serviços e contatos confirmados, conforme a seção 4.j.

## 9. O que uma implementação não deve fazer

- Abrir página duplicada de hemorroida “porque o slug antigo não tem a palavra cirurgia”.
- Copiar preço, prazo ou convênio de site de terceiro.
- Tratar posição de ferramenta não-Google como fato no texto publicado.
- Medir sucesso por clique no WhatsApp.
- Acrescentar o assunto médico à mensagem de agendamento ou ao evento de clique.
- Desindexar ou redirecionar o post de SIBO.
- Anunciar valores estáticos de consultas ou procedimentos.
