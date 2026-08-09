#!/usr/bin/env node
// Design-standard lint (docs/superpowers/specs/2026-08-09-design-standard.md).
// Runs as part of `npm run verify:production-ready` and fails the build on:
//   1. raw hex colours in src/**/*.tsx (tokens only — tailwind.config.ts is
//      the single home for colour values)
//   2. gradient or shadow utility classes (two surfaces, one accent, flat)
//   3. font-family declarations in TSX (typefaces live in tailwind.config)
//   4. <img>/next-image usage inside firm-shell components (wordmark is
//      type only; no imagery program)
//   5. more than one usage of the StatementBand component (full-band navy
//      is reserved for homepage viewport 1)
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
    if (FIRM_SHELL.some((p) => rel.startsWith(p)) && /<img\b|from ['"]next\/image['"]/.test(line)) {
      violations.push(`${at}  imagery in a firm-shell component — wordmark is type only: ${line.trim().slice(0, 90)}`)
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

if (violations.length > 0) {
  console.error('Design-standard lint failed:\n')
  for (const v of violations) console.error(`  ✗ ${v}`)
  console.error(
    `\n${violations.length} violation(s). Contract: docs/superpowers/specs/2026-08-09-design-standard.md`,
  )
  process.exit(1)
}

console.log(`✓ Design-standard lint clean (${tsxFiles.length} TSX files).`)
