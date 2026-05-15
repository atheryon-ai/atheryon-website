# Homepage Rewrite (variant H — Capital Markets AI Platform) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current bone/architectural-document homepage at `src/app/page.tsx` with the dark-navy AI-platform design ("variant H") prototyped at `public/preview/homepage-h.html`. The new homepage uses the real Atheryon brand lockup, a glowing AI Agent Orchestration Layer diagram, and aligns with the reference image at `/Users/abigail/Downloads/Atheryon Homepage.png`.

**Architecture:** Component-driven Next.js (App Router, static export). Add new Tailwind tokens and a new font (Cinzel) alongside the existing tokens — do **not** remove the legacy bone/charcoal tokens, because other IA pages (`/system`, `/approach`, `/engagements`, `/workflows`, `/about`, `/contact`) still depend on them. Add a new pathname-aware nav so the homepage renders the dark navy lockup while other pages keep the existing `Header` until a future migration plan covers them. New homepage components live in `src/components/home/` to keep the homepage-specific surface area isolated.

**Tech Stack:** Next.js 14 App Router (static export, `output: 'export'`), TypeScript, Tailwind CSS, Playwright (single smoke test only), shared brand assets in `public/`.

**Out of scope (separate plans needed):**
- Restyling `/system`, `/approach`, `/engagements`, `/workflows`, `/about`, `/contact`, `/labs`, `/programs/*`. These keep their bone palette until separately migrated.
- Footer redesign (the existing `Footer.tsx` is kept as-is; the new homepage does not change it).
- Full Playwright E2E suite restoration (one smoke test only, covering the new homepage).
- Deploy to production (this plan stops at `dev` branch push; production cut happens via a separate ship workflow).

---

## File Structure

**Create:**
- `src/components/home/BrandMark.tsx` — img-wrapper for the cropped mark, size prop
- `src/components/home/BrandLockup.tsx` — composes mark + ATHERYON wordmark + DATA./INTELLIGENCE./TRANSFORMATION. tagline
- `src/components/home/HomeNav.tsx` — sticky dark-navy top nav specifically for the homepage
- `src/components/home/HomeHero.tsx` — hero section: text column + orchestration diagram
- `src/components/home/OrchestrationDiagram.tsx` — the SVG wires + 4 input nodes + glowing center ring + 4 output nodes
- `src/components/home/BuiltForGrid.tsx` — 3-card row (Capital Markets Systems / Data Platforms / AI Agent Systems)
- `src/components/home/HomeStrip.tsx` — 3-strip cells: Proven Experience + Ecosystem Partners + Engagement Model
- `src/components/home/ReferenceSystemCTA.tsx` — bottom glow-mark CTA card linking to `/system`
- `src/components/home/index.ts` — barrel export for the home/ subdir
- `src/components/RouteAwareHeader.tsx` — client component that renders `HomeNav` on `/` and existing `Header` everywhere else
- `tests/home.spec.ts` — single Playwright smoke test for the new homepage
- `playwright.config.ts` — minimal config (the existing one was deleted; recreate small)

**Modify:**
- `public/atheryon-brand-logo.png`, `public/atheryon-mark.png` — already copied in a prior session; optimize and commit
- `tailwind.config.ts` — add `homev3` color group, add Cinzel to `fontFamily.display-serif`
- `src/app/globals.css` — add CSS variables for the new tokens and `@import` for Cinzel
- `src/app/layout.tsx` — swap `<Header />` for `<RouteAwareHeader />`, remove the hard-coded `bg-slate-50 text-slate-900` from `<body>` (move to per-page)
- `src/app/page.tsx` — full rewrite using the new home components
- `src/content/site.ts` — add `v2.pages.home.v3` content keys for the new homepage strings
- `src/components/index.ts` — export `RouteAwareHeader`
- `DESIGN.md` — append new "Dark navy homepage system" section documenting the new tokens (do not delete the existing bone system)
- `/Users/abigail/.claude/projects/-Users-abigail-repos-atheryon-website/memory/atheryon_website_constitution.md` — soften the "wrong peer set" rule and update the bank-lineage framing to reflect the new direction

---

## Task 1: Optimize and stage brand assets

**Files:**
- Modify: `public/atheryon-brand-logo.png` (currently 960K, 1254×1254)
- Modify: `public/atheryon-mark.png` (already 540×540 with transparent bg, 121K — only needs to be staged)

- [ ] **Step 1: Confirm the source assets exist**

Run:
```bash
ls -lh public/atheryon-brand-logo.png public/atheryon-mark.png
```

Expected: both files present.

- [ ] **Step 2: Resize the full lockup PNG to 800×800 to reduce file size**

The 1254×1254 source is overkill — the largest place we use it is potentially an OG image at 800px wide. Resize using PIL:

```bash
python3 -c "
from PIL import Image
src = 'public/atheryon-brand-logo.png'
im = Image.open(src)
im.thumbnail((800, 800), Image.LANCZOS)
im.save(src, optimize=True)
print('resized to', im.size)
"
ls -lh public/atheryon-brand-logo.png
```

Expected: file size drops to ~300K or less, dimensions 800×800.

- [ ] **Step 3: Confirm the mark asset is already 540×540 with transparent background**

```bash
python3 -c "
from PIL import Image
im = Image.open('public/atheryon-mark.png')
print('size:', im.size, 'mode:', im.mode)
# Verify at least one fully transparent pixel exists
data = im.convert('RGBA').getdata()
transparent = sum(1 for px in data if px[3] == 0)
print('transparent_pixels:', transparent)
"
```

Expected: `size: (540, 540) mode: RGBA` and `transparent_pixels` > 0.

- [ ] **Step 4: Commit the brand assets**

```bash
git add public/atheryon-brand-logo.png public/atheryon-mark.png
git commit -m "feat(brand): add Atheryon mark + lockup PNG assets"
```

---

## Task 2: Update DESIGN.md and constitution memory

**Files:**
- Modify: `DESIGN.md` (append new section, do not delete existing bone system)
- Modify: `/Users/abigail/.claude/projects/-Users-abigail-repos-atheryon-website/memory/atheryon_website_constitution.md`

- [ ] **Step 1: Append the new "Dark navy homepage system" section to DESIGN.md**

Add the following at the end of `DESIGN.md`:

