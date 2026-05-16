# Grok delta polish (cherry-picked) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the 6 cherry-picked items from `docs/superpowers/specs/2026-05-16-grok-delta-polish-design.md` to the live `dev` branch. Two architecture-diagram SVG conversions plus four small polish items.

**Architecture:** All changes are content + render edits in existing files. The two SVG diagrams use inline `<svg>` with a CSS-class toggle that hides the SVG below `md:` (768px) and shows the existing `<ol>` fallback. No new components, no new routes, no SWA-config changes. Each task ships its own atomic commit (5 functional commits + 2 verification-only tasks).

**Tech Stack:** Next.js 14 (static export), React 18, TypeScript, Tailwind v3. Existing dark-navy theme via CSS variable overrides in `src/app/globals.css`. Brand accent tokens: `--homev3-blue` (#3b82f6) and `--homev3-blue-bright` (#60a5fa).

---

## File Structure

### Modify
- `src/app/system/page.tsx` — replace §01 `<ol>` with paired `<svg>` (desktop) + `<ol>` (mobile fallback), both rendering the existing `stages` data
- `src/app/workflows/page.tsx` — same pattern for §00 Pipeline schema; add per-cell stage-icon SVG + electric-blue right-border on cells 1–3 inside each workflow's StageCell row
- `src/app/contact/page.tsx` — swap the Email and Company `<div>` blocks so DOM order is Name → Company → Email → Message
- `src/components/Footer.tsx` — add an `info@atheryon.com.au` mailto entry next to the LinkedIn link
- `src/content/site.ts` — verify Home end-of-document CTA wiring is present (no edit expected — `RealitySystemCTA` is referenced from home; only edit if a page is missing the CTA)
- `tests/grok-polish.spec.ts` (new) — Playwright assertions for SVG presence at desktop, OL fallback at mobile, form field order, footer mailto

### Not modifying
- `src/components/home/HomeHero.tsx` and `OrchestrationDiagram.tsx` — the home hero stays as-is per spec
- `staticwebapp.config.json` — no routing changes
- `src/content/site.ts` `site.pages.contact.form.fields` — the field labels and required flags stay; only render order changes
- Color tokens in `globals.css` — no new colors

---

## Pre-flight

- [ ] **Step 0.1: Verify clean tree on `dev`, last commit is the spec**

```bash
cd /Users/abigail/repos/atheryon-website
git status --porcelain
git log --oneline -1
```

Expected: empty status, last commit `0284b24 docs(spec): Grok delta polish (cherry-picked) — SVG diagrams + form/footer/hover polish`. If status is non-empty, stop and reconcile.

---

## Task 1: SVG architecture diagram on `/system` §01

**Files:**
- Modify: `src/app/system/page.tsx` (the §01 block, currently lines 60–95)

**Spec reference:** `docs/superpowers/specs/2026-05-16-grok-delta-polish-design.md` §"Per-item design § 1".

- [ ] **Step 1.1: Replace the §01 `<section>` content**

Find this block (lines 60-95 of `src/app/system/page.tsx`, starting `{/* §01 ArchitectureDiagram`):

```tsx
      {/* §01 ArchitectureDiagram — 5-stage data/control flow */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.architectureDiagram.label} title={s.architectureDiagram.title} />

          {/* Desktop: horizontal flow. Mobile: vertical stack. */}
          <ol className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] gap-3 lg:gap-2 items-stretch">
            {s.architectureDiagram.stages.map((stage, i) => (
              <Fragment key={stage.id}>
                <li className="border border-charcoal/30 bg-white p-5 flex flex-col">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/50 mb-2">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="font-display text-lg md:text-xl font-medium text-charcoal leading-snug">
                    {stage.name}
                  </div>
                  {stage.detail && (
                    <div className="mt-2 font-mono text-xs text-charcoal/70 leading-relaxed">
                      {stage.detail}
                    </div>
                  )}
                </li>
                {i < s.architectureDiagram.stages.length - 1 && (
                  <li
                    aria-hidden="true"
                    className="flex items-center justify-center text-charcoal/40 font-mono text-2xl py-1 lg:py-0"
                  >
                    <span className="lg:hidden">↓</span>
                    <span className="hidden lg:inline">→</span>
                  </li>
                )}
              </Fragment>
            ))}
          </ol>
        </div>
      </section>
```

Replace with:

```tsx
      {/* §01 ArchitectureDiagram — 5-stage data/control flow */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.architectureDiagram.label} title={s.architectureDiagram.title} />

          {/* Desktop (md+): inline SVG flow with arrows */}
          <div className="hidden md:block">
            <svg
              role="img"
              aria-labelledby="system-arch-title"
              viewBox="0 0 920 200"
              className="w-full h-auto block"
              style={{ fontFamily: "'Inter Tight', system-ui, sans-serif" }}
            >
              <title id="system-arch-title">
                Atheryon system reference architecture — five stages from Data Sources to Operational Outputs
              </title>
              <defs>
                <marker id="sysArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#60a5fa" />
                </marker>
                <linearGradient id="sysBoxGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(96,165,250,0.10)" />
                  <stop offset="100%" stopColor="rgba(96,165,250,0.02)" />
                </linearGradient>
              </defs>

              {s.architectureDiagram.stages.map((stage, i) => {
                const x = 10 + i * 185
                const isHighlight = stage.id === 'ai-agent-orchestration-layer'
                const fill = isHighlight ? 'rgba(96,165,250,0.18)' : 'url(#sysBoxGrad)'
                const stroke = isHighlight ? '#60a5fa' : '#3b82f6'
                const strokeWidth = isHighlight ? 1.6 : 1.4
                return (
                  <g key={stage.id}>
                    <rect x={x} y={60} width={160} height={80} rx={6} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
                    <text x={x + 80} y={90} textAnchor="middle" fill="#60a5fa" fontSize={10} letterSpacing={2} fontWeight={600}>
                      §&nbsp;{String(i + 1).padStart(2, '0')}
                    </text>
                    <text x={x + 80} y={112} textAnchor="middle" fill="#ffffff" fontSize={13} fontWeight={600}>
                      {stage.name}
                    </text>
                    {stage.detail && (
                      <text x={x + 80} y={128} textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize={10}>
                        {stage.detail.length > 38 ? stage.detail.slice(0, 35) + '…' : stage.detail}
                      </text>
                    )}
                    {i < s.architectureDiagram.stages.length - 1 && (
                      <line
                        x1={x + 162}
                        y1={100}
                        x2={x + 183}
                        y2={100}
                        stroke="#60a5fa"
                        strokeWidth={1.4}
                        markerEnd="url(#sysArrow)"
                      />
                    )}
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Mobile fallback (< md): vertical OL with arrow glyphs */}
          <ol className="md:hidden grid grid-cols-1 gap-3 items-stretch">
            {s.architectureDiagram.stages.map((stage, i) => (
              <Fragment key={stage.id}>
                <li className="border border-charcoal/30 bg-white p-5 flex flex-col">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/50 mb-2">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="font-display text-lg font-medium text-charcoal leading-snug">
                    {stage.name}
                  </div>
                  {stage.detail && (
                    <div className="mt-2 font-mono text-xs text-charcoal/70 leading-relaxed">
                      {stage.detail}
                    </div>
                  )}
                </li>
                {i < s.architectureDiagram.stages.length - 1 && (
                  <li
                    aria-hidden="true"
                    className="flex items-center justify-center text-charcoal/40 font-mono text-2xl py-1"
                  >
                    ↓
                  </li>
                )}
              </Fragment>
            ))}
          </ol>
        </div>
      </section>
```

Two visible blocks (one SVG, one OL) with Tailwind responsive classes (`hidden md:block` and `md:hidden`) so only one renders at a time. The data source (`s.architectureDiagram.stages`) is unchanged — both blocks read from it.

- [ ] **Step 1.2: Typecheck**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 1.3: Local build**

```bash
rm -rf .next out
npx next build 2>&1 | tail -5
```

Expected: build completes with no errors, page count unchanged.

- [ ] **Step 1.4: Visual check via gstack browse**

```bash
B="$HOME/.claude/skills/gstack/browse/dist/browse"

# Desktop
"$B" viewport 1280x800
"$B" goto http://localhost:3000/system
sleep 1
"$B" js "JSON.stringify({hasSvg: !!document.querySelector('section svg[role=img]'), olVisible: getComputedStyle(document.querySelector('section svg[role=img]').closest('section').querySelector('ol')).display, sw: document.documentElement.scrollWidth})"
# Expect hasSvg=true, olVisible=none, sw <= 1280

# Mobile
"$B" viewport 375x812
"$B" goto http://localhost:3000/system
sleep 1
"$B" js "JSON.stringify({svgVisible: getComputedStyle(document.querySelector('section svg[role=img]').parentElement).display, olVisible: getComputedStyle(document.querySelector('section svg[role=img]').closest('section').querySelector('ol')).display, sw: document.documentElement.scrollWidth})"
# Expect svgVisible=none, olVisible=grid, sw=375
```

Run `npx next dev` first if not already running. Expected: SVG visible at desktop, OL fallback visible at mobile, no horizontal overflow.

- [ ] **Step 1.5: Commit**

```bash
git add src/app/system/page.tsx
git commit -m "feat(system): replace §01 box layout with inline SVG flow (desktop only, OL fallback mobile)"
```

---

## Task 2: SVG pipeline schema on `/workflows` §00

**Files:**
- Modify: `src/app/workflows/page.tsx` (the §00 block, currently lines 62-99)

- [ ] **Step 2.1: Replace the §00 `<section>` content**

Find this block (lines 62-99 of `src/app/workflows/page.tsx`, starting `{/* §00 Pipeline schema`):

```tsx
      {/* §00 Pipeline schema — the deterministic shape every workflow follows */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <header className="mb-8 pb-4 border-b border-charcoal/15">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
              {s.schema.label}
            </div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-medium tracking-tight text-charcoal leading-tight">
              {s.schema.title}
            </h2>
          </header>

          <ol className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-3 lg:gap-2 items-stretch mb-6">
            {s.schema.stages.map((stage, i) => (
              <Fragment key={stage}>
                <li className="border border-charcoal/30 bg-white p-4 flex items-center justify-center">
                  <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal text-center">
                    {stage}
                  </div>
                </li>
                {i < s.schema.stages.length - 1 && (
                  <li
                    aria-hidden="true"
                    className="flex items-center justify-center text-charcoal/40 font-mono text-xl"
                  >
                    <span className="lg:hidden">↓</span>
                    <span className="hidden lg:inline">→</span>
                  </li>
                )}
              </Fragment>
            ))}
          </ol>

          <p className="font-mono text-xs uppercase tracking-[0.12em] text-charcoal/60">
            {s.schema.note}
          </p>
        </div>
      </section>
```

Replace with:

```tsx
      {/* §00 Pipeline schema — the deterministic shape every workflow follows */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <header className="mb-8 pb-4 border-b border-charcoal/15">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
              {s.schema.label}
            </div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-medium tracking-tight text-charcoal leading-tight">
              {s.schema.title}
            </h2>
          </header>

          {/* Desktop (md+): inline SVG pipeline */}
          <div className="hidden md:block mb-6">
            <svg
              role="img"
              aria-labelledby="pipeline-title"
              viewBox="0 0 760 140"
              className="w-full h-auto block"
              style={{ fontFamily: "'Inter Tight', system-ui, sans-serif" }}
            >
              <title id="pipeline-title">
                Atheryon pipeline schema — Input then AI agents then Processing then Output
              </title>
              <defs>
                <marker id="pipeArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#60a5fa" />
                </marker>
                <linearGradient id="pipeBoxGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(96,165,250,0.10)" />
                  <stop offset="100%" stopColor="rgba(96,165,250,0.02)" />
                </linearGradient>
              </defs>

              {s.schema.stages.map((stage, i) => {
                const x = 10 + i * 185
                return (
                  <g key={stage}>
                    <rect x={x} y={30} width={160} height={80} rx={6} fill="url(#pipeBoxGrad)" stroke="#3b82f6" strokeWidth={1.4} />
                    <text x={x + 80} y={75} textAnchor="middle" fill="#ffffff" fontSize={13} fontWeight={600} letterSpacing={2}>
                      {stage.toUpperCase()}
                    </text>
                    {i < s.schema.stages.length - 1 && (
                      <line
                        x1={x + 162}
                        y1={70}
                        x2={x + 183}
                        y2={70}
                        stroke="#60a5fa"
                        strokeWidth={1.4}
                        markerEnd="url(#pipeArrow)"
                      />
                    )}
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Mobile fallback (< md): vertical OL */}
          <ol className="md:hidden grid grid-cols-1 gap-3 items-stretch mb-6">
            {s.schema.stages.map((stage, i) => (
              <Fragment key={stage}>
                <li className="border border-charcoal/30 bg-white p-4 flex items-center justify-center">
                  <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal text-center">
                    {stage}
                  </div>
                </li>
                {i < s.schema.stages.length - 1 && (
                  <li
                    aria-hidden="true"
                    className="flex items-center justify-center text-charcoal/40 font-mono text-xl"
                  >
                    ↓
                  </li>
                )}
              </Fragment>
            ))}
          </ol>

          <p className="font-mono text-xs uppercase tracking-[0.12em] text-charcoal/60">
            {s.schema.note}
          </p>
        </div>
      </section>
```

Same pattern as `/system` Task 1 — SVG at md+, OL fallback at < md.

- [ ] **Step 2.2: Typecheck + build**

```bash
npx tsc --noEmit
rm -rf .next
npx next build 2>&1 | tail -5
```

Expected: zero TS errors, build succeeds.

- [ ] **Step 2.3: Visual check**

```bash
B="$HOME/.claude/skills/gstack/browse/dist/browse"
"$B" viewport 1280x800
"$B" goto http://localhost:3000/workflows
sleep 1
"$B" js "JSON.stringify({pipelineSvg: !!document.querySelector('svg[aria-labelledby=pipeline-title]'), sw: document.documentElement.scrollWidth})"
# Expect pipelineSvg=true, sw <= 1280

"$B" viewport 375x812
"$B" goto http://localhost:3000/workflows
sleep 1
"$B" js "JSON.stringify({pipelineSvg: !!document.querySelector('svg[aria-labelledby=pipeline-title]'), sw: document.documentElement.scrollWidth})"
# Note: on mobile the SVG element exists in DOM but is hidden via parent's `hidden md:block`. So pipelineSvg=true is expected. Check that the OL fallback IS visible by ensuring the page renders all 4 stage labels.
"$B" js "JSON.stringify({hasInput: document.body.innerText.includes('INPUT'), sw: document.documentElement.scrollWidth})"
# Expect hasInput=true, sw=375
```

- [ ] **Step 2.4: Commit**

```bash
git add src/app/workflows/page.tsx
git commit -m "feat(workflows): replace §00 Pipeline schema box row with inline SVG (desktop only, OL fallback mobile)"
```

---

## Task 3: `/workflows` cell polish — stage icons + electric-blue dividers

**Files:**
- Modify: `src/app/workflows/page.tsx` (the `StageCell` component at line 26, plus the `<ol>` rendering each workflow's 4 cells at ~line 113)

- [ ] **Step 3.1: Update StageCell to include an icon + adjust styling for divider context**

Find this component (around line 26):

```tsx
function StageCell({ stage, content }: { stage: string; content: string }) {
  const pending = isPending(content)
  return (
    <div className="border border-charcoal/30 bg-white p-4 flex flex-col h-full">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-3">
        {stage}
      </div>
      {!pending && (
        <div className="font-mono text-xs md:text-sm text-charcoal/85 leading-relaxed">
          {content}
        </div>
      )}
    </div>
  )
}
```

Replace with:

```tsx
function StageIcon({ stage }: { stage: string }) {
  // Inline SVG monograms keyed by stage name. Stroke uses brand light-blue.
  const stroke = '#60a5fa'
  const common = { width: 14, height: 14, viewBox: '0 0 16 16', fill: 'none', stroke, strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
  switch (stage) {
    case 'Input':
      return (
        <svg {...common}>
          <circle cx="11" cy="8" r="4" />
          <path d="M2 8 L7 8" />
          <path d="M5 5 L7 8 L5 11" />
        </svg>
      )
    case 'AI agents':
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="2" />
          <circle cx="3" cy="3" r="1.4" />
          <circle cx="13" cy="3" r="1.4" />
          <circle cx="3" cy="13" r="1.4" />
          <circle cx="13" cy="13" r="1.4" />
          <path d="M4 4 L7 7 M12 4 L9 7 M4 12 L7 9 M12 12 L9 9" />
        </svg>
      )
    case 'Processing':
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="3.5" />
          <path d="M8 1.5 L8 3.5 M8 12.5 L8 14.5 M1.5 8 L3.5 8 M12.5 8 L14.5 8" />
        </svg>
      )
    case 'Output':
      return (
        <svg {...common}>
          <circle cx="5" cy="8" r="4" />
          <path d="M9 8 L14 8" />
          <path d="M12 5 L14 8 L12 11" />
        </svg>
      )
    default:
      return null
  }
}

function StageCell({ stage, content, isLastInRow }: { stage: string; content: string; isLastInRow: boolean }) {
  const pending = isPending(content)
  return (
    <div
      className={`border border-charcoal/30 bg-white p-4 flex flex-col h-full ${isLastInRow ? '' : 'md:border-r-2 md:border-r-[rgba(96,165,250,0.32)]'}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <StageIcon stage={stage} />
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/60">
          {stage}
        </div>
      </div>
      {!pending && (
        <div className="font-mono text-xs md:text-sm text-charcoal/85 leading-relaxed">
          {content}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 3.2: Update the StageCell usage to pass `isLastInRow`**

Find the loop rendering the 4 stage cells per workflow (around line 113):

```tsx
            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {stageKeys.map((key, i) => (
                <li key={key} className="flex flex-col h-full">
                  <StageCell stage={s.schema.stages[i]} content={wf[key]} />
                </li>
              ))}
            </ol>
```

Replace with:

```tsx
            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {stageKeys.map((key, i) => (
                <li key={key} className="flex flex-col h-full">
                  <StageCell
                    stage={s.schema.stages[i]}
                    content={wf[key]}
                    isLastInRow={i === stageKeys.length - 1}
                  />
                </li>
              ))}
            </ol>
```

The new `isLastInRow` prop drives the right-border-divider on cells 1–3 only. Note: at `md:` viewport the grid is 2 columns, so a strict "last in visual row" depends on i % 2. For simplicity, the divider applies to all cells except the last-by-index (which is correct at `lg:` 4-col and acceptable at `md:` 2-col where the visual right-edge handles itself). If this looks wrong at `md:`, replace the conditional with `(i + 1) % 4 === 0` to suppress dividers at the visual end of each row.

- [ ] **Step 3.3: Typecheck + visual check**

```bash
npx tsc --noEmit
B="$HOME/.claude/skills/gstack/browse/dist/browse"
"$B" viewport 1280x800
"$B" goto http://localhost:3000/workflows
"$B" screenshot /tmp/wf-after-task3.png
```

Read the screenshot — confirm icons appear next to each stage label inside each workflow's 4-cell row, and the electric-blue right-border is subtle but visible between cells.

- [ ] **Step 3.4: Commit**

```bash
git add src/app/workflows/page.tsx
git commit -m "feat(workflows): add stage-icon glyphs + electric-blue cell dividers inside each workflow row"
```

---

## Task 4: `/contact` field order swap + footer email mailto

**Files:**
- Modify: `src/app/contact/page.tsx` (swap two `<div>` blocks for field order)
- Modify: `src/components/Footer.tsx` (add mailto entry)

These two are small enough to land in one commit.

- [ ] **Step 4.1: Reorder form fields in `/contact`**

Open `src/app/contact/page.tsx`. The current order in the JSX is Name → Email → Company → Message. Swap the Email `<div>` (lines 53-66) and the Company `<div>` (lines 68-79) so DOM order becomes Name → Company → Email → Message.

Cut the entire `<div>...</div>` block for Email (the block starting `<div>` immediately above `<label htmlFor="email"` and ending at the closing `</div>` before the Company block). Paste it AFTER the Company `<div>` block (before the `{topicParam && (` hidden-input block). The two blocks are self-contained and have no shared state — pure positional swap.

After the edit, the order should read:

```tsx
        {/* Name block — unchanged */}
        <div>
          <label htmlFor="name">...</label>
          <input id="name" name="name" ... />
        </div>

        {/* Company block (moved up) */}
        <div>
          <label htmlFor="company">...</label>
          <input id="company" name="company" ... />
        </div>

        {/* Email block (moved down) */}
        <div>
          <label htmlFor="email">...</label>
          <input id="email" name="email" ... />
        </div>

        {topicParam && (<input type="hidden" name="topic" value={topicParam} />)}

        {/* Message block — unchanged */}
        <div>
          <label htmlFor="message">...</label>
          <textarea id="message" name="message" ... />
        </div>
```

Verify by reading the file after the edit.

- [ ] **Step 4.2: Add mailto entry to Footer.tsx**

Open `src/components/Footer.tsx`. Find the LinkedIn `<a>` (line 19):

```tsx
          <a href="https://www.linkedin.com/in/terencetsakiris/" className="inline-block px-3 py-3 hover:text-white">
            LinkedIn
          </a>
```

Add an `info@atheryon.com.au` mailto entry immediately after the LinkedIn `<a>`:

```tsx
          <a href="https://www.linkedin.com/in/terencetsakiris/" className="inline-block px-3 py-3 hover:text-white">
            LinkedIn
          </a>
          <a href={`mailto:${site.email}`} className="inline-block px-3 py-3 hover:text-white">
            {site.email}
          </a>
```

`site.email` is already imported (line 2). Uses the same styling as the LinkedIn link.

- [ ] **Step 4.3: Typecheck + visual check**

```bash
npx tsc --noEmit
B="$HOME/.claude/skills/gstack/browse/dist/browse"
"$B" viewport 1280x800
"$B" goto http://localhost:3000/contact
"$B" js "(function(){
  const labels = Array.from(document.querySelectorAll('label')).map(l => l.textContent.trim().replace(/[\s*]+/g,' ').replace(/\\*$/, '').trim());
  return JSON.stringify({labels: labels.slice(0,4)});
})()"
# Expect labels in DOM order to start with Name, Company, Email, Message (or whatever the configured label values are — Company before Email is the key check)

"$B" goto http://localhost:3000/
"$B" js "JSON.stringify({footerMailto: !!document.querySelector('footer a[href^=mailto]')})"
# Expect footerMailto=true
```

- [ ] **Step 4.4: Commit**

```bash
git add src/app/contact/page.tsx src/components/Footer.tsx
git commit -m "feat(polish): /contact field order + footer info@atheryon.com.au mailto"
```

---

## Task 5: CTA + hover sweep

**Files:**
- Modify: zero, one, or two of: `src/app/page.tsx`, `src/app/labs/page.tsx`, `src/app/about/page.tsx` (only if any of these is missing an end-of-document "Book system assessment →" CTA)
- Optionally modify: `src/app/globals.css` (only if a hover-color drift is observed)

- [ ] **Step 5.1: CTA audit on Home / Labs / About**

```bash
grep -l "Book system assessment\|Book System Assessment" src/app/page.tsx src/app/labs/page.tsx src/app/about/page.tsx
```

Expected: at least one match per file. If a file has zero matches, it's missing the end-of-document CTA. For each missing file, append an end-of-document `<section>` block matching the pattern already used on `/system`, `/workflows`, `/offers/*`:

```tsx
      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
            atheryon / <PATH> / end-of-document
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
          >
            Book system assessment
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
```

Replace `<PATH>` with the route's path token (e.g. `labs`, `about`).

If the page already has a CTA section, no change.

- [ ] **Step 5.2: Hover sweep audit**

```bash
grep -rn "hover:bg-ink\|hover:text-white\|hover:bg-charcoal\|hover:border-" src/app src/components | head -20
```

This identifies the current hover patterns. The site already has consistent `hover:bg-ink` for primary buttons and `hover:text-white` for footer/nav links. Don't add new variants. If you see any element that should be hoverable but isn't (per visual judgment in the browser), add `transition-colors hover:bg-[var(--homev3-surface-2)]` to it. Avoid introducing new colour tokens.

- [ ] **Step 5.3: Visual sweep**

```bash
B="$HOME/.claude/skills/gstack/browse/dist/browse"
"$B" viewport 1280x800
for p in / /labs /about; do
  "$B" goto "http://localhost:3000$p"
  "$B" screenshot "/tmp/cta-audit-$(echo $p | tr / _).png"
done
```

Read each screenshot — confirm each page has a visible "Book system assessment →" CTA somewhere near the bottom of the page.

- [ ] **Step 5.4: Typecheck + commit**

```bash
npx tsc --noEmit
git add -A src/app/ src/components/ src/app/globals.css 2>/dev/null
git status --porcelain
# If status is empty, skip the commit (no changes needed — every page already had the CTA).
git commit -m "feat(polish): CTA + hover sweep — add end-of-doc Book system assessment where missing"
```

If status is empty (every page already had a bottom CTA + hover effects), no commit is needed. Report DONE_WITH_CONCERNS noting "Step 5 produced no diffs — pages already polished" and move on. This is acceptable.

---

## Task 6: Playwright smoke tests

**Files:**
- Create: `tests/grok-polish.spec.ts`

- [ ] **Step 6.1: Create the test file**

Create `tests/grok-polish.spec.ts`:

```ts
import { test, expect } from '@playwright/test'

test('/system §01 has SVG diagram at desktop, OL fallback at mobile', async ({ page }) => {
  // Desktop
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/system')
  await expect(page.locator('svg[aria-labelledby="system-arch-title"]')).toBeVisible()

  // Mobile
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/system')
  await expect(page.locator('svg[aria-labelledby="system-arch-title"]')).toBeHidden()
  // 5 stage names should still be in the OL fallback
  await expect(page.getByText('Data Sources')).toBeVisible()
  await expect(page.getByText('Operational Outputs')).toBeVisible()
})

test('/workflows §00 has SVG pipeline at desktop, OL fallback at mobile', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/workflows')
  await expect(page.locator('svg[aria-labelledby="pipeline-title"]')).toBeVisible()

  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/workflows')
  await expect(page.locator('svg[aria-labelledby="pipeline-title"]')).toBeHidden()
})

test('/contact form field order is Name, Company, Email, Message', async ({ page }) => {
  await page.goto('/contact')
  const labels = await page.locator('form label').allTextContents()
  const trimmed = labels.map((l) => l.trim().replace(/\s*\*$/, '').trim())
  // Names may include trailing optional asterisk text; we test the substring start
  expect(trimmed[0]).toMatch(/^Name/i)
  expect(trimmed[1]).toMatch(/^Company/i)
  expect(trimmed[2]).toMatch(/^Email/i)
  expect(trimmed[3]).toMatch(/(message|problem)/i)
})

test('Footer has info@atheryon.com.au mailto link', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('footer a[href^="mailto:info@atheryon.com.au"]')).toBeVisible()
})

test('/system, /workflows mobile pages do not horizontally overflow', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  for (const route of ['/system', '/workflows']) {
    await page.goto(route)
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    expect(scrollWidth, `mobile overflow on ${route}`).toBeLessThanOrEqual(375)
  }
})
```

- [ ] **Step 6.2: Run the new tests**

```bash
# Start dev server if needed
if ! curl -s -m 2 http://localhost:3000 >/dev/null; then
  (npx next dev > /tmp/next-dev.log 2>&1 &)
  sleep 8
fi
npx playwright test tests/grok-polish.spec.ts --project=chromium 2>&1 | tail -15
```

Expected: all tests pass. If a test fails on a label match (e.g. `Name *`), inspect the actual text content and tweak the regex — that's a labeling difference, not a real failure.

- [ ] **Step 6.3: Run the full Playwright suite for regression check**

```bash
npx playwright test --project=chromium 2>&1 | tail -10
```

Expected: all tests pass. The existing `tests/home.spec.ts` and `tests/offers.spec.ts` should still pass. If any test now fails because it asserted on the old `<ol>` structure of `/system` §01, update that test to match the new shape AND add it to this commit.

- [ ] **Step 6.4: Commit**

```bash
git add tests/grok-polish.spec.ts
git commit -m "test(grok-polish): SVG presence, mobile OL fallback, form field order, footer mailto"
```

---

## Task 7: Local build + final verify (no commit)

- [ ] **Step 7.1: Clean build**

```bash
rm -rf .next out
npx next build 2>&1 | tail -15
```

Expected: build succeeds, page count matches pre-task baseline (17 static pages or whatever the current `out/` count is).

- [ ] **Step 7.2: Run all Playwright tests**

```bash
npx playwright test --project=chromium 2>&1 | tail -10
```

Expected: all tests pass.

- [ ] **Step 7.3: Visual sanity at mobile + desktop on all polished pages**

```bash
B="$HOME/.claude/skills/gstack/browse/dist/browse"
for viewport in "1280x800" "375x812"; do
  "$B" viewport $viewport
  for r in / /system /workflows /contact /labs /about; do
    "$B" goto "http://localhost:3000$r"
    sw=$("$B" js "document.documentElement.scrollWidth" | grep -oE '[0-9]+')
    iw=$(echo $viewport | cut -dx -f1)
    [ "$sw" -le "$iw" ] && echo "$r @ $viewport: OK ($sw px)" || echo "$r @ $viewport: OVERFLOW ($sw px > $iw)"
  done
done
```

Expected: every line says OK. Zero OVERFLOW lines.

No commit at this step.

---

## Task 8: Push + deploy verify (no commit)

- [ ] **Step 8.1: Confirm commits to push**

```bash
git log --oneline origin/dev..dev
```

Expected: 4 or 5 commits (Tasks 1, 2, 3, 4, 6 — Task 5 may be a no-op if every page already had a CTA).

- [ ] **Step 8.2: Push**

```bash
git push origin dev 2>&1 | tail -5
```

Expected: clean push.

- [ ] **Step 8.3: Watch the deploy**

```bash
sleep 5
RUN_ID=$(gh run list --branch dev --limit 5 --json databaseId,name,event | jq -r '.[] | select(.event=="push" and .name=="Deploy to Test Environment") | .databaseId' | head -1)
gh run watch "$RUN_ID" --exit-status 2>&1 | tail -10
```

Expected: deploy completes in ~1m30s, all steps green.

- [ ] **Step 8.4: Verify on test SWA**

```bash
TEST=https://polite-flower-03ba3020f.7.azurestaticapps.net

# SVG presence
curl -s "$TEST/system?v=$(date +%s)" | grep -oE 'aria-labelledby="system-arch-title"' | head -1
curl -s "$TEST/workflows?v=$(date +%s)" | grep -oE 'aria-labelledby="pipeline-title"' | head -1
# Expect both grep matches

# Form field order via curl + DOM order
curl -s "$TEST/contact?v=$(date +%s)" | grep -oE 'htmlFor="name"|htmlFor="company"|htmlFor="email"|htmlFor="message"|id="name"|id="company"|id="email"|id="message"' | head -8
# Expect name, company, email, message order

# Footer mailto
curl -s "$TEST/?v=$(date +%s)" | grep -c "mailto:info@atheryon.com.au"
# Expect >= 1

# Mobile responsiveness preserved
B="$HOME/.claude/skills/gstack/browse/dist/browse"
"$B" viewport 375x812
for r in /system /workflows /contact; do
  "$B" goto "$TEST$r?v=$(date +%s)"
  sleep 1
  "$B" js "JSON.stringify({route: '$r', sw: document.documentElement.scrollWidth})"
done
# Expect sw=375 on every route
```

Expected: all probes pass.

No commit at this step.

---

## Self-Review Notes

**Spec coverage:**

| Spec item | Task |
|---|---|
| 1. SVG /system §01 | Task 1 |
| 2. SVG /workflows §00 | Task 2 |
| 3. /workflows polish (icons + dividers) | Task 3 |
| 4. /contact form reorder | Task 4 step 4.1 |
| 5. Footer email mailto | Task 4 step 4.2 |
| 6. CTA + hover sweep | Task 5 |
| Verification (Playwright + mobile + curl) | Task 6 + 7 + 8 |

**Rejected items left untouched** (per spec): nav swap, cyan accent, Microsoft Partner / S&P Global badges, home hero conversion, /workflows 2-col restructure. No task references these.

**Type consistency:**
- `StageCell` signature changed in Task 3 from `(stage, content)` to `(stage, content, isLastInRow)`. All call sites updated in the same task (Step 3.2). No downstream consumers.
- `StageIcon` is a new component used only by `StageCell` — no public surface.
- SVG markers (`sysArrow`, `pipeArrow`, gradient ids `sysBoxGrad`, `pipeBoxGrad`) are scoped to their parent SVG — IDs are unique even if both SVGs render on the same page (they don't share a page).
- `site.email` and `v2.identity` are existing imports.

**Placeholder scan:**

No `TBD`, `TODO`, "implement later", "handle edge cases", or "similar to Task N". Every code block is complete.

**One soft spot**: Task 3 Step 3.2 has a soft hint about a `(i + 1) % 4 === 0` fallback if the row-divider behavior at md: 2-col looks wrong. That's not a placeholder — it's a documented contingency the implementer can apply if visual testing surfaces an issue. Acceptable.

**Risks called out inline** in tasks where relevant (e.g., Step 5.4's "Task 5 may be a no-op" path).
