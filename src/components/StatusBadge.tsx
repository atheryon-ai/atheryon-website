// Shared status pill. Used on /themes, /themes/[id], /roadmap.
// Status taxonomy (locked, addendum 2026-05-17):
//   shipped — blue, proof exists, page renders fully
//   building — amber-striped, in active dev
//   roadmap — amber-outline, declared intent
export type Status = 'shipped' | 'building' | 'roadmap'

// Foreground colours darkened to meet WCAG AA contrast on the cream `bg-bone`
// background that hosts the badges on /themes, /themes/[id], and /roadmap.
// Previously used 400-level Tailwind hues (#60a5fa, #fbbf24) which dropped to
// ~1.4:1 contrast for 10px text — failed contrast. Now uses 700-/800-level hues
// against a light-tinted fill, which clears WCAG AA for small text.
const STYLES: Record<Status, { label: string; bg: string; fg: string; border: string }> = {
  shipped: {
    label: 'SHIPPED',
    bg: 'rgba(59, 130, 246, 0.15)',
    fg: '#1d4ed8', // blue-700
    border: 'rgba(59, 130, 246, 0.55)',
  },
  building: {
    label: 'BUILDING',
    bg: 'rgba(245, 158, 11, 0.18)',
    fg: '#92400e', // amber-800
    border: 'rgba(245, 158, 11, 0.6)',
  },
  roadmap: {
    label: 'ROADMAP',
    bg: 'rgba(245, 158, 11, 0.08)', // was transparent — adds subtle fill so the pill reads
    fg: '#92400e', // amber-800
    border: 'rgba(245, 158, 11, 0.6)',
  },
}

export function StatusBadge({ status }: { status: Status }) {
  const s = STYLES[status]
  return (
    <span
      data-status={status}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 8px',
        fontSize: 10,
        letterSpacing: '0.16em',
        fontWeight: 700,
        textTransform: 'uppercase',
        background: s.bg,
        color: s.fg,
        border: `1px solid ${s.border}`,
        borderRadius: 3,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      }}
    >
      {s.label}
    </span>
  )
}
