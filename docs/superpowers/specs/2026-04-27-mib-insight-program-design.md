# MiB Insight Program — Design Spec

**Date:** 2026-04-27
**Author:** Terry Tsakiris (with Claude)
**Status:** Approved for implementation planning
**Target site:** [atheryon-website](https://github.com/atheryon-ai/atheryon-website) — Next.js 14 static export on Azure Static Web Apps

---

## 1. Problem & strategy

Atheryon owns "Markets in a Box" (MiB) — a complete end-to-end market platform covering trading, operations, and compliance, front to back. Selling MiB through normal enterprise software channels triggers heavy procurement, security, and legal review cycles that stall deals for months.

**The wedge:** sell **information assets**, not software. Information assets sidestep IT/security/legal review because they are not classified as software and require no SOC 2 questionnaire, no SaaS license redlines, no production-deployment risk. The buyer expenses them on a corporate card; production conversation comes later.

**The channel insight:** the direct buyer is rarely the end-user organisation. The buyer is an **intermediary** — a consultant, system integrator, fintech product team, AI/dev-tool company, or innovation lab — who uses MiB IP to pitch or build for *their* downstream client. Every buyer becomes a channel.

**The 2026 sharpening:** position the IP as "**Industry IP ready for AI agents**." Buyers feed Atheryon's structured prompts, schemas, designs, and reference architectures into AI coding agents (Claude, Cursor, Copilot) to produce tailored derivative artifacts in days. This positioning further distances the product from "software" — agent-ready IP reads as research/data, not code.

## 2. Product ladder ("Show it → Build it → Run it")

Three tiers, all education-flavoured to land on professional-development expense lines rather than IT/software lines:

| Tier | Public name | Access window | List price | What it enables |
|------|-------------|---------------|------------|-----------------|
| 1 | **MiB Insight Program** | 90 days | **$19,999 USD** | Show your client / build a credible pitch or proposal |
| 2 | MiB Build Program | 12 months | ~$59,999 USD | Implement MiB-derived solutions for your client |
| 3 | MiB Run Program | Multi-year | ~$199,999 USD | Deploy MiB-derived solutions in your client's production |

**v1 scope: Insight Program only.** Build and Run pages exist as "coming" placeholders.

**Personal pricing lever:** public list price anchors enterprise positioning. Every real buyer receives a **Stripe Promotion Code** that brings the actual paid price down to whatever Terry agrees per deal. The storefront is a procurement-bypass mechanism with public anchoring, not a true self-serve catalog.

## 3. MiB Insight Program — what's inside

### 3.1 Modules (v1)

1. **Foundations** — market-structure primer, CDM glossary, "how to use this IP with your AI agent" guide
2. **Front Office: Trading** — orders, execution, booking, positions
3. **Middle Office: Lifecycle & Risk** — lifecycle events, settlement, valuation
4. **Back Office: Books & Operations** — records, reconciliation, corporate actions
5. **Compliance & Reporting** — regulatory reporting, surveillance, audit trail
6. *(Optional v1)* **Demo Storylines** — pre-built pitch narratives

### 3.2 Per-module artifact bundle

Each module contains:

- **Prompts pack** — 10–30 markdown prompts ready to paste into Claude/Cursor (build a screen, generate schemas, produce test data, write a demo script)
- **Schemas** — CDM model excerpts, JSON Schema, OpenAPI specs
- **Design specs** — Figma export, annotated screen images, design tokens
- **Reference architecture** — Mermaid diagrams, ADRs (machine-readable)
- **Example transcripts** — recorded Claude/Cursor sessions in markdown that prove the IP works in practice
- **Sample data** — synthetic but realistic CSV/JSON
- **Walkthrough** — short human-facing doc; the consultant reads once, then drives the agent

### 3.3 Production scope

Much of this is likely already in `cdm-platform/` (CDM models, screens, architecture diagrams). v1 production is largely **repackaging existing IP for agent consumption**, not net-new authoring. No videos required. Inventory pass during implementation will determine the gap.

## 4. Buyer profile

The Insight Program is for:

- Consultants and SI architects building client engagements
- Capital-markets / fintech **product teams** (trading, post-trade, market-data, OMS/EMS, compliance vendors)
- **AI / developer-tool companies serving financial services**
- Innovation labs at incumbents (banks, exchanges, CCPs, custodians)

Common thread: already using AI coding agents, want to skip 6–12 months of domain ramp-up.

### 4.1 Outcomes (what the buyer can do after 90 days)

- Generate a tailored client demo or product prototype with their agent in a day
- Produce a credible market-platform reference architecture for a client meeting or product spec
- Bootstrap a working prototype their agent can extend into a real engagement or feature

## 5. Storefront architecture

### 5.1 Routes

- `/programs/` — index page; lists available programs (Insight live in v1; Build & Run as "coming")
- `/programs/mib-insight/` — Insight Program product page
- `/programs/mib-insight/thanks` — post-purchase redirect target

### 5.2 Navigation

- Add **Programs** to the top header (`Header.tsx`)
- Add to the footer (`Footer.tsx`) Resources/Services column

### 5.3 Product-page section order

1. **Hero** — program name, one-line value prop, price, primary "Get access" CTA
2. **Who it's for** — explicit buyer-profile list (so wrong buyers self-disqualify)
3. **What's included** — agent-ready IP modules + supporting environment + demo storylines + sample data
4. **Outcomes** — three concrete things the buyer can do after 90 days
5. **Curriculum detail** — module-by-module breakdown
6. **FAQ** — must include procurement-framing questions ("How is this expensed?", "Is this a software license?", "What happens at day 90?")
7. **Final CTA** — price block + "Get access" → Stripe Payment Link

### 5.4 Hero copy

- One-liner: *"Industry IP ready for AI agents — bootstrap a market-platform pitch and prototype with your agent in days."*

### 5.5 Copy & components

- All copy in `src/content/site.ts` under new keys `site.pages.programs` and `site.pages.mibInsight` (matches existing project convention; never inline in TSX)
- Reuse: `<Hero>`, `<Section>`, `<FeatureGrid>`, `<FAQ>`, `<CTASection>`, `<Card>`
- One new small component: `<PriceBlock>` (price + CTA + "expensable as professional development" footnote) — unless `<CTASection>` is flexible enough

### 5.6 No backend in v1

The "Get access" button is a plain `<a href="https://buy.stripe.com/...">`. No API routes, no Functions, no auth. The site stays fully static; existing Azure Static Web Apps deploy is untouched.

## 6. Purchase + fulfillment flow

### 6.1 Buyer journey (public)

1. Browse to `/programs/mib-insight/`
2. Click "Get access" → opens Stripe Payment Link in new tab
3. Stripe Checkout collects:
   - Email + card (standard)
   - **GitHub username** (custom field, required) — needed to add as collaborator
   - Company name (custom field, optional)
   - Use case in one line (custom field, optional)
   - Promotion code field always visible
4. Payment succeeds → Stripe receipt + redirect to `/programs/mib-insight/thanks`

### 6.2 Stripe configuration

- Product: *MiB Insight Program — Industry IP for AI Agents*
- Price: **$19,999 USD**, one-time (USD default; flag if AUD preferred)
- Stripe Tax enabled (auto-applies GST/VAT)
- Payment Link URL hard-coded into `site.ts` for the CTA `href`
- **Promotion Codes** created per deal: % off or $ off, single-use or multi-use, with expiry
- Receipt line item: *"MiB Insight Program — 90-day access"* (no software language)

### 6.3 Manual ops checklist (per sale, ~10 min)

1. Stripe email notifies of successful payment
2. Open Stripe session → grab buyer's GitHub username from custom field
3. Add buyer as **read-only collaborator** to private program-materials repo (GitHub UI or `gh` CLI)
4. Send welcome email from saved template (template below)
5. Log in tracking sheet: Stripe ID · email · GitHub username · purchase date · expiry date · status
6. Set calendar reminders:
   - **Day 85** — gentle nudge: "5 days left — want to extend or move to Build Program?"
   - **Day 90** — revoke collaborator + send "your access has ended" email with Build-Program upsell

### 6.4 Welcome-email template

> Subject: Welcome to the MiB Insight Program
>
> Hi [Name] — thanks for joining the program. Your access is active for 90 days, until **[date]**.
>
> You've been added to the program materials here: **[GitHub repo URL]**. Please read `PROGRAM_TERMS.md` before you start.
>
> Suggested first step: open the **Foundations** module — it shows how to use the IP with your AI agent in about 15 minutes.
>
> Reply to this email any time. — Terry

### 6.5 State ownership

- **Stripe** — source of truth for payments
- **GitHub** — source of truth for access (collaborator list)
- **Tracking sheet** (Notion / Airtable / Google Sheets — choose one) — single ops dashboard

### 6.6 Refund policy

"No refunds once access is granted, due to immediate delivery of program materials." Linked from Stripe Checkout's terms field.

## 7. Copy / language discipline

### 7.1 The load-bearing principle

Every customer-facing surface uses **program / materials / IP** language. Never software language. The noun on the receipt determines the procurement path: "demo pack" or "program" lands as an expense line; "software license" triggers the legal gauntlet.

### 7.2 Wordlist

| Don't say | Say instead |
|-----------|-------------|
| Software, license, code, source, repo, GitHub, deployment, hosting, install, runtime | Program, materials, IP, agent-ready artifacts, environment, walkthrough |
| "Software license agreement" | "Program Terms of Use" |
| "Source code included" | "Agent-ready IP modules included" |
| "Production deployment rights" | (don't mention publicly — Build/Run only) |

### 7.3 Enforcement points

- `site.ts` copy reviewed against the wordlist before launch
- Stripe product name + description + receipt template
- Welcome / day-85 / day-90 emails
- Promo-code names (e.g., not `LICENSE10` — use `INSIGHT10`)
- Page `<title>` and meta descriptions

## 8. Legal mechanism

- Single document: `PROGRAM_TERMS.md` at the repo root, branded *Atheryon MiB Program Terms*
- Body = **Polyform Internal Use 1.0.0** verbatim (industry-tested, lawyer-reviewed template)
- Adds three Atheryon-specific clauses:
  - 90-day access window
  - No redistribution
  - No production use (production rights belong to Build/Run Programs)
- Acceptance mechanic: collaborator-invitation acceptance + first clone constitutes acceptance (standard GitHub-distribution pattern)

**Why this avoids lawyers:** Polyform is a recognised, low-risk template; if a buyer's legal team ever inspects, they identify it as boilerplate. The 90-day window is enforced operationally (collaborator removal), not just contractually — so if a buyer keeps a local copy after expiry, the contract still binds them not to use it.

## 9. v1 build order

1. **Content production** (weeks 1–3, the bulk)
   - Inventory existing IP in `cdm-platform/`
   - Author the 5 module bundles per §3, Foundations first
   - Draft `PROGRAM_TERMS.md`
2. **Storefront pages** (week 1, parallel, small)
   - Add `/programs/` index and `/programs/mib-insight/`
   - Update `Header.tsx` and `Footer.tsx` nav
   - Add copy to `site.ts`
3. **Stripe configuration** (1 day, week 1)
   - Stripe Tax on, Payment Link with custom fields, initial promo codes, receipt template
4. **Ops setup** (1 day, week 1)
   - Tracking sheet, email templates, calendar reminders

## 10. Out of scope for v1

- Build Program & Run Program tiers (placeholders only)
- Hosted per-buyer demo environments
- Video content
- All automation (Stripe webhook, GitHub API, scheduled revocation) — that's Approach 2
- Customer self-service portal (Stripe receipt is enough)

## 11. Edge cases

| Case | Handling |
|------|----------|
| Wrong GitHub username at checkout | Welcome email asks confirmation; Stripe email is fallback contact |
| Payment fails partway | Stripe handles; no fulfillment action |
| Refund request | Policy = no refunds after access; exception at Terry's discretion |
| Extension request | Bill via "Extension" SKU (e.g., 30 days for $5,000) |
| Public leak of IP | DMCA takedown via GitHub + notice email; Polyform supports enforcement |
| Add team members | Each *additional* seat beyond the named buyer (e.g., $5,000 each); add as separate collaborators |
| Chargeback / dispute | Standard Stripe dispute flow; revoke collaborator pending resolution |

## 12. Approach 2 upgrade trigger

Move from manual fulfillment to automated when **any** of:

- Sustained > 5 sales/month for two consecutive months (not a one-off peak — manual ops genuinely doesn't scale)
- A sale lands while Terry is asleep / travelling and fulfillment lags by hours
- Tracking-sheet drift (a day-90 reminder gets missed)

Approach 2 work: Stripe Checkout migration, Azure SWA Function for `checkout.session.completed`, GitHub API integration, scheduled revocation function, Azure Table Storage for access state. ~1–2 weeks.

## 13. Testing

- Manual end-to-end: purchase using Stripe test card → verify custom fields → invite test GitHub collaborator → confirm welcome email lands → verify revocation steps
- New Playwright E2E test for the product page (visit, find "Get access" button, verify it links out to Stripe)
- No deeper automated integration tests in v1; surface area is small and the moving parts are mostly third-party

## 14. Open questions for implementation

- Currency: USD confirmed default. Override later if patterns suggest AUD or GBP per buyer geography.
- Tracking-sheet platform: Notion, Airtable, or Google Sheets — Terry's preference
- Email vendor for v1: Gmail (manual sends from terry.tsakiris@atheryon.com.au) is sufficient; templated tooling is unnecessary at < 5 sales/month
- Private-materials-repo location: new GitHub repo under `atheryon-ai` org, name TBD (e.g., `mib-insight-program-materials`)
