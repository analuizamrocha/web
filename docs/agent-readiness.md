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
| Página com negociação, somente formatos não disponíveis | 406, com os formatos disponíveis informados |
| Página inexistente, Markdown preferido | 404 em Markdown com links para início, llms.txt e sitemap |
| Artigo ou local inexistente, Markdown preferido | Mesmo 404 recuperável em Markdown |
| Artigo publicado, Markdown preferido | Título, datas, fonte canônica e texto original com links/imagens absolutos; lê somente o arquivo solicitado após validar o slug publicado |
| Local de atendimento, Markdown preferido | Resumo e contatos derivados dos dados existentes, com link para os detalhes completos |
| Índices de blog, tratamentos e locais; tratamentos individuais; Sobre e Contato, Markdown preferido | Conteúdo da página visual, com estrutura semântica, imagens, FAQs e links absolutos |
| `HEAD` em recursos negociados | Mesmo status e cabeçalhos, sem corpo |
| `/sobre` | Página existente com formação, registros profissionais e trajetória |
| `/contato` | Página com os contatos publicados, locais e orientações de agendamento |
| `/politica-privacidade` | Política existente em HTML ou Markdown, com seu canônico e noindex preservados |
| `/llms.txt` | Listas de links e orientações específicas sobre quando e como consultar o site |
| `/sitemap.xml` | Endereços canônicos existentes mais `/contato`; sem aliases ou rotas auxiliares de Markdown |

Requisições RSC, ações de servidor, arquivos estáticos, robots.txt, sitemap.xml e llms.txt conservam seus protocolos. Todas as páginas de conteúdo listadas no sitemap oferecem HTML e Markdown no mesmo endereço. Respostas Markdown usam `private, no-store` para não preencher entradas de cache destinadas ao HTML. A variante negociada de uma página canônica não recebe `noindex`; esse cabeçalho fica restrito às páginas inexistentes e aos recursos excluídos da indexação, incluindo a política de privacidade nos dois formatos. O acesso direto à rota auxiliar `/conteudo-markdown` retorna HTTP 404, inclusive quando alguém envia o cabeçalho interno manualmente. O Proxy remove esse marcador antes de encaminhar requisições diretas.

O JSON-LD de MedicalOrganization conserva o PostalAddress e inclui ContactPoint com telefone de agendamento, e-mail público, idioma e link para `/contato`. A página e as orientações reutilizam as informações profissionais e de contato existentes; não acrescentam dados de pacientes, preços, disponibilidade ou promessas de resultado.

## Fonte compartilhada das páginas

Os arquivos `page.tsx` existentes conservam seu JSX, suas classes, seus dados e seus metadados nos caminhos originais em `src/app`. O handler Markdown importa somente a página solicitada e reutiliza sua árvore de conteúdo. Assim, alterações na descrição de um tratamento, em uma FAQ ou nos dados de um índice chegam aos dois formatos sem mover páginas nem manter uma segunda cópia de conteúdo médico.

O renderer `src/lib/page-markdown.ts` lê a árvore semântica desse conteúdo, expande somente uma lista explícita de componentes síncronos sem hooks e transforma HAST em Markdown com bibliotecas de sintaxe. Links e imagens são resolvidos para o domínio canônico. Scripts de schema, navegação e elementos decorativos não entram no documento; o layout global e os provedores de analytics não são executados. A identificação profissional é incluída porque o rodapé HTML não é renderizado. Componentes novos sem adapter geram erro e são detectados nos testes, em vez de perder conteúdo silenciosamente.

Para uma nova página, registre o caminho público em `src/lib/markdown-page-paths.ts` e adicione o loader de seu `page.tsx` em `src/lib/markdown-pages.ts`. A reutilização é limitada às páginas síncronas de servidor atualmente suportadas; páginas com outra estrutura precisam de um adapter explícito. Os artigos continuam usando seus arquivos Markdown originais; os detalhes dos locais continuam usando `src/lib/locations.ts`. Nenhum handler busca HTML de produção ou mantém uma cópia manual do texto dos tratamentos.


## Canônicos, links e recursos não indexáveis

Cada resposta Markdown válida inclui `Link: <endereço-canônico>; rel="canonical"`, sempre a partir do domínio e dos slugs publicados, sem usar o Host enviado pelo cliente. Erros não recebem um canônico fictício. Links, imagens e definições de referência dos artigos são resolvidos para URLs absolutas por uma árvore Markdown/GFM; exemplos em código não são alterados e os arquivos originais continuam com caminhos relativos.

`/design` continua desativado em produção (404). `/design`, `/design-system` e `/politica-privacidade` recebem `X-Robots-Tag: noindex, nofollow`; a política também mantém seu meta robots. O mesmo cabeçalho protege acessos diretos ao helper e endpoints de imagens sociais `opengraph-image`/`twitter-image`, inclusive aninhados; esses endpoints binários também ficam fora da negociação de documentos. O site atualmente usa `/images/og.png` como preview: esse arquivo e sua versão em `/_next/image?url=/images/og.png` recebem noindex, mas continuam respondendo com imagem para preservar os previews sociais. As imagens dos artigos não recebem esse bloqueio.

Esses recursos não entram no sitemap. A política permanece no llms.txt para consultas de privacidade, sem passar a ser indexável. Não se adiciona Disallow para impedir que os robôs leiam os cabeçalhos noindex. Essa política de indexação não é um mecanismo de autenticação.

## Instrumentação

Os testes isolados do AnalyticsProvider verificam que nenhum provedor é inicializado antes do consentimento ou após uma escolha inicial de recusa; verificam também o carregamento após o consentimento e o trabalho adiado, a seleção GA/GTM e os sinais Vercel. Os SDKs são substituídos nos testes e nenhum evento real é enviado. Os handlers Markdown não renderizam o layout React nem inicializam analytics de navegador.

Essa verificação de inicialização não comprova configurações externas de GA/GTM, o conteúdo de containers, nem interrompe SDKs que já foram carregados antes de uma revogação; uma revisão dessas condições exige evidência específica. Nenhum novo provedor ou evento é introduzido nesta PR. O prompt reutilizável para revisão dos outros projetos está em `docs/agent-readiness-review-prompt.md`.

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

A suíte verifica status, cabeçalhos e corpos das respostas; qualidade e exclusões do Accept; privacidade e indexação; canônicos; conteúdo das três páginas de confiança; contatos reais; navegação e largura de tela; formatos dos arquivos de descoberta; todos os links internos do llms.txt e endereços do sitemap, em HTML e Markdown. Também compara títulos, parágrafos, listas e FAQs do HTML com o Markdown de cada módulo compartilhado e verifica HEAD e 406 nas novas páginas.

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

Referências de formato: [guia inicial Accept: text/markdown](https://acceptmarkdown.com/start), [qualidade do Accept](https://acceptmarkdown.com/guides/accept-parsing), [llms.txt](https://llmstxt.org/) e [Schema.org ContactPoint](https://schema.org/ContactPoint).
