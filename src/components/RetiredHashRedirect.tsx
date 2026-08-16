'use client'

import { useEffect } from 'react'

// Static export cannot 301 a hash fragment. The inline script runs while
// the HTML parses (bookmarks still carry #ma). useEffect covers the case
// where a client navigation applies the hash after hydration.
export function RetiredHashRedirect({
  from,
  to,
}: {
  from: `#${string}`
  to: string
}) {
  useEffect(() => {
    const go = () => {
      if (window.location.hash === from) {
        window.location.replace(to)
      }
    }
    go()
    window.addEventListener('hashchange', go)
    return () => window.removeEventListener('hashchange', go)
  }, [from, to])

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `if(location.hash===${JSON.stringify(from)})location.replace(${JSON.stringify(to)})`,
      }}
    />
  )
}
