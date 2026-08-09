# Phase 6 — Homepage wordmark status & design-alignment plan

Date: 2026-08-09. Read-only audit; no source files were modified. Branch at time of audit: `dev` (HEAD `4400987`).

---

## Wordmark status

### Verdict: part (a) is already resolved. The imitation wordmark strip no longer exists on any rendered page.

### What the old treatment was

`src/components/home/HomeStrip.tsx` (now deleted) rendered a 3-cell strip on the old dark homepage. Its first cell, labelled **"Proven Capital Markets Experience"**, contained three imitation wordmarks styled to evoke the real trademarks:

- **"Goldman Sachs"** — `fontFamily: 'Georgia, serif'`, bold 17px white, stacked two lines (mimicking the Goldman serif wordmark)
- **"CREDIT SUISSE"** — bold all-caps sans, stacked two lines
- **"BARCLAYS"** with a letterspaced (`0.18em`) uppercase **"CAPITAL"** sub-line

The second cell ("Ecosystem") also drew an imitation **Microsoft four-square logo** from four coloured `<span>`s (`#f25022`/`#7fba00`/`#00a4ef`/`#ffb900`) and rendered **"S&P Global"** in brand red (`#e02020`).

### When it was removed (two events)

1. **Stopped rendering:** commit `ca68104` (2026-08-09 10:15 +1000, "baseline: parallel-session homepage/about Doc refactor") rebuilt the homepage onto the DocPage system; the page stopped importing HomeStrip/HomeHero/BuiltForGrid. (The strip was originally wired in at `31ae119`.)
2. **Files deleted:** commit `ed74178` (2026-08-09 10:37 +1000, "copy: homepage hero de-templated … delete dead v3 homepage data + unused components") deleted `src/components/home/{HomeStrip,HomeHero,BuiltForGrid,HomeWritingStrip,OrchestrationDiagram,ReferenceSystemCTA}.tsx`.

### Current homepage

`src/app/(cm)/page.tsx` renders `v2.pages.home` from `src/content/site.ts` via `DocPage`/`DocBanner`/`DocSection`. It contains **no institution names at all** — hero, Selected Work (two case entries), and Services & Practice Hierarchy. No logos, no brand typography, no brand colours.

### Full-surface sweep results

Grep of `src/` for Goldman / Credit Suisse / Barclays / Westpac / Commonwealth Bank / CBA and for wordmark-ish styling (brand hex colours, Georgia font, letterspaced logo text, SVG text):

| Location | Nature | Assessment |
|---|---|---|
| `src/content/site.ts` (labs vignettes, Terry bio ~line 156, about principals ~lines 885–896, M&A approach ~line 1166) | Institution names in plain prose sentences | Fine — biographical prose, no visual treatment |
| `src/components/ma/MaStrip.tsx` (live on `/ma`) | Westpac / Commonwealth Bank named in Anna's bio prose; its header comment explicitly says "No firm-logo lineage cell" | Fine — plain text |
| `src/content/site.ts` line ~541 (`ecosystem` array, `lineage` entry: "Goldman Sachs, Credit Suisse, Barclays Capital — as architectural lineage, not claims of employment or system ownership") | Data only | Appears unreferenced by any component (no `ecosystem` consumer found in `src/app`/`src/components`; the /labs "Ecosystem" heading renders `labs.evidence.partners` instead). Dead data — observation only. |
| `public/logos/clients/sp-global.svg` | Orphan asset | No reference anywhere in `src/` or `public/llms.txt`. Observation only; not rendered. |
| `/ma`, `/mortgages` route groups | Checked for brand hex codes, Georgia, wordmark styling | Clean |