```markdown

---

## Dark navy homepage system (added 2026-05-15)

The homepage (`/`) uses a separate visual system from the rest of the IA. Other
pages (`/system`, `/approach`, `/engagements`, `/workflows`, `/about`,
`/contact`) continue to use the bone/charcoal architectural-document system
documented above until they are individually migrated.

### Aesthetic posture (homepage only)

- Capital markets AI platform aesthetic. Peer set: Databricks, Snowflake,
  Palantir Gotham.
- Decorative load is deliberate: one glowing AI Agent Orchestration ring,
  one accent gradient in the page background, soft wires connecting nodes.
- The hero is the orchestration diagram, not body copy.
- Branded — the Atheryon lockup (mark + Cinzel-serif wordmark + tri-color
  tagline) is shown in the nav and again at the orchestration center.

### Color tokens (homepage)

| Token             | Value                  | Use                                                 |
| ----------------- | ---------------------- | --------------------------------------------------- |
| `homev3-bg`       | `#060b1c`              | Page background (deep navy, almost black).          |
| `homev3-bg-soft`  | `#0a1228`              | Section-level slight elevation.                     |
| `homev3-surface`  | `#0e1830`              | Cards and nodes.                                    |
| `homev3-surface-2`| `#122042`              | Icon backgrounds inside cards.                      |
| `homev3-border`   | `rgba(96,165,250,.18)` | All hairline borders (cards, nodes, dividers).      |
| `homev3-border-strong` | `rgba(96,165,250,.35)` | CTA card border.                              |
| `homev3-blue`     | `#3b82f6`              | Primary accent (links, CTA, ring).                  |
| `homev3-blue-bright` | `#60a5fa`           | Hover, secondary highlights.                        |
| `homev3-blue-deep`| `#1d4ed8`              | CTA hover.                                          |
| `homev3-orange`   | `#f59e0b`              | Logo accent only (not for UI surfaces).             |
| `homev3-orange-bright` | `#fbbf24`         | Logo highlight, tagline `DATA.` word.               |

### Typography (homepage)

| Family          | Stack                                                  | Use                                  |
| --------------- | ------------------------------------------------------ | ------------------------------------ |
| Lockup serif    | `Cinzel`, Trajan Pro, Georgia, serif                   | `ATHERYON` wordmark only.            |
| Body sans       | `Inter`, system-ui, sans-serif                         | Everything else on the homepage.     |

No Fraunces, no JetBrains Mono on the homepage. Those families stay
homepage-internal; the legacy bone pages continue to use them.

### Decorative rules (homepage)

- Exactly one glow source on the page — the AI Agent Orchestration ring.
- Background gradients allowed only as page-wide ambient (top-center bloom).
- Drop shadows: prohibited on cards, nodes, and CTAs. Only the glow ring
  uses `box-shadow` (for radiance, not depth).
```

- [ ] **Step 2: Update the constitution memory file**

Edit `/Users/abigail/.claude/projects/-Users-abigail-repos-atheryon-website/memory/atheryon_website_constitution.md` and replace the "Wrong peer set" line and the bank-lineage framing.

Find this section:

```
- Closer peer references: Bloomberg terminal docs, S&P Capital IQ surfaces,
  sell-side research portals, McKinsey/BCG plainness, Palantir
  enterprise/government posture.
- Wrong peer set: Apple-keynote AI particles, Databricks/Snowflake
  cloud-platform polish, OpenAI/Anthropic launch aesthetics, generic SaaS hero.
```

Replace with:

```
- Per-page peer references:
  - Homepage (`/`): Databricks, Snowflake, Palantir Gotham — AI platform polish
    with a single glowing orchestration ring.
  - Interior pages (`/system`, `/approach`, `/engagements`, `/workflows`,
    `/about`, `/contact`): Bloomberg terminal docs, S&P Capital IQ surfaces,
    sell-side research portals, Palantir enterprise/government posture.
- Wrong peer set anywhere: Apple-keynote AI particles, OpenAI/Anthropic
  launch aesthetics, generic SaaS hero.
```

Find this section:

```
Ecosystem:
- Microsoft Azure AI infrastructure
- S&P Global data integration
- Banking experience: Goldman Sachs, Credit Suisse, Barclays Capital — framed as **architectural lineage**, NOT claims of employment or system ownership
```

Replace with:

```
Ecosystem:
- Microsoft Azure AI infrastructure
- S&P Global data integration
- Banking experience: Goldman Sachs, Credit Suisse, Barclays Capital — framed as **deep experience building large-scale capital markets systems at leading global institutions**. Avoid wording that implies current employment or system ownership.
```

- [ ] **Step 3: Commit**

```bash
git add DESIGN.md
git commit -m "docs(design): add dark navy homepage system to DESIGN.md"
```

Note: the constitution memory file lives outside the repo (in `~/.claude/projects/...`) — it is not git-tracked. No commit is needed for that file.

---

## Task 3: Extend Tailwind config with new tokens

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Add the new color group and font family**

Open `tailwind.config.ts`. Find the closing `}` of the `colors:` object inside `theme.extend`. Just before that closing `}`, add a new `homev3` group:

```ts
        'homev3': {
          bg: '#060b1c',
          'bg-soft': '#0a1228',
          surface: '#0e1830',
          'surface-2': '#122042',
          border: 'rgba(96, 165, 250, 0.18)',
          'border-strong': 'rgba(96, 165, 250, 0.35)',
          blue: '#3b82f6',
          'blue-bright': '#60a5fa',
          'blue-deep': '#1d4ed8',
          orange: '#f59e0b',
          'orange-bright': '#fbbf24',
          'text-soft': 'rgba(255, 255, 255, 0.78)',
          'text-faint': 'rgba(255, 255, 255, 0.55)',
        },
