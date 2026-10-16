# Preparação do site para agentes

O [relatório do Is Agentic](https://is-agentic.com/scan/www.analuizarocha.com.br), de 15/10/2026 às 00:35 UTC (14/10 em Curitiba), registrou 77/100 em produção. Esta alteração trata as lacunas de acesso e descoberta apontadas. Uma nova pontuação depende de publicação e nova varredura.

## Idioma e endereços canônicos

O site é em português brasileiro. As páginas de confiança são `/sobre`, `/contato` e `/politica-privacidade`. Não são necessárias cópias dessas páginas em endereços ingleses para disponibilizar as informações aos agentes. A política conserva seu `noindex` e endereço canônico original. Como os aliases ingleses desta PR ainda não foram publicados, foram removidos sem adicionar redirecionamentos.

O `llms.txt` usa português brasileiro, inclusive na seção “Quando usar este site”. O formato não exige inglês; os nomes padronizados de arquivos, cabeçalhos HTTP e tipos de mídia permanecem inalterados. Se o scanner procurar literalmente `/about`, `/contact`, `/privacy` ou títulos ingleses, poderá deixar de reconhecer os equivalentes locais. A avaliação após a publicação deve distinguir essa limitação do scanner da disponibilidade real das informações; não se promete uma pontuação específica.

## Comportamento público

| Requisição | Resultado |
| --- | --- |
| `GET /`, `Accept: text/markdown` | 200, resumo em português, `Content-Type: text/markdown; charset=utf-8`, `Content-Language: pt-BR`, `Vary: Accept` |
| `GET /`, HTML, curinga ou sem Accept | Página visual existente; Vary conserva Accept e os cabeçalhos de navegação do Next.js |
| `GET /`, somente formatos não disponíveis | 406, com os formatos disponíveis informados |
| Página inexistente, Markdown preferido | 404 em Markdown com links para início, llms.txt e sitemap |
| Artigo ou local inexistente, Markdown preferido | Mesmo 404 recuperável em Markdown |
| Artigo publicado, Markdown preferido | Título, datas, fonte canônica e corpo original; lê somente o arquivo solicitado após validar o slug publicado |
| Local de atendimento, Markdown preferido | Resumo e contatos derivados dos dados existentes, com link para os detalhes completos |
| `HEAD` em recursos negociados | Mesmo status e cabeçalhos, sem corpo |
| `/sobre` | Página existente com formação, registros profissionais e trajetória |
| `/contato` | Página com os contatos publicados, locais e orientações de agendamento |
| `/politica-privacidade` | Política existente, com seu canônico e noindex preservados |
| `/llms.txt` | Listas de links e orientações específicas sobre quando e como consultar o site |
| `/sitemap.xml` | Endereços canônicos existentes mais `/contato`; sem aliases ou rotas auxiliares de Markdown |

Requisições RSC, ações de servidor, arquivos estáticos, robots.txt, sitemap.xml e llms.txt conservam seus protocolos. As demais páginas existentes continuam servindo HTML. Respostas Markdown usam `private, no-store` para não preencher entradas de cache destinadas ao HTML. A variante negociada de uma página canônica não recebe `noindex`; esse cabeçalho fica restrito às páginas inexistentes e ao acesso direto à rota auxiliar `/conteudo-markdown`.

O JSON-LD de MedicalOrganization conserva o PostalAddress e inclui ContactPoint com telefone de agendamento, e-mail público, idioma e link para `/contato`. A página e as orientações reutilizam as informações profissionais e de contato existentes; não acrescentam dados de pacientes, preços, disponibilidade ou promessas de resultado.

## Compatibilidade do Vary no Next.js

O Next.js 16.2.10 sobrescreve o Vary definido pelo Proxy ao renderizar páginas HTML do App Router ([problema no projeto](https://github.com/vercel/next.js/issues/85852)). O patch `patches/next@16.2.10.patch` altera os templates CommonJS e ESM para mesclar os valores existentes com os cabeçalhos de navegação exigidos pelo Next.js. O Bun aplica o patch vinculado a essa versão durante a instalação. Ele poderá ser removido quando uma atualização do Next.js passar na mesma regressão HTTP sem o patch.

## Verificação

```sh
bun install --frozen-lockfile
bun run test:run
bun run lint
bun run build
bunx tsc --noEmit
PLAYWRIGHT_PRODUCTION=true bun run e2e -- tests/e2e/smoke.spec.ts tests/e2e/agent-readiness.spec.ts
```

O Playwright inicia o servidor de produção após o build. Para apontar a suíte para um servidor já iniciado, use `PLAYWRIGHT_BASE_URL`. A CI executa testes unitários, lint, build, TypeScript e os testes HTTP/navegador contra produção, incluindo o comportamento final do patch Vary.

A suíte verifica status, cabeçalhos e corpos das respostas; qualidade e exclusões do Accept; privacidade e indexação; canônicos; conteúdo das três páginas de confiança; contatos reais; navegação e largura de tela; formatos dos arquivos de descoberta; todos os links internos do llms.txt e endereços do sitemap. Também consulta a variante Markdown de cada artigo e local publicado.

Após a publicação, repita as consultas alternando representações, em ambos os hosts, para verificar os redirecionamentos e o cache de produção:

```sh
curl -sS -L -i -H 'Accept: text/markdown' https://www.analuizarocha.com.br/
curl -sS -L -i -H 'Accept: text/html' https://www.analuizarocha.com.br/
curl -sS -L -i -H 'Accept: text/markdown' https://www.analuizarocha.com.br/pagina-inexistente
curl -sS -L -i -H 'Accept: text/markdown' https://analuizarocha.com.br/
curl -sS -L -i -H 'Accept: text/html' https://analuizarocha.com.br/
curl -sS -L -i -H 'Accept: text/markdown' https://analuizarocha.com.br/pagina-inexistente
```

Depois, repita a varredura do Is Agentic e confirme que `scanned_at` é posterior à publicação. O relatório armazenado anteriormente não comprova o resultado das alterações. O preview depende do acesso do autor Git ao projeto Vercel; nenhuma credencial nova é necessária para os recursos do site.

Referências de formato: [Accept: text/markdown](https://acceptmarkdown.com/), [qualidade do Accept](https://acceptmarkdown.com/guides/accept-parsing), [llms.txt](https://llmstxt.org/) e [Schema.org ContactPoint](https://schema.org/ContactPoint).
