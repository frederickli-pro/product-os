'use client'

/**
 * Analytics Provider component.
 * Initializes Google Analytics and Microsoft Clarity on mount.
 * Must be placed inside a client boundary (e.g., inside <body>).
 */

import { useEffect } from 'react'
import { initializeGoogleAnalytics } from '@/lib/analytics/google-analytics'
import { initializeMicrosoftClarity } from '@/lib/analytics/microsoft-clarity'
import { initializeInsightTracking } from '@/lib/analytics/insight-tracking'

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const gaInitialized = initializeGoogleAnalytics()
    const clarityInitialized = initializeMicrosoftClarity()

    if (gaInitialized) {
      console.info('[Analytics] Google Analytics initialized')
    }
    if (clarityInitialized) {
      console.info('[Analytics] Microsoft Clarity initialized')
    }

    // Initialize insight tracking for demo flow
    initializeInsightTracking()
  }, [])

  return <>{children}</>
}

export default AnalyticsProvider
