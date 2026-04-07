/**
 * Analytics and tracking types.
 * Owner: Scenario 8 - Analytics and Insight Tracking
 *
 * Exports types for analytics events, insight moment tracking,
 * and tour progress.
 */

import { ActNumber } from './index'

// Base analytics event type
export interface AnalyticsEvent {
  category: string
  action: string
  label?: string
  value?: number
  metadata?: Record<string, unknown>
}

// Guided element event types
export type GuidedElementEventType =
  | 'continue_prompt_impression'
  | 'continue_prompt_click'
  | 'continue_prompt_dismiss'
  | 'highlight_animation_visible'
  | 'help_icon_hover'
  | 'help_icon_click'
  | 'tour_mode_start'
  | 'tour_mode_step'
  | 'tour_mode_complete'
  | 'tour_mode_exit'

export interface GuidedElementEvent extends AnalyticsEvent {
  elementType: GuidedElementEventType
  elementId?: string
  timeSpent?: number
  stepNumber?: number
  totalSteps?: number
}

// Insight moment types for 'ah ha' tracking
export type InsightType =
  | 'maturity_assessment' // Act 1: raw data transformed into structured intelligence
  | 'prioritization_reasoning' // Act 2: explicit prioritization with weighted scoring
  | 'prd_transformation' // Act 3: priority item transforms into PRD
  | 'frameworks_stop_callout' // Act 3: "most frameworks stop" engagement
  | 'portfolio_intelligence' // Act 4: portfolio-scale intelligence anchor

export interface InsightMoment {
  act: ActNumber
  insightType: InsightType
  timestamp: Date
  timeFromStart: number // milliseconds from demo start
  metadata?: Record<string, unknown>
}

// Tour progress tracking
export interface TourStep {
  stepNumber: number
  stepId: string
  stepName: string
  startTime?: Date
  endTime?: Date
  completed: boolean
  skipped: boolean
}

export interface TourProgress {
  tourId: string
  startTime: Date
  endTime?: Date
  totalSteps: number
  completedSteps: number
  currentStep: number
  steps: TourStep[]
  dropOffStep?: number
  completed: boolean
}

// Time-to-insight metrics
export interface TimeToInsightMetrics {
  demoStartTime: Date
  insightTimes: Record<InsightType, number | null> // time in ms from demo start to each insight
  totalDemoTime?: number
}

// Analytics configuration
export interface AnalyticsConfig {
  gaEnabled: boolean
  clarityEnabled: boolean
  gaMeasurementId: string | null
  clarityProjectId: string | null
  debug: boolean
}

// Window extensions for analytics libraries
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
    clarity?: (...args: unknown[]) => void
  }
}
