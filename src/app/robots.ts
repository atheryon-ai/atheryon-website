import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

// Test builds (deploy-test.yml sets NEXT_PUBLIC_NOINDEX=true) disallow all
// crawling; production builds stay indexable. The env var is unset by
// default, so a misconfigured build fails towards an indexable site — the
// workflow verify steps catch either direction before deploy.
export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_NOINDEX === 'true') {
    return {
      rules: { userAgent: '*', disallow: '/' },
    }
  }
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://atheryon.com.au/sitemap.xml',
  }
}
