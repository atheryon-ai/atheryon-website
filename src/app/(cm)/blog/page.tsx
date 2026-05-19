import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, DocBanner, DocFooter } from '@/components'

// ─────────────────────────────────────────────────────────────────────────────
// /blog — index of long-form posts. Today one post; future-proofed for more.
// Posts are inlined here rather than living in site.ts: each post is a
// one-off long-form artifact (see legal-pages carve-out in CLAUDE.md), and
// the index is just a list of (slug, date, title, dek, readingTime).
// ─────────────────────────────────────────────────────────────────────────────

type Post = {
  slug: string
  title: string
  dek: string
  date: string // human-readable
  isoDate: string // for <time dateTime>
  readingTime: string
}

const posts: ReadonlyArray<Post> = [
  {
    slug: 'why-claude',
    title: 'Why we built our capital markets agent stack on Claude',
    dek: 'Long context that survives a prospectus, tool use that holds in a regulated environment, and a safety posture buyer-side compliance will sign off on.',
    date: '19 May 2026',
    isoDate: '2026-05-19',
    readingTime: '6 min',
  },
]

export const metadata: Metadata = {
  title: 'Writing — Atheryon',
  description:
    'Long-form writing from Atheryon on capital markets AI systems, model selection, and front-to-back agent architecture.',
  openGraph: {
    title: 'Writing — Atheryon',
    description: 'Long-form writing from Atheryon on capital markets AI systems.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Writing — Atheryon',
    description: 'Long-form writing from Atheryon on capital markets AI systems.',
  },
  alternates: { canonical: 'https://atheryon.com.au/blog' },
}

export default function BlogIndexPage() {
  return (
    <DocPage>
      <DocBanner
        label="atheryon / blog / writing"
        title="Writing"
        body="Long-form notes on capital markets AI systems, model selection, and the architectural choices behind the reference stack."
      />

      <section>
        <ul className="max-w-container mx-auto px-6 py-16 md:py-20 grid grid-cols-1 gap-px bg-charcoal/15 border border-charcoal/15">
          {posts.map((post, i) => (
            <li
              key={post.slug}
              className="bg-bone p-6 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8"
            >
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60 md:w-16 shrink-0">
                §{String(i + 1).padStart(2, '0')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
                  <time
                    dateTime={post.isoDate}
                    className="font-mono text-xs uppercase tracking-[0.16em] text-charcoal/60"
                  >
                    {post.date}
                  </time>
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-charcoal/50">
                    · {post.readingTime} read
                  </span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-medium text-charcoal tracking-tight mb-3 leading-snug">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-base text-charcoal/80 leading-relaxed max-w-3xl">
                  {post.dek}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 mt-4 font-mono text-xs uppercase tracking-[0.14em] text-charcoal/70 hover:text-charcoal transition-colors"
                >
                  Read post
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <DocFooter label="atheryon / blog / end-of-document" />
    </DocPage>
  )
}