```

In the `fontFamily:` object, add a new key for the Cinzel serif. The existing block looks like:

```ts
      fontFamily: {
        sans: ['"Inter Tight"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        body: ['"Inter Tight"', 'Inter', 'system-ui', 'sans-serif'],
      },
```

Add a new line after `body`:

```ts
        'serif-cap': ['Cinzel', 'Trajan Pro', 'Georgia', 'serif'],
```

- [ ] **Step 2: Verify the config compiles**

```bash
npx next build 2>&1 | tail -20
```

Expected: build succeeds with no errors about Tailwind config. (Existing build behaviour is preserved; legacy pages still work.)

If the build fails on something unrelated to the config (e.g. a content typecheck error), fix that error before continuing — `next build` must pass before we add more changes.

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat(tailwind): add homev3 color group and Cinzel font family"
```

---

## Task 4: Extend globals.css with the new tokens and Cinzel font

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add the Cinzel font import and CSS variables for the new tokens**

Open `src/app/globals.css`. At the top of the file (above any existing `@import` lines or `@tailwind` directives), add:

```css
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&display=swap');
```

If the file already imports Inter Tight + Fraunces + JetBrains Mono, leave those imports alone and add Cinzel next to them.

Find the `:root` selector (or add one near the top if it doesn't exist). Add these custom properties inside `:root`:

```css
:root {
  /* Homepage v3 tokens (dark navy AI platform). Scoped via .home-v3 wrapper class. */
  --homev3-bg: #060b1c;
  --homev3-bg-soft: #0a1228;
  --homev3-surface: #0e1830;
  --homev3-surface-2: #122042;
  --homev3-border: rgba(96, 165, 250, 0.18);
  --homev3-border-strong: rgba(96, 165, 250, 0.35);
  --homev3-blue: #3b82f6;
  --homev3-blue-bright: #60a5fa;
  --homev3-blue-deep: #1d4ed8;
  --homev3-orange: #f59e0b;
  --homev3-orange-bright: #fbbf24;
  --homev3-text-soft: rgba(255, 255, 255, 0.78);
  --homev3-text-faint: rgba(255, 255, 255, 0.55);
}
```

(If `:root` already has other custom properties, add these alongside them. Do not delete anything.)

- [ ] **Step 2: Add a `.home-v3` body-scope helper class**

At the end of `src/app/globals.css`, append:

```css
/* When applied to <body>, opts the page into the dark navy homepage system. */
body.home-v3 {
  background: var(--homev3-bg);
  color: #ffffff;
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

body.home-v3::before {
  content: '';
  position: fixed; inset: 0;
  background:
    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59, 130, 246, 0.10), transparent 60%),
    radial-gradient(ellipse 60% 40% at 50% 30%, rgba(59, 130, 246, 0.06), transparent 70%);
  pointer-events: none;
  z-index: 0;
}
```

- [ ] **Step 3: Verify the file is syntactically valid**

```bash
npx next build 2>&1 | tail -10
```

Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(styles): add homev3 CSS variables and Cinzel font import"
```

---

## Task 5: Create BrandMark and BrandLockup components

**Files:**
- Create: `src/components/home/BrandMark.tsx`
- Create: `src/components/home/BrandLockup.tsx`
- Create: `src/components/home/index.ts`

- [ ] **Step 1: Create the BrandMark component**

Create `src/components/home/BrandMark.tsx`:

```tsx
import Image from 'next/image'

type Props = {
  size?: number
  className?: string
  alt?: string
}

export function BrandMark({ size = 48, className, alt = 'Atheryon' }: Props) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        flexShrink: 0,
      }}
    >
      <Image
        src="/atheryon-mark.png"
        alt={alt}
        width={size}
        height={size}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        priority={size >= 80}
      />
    </span>
  )
}
```

- [ ] **Step 2: Create the BrandLockup component**

Create `src/components/home/BrandLockup.tsx`:

```tsx
import { BrandMark } from './BrandMark'

type Props = {
  markSize?: number
}

export function BrandLockup({ markSize = 52 }: Props) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
      <BrandMark size={markSize} />
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span
          style={{
            fontFamily: 'Cinzel, "Trajan Pro", Georgia, serif',
            fontWeight: 600,
            fontSize: 24,
            letterSpacing: '0.08em',
            color: '#ffffff',
          }}
        >
          ATHERYON
        </span>
        <span
          style={{
            fontSize: 9,
            letterSpacing: '0.22em',
            fontWeight: 500,
            marginTop: 6,
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ color: 'var(--homev3-orange-bright)' }}>DATA.</span>{' '}
          <span style={{ color: 'var(--homev3-blue-bright)' }}>INTELLIGENCE.</span>{' '}
          <span style={{ color: '#ffffff' }}>TRANSFORMATION.</span>
        </span>
      </span>
    </span>
  )
}
```

- [ ] **Step 3: Create the barrel export**

Create `src/components/home/index.ts`:

```ts
export { BrandMark } from './BrandMark'
export { BrandLockup } from './BrandLockup'
```

- [ ] **Step 4: Verify by importing in a scratch usage**

Run a typecheck to confirm the new components compile:

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors mentioning `BrandMark`, `BrandLockup`, or `src/components/home/`.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/BrandMark.tsx src/components/home/BrandLockup.tsx src/components/home/index.ts
git commit -m "feat(home): add BrandMark and BrandLockup components"
```

---

## Task 6: Create HomeNav (dark navy homepage nav)

**Files:**
- Create: `src/components/home/HomeNav.tsx`
- Modify: `src/components/home/index.ts`

- [ ] **Step 1: Create the HomeNav component**

Create `src/components/home/HomeNav.tsx`:

```tsx
'use client'

import Link from 'next/link'
import { BrandLockup } from './BrandLockup'

const links = [
  { label: 'SYSTEM', href: '/system' },
  { label: 'APPROACH', href: '/approach' },
  { label: 'ENGAGEMENTS', href: '/engagements' },
  { label: 'WORKFLOWS', href: '/workflows' },
  { label: 'ABOUT', href: '/about' },
  { label: 'INSIGHTS', href: '/labs' },
]

export function HomeNav() {
  return (
    <nav
      style={{
        padding: '22px 0',
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: 'rgba(6, 11, 28, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--homev3-border)',
      }}
    >
      <div
        style={{
          maxWidth: 1340,
          margin: '0 auto',
          padding: '0 40px',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: 40,
          alignItems: 'center',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none' }}>
          <BrandLockup markSize={52} />
        </Link>

        <div style={{ display: 'flex', gap: 36, justifyContent: 'center' }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                color: 'var(--homev3-text-soft)',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: 14,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 22px',
            borderRadius: 4,
            background: 'transparent',
            border: '1px solid var(--homev3-blue)',
            color: 'var(--homev3-blue-bright)',
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          BOOK SYSTEM ASSESSMENT <span>→</span>
        </Link>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Update the barrel export**

Edit `src/components/home/index.ts` to add the new export:

```ts
export { BrandMark } from './BrandMark'
export { BrandLockup } from './BrandLockup'
export { HomeNav } from './HomeNav'
```

- [ ] **Step 3: Typecheck**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/home/HomeNav.tsx src/components/home/index.ts
git commit -m "feat(home): add HomeNav dark-navy top nav"
```

---

## Task 7: Create OrchestrationDiagram

