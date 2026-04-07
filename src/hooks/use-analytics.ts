/**
 * React hook for analytics tracking.
 * Owner: Scenario 8 - Analytics and Insight Tracking
 *
 * Provides a unified interface for tracking analytics events,
 * guided element interactions, and insight moments.
 */

'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { ActNumber } from '@/types'
import type {
  AnalyticsConfig,
  GuidedElementEventType,
  InsightType,
  TourProgress,
  TourStep,
} from '@/types/analytics'
import {
  initializeGoogleAnalytics,
  isGAInitialized,
  trackGAEvent,
  trackGuidedElementEvent,
  trackTourEvent,
  getGAMeasurementId,
} from '@/lib/analytics/google-analytics'
import {
  initializeMicrosoftClarity,
  isClarityInitialized,
  trackGuidedElementClarity,
  trackTourProgressClarity,
  trackDemoProgressClarity,
  getClarityProjectId,
} from '@/lib/analytics/microsoft-clarity'
import {
  initializeInsightTracking,
  trackInsightMoment,
  trackFrameworksStopEngagement,
  trackPortfolioIntelligenceDiscovery,
  completeInsightTracking,
  getTimeFromStart,
  resetInsightTracking,
} from '@/lib/analytics/insight-tracking'

interface UseAnalyticsReturn {
  // Initialization state
  isInitialized: boolean
  config: AnalyticsConfig

  // Core tracking functions
  trackEvent: (category: string, action: string, label?: string, value?: number) => void

  // Guided element tracking
  trackContinuePromptImpression: (elementId?: string) => void
  trackContinuePromptClick: (elementId?: string) => void
  trackContinuePromptDismiss: (elementId?: string) => void
  trackHighlightAnimationVisible: (elementId?: string) => void
  trackHelpIconHover: (elementId: string, timeSpent: number) => void
  trackHelpIconClick: (elementId: string) => void

  // Tour mode tracking
  trackTourStart: (totalSteps: number) => void
  trackTourStep: (stepNumber: number, totalSteps: number) => void
  trackTourComplete: (totalSteps: number) => void
  trackTourExit: (currentStep: number, totalSteps: number) => void
  getTourProgress: () => TourProgress | null

  // Insight moment tracking
  trackInsight: (insightType: InsightType) => void
  trackAct1Insight: () => void // Maturity assessment
  trackAct2Insight: () => void // Prioritization reasoning
  trackAct3Insight: () => void // PRD transformation
  trackAct4Insight: () => void // Portfolio intelligence
  trackFrameworksStopCallout: () => void

  // Demo progress tracking
  trackDemoProgress: (currentAct: ActNumber, completedActs: ActNumber[]) => void
  startDemoTracking: () => void
  completeDemoTracking: () => void

  // Utility functions
  getTimeFromDemoStart: () => number
}

