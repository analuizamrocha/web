# Prompt para novo agente — segunda passada de SEO da Ana Luiza Rocha

Você é o revisor e implementador da segunda passada de SEO, conteúdo e experiência do paciente para o site da Dra. Ana Luiza Moraes Rocha. Já existe um estudo extenso, um tracker priorizado e uma skill reutilizável, entregues no PR #55 (já mergeado em `main`). Sua missão é validar criticamente as conclusões, escolher um primeiro lote pequeno de melhorias de maior impacto e entregá-lo em um novo draft PR, sem deploy.

## Projeto e entrega

- Workspace: `/Users/diegovfeder/workspace/jobs/analuizarocha`
- Site público: `https://www.analuizarocha.com.br/`
- Repositório: `analuizamrocha/web`
- Branch: crie uma nova branch a partir de `main` atualizada
- PR de referência (mergeado): `https://github.com/analuizamrocha/web/pull/55`

Abra um novo PR como draft e mantenha-o como draft. Não faça deploy, merge, pedido de indexação ou alteração em Search Console, Analytics, GBP, Doctoralia ou CMS externo.

## Leia completamente antes de agir

- `AGENTS.md`
- `CLAUDE.md`
- `docs/cfm-compliance-guidelines.md`
- `docs/blog-content-playbook.md`
- `docs/location-seo-spec-report.md`
- `docs/seo-indexing-recovery-report.md`
- `docs/seo-reports/relatorio-seo-executivo-analuizarocha-2026-05.md`
- `research/seuseo-study-2026-07-18.md`
- `research/seo-growth-plan-328-keywords-2026-07-18.md`
- `research/seuseo-keywords-2026-08.csv`
- `research/prompts/seo-implementation-agent-prompt-2026-07-18.md`
- `.agents/skills/seuseo-project-audit/SKILL.md`
- todo o diff e a descrição do PR #55

Se disponíveis, use as skills de SEO, acessibilidade, Core Web Vitals, React/Next.js e Playwright. Não use scores de ferramentas como substituto de inspeção do HTML e do navegador.

## Baseline conhecido

O relatório SeuSEO de 17/06 a 17/07/2026 tinha 328 termos:

- 39 melhoraram;
- 8 caíram;
- 258 permaneceram estáveis;
- 23 eram novos;
- 66 estavam no Top 3;
- mais 30 estavam entre posições 4–10.

Ganhos importantes incluem `fissura anal laser curitiba`, `cirurgia hemorroidas curitiba`, `hemorroida é cirúrgica`, `toda hemorroida precisa de cirurgia` e `coceira anal curitiba`.

Quedas a investigar incluem `proctologia curitiba`, `crm-pr 45351`, `dra ana luiza m rocha`, `ligadura elástica para hemorroidas curitiba` e `médica coloproctologista curitiba`.

O PR #55 (mergeado em `main`) entregou:

- estudo reconciliado;
- plano de 90 dias;
- CSV com 60 keywords;
- prompt de implementação;
- skill e validador SeuSEO.

O último estado conhecido passou em lint, build de 67 rotas, E2E remoto e Vercel Preview.

## Objetivo desta segunda passada

Não tente resolver 328 keywords de uma vez. Comece com uma auditoria independente e selecione no máximo cinco mudanças para um primeiro lote. Classifique cada oportunidade por:

- evidência;
- impacto em aquisição/consulta;
- risco clínico/SEO;
- esforço;
- URL owner.

Implemente somente mudanças de alta confiança que melhorem o owner correto sem prejudicar posts já ranqueados.

## Regras YMYL e CFM

- Não invente diagnóstico, indicação, taxa, benefício, recorrência, recuperação, risco, disponibilidade, preço, convênio, hospital, credencial ou resultado.
- Não use depoimentos, ratings, casos clínicos identificáveis ou promessas.
- Não afirme que uma técnica é definitiva, superior, indolor, mais rápida ou indicada para todos.
- Sinalize para revisão médica qualquer claim novo sem fonte aprovada.
- Preserve CRM-PR 45351 / RQE 36221 e relações verdadeiras com clínicas; não represente propriedade inexistente.
- Não faça conteúdo massificado ou doorway pages por bairro/keyword.

## Áreas prioritárias para investigação

### 1. Ownership e canibalização

Confirme a URL que atualmente ranqueia para cada consulta antes de mudar conteúdo.

- Homepage: `coloproctologista curitiba`, `proctologista curitiba`, `proctologia curitiba` e intenção de consulta.
- `/sobre`: entidade e credenciais; não deve competir com a homepage pela principal busca local.
- Hemorroidas: owner comercial para tratamento, ligadura, escleroterapia e cirurgia.
- Laser: coordene com hemorroidas/fissura para não capturar todas as intenções artificialmente.
- Toxina/fissura, fístula, HPV, rastreio anal, cisto, DII e SII: um owner claro por cluster.
- Blog: perguntas e sintomas; deve apoiar o tratamento/consulta com links contextuais.

Se um artigo estiver no Top 3, não altere título, slug, canonical ou intenção principal sem demonstrar o benefício e preparar rollback.

