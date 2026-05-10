# Wordmark candidates

Working artifacts for the Atheryon logo brief at
[`../2026-05-08-atheryon-logo-brief.md`](../2026-05-08-atheryon-logo-brief.md).

## Files

| File | Purpose |
|---|---|
| `wordmark-v2.html` | Source HTML — eight wordmark variants in the BR2049 × 1920s register. Open in a browser to view at full size and tweak CSS to push variants further. Loads Bodoni Moda, Italiana, Cinzel, DM Serif Display, Inter Tight from Google Fonts. |
| `wordmark-v2.png` | Comparison sheet rendered from the HTML at 1200×4800. |

## Variants

V1–V4 are on bone (`#EFEAE0`); V5–V6 are on deep ink (`#0E1116`); V7 is a certificate-framed bone variant; V8 is a softer DM Serif Display alternative.

| | Variant | Notes |
|---|---|---|
| V1 | Bodoni Moda all caps, bone | Share-certificate baseline |
| V2 | Bodoni italic + eyebrow | Drifts editorial — less BR2049 |
| V3 | Italiana narrow monumental | Strong BR2049 cinematic |
| V4 | Cinzel deco-classical | Common, less distinctive |
| V5 | Bodoni on deep ink | **Strongest** — primary lockup |
| V6 | Bodoni + sodium amber A | **Strongest emphasis variant** |
| V7 | 1920s certificate frame | Letterhead / deck cover variant |
| V8 | DM Serif Display italic | Too soft for the brief |

## To regenerate the PNG

```bash
B="/Users/abigail/.claude/skills/gstack/browse/dist/browse"
$B viewport 1200x4800
$B goto "file://$(pwd)/wordmark-v2.html"
$B screenshot wordmark-v2.png
```

## Status

These are **direction candidates only**. The chosen winner needs a manual SVG redraw (Figma / Affinity / Illustrator) before shipping — Google Fonts at favicon size will fuzz; vectorising is non-negotiable.

The symbol mark (the geometric "A" companion to the wordmark) is **not in this directory** — it requires Ideogram / Gemini / OpenAI image-gen runs as specified in §6 of the brief.
