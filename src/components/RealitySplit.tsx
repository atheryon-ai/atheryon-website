import Link from 'next/link'

interface Step {
  number: string
  title: string
  body: string
}

interface RealitySplitProps {
  title: string
  body: string
  cta: { label: string; href: string }
  steps: Step[]
}

export function RealitySplit({ title, body, cta, steps }: RealitySplitProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      <div>
        <h2 className="font-display text-4xl md:text-5xl text-charcoal tracking-tight leading-[1.05] mb-6">
          {title}
        </h2>
        <p className="text-lg text-charcoal/80 leading-relaxed mb-8 max-w-xl">{body}</p>
        <Link
          href={cta.href}
          className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-charcoal border-2 border-charcoal rounded-full hover:bg-charcoal hover:text-bone transition-colors"
        >
          {cta.label}
        </Link>
      </div>
      <ol className="space-y-4">
        {steps.map((step) => (
          <li
            key={step.number}
            className="grid grid-cols-[48px_1fr] gap-5 items-start p-5 bg-white border border-charcoal/10 rounded-xl"
          >
            <div className="w-12 h-12 grid place-items-center border-2 border-charcoal rounded-full font-bold text-charcoal">
              {step.number}
            </div>
            <div>
              <h3 className="text-lg font-bold text-charcoal mb-1">{step.title}</h3>
              <p className="text-charcoal/75 leading-relaxed">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
