import Link from 'next/link'

interface CTASectionProps {
  text?: string
  ctaLabel: string
  ctaHref: string
  className?: string
}

export function CTASection({ text, ctaLabel, ctaHref, className = '' }: CTASectionProps) {
  return (
    <section className={`px-6 py-16 md:py-24 ${className}`}>
      <div className="max-w-3xl mx-auto text-center">
        {text && (
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            {text}
          </p>
        )}
        <Link
          href={ctaHref}
          className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
        >
          {ctaLabel}
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
    <div className={`bg-gray-50 border border-gray-200 rounded-xl p-8 md:p-12 text-center ${className}`}>
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
      )}
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
        {text}
      </p>
      <Link
        href={ctaHref}
        className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
      >
        {ctaLabel}
      </Link>
    </div>
  )
}