**Files:**
- Create: `src/components/home/OrchestrationDiagram.tsx`
- Modify: `src/components/home/index.ts`

- [ ] **Step 1: Create the component**

Create `src/components/home/OrchestrationDiagram.tsx`. This is the most complex component — the SVG wires + 4 input nodes + glowing center ring + 4 output nodes. Use the same structure as `public/preview/homepage-h.html` (`<div class="orch">` block) but adapted to JSX.

```tsx
import { BrandMark } from './BrandMark'

type NodeData = {
  title: string
  sub: string
  icon: React.ReactNode
}

const inputs: NodeData[] = [
  {
    title: 'Market Data',
    sub: 'S&P Global',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
      </svg>
    ),
  },
  {
    title: 'Enterprise Data',
    sub: 'Internal Systems',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M14 7h7v7" />
      </svg>
    ),
  },
  {
    title: 'Reference Data',
    sub: 'Static & Dynamic',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
        <path d="M8 6h8M6 8v8M18 8v8M8 18h8" />
      </svg>
    ),
  },
  {
    title: 'Unstructured Data',
    sub: 'Research & News',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2 L20 6 V12 C20 17 16 21 12 22 C8 21 4 17 4 12 V6 Z" />
      </svg>
    ),
  },
]

const outputs: NodeData[] = [
  {
    title: 'Trading',
    sub: 'Systems',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    title: 'Risk',
    sub: 'Management',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2 L20 6 V12 C20 17 16 21 12 22 C8 21 4 17 4 12 V6 Z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Portfolio',
    sub: 'Analytics',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 17l6-6 4 4 6-8" />
        <circle cx="3" cy="17" r="1.5" />
        <circle cx="9" cy="11" r="1.5" />
        <circle cx="13" cy="15" r="1.5" />
        <circle cx="19" cy="7" r="1.5" />
      </svg>
    ),
  },
  {
    title: 'Operations',
    sub: '& Reporting',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />
      </svg>
    ),
  },
]

function Node({ data }: { data: NodeData }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: 'var(--homev3-surface)',
        border: '1px solid var(--homev3-border)',
        borderRadius: 6,
        padding: '12px 16px',
        minWidth: 200,
      }}
    >
      <span
        style={{
          width: 36,
          height: 36,
          background: 'var(--homev3-surface-2)',
          border: '1px solid var(--homev3-border)',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: 'var(--homev3-blue-bright)',
        }}
      >
        <span style={{ width: 18, height: 18, display: 'block' }}>{data.icon}</span>
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#ffffff' }}>{data.title}</span>
        <span style={{ fontSize: 11, color: 'var(--homev3-text-faint)', marginTop: 3 }}>
          {data.sub}
        </span>
      </span>
    </div>
  )
}

export function OrchestrationDiagram() {
  return (
    <div style={{ position: 'relative', minHeight: 460 }}>
      <svg
        viewBox="0 0 600 460"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <defs>
          <linearGradient id="wireGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(59,130,246,0)" />
            <stop offset="50%" stopColor="rgba(96,165,250,0.65)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0)" />
          </linearGradient>
          <linearGradient id="wireGradOrange" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(245,158,11,0)" />
            <stop offset="50%" stopColor="rgba(251,191,36,0.5)" />
            <stop offset="100%" stopColor="rgba(245,158,11,0)" />
          </linearGradient>
        </defs>
        <path d="M 210 60  C 280 60, 270 220, 300 230" fill="none" stroke="url(#wireGrad)" strokeWidth="1.2" />
        <path d="M 210 140 C 280 140, 270 225, 300 230" fill="none" stroke="url(#wireGrad)" strokeWidth="1.2" />
        <path d="M 210 220 C 280 220, 270 230, 300 230" fill="none" stroke="url(#wireGrad)" strokeWidth="1.6" />
        <path d="M 210 300 C 280 300, 270 240, 300 230" fill="none" stroke="url(#wireGrad)" strokeWidth="1.2" />
        <path d="M 210 380 C 280 380, 270 280, 300 230" fill="none" stroke="url(#wireGrad)" strokeWidth="1.2" />
        <path d="M 300 230 C 330 220, 320 60,  390 60"  fill="none" stroke="url(#wireGradOrange)" strokeWidth="1.2" />
        <path d="M 300 230 C 330 225, 320 140, 390 140" fill="none" stroke="url(#wireGrad)" strokeWidth="1.2" />
        <path d="M 300 230 C 330 235, 320 300, 390 300" fill="none" stroke="url(#wireGradOrange)" strokeWidth="1.2" />
        <path d="M 300 230 C 330 240, 320 380, 390 380" fill="none" stroke="url(#wireGrad)" strokeWidth="1.2" />
        <g fill="#60a5fa">
          <circle cx="260" cy="100" r="1.5" opacity="0.9" />
          <circle cx="270" cy="180" r="1.5" opacity="0.85" />
          <circle cx="265" cy="260" r="1.5" opacity="0.9" />
          <circle cx="270" cy="340" r="1.5" opacity="0.85" />
          <circle cx="345" cy="120" r="1.5" opacity="0.9" />
          <circle cx="350" cy="280" r="1.5" opacity="0.85" />
        </g>
        <g fill="#fbbf24">
          <circle cx="345" cy="80" r="1.5" opacity="0.85" />
          <circle cx="345" cy="320" r="1.5" opacity="0.85" />
        </g>
      </svg>

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          zIndex: 2,
        }}
      >
        {inputs.map((n) => (
          <Node key={n.title} data={n} />
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 200,
          height: 200,
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1px solid var(--homev3-blue)',
            background:
              'radial-gradient(circle at center, rgba(59,130,246,0.25) 0%, rgba(59,130,246,0.08) 50%, transparent 75%)',
            boxShadow:
              '0 0 80px rgba(59,130,246,0.4), inset 0 0 60px rgba(59,130,246,0.25)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            textAlign: 'center',
            padding: '0 12px',
          }}
        >
          <BrandMark size={44} alt="" />
          <span
            style={{
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.3,
              marginTop: 8,
            }}
          >
            AI Agent
            <br />
            Orchestration
            <br />
            Layer
          </span>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: 0,
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          zIndex: 2,
        }}
      >
        {outputs.map((n) => (
          <Node key={n.title} data={n} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Update the barrel export**

Edit `src/components/home/index.ts`:

```ts
export { BrandMark } from './BrandMark'
export { BrandLockup } from './BrandLockup'
export { HomeNav } from './HomeNav'
export { OrchestrationDiagram } from './OrchestrationDiagram'
```

- [ ] **Step 3: Typecheck**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/home/OrchestrationDiagram.tsx src/components/home/index.ts
git commit -m "feat(home): add OrchestrationDiagram component"
```

