import type { Metadata } from 'next'
import { Cinzel, JetBrains_Mono, Newsreader, Public_Sans } from 'next/font/google'
import { ModeSetter } from '@/components/ModeSetter'
import { site, v3 } from '@/content/site'
import './globals.css'

// Self-hosted via next/font (council #3): subsetted files served from
// /_next/static, no render-blocking Google CSS, metric-adjusted fallbacks.
// Poppins was dropped entirely; its one attribution line is Public Sans now.
const newsreader = Newsreader({
  subsets: ['latin'],
  style: 'normal', // no display italics in use
  axes: ['opsz'],
  variable: '--font-newsreader',
  display: 'swap',
})
const publicSans = Public_Sans({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-public-sans',
  display: 'swap',
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  style: 'normal',
  variable: '--font-jetbrains',
  display: 'swap',
})
const cinzel = Cinzel({
  subsets: ['latin'],
  weight: '600', // wordmark only
  variable: '--font-cinzel',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://atheryon.com.au'),
  title: v3.pages.home.title,
  description: v3.pages.home.description,
  // Test SWA builds are excluded from indexing (deploy-test.yml sets
  // NEXT_PUBLIC_NOINDEX=true); unset means indexable, so production cannot
  // inherit a noindex by accident. Workflow verify steps assert both.
  robots:
    process.env.NEXT_PUBLIC_NOINDEX === 'true'
      ? { index: false, follow: false }
      : undefined,
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: v3.pages.home.title,
    description: v3.pages.home.description,
    type: 'website',
    siteName: site.name,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Atheryon — Making Complex Change Executable' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: v3.pages.home.title,
    description: v3.pages.home.description,
    images: ['/og-image.png'],
  },
}

// Conservative structured data only: identity, contact, co-founders. No
// invented ratings, addresses, or service catalogues.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService'],
  name: site.name,
  url: 'https://atheryon.com.au',
  logo: 'https://atheryon.com.au/atheryon-brand-logo.png',
  email: site.email,
  description: v3.positioning.statement,
  founder: [
    {
      '@type': 'Person',
      name: 'Anna Contos',
      jobTitle: 'Co-Founder, M&A',
      sameAs: 'https://www.linkedin.com/in/anna-contos-7685a7/',
    },
    {
      '@type': 'Person',
      name: 'Terry Tsakiris',
      jobTitle: 'Co-Founder, Capital Markets',
      sameAs: 'https://www.linkedin.com/in/terencetsakiris/',
    },
  ],
}

/**
 * Root layout — minimal shell. The HomeNav + Footer live inside route-group
 * layouts ((cm), ma, mortgages) so each practice gets server-rendered nav +
 * CTA + accent. ModeSetter stays here because it still drives the
 * `data-mode` CSS variable for accent colours across all groups.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${publicSans.variable} ${jetbrainsMono.variable} ${cinzel.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ModeSetter />
        {children}
      </body>
    </html>
  )
}
