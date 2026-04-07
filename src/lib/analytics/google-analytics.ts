/**
 * Google Analytics integration module.
 * Owner: Scenario 8 - Analytics and Insight Tracking
 *
 * Provides initialization and event tracking for Google Analytics 4.
 * Uses the NEXT_PUBLIC_GA_MEASUREMENT_ID environment variable.
 */

import type { AnalyticsEvent, GuidedElementEvent, InsightMoment } from '@/types/analytics'

// Get measurement ID from environment
export function getGAMeasurementId(): string | null {
  if (typeof window === 'undefined') return null
  return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || null
}

// Check if GA is available and configured
export function isGAAvailable(): boolean {
  return typeof window !== 'undefined' && !!getGAMeasurementId()
}

// Check if GA is initialized
export function isGAInitialized(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function'
}

/**
 * Initialize Google Analytics with the measurement ID from environment.
 * Injects the GA script tag and configures the tracker.
 */
export function initializeGoogleAnalytics(): boolean {
  if (typeof window === 'undefined') return false

  const measurementId = getGAMeasurementId()
  if (!measurementId) {
    console.warn('[GA] No measurement ID configured (NEXT_PUBLIC_GA_MEASUREMENT_ID)')
    return false
  }

  // Check if already initialized
  if (isGAInitialized()) {
    console.info('[GA] Already initialized')
    return true
  }

  try {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || []

    // Define gtag function
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args)
    }

    // Configure initial timestamp
    window.gtag('js', new Date())

    // Configure GA with measurement ID
    window.gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
    })

    // Inject GA script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script)

    console.info(`[GA] Initialized with measurement ID: ${measurementId}`)
    return true
  } catch (error) {
    console.error('[GA] Initialization failed:', error)
    return false
  }
}

/**
 * Track a custom analytics event.
 */
export function trackGAEvent(event: AnalyticsEvent): void {
  if (!isGAInitialized()) {
    console.debug('[GA] Not initialized, skipping event:', event)
    return
  }

  window.gtag?.('event', event.action, {
    event_category: event.category,
    event_label: event.label,
    value: event.value,
    ...event.metadata,
  })

  console.debug('[GA] Event tracked:', event)
}

/**
 * Track guided element interaction events.
 */
export function trackGuidedElementEvent(event: GuidedElementEvent): void {
  trackGAEvent({
    category: 'guided_element',
    action: event.elementType,
    label: event.elementId,
    value: event.timeSpent,
    metadata: {
      step_number: event.stepNumber,
      total_steps: event.totalSteps,
      ...event.metadata,
    },
  })
}

/**
 * Track insight moment ('ah ha') events.
 */
export function trackInsightMomentGA(moment: InsightMoment): void {
  trackGAEvent({
    category: 'insight_moment',
    action: moment.insightType,
    label: `act_${moment.act}`,
    value: Math.round(moment.timeFromStart / 1000), // Convert to seconds
    metadata: {
      act: moment.act,
      time_from_start_ms: moment.timeFromStart,
      ...moment.metadata,
    },
  })
}

/**
 * Track time-to-insight metrics for the complete demo journey.
 */
export function trackTimeToInsightGA(
  insightType: string,
  timeFromStartMs: number,
  act: number
): void {
  trackGAEvent({
    category: 'time_to_insight',
    action: insightType,
    label: `act_${act}`,
    value: Math.round(timeFromStartMs / 1000),
    metadata: {
      time_ms: timeFromStartMs,
      act: act,
    },
  })
}

/**
 * Track page view.
 */
export function trackPageView(path: string, title?: string): void {
  if (!isGAInitialized()) return

  window.gtag?.('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.origin + path,
  })
}

/**
 * Track tour mode events.
 */
export function trackTourEvent(
  action: 'start' | 'step' | 'complete' | 'exit',
  stepNumber?: number,
  totalSteps?: number,
  dropOffStep?: number
): void {
  trackGAEvent({
    category: 'tour_mode',
    action: `tour_${action}`,
    label: stepNumber !== undefined ? `step_${stepNumber}` : undefined,
    value: stepNumber,
    metadata: {
      step_number: stepNumber,
      total_steps: totalSteps,
      drop_off_step: dropOffStep,
    },
  })
}
