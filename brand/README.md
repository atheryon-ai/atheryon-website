# Atheryon Brand System

How to use the Atheryon brand system: The Visual Brand Book governs identity and logo usage. The Brand & Design Guide governs website and UI execution, including colour roles, typography hierarchy, layout, and CTA behaviour. The Content Style Guide governs language and tone across the website, decks, and documents. If there is a conflict, identity follows the Visual Brand Book, execution follows the Brand & Design Guide, and wording follows the Content Style Guide. Changes should be minimal and systematic—prefer updating tokens or shared components over introducing one-off styling.

## Canonical Colours

| Name | Hex | Usage |
|------|-----|-------|
| Deep Navy | `#0A1A2F` | Headlines, body text, primary backgrounds |
| Atheryon Orange | `#FF9900` | Accent word (ONE word only), CTAs |
| Atheryon Blue | `#0A84FF` | Secondary CTAs, links |
| Warm Grey Light | `#E6E9ED` | Borders, dividers |
| Warm Grey Mid | `#A7B0B8` | Captions, secondary labels |
| Background Off-White | `#F7F6F3` | Page backgrounds |

## Token Authority

The single source of truth for colours is `tailwind.config.ts`. All colour references should use Tailwind tokens, not hard-coded hex values.

## Governance

- Colour system is frozen
- Token names are frozen
- No new colours without explicit decision
- Future changes occur at token/component level only