---

## Task 8: Create HomeHero

**Files:**
- Create: `src/components/home/HomeHero.tsx`
- Modify: `src/components/home/index.ts`

- [ ] **Step 1: Create HomeHero**

Create `src/components/home/HomeHero.tsx`:

```tsx
import Link from 'next/link'
import { OrchestrationDiagram } from './OrchestrationDiagram'

export function HomeHero() {
  return (
    <section style={{ padding: '60px 0 56px' }}>
      <div
        style={{
          maxWidth: 1340,
          margin: '0 auto',
          padding: '0 40px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.15fr',
            gap: 56,
            alignItems: 'center',
          }}
        >
          <div>
            <span
              style={{
                fontSize: 12,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--homev3-blue-bright)',
                fontWeight: 600,
              }}
            >
              Capital Markets AI Systems
            </span>
            <h1
              style={{
                fontSize: 'clamp(36px, 4.4vw, 54px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.08,
                margin: '18px 0 22px',
                color: '#ffffff',
              }}
            >
              Designing and delivering capital markets AI systems using{' '}
              <span style={{ color: 'var(--homev3-blue-bright)' }}>AI agents.</span>
            </h1>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.55,
                color: 'var(--homev3-text-soft)',
                margin: '0 0 32px',
                maxWidth: '50ch',
              }}
            >
              Atheryon builds production-grade, front-to-back systems and data platforms that
              transform how financial institutions operate.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link
                href="/system"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 22px',
                  borderRadius: 4,
                  background: 'var(--homev3-blue)',
                  border: '1px solid var(--homev3-blue)',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                EXPLORE THE SYSTEM ARCHITECTURE <span>→</span>
              </Link>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 22px',
                  borderRadius: 4,
                  background: 'transparent',
                  border: '1px solid var(--homev3-blue)',
                  color: 'var(--homev3-blue-bright)',
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                BOOK SYSTEM ASSESSMENT <span>→</span>
              </Link>
            </div>
          </div>

          <OrchestrationDiagram />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Update the barrel export**

```ts
export { BrandMark } from './BrandMark'
export { BrandLockup } from './BrandLockup'
export { HomeNav } from './HomeNav'
export { OrchestrationDiagram } from './OrchestrationDiagram'
export { HomeHero } from './HomeHero'
```

- [ ] **Step 3: Typecheck**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/home/HomeHero.tsx src/components/home/index.ts
git commit -m "feat(home): add HomeHero composing diagram + headline"
```

---

## Task 9: Create BuiltForGrid

**Files:**
- Create: `src/components/home/BuiltForGrid.tsx`
- Modify: `src/components/home/index.ts`

- [ ] **Step 1: Create BuiltForGrid**

Create `src/components/home/BuiltForGrid.tsx`:

```tsx
import Link from 'next/link'

type Card = {
  title: string
  body: string
  href: string
  icon: React.ReactNode
}

const cards: Card[] = [
  {
    title: 'Capital Markets Systems',
    body: 'Front-to-back trading, risk, pricing and operations systems built for financial institutions.',
    href: '/system',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="6" width="18" height="4" rx="1" />
        <rect x="3" y="14" width="18" height="4" rx="1" />
      </svg>
    ),
  },
  {
    title: 'Data Platforms',
    body: 'Structured, real-time financial data platforms that power analytics, reporting and AI workflows.',
    href: '/system',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
      </svg>
    ),
  },
  {
    title: 'AI Agent Systems',
    body: 'AI agents orchestrate workflows, make decisions and automate complex financial processes.',
    href: '/workflows',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <circle cx="4" cy="6" r="2" />
        <circle cx="20" cy="6" r="2" />
        <circle cx="4" cy="18" r="2" />
        <circle cx="20" cy="18" r="2" />
        <path d="M6 7l4 4M18 7l-4 4M6 17l4-4M18 17l-4-4" />
      </svg>
    ),
  },
]

export function BuiltForGrid() {
  return (
    <section style={{ padding: '16px 0 0', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1340, margin: '0 auto', padding: '0 40px' }}>
        <div
          style={{
            textAlign: 'center',
            fontSize: 14,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--homev3-text-soft)',
            fontWeight: 500,
            marginBottom: 32,
          }}
        >
          Built for the complexity of capital markets
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {cards.map((c) => (
            <article
              key={c.title}
              style={{
                background: 'var(--homev3-surface)',
                border: '1px solid var(--homev3-border)',
                borderRadius: 8,
                padding: '32px 28px',
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  background: 'var(--homev3-surface-2)',
                  border: '1px solid var(--homev3-border)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 22,
                  color: 'var(--homev3-blue-bright)',
                }}
              >
                <span style={{ width: 26, height: 26, display: 'block' }}>{c.icon}</span>
              </div>
              <h3
                style={{
                  fontSize: 13,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  margin: '0 0 14px',
                  color: '#ffffff',
                }}
              >
                {c.title}
              </h3>
              <p
                style={{
                  color: 'var(--homev3-text-soft)',
                  fontSize: 14,
                  lineHeight: 1.6,
                  margin: '0 0 22px',
                }}
              >
                {c.body}
              </p>
              <Link
                href={c.href}
                style={{
                  fontSize: 12,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--homev3-blue-bright)',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                LEARN MORE →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Update the barrel export**

Append to `src/components/home/index.ts`:

```ts
export { BuiltForGrid } from './BuiltForGrid'
```

- [ ] **Step 3: Typecheck**

```bash
npx tsc --noEmit 2>&1 | head -10
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/home/BuiltForGrid.tsx src/components/home/index.ts
git commit -m "feat(home): add BuiltForGrid 3-card domain section"
```

---

## Task 10: Create HomeStrip

**Files:**
- Create: `src/components/home/HomeStrip.tsx`
- Modify: `src/components/home/index.ts`

- [ ] **Step 1: Create HomeStrip**

Create `src/components/home/HomeStrip.tsx`. This section has three cells: Proven Capital Markets Experience (banks), Ecosystem Partners (Azure + S&P), and Engagement Model (4 modes with icons).

```tsx
const engagements = [
  {
    name: 'Advisory',
    desc: 'System strategy and architecture design',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Enablement',
    desc: 'Reference architectures and AI workflows',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="12,3 21,8 12,13 3,8" />
        <polyline points="3,12 12,17 21,12" />
        <polyline points="3,16 12,21 21,16" />
      </svg>
    ),
  },
  {
    name: 'Delivery',
    desc: 'End-to-end system delivery and deployment',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
  },
  {
    name: 'Licensed System',
    desc: 'Deployable reference system architecture',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 7h6M9 11h6M9 15h4" />
      </svg>
    ),
  },
]

function StripCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'var(--homev3-surface)',
        border: '1px solid var(--homev3-border)',
        borderRadius: 8,
        padding: '26px 24px',
      }}
    >
      <span
        style={{
          display: 'block',
          marginBottom: 22,
          fontSize: 12,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--homev3-blue-bright)',
          fontWeight: 600,
        }}
      >
        {label}
      </span>
      {children}
    </div>
  )
}

export function HomeStrip() {
  return (
    <section style={{ padding: '28px 0 0', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1340, margin: '0 auto', padding: '0 40px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 0.85fr 1.4fr',
            gap: 24,
          }}
        >
          <StripCell label="Proven Capital Markets Experience">
            <div style={{ display: 'flex', gap: 28, alignItems: 'center', marginBottom: 18 }}>
              <span
                style={{
                  fontFamily: 'Georgia, serif',
                  fontWeight: 700,
                  fontSize: 17,
                  color: '#ffffff',
                  lineHeight: 1.1,
                }}
              >
                Goldman
                <br />
                Sachs
              </span>
              <span style={{ fontWeight: 700, fontSize: 17, color: '#ffffff', lineHeight: 1.1 }}>
                CREDIT
                <br />
                SUISSE
              </span>
              <span style={{ fontWeight: 700, fontSize: 17, color: '#ffffff', lineHeight: 1.1 }}>
                BARCLAYS
                <br />
                <span
                  style={{
                    fontWeight: 400,
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--homev3-text-faint)',
                    marginTop: 2,
                    display: 'block',
                  }}
                >
                  CAPITAL
                </span>
              </span>
            </div>
            <p style={{ color: 'var(--homev3-text-soft)', fontSize: 13, lineHeight: 1.55, margin: 0 }}>
              Deep experience building large-scale capital markets systems at leading global
              institutions.
            </p>
          </StripCell>

          <StripCell label="Ecosystem Partners">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 1,
                      width: 18,
                      height: 18,
                    }}
                  >
                    <span style={{ background: '#f25022' }} />
                    <span style={{ background: '#7fba00' }} />
                    <span style={{ background: '#00a4ef' }} />
                    <span style={{ background: '#ffb900' }} />
                  </div>
                  <span style={{ fontWeight: 600, fontSize: 16, color: '#ffffff' }}>
                    Microsoft
                    <br />
                    Azure
                  </span>
                </div>
                <p style={{ fontSize: 12, color: 'var(--homev3-text-faint)', margin: 0, lineHeight: 1.5 }}>
                  Cloud infrastructure
                  <br />
                  and AI services
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontWeight: 700, fontSize: 16, color: '#e02020' }}>S&amp;P Global</span>
                <p style={{ fontSize: 12, color: 'var(--homev3-text-faint)', margin: 0, lineHeight: 1.5 }}>
                  Market data
                  <br />
                  and intelligence
                </p>
              </div>
            </div>
          </StripCell>

          <StripCell label="Engagement Model">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {engagements.map((e) => (
                <div
                  key={e.name}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      background: 'var(--homev3-surface-2)',
                      border: '1px solid var(--homev3-border)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 4,
                      color: 'var(--homev3-blue-bright)',
                    }}
                  >
                    <span style={{ width: 20, height: 20, display: 'block' }}>{e.icon}</span>
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#ffffff',
                    }}
                  >
                    {e.name}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--homev3-text-faint)', lineHeight: 1.45 }}>
                    {e.desc}
                  </span>
                </div>
              ))}
            </div>
          </StripCell>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Update the barrel export**

Append:

```ts
export { HomeStrip } from './HomeStrip'
```

- [ ] **Step 3: Typecheck**

```bash
npx tsc --noEmit 2>&1 | head -10
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/home/HomeStrip.tsx src/components/home/index.ts
git commit -m "feat(home): add HomeStrip 3-cell experience/partners/engagement"
```

---

## Task 11: Create ReferenceSystemCTA

**Files:**
- Create: `src/components/home/ReferenceSystemCTA.tsx`
- Modify: `src/components/home/index.ts`

- [ ] **Step 1: Create ReferenceSystemCTA**

Create `src/components/home/ReferenceSystemCTA.tsx`:

```tsx
import Link from 'next/link'
import { BrandMark } from './BrandMark'

export function ReferenceSystemCTA() {
  return (
    <section style={{ padding: '32px 0 60px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1340, margin: '0 auto', padding: '0 40px' }}>
        <div
          style={{
            background:
              'linear-gradient(90deg, var(--homev3-surface) 0%, var(--homev3-surface-2) 100%)',
            border: '1px solid var(--homev3-border-strong)',
            borderRadius: 8,
            padding: '30px 36px',
            display: 'grid',
            gridTemplateColumns: '88px 1fr auto',
            gap: 28,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: '50%',
              background:
                'radial-gradient(circle at center, rgba(59,130,246,0.35), transparent 65%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px rgba(59,130,246,0.35)',
            }}
          >
            <BrandMark size={56} alt="" />
          </div>
          <div>
            <h3
              style={{
                fontSize: 19,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                margin: '0 0 8px',
                fontWeight: 700,
                color: '#ffffff',
              }}
            >
              A Reference System. Proven Architecture.
            </h3>
            <p
              style={{
                margin: 0,
                color: 'var(--homev3-text-soft)',
                fontSize: 14,
                lineHeight: 1.55,
                maxWidth: '60ch',
              }}
            >
              Our end-to-end capital markets AI reference system demonstrates how AI agents,
              data and workflows come together in production.
            </p>
          </div>
          <Link
            href="/system"
            style={{
              color: 'var(--homev3-blue-bright)',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              whiteSpace: 'nowrap',
            }}
          >
            SEE THE SYSTEM ARCHITECTURE →
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Update the barrel export**

Append:

```ts
export { ReferenceSystemCTA } from './ReferenceSystemCTA'
```

- [ ] **Step 3: Typecheck**

```bash
npx tsc --noEmit 2>&1 | head -10
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/home/ReferenceSystemCTA.tsx src/components/home/index.ts
git commit -m "feat(home): add ReferenceSystemCTA bottom card"
```

---

## Task 12: Create RouteAwareHeader

**Files:**
- Create: `src/components/RouteAwareHeader.tsx`
- Modify: `src/components/index.ts`

The layout currently always renders the existing bone-palette `<Header />`. For the homepage we want the new `HomeNav` instead. This component picks based on the current pathname.

- [ ] **Step 1: Create RouteAwareHeader**

Create `src/components/RouteAwareHeader.tsx`:

```tsx
'use client'

