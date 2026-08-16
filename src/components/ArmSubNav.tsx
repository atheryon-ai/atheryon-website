import Link from 'next/link'

// Function sub-navigation (slim top nav; each function carries its own row).
// Overview stays on the function landing. Experience points at the firm
// page with #ma / #data-ai. Approach retired 2026-08-16: each landing
// carries its own method, so there is no Approach item. Rendered under
// DocBanner on function landings and on /data-ai/supply-chain. Contact Us
// is header-only.
// The component name stays ArmSubNav by decision (functions spec §9).
const ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'experience', label: 'Experience' },
] as const

type ArmSection = (typeof ITEMS)[number]['id'] | 'contact'

export function ArmSubNav({
  base,
  active,
}: {
  base: '/ma' | '/data-ai'
  active: ArmSection
}) {
  const hrefs = {
    overview: base,
    experience: base === '/ma' ? '/experience#ma' : '/experience#data-ai',
  } as const

  return (
    <nav aria-label="Arm sections" className="border-b border-charcoal/15">
      <div className="max-w-container mx-auto px-6 py-2 flex flex-wrap gap-x-6 md:gap-x-8 gap-y-1">
        {ITEMS.map((item) => {
          const isActive = item.id === active
          return (
            <Link
              key={item.label}
              href={hrefs[item.id]}
              aria-current={isActive ? 'page' : undefined}
              className={`inline-flex min-h-11 items-center border-b-2 font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                isActive
                  ? 'border-bronze text-charcoal'
                  : 'border-transparent text-charcoal/60 hover:text-charcoal'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
