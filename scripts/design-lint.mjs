#!/usr/bin/env node
// Design-standard lint (docs/superpowers/specs/2026-08-09-design-standard.md).
// Runs as part of `npm run verify:production-ready` and fails the build on:
//   1. raw hex colours in src/**/*.tsx (tokens only — tailwind.config.ts is
//      the single home for colour values)
//   2. gradient or shadow utility classes (two surfaces, one accent, flat)
//   3. font-family declarations in TSX (typefaces live in tailwind.config)
//   4. <img>/next-image usage inside firm-shell components (no imagery
//      program). Sole exception: BrandMark.tsx renders the logo mark
//      (Terry's ruling 2026-08-10).
//   5. more than one usage of the StatementBand component (full-band navy
//      is reserved for homepage viewport 1)
//   6. a shell CTA whose shortLabel is not shorter than its label. The header
//      swaps to shortLabel below 420px to fit the brand · CTA · MENU grid; a
//      shortLabel that is equal or longer makes that swap inert and overflows
//      the viewport (d805bd6 — the two were identical for months, costing 4px
//      of overflow on every shell page).
// Comments are stripped before matching so explanatory notes may reference
// hexes or class names freely.

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const SRC = join(ROOT, 'src')

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })

const stripComments = (code) =>
  code
    // block comments (incl. JSX {/* ... */})
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // line comments — avoid eating URLs (https://…)
    .replace(/(^|[^:])\/\/.*$/gm, '$1')

const tsxFiles = walk(SRC).filter((f) => f.endsWith('.tsx'))

// Firm-shell scope for the imagery rule: the shared shell + document chrome.
const FIRM_SHELL = [
  'src/components/home/',
  'src/components/brand/',
  'src/components/Doc.tsx',
  'src/components/Footer.tsx',
  'src/components/ContactForm.tsx',
]

const violations = []

for (const file of tsxFiles) {
  const rel = relative(ROOT, file)
  const code = stripComments(readFileSync(file, 'utf8'))
  const lines = code.split('\n')

  lines.forEach((line, i) => {
    const at = `${rel}:${i + 1}`
    if (/#[0-9a-fA-F]{3,8}\b/.test(line)) {
      violations.push(`${at}  raw hex colour — use a tailwind.config token: ${line.trim().slice(0, 90)}`)
    }
    if (/\bbg-gradient-|\bshadow-(?!none)[a-z]/.test(line)) {
      violations.push(`${at}  gradient/shadow utility — the standard is flat surfaces: ${line.trim().slice(0, 90)}`)
    }
    if (/font-family|fontFamily/.test(line)) {
      violations.push(`${at}  font-family in TSX — typefaces live in tailwind.config: ${line.trim().slice(0, 90)}`)
    }
    if (
      FIRM_SHELL.some((p) => rel.startsWith(p)) &&
      !rel.endsWith('BrandMark.tsx') &&
      /<img\b|from ['"]next\/image['"]/.test(line)
    ) {
      violations.push(`${at}  imagery in a firm-shell component — only BrandMark carries the logo: ${line.trim().slice(0, 90)}`)
    }
  })
}

// Rule 5: StatementBand renders at most once site-wide.
const bandUsages = tsxFiles
  .filter((f) => !f.endsWith('StatementBand.tsx'))
  .flatMap((f) => {
    const code = stripComments(readFileSync(f, 'utf8'))
    const count = (code.match(/<StatementBand\b/g) ?? []).length
    return count > 0 ? [`${relative(ROOT, f)} (${count})`] : []
  })
const bandTotal = bandUsages.reduce((n, s) => n + Number(s.match(/\((\d+)\)$/)[1]), 0)
if (bandTotal > 1) {
  violations.push(
    `StatementBand rendered ${bandTotal} times — full-band navy is reserved for homepage viewport 1: ${bandUsages.join(', ')}`,
  )
}

// Rule 6: every shell CTA's shortLabel must be strictly shorter than its
// label. Parsed from source rather than imported because this is a .mjs script
// and shellConfig.ts is TypeScript. Each `cta: { ... }` block is matched whole,
// so a future second shell mode is covered automatically.
const shellConfigPath = join(SRC, 'components/shellConfig.ts')
const shellSrc = stripComments(readFileSync(shellConfigPath, 'utf8'))
// Only cta blocks holding a quoted value — this skips the `cta: { label:
// string; ... }` type annotation, whose fields are bare type names.
const ctaBlocks = [...shellSrc.matchAll(/\bcta\s*:\s*\{([\s\S]*?)\}/g)].filter(([, body]) =>
  /['"`]/.test(body),
)

if (ctaBlocks.length === 0) {
  violations.push(
    'src/components/shellConfig.ts  no cta block found — the shortLabel rule cannot run. ' +
      'If the CTA shape changed, update rule 6 in scripts/design-lint.mjs.',
  )
}

for (const [, body] of ctaBlocks) {
  // Only literal values are checkable; a computed label is skipped loudly.
  const label = body.match(/\blabel\s*:\s*['"`](.*?)['"`]/)?.[1]
  const shortLabel = body.match(/\bshortLabel\s*:\s*['"`](.*?)['"`]/)?.[1]

  if (label === undefined || shortLabel === undefined) {
    violations.push(
      `src/components/shellConfig.ts  cta block missing a literal label/shortLabel — ` +
        `rule 6 needs both as string literals (got label=${JSON.stringify(label)}, shortLabel=${JSON.stringify(shortLabel)})`,
    )
    continue
  }

  if (shortLabel.length >= label.length) {
    violations.push(
      `src/components/shellConfig.ts  shortLabel ${JSON.stringify(shortLabel)} (${shortLabel.length} chars) is not shorter than ` +
        `label ${JSON.stringify(label)} (${label.length} chars) — the header swaps to shortLabel below 420px to fit the ` +
        `brand · CTA · MENU grid, so an equal or longer value makes the swap inert and overflows the viewport`,
    )
  }
}

if (violations.length > 0) {
  console.error('Design-standard lint failed:\n')
  for (const v of violations) console.error(`  ✗ ${v}`)
  console.error(
    `\n${violations.length} violation(s). Contract: docs/superpowers/specs/2026-08-09-design-standard.md`,
  )
  process.exit(1)
}

console.log(`✓ Design-standard lint clean (${tsxFiles.length} TSX files).`)
