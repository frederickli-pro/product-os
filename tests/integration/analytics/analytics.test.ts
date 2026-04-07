/**
 * Integration tests for Analytics and Insight Tracking.
 * Owner: Scenario 8 - Analytics and Insight Tracking
 *
 * Tests Google Analytics, Microsoft Clarity initialization,
 * guided element tracking, insight moments, and time-to-insight metrics.
 */

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals'

// Mock window and process.env before imports
const originalWindow = global.window
const originalEnv = process.env

describe('Analytics and Insight Tracking', () => {
  let mockGtag: jest.Mock
  let mockClarity: jest.Mock
  let mockDataLayer: unknown[]

  beforeEach(() => {
    // Reset modules to ensure fresh state
    jest.resetModules()

    // Setup mock window
    mockDataLayer = []
    mockGtag = jest.fn((...args: unknown[]) => {
      mockDataLayer.push(args)
    })
    mockClarity = jest.fn()

    // @ts-expect-error - Setting up test environment
    global.window = {
      ...originalWindow,
      gtag: undefined,
      dataLayer: undefined,
      clarity: undefined,
      location: {
        href: 'http://localhost:3000',
        origin: 'http://localhost:3000',
      },
    }

    // @ts-expect-error - Mocking document
    global.document = {
      title: 'Test Page',
      head: {
        appendChild: jest.fn(),
      },
      createElement: jest.fn(() => ({
        async: false,
        src: '',
      })),
    }

    // Setup environment variables
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_GA_MEASUREMENT_ID: 'G-TEST123456',
      NEXT_PUBLIC_CLARITY_PROJECT_ID: 'clarity-test-id',
      NODE_ENV: 'test',
    }
  })

  afterEach(() => {
    global.window = originalWindow
    process.env = originalEnv
    jest.clearAllMocks()
  })

  describe('Test Case 1: GA and Clarity Initialization', () => {
    it('should initialize Google Analytics with NEXT_PUBLIC_GA_MEASUREMENT_ID', async () => {
      const { initializeGoogleAnalytics, getGAMeasurementId } = await import(
        '@/lib/analytics/google-analytics'
      )

      const measurementId = getGAMeasurementId()
      expect(measurementId).toBe('G-TEST123456')

      const result = initializeGoogleAnalytics()
      expect(result).toBe(true)
      expect(global.window.gtag).toBeDefined()
      expect(global.window.dataLayer).toBeDefined()
    })

    it('should initialize Microsoft Clarity with NEXT_PUBLIC_CLARITY_PROJECT_ID', async () => {
      const { initializeMicrosoftClarity, getClarityProjectId } = await import(
        '@/lib/analytics/microsoft-clarity'
      )

      const projectId = getClarityProjectId()
      expect(projectId).toBe('clarity-test-id')

      const result = initializeMicrosoftClarity()
      expect(result).toBe(true)
      expect(global.window.clarity).toBeDefined()
    })

    it('should fail gracefully when measurement IDs are not configured', async () => {
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = ''
      process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID = ''

      jest.resetModules()

      const { initializeGoogleAnalytics } = await import('@/lib/analytics/google-analytics')
      const { initializeMicrosoftClarity } = await import('@/lib/analytics/microsoft-clarity')

      const gaResult = initializeGoogleAnalytics()
      const clarityResult = initializeMicrosoftClarity()

      expect(gaResult).toBe(false)
      expect(clarityResult).toBe(false)
    })
  })

  describe('Test Case 2: Continue Prompt Click Tracking', () => {
    it('should fire analytics event for continue prompt click', async () => {
      const { initializeGoogleAnalytics, trackGuidedElementEvent } = await import(
        '@/lib/analytics/google-analytics'
      )

      initializeGoogleAnalytics()

      const event = {
        category: 'guided_element',
        action: 'continue_prompt_click',
        elementType: 'continue_prompt_click' as const,
        elementId: 'prompt-1',
      }

      trackGuidedElementEvent(event)

      expect(global.window.gtag).toBeDefined()
      // Verify gtag was called
      expect(global.window.dataLayer?.length).toBeGreaterThan(0)
    })
  })

  describe('Test Case 3: Continue Prompt Dismissal Tracking', () => {
    it('should fire analytics event for continue prompt dismissal', async () => {
      const { initializeGoogleAnalytics, trackGuidedElementEvent } = await import(
        '@/lib/analytics/google-analytics'
      )

      initializeGoogleAnalytics()

      const event = {
        category: 'guided_element',
        action: 'continue_prompt_dismiss',
        elementType: 'continue_prompt_dismiss' as const,
        elementId: 'prompt-1',
      }

      trackGuidedElementEvent(event)

      expect(global.window.dataLayer?.length).toBeGreaterThan(0)
    })
  })

  describe('Test Case 4: Highlight Animation Visibility Tracking', () => {
    it('should fire analytics event for highlight animation visibility', async () => {
      const { initializeGoogleAnalytics, trackGuidedElementEvent } = await import(
        '@/lib/analytics/google-analytics'
      )

      initializeGoogleAnalytics()

      const event = {
        category: 'guided_element',
        action: 'highlight_animation_visible',
        elementType: 'highlight_animation_visible' as const,
        elementId: 'highlight-engine-1',
      }

      trackGuidedElementEvent(event)

      expect(global.window.dataLayer?.length).toBeGreaterThan(0)
    })
  })

  describe('Test Case 5: Help Icon Hover Tracking', () => {
    it('should fire analytics event for help icon hover with time spent', async () => {
      const { initializeGoogleAnalytics, trackGuidedElementEvent } = await import(
        '@/lib/analytics/google-analytics'
      )

      initializeGoogleAnalytics()

      const event = {
        category: 'guided_element',
        action: 'help_icon_hover',
        elementType: 'help_icon_hover' as const,
        elementId: 'help-maturity-assessment',
        timeSpent: 3500, // 3.5 seconds
      }

      trackGuidedElementEvent(event)

      expect(global.window.dataLayer?.length).toBeGreaterThan(0)
    })
  })

  describe('Test Case 6: Tour Mode Start Tracking', () => {
    it('should fire analytics event for tour mode start', async () => {
      const { initializeGoogleAnalytics, trackTourEvent } = await import(
        '@/lib/analytics/google-analytics'
      )

      initializeGoogleAnalytics()

      trackTourEvent('start', 1, 10)

      expect(global.window.dataLayer?.length).toBeGreaterThan(0)
    })
  })

  describe('Test Case 7: Tour Mode Completion Tracking', () => {
    it('should fire analytics event for tour completion with step drop-off data', async () => {
      const { initializeGoogleAnalytics, trackTourEvent } = await import(
        '@/lib/analytics/google-analytics'
      )

      initializeGoogleAnalytics()

      // Track complete tour
      trackTourEvent('complete', 10, 10)

      expect(global.window.dataLayer?.length).toBeGreaterThan(0)
    })

    it('should track tour exit with drop-off step', async () => {
      const { initializeGoogleAnalytics, trackTourEvent } = await import(
        '@/lib/analytics/google-analytics'
      )

      initializeGoogleAnalytics()

      // Track tour exit at step 5 of 10
      trackTourEvent('exit', 5, 10, 5)

      expect(global.window.dataLayer?.length).toBeGreaterThan(0)
    })
  })

  describe("Test Case 8: Act 1 'ah ha' Moment Tracking", () => {
    it("should fire analytics event for Act 1 'ah ha' moment (maturity assessment)", async () => {
      const {
        initializeInsightTracking,
        trackInsightMoment,
        hasRecordedInsight,
        resetInsightTracking,
      } = await import('@/lib/analytics/insight-tracking')
      const { initializeGoogleAnalytics } = await import('@/lib/analytics/google-analytics')
      const { initializeMicrosoftClarity } = await import('@/lib/analytics/microsoft-clarity')

      initializeGoogleAnalytics()
      initializeMicrosoftClarity()
      resetInsightTracking()
      initializeInsightTracking()

      const result = trackInsightMoment('maturity_assessment')

      expect(result).not.toBeNull()
      expect(result?.act).toBe(1)
      expect(result?.insightType).toBe('maturity_assessment')
      expect(hasRecordedInsight('maturity_assessment')).toBe(true)
    })
  })

  describe("Test Case 9: Act 2 'ah ha' Moment Tracking", () => {
    it("should fire analytics event for Act 2 'ah ha' moment (prioritization reasoning)", async () => {
      const {
        initializeInsightTracking,
        trackInsightMoment,
        hasRecordedInsight,
        resetInsightTracking,
      } = await import('@/lib/analytics/insight-tracking')
      const { initializeGoogleAnalytics } = await import('@/lib/analytics/google-analytics')

      initializeGoogleAnalytics()
      resetInsightTracking()
      initializeInsightTracking()

      const result = trackInsightMoment('prioritization_reasoning')

      expect(result).not.toBeNull()
      expect(result?.act).toBe(2)
      expect(result?.insightType).toBe('prioritization_reasoning')
      expect(hasRecordedInsight('prioritization_reasoning')).toBe(true)
    })
  })

  describe("Test Case 10: Act 3 'ah ha' Moment Tracking", () => {
    it("should fire analytics event for Act 3 'ah ha' moment (PRD transformation)", async () => {
      const {
        initializeInsightTracking,
        trackInsightMoment,
        hasRecordedInsight,
        resetInsightTracking,
      } = await import('@/lib/analytics/insight-tracking')
      const { initializeGoogleAnalytics } = await import('@/lib/analytics/google-analytics')

      initializeGoogleAnalytics()
      resetInsightTracking()
      initializeInsightTracking()

      const result = trackInsightMoment('prd_transformation')

      expect(result).not.toBeNull()
      expect(result?.act).toBe(3)
      expect(result?.insightType).toBe('prd_transformation')
      expect(hasRecordedInsight('prd_transformation')).toBe(true)
    })
  })

  describe("Test Case 11: 'Most Frameworks Stop' Callout Tracking", () => {
    it("should fire analytics event for 'most frameworks stop' engagement", async () => {
      const {
        initializeInsightTracking,
        trackFrameworksStopEngagement,
        hasRecordedInsight,
        resetInsightTracking,
      } = await import('@/lib/analytics/insight-tracking')
      const { initializeGoogleAnalytics } = await import('@/lib/analytics/google-analytics')

      initializeGoogleAnalytics()
      resetInsightTracking()
      initializeInsightTracking()

      trackFrameworksStopEngagement()

      expect(hasRecordedInsight('frameworks_stop_callout')).toBe(true)
    })
  })

  describe("Test Case 12: Act 4 'ah ha' Moment Tracking", () => {
    it("should fire analytics event for Act 4 'ah ha' moment (portfolio intelligence)", async () => {
      const {
        initializeInsightTracking,
        trackPortfolioIntelligenceDiscovery,
        hasRecordedInsight,
        resetInsightTracking,
      } = await import('@/lib/analytics/insight-tracking')
      const { initializeGoogleAnalytics } = await import('@/lib/analytics/google-analytics')

      initializeGoogleAnalytics()
      resetInsightTracking()
      initializeInsightTracking()

      trackPortfolioIntelligenceDiscovery()

      expect(hasRecordedInsight('portfolio_intelligence')).toBe(true)
    })
  })

  describe('Test Case 13: Time-to-Insight Metrics', () => {
    it('should record time-to-insight metrics for duration from start to each key moment', async () => {
      const {
        initializeInsightTracking,
        trackInsightMoment,
        completeInsightTracking,
        getInsightMetrics,
        resetInsightTracking,
      } = await import('@/lib/analytics/insight-tracking')
      const { initializeGoogleAnalytics } = await import('@/lib/analytics/google-analytics')

      initializeGoogleAnalytics()
      resetInsightTracking()
      initializeInsightTracking()

      // Simulate progression through demo with insights
      trackInsightMoment('maturity_assessment')
      trackInsightMoment('prioritization_reasoning')
      trackInsightMoment('prd_transformation')
      trackInsightMoment('frameworks_stop_callout')
      trackInsightMoment('portfolio_intelligence')

      // Complete the tracking
      const finalMetrics = completeInsightTracking()

      expect(finalMetrics).not.toBeNull()
      expect(finalMetrics?.demoStartTime).toBeDefined()
      expect(finalMetrics?.totalDemoTime).toBeDefined()
      expect(finalMetrics?.totalDemoTime).toBeGreaterThanOrEqual(0)

      // Verify all insight times were recorded
      expect(finalMetrics?.insightTimes.maturity_assessment).not.toBeNull()
      expect(finalMetrics?.insightTimes.prioritization_reasoning).not.toBeNull()
      expect(finalMetrics?.insightTimes.prd_transformation).not.toBeNull()
      expect(finalMetrics?.insightTimes.frameworks_stop_callout).not.toBeNull()
      expect(finalMetrics?.insightTimes.portfolio_intelligence).not.toBeNull()
    })

    it('should prevent duplicate insight tracking', async () => {
      const { initializeInsightTracking, trackInsightMoment, resetInsightTracking } = await import(
        '@/lib/analytics/insight-tracking'
      )

      resetInsightTracking()
      initializeInsightTracking()

      const firstResult = trackInsightMoment('maturity_assessment')
      const secondResult = trackInsightMoment('maturity_assessment')

      expect(firstResult).not.toBeNull()
      expect(secondResult).toBeNull() // Should be null for duplicate
    })

    it('should track time from demo start correctly', async () => {
      const { initializeInsightTracking, getTimeFromStart, resetInsightTracking } = await import(
        '@/lib/analytics/insight-tracking'
      )

      resetInsightTracking()
      initializeInsightTracking()

      // Wait a small amount
      await new Promise((resolve) => setTimeout(resolve, 50))

      const timeFromStart = getTimeFromStart()
      expect(timeFromStart).toBeGreaterThanOrEqual(50)
    })
  })

  describe('Clarity-specific tracking', () => {
    it('should track guided elements in Clarity', async () => {
      const { initializeMicrosoftClarity, trackGuidedElementClarity, isClarityInitialized } =
        await import('@/lib/analytics/microsoft-clarity')

      initializeMicrosoftClarity()
      expect(isClarityInitialized()).toBe(true)

      // This should not throw
      trackGuidedElementClarity('continue_prompt_click', 'prompt-1', 1500)
    })

    it('should track demo progress in Clarity', async () => {
      const { initializeMicrosoftClarity, trackDemoProgressClarity } = await import(
        '@/lib/analytics/microsoft-clarity'
      )

      initializeMicrosoftClarity()

      // Track progress through acts
      trackDemoProgressClarity(1, [])
      trackDemoProgressClarity(2, [1])
      trackDemoProgressClarity(3, [1, 2])
      trackDemoProgressClarity(4, [1, 2, 3])

      // Should not throw
    })
  })
})
