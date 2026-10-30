# Website → MDX marketing pilot (home hero CTA)

## Scope

One CTA is tracked: **Agende sua consulta agora** in the home hero (`src/components/sections/HeroSection.tsx`). Every other scheduling CTA (header, mobile menu, services, about, footer, inner pages) and every clinic-location destination keeps its current direct link. Measure real clicks and conversations from this pilot before deciding on a wider rollout.

| Variable (Vercel production) | Pilot value | Effect |
| --- | --- | --- |
| `WHATSAPP_HOME_TRACKING_URL` | the new pilot link created in Ops (below) | Server-only. Replaces the home hero href and enables the local campaign decorator. |
| `NEXT_PUBLIC_WHATSAPP_TRACKING_URL` | **empty** | Would switch all shared scheduling CTAs. Reserved for a later full rollout. |

Both variables accept only `https://go.mdxstudio.com.br/c/<4–32 alphanumeric>` with no credentials, query or fragment. An empty or invalid value leaves the hero on direct secretary WhatsApp. Values are read at build time, so changes need a rebuild/redeploy. The earlier unlisted `/teste-marketing` route and `WHATSAPP_TEST_TRACKING_URL` were removed so that only one pilot CTA can be active.

## Campaign handling (consent-controlled)

The website implements the allow-listed query contract locally instead of executing `/s.js`, so it can clean up when consent changes. After cookies are accepted, it saves UTM fields and Google/Meta click IDs (`gclid`, `gbraid`, `wbraid`, `fbclid`) for the browser session and appends them to the tracked hero link:

- A new tagged landing replaces the saved campaign.
- Explicit query values already on an anchor win.
- Client navigation and newly rendered anchors stay covered.
- Revoking consent clears the session values and restores the plain link.
- If browser storage is denied, the current handoff still works.
- Nothing is saved before consent, so leaving a tagged landing before accepting loses that campaign.

Do not also install the MDX script, GTM link decoration or another campaign collector.

## Pilot link in Ops

Create one clinic link, separate from the technical-test link, so pilot counts stay clean. Do not disable or delete `eem9xz27` to reset counts: it keeps historical attribution, and drafts already sent with it remain usable.

- Ops: clinic tenant `c36cd771-ab76-4316-848e-9a56d124989f` → Links.
- Name: **Site Ana Luiza — home hero — piloto**.
- Destination: select the existing connected number `554130739732`. Do not type another number.
- Defaults: source `site`, medium `referral`, campaign `analuizarocha-piloto`, content `home-hero`, term empty. Tagged campaign query fields override the defaults.
- Prefilled text:

  ```text
  Olá! Gostaria de agendar uma consulta com a Dra. Ana Luiza Rocha.

  Referência da visita ao site (para identificar a origem do contato):
  ```

  The Worker/API appends ` (ref XXXXXXXX)` automatically. Never type a fixed token into Ops. The MDX matcher (`backend/libs/database/src/tracking-link.ts`) looks for the literal `(ref …)` token in the sent text. If a person deletes it, that message is not attributed and the click stays unclaimed. Do not infer the origin from timing or IP, and do not label missing attribution as organic. An origin already recorded for a conversation is not erased by a later untagged message. A `>` quote is only visual formatting; it neither hides the token nor protects it from deletion. Check the real draft on mobile and desktop and adjust the line spacing if needed.

Use the generated URL as `WHATSAPP_HOME_TRACKING_URL`. Do not invent a short code.

## Evidence

### 2026-10-30 production direct-link acceptance (owner)

