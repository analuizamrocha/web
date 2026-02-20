# Contexto do Website - Dra. Ana Luiza M. Rocha

Última alteração (data explícita): **2026-02-14**
Workspace: `/Users/diegovfeder/workspace/jobs/analu-procto`
Branch atual: `df/revised-posts++`

## 1) Objetivo do projeto

Site institucional + aquisição orgânica (SEO) para coloproctologia, com dois eixos:

- **Conversão direta**: consulta via WhatsApp.
- **Educação + autoridade**: blog e páginas de tratamentos para captar busca orgânica.

## 2) Stack e arquitetura atual

- **Framework**: Next.js 15 (App Router), React 19, TypeScript.
- **Estilo**: Tailwind CSS v4 com tokens em `src/app/globals.css`.
- **Conteúdo editorial**: markdown em `content/posts/*.md`, carregado por `src/lib/blog.ts`.
- **SEO técnico**:
  - Metadata por rota.
  - JSON-LD para blog e tratamentos.
  - Sitemap dinâmico em `src/app/sitemap.ts`.

Principais entradas:

- Home: `src/app/page.tsx`
- Blog listagem: `src/app/blog/page.tsx`
- Blog detalhe: `src/app/blog/[slug]/page.tsx`
- Tratamentos index: `src/app/tratamentos/page.tsx`
- Tratamentos detalhe: `src/app/tratamentos/*/page.tsx`

## 3) Estrutura de rotas (estado real)

- `/` (landing com seções e cards)
- `/blog`
- `/blog/[slug]` (12 posts atualmente)
- `/tratamentos`
- `/tratamentos/cx-laser`
- `/tratamentos/hemorroidas`
- `/tratamentos/toxina-botulinica`
- `/tratamentos/cx-fistulas-anorretais`
- `/tratamentos/rastreio-cancer-anal`
- `/tratamentos/hpv-anal`
- `/tratamentos/cx-cisto-pilonidal`
- `/tratamentos/doencas-inflamatorias-intestinais`
- `/tratamentos/sindrome-intestino-irritavel`
- `/sobre`
- `/politica-privacidade`

## 4) Inventário de conteúdo (2026-02-14)

- **Posts no blog**: 12 (`content/posts`).
- **Páginas de tratamentos**: 9 detalhadas + 1 índice.
- **Imagens em `public/images/posts`**: 27 arquivos.
- **Imagens de blog**: 24 arquivos, organizados por slug/tema em `public/images/posts/<slug-ou-tema>/`.

Observação editorial:

- Já existe evolução com imagens dentro de posts (ex.: `disbiose-sibo-tratamento`, `diarreia-cronica-tratamento`, `alimentacao-e-saude-intestinal`).
- Ainda há oportunidades para padronizar cobertura visual no blog inteiro.

## 5) Estado dos cards da landing (ponto crítico do PR)

Objetivo declarado: cada card da landing deve levar para conteúdo profundo (blog ou tratamento), não apenas WhatsApp.

### 5.1 Cards de Serviços (`#servicos`)

| Serviço | Link atual | Conteúdo profundo já existe? | Status |
|---|---|---|---|
| Hemorroidas | `/blog/hemorroida-sempre-cirurgica-tratamento` | Sim (blog + tratamento) | OK |
| Fissura Anal | `/blog/fissura-anal-tratamento` | Sim (blog + tratamento) | OK |
| Fístula Anal | WhatsApp externo | Sim (`/tratamentos/cx-fistulas-anorretais`) | Ajustar link |
| Coceira Anal | `/blog/coceira-anal-quando-procurar-coloproctologista-curitiba` | Sim (blog) | OK |
| HPV Anal | WhatsApp externo | Sim (`/tratamentos/hpv-anal`) | Ajustar link |
| Cisto Pilonidal | `/blog/cisto-pilonidal-cirurgia-laser-quando-operar` | Sim (blog + tratamento) | OK |
| Constipação Intestinal | `/blog/constipacao-intestinal-cronica-causas-tratamento` | Sim (blog) | OK |
| Diarreia Crônica | `/blog/diarreia-cronica-tratamento` | Sim (blog) | OK |
| Síndrome do Intestino Irritável | WhatsApp externo | Sim (`/tratamentos/sindrome-intestino-irritavel`) | Ajustar link |
| Doenças Inflamatórias Intestinais | WhatsApp externo | Sim (`/tratamentos/doencas-inflamatorias-intestinais`) | Ajustar link |
| Saúde Sexual | WhatsApp externo | **Não** | Criar conteúdo profundo |
| Distúrbios do Assoalho Pélvico | WhatsApp externo | **Não** | Criar conteúdo profundo |

