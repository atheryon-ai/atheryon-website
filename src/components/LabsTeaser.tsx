import Image from 'next/image'
import Link from 'next/link'

interface LabsTeaserProps {
  title: string
  body: string
  screenshot: string
  screenshotAlt: string
  cta: { label: string; href: string }
}

export function LabsTeaser({ title, body, screenshot, screenshotAlt, cta }: LabsTeaserProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-10 items-center">
      <div className="rounded-2xl overflow-hidden border border-charcoal/10">
        <Image
          src={screenshot}
          alt={screenshotAlt}
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>
      <div>
        <h2 className="font-display text-3xl md:text-4xl text-charcoal tracking-tight leading-[1.1] mb-5">
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
    </div>
  )
}
