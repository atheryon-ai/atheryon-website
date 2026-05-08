# Atheryon — Logo Brief

**Date:** 2026-05-08
**Status:** Draft for Terry's review before AI generation runs

---

## 1. Positioning

Atheryon is a **senior-led capital-markets data advisory** working with tier-1 banks and regulators. The firm's value is judgment under regulatory pressure, not technology. The logo must read as **monumental, atmospheric, certain** — not as a "fintech startup" or a "bank."

**Primary aesthetic anchor: Blade Runner 2049 × 1920s Art Deco.**

Both share the same DNA: monumental geometry, high-contrast restraint, atmospheric weight. Blade Runner 2049 is essentially Art Deco architecture (the Chrysler Building's stepped setbacks, monumental letterforms) surviving into a decayed future. They are not two references — they are a continuum: **future-historical**.

For Atheryon this resolves into:
- The **share-certificate heritage** of 1920s Wall Street — engraved, didone serifs, monumental type, banknote precision
- The **atmospheric monumentality** of Blade Runner 2049 — sodium amber on charcoal, cinematic haze, restrained drama
- The reject of **clean editorial** (too literary), **bank corporate** (too institutional), and **fintech sleek** (too dated)

**Visual equivalents:**
- The Wallace Corp logo from BR2049 — solid monumental letterform
- The "2049" title type — custom slab serif with deco bones
- A 1925 Vanity Fair masthead — high-contrast didone display
- A 1920s share certificate — engraved restraint, no decoration except guilloche borders
- The Chrysler Building's setback geometry as a letterform
- Roger Deakins' BR2049 cinematography — sodium amber bleeds, dust haze, deep blacks

**Voice we are NOT:**
- Bloomberg Terminal (too tech, too dense)
- Goldman Sachs corporate (too institutional-impersonal)
- Any neobank (too saturated, too gradient)
- Any "AI / Data" startup (too iconographic — neural meshes, brain motifs, abstract networks)
- Lazard / Brunswick (too clean — Atheryon has more atmospheric weight)
- Bessey.ai (too playful — Atheryon is heavier, more monumental)

---

## 2. Mark architecture

**Decoupled mark + wordmark.** The mark stands alone as favicon and social avatar. The wordmark stands alone as header and deck cover. They appear together as the lockup.

| Element | Treatment |
|---|---|
| **Symbol mark** | Monumental geometric "A" — built like Chrysler Building setbacks or the BR2049 Wallace Corp mark. Solid, architectural, no decoration. NOT hand-drawn / calligraphic (that was the editorial direction; we've moved past it). NOT a 3D folded ribbon (skeuomorphic, dated). Carries weight at 16px favicon scale. |
| **Wordmark** | "Atheryon" set in a **high-contrast didone or deco-revival display** (Bodoni Moda, Italiana, Cinzel, or similar) — share-certificate heritage, monumental letterforms, generous tracking. Note: Fraunces (currently on site) is too literary/organic for this register; the body text on the site stays in Fraunces but the *logo wordmark* needs harder bone structure. |
| **Optional eyebrow** | Tiny uppercase tracked-out subtitle ("ATHERYON · ADVISORY" or "ATHERYON · SYDNEY") — like a 1920s certificate caption. Used in deck covers and letterhead, not always rendered with the wordmark. |
| **Optional border** | Thin guilloche-style hairline rules — a 1920s banknote device — for letterhead and deck covers only. Never on the digital lockup. |

The mark is **not** a glyph that contains the whole word (no neon-cursive "Atheryon" wordmark-as-mark). The mark and the wordmark are two distinct objects.

---

## 3. Palette

Three colours total. Never four. The shift from "editorial Lazard" to "BR2049 × 1920s" pulls the palette toward **cinematic warmth**, not bright SaaS colour.

| Token | Use | Value (provisional) |
|---|---|---|
| **Primary surface (dark)** | Hero, deck covers, letterhead | Deep ink charcoal `#0E1116` — closer to Roger Deakins' BR2049 night blacks than pure `#000` |
| **Primary surface (light)** | Web body, business cards | Bone / off-white `#EFEAE0` — the colour of an aged 1920s share certificate, NOT pure white, NOT the pristine ivory `#F7F6F3` from the editorial direction |
| **Body / mark on light** | Wordmark, mark, type | Charcoal near-black `#15171A` |
| **Accent — sodium amber** | Mark colour, single emphasis points | `#D98B3E` (sodium / aged gold) — Blade Runner 2049's signature sodium-vapour amber, NOT the current bright `#FF9900` brand orange. Cinematic, not corporate. |

The brand orange `#FF9900` from the current site is **too saturated, too SaaS** for this register. Demote it. The new accent is a duller, more atmospheric sodium amber — like aged brass, like a 1920s gilt picture frame, like Vegas at dusk in BR2049.

**Reject:**
- Bright fintech orange `#FF9900` (the existing brand colour — too saturated for this register)
- Gold (the cliché premium-fintech kind — etched foil, gradient gold)
- Navy + gold combo (cliché squared)
- Gradients of any kind
- Multi-colour palettes (the current logo's orange + blue + navy is exactly the wrong move)
- Anything resembling crypto / blockchain / Web3 visual language
- Skeuomorphism (3D folded paper, embossed metal, drop shadows, glow)

---

## 4. Application checklist

The mark must work in all of these without modification:

- 16×16 favicon (the cruel test — most marks fail here)
- 1-color emboss (printed letterhead, embroidered)
- Knocked-out white on dark background
- Knocked-out dark on light background
- Animated reveal (replacing the existing `atheryon-logo-animation.mp4` — separate work)
- Deck cover at A4 (large display)
- Email signature (small, raster fallback)
- Business card

If the AI-generated raster fails at 16px, plan for a manual SVG cleanup pass before shipping.

---

## 5. Deliverables expected from this round

This brief produces **direction candidates** only — not a final logo. Output expected:

1. 6–10 raster candidates (2–3 from each of three AI tools)
2. One direction picked
3. Manual SVG redraw of the chosen candidate (out of scope for AI; needs Figma/Affinity/Illustrator)
4. Final delivery: `logo.svg`, `logo.png` at 512px, favicon set, dark and light variants

---

## 6. Tuned prompts

Run all three in parallel. Compare. Don't pick the first acceptable one.

### Prompt A — Ideogram (best for type-led marks + custom letterforms)

> Custom logotype for "Atheryon" — a senior capital-markets data advisory. Set the wordmark in a high-contrast didone display serif (Bodoni-style or Italiana), monumental letterforms, generous tracking, the bone structure of a 1925 Vanity Fair masthead or a 1920s Wall Street share certificate. Solid charcoal `#15171A` on bone-white `#EFEAE0` background — bone, not pure ivory; the colour of aged paper. Single thin hairline rule above and below the wordmark (1920s certificate device), or no rule at all. NO decoration, NO symbol, NO underline ornament, NO flourish, NO gradient. Reads as monumental, atmospheric, certain. Aesthetic reference: Blade Runner 2049 title cards crossed with a 1920s gilt-edged share certificate. NOT: gold metallic, navy, gradients, glassmorphism, neural meshes, brain icons, AI / data iconography, glowing borders, embossed metal effects, drop shadows, 3D folded paper, modern sans-serif.

Run **5 variants** at 1:1 aspect.

### Prompt B — OpenAI image gen / DALL-E (best for the symbolic "A" mark)

> A monumental geometric capital letter "A" as a logo mark. Architecture-as-letterform: built from straight lines, sharp angles, possibly stepped setbacks like a Chrysler Building silhouette or the Wallace Corp mark from Blade Runner 2049. Solid flat colour, NO gradient, NO 3D, NO inner motif, NO circuit board, NO neural mesh, NO glow, NO shadow, NO folded ribbon effect. Charcoal `#15171A` on bone `#EFEAE0` background. Square 1:1, the letterform centered, occupying ~50% of the canvas, generous negative space. The "A" must read as an A at 16 pixels. Aesthetic reference: 1920s Art Deco architecture (Chrysler Building, Empire State setbacks) crossed with the monumental letterforms of Blade Runner 2049 (Wallace Corp logo, the "2049" title). NOT: hand-drawn / calligraphic A, A inside a circle, A with wings or lightning or orbit, AI iconography, futuristic neon, embossed gold foil, gradients of any kind, multi-colour, drop shadow, glassmorphism.

Run **5 variants** at 1:1 aspect.

### Prompt C — Gemini Imagen 3 (atmospheric / cinematic alternative)

> Logo mark for "Atheryon" — a single capital letter "A", monumental, geometric, architectural. Rendered as if etched into a 1925 share certificate: high contrast, precise lines, slight engraving texture permitted (NOT a gradient — actual fine line texture). Solid charcoal `#15171A` on aged-paper bone `#EFEAE0`, square 1:1 composition, generous negative space. The "A" must work at 16-pixel favicon size — keep it bold. Aesthetic reference: the Wallace Corp logo from Blade Runner 2049, 1920s Art Deco architecture, a 1925 banknote vignette, Roger Deakins' BR2049 cinematography (sodium amber, deep blacks, atmospheric haze). Optionally: a single thin line below the "A" — not an underline, a rule. Avoid: hand-calligraphic A, modern geometric sans A, AI iconography, neural networks, lightning bolts, drop shadows, 3D, neon, gradients, multi-colour.

Run **5 variants** at 1:1 aspect.

### Optional — Midjourney (highest aesthetic ceiling, lowest control)

> monumental geometric capital letter A logo, art deco 1920s architectural letterform, Chrysler Building setbacks, Blade Runner 2049 Wallace Corp aesthetic, charcoal on aged bone paper, share certificate engraving heritage, sodium amber accent permitted but minimal, restrained drama, atmospheric weight, 16px legible, no gradients, no 3D, no AI iconography, no neon, no calligraphy --ar 1:1 --style raw --no gold-foil, navy, gradient, glow, neural, data-network, 3d, hand-drawn, modern-sans

### Wordmark + symbol lockup variant (run after a mark direction is picked)

Once the symbol mark is locked, the lockup is straightforward — symbol mark above the wordmark, ~1× the cap-height of the wordmark in spacing between them. The wordmark in didone display serif (Bodoni Moda or Italiana), tracked +50, charcoal on bone. Mark in same charcoal OR the sodium amber accent for emphasis variant. Optional thin hairline rule between symbol and wordmark.

---

## 7. Audit criteria — how to judge candidates

For each candidate ask:

1. **16px test** — render it at 16×16 (right-click image, scale down). Still legible? Still recognisable as a letterform A? If no, reject.
2. **One-colour test** — fill it solid black. Still works? If it relied on gradient, reject.
3. **Mismatch test** — does it look like it could be the logo for a senior advisory, or could it equally be on a mid-market SaaS startup? If it's interchangeable, reject.
4. **Date test** — does this look like 2018 fintech? 2021 crypto? 2024 AI startup? Or does it look like it could have shipped any year between 2010 and 2030? Aim for the latter.
5. **Editorial test** — could you imagine this on the cover of *Apollo*, the spine of an *Lazard* annual report, the masthead of *FT Weekend*? If yes, keep.

A candidate must pass tests 1, 2, 3 to be a real candidate. Tests 4 and 5 separate "fine" from "right."

**6. Register test (BR2049 × 1920s).** Could this letterform appear:
   - On a 1925 Wall Street share certificate? ✅
   - In the title cards of Blade Runner 2049? ✅
   - On the masthead of a 1920s Vanity Fair? ✅
   - On the Wallace Corp building in BR2049? ✅
   - If yes to any → in register. If it could equally appear on a 2018 SaaS startup, a Web3 project, or a "we make AI accessible" logo gallery → out of register, reject.

---

## 8. Scope reminder

This brief produces **a logo direction**, not a complete brand system. Out of scope here:
- Animated splash replacement (separate work after static is locked)
- Full type system (already shipped: Fraunces + Inter Tight)
- Colour system extension (already partially defined)
- Iconography for the website
- Stationery / business cards (separate after logo is locked)

---

## 9. Process

1. **Terry**: confirm the four open decisions before generation (see §10)
2. **Atheryon team / contractor**: run prompts A, B, C in parallel
3. **Atheryon team / contractor**: assemble candidates into a comparison board (could use `$D compare` from the gstack design skill, or just a simple Figma frame)
4. **Terry + design eye**: pick a direction using §7 audit criteria
5. **Designer (human)**: vector-redraw the chosen candidate as clean SVG, kern wordmark, build favicon set
6. **Engineering**: replace `public/logo.png`, update `public/favicon.ico` and friends, replace `atheryon-logo-animation.mp4` (separate task)

---

## 10. Open decisions — Terry to confirm before generation

| # | Decision | Default if no answer |
|---|---|---|
| 1 | Light-mode (bone base) or dark-mode (deep ink base) for the primary lockup? | **Dark** — matches the BR2049 register; light is the secondary variant for paper |
| 2 | Single accent colour: keep brand orange `#FF9900`, shift to BR2049 sodium amber `#D98B3E`, or pure no-accent (mark in charcoal/bone only)? | **Sodium amber `#D98B3E`** — atmospheric, cinematic. Used sparingly on the mark only. |
| 3 | Wordmark display face: Bodoni Moda (didone-revival), Italiana (high-contrast), Cinzel (deco-classical), or DM Serif Display (Bessey-adjacent)? | **Bodoni Moda** — share-certificate heritage + monumental enough for BR2049 register |
| 4 | Eyebrow text: "ATHERYON · ADVISORY", "ATHERYON · SYDNEY", neither, or both as variants? | **Neither in the primary lockup**; available as variant for letterhead |
| 5 | Mark architecture: stepped/setback geometric A (Chrysler-style), monolithic flat-sided A (Wallace Corp-style), or no separate mark (wordmark-only)? | **Stepped/setback A** — distinctive, ownable, BR2049 + Deco fusion. Wordmark-only stays as fallback if marks underwhelm. |
