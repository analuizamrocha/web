# AGENTS.md

Guidance for engineers and coding agents working in this repository.

## Project Scope

- Stack: Next.js App Router + TypeScript + Tailwind.
- Blog content source: `content/posts/*.md`.
- Blog parsing and card excerpt logic: `src/lib/blog.ts`.

## Branch Naming (Blog Work)

- Use `codex/YYYY-MM-DD-posts` for blog batches.
- Example: `codex/2026-02-24-posts`.

## Blog Content Contract

Every post file must be a markdown file in `content/posts` with full frontmatter.

Required frontmatter fields:

- `title`
- `metaDescription`
- `slug`
- `publishDate` (`YYYY-MM-DD`)
- `lastModified` (`YYYY-MM-DD`)
- `primaryKeyword`
- `secondaryKeywords` (array)
- `targetAudience` (`patients` | `referring-doctors` | `general-public`)
- `intent` (`awareness` | `consideration` | `decision`)
- `featured` (boolean)
- `order` (number, usually max existing + 1)
- `faqs` (array of `{ question, answer }`)

## CFM Compliance Baseline

Use [docs/cfm-compliance-guidelines.md](/Users/diegovfeder/workspace/jobs/analu-procto/docs/cfm-compliance-guidelines.md) as a mandatory review reference before publishing.

Minimum checks for each post:

- Keep educational focus and sober tone.
- Avoid sensationalism, guarantees, or superiority claims.
- Avoid fear-inducing phrasing and unverifiable claims.
- Keep professional identification block in post footer.
- Keep patient privacy protected (no identifiable cases/data).

## Card Subtitle Behavior

The subtitle on `/blog` cards is generated from `excerpt` in `src/lib/blog.ts`.

Rules:

- Excerpt source is the first non-heading paragraph in the markdown body.
- If this first paragraph is fully italic (`_..._` or `*...*`), the subtitle text is extracted from it.
- To control card subtitle reliably, always place a single italic hook line immediately after frontmatter.
- Keep the author signature and disclaimer at the end of the post.

## Body Structure Standard

Recommended pattern:

1. Italic hook line (subtitle source).
2. Intro context paragraphs.
3. `##` section headings and bullet lists.
4. Conclusion with CTA.
5. Signature block + educational disclaimer.

Signature/disclaimer pattern:

```md
---

**Dra. Ana Luiza Moraes Rocha**  
Médica Coloproctologista  
CRM-PR 45351 | RQE 36221  
Especialista em Coloproctologia

> _Este conteúdo tem caráter educativo e não substitui a consulta médica. Procure sempre orientação profissional para diagnóstico e tratamento adequados._
```

## Pre-publish Checklist

1. Confirm no near-duplicate post already exists.
2. Validate slug uniqueness in `content/posts`.
3. Validate metadata completeness and enum values.
4. Apply CFM compliance pass using `docs/cfm-compliance-guidelines.md`.
5. Run build (`bun run build` or `npm run build`).
6. Confirm blog card subtitle is the intended hook.