- The owner regenerated both ingest secrets and applied them individually: `TRACKING_LINK_INGEST_SECRET` to GitHub production, Railway production `api-gateway` and the Cloudflare Worker; `PRODUCT_RELEASE_INGEST_SECRET` to GitHub production and Railway `api-gateway`. No broad Provision Update was run.
- Gateway redeploy `5a6eece4-7e66-48f9-8d20-c6e08bd1ec54` reached SUCCESS. The Worker-only deploy [run 41007174322](https://github.com/MDX-Studio/mdxchat/actions/runs/41007174322) succeeded (main/production, `deploy_link_redirect=true`, all other targets false).
- Technical link **Site Ana Luiza — teste e2e marketing** (`https://go.mdxstudio.com.br/c/eem9xz27`, defaults `site / referral / analuizarocha / teste-marketing`):
  - A HEAD request returned 302 to the correct `wa.me` number and message. As intended, HEAD carries no ref and records no click.
  - A normal browser opening produced a WhatsApp draft with `(ref QKFWTA2N)`, and the owner sent it.
  - Ops then showed **1 click / 1 Com conversa / 0 Sem conversa**, detail **Atribuído**, with values `site / referral / analuizarocha / teste-marketing`, desktop, clicked around 02:14:38 America/Sao_Paulo.

This proves the live production path from direct tracking link to WhatsApp to inbound ref claim, using the defaults. It is **not** the website or Google campaign test. Still unproven:

- The full website round trip with UTMs and `gclid`.
- The clinic contact-origin line and report.
- Booking and closed outcomes.
- Click-ID persistence.
- CTWA.
- A fresh no-ref control conversation.

### Historical (superseded) — before the owner's repair

Earlier on 2026-10-30, the unauthenticated ingest probe returned 503 (`TRACKING_LINK_INGEST_SECRET` not configured on api-gateway), and HEAD `/c/eem9xz27` returned 502. At that point no controlled message had been sent. The 2026-10-30 repair above resolved those blockers. Release references from that check: [production promotion](https://github.com/MDX-Studio/mdxchat/pull/1057), [deploy 40999156168](https://github.com/MDX-Studio/mdxchat/actions/runs/40999156168), API `1.61.0` build `3e14f215a14b2d15b9bb9f8fd1f898baf4c0aa97`.

## Owner acceptance round trip (home pilot)

1. After review and an explicit merge decision, set `WHATSAPP_HOME_TRACKING_URL` to the pilot link and redeploy. Keep `NEXT_PUBLIC_WHATSAPP_TRACKING_URL` empty.
2. On desktop and mobile, open `/?utm_source=google&utm_medium=cpc&utm_campaign=teste-home-piloto&gclid=TESTE123`. Confirm that the hero is the only `go.mdxstudio.com.br` link and that header, menu, services, about, footer and location buttons stay direct.
3. Accept cookies, open **Sobre** (client navigation), return home and click **Agende sua consulta agora**. Confirm that the WhatsApp number is correct, the message is the pilot text and an eight-character `(ref …)` is present.
4. In Ops → clinic → Links → **Ver cliques**, wait for the queued click to appear with campaign `teste-home-piloto` before sending. Then the owner sends the draft with the ref unchanged, and you refresh until **Com conversa** rises by one. Automated tests never send WhatsApp messages. Waiting makes this first test diagnostic; it does not certify recovery from every ingestion race.
5. Check the conversation's contact panel for **Veio de: Google · teste-home-piloto**, and record what report access is actually available. The manager-report preview flag (`release-insights-manager-report`) is independent of attribution and stays off unless the owner authorizes a controlled preview. Its UI says only new people and origin are measured; do not enable it just to make a test pass.
6. No-ref control: use a separate controlled sender and a new conversation, and expect **Origem não identificada** (report bucket **Sem origem**). An untagged message in an already-attributed conversation does not erase its origin.
7. Click IDs: the Ops click detail shows UTM values and claimed status, **not** `gclid`. The browser request proves that `gclid` is forwarded. Persistence needs authorized database inspection (`tracking_link_clicks.click_ids`, possibly encrypted) or other existing safe evidence. Do not claim `gclid` is visible in Ops.

## Rollback

Unset `WHATSAPP_HOME_TRACKING_URL` and rebuild/redeploy. The hero returns to direct WhatsApp and the campaign decorator stops loading. Keep `NEXT_PUBLIC_WHATSAPP_TRACKING_URL` empty. No service secret reset is needed. Disable the pilot link in Ops only after it has been removed from the site; cached settings can take about a minute to expire.

## Browser verification

- **Default build:** run `bun run e2e -- tests/e2e/marketing-tracking.spec.ts` with `PLAYWRIGHT_PRODUCTION=true`. It verifies that no tracked links exist, the hero is direct and `/teste-marketing` returns 404.
- **Pilot build:** build with `WHATSAPP_HOME_TRACKING_URL=https://go.mdxstudio.com.br/c/test1234`, then run the same spec with `MARKETING_TEST_MODE=enabled`. It verifies:
  - Exactly one tracked anchor (the hero), with the services and mobile-menu CTAs direct.
  - Consent gating and the expected UTM and `gclid` values.
  - Session persistence across navigation.
  - The mocked redirect-to-WhatsApp handoff.
  - Restoration on revocation.

  It does not establish live ingestion or inbound attribution.

Matching MDX code: `tools/link-redirect/worker/{index,site-script}.ts`, `backend/apps/api-gateway/src/tracking-links/`, `backend/libs/database/src/{tracking-link,tracking-link-storage,attribution-storage}.ts`, `backend/apps/messaging-runtime/src/engine/executor.ts`, `frontend/src/features/chat/lib/contact/conversation-attribution-copy.ts`. See [MDX tracking reference](https://github.com/MDX-Studio/mdxchat/blob/3e14f215a14b2d15b9bb9f8fd1f898baf4c0aa97/docs/TRACKING_LINKS.md).