**One deliberate brand-typography case remains, disclosed for honesty:** `src/app/(cm)/labs/page.tsx` lines ~113–124 render the Claude partner attribution in Poppins ("Anthropic brand-typography (Poppins) for the Claude attribution only; Microsoft/S&P stay in the site's mono treatment" — the in-code comment). This is the same pattern class as the removed strip (typography evoking a partner's brand), but it is commented as intentional, applies to a partner rather than an imitated bank credential, and is not in the Phase 6 named-institution list. No action taken; flagged so "no wordmarks remain" is not overstated.

---

## Alignment plan

### Headline finding: the homepage is already on the Doc system. The gap to /labs is small.

Post-rebuild, `src/app/(cm)/page.tsx` uses exactly the tokens /labs uses. Shared inventory (all from `src/components/Doc.tsx`, `tailwind.config.ts`, and the page files):

- **Ground:** `bg-bone` (`#EFEAE0`) via `DocPage`; text `text-charcoal` (`#15171A`) with `/85`, `/60`, `/50` opacity steps
- **Type:** `font-display` (Fraunces serif) for titles; `font-mono` (JetBrains Mono) for labels/indices; `tracking-tight` on display, `tracking-[0.18em]`–`[0.2em]` on mono micro-labels
- **Hairlines:** `border-charcoal/15` everywhere (section borders, `divide-y` ledger rows); `border-charcoal/30` for emphasised frames
- **§ labels:** `§01 / Selected Work`-style mono labels — already present in `v2.pages.home.sections` content and rendered by `DocSection`
- **Card lattice (labs idiom):** `grid … gap-px bg-charcoal/15 border border-charcoal/15` with `bg-bone p-6` cells (used by /labs §02/§03/§05/§07 and /offers)
- **Ledger rows (equally canonical Doc idiom):** `border-y border-charcoal/15 divide-y divide-charcoal/15` list rows (used by homepage and /system)

### Residual differences and steps (no code changed; steps name exact existing classes only)

**Step 1 — Normalise micro-label size (smallest, do first).**
Homepage `<dt>` labels in Selected Work use `font-mono text-[11px] uppercase tracking-[0.18em] text-charcoal/60`. /labs' equivalent in-card labels use `text-[10px]` with the same casing/tracking/colour. Change the homepage `dt` class in `src/app/(cm)/page.tsx` (line ~53) from `text-[11px]` to `text-[10px]`. One token, one line.

**Step 2 — Align link affordance in Practice Hierarchy.**
Homepage practice-hierarchy title links use `border-b border-charcoal/30 hover:border-charcoal` (line ~83). The /labs link idiom is `underline-offset-4 hover:underline` (offers preview titles, "Browse the full surface" link, PR link). Swap the homepage link classes to `text-charcoal underline-offset-4 hover:underline` for consistency. (Alternative: accept the hairline-underline as a deliberate homepage variant — it uses only existing tokens — but /labs parity means the underline idiom.)

**Step 3 — Card treatment: a choice, not a defect.**
The homepage currently has zero cards; both its sections are ledger rows. The ledger idiom is itself canonical Doc-system (used verbatim on /system §, `divide-y divide-charcoal/15 border-t border-charcoal/15`). Two honest options:
- **3a (keep ledger — recommended default):** no change. The homepage reads as an architectural index; /labs reads as a catalogue. Both are inside the system.
- **3b (adopt lattice for Practice Hierarchy):** convert the 3-entry `practiceHierarchy` `<ol>` to the /labs offers-preview pattern: `grid grid-cols-1 md:grid-cols-3 gap-px bg-charcoal/15 border border-charcoal/15` with each `<li>` as `bg-bone p-6 flex flex-col`, index as `font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-3`, title as `font-display text-xl font-medium text-charcoal tracking-tight leading-snug underline-offset-4 hover:underline`, body as `text-sm text-charcoal/85 leading-relaxed`. Every class already exists in `src/app/(cm)/labs/page.tsx` lines 48–66. Selected Work should stay ledger either way — its Context/Execution/Outcome `<dl>` structure is document-native, not card-native.

**Step 4 — Optional end-of-document footer.**
Homepage has no `DocFooter`. Note: /labs itself also omits it (it closes inside §07), so this is NOT a /labs-parity gap; it is a site-wide-consistency option. If wanted, append `<DocFooter label="atheryon / home / end-of-document" />` — the component defaults to `v2.cta` and needs no new tokens (`px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink`).

**Not gaps / out of scope:**
- Hero headline `ATHERYON CAPITAL MARKETS | M&A` is all-caps because the *content string* in `site.ts` is typed in caps — a copy decision, not a token difference; `DocBanner` styles it identically to every other page's title.
- Type scale (`text-5xl…7xl` banner, `text-3xl/4xl` section titles, `text-2xl/3xl` entry titles, `text-base md:text-lg` body at `text-charcoal/85 leading-relaxed`) already matches /labs' scale positions; no changes needed.
- The `homev3` dark-theme tokens in `globals.css`/`tailwind.config.ts` are still consumed by `/ma` and `/mortgages` only — untouched by the homepage and outside Phase 6 scope.

**Total estimated diff if all steps taken: ~15 lines in one file (`src/app/(cm)/page.tsx`), zero new tokens, zero component changes.**
