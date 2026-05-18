import { Footer } from '@/components'
import { HomeNav } from '@/components/home'

/**
 * /ma route segment — M&A practice shell. Wraps /ma, /ma/approach, /ma/offers.
 * Server-rendered nav + CTA from shellConfig.ma so M&A users see practice-correct
 * wayfinding (APPROACH / OFFERS, "Book M&A Review" → /contact?topic=ma-execution)
 * in the static HTML, not after hydration.
 */
export default function MALayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <HomeNav mode="ma" />
      <main>{children}</main>
      <Footer />
    </>
  )
}