export function useAnalytics(): UseAnalyticsReturn {
  const [isInitialized, setIsInitialized] = useState(false)
  const [config, setConfig] = useState<AnalyticsConfig>({
    gaEnabled: false,
    clarityEnabled: false,
    gaMeasurementId: null,
    clarityProjectId: null,
    debug: process.env.NODE_ENV === 'development',
  })

  // Tour progress state
  const tourProgressRef = useRef<TourProgress | null>(null)

  // Initialize analytics on mount
  useEffect(() => {
    const gaInitialized = initializeGoogleAnalytics()
    const clarityInitialized = initializeMicrosoftClarity()

    setConfig({
      gaEnabled: gaInitialized,
      clarityEnabled: clarityInitialized,
      gaMeasurementId: getGAMeasurementId(),
      clarityProjectId: getClarityProjectId(),
      debug: process.env.NODE_ENV === 'development',
    })

    setIsInitialized(gaInitialized || clarityInitialized)
  }, [])

  // Core event tracking
  const trackEvent = useCallback(
    (category: string, action: string, label?: string, value?: number) => {
      trackGAEvent({ category, action, label, value })
    },
    []
  )

  // Guided element tracking
  const trackGuidedElement = useCallback(
    (elementType: GuidedElementEventType, elementId?: string, timeSpent?: number) => {
      trackGuidedElementEvent({
        category: 'guided_element',
        action: elementType,
        elementType,
        elementId,
        timeSpent,
      })
      trackGuidedElementClarity(elementType, elementId, timeSpent)
    },
    []
  )

  const trackContinuePromptImpression = useCallback(
    (elementId?: string) => {
      trackGuidedElement('continue_prompt_impression', elementId)
    },
    [trackGuidedElement]
  )

  const trackContinuePromptClick = useCallback(
    (elementId?: string) => {
      trackGuidedElement('continue_prompt_click', elementId)
    },
    [trackGuidedElement]
  )

  const trackContinuePromptDismiss = useCallback(
    (elementId?: string) => {
      trackGuidedElement('continue_prompt_dismiss', elementId)
    },
    [trackGuidedElement]
  )

  const trackHighlightAnimationVisible = useCallback(
    (elementId?: string) => {
      trackGuidedElement('highlight_animation_visible', elementId)
    },
    [trackGuidedElement]
  )

  const trackHelpIconHover = useCallback(
    (elementId: string, timeSpent: number) => {
      trackGuidedElement('help_icon_hover', elementId, timeSpent)
    },
    [trackGuidedElement]
  )

  const trackHelpIconClick = useCallback(
    (elementId: string) => {
      trackGuidedElement('help_icon_click', elementId)
    },
    [trackGuidedElement]
  )

  // Tour mode tracking
  const trackTourStart = useCallback((totalSteps: number) => {
    tourProgressRef.current = {
      tourId: `tour_${Date.now()}`,
      startTime: new Date(),
      totalSteps,
      completedSteps: 0,
      currentStep: 1,
      steps: [],
      completed: false,
    }
    trackTourEvent('start', 1, totalSteps)
    trackTourProgressClarity('start', 1, totalSteps)
  }, [])

  const trackTourStep = useCallback((stepNumber: number, totalSteps: number) => {
    if (tourProgressRef.current) {
      tourProgressRef.current.currentStep = stepNumber
      tourProgressRef.current.completedSteps = stepNumber - 1

      const step: TourStep = {
        stepNumber,
        stepId: `step_${stepNumber}`,
        stepName: `Step ${stepNumber}`,
        startTime: new Date(),
        completed: false,
        skipped: false,
      }
      tourProgressRef.current.steps.push(step)
    }
    trackTourEvent('step', stepNumber, totalSteps)
    trackTourProgressClarity('step', stepNumber, totalSteps)
  }, [])

  const trackTourComplete = useCallback((totalSteps: number) => {
    if (tourProgressRef.current) {
      tourProgressRef.current.completed = true
      tourProgressRef.current.completedSteps = totalSteps
      tourProgressRef.current.endTime = new Date()
    }
    trackTourEvent('complete', totalSteps, totalSteps)
    trackTourProgressClarity('complete', totalSteps, totalSteps)
  }, [])

  const trackTourExit = useCallback((currentStep: number, totalSteps: number) => {
    if (tourProgressRef.current) {
      tourProgressRef.current.dropOffStep = currentStep
      tourProgressRef.current.endTime = new Date()
    }
    trackTourEvent('exit', currentStep, totalSteps, currentStep)
    trackTourProgressClarity('exit', currentStep, totalSteps)
  }, [])

  const getTourProgress = useCallback(() => {
    return tourProgressRef.current
  }, [])

  // Insight moment tracking
  const trackInsight = useCallback((insightType: InsightType) => {
    trackInsightMoment(insightType)
  }, [])

  const trackAct1Insight = useCallback(() => {
    trackInsightMoment('maturity_assessment')
  }, [])

  const trackAct2Insight = useCallback(() => {
    trackInsightMoment('prioritization_reasoning')
  }, [])

  const trackAct3Insight = useCallback(() => {
    trackInsightMoment('prd_transformation')
  }, [])

  const trackAct4Insight = useCallback(() => {
    trackPortfolioIntelligenceDiscovery()
  }, [])

  const trackFrameworksStopCallout = useCallback(() => {
    trackFrameworksStopEngagement()
  }, [])

  // Demo progress tracking
  const trackDemoProgress = useCallback((currentAct: ActNumber, completedActs: ActNumber[]) => {
    trackDemoProgressClarity(currentAct, completedActs)
    trackGAEvent({
      category: 'demo_progress',
      action: 'progress_update',
      label: `act_${currentAct}`,
      value: completedActs.length,
      metadata: {
        current_act: currentAct,
        completed_acts: completedActs,
      },
    })
  }, [])

  const startDemoTracking = useCallback(() => {
    resetInsightTracking()
    initializeInsightTracking()
    trackGAEvent({
      category: 'demo',
      action: 'demo_start',
    })
  }, [])

  const completeDemoTracking = useCallback(() => {
    const metrics = completeInsightTracking()
    trackGAEvent({
      category: 'demo',
      action: 'demo_complete',
      value: metrics?.totalDemoTime ? Math.round(metrics.totalDemoTime / 1000) : undefined,
    })
  }, [])

  const getTimeFromDemoStart = useCallback(() => {
    return getTimeFromStart()
  }, [])

  return {
    isInitialized,
    config,
    trackEvent,
    trackContinuePromptImpression,
    trackContinuePromptClick,
    trackContinuePromptDismiss,
    trackHighlightAnimationVisible,
    trackHelpIconHover,
    trackHelpIconClick,
    trackTourStart,
    trackTourStep,
    trackTourComplete,
    trackTourExit,
    getTourProgress,
    trackInsight,
    trackAct1Insight,
    trackAct2Insight,
    trackAct3Insight,
    trackAct4Insight,
    trackFrameworksStopCallout,
    trackDemoProgress,
    startDemoTracking,
    completeDemoTracking,
    getTimeFromDemoStart,
  }
}

export default useAnalytics
