import type { Metadata } from 'next'
import { ModeSetter } from '@/components/ModeSetter'
import { site, v3 } from '@/content/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://atheryon.com.au'),
  title: v3.pages.home.title,
  description: v3.pages.home.description,
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
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Atheryon — Making Transactions Executable' }],
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
      jobTitle: 'Co-Founder, Transaction Advisory & Execution',
      sameAs: 'https://www.linkedin.com/in/anna-contos-7685a7/',
    },
    {
      '@type': 'Person',
      name: 'Terry Tsakiris',
      jobTitle: 'Co-Founder, Technology & Data',
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
    <html lang="en">
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
