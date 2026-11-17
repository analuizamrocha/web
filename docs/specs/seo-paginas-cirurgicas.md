# Spec: SEO de páginas de serviço cirúrgicas

**Status:** desenho. Este documento não implementa página, conteúdo, schema, rastreamento nem alteração de copy.

**Site:** Dra. Ana Luiza Moraes Rocha, coloproctologista, Curitiba — `https://www.analuizarocha.com.br`

**Data da leitura do repositório:** 2026-11-17, em `main` (`d46e214`, merge do PR #79).

**Onde este arquivo fica:** o repositório guarda documentos em `docs/` (relatórios e estratégia na raiz; séries em `docs/seo-reports/` e `docs/blog-releases/`). Não havia pasta de specs. Este desenho entra em `docs/specs/` para ficar separado dos relatórios do que já foi publicado.

## Como ler as posições citadas

A pesquisa de palavras que motivou este spec veio de uma ferramenta que não é o Google. As posições são indicativas. Não há volume de busca. A demanda está estimada. Autocomplete do Google confirma que as frases existem como consulta; não confirma impressão, clique nem posição real.

A observação de que o artigo do blog aparece em primeiro lugar para “cirurgia de hemorroida a laser”, e de que plicoma já gerou resultado, é relato do Diego. O Search Console é quem confirma qual URL ranqueia, com quantas impressões e em que posição. Até essa exportação, nenhuma mudança abaixo promete ganho de posição ou de consulta marcada.

Concorrentes que apareceram nessa pesquisa (Dr. William Hilbig, Dr. Ivan de Barcelos em `cirurgiahemorroidas.com.br`, e páginas de serviço + cidade no Doctoralia) servem só como leitura do tipo de URL que o resultado mostra: página de serviço com a cirurgia e a cidade. Este spec não compara a Dra. Ana Luiza com esses médicos e não copia a estrutura deles.

Consultas com “anal” podem sumir do autocomplete e de ferramentas de terceiros. Ausência nessa lista não significa demanda zero. O volume real sai do Search Console.

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

`/tratamentos/hemorroidas` já descreve ligadura elástica, escleroterapia, hemorroidectomia convencional (bisturi, eletrocautério ou grampeador), hemorroidoplastia a laser, hemorroidectomia a laser e THD. As palavras-chave da página já incluem `cirurgia hemorroidas laser curitiba`, `THD curitiba` e `hemorroidectomia curitiba`. O que falta para a consulta “cirurgia de hemorroida em Curitiba” é o título, o H1, a cidade no corpo de forma explícita, convênio/particular/reembolso, e recuperação em faixa com ressalva. A estratégia já publicada em `docs/seo-strategy-implementation.md` entrega o cluster de hemorroidas a esta URL. Uma segunda URL para o mesmo serviço dividiria o que essa página já acumula.

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
- O piloto `go.mdxstudio.com.br` (`src/lib/whatsapp-tracking.ts`, `WHATSAPP_HOME_TRACKING_URL`) decora só o CTA do herói da home, e só com consentimento de cookie. Não há evento GA4 de clique em WhatsApp. `AnalyticsProvider` só carrega GA/GTM depois de `lgpd-cookie-consent = accepted`.

O que os PRs já fizeram, e o que este spec não repete:

- [PR #78](https://github.com/analuizamrocha/web/pull/78), merge em 2026-11-12. Ligou, no corpo de `/tratamentos/hemorroidas`, os artigos de ligadura, recuperação e laser, e a página `/tratamentos/cx-laser`. Quatro artigos passaram a apontar para `/tratamentos/hemorroidas` com link simples, sem parâmetro: `hemorroida-ou-prolapso-retal`, `laser-hemorroida-co2-ou-diodo`, `sangue-papel-higienico-sempre-hemorroida`, `sangue-nas-fezes-quando-procurar-coloproctologista`. O texto do WhatsApp continuou genérico, sem a condição. O piloto de rastreamento continuou só no herói. A frase “opção mais moderna” em sangue nas fezes ficou para revisão clínica e não foi reescrita.
- [PR #79](https://github.com/analuizamrocha/web/pull/79), merge em 2026-11-12. Bloco “Tratamento relacionado” só quando a ficha do hub nomeia a mesma condição: `cisto-pilonidal-precisa-cirurgia` → `/tratamentos/cx-cisto-pilonidal` e `hpv-anal-vaporizacao-laser-co2` → `/tratamentos/hpv-anal`. Plicoma e fissura ficaram de fora de propósito. Nenhum CTA, número ou mensagem de WhatsApp mudou.

Identificação profissional: o rodapé (`src/components/ui/Footer.tsx`) e o header mostram `CRM-PR 45351 | RQE 36221` em todas as páginas. As páginas de tratamento não repetem o RQE no schema do procedimento.

SIBO: um post, `content/posts/disbiose-sibo-tratamento.md`. Meta description atual: “Disbiose intestinal e SIBO causam inchaço, gases e dor abdominal. Entenda as diferenças, diagnóstico e tratamentos eficazes com coloproctologista em Curitiba.” Nenhum outro markdown aponta para esse slug. `public/llms.txt` o lista. O sitemap o inclui porque inclui todo post. Menções soltas a “disbiose” existem em `por-que-meus-sintomas-nunca-melhoram.md` e `sindrome-intestino-irritavel-sintomas-diagnostico-tratamento.md`; não são links para o post de SIBO.

Convênio no site hoje, sem preço e sem lista de planos: FAQ “Como confirmar valores e convênios?” em `src/lib/patient-faqs.ts`, e “Os dois locais aceitam convênio?” em `/locais-de-atendimento` (“depende do plano e do tipo de atendimento”). A página `/design` tem uma resposta de rascunho (“a consulta é particular”) e não é superfície pública de SEO.

## 2. Objetivo e não-objetivos

### Objetivo

Fazer as páginas de serviço — não os artigos — serem a URL dona das consultas de intenção cirúrgica e particular em Curitiba: hemorroidectomia e cirurgia de hemorroida a laser, retirada de plicoma a laser, cisto pilonidal, fístula (incluindo FiLaC e fistulotomia), fissura (esfincterotomia e toxina botulínica) e HPV com laser de CO₂. O blog continua respondendo a pergunta informacional e aponta para essa página com âncora que descreve o destino.

A meta de negócio é consulta de quem procura cirurgia ou pagamento particular. Posição e clique em WhatsApp são sinais intermediários. Clique não é consulta marcada.

### Não-objetivos

- O post de SIBO permanece no ar, indexável, no sitemap e no `llms.txt`. Sem `noindex`, sem 301, sem canonical para outra URL, sem remoção.
- Não criar post, seção ou FAQ novo sobre SIBO, disbiose ou microbiota.
- Não acrescentar links internos para `/blog/disbiose-sibo-tratamento`. Os links que não existem continuam não existindo. Não varrer o site para apagar a palavra “disbiose” onde ela já explica outra condição.
- A única edição prevista nesse post é suavizar a meta description que diz “tratamentos eficazes”. O corpo e a FAQ “SIBO tem cura?” ficam como estão nesta leva, salvo se uma leitura CFM posterior apontar a mesma promessa no corpo. A meta sugerida, ainda educativa e sem promessa de resultado: “Disbiose intestinal e SIBO podem causar inchaço, gases e dor abdominal. Veja as diferenças, como é o diagnóstico e quando procurar avaliação em Curitiba.” Confirmar o texto na implementação; não publicar outro adjetivo de resultado no lugar.
- Não prometer que a queda de impressões de SIBO, se acontecer, é efeito desta mudança. Deixar de linkar e de produzir conteúdo novo não desindexa o que já ranqueia.
- Não estimar volume, não fixar meta numérica de posição e não tratar autocomplete como demanda.
- Não publicar preço, lista de convênios, técnica que ela não realiza, nem prazo fixo de atestado ou de recuperação antes das respostas da seção 5.
- Não estender o piloto `go.mdxstudio.com.br` para além do herói. Os PRs #78 e #79 fecharam esse escopo.
- Não reescrever os links que o #78 e o #79 já colocaram, exceto a âncora “melhor forma de tratamento”, que usa palavra vedada pelo CFM.
- Fora do repositório, só listado: perfil Doctoralia com serviços cirúrgicos e Google Business Profile. Nenhuma tarefa de código cobre isso.

## 3. Tiers de palavra-chave

Cada linha diz a URL que deve ser a dona, a URL que hoje pode estar ranqueando, e o buraco. “Dona” segue a tabela de `docs/seo-strategy-implementation.md`: uma URL comercial por cluster. Artigo não compete com a página de serviço pela mesma consulta de “cirurgia de X em Curitiba”.

### Tier 1 — cirurgia, cidade, particular

Intenção de quem já nomeia o procedimento e, em geral, Curitiba, preço, convênio ou laser.

| Consulta (autocomplete ou relato) | URL dona proposta | O que existe | Buraco |
| --- | --- | --- | --- |
| cirurgia de hemorroida em Curitiba; cirurgia de hemorroida a laser Curitiba; hemorroidectomia a laser | `/tratamentos/hemorroidas` | Página e vários artigos. Diego viu o artigo `cirurgia-laser-hemorroida-quando-faz-sentido` em primeiro para a variante a laser | Título e H1 não dizem cirurgia nem Curitiba. O artigo pode estar ocupando a vaga da página de serviço |
| hemorroidectomia a laser preço; quanto custa uma cirurgia de hemorroida em Curitiba | a mesma página, seção de custo | Não há página de preço | Seção sem valor numérico, até ela autorizar faixa |
| hemorroidectomia a laser pós-operatório | a mesma página, com apoio dos artigos de recuperação e de fases da cicatrização | Artigos já linkam a página | Página fala de recuperação sem faixa e sem ressalva sistemática |
| hemorroidectomia THD; THD | a mesma página, seção que já existe | Seção “THD – Desarterialização Hemorroidária Transanal” | Só entra no título/H1 e no schema se ela confirmar que realiza THD |
| unimed cobre cirurgia de hemorroida a laser; convênio cobre laser | a mesma página, seção de convênio; artigo de Tier 3 só depois da resposta dela | FAQ genérica em `/perguntas-frequentes` e em locais | Não afirmar cobertura da Unimed nem de outro plano |
| quantos dias de atestado cirurgia hemorroida | artigo novo de Tier 3, apontando para a página de hemorroidas | Não há post | Não publicar número de dias antes da resposta dela |
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

Artigos novos, só se a pergunta ainda não tem dono e a seção 5 não bloquear o fato:

1. Dias de atestado depois da cirurgia de hemorroida.
2. Hemorroida grau 4 precisa de cirurgia. O artigo de grau 3 e o artigo “sempre precisa de cirurgia” não respondem grau 4 como pergunta principal. A página de hemorroidas já diz que grau IV volumoso costuma ir para cirurgia; o artigo não pode contradizer isso nem transformar a frase em indicação universal.
3. Recuperação da retirada de plicoma a laser. O post `plicoma-anal-cirurgia-laser` já tem “recuperação” no título. Antes de abrir URL nova, ver no Search Console se esse slug já recebe a consulta. Se receber, ampliar esse artigo e linkar a página de plicoma. URL nova só se a consulta de recuperação ficar com outro slug ou com ninguém.
4. Convênio cobre cirurgia a laser. Sem lista de planos e sem preço. Depende da resposta sobre convênios. Se a resposta for “não publicamos convênio”, este artigo não sai; a seção da página de serviço basta.

Nenhum desses quatro existe em `content/posts/` hoje.

## 4. Mudanças propostas, em ordem

Nada desta seção é texto pronto para publicar. Frases clínicas saem do que ela confirmar ou do que os artigos já dizem, reescritas no tom de `docs/cfm-compliance-guidelines.md`. Onde a copy atual promete “menos dor”, “recuperação rápida” ou “melhor”, a implementação não copia essa frase para título, H1, meta ou FAQ nova. Exemplos já no ar, para não espalhar:

- meta de `/tratamentos/cx-laser`: “recuperação rápida e menos dor”;
- hemorroidoplastia em `/tratamentos/hemorroidas`: “menos dor e recuperação rápida”;
- título do artigo de ligadura: “qual é o melhor tratamento”;
- âncora em `hemorroida-sempre-precisa-cirurgia`: “melhor forma de tratamento”;
- `sangue-nas-fezes-quando-procurar-coloproctologista`: “opção mais moderna”, já deixada em aberto pelo PR #78. Não entra nesta leva, a menos que o parágrafo seja editado por outro motivo.

### 4.a Cirurgia de hemorroida em Curitiba — reescrever a página que já existe

Manter a URL `/tratamentos/hemorroidas`. Não criar `/tratamentos/cirurgia-de-hemorroida` nem variante com “curitiba” no slug. A estratégia vigente já nomeia esta URL como dona do cluster, o sitemap e os artigos já apontam para ela, e uma página paralela passaria a disputar as mesmas consultas.

Título e H1 propostos, sujeitos ao limite do template: título `Cirurgia de hemorroida em Curitiba`; H1 igual ou “Cirurgia de hemorroida em Curitiba: quando é indicada”. A meta descreve técnicas sem prometer dor menor nem prazo. “Curitiba” aparece no primeiro parágrafo, junto com o atendimento na Clínica Nassif, Batel, sem dizer que a cirurgia ocorre dentro da clínica. A página de locais já informa que cirurgia é organizada em hospitais parceiros.

O corpo continua com o que a página já separa, na ordem de decisão do paciente, e só nomeia técnica que ela confirmar:

- ligadura elástica, como alternativa ambulatorial, não como cirurgia;
- escleroterapia, se ela ainda a oferece;
- hemorroidectomia convencional;
- hemorroidectomia a laser e hemorroidoplastia a laser (LHP), como técnicas diferentes, não como sinônimos;
- THD, só se ela realiza;
- PPH, LigaSure, laser de CO₂ e laser de diodo só se ela realiza. O artigo `laser-hemorroida-co2-ou-diodo` já discute CO₂ e diodo; a página não afirma um aparelho que ela não usa.

Recuperação entra como faixa (“em muitos casos, atividades leves em alguns dias; esforço e trabalho dependem da técnica e da cicatrização”), com a frase de que o prazo individual sai na consulta. Sem número de dias de atestado nesta página até a resposta dela. O detalhe longo continua nos artigos `recuperacao-cirurgia-hemorroida-quanto-tempo` e `fases-cicatrizacao-cirurgia-hemorroida`, que já linkam para cá.

Seção de particular, convênio e reembolso: ver 4.e. Sem preço.

Links a partir dos onze posts com “hemorroidectomia”:

- Nos oito que já apontam para a página, não acrescentar segundo link. Trocar só a âncora “melhor forma de tratamento” por uma âncora descritiva, por exemplo “tratamento de hemorroidas”.
- Em `laser-co2-diodo-eletrocauterio-diferenca`, no parágrafo da hemorroidectomia e da hemorroidoplastia, acrescentar uma âncora descritiva para `/tratamentos/hemorroidas`. O link existente para `/tratamentos/cx-laser` fica.
- Em `dor-anal-relacao-sexual`, não forçar link de serviço. A frase compara portes de cirurgia dentro de outro assunto. Ligar aqui sugeriria que dor na relação se resolve com hemorroidectomia.

Card do hub em `TREATMENTS`: o título pode passar a “Cirurgia de hemorroida”, e a descrição precisa mencionar cirurgia além de ligadura, senão o bloco do PR #79 continua apresentando a página como só ambulatorial. Sem “melhor” e sem promessa de recuperação.

### 4.b Página nova: retirada de plicoma a laser em Curitiba

Slug proposto: `/tratamentos/plicoma`. Título e H1: `Retirada de plicoma a laser em Curitiba`. Se o título com o sufixo do layout estourar no resultado, encurtar o título para `Plicoma a laser em Curitiba` e deixar a forma longa no H1.

Conteúdo, depois da confirmação clínica: o que é plicoma (sobra de pele, não hemorroida interna), quando a retirada é uma escolha e quando não é, o que o laser muda e o que não muda, recuperação em faixa com ressalva, particular/convênio/reembolso sem preço. Não dizer que todo plicoma deve sair. Os artigos `plicoma-anal-vale-a-pena-retirar` e `plicoma-anal-por-que-aparece` já carregam esse cuidado; a página não os contradiz.

Registrar a página em:

- `src/app/tratamentos/plicoma/page.tsx`, no mesmo padrão das páginas atuais (metadata, FAQ visível igual ao schema, breadcrumb, `TreatmentHeroImage`, `CallToActionCard`);
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

A ficha em `treatments.ts` deixa de dizer só “hemorroidas e fissuras”. Descrição de hub: organiza as cirurgias a laser e leva à página de cada condição. O schema `MedicalProcedure` desta URL deixa de afirmar que o laser trata apenas hemorroida e fissura, ou passa a listar só condições que ela confirma operar com laser.

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

FAQ visível em cada página de serviço cirúrgico, repetida no `FAQPage` schema com o mesmo texto:

- como é a anestesia neste tipo de procedimento, em linguagem de possibilidades (local, raqui, geral), sem fixar uma só;
- o que muda na recuperação, em faixa, com a ressalva de que o caso pessoal é outro;
- afastamento do trabalho e atestado, sem número de dias até ela confirmar; a resposta pode ser “o prazo é definido na consulta, porque depende da técnica e da atividade”.

As FAQs atuais de hemorroidas (toda hemorroida opera? ligadura dói? convencional versus laser? recidiva?) permanecem. Não apagar pergunta que já pode estar ranqueando. Acrescentar.

### 4.e Custo, particular, convênio e reembolso, sem preço

Bloco único, reutilizado nas páginas de serviço do Tier 1, com o mesmo sentido e exemplos locais se precisar. Conteúdo máximo enquanto a seção 5 estiver aberta:

- a avaliação é individual; o texto não informa valor de cirurgia, de laser nem de consulta;
- existe atendimento particular;
- convênio, autorização e reembolso dependem do plano e do procedimento; a equipe confirma antes do agendamento;
- não nomear Unimed nem outro plano como coberto ou não coberto;
- não usar “a partir de”, tabela, parcelamento ou comparação com “o preço de mercado”.

A FAQ geral `convenios` em `patient-faqs.ts` e a de `/locais-de-atendimento` já dizem isso. As páginas de serviço apontam para `/perguntas-frequentes` em vez de inventar uma política diferente. Se ela depois autorizar uma frase mais específica (“a consulta na Nassif é particular; a cirurgia segue a regra do hospital”), essa frase substitui o bloco, num PR separado, com a frase dela por escrito.

O `priceRange: '$$'` do schema global não é preço de cirurgia. Esta leva não mexe nele e não acrescenta `Offer`.

### 4.f WhatsApp por página e evento de analytics

Número dos CTAs de página de serviço: `https://wa.me/554130739732`, o mesmo `WPP_NUMBER_SECRETARY`. Não trocar esses CTAs para o `(41) 98864-5800` da Nassif, a menos que ela diga que o número canônico da cirurgia é o da clínica. Os dois números continuam documentados na seção 5.

Escopo: só o `CallToActionCard` das páginas de serviço cirúrgicas (hemorroidas, plicoma, hub de laser, cisto, fístula, HPV, fissura, toxina). Header, herói, listagem do blog e o CTA no fim do artigo permanecem com o texto genérico que o PR #78 e o PR #79 preservaram. Não reabrir esses PRs.

Texto pré-preenchido, montado no servidor a partir de um rótulo fixo por slug, no mesmo padrão de `buildWhatsAppHref`. O rótulo é o assunto da página, escolhido por quem clicou, não um sintoma digitado. Exemplo de formato, não de copy final: “Olá! Gostaria de agendar uma consulta sobre cirurgia de hemorroida com a Dra. Ana Luiza Rocha.” Sem nome do paciente, sem queixa, sem grau da doença, sem convênio.

O link continua `wa.me` direto, sem `go.mdxstudio.com.br` e sem UTM no href. O piloto do herói fica onde está.

Evento: hoje não existe `gtag`/`dataLayer` no clique. Proposta, só depois do consentimento que `AnalyticsProvider` já exige:

- nome estável, por exemplo `whatsapp_click`;
- um parâmetro, `page_topic`, com o slug da página (`hemorroidas`, `plicoma`, `cx-laser`, e os demais slugs de serviço);
- nenhum outro parâmetro: sem texto da mensagem, sem telefone, sem `utm`, sem queixa, sem título livre.

Sem consentimento o clique abre o WhatsApp e não dispara evento. O evento não passa por localStorage além do que o analytics já faz. Teste de unidade: o parâmetro só aceita o enum de slugs; o corpo da mensagem não entra no payload.

### 4.g Fissura anal e esfincterotomia

Preferência: página nova `/tratamentos/fissura-anal`, título `Fissura anal em Curitiba`, H1 no mesmo sentido. A página explica fissura aguda e crônica, cuidado intestinal, toxina botulínica como uma opção (link para `/tratamentos/toxina-botulinica`) e esfincterotomia lateral interna como outra, só se ela realizar a cirurgia. Recuperação, anestesia, afastamento e custo seguem 4.d e 4.e.

Por que não só ampliar `/tratamentos/toxina-botulinica`: o H1 e o schema são a injeção. Esfincterotomia é outro procedimento, com outro risco (continência), já descrito com cautela nos artigos. Colocar a cirurgia dentro da página de botox faz a URL de botox disputar “esfincterotomia” e repete o problema que o PR #79 evitou ao não ligar “pode cicatrizar sozinha” ao card de toxina.

Ampliar a página de toxina fica como alternativa se ela não quiser URL nova ou se não realizar esfincterotomia. Nesse caso a página ganha um parágrafo “quando a cirurgia é conversada”, linka o artigo `fissura-anal-quando-cirurgia-indicada`, e não muda o H1 para “cirurgia de fissura”. O card de tratamento relacionado da fissura que cicatriza sozinha continua desligado até existir página de fissura cujo texto não apresente botox como único caminho.

Artigos a linkar para a página de fissura, com âncora descritiva: os quatro slugs de fissura. `dissinergia-evacuatoria-toxina-botulinica` continua na página de toxina; dissinergia não é fissura.

### 4.h Artigos novos de Tier 3

Os quatro candidatos estão na tabela do Tier 3, com a trava de sobreposição e a trava clínica. Contrato de post: `AGENTS.md` e `docs/blog-content-playbook.md` (frontmatter completo, linha em itálico para o card, FAQ, assinatura com CRM-PR 45351 e RQE 36221, disclaimer educativo, imagem com dimensão real em `src/lib/mdx-image-dimensions.ts`, slug em `public/llms.txt`). Cada artigo linka a página de serviço dona no corpo. Nenhum linka SIBO.

Ordem sugerida, depois das páginas donas existirem: atestado de hemorroida, grau 4, convênio/laser se ela autorizar o tema, recuperação de plicoma só se o artigo atual não for a URL que já ranqueia.

### 4.i Schema nas páginas de serviço

Manter `MedicalProcedure`, `FAQPage` e `BreadcrumbList`, que já são o padrão.

Acrescentar, em cada página de serviço do Tier 1, referência ao que o grafo global já publica, em vez de um segundo consultório com outro endereço:

- `performer` aponta para `https://www.analuizarocha.com.br/#physician` (lá estão CRM e RQE). O bloco local que só repete o CRM pode sair quando essa referência entrar.
- `availableAtOrFrom` ou `location` como `MedicalClinic` da Clínica Nassif, com `addressLocality: Curitiba`, bairro Batel no endereço já usado em `CLINICA_NASSIF`, e `@id` estável se o grafo global passar a ter um. Fatos só de `src/lib/constants.ts` e `src/lib/locations.ts`.
- `areaServed`: Curitiba, Paraná.
- Não marcar a Nassif como o hospital onde a cirurgia acontece. A página de locais diz que cirurgia é em hospital parceiro. Sem nome de hospital até ela informar um nome publicável.
- Sem `Review`, sem `AggregateRating`, sem `Offer`, sem `price`.
- O texto do FAQ schema é o texto visível, como `generateFAQSchema` já exige.

`public/llms.txt` ganha uma linha por página nova e atualiza a descrição das páginas cujo H1 mudou. O teste de descoberta e o e2e que percorre o sitemap passam a incluir a URL nova.

### 4.j Fora do repositório

Só registro, sem tarefa neste projeto:

- Doctoralia: serviços cirúrgicos com cidade, alinhados às páginas acima, sem preço que o site não tenha, sem “melhor” e sem antes-e-depois.
- Google Business Profile da prática em Curitiba/Batel, com as mesmas categorias de serviço e o mesmo número canônico, quando ela o escolher.

Quem fizer isso confere se o nome, o CRM e o endereço batem com o site. Divergência de telefone entre ficha e site é o problema da seção 5.

## 5. Perguntas para a Dra. Ana Luiza

Enquanto estas respostas não estiverem por escrito, a implementação correspondente não entra. Dá para publicar o ajuste da meta de SIBO e a exportação de Search Console sem elas. Não dá para publicar técnica, prazo, convênio, preço nem número de WhatsApp diferente do atual.

1. Quais técnicas ela realiza de fato, para hemorroida: hemorroidectomia convencional, hemorroidectomia a laser, hemorroidoplastia a laser / LHP, THD, PPH, LigaSure, laser de CO₂, laser de diodo. A página só lista as que ela faz. As outras podem existir num artigo educativo como técnicas da especialidade, com a frase de que a indicação e a disponibilidade são discutidas na consulta, sem atribuir o procedimento a ela.
2. Ela opera prolapso retal? O artigo `hemorroida-ou-prolapso-retal` existe e hoje leva a `/tratamentos/hemorroidas` quando o exame mostra hemorroida. Sem um “sim”, não criar página de prolapso e não colocar prolapso no H1 de hemorroidas.
3. Quais convênios, se algum, ela atende na consulta e na cirurgia, e se reembolso é caminho que a equipe orienta. Sem essa lista, o site não cita Unimed nem qualquer outro nome. A frase atual (“a equipe confirma cobertura e valores”) permanece.
4. Publicar faixa de preço de algum procedimento? O padrão deste spec é não publicar. Faixa só com números que ela entregar, na página do procedimento, com a data e a ressalva de que o valor varia. Sem faixa, a seção de custo fica qualitativa.
5. Qual WhatsApp é o canônico do agendamento de cirurgia. O site usa os dois, com papéis diferentes: `554130739732` (`(41) 3073-9732`) em todo CTA de consulta, e `5541988645800` (`(41) 98864-5800`) no bloco e na página da Clínica Nassif. Este spec mantém os CTAs de serviço em `554130739732`. Mudar o número é outro PR, em todos os CTAs que ela indicar, com teste do `wa.me` atualizado (`tests/e2e/marketing-tracking.spec.ts` e `tests/e2e/agent-readiness.spec.ts` fixam `554130739732`).
6. Ela realiza esfincterotomia lateral interna? Se não, a página de fissura explica a técnica como opção da especialidade e não como serviço oferecido. Se sim, a página nova é a dona dessa consulta.
7. Afastamento e atestado: ela aceita publicar faixas (por exemplo, por tipo de cirurgia) ou só a frase de que o prazo é individual? Sem faixa, os artigos de atestado e as FAQs não trazem número.
8. Laser em plicoma, cisto pilonidal, FiLaC e HPV com CO₂: confirmar que o hub pode linkar cada um como serviço que ela oferece, não apenas como tema de artigo.

## 6. Regras de CFM

Base: Resolução CFM nº 2.336/2023, vigente desde 11 de março de 2024, e `docs/cfm-compliance-guidelines.md`. Vale para página de serviço, FAQ, meta, âncora, schema, mensagem de WhatsApp e artigo novo.

- Tom educativo e sóbrio. Sem “melhor”, “referência”, “exclusivo”, “único”, “revolucionário”, “sem dor”, “indolor”, “garantido”, “cura”.
- Sem antes-e-depois, sem foto de paciente, sem caso identificável.
- Sem prazo fechado de recuperação, de retorno ao trabalho ou de atestado. Faixa só com ressalva e com o número que ela confirmou. “Recuperação rápida” e “menos dor”, já usados na página de laser, não entram em título, H1 ou meta novos. Quando uma dessas páginas for editada, a frase antiga sai se o parágrafo estiver sendo reescrito; não se faz uma caça global fora do escopo do PR.
- Sem preço, parcela ou “a partir de” até a resposta 4 da seção 5. Transparência de honorário é permitida pelo CFM quando é informação objetiva; o bloqueio aqui é falta de confirmação, não uma proibição absoluta.
- Sem superioridade em relação a outro médico ou a outra técnica apresentada como sempre melhor. Ligadura, convencional, laser e THD aparecem como opções com indicação diferente.
- CRM e RQE visíveis. O rodapé já cumpre isso no site inteiro. Schema de procedimento deve carregar os dois, via `#physician`, e o nome “Dra. Ana Luiza Moraes Rocha”.
- Artigo novo fecha com o bloco de identificação e o disclaimer educativo já padronizados em `AGENTS.md`.
- Não inventar conduta, taxa de sucesso, nome de aparelho ou convênio. Se o dado não está no repositório nem na resposta dela, a frase não entra.
- WhatsApp e analytics não carregam dado de saúde do paciente. O rótulo da página é assunto do serviço, não diagnóstico de quem clicou.
- Depoimento e avaliação não entram neste trabalho.

## 7. Medição

Fonte de posição e de consulta: exportação do Google Search Console, consultas e páginas, 3 a 6 meses, Brasil, web. Uma exportação antes da primeira página publicada serve de base; outra depois de 28 dias (atraso usual do relatório) e de novo ao fim da janela.

O que a exportação precisa responder:

- posição real, impressões e cliques das consultas do Tier 1, não a posição da ferramenta externa;
- qual URL ranqueia para cada termo (artigo versus `/tratamentos/...`);
- se consultas com “anal” têm impressão no Search Console mesmo quando o autocomplete não as mostra;
- a parte de SIBO e disbiose no total de impressões e cliques do site, para saber se o problema descrito (muito SIBO, pouca cirurgia) aparece nos dados. O post permanece indexado; a meta suavizada pode mudar o snippet, e isso se observa à parte, sem atribuir queda ou alta só a essa frase;
- consultas em posição 5–15 com muitas impressões, nas páginas de serviço e nos artigos que as apoiam. Esse grupo vem antes de artigo novo.

GA4, depois do evento da seção 4.f e só entre sessões com consentimento: cliques em WhatsApp por `page_topic`. Comparar 4 a 8 semanas, como o PR #79 já sugeriu para links internos. Limites explícitos:

- o evento não existe para quem recusou ou ignorou o cookie; o número subconta o clique real;
- clique não é conversa, não é consulta marcada e não é cirurgia;
- não há como o site saber se a mensagem foi enviada.

Não criar meta de “X consultas a mais”. O relatório seguinte diz o que mudou em impressão, posição, URL dona e clique no botão, e para por aí.

## 8. Fases e critério de aceite

Cada fase é um PR de implementação futuro. Este documento não autoriza merge nem deploy. Fase seguinte só começa se a anterior estiver em `main` e se a pergunta clínica que ela depende estiver respondida.

### Fase 0 — este spec

Aceite: um arquivo, `docs/specs/seo-paginas-cirurgicas.md`, PR em rascunho, sem outro diff.

### Fase 1 — meta de SIBO e linha de base

Sem depender da seção 5.

Aceite:

- a meta de `disbiose-sibo-tratamento` não contém “tratamentos eficazes” nem outro verbo de resultado (“cura”, “resolve”, “garantido”);
- slug, canonical, indexação, sitemap e linha do `llms.txt` iguais;
- nenhum `noindex`, nenhum redirect;
- nenhum link novo para esse post;
- exportação do Search Console guardada fora do repositório (não commitar dado de consulta se contiver informação que o time não queira no git; o PR de código não precisa do CSV).

### Fase 2 — hemorroidas

Depende das respostas 1, 3, 4 e 7.

Aceite:

- URL `/tratamentos/hemorroidas` inalterada, sem segunda página de cirurgia de hemorroida;
- título e H1 com cirurgia e Curitiba; meta sem promessa;
- técnicas limitadas à lista que ela confirmou; ligadura continua como alternativa;
- recuperação em faixa com ressalva, ou sem número, conforme a resposta 7;
- seção 4.e sem preço e sem nome de convênio, salvo texto que ela tenha escrito;
- os oito posts que já linkam não ganham link duplicado; a âncora “melhor forma de tratamento” sai; `laser-co2-diodo-eletrocauterio-diferenca` ganha âncora para esta página; `dor-anal-relacao-sexual` não ganha;
- FAQ nova de anestesia, recuperação e afastamento visível e no schema, textos idênticos;
- schema com Curitiba/Batel via Nassif e performer no `#physician`;
- `bun run test:run` e o teste de caminho de consulta de hemorroidas continuam verdes; o href do WhatsApp desta fase ainda pode ser o genérico (o texto contextual é a fase 6).

### Fase 3 — plicoma

Depende das respostas 3, 4, 7 e 8.

Aceite:

- `/tratamentos/plicoma` entra no hub, na imagem, no sitemap, em `markdown-page-paths` e no `llms.txt`;
- os três posts `plicoma-anal-*` e `hemorroida-ou-plicoma-diferenca` linkam a página com âncora descritiva;
- `bolinha-no-anus-causas-avaliacao` não aponta para a página;
- build gera a rota; o e2e que resolve URLs do sitemap inclui a nova;
- mesmos limites de CFM, preço e schema da fase 2.

### Fase 4 — hub de laser

Depende da fase 3 e da resposta 8. Se a página de fissura ainda não existir, o item fissura do hub fica de fora em vez de apontar para botox.

Aceite:

- cada condição confirmada é um link para a página dona, não um bullet sem href;
- a ficha `TREATMENTS` de `cx-laser` descreve o hub e não só hemorroida e fissura;
- schema da página não afirma um conjunto menor nem maior do que os links;
- nenhum artigo de hemorroida perde o link que o #78 colocou.

### Fase 5 — fissura

Depende da resposta 6.

Aceite se a página nova for o caminho: slug `/tratamentos/fissura-anal` registrado nos mesmos pontos da plicoma; esfincterotomia só como serviço oferecido se ela confirmou; toxina continua em `/tratamentos/toxina-botulinica` com link cruzado; os quatro artigos de fissura apontam para a página nova; `fissura-anal-pode-cicatrizar-sozinha` não usa o card de botox.

Aceite se a alternativa for ampliar a página de toxina: H1 não vira “cirurgia de fissura”; esfincterotomia não é listada como procedimento realizado sem o “sim”; o card do #79 para o artigo da fissura que cicatriza sozinha continua ausente.

### Fase 6 — títulos das outras páginas cirúrgicas, FAQ e WhatsApp

Pode andar em paralelo com a fase 5 para cisto, fístula e HPV, que não dependem da esfincterotomia.

Aceite:

- títulos e H1 da tabela 4.d, slugs intactos;
- FAQ de anestesia, recuperação e afastamento nessas páginas;
- bloco 4.e sem preço;
- CTA dessas páginas, mais hemorroidas, plicoma e laser, usa `wa.me/554130739732` com rótulo fixo do slug;
- header, herói e CTA de artigo seguem com o texto genérico;
- evento `whatsapp_click` só com `page_topic` do enum, só com consentimento;
- testes que fixam o número `554130739732` continuam válidos; teste novo garante que o payload não contém o texto da mensagem.

### Fase 7 — artigos de Tier 3

Depende das páginas donas e das respostas 3 e 7. O artigo de convênio também depende da resposta 3 não ser “não publicar o tema”. O de recuperação de plicoma depende da checagem de URL no Search Console.

Aceite: um post por PR ou um lote pequeno no padrão do playbook; `llms.txt` e sitemap atualizados pelo fluxo já testado; link para a página dona; sem link para SIBO; sem preço; sem dia fixo de atestado se a resposta 7 não trouxe faixa; `bun run test:run -- tests/content-discovery.test.ts tests/mdx-image-dimensions.test.ts tests/seo-metadata.test.ts`, lint e build, como no checklist de `AGENTS.md`.

### Fase 8 — fora do site

Não tem critério de aceite no repositório. Doctoralia e Google Business Profile usam os mesmos serviços, o mesmo endereço e o número que ela tiver escolhido na pergunta 5.

## 9. O que uma implementação não deve fazer

- Abrir página duplicada de hemorroida “porque o slug antigo não tem a palavra cirurgia”.
- Copiar preço, prazo ou convênio de site de terceiro.
- Tratar posição de ferramenta não-Google como fato no texto publicado.
- Medir sucesso por clique no WhatsApp.
- Incluir dado de saúde no analytics ou na mensagem pré-preenchida além do rótulo fixo da página.
- Desindexar ou redirecionar o post de SIBO.
- Marcar este desenho como pronto para revisão clínica. As perguntas da seção 5 são o próximo passo, e são dela.
