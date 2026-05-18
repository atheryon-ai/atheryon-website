import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book an M&A Execution Review — Atheryon',
  description:
    'Book an M&A execution review with Atheryon. Embedded execution specialists, pre-sign through post-sign, led by Anna Contos.',
  openGraph: {
    title: 'Book an M&A Execution Review — Atheryon',
    description:
      'Book an M&A execution review with Atheryon. Embedded execution specialists, pre-sign through post-sign, led by Anna Contos.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book an M&A Execution Review — Atheryon',
    description:
      'Book an M&A execution review with Atheryon. Embedded execution specialists, pre-sign through post-sign, led by Anna Contos.',
  },
  alternates: {
    canonical: 'https://atheryon.com.au/ma/contact',
  },
}

export default function MAContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
