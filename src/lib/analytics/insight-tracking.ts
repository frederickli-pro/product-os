/**
 * 'Ah ha' moment and insight tracking.
 * Owner: Scenario 8 - Analytics and Insight Tracking
 *
 * Tracks key insight moments throughout the demo journey and
 * measures time-to-insight metrics across all four acts.
 */

import type { ActNumber } from '@/types'
import type { InsightMoment, InsightType, TimeToInsightMetrics } from '@/types/analytics'
import { trackInsightMomentGA, trackTimeToInsightGA } from './google-analytics'
import { trackInsightMomentClarity } from './microsoft-clarity'

// Store for tracking demo start time and insight moments
let demoStartTime: Date | null = null
let insightMetrics: TimeToInsightMetrics | null = null
const recordedInsights = new Set<InsightType>()

/**
 * Initialize insight tracking with demo start time.
 * Call this when the user begins the demo journey.
 */
export function initializeInsightTracking(): void {
  demoStartTime = new Date()
  recordedInsights.clear()
  insightMetrics = {
    demoStartTime,
    insightTimes: {
      maturity_assessment: null,
      prioritization_reasoning: null,
      prd_transformation: null,
      frameworks_stop_callout: null,
      portfolio_intelligence: null,
    },
    totalDemoTime: undefined,
  }
  console.info('[InsightTracking] Initialized at:', demoStartTime.toISOString())
}

/**
 * Get the current demo start time.
 */
export function getDemoStartTime(): Date | null {
  return demoStartTime
}

/**
 * Get time elapsed since demo start in milliseconds.
 */
export function getTimeFromStart(): number {
  if (!demoStartTime) return 0
  return Date.now() - demoStartTime.getTime()
}

/**
 * Map insight types to their corresponding act numbers.
 */
const insightToActMap: Record<InsightType, ActNumber> = {
  maturity_assessment: 1,
  prioritization_reasoning: 2,
  prd_transformation: 3,
  frameworks_stop_callout: 3,
  portfolio_intelligence: 4,
}

/**
 * Track an 'ah ha' insight moment.
 * Sends events to both GA and Clarity.
 *
 * @param insightType - The type of insight moment reached
 */
export function trackInsightMoment(insightType: InsightType): InsightMoment | null {
  // Prevent duplicate tracking
  if (recordedInsights.has(insightType)) {
    console.debug('[InsightTracking] Already recorded insight:', insightType)
    return null
  }

  const timeFromStart = getTimeFromStart()
  const act = insightToActMap[insightType]
  const timestamp = new Date()

  const moment: InsightMoment = {
    act,
    insightType,
    timestamp,
    timeFromStart,
  }

  // Record the insight
  recordedInsights.add(insightType)
  if (insightMetrics) {
    insightMetrics.insightTimes[insightType] = timeFromStart
  }

  // Track in GA
  trackInsightMomentGA(moment)

  // Track in Clarity
  trackInsightMomentClarity(insightType, act, timeFromStart)

  console.info(
    `[InsightTracking] Recorded insight: ${insightType} (Act ${act}) at ${Math.round(timeFromStart / 1000)}s`
  )

  return moment
}

/**
 * Track time-to-insight for a specific act.
 * Use this to record how long it took the user to reach a key realization.
 */
export function trackTimeToInsight(act: ActNumber, duration: number): void {
  const insightTypes: Record<ActNumber, InsightType> = {
    1: 'maturity_assessment',
    2: 'prioritization_reasoning',
    3: 'prd_transformation',
    4: 'portfolio_intelligence',
  }

  const insightType = insightTypes[act]
  trackTimeToInsightGA(insightType, duration, act)

  console.info(`[InsightTracking] Time to insight Act ${act}: ${Math.round(duration / 1000)}s`)
}

/**
 * Track engagement with the 'most frameworks stop' callout message.
 */
export function trackFrameworksStopEngagement(): void {
  trackInsightMoment('frameworks_stop_callout')
}

/**
 * Track discovery of the portfolio-scale intelligence anchor message in Act 4.
 */
export function trackPortfolioIntelligenceDiscovery(): void {
  trackInsightMoment('portfolio_intelligence')
}

/**
 * Track maturity assessment visualization insight (Act 1).
 */
export function trackMaturityAssessmentInsight(): void {
  trackInsightMoment('maturity_assessment')
}

/**
 * Track prioritization reasoning insight (Act 2).
 */
export function trackPrioritizationReasoningInsight(): void {
  trackInsightMoment('prioritization_reasoning')
}

/**
 * Track PRD transformation insight (Act 3).
 */
export function trackPRDTransformationInsight(): void {
  trackInsightMoment('prd_transformation')
}

/**
 * Complete insight tracking and record total demo time.
 * Call this when the user completes the full demo journey.
 */
export function completeInsightTracking(): TimeToInsightMetrics | null {
  if (!insightMetrics || !demoStartTime) {
    console.warn('[InsightTracking] No active tracking session')
    return null
  }

  insightMetrics.totalDemoTime = getTimeFromStart()

  console.info('[InsightTracking] Demo completed:', {
    totalTime: `${Math.round(insightMetrics.totalDemoTime / 1000)}s`,
    insights: Object.entries(insightMetrics.insightTimes)
      .filter(([, time]) => time !== null)
      .map(([type, time]) => `${type}: ${Math.round((time || 0) / 1000)}s`),
  })

  return { ...insightMetrics }
}

/**
 * Get current insight metrics.
 */
export function getInsightMetrics(): TimeToInsightMetrics | null {
  return insightMetrics ? { ...insightMetrics } : null
}

/**
 * Check if a specific insight has been recorded.
 */
export function hasRecordedInsight(insightType: InsightType): boolean {
  return recordedInsights.has(insightType)
}

/**
 * Reset insight tracking state.
 * Use this when restarting the demo or testing.
 */
export function resetInsightTracking(): void {
  demoStartTime = null
  insightMetrics = null
  recordedInsights.clear()
  console.info('[InsightTracking] Reset')
}
