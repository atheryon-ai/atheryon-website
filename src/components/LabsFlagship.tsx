import Image from 'next/image'

interface SidebarVignette {
  title: string
  aiProposed: string
  bankerCorrected: string
}

interface LabsFlagshipProps {
  number: string
  name: string
  screenshot: string
  screenshotAlt: string
  problem: string
  howItWorks: string
  metric: string
  footer: string
  reverse?: boolean
  sidebarVignette?: SidebarVignette
}

export function LabsFlagship({
  number,
  name,
  screenshot,
  screenshotAlt,
  problem,
  howItWorks,
  metric,
  footer,
  reverse = false,
  sidebarVignette,
}: LabsFlagshipProps) {
  return (
    <article
      data-testid="labs-flagship"
      className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}
    >
      <div className="rounded-2xl overflow-hidden border border-neutral-500/10 shadow-card bg-white">
        <Image
          src={screenshot}
          alt={screenshotAlt}
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>
      <div>
        <div className="text-sm font-mono text-brand-orange mb-2">§{number}</div>
        <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight mb-6 leading-tight">
          {name}
        </h3>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-2">The problem</h4>
        <p className="text-neutral-700 leading-relaxed mb-6">{problem}</p>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-2">How it works</h4>
        <p className="text-neutral-700 leading-relaxed mb-6">{howItWorks}</p>
        <p className="text-sm text-neutral-600 italic mb-2">{metric}</p>
        <p className="text-xs text-neutral-500 italic">{footer}</p>
        {sidebarVignette && (
          <div className="mt-6 p-5 bg-warm-200 border border-neutral-500/10 rounded-2xl">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-3">
              Where the banker changed the build
            </h4>
            <p className="text-sm font-bold text-neutral-900 mb-2">{sidebarVignette.title}</p>
            <p className="text-sm text-neutral-700 leading-relaxed mb-2">
              <span className="font-semibold text-neutral-600">AI proposed: </span>
              {sidebarVignette.aiProposed}
            </p>
            <p className="text-sm text-neutral-900 leading-relaxed">
              <span className="font-semibold text-brand-orange">Banker corrected: </span>
              {sidebarVignette.bankerCorrected}
            </p>
          </div>
        )}
      </div>
    </article>
  )
}
