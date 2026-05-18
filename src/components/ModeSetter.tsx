'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * ModeSetter — derives the practice-mode from the URL and writes it onto
 * <html data-mode="...">. Static export means we cannot set this server-side;
 * we accept a brief FOUC on direct loads to /ma or /mortgages.
 *
 * Mode mapping:
 *   /ma           → 'ma'
 *   /ma/*         → 'ma'
 *   /mortgages    → 'mortgages'
 *   /mortgages/*  → 'mortgages'
 *   anything else → 'cm'
 */
export function ModeSetter() {
  const pathname = usePathname()

  useEffect(() => {
    const mode =
      pathname === '/ma' || pathname.startsWith('/ma/')
        ? 'ma'
        : pathname === '/mortgages' || pathname.startsWith('/mortgages/')
        ? 'mortgages'
        : 'cm'
    document.documentElement.dataset.mode = mode
  }, [pathname])

  return null
}
