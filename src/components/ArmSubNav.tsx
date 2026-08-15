import Link from 'next/link'

// Function sub-navigation (Terry 2026-08-09: slim top nav; each function
// carries its own row). Rendered directly under the DocBanner on a function's
// landing page and its experience / approach / contact sub-pages, and on
// /data-ai/supply-chain so the application can get back to the function.
// The component name stays ArmSubNav by decision (functions spec §9).
const ITEMS = [
  { id: 'overview', label: 'Overview', segment: '' },
  { id: 'experience', label: 'Experience', segment: '/experience' },
  { id: 'approach', label: 'Approach', segment: '/approach' },
  { id: 'contact', label: 'Contact', segment: '/contact' },
] as const

type ArmSection = (typeof ITEMS)[number]['id']

export function ArmSubNav({
  base,
  active,
}: {
  base: '/ma' | '/data-ai'
  active: ArmSection
}) {
  return (
    <nav aria-label="Arm sections" className="border-b border-charcoal/15">
      <div className="max-w-container mx-auto px-6 py-2 flex flex-wrap gap-x-6 md:gap-x-8 gap-y-1">
        {ITEMS.map((item) => {
          const isActive = item.id === active
          return (
            <Link
              key={item.label}
              href={`${base}${item.segment}`}
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