Resumo:

- Cobertura interna atual na UX dos cards de serviços: **6/12**.
- Cobertura possível imediata sem criar nova página: **10/12**.
- Gaps reais de conteúdo: **2/12** (Saúde Sexual, Assoalho Pélvico).

### 5.2 Cards de Tratamentos (`#tratamentos`)

- Todos os 9 cards já apontam para páginas internas de tratamento.
- Status: **9/9 OK**.

## 6) O que este PR já melhorou

Arquivos com melhoria clara:

- `src/components/ui/Card.tsx`
  - Card passou a aceitar `href`, `external` e `ctaLabel`.
  - Card pode funcionar como link interno (`Link`) ou externo (`a`).
- `src/components/sections/ServicesSection.tsx`
  - Cards de serviços agora têm destino clicável.
  - Parte já foi conectada para blog.
- `src/components/sections/TreatmentsSection.tsx`
  - Cards de tratamentos passaram a navegar para rotas detalhadas.

Conteúdo em progresso:

- Novo post: `content/posts/alimentacao-e-saude-intestinal.md` (não commitado ainda).
- Banco de imagens reorganizado por slug/tema em `public/images/posts/*/`.

## 7) Gaps técnicos e de SEO ainda abertos

1. **Cards de serviço ainda externos em 6 casos**
- Não atende totalmente o objetivo de navegação profunda por tema.

2. **Falta de ponte Tratamento -> Blog relacionado**
- Páginas de tratamento estão boas em profundidade, mas quase não conectam com artigos educativos.

3. **Inconsistência de `@id` schema em 2 páginas de tratamento**
- `src/app/tratamentos/hemorroidas/page.tsx` usa `.../tratamentos/tratamento-hemorroidas`.
- `src/app/tratamentos/hpv-anal/page.tsx` usa `.../tratamentos/tratamento-hpv-anal`.
- Rota canônica é sem prefixo `tratamento-`, então vale alinhar.

4. **Fonte de verdade duplicada**
- Lista de temas existe em múltiplos lugares (serviços, tratamentos, blog), facilitando divergência.

## 8) Próximos passos recomendados (prioridade)

### P0 (fechar objetivo principal deste PR)

1. Trocar 4 links de WhatsApp por páginas internas já existentes:
- Fístula Anal -> `/tratamentos/cx-fistulas-anorretais`
- HPV Anal -> `/tratamentos/hpv-anal`
- SII -> `/tratamentos/sindrome-intestino-irritavel`
- DII -> `/tratamentos/doencas-inflamatorias-intestinais`

2. Manter WhatsApp como CTA secundário dentro das páginas de destino.

### P1 (fechar cobertura 12/12)

1. Criar conteúdo profundo para:
- Saúde Sexual (ideal: post educativo + possível página de tratamento se fizer sentido clínico).
- Distúrbios do Assoalho Pélvico (ideal: post educativo inicial).

2. Ligar esses dois cards para os novos conteúdos.

### P1.5 (melhorar ligação entre hubs)

1. Adicionar bloco "Conteúdos relacionados" em páginas de tratamento (1-3 links de blog por tema).
2. Adicionar bloco "Tratamento relacionado" em posts com intenção de consideração/decisão.

### P2 (organização para escala)

1. Criar um mapa central em `src/lib/content-map.ts` com:
- `serviceCard -> { primaryRoute, secondaryCta }`
- `treatmentRoute -> relatedBlogSlugs`
- `blogSlug -> relatedTreatmentRoute`

2. Renderizar `ServicesSection`, `TreatmentsSection` e blocos relacionados a partir desse mapa.

## 9) Definição de pronto para esta linha de melhoria

- [ ] 12/12 cards de serviços com destino para conteúdo profundo interno.
- [ ] 9/9 cards de tratamentos com navegação interna.
- [ ] Saúde Sexual e Assoalho Pélvico com conteúdo profundo publicado.
- [ ] Schema `@id` alinhado com URLs canônicas.
- [ ] Sem links quebrados em home/blog/tratamentos.
- [ ] Build e lint passando.

## 10) Referências rápidas no código

- Home e seções: `src/app/page.tsx`
- Serviços (cards da landing): `src/components/sections/ServicesSection.tsx`
- Tratamentos (cards da landing): `src/components/sections/TreatmentsSection.tsx`
- Componente base de card: `src/components/ui/Card.tsx`
- Pipeline do blog: `src/lib/blog.ts`
- Sitemap: `src/app/sitemap.ts`
