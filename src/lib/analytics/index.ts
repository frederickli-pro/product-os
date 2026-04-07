/**
 * Analytics module exports.
 * Owner: Scenario 8 - Analytics and Insight Tracking
 *
 * Central export point for all analytics functionality.
 */

// Google Analytics
export {
  initializeGoogleAnalytics,
  isGAAvailable,
  isGAInitialized,
  trackGAEvent,
  trackGuidedElementEvent,
  trackInsightMomentGA,
  trackTimeToInsightGA,
  trackPageView,
  trackTourEvent,
  getGAMeasurementId,
} from './google-analytics'

// Microsoft Clarity
export {
  initializeMicrosoftClarity,
  isClarityAvailable,
  isClarityInitialized,
  setClarityTag,
  setClarityUserId,
  setClarityEvent,
  trackInsightMomentClarity,
  trackGuidedElementClarity,
  trackTourProgressClarity,
  trackDemoProgressClarity,
  getClarityProjectId,
} from './microsoft-clarity'

// Insight Tracking
export {
  initializeInsightTracking,
  trackInsightMoment,
  trackTimeToInsight,
  trackFrameworksStopEngagement,
  trackPortfolioIntelligenceDiscovery,
  trackMaturityAssessmentInsight,
  trackPrioritizationReasoningInsight,
  trackPRDTransformationInsight,
  completeInsightTracking,
  getInsightMetrics,
  hasRecordedInsight,
  resetInsightTracking,
  getDemoStartTime,
  getTimeFromStart,
} from './insight-tracking'

// Re-export types
export type {
  AnalyticsEvent,
  GuidedElementEvent,
  GuidedElementEventType,
  InsightMoment,
  InsightType,
  TourStep,
  TourProgress,
  TimeToInsightMetrics,
  AnalyticsConfig,
} from '@/types/analytics'
