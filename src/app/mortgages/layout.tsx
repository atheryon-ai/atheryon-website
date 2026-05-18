import { Footer } from '@/components'
import { HomeNav } from '@/components/home'

/**
 * /mortgages route segment — Mortgages practice shell. The practice is
 * currently buried (hidden from the header toggle) while being built; this
 * layout still exists so direct-link visitors get a proper shell. The
 * shellConfig.mortgages nav is empty by design — the practice toggle inside
 * BrandLockup provides the only wayfinding back to CM / M&A.
 */
export default function MortgagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <HomeNav mode="mortgages" />
      <main>{children}</main>
      <Footer />
    </>
  )
}
