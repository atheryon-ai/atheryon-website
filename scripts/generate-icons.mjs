#!/usr/bin/env node
// Regenerates the favicon / touch-icon / manifest-icon set from the shipped
// brand mark, so the browser-tab thumbnail matches the mark the header
// renders. Before 2026-08-17 these files still carried the pre-rebrand
// two-heads logo and its retired tagline.
//
// Run after any change to public/atheryon-mark.png:
//   node scripts/generate-icons.mjs
//
// The mark ships with a transparent ground. Icons are composited onto the
// site navy (design standard: one dark ground) because iOS flattens
// transparency to black and a bare alpha channel renders unpredictably
// against light and dark browser chrome.

import { Buffer } from 'node:buffer'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = path.join(root, 'public', 'atheryon-mark.png')
const GROUND = { r: 0x0e, g: 0x2a, b: 0x3a, alpha: 1 } // #0E2A3A

// A maskable icon is cropped to a circle by some launchers, so its content
// has to sit inside the middle 80%. Everything else just needs breathing room.
const TARGETS = [
  { file: 'favicon-16x16.png', size: 16, padding: 0.06 },
  { file: 'favicon-32x32.png', size: 32, padding: 0.06 },
  { file: 'apple-touch-icon.png', size: 180, padding: 0.12 },
  { file: 'icon-192.png', size: 192, padding: 0.12 },
  { file: 'icon-512.png', size: 512, padding: 0.12 },
  { file: 'icon-maskable-512.png', size: 512, padding: 0.22 },
]

const ICO_SIZES = [16, 32, 48]

// Trimming first means padding is measured from the glyph, not from whatever
// transparent margin the source file happens to carry.
const trimmed = await sharp(SOURCE).trim({ threshold: 1 }).png().toBuffer()

async function render(size, padding) {
  const inner = Math.max(1, Math.round(size * (1 - padding * 2)))
  const glyph = await sharp(trimmed)
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer()

  return sharp({
    create: { width: size, height: size, channels: 4, background: GROUND },
  })
    .composite([{ input: glyph, gravity: 'centre' }])
    .png({ compressionLevel: 9 })
    .toBuffer()
}

// Minimal ICO container holding PNG payloads: a 6-byte ICONDIR, one 16-byte
// ICONDIRENTRY per image, then the PNGs. Sharp has no .ico encoder.
function buildIco(images) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(images.length, 4)

  let offset = 6 + images.length * 16
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(size >= 256 ? 0 : size, 0)
    entry.writeUInt8(size >= 256 ? 0 : size, 1)
    entry.writeUInt8(0, 2) // palette size
    entry.writeUInt8(0, 3) // reserved
    entry.writeUInt16LE(1, 4) // colour planes
    entry.writeUInt16LE(32, 6) // bits per pixel
    entry.writeUInt32LE(data.length, 8)
    entry.writeUInt32LE(offset, 12)
    offset += data.length
    return entry
  })

  return Buffer.concat([header, ...entries, ...images.map((image) => image.data)])
}

for (const { file, size, padding } of TARGETS) {
  await writeFile(path.join(root, 'public', file), await render(size, padding))
  console.log(`  ${file} (${size}x${size})`)
}

const icoImages = await Promise.all(
  ICO_SIZES.map(async (size) => ({ size, data: await render(size, 0.06) })),
)
await writeFile(path.join(root, 'public', 'favicon.ico'), buildIco(icoImages))
console.log(`  favicon.ico (${ICO_SIZES.join(', ')})`)

console.log('\u2713 Icons regenerated from public/atheryon-mark.png')
