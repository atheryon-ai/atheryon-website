#!/usr/bin/env node
/**
 * copy-lint.mjs — report banned copy constructions across copy-bearing source files.
 *
 * Scans all .tsx files under src/app/ and all .ts files under src/content/.
 * Prints an aligned table of per-file counts, sorted by total hits descending;
 * files with zero hits are omitted. Always exits 0 — this is a report, not a gate.
 *
 * Columns:
 *   emDash    — occurrences of the em-dash character (U+2014)
 *   contrast  — corrective-contrast constructions ("X, not Y" / "Not X — Y")
 *   actually  — whole-word "actually"
 *   prodGrade — "production-grade"
 *   todos     — TODO(terry) markers (counted everywhere, including comments)
 *
 * Comments (// ... and block comments) are stripped before counting so that
 * code comments quoting banned phrases don't inflate counts — except todos,
 * which are counted on the raw file since that's where they intentionally live.
 */

import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(fileURLToPath(import.meta.url), '..', '..');

function collectFiles(dir, ext) {
  const out = [];
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...collectFiles(full, ext));
    } else if (entry.isFile() && extname(entry.name) === ext) {
      out.push(full);
    }
  }
  return out;
}

/**
 * Strip comments while preserving line structure so multi-line regexes
 * can't fabricate matches across a removed-comment seam.
 * Block comments first (each non-newline char blanked), then line comments.
 * The [^:] guard keeps "https://..." inside strings intact.
 */
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/(^|[^:])\/\/.*$/gm, '$1');
}

function countMatches(text, re) {
  return (text.match(re) || []).length;
}

const COLUMNS = ['emDash', 'contrast', 'actually', 'prodGrade', 'todos'];

function countFile(filePath) {
  let raw;
  try {
    raw = readFileSync(filePath, 'utf8');
  } catch {
    return { emDash: 0, contrast: 0, actually: 0, prodGrade: 0, todos: 0 };
  }
  const stripped = stripComments(raw);
  return {
    emDash: countMatches(stripped, /—/g),
    contrast:
      countMatches(stripped, /\b\w[\w\s'&-]{0,40}, not \w/gi) +
      countMatches(stripped, /\bnot\b[^.\n—]{0,60}—/gi),
    actually: countMatches(stripped, /\bactually\b/gi),
    prodGrade: countMatches(stripped, /production-grade/gi),
    // Counted on the raw file: TODO(terry) intentionally lives in comments.
    todos: countMatches(raw, /TODO\(terry\)/g),
  };
}

const files = [
  ...collectFiles(join(repoRoot, 'src', 'app'), '.tsx'),
  ...collectFiles(join(repoRoot, 'src', 'content'), '.ts'),
];

const rows = files
  .map((f) => {
    const counts = countFile(f);
    const total = COLUMNS.reduce((sum, c) => sum + counts[c], 0);
    return { file: relative(repoRoot, f), ...counts, total };
  })
  .filter((r) => r.total > 0)
  .sort((a, b) => b.total - a.total || a.file.localeCompare(b.file));

const totalRow = { file: 'TOTAL', total: 0 };
for (const c of COLUMNS) totalRow[c] = 0;
for (const r of rows) {
  for (const c of COLUMNS) totalRow[c] += r[c];
  totalRow.total += r.total;
}

const header = ['file', ...COLUMNS, 'total'];
const allRows = [...rows, totalRow];
const widths = header.map((h) =>
  Math.max(h.length, ...allRows.map((r) => String(r[h]).length))
);

function formatRow(values) {
  return values
    .map((v, i) => (i === 0 ? String(v).padEnd(widths[i]) : String(v).padStart(widths[i])))
    .join('  ');
}

console.log(formatRow(header));
console.log(widths.map((w) => '-'.repeat(w)).join('  '));
for (const r of rows) console.log(formatRow(header.map((h) => r[h])));
console.log(widths.map((w) => '-'.repeat(w)).join('  '));
console.log(formatRow(header.map((h) => totalRow[h])));

process.exit(0);
