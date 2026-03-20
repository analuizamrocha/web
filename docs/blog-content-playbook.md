# Blog Content Playbook

Operational guide for creating and maintaining blog posts in this project.

## Where Content Lives

- Posts directory: `content/posts`
- Listing page: `src/app/blog/page.tsx`
- Post page route: `src/app/blog/[slug]/page.tsx`
- Content parser + excerpt logic: `src/lib/blog.ts`

## Metadata Schema (Frontmatter)

Use this exact structure:

```md
---
title: 'Post title'
metaDescription: 'SEO meta description'
slug: 'post-slug'
publishDate: '2026-02-24'
lastModified: '2026-02-24'
primaryKeyword: 'keyword principal'
secondaryKeywords:
  - 'keyword 1'
  - 'keyword 2'
  - 'keyword 3'
targetAudience: 'patients'
intent: 'awareness'
featured: false
order: 20
faqs:
  - question: 'Pergunta 1?'
    answer: 'Resposta 1.'
  - question: 'Pergunta 2?'
    answer: 'Resposta 2.'
---
```

## Card Subtitle System (Important)

Blog cards render subtitle from `excerpt` generated in `src/lib/blog.ts`.

How to control it:

1. Make the first body paragraph a single italic hook line.
2. Use `_texto_` or `*texto*`.
3. Put it immediately after frontmatter.
4. Do not place headings before the hook.

Example:

```md
_Com avaliação precoce e acompanhamento adequado, sintomas intestinais podem ser tratados com mais segurança e previsibilidade._
```

## Capitalization Rules

Use **sentence case** for titles and all headings (`##`, `###`):

- Capitalize only the first word and proper nouns (e.g., Curitiba, HPV, SII).
- Do **not** use Title Case (e.g., "Quando a Cirurgia Pode Ser Indicada").
- Correct: `Quando a cirurgia pode ser indicada`
- Correct: `Coceira no ânus: o que pode ser?`
- Incorrect: `Coceira no Ânus: O Que Pode Ser?`

This applies to: `title` in frontmatter, `##` headings, and `###` subheadings.

## Body Conventions

- Prefer `##` section headings.
- Keep medical language clear and patient-friendly.
- Use bullet lists for sintomas, sinais, indicações e condutas.
- Keep CTA in conclusion.
- Keep FAQ in frontmatter (`faqs`) for schema metadata.

## CFM Compliance Pass (Mandatory)

Before publishing, review content against:

- `docs/cfm-compliance-guidelines.md`

Practical checks:

- Educational and sober tone.
- No guaranteed outcomes or superiority claims.
- No sensationalist wording.
- No identifiable patient data, images, or case details.
- Footer keeps professional identification and disclaimer.

## Footer Block Pattern

Keep the same ending in all posts:

```md
---

**Dra. Ana Luiza Moraes Rocha**  
Médica Coloproctologista  
CRM-PR 45351 | RQE 36221  
Especialista em Coloproctologia

> _Este conteúdo tem caráter educativo e não substitui a consulta médica. Procure sempre orientação profissional para diagnóstico e tratamento adequados._
```

## Slug and Filename Rules

- Filename must match slug exactly: `content/posts/<slug>.md`.
- Use lowercase and hyphens.
- Avoid accents and punctuation in slug.

## Ordering Strategy

- `order` controls listing priority (ascending).
- For new posts, use `max(order) + 1` unless you intentionally reorder the feed.

## Authoring Workflow

1. Scan existing posts for overlap.
2. Create new file with valid frontmatter.
3. Add italic hook + body.
4. Add signature/disclaimer footer.
5. Run CFM compliance pass.
6. Run build.
7. Review `/blog` card subtitle and date rendering.

## Validation Commands

```bash
# list posts
ls -1 content/posts

# search duplicates by topic
rg -n "keyword-or-topic" content/posts

# full validation
bun run build
```
