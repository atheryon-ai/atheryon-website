import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

// Test builds (deploy-test.yml sets NEXT_PUBLIC_NOINDEX=true) stay
// unindexed via the layout robots meta (noindex, nofollow). robots.txt
// still allows fetch so review tools (Copilot, browsers) can retrieve
// the pages. Production stays Allow + sitemap. The env var is unset by
// default, so a misconfigured build fails towards an indexable site —
// the workflow verify steps catch either direction before deploy.
export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_NOINDEX === 'true') {
    return {
      rules: { userAgent: '*', allow: '/' },
    }
  }
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://atheryon.com.au/sitemap.xml',
  }
}
