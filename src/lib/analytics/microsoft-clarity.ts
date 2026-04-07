/**
 * Microsoft Clarity integration module.
 * Owner: Scenario 8 - Analytics and Insight Tracking
 *
 * Provides initialization and custom tagging for Microsoft Clarity.
 * Uses the NEXT_PUBLIC_CLARITY_PROJECT_ID environment variable.
 */

// Get Clarity project ID from environment
export function getClarityProjectId(): string | null {
  if (typeof window === 'undefined') return null
  return process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || null
}

// Check if Clarity is available and configured
export function isClarityAvailable(): boolean {
  return typeof window !== 'undefined' && !!getClarityProjectId()
}

// Check if Clarity is initialized
export function isClarityInitialized(): boolean {
  return typeof window !== 'undefined' && typeof window.clarity === 'function'
}

/**
 * Initialize Microsoft Clarity with the project ID from environment.
 * Injects the Clarity script tag.
 */
export function initializeMicrosoftClarity(): boolean {
  if (typeof window === 'undefined') return false

  const projectId = getClarityProjectId()
  if (!projectId) {
    console.warn('[Clarity] No project ID configured (NEXT_PUBLIC_CLARITY_PROJECT_ID)')
    return false
  }

  // Check if already initialized
  if (isClarityInitialized()) {
    console.info('[Clarity] Already initialized')
    return true
  }

  try {
    // Initialize Clarity tracking function
    window.clarity =
      window.clarity ||
      function (...args: unknown[]) {
        ;(window.clarity as unknown as { q?: unknown[] }).q =
          (window.clarity as unknown as { q?: unknown[] }).q || []
        ;(window.clarity as unknown as { q: unknown[] }).q.push(args)
      }

    // Inject Clarity script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.clarity.ms/tag/${projectId}`
    document.head.appendChild(script)

    console.info(`[Clarity] Initialized with project ID: ${projectId}`)
    return true
  } catch (error) {
    console.error('[Clarity] Initialization failed:', error)
    return false
  }
}

/**
 * Set a custom tag in Clarity for segmentation.
 * Tags help identify and segment sessions in the Clarity dashboard.
 */
export function setClarityTag(key: string, value: string | number | boolean): void {
  if (!isClarityInitialized()) {
    console.debug('[Clarity] Not initialized, skipping tag:', key, value)
    return
  }

  window.clarity?.('set', key, String(value))
  console.debug('[Clarity] Tag set:', key, value)
}

/**
 * Set custom user ID for Clarity session tracking.
 */
export function setClarityUserId(userId: string): void {
  if (!isClarityInitialized()) return

  window.clarity?.('identify', userId)
  console.debug('[Clarity] User ID set:', userId)
}

/**
 * Mark a specific event or milestone in the Clarity session.
 */
export function setClarityEvent(eventName: string, eventValue?: string): void {
  if (!isClarityInitialized()) return

  window.clarity?.('event', eventName, eventValue)
  console.debug('[Clarity] Event marked:', eventName, eventValue)
}

/**
 * Track insight moment in Clarity as a custom tag.
 */
export function trackInsightMomentClarity(
  insightType: string,
  act: number,
  timeFromStartMs: number
): void {
  setClarityTag(`insight_${insightType}`, true)
  setClarityTag(`insight_act_${act}`, true)
  setClarityTag(`insight_time_${insightType}`, Math.round(timeFromStartMs / 1000))
  setClarityEvent(`insight_${insightType}`, `act_${act}`)
}

/**
 * Track guided element interaction in Clarity.
 */
export function trackGuidedElementClarity(
  elementType: string,
  elementId?: string,
  timeSpent?: number
): void {
  setClarityTag(`guided_${elementType}`, true)
  if (elementId) {
    setClarityTag(`guided_element_id`, elementId)
  }
  if (timeSpent !== undefined) {
    setClarityTag(`guided_time_spent`, timeSpent)
  }
  setClarityEvent(`guided_${elementType}`, elementId)
}

/**
 * Track tour progress in Clarity.
 */
export function trackTourProgressClarity(
  action: 'start' | 'step' | 'complete' | 'exit',
  stepNumber?: number,
  totalSteps?: number
): void {
  setClarityTag('tour_active', action !== 'complete' && action !== 'exit')
  setClarityTag('tour_action', action)
  if (stepNumber !== undefined) {
    setClarityTag('tour_current_step', stepNumber)
  }
  if (totalSteps !== undefined) {
    setClarityTag('tour_total_steps', totalSteps)
  }
  setClarityEvent(`tour_${action}`, stepNumber?.toString())
}

/**
 * Track demo progress in Clarity.
 */
export function trackDemoProgressClarity(currentAct: number, completedActs: number[]): void {
  setClarityTag('demo_current_act', currentAct)
  setClarityTag('demo_completed_acts', completedActs.join(','))
  setClarityTag('demo_progress_percent', (completedActs.length / 4) * 100)
}
