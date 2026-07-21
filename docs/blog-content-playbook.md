# Blog Content Playbook

Operational guide for creating and maintaining blog posts in this project.

## Where Content Lives

- Posts directory: `content/posts`
- Listing page: `src/app/blog/page.tsx`
- Post page route: `src/app/blog/[slug]/page.tsx`
- Content parser + excerpt logic: `src/lib/blog.ts`
- Post images: `public/images/posts/<slug>`
- Markdown image renderer: `src/components/ui/MdxImage.tsx`
- Intrinsic image dimensions: `src/lib/mdx-image-dimensions.ts`
- Machine-readable post inventory: `public/llms.txt`

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
relatedPosts:
  - 'related-post-slug'
---
```

`relatedPosts` is optional. When present, use existing post slugs only and keep the
selection tightly related to the reader's next question.

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

## Image Workflow

The first Markdown image in a post is also used as its `/blog` card image. Keep all
post-specific assets under the post slug and reference them from the site root:

```md
![Descrição objetiva e acessível da imagem](/images/posts/post-slug/image-name.webp)
```

For every new or replaced image:

1. Prefer WebP unless transparency or another requirement justifies PNG.
2. Use a descriptive lowercase filename with hyphens.
3. Write useful alt text that describes the image; do not stuff keywords.
4. Inspect the asset's real `width` and `height`. If they differ from the
   `1200x800` default, add them to `src/lib/mdx-image-dimensions.ts` using the exact
   Markdown path.
5. Run `tests/mdx-image-dimensions.test.ts`. It reads every local image referenced
   by a post, inspects the file with Sharp, and fails when the resolved dimensions do
   not match the asset.

`MdxImage` passes these intrinsic dimensions to `next/image` to reserve the correct
aspect ratio and prevent layout shifts. An image may use the `1200x800` fallback only
when those are its real intrinsic dimensions.

## SEO Discovery Files

New posts are added to the dynamic sitemap automatically. They must also be listed in
`public/llms.txt`, grouped with the most relevant topic cluster. The discovery test
requires the post slugs in Markdown, the sitemap, and `llms.txt` to stay aligned.

Before creating a new URL, check nearby posts for overlapping intent. Prefer updating,
differentiating, or consolidating an existing article when two URLs would answer the
same patient question. Informational posts should link naturally to the treatment or
location page that owns the corresponding consultation intent.

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
4. Add optimized images and register any non-default dimensions.
5. Add the post to `public/llms.txt`.
6. Add signature/disclaimer footer.
7. Run CFM compliance pass.
8. Run focused content tests, lint, and build.
9. Review the `/blog` card image/subtitle and the rendered article.

## Validation Commands

```bash
# Search duplicates by topic
rg -n "keyword-or-topic" content/posts

# Validate post discovery, image dimensions, and social metadata
bun run test:run -- \
  tests/content-discovery.test.ts \
  tests/mdx-image-dimensions.test.ts \
  tests/seo-metadata.test.ts

# Repository checks
bun run lint
bun run build
```
