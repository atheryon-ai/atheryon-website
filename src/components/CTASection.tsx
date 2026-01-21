import Link from 'next/link'

interface CTASectionProps {
  text?: string
  ctaLabel: string
  ctaHref: string
  className?: string
}

export function CTASection({ text, ctaLabel, ctaHref, className = '' }: CTASectionProps) {
  return (
    <section className={`px-6 section-spacing ${className}`}>
      <div className="max-w-3xl mx-auto text-center">
        {text && (
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            {text}
          </p>
        )}
        <Link
          href={ctaHref}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-all shadow-card hover:shadow-card-hover"
        >
          {ctaLabel}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  )
}

interface CTACardProps {
  title?: string
  text: string
  ctaLabel: string
  ctaHref: string
  className?: string
}

export function CTACard({ title, text, ctaLabel, ctaHref, className = '' }: CTACardProps) {
  return (
    <div className={`relative bg-white border border-slate-200/60 rounded-3xl p-8 md:p-12 text-center shadow-card overflow-hidden ${className}`}>
      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-brand-orange via-brand-blue to-brand-orange" />

      {title && (
        <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-5 tracking-tighter">
          {title}
        </h2>
      )}
      <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
        {text}
      </p>
      <Link
        href={ctaHref}
        className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-all shadow-card hover:shadow-card-hover"
      >
        {ctaLabel}
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
  )
}