import { usePathname } from 'next/navigation'
import { Header } from './Header'
import { HomeNav } from './home/HomeNav'

export function RouteAwareHeader() {
  const pathname = usePathname()
  if (pathname === '/') {
    return <HomeNav />
  }
  return <Header />
}
```

- [ ] **Step 2: Add to the components barrel export**

Edit `src/components/index.ts` and add the new export. The exact existing content will determine the line you append; in general, add:

```ts
export { RouteAwareHeader } from './RouteAwareHeader'
```

- [ ] **Step 3: Typecheck**

```bash
npx tsc --noEmit 2>&1 | head -10
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/RouteAwareHeader.tsx src/components/index.ts
git commit -m "feat(layout): route-aware header swaps HomeNav on /"
```

---

## Task 13: Add v3 home content to site.ts

**Files:**
- Modify: `src/content/site.ts`

Goal: Add a `v3` subkey under `v2.pages.home` so the homepage component reads strings from one canonical place. We do not delete the existing `v2.pages.home` keys (other code may still reference them — e.g. metadata).

- [ ] **Step 1: Locate the home block**

Open `src/content/site.ts` and find the block that starts `home: {` (around line 631 per the codebase survey). Inside the existing `home` object, just before the closing `}`, add a new `v3` key.

```ts
      v3: {
        hero: {
          eyebrow: 'Capital Markets AI Systems',
          headlineLeading: 'Designing and delivering capital markets AI systems using',
          headlineAccent: 'AI agents.',
          lede:
            'Atheryon builds production-grade, front-to-back systems and data platforms that transform how financial institutions operate.',
          primaryCta: { label: 'EXPLORE THE SYSTEM ARCHITECTURE', href: '/system' },
          secondaryCta: { label: 'BOOK SYSTEM ASSESSMENT', href: '/contact' },
        },
        builtFor: {
          headline: 'Built for the complexity of capital markets',
        },
        strip: {
          experience: {
            label: 'Proven Capital Markets Experience',
            body:
              'Deep experience building large-scale capital markets systems at leading global institutions.',
          },
          ecosystem: { label: 'Ecosystem Partners' },
          engagement: { label: 'Engagement Model' },
        },
        cta: {
          title: 'A Reference System. Proven Architecture.',
          body:
            'Our end-to-end capital markets AI reference system demonstrates how AI agents, data and workflows come together in production.',
          link: { label: 'SEE THE SYSTEM ARCHITECTURE', href: '/system' },
        },
      },
```

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/content/site.ts
git commit -m "feat(content): add v3 homepage copy keys under v2.pages.home"
```

Note: Task 14 will wire the components to read these keys. For Tasks 5–11 the copy is currently hard-coded inline. A future refactor task may replace the inline strings with `v3` references, but the plan does not require it (small homepage, low risk of drift).

---

## Task 14: Rewrite src/app/page.tsx and update layout.tsx

**Files:**
- Modify: `src/app/page.tsx` (full rewrite)
- Modify: `src/app/layout.tsx` (use RouteAwareHeader, move bg classes per-page)

- [ ] **Step 1: Rewrite src/app/page.tsx**

Replace the entire contents of `src/app/page.tsx` with:

```tsx
import type { Metadata } from 'next'
import {
  HomeHero,
  BuiltForGrid,
  HomeStrip,
  ReferenceSystemCTA,
} from '@/components/home'
import { v2 } from '@/content/site'

const home = v2.pages.home

export const metadata: Metadata = {
  title: home.title,
  description: home.description,
  openGraph: { title: home.title, description: home.description },
  twitter: {
    card: 'summary_large_image',
    title: home.title,
    description: home.description,
  },
  alternates: { canonical: 'https://atheryon.com.au/' },
}

export default function HomePage() {
  return (
    <>
      {/* The body class `home-v3` is applied via the layout when pathname is `/`.
          See src/app/layout.tsx and src/components/HomeBodyClass.tsx. */}
      <HomeHero />
      <BuiltForGrid />
      <HomeStrip />
      <ReferenceSystemCTA />
    </>
  )
}
```

- [ ] **Step 2: Create a small client component that toggles the body class**

Create `src/components/HomeBodyClass.tsx`:

```tsx
'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function HomeBodyClass() {
  const pathname = usePathname()
  useEffect(() => {
    if (pathname === '/') {
      document.body.classList.add('home-v3')
    } else {
      document.body.classList.remove('home-v3')
    }
    return () => {
      document.body.classList.remove('home-v3')
    }
  }, [pathname])
  return null
}
```

Export it from `src/components/index.ts` by appending:

```ts
export { HomeBodyClass } from './HomeBodyClass'
```

- [ ] **Step 3: Update layout.tsx to use RouteAwareHeader, HomeBodyClass, and a neutral body class**

Replace the body section of `src/app/layout.tsx`:

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="text-charcoal antialiased">
        <HomeBodyClass />
        <RouteAwareHeader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

Update the imports at the top of `layout.tsx`:

```tsx
import { Footer, RouteAwareHeader, HomeBodyClass } from '@/components'
```

Remove the existing `<Header />` import-and-render and the hard-coded `pt-20` on `<main>` (since the new HomeNav is sticky and the legacy Header is fixed; pages each provide their own top spacing now).

Important: removing `pt-20` may visually break legacy pages that relied on it. If after this change the legacy interior pages (`/system`, `/approach`, etc.) show their first section underneath the fixed `Header`, the fix is to add `pt-20` to those individual page wrappers — but do that in a follow-up plan, not here. Visually verify in Task 15.

- [ ] **Step 4: Verify the build succeeds**

```bash
npx next build 2>&1 | tail -20
```