### 2. Primeiro lote de páginas comerciais

Compare produção e repositório para:

- `/`
- `/tratamentos`
- `/tratamentos/hemorroidas`
- `/tratamentos/cx-laser`
- `/tratamentos/toxina-botulinica`
- `/tratamentos/cx-fistulas-anorretais`
- `/tratamentos/hpv-anal`
- `/tratamentos/rastreio-cancer-anal`
- `/tratamentos/cx-cisto-pilonidal`
- `/tratamentos/doencas-inflamatorias-intestinais`
- `/tratamentos/sindrome-intestino-irritavel`
- `/locais-de-atendimento` e detalhes
- `/sobre`

Registre status, canonical, robots, title final, description, H1, headings, schema, links internos, CTA e conteúdo decisório. Corrija somente gaps confirmados.

### 3. Blog e links internos

- Inventarie os 44 posts por primaryKeyword, intenção e URL comercial apoiada.
- Detecte sobreposição real nos clusters coceira, sangue/dor, hemorroidas, fissura, HPV, cisto e fístula.
- Prefira reforçar links e diferenciar intenção antes de fundir ou redirecionar.
- De posts vencedores, adicione links editoriais úteis para o owner de tratamento, sem âncoras repetitivas.
- De páginas de tratamento, selecione poucos artigos realmente úteis.
- Não crie novo post até demonstrar um gap distinto não coberto.

### 4. Conteúdo e confiança

- O hub `/tratamentos` deve funcionar como decisão e navegação, não como texto genérico.
- H1, primeira resposta, metadata e CTA devem concordar.
- Autoria, data, revisão médica, CRM/RQE e disclaimer precisam ser consistentes.
- FAQ visível pode ajudar pacientes e extração por IA, mas não prometa rich result do Google.
- Não adicione HowTo schema.

### 5. Acessibilidade e SXO

- Verifique `<main>` e skip link.
- Menu móvel com nome acessível, foco, fechamento e `aria-labelledby` válido.
- Nomes acessíveis devem corresponder ao texto visível de CTAs e locais.
- Heading order lógico; links genéricos compreensíveis em contexto.
- Jornada clara: dúvida → tratamento/local → consulta.
- Teste teclado e 390 px sem overflow ou CTA cobrindo conteúdo.

### 6. Performance

- Identifique LCP/CLS/INP reais em páginas representativas.
- Não marque várias imagens como priority.
- Revise as imagens de blog acima de aproximadamente 300–600 KB e converta/redimensione apenas quando houver ganho mensurável.
- Avalie paginação ou progressive rendering do índice com 44 cards sem prejudicar crawlabilidade.
- Evite JavaScript adicional para correções que HTML/CSS resolvem.

### 7. Schema

- Um graph coerente para Physician, MedicalOrganization, MedicalClinic, WebSite, MedicalWebPage, Article e BreadcrumbList.
- FAQ deve ser idêntica ao conteúdo visível.
- Sem review/rating inventado.
- Clínica parceira não deve parecer propriedade da médica.
- Datas, autor, URLs, credenciais e NAP devem corresponder ao conteúdo visível.

## Uso de dados

Se houver acesso de leitura a Search Console ou Analytics, use os últimos 28 dias versus período anterior para validar páginas e queries. Não altere configurações. Se não houver acesso, diga claramente que rankings e impressões não foram confirmados por essas fontes.

Não invente volume. O CSV de 60 termos é um tracker operacional, não uma promessa de demanda.

## Limite de implementação

Você pode alterar código, testes, conteúdo e documentação no branch, desde que:

- a melhoria seja suportada por evidência;
- claims clínicos permaneçam seguros;
- nenhuma URL vencedora seja destruída sem plano;
- nenhuma ação externa ou produção seja executada.

Se a auditoria mostrar que uma recomendação antiga estava errada, corrija o plano e explique. Se não houver melhoria material, não gere churn.

## Verificação obrigatória

```bash
python3 .agents/skills/seuseo-project-audit/scripts/validate_seuseo_csv.py research/seuseo-keywords-2026-08.csv
bun run lint
bun run test:run
bun run build
bun run e2e
git diff --check
```

Se o projeto continuar sem testes Vitest, reporte isso sem fingir cobertura. Teste manualmente em desktop e 390 px todas as URLs alteradas e capture screenshots quando houver alteração visual.

## Entrega

1. Apresente a auditoria curta e o lote escolhido antes de editar.
2. Mostre antes/depois por URL.
3. Faça stage somente do escopo e commits claros.
4. Faça push na nova branch e abra um draft PR contra `main`.
5. Inclua decisões de ownership, claims para revisão médica, testes, screenshots, riscos e rollback.
6. Aguarde checks remotos verdes.
7. Não marque ready, não faça merge e não faça deploy.

Relatório final: resultado executivo, oportunidades avaliadas, mudanças implementadas, arquivos/URLs, metadata, conteúdo e links, schema, acessibilidade/performance, validações, commit/PR, bloqueios e próxima iteração recomendada.

**No production deployment was performed.**
