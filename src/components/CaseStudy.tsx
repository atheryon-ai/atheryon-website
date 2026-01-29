import Image from 'next/image'

interface CaseStudyProps {
  badge: string
  title: string
  description: string
  stats?: Array<{
    value: string
    label: string
  }>
  bullets?: string[]
  imageSrc?: string
  imageAlt?: string
  imagePosition?: 'left' | 'right'
  className?: string
}

export function CaseStudy({
  badge,
  title,
  description,
  stats,
  bullets,
  imageSrc,
  imageAlt = 'Case study visual',
  imagePosition = 'right',
  className = '',
}: CaseStudyProps) {
  const contentOrder = imagePosition === 'left' ? 'lg:order-2' : 'lg:order-1'
  const imageOrder = imagePosition === 'left' ? 'lg:order-1' : 'lg:order-2'

  return (
    <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${className}`}>
      {/* Content */}
      <div className={contentOrder}>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-neutral-500/10 rounded-full mb-6 shadow-soft">
          <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
          <span className="text-sm font-medium text-neutral-700">{badge}</span>
        </div>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 mb-5 leading-[1.1]">
          {title}
        </h3>
        <p className="text-lg text-neutral-600 leading-relaxed mb-8">
          {description}
        </p>

        {/* Stats Grid */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-brand-orange tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-500 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bullet Points */}
        {bullets && bullets.length > 0 && (
          <ul className="space-y-3">
            {bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-neutral-700">{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Image */}
      <div className={imageOrder}>
        <div className="relative aspect-[4/3] bg-white border border-neutral-500/10 rounded-2xl overflow-hidden shadow-card">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-warm-100 to-warm-200">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-warm-300 flex items-center justify-center">
                  <svg className="w-10 h-10 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-sm text-neutral-400 font-medium">Case Study Visual</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
