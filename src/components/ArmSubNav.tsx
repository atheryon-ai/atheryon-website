import Link from 'next/link'

// Arm sub-navigation (Terry 2026-08-09: slim top nav; each arm carries its
// own row). Rendered directly under the DocBanner on an arm's landing page
// and its experience / approach / contact sub-pages.
const ITEMS = [
  { label: 'Overview', segment: '' },
  { label: 'Experience', segment: '/experience' },
  { label: 'Approach', segment: '/approach' },
  { label: 'Contact', segment: '/contact' },
] as const

export function ArmSubNav({ base }: { base: '/ma' | '/capital-markets' }) {
  return (
    <nav aria-label="Arm sections" className="border-b border-charcoal/15">
      <div className="max-w-container mx-auto px-6 py-4 flex flex-wrap gap-x-8 gap-y-2">
        {ITEMS.map((item) => (
          <Link
            key={item.label}
            href={`${base}${item.segment}`}
            className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60 hover:text-charcoal transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
