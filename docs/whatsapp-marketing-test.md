# Website → MDX marketing acceptance

## Start with one isolated CTA

Set `WHATSAPP_TEST_TRACKING_URL=https://go.mdxstudio.com.br/c/eem9xz27` in the website's Vercel production environment and rebuild/redeploy this PR after review. Leave `NEXT_PUBLIC_WHATSAPP_TRACKING_URL` empty. Only `/teste-marketing` exposes this link; normal scheduling still uses direct WhatsApp. The page is noindex, absent from navigation/sitemap and returns 404 when this variable is empty or invalid. This is an unlisted test page, not an authenticated page.

The production link belongs to the clinic tenant `c36cd771-ab76-4316-848e-9a56d124989f`, selects connected number `554130739732`, and uses defaults `site / referral / analuizarocha / teste-marketing`. Created on 2026-10-30 as **Site Ana Luiza — teste e2e marketing**. Check the selected destination before testing; do not substitute another tenant's number.

For a later full rollout, set `NEXT_PUBLIC_WHATSAPP_TRACKING_URL` to a verified clinic link and redeploy. That replaces main scheduling CTAs; location-specific phone numbers keep their existing destinations. Only production HTTPS `go.mdxstudio.com.br/c/<code>` links without query/fragment/credentials are accepted in either variable.

The website implements the allow-listed query contract locally instead of executing `/s.js`. This permits cleanup when consent changes. Accepted consent saves UTM fields and Google/Meta click IDs for the browser session. New tagged landings replace the campaign. Explicit anchor query values win. Client navigation/new anchors remain covered. Revoking consent clears session values and restores decorated links. Denied browser storage does not prevent the current handoff. No campaign is retained before acceptance; leaving a tagged landing before accepting can lose that campaign. Do not additionally install the MDX script, GTM decoration or another campaign collector.

## Production readiness observed on 2026-10-30

| Component | Evidence | Result |
| --- | --- | --- |
| Release | [Production promotion](https://github.com/MDX-Studio/mdxchat/pull/1057) merged; [deploy 40999156168](https://github.com/MDX-Studio/mdxchat/actions/runs/40999156168) includes successful migration, backend, frontend, Ops and redirect jobs | Deployed |
| API | `https://api.mdxstudio.com.br/version` → `1.61.0`, build `3e14f215a14b2d15b9bb9f8fd1f898baf4c0aa97`, environment `production` | Confirmed |
| Worker | `/s.js` → 200; deploy logs show queues and upload of both tracking secrets | Published; this alone does not prove ingestion |
| Ingest | Unauthenticated GET `/internal/tracking-links/zzzzprobetest/settings` → 503: `Tracking link ingest is not configured. Set TRACKING_LINK_INGEST_SECRET on api-gateway.` | **Blocked**; a configured guard should return 401 without a secret |
| Created link | Bot HEAD `/c/eem9xz27` → 502 | **Blocked**, no tracking click recorded by HEAD |
| Tenant | Ops shows active clinic, WhatsApp ready, connected number `554130739732`; dedicated link active with zero clicks | Confirmed |
| Report screen | Tenant config shows `release-insights-manager-report` inheriting global disabled | Off; independent of recording attribution |
| Website preview | Original PR Vercel status was Blocked; updated commit `41b1b14` built successfully on Vercel. Connected Vercel account lacks direct access to clinic team | Build passed; latest head and browser access still need checking |
| Real message | No controlled message sent | **Unproven** |

### Ingest configuration repair

The existing GitHub production Environment already has `TRACKING_LINK_INGEST_SECRET` (name/existence verified only). The Worker deploy uploaded it; the gateway guard reports no value. Reuse that exact secret, not a separately generated value. Never put it in website variables or browser code.

MDX's supported convergence path is `gh workflow run provision-update.yml --repo MDX-Studio/mdxchat --ref main -f environment=production`. It forwards the Environment secret through `scripts/provision/cli/ensure_env_wiring.sh` to `api-gateway`. This updates other infrastructure configuration too; review its scope before running. If performing a narrow repair instead, set the same secret on production api-gateway through the existing secret owner, roll out/restart that service as required, then verify 401 without credentials and a real redirect. This website task did not run infrastructure convergence or change MDX service secrets.

## Owner acceptance round trip

1. Repair ingest configuration; confirm a normal browser opens the new link to the intended WhatsApp number, with an eight-character `(ref …)`, and Ops records a click. A HEAD/bot request must not add a click or ref. Never treat a 200 from `/s.js` as readiness.
2. Review/merge the website PR, configure the isolated variable above and redeploy. Open `/teste-marketing?utm_source=google&utm_medium=cpc&utm_campaign=teste-release&gclid=TESTE123` on the website. Accept cookies, open **Conheça a médica**, go back, then use **Testar contato pelo WhatsApp**.
3. In Ops → clinic → Canal e automação → Links → **Ver cliques**, wait for the queued click to appear before sending. Then the owner sends the draft without removing the ref. Refresh until **Com conversa** rises by one. No WhatsApp message is sent by automated website tests.
4. Inspect the conversation's contact panel: **Veio de: Google · teste-release**. A fresh unattributed conversation shows **Origem não identificada**. The report uses **Sem origem**. An untagged second message in an already-attributed conversation does not erase its origin: use a separate controlled sender/new conversation for the control.
5. The Ops click summary exposes UTM values and claimed status, **not gclid/click IDs**. Verify `gclid=TESTE123` in the outgoing browser request; persistence requires an authorized database inspection of the relevant `tracking_link_clicks.click_ids` (possibly encrypted). Do not claim it is visible in Ops.
6. To inspect the report as a controlled preview, Configuração → Configurações → Release flags (app) → **Relatório do gestor (prévia)** → **Ligado** for this tenant only. Its current warning says only new people and origin are measured; other answers are unavailable. Attribution capture/contact display do not depend on this flag. No flag was changed in this task.

Matching code in the deployed MDX tree: `tools/link-redirect/worker/{index,site-script}.ts`, `backend/apps/api-gateway/src/tracking-links/`, `backend/libs/database/src/{tracking-link-storage,attribution-storage}.ts`, `backend/apps/messaging-runtime/src/engine/executor.ts`, `frontend/src/features/chat/lib/contact/conversation-attribution-copy.ts`, and the origin report in frontend insights. See [MDX tracking reference](https://github.com/MDX-Studio/mdxchat/blob/3e14f215a14b2d15b9bb9f8fd1f898baf4c0aa97/docs/TRACKING_LINKS.md).

A queue-delivery delay can precede an incoming message. Waiting for the click above makes the initial manual test diagnostic; it does not certify automatic recovery from every ingestion race or outage. Meta CTWA is a separate optional controlled-ad test.

## Rollback

Unset `WHATSAPP_TEST_TRACKING_URL` and rebuild/redeploy: the isolated page returns 404. If full rollout was enabled, also unset `NEXT_PUBLIC_WHATSAPP_TRACKING_URL` and rebuild/redeploy to restore direct CTAs. Disable the dedicated link in Ops only after removing it from the site; cached settings can take about a minute to expire.

## Browser verification

Default production build: run `bun run e2e -- tests/e2e/marketing-tracking.spec.ts` with `PLAYWRIGHT_PRODUCTION=true`; it verifies disabled-page 404 and normal direct CTAs. Enabled build: set `WHATSAPP_TEST_TRACKING_URL=https://go.mdxstudio.com.br/c/test1234` when building, then run the same test with `MARKETING_TEST_MODE=enabled`. The enabled test covers consent, client navigation, cookie revocation and a mocked redirect-to-WhatsApp handoff. It does not establish live ingestion or inbound attribution.
