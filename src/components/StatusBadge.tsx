// Shared status pill. Used on /themes, /themes/[id], /roadmap.
// Status taxonomy (locked, addendum 2026-05-17):
//   shipped — blue, proof exists, page renders fully
//   building — amber-striped, in active dev
//   roadmap — amber-outline, declared intent
export type Status = 'shipped' | 'building' | 'roadmap'

const STYLES: Record<Status, { label: string; bg: string; fg: string; border: string }> = {
  shipped: {
    label: 'SHIPPED',
    bg: 'rgba(59, 130, 246, 0.15)',
    fg: '#60a5fa',
    border: 'rgba(59, 130, 246, 0.45)',
  },
  building: {
    label: 'BUILDING',
    bg: 'rgba(245, 158, 11, 0.18)',
    fg: '#fbbf24',
    border: 'rgba(245, 158, 11, 0.55)',
  },
  roadmap: {
    label: 'ROADMAP',
    bg: 'transparent',
    fg: '#fbbf24',
    border: 'rgba(245, 158, 11, 0.55)',
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
