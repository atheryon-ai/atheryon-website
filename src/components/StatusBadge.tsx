// Shared status pill. Used on /themes and /themes/[id]. It also served
// /roadmap until that page was removed on 2026-08-15; BUILDING no longer
// appears in any rendered output, since the mortgages entry was its only
// user, but the variant stays because the taxonomy below is locked.
// Status taxonomy (locked, addendum 2026-05-17):
//   shipped — blue, proof exists, page renders fully
//   building — amber-striped, in active dev
//   roadmap — amber-outline, declared intent
export type Status = 'shipped' | 'building' | 'roadmap'

// Foregrounds are light-on-dark. The earlier dark foregrounds (homev3-blue-deep
// and amber-800) were chosen for a cream `bg-bone` ground, but globals.css
// remaps `.bg-bone` to the navy surface, so those pills landed at roughly
// 1.6:1 for 10px text and the BUILDING state was close to unreadable on
// what was then /roadmap. Hues are unchanged (blue = shipped, amber =
// building/roadmap,
// Terry 2026-08-12); only the lightness moved.
//
// Measured with each pill's own fill blended into the surface beneath it.
// Both live pages put these badges on the page ground (#0E2A3A), inside
// bordered rows rather than lifted cards, so the first column is what ships.
// The panel column applies only if a badge is ever placed inside a bg-paper
// card (#16394C), which nothing does today; it is the tighter of the two, so
// it is kept as the design ceiling.
//
//                                    on #0E2A3A   on #16394C
//   shipped  #8FAECB over 15% blue     5.6:1        4.6:1
//   building #E5A862 over 10% amber    6.1:1        5.1:1
//   roadmap  #E5A862 over  8% amber    6.3:1        5.2:1
//
// Verified in the browser on the test deploy, 2026-08-12: all 11 badges then
// rendered across /themes and /roadmap pass, worst case 5.57:1 (SHIPPED).
//
// The BUILDING fill dropped 0.18 → 0.10 to buy margin. At 0.18 it still passed
// on the live ground (5.3:1) but fell to 4.4:1 on a panel, just under AA, so
// the reduction is headroom against the ceiling rather than a live fix.
//
// Foregrounds stay Tailwind token classes per the design standard (no raw hex
// in components); the rgba fills stay inline because they are alpha blends.
const STYLES: Record<Status, { label: string; bg: string; fgClass: string; border: string }> = {
  shipped: {
    label: 'SHIPPED',
    bg: 'rgba(82, 113, 142, 0.15)',
    fgClass: 'text-homev3-blue-bright',
    border: 'rgba(143, 174, 203, 0.5)',
  },
  building: {
    label: 'BUILDING',
    bg: 'rgba(245, 158, 11, 0.10)',
    fgClass: 'text-brand-amber-light',
    border: 'rgba(245, 158, 11, 0.6)',
  },
  roadmap: {
    label: 'ROADMAP',
    bg: 'rgba(245, 158, 11, 0.08)', // subtle fill so the pill reads without a solid block
    fgClass: 'text-brand-amber-light',
    border: 'rgba(245, 158, 11, 0.6)',
  },
}

export function StatusBadge({ status }: { status: Status }) {
  const s = STYLES[status]
  return (
    <span
      data-status={status}
      className={`font-mono ${s.fgClass}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 8px',
        fontSize: 10,
        letterSpacing: '0.16em',
        fontWeight: 700,
        textTransform: 'uppercase',
        background: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: 3,
      }}
    >
      {s.label}
    </span>
  )
}
