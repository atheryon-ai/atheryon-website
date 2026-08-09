'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * ModeSetter — derives the practice-mode from the URL and writes it onto
 * <html data-mode="...">. Static export means we cannot set this server-side;
 * we accept a brief FOUC on direct loads to /mortgages.
 *
 * Mode mapping:
 *   /mortgages    → 'mortgages'
 *   /mortgages/*  → 'mortgages'
 *   anything else → 'cm'
 */
export function ModeSetter() {
  const pathname = usePathname()

  useEffect(() => {
    const mode =
      pathname === '/mortgages' || pathname.startsWith('/mortgages/')
        ? 'mortgages'
        : 'cm'
    document.documentElement.dataset.mode = mode
  }, [pathname])

  return null
}
