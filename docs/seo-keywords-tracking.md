# SEO Keywords Tracking Guide
**Website:** https://www.analuizarocha.com.br/
**Last Updated:** 2026-03-10
**Purpose:** Mapa de keywords extraído do conteúdo atual do site para rastreamento contínuo.

## Source Of Truth
- `docs/seo-keywords-tracking.csv`
- Fontes incluídas no dataset:
- `content/posts/*.md`
- `src/app/blog/page.tsx`
- `src/app/tratamentos/page.tsx`
- `src/app/tratamentos/**/page.tsx`
- `src/app/layout.tsx`
- `src/app/sobre/page.tsx`
- `src/components/sections/AboutSection.tsx`
- `src/components/sections/ServicesSection.tsx`
- `src/components/sections/MissionSection.tsx`
- `src/components/sections/PhotoSection.tsx`
- `src/components/sections/TreatmentsSection.tsx`
- `src/components/sections/LocationsSection.tsx`
- Copy adicional da landing enviada pelo time

## Snapshot Atual
- 365 linhas de keyword + URL
- 328 keywords únicas
- Distribuição por prioridade:
- `P1`: 68
- `P2`: 118
- `P3`: 179
- Distribuição por tipo de conteúdo:
- `blog-post`: 228
- `blog-hub`: 8
- `treatment-page`: 62
- `treatment-hub`: 7
- `landing-page`: 40
- `doctor-profile`: 20

## Novos Grupos Adicionados
- `landing-page` com `target_url` `/`
- `doctor-profile` com `target_url` `/sobre`

## Quick Copy-Paste: Landing + Marca (P1)

```txt
consulta coloproctologista curitiba, agendar consulta coloproctologista curitiba, coloproctologista curitiba batel, proctologista curitiba batel, cirurgia colorretal curitiba, proctologia curitiba, consultório médico coloproctologia curitiba, clínica nassif batel curitiba, cirurgias a laser proctologia curitiba, ligadura elástica para hemorroidas curitiba, toxina botulínica para fissura anal curitiba, rastreio câncer de canal anal curitiba, tratamento de hpv curitiba, dra ana luiza moraes rocha coloproctologista curitiba, dra ana luiza moraes rocha proctologista curitiba, crm-pr 45351, rqe 36221
```

## Quick Copy-Paste: Doctor Profile Keywords

```txt
dra ana luiza moraes rocha, dra ana luiza m rocha, ana luiza moraes rocha, ana luiza rocha coloproctologista, proctologista dra ana luiza curitiba, médica coloproctologista curitiba, crm pr 45351, rqe 36221 coloproctologia, crm pr 45351 rqe 36221, puc-pr medicina, hospital santa casa de curitiba cirurgia geral, hospital universitário evangélico mackenzie coloproctologia, mestranda ufpr clínica cirúrgica, international anal neoplasia society, membro ians coloproctologia, fellow cirurgia colorretal barcelona, hospital clinic barcelona cirurgia colorretal, anuscopia de alta resolução curitiba
```

## Como Rastrear O Que Os Usuários Estão Trazendo (Queries Reais)
1. Abrir Google Search Console em `Performance > Search results`.
2. Aplicar filtro de página `Page: exactly https://www.analuizarocha.com.br/` para landing.
3. Aplicar filtro de página `Page: exactly https://www.analuizarocha.com.br/sobre` para perfil médico.
4. Ir na aba `Queries` e exportar últimos 28 dias e 3 meses.
5. Cruzar com `docs/seo-keywords-tracking.csv` usando `keyword` e `target_url`.
6. Priorizar queries com alta impressão e CTR baixo para otimização de título/meta.

## Segmentos Recomendados De Query (Regex)
- Marca médica: `ana luiza|dra ana|moraes rocha|crm|rqe`
- Local/intenção de consulta: `curitiba|batel|consulta|agendar|proctologista|coloproctologista`
- Condição/sintoma: `hemorroid|fissura|fístula|coceira|hpv|cisto|constipa|diarreia|intestino irritável|crohn|retocolite`

## Colunas Do CSV
- `keyword`: termo rastreado
- `cluster`: tema central
- `content_type`: `blog-post`, `blog-hub`, `treatment-page`, `treatment-hub`, `landing-page`, `doctor-profile`
- `source`: origem do termo
- `intent`: `awareness`, `consideration`, `decision`
- `audience`: público-alvo
- `target_url`: URL recomendada para ranquear
- `priority`: `P1`, `P2`, `P3`

## Observações
- Não é possível identificar query por usuário individual no GSC; os dados são agregados por consulta/página/período.
- O dataset foi expandido para incluir marca pessoal, credenciais profissionais e sinais da landing page.

## Automação
- Execução local/CI: `npm run seo:rank:pipeline`
- Runbook completo: `docs/seo-rank-tracking-automation.md`
- Histórico de snapshots para gráficos: `docs/serp-keywords-history.csv`
- Banco canônico para BI: Supabase (`seo_keywords`, `seo_runs`, `seo_rank_history`)