Expected: build succeeds with no TypeScript or runtime errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/app/layout.tsx src/components/HomeBodyClass.tsx src/components/index.ts
git commit -m "feat(home): wire new homepage components + route-aware layout"
```

---

## Task 15: Visual smoke test with /browse + add a Playwright smoke test + build verify

**Files:**
- Create: `tests/home.spec.ts`
- Create: `playwright.config.ts`

- [ ] **Step 1: Start the dev server (background)**

```bash
npx next dev > /tmp/next-dev.log 2>&1 &
echo $! > /tmp/next-dev.pid
sleep 5
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
```

Expected: `200`.

- [ ] **Step 2: Visual smoke test via /browse**

Use the gstack browse tool to load the homepage and capture a full-page screenshot for the reviewer.

```bash
B=/Users/abigail/.claude/skills/gstack/browse/dist/browse
$B console --clear
$B goto "http://localhost:3000/" --viewport "1440x1100"
$B wait --networkidle
$B screenshot /tmp/atheryon-home-live.png
$B console --errors | head -10
```

Expected:
- `Navigated to http://localhost:3000/ (200)`
- `Network idle`
- `Screenshot saved`
- The console errors output is empty (or shows `(no console errors)`).

If the screenshot does not visually match `public/preview/homepage-h.html`, stop and fix before continuing. Common causes: an unresolved CSS variable (typo), a missing import in `index.ts`, the body class not being applied (open devtools and check `<body class>` includes `home-v3`).

- [ ] **Step 3: Create playwright.config.ts**

Create `playwright.config.ts`:

```ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npx next dev',
    url: 'http://localhost:3000',
    timeout: 60_000,
    reuseExistingServer: !process.env.CI,
  },
})
```

- [ ] **Step 4: Create tests/home.spec.ts**

```ts
import { test, expect } from '@playwright/test'

test('homepage renders the dark navy AI-platform hero', async ({ page }) => {
  await page.goto('/')

  // Top nav lockup is visible
  await expect(page.getByText('ATHERYON', { exact: true })).toBeVisible()
  await expect(page.getByText('DATA.', { exact: false })).toBeVisible()

  // Hero copy
  await expect(
    page.getByRole('heading', { level: 1 }),
  ).toContainText('capital markets AI systems')
  await expect(page.getByText('AI agents.', { exact: false })).toBeVisible()

  // 3 domain cards
  await expect(page.getByText('Capital Markets Systems', { exact: false })).toBeVisible()
  await expect(page.getByText('Data Platforms', { exact: false })).toBeVisible()
  await expect(page.getByText('AI Agent Systems', { exact: false })).toBeVisible()

  // Engagement model
  await expect(page.getByText('Engagement Model', { exact: false })).toBeVisible()
  await expect(page.getByText('Advisory', { exact: true })).toBeVisible()
  await expect(page.getByText('Licensed System', { exact: true })).toBeVisible()

  // CTA card
  await expect(
    page.getByText('A Reference System. Proven Architecture.', { exact: false }),
  ).toBeVisible()

  // Background should be deep navy (sanity check, computed style on body)
  const bg = await page.evaluate(() =>
    getComputedStyle(document.body).backgroundColor,
  )
  expect(bg).toMatch(/rgb\((6|7|8), (10|11|12), (28|29|30)\)/)
})
```

- [ ] **Step 5: Run the test**

First stop the manually-launched dev server so Playwright's `webServer` can manage one:

```bash
[ -f /tmp/next-dev.pid ] && kill "$(cat /tmp/next-dev.pid)" 2>/dev/null
sleep 2
npx playwright test tests/home.spec.ts --reporter=list
```

Expected: 1 passed.

If `@playwright/test` is not installed, install it as a devDependency:

```bash
npm i -D @playwright/test
npx playwright install chromium
npx playwright test tests/home.spec.ts --reporter=list
```

- [ ] **Step 6: Run the production build**

```bash
npx next build
```

Expected: build succeeds, output written to `out/`. Verify `out/index.html` exists and contains the new content:

```bash
ls -lh out/index.html
grep -c "AI Agent Orchestration Layer" out/index.html
```

Expected: file present, at least one occurrence of the orchestration text.

- [ ] **Step 7: Run the production-ready guard**

```bash
npm run verify:production-ready
```

Expected: passes (no `REPLACE_ME` placeholders introduced).

- [ ] **Step 8: Commit**

```bash
git add tests/home.spec.ts playwright.config.ts package.json package-lock.json
git commit -m "test(home): add Playwright smoke test for new homepage"
```

(If `package.json`/`package-lock.json` weren't modified — i.e. `@playwright/test` was already installed — drop those from the `git add` line.)

---

## Self-Review

After writing this plan I re-read it end-to-end. Findings and inline fixes:

**Spec coverage check**

- Brand assets (mark + lockup) → Task 1 ✓
- Constitution rewrite (DESIGN.md + memory) → Task 2 ✓
- Tailwind tokens for new palette → Task 3 ✓
- Global CSS + Cinzel font → Task 4 ✓
- BrandMark / BrandLockup components → Task 5 ✓
- HomeNav (dark nav with brand) → Task 6 ✓
- OrchestrationDiagram (the SVG hero diagram) → Task 7 ✓
- HomeHero composing copy + diagram → Task 8 ✓
- BuiltForGrid (3-card row) → Task 9 ✓
- HomeStrip (3-cell experience/partners/engagement) → Task 10 ✓
- ReferenceSystemCTA (bottom glow CTA) → Task 11 ✓
- Route-aware header swap → Task 12 ✓
- Content keys in site.ts → Task 13 ✓
- Wire the homepage in page.tsx + layout.tsx + body-class toggle → Task 14 ✓
- Visual smoke test + Playwright smoke + build → Task 15 ✓

**Placeholder scan** — no `TODO`, `TBD`, "implement later", or unspecified validation. Every step has complete code.

**Type consistency** — `BrandMark` is used in `BrandLockup`, `OrchestrationDiagram`, and `ReferenceSystemCTA`; the same `size` prop and `alt` prop signature are used throughout. The barrel export in `src/components/home/index.ts` is updated incrementally in each task that adds a component, so later tasks can import via `@/components/home` without surprises.

**One nuance worth re-flagging at execution time:** Task 14 Step 3 removes the `pt-20` on `<main>` because the legacy `Header` is fixed-positioned and the new `HomeNav` is sticky. If legacy interior pages (`/system`, `/approach`, etc.) visually break because their first section is now hidden behind the fixed Header, that is a known limitation handed off to the follow-up "interior pages migration" plan — do not paper over it with per-page margins inside this plan.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-15-homepage-rewrite.md`. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
