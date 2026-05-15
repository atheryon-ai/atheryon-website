import { v2 } from '@/content/site'

// ─────────────────────────────────────────────────────────────────────────────
// EngagementModel — canonical render of the 4-tier engagement model.
// Tiers are ordered by increasing execution responsibility:
//   01 Advisory → 02 Enablement → 03 Delivery → 04 Licensed System
// Renders identically on /engagements (full page) and / (preview section).
// Aesthetic matches /system: charcoal hairlines, monospace tier labels, no
// marketing accents.
// ─────────────────────────────────────────────────────────────────────────────

export function EngagementModel() {
  return (
    <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-charcoal/15 border border-charcoal/15">
      {v2.engagement.map((tier, i) => (
        <li
          key={tier.id}
          id={tier.id}
          className="bg-bone p-6 lg:p-7 flex flex-col scroll-mt-24"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-3">
            tier {String(i + 1).padStart(2, '0')}
          </div>
          <h3 className="font-display text-2xl font-medium text-charcoal tracking-tight leading-snug mb-3">
            {tier.name}
          </h3>
          <p className="text-base text-charcoal/80 leading-relaxed">
            {tier.body}
          </p>
        </li>
      ))}
    </ol>
  )
}
