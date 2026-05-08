import Link from 'next/link'
import { ArrowRightIcon } from './Icons'

interface LabsEngagementCardProps {
  number: string
  title: string
  body: string
  ctaLabel: string
  ctaHref: string
}

export function LabsEngagementCard({ number, title, body, ctaLabel, ctaHref }: LabsEngagementCardProps) {
  return (
    <div
      data-testid="labs-engagement-card"
      className="p-8 bg-white border border-neutral-500/10 rounded-2xl shadow-card flex flex-col h-full"
    >
      <div className="text-sm font-mono text-brand-orange mb-3">{number}</div>
      <h3 className="text-2xl font-bold text-neutral-900 tracking-tight mb-4">{title}</h3>
      <p className="text-neutral-700 leading-relaxed mb-8 flex-1">{body}</p>
      <Link
        href={ctaHref}
        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-neutral-900 rounded-full hover:bg-neutral-800 transition-all self-start"
      >
        {ctaLabel}
        <ArrowRightIcon className="w-4 h-4" />
      </Link>
    </div>
  )
}
