# Representações Markdown

As páginas de conteúdo oferecem HTML e Markdown no mesmo endereço canônico, em português brasileiro. O formato é escolhido pelo cabeçalho `Accept`.

## Manutenção

- As páginas continuam em `src/app`. Para ampliar a cobertura, registre o caminho em `src/lib/markdown-page-paths.ts` e seu loader em `src/lib/markdown-pages.ts`.
- `src/lib/page-markdown.ts` reutiliza o conteúdo das páginas síncronas de servidor. Componentes novos precisam de um adapter explícito; não duplique o texto médico.
- Artigos usam `content/posts/*.md`; detalhes dos locais usam `src/lib/locations.ts`. Atualize `public/llms.txt` ao publicar novos artigos, conforme o checklist do repositório.

## HTTP e indexação

- A negociação respeita pesos `q` e exclusões. HTML é o padrão para Accept ausente ou curinga; formatos incompatíveis recebem 406. URLs inexistentes retornam 404 em Markdown quando esse formato é preferido. HEAD conserva status e cabeçalhos, sem corpo.
- Respostas Markdown usam `Content-Type: text/markdown; charset=utf-8`, `Content-Language: pt-BR`, `Vary: Accept` e `Cache-Control: private, no-store`. Documentos válidos incluem `Link` canônico e URLs absolutas; exemplos em código e arquivos originais não são reescritos.
- O acesso direto a `/conteudo-markdown` retorna 404. Navegação RSC, prefetches, Server Actions, arquivos estáticos e arquivos de descoberta conservam seus protocolos.
- Privacidade, rotas de design, helper e recursos de preview social mantêm `noindex` e ficam fora do sitemap. Imagens sociais continuam acessíveis, e imagens dos artigos continuam indexáveis. Não bloqueie o rastreamento necessário para ler `noindex`.

## Patch do Next.js

O Next.js 16.2.10 sobrescreve o `Vary` das páginas HTML. O Bun aplica `patches/next@16.2.10.patch`, que preserva `Accept` junto aos cabeçalhos exigidos pelo framework, tanto no handler quanto no padrão do manifesto de rotas usado pelo Vercel para servir HTML pré-renderizado. Ao atualizar o Next.js, remova o patch somente depois de passar nas regressões HTTP e na verificação do manifesto de build.

## Verificação

```sh
bun install --frozen-lockfile
bun run test:run
bun run lint
bun run build
node --test tests/build/agent-vary.mjs
bunx tsc --noEmit
PLAYWRIGHT_PRODUCTION=true bun run e2e -- tests/e2e/smoke.spec.ts tests/e2e/agent-readiness.spec.ts
```

O Playwright inicia o servidor do build de produção; use `PLAYWRIGHT_BASE_URL` para testar um servidor já iniciado. Após publicar, confirme status, cabeçalhos e corpos no domínio com e sem `www`, alternando HTML e Markdown e incluindo uma URL inexistente. Repita a varredura somente após essa verificação no CDN.
