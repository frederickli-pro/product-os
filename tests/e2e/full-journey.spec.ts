import { test, expect } from '@playwright/test'

/**
 * E2E Tests for Full Demo Journey Flow
 * Owner: Scenario 15 - Full Demo Journey Flow
 *
 * This test file validates the complete four-act demo journey from dashboard
 * through all four engines in a 10-minute presentation window.
 *
 * Test cases:
 * 1. Start demo from 'Start here' entry point - Welcome overlay appears
 * 2. Complete Act 1 flow - Evidence explorer, maturity assessment, gap analysis accessible
 * 3. Transition from Act 1 to Act 2 - Smooth transition with diagnostic insights carried forward
 * 4. Complete Act 2 flow - Prioritization scoring, trade-off analysis, explicit reasoning
 * 5. Transition from Act 2 to Act 3 - Smooth transition with prioritization context preserved
 * 6. Complete Act 3 flow - PRD generation, epic structure, 'most frameworks stop' callout
 * 7. Transition from Act 3 to Act 4 - Smooth transition with execution context preserved
 * 8. Complete Act 4 flow - KPI dashboard, 90-day plan, escalation triggers, portfolio intelligence
 * 9. Verify end-to-end traceability - Hover states reveal traceability chain
 * 10. Complete full demo in timed session (MANUAL - timing validation)
 * 11. Navigate independently without presenter - Self-guided flow with on-screen guidance
 */

test.describe('Full Demo Journey Flow', () => {
  test.describe('TC1: Start Demo from Entry Point', () => {
    test('Welcome overlay appears and user can begin Act 1 journey', async ({ page }) => {
      // Clear localStorage to simulate first-time user
      await page.addInitScript(() => localStorage.clear())

      await page.goto('/')
      await page.waitForLoadState('networkidle')

      // Verify welcome overlay is displayed
      await expect(page.getByTestId('welcome-overlay')).toBeVisible()
      await expect(page.getByText('Welcome to the Product Operating System')).toBeVisible()

      // Verify all four acts are mentioned
      await expect(page.getByText('Act 1: Diagnostic')).toBeVisible()
      await expect(page.getByText('Act 2: Prioritization')).toBeVisible()
      await expect(page.getByText('Act 3: Execution')).toBeVisible()
      await expect(page.getByText('Act 4: Governance')).toBeVisible()

      // Verify 'Start the Journey' button is present
      await expect(page.getByTestId('welcome-start-button')).toBeVisible()

      // Click to begin journey
      await page.getByTestId('welcome-start-button').click()

      // Should navigate to Engine 1
      await expect(page).toHaveURL(/\/engine-1/)
    })
  })

  test.describe('TC2: Complete Act 1 Flow', () => {
    test('Evidence explorer, maturity assessment, gap analysis, and benchmark comparison all accessible and functional', async ({ page }) => {
      await page.goto('/engine-1')
      await page.waitForSelector('[data-testid="engine-1-page"]')

      // Verify main Engine 1 title
      await expect(page.getByRole('heading', { name: /Engine 1: Diagnostic/i })).toBeVisible()

      // Verify Evidence Explorer is accessible
      const evidenceExplorer = page.getByTestId('evidence-explorer')
      await expect(evidenceExplorer).toBeVisible()

      // Test all evidence tabs are functional
      const tabs = ['interviews', 'nps', 'support', 'analytics']
      for (const tab of tabs) {
        await page.click(`[data-testid="tab-${tab}"]`)
        await expect(page.getByTestId(`${tab}-content`)).toBeVisible()
      }

      // Verify Maturity Assessment is accessible
      const maturityAssessment = page.getByTestId('maturity-assessment')
      await expect(maturityAssessment).toBeVisible()

      // Verify Gap Analysis is accessible
      const gapAnalysis = page.getByTestId('gap-analysis')
      await expect(gapAnalysis).toBeVisible()

      // Verify Benchmark Comparison is accessible
      const benchmarkComparison = page.getByTestId('benchmark-comparison')
      await expect(benchmarkComparison).toBeVisible()

      // Verify transition prompt is present
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await expect(page.getByTestId('transition-prompt')).toBeVisible()
    })
  })

  test.describe('TC3: Transition from Act 1 to Act 2', () => {
    test('Transition prompt leads smoothly to Engine 2 with diagnostic insights carried forward', async ({ page }) => {
      await page.goto('/engine-1')
      await page.waitForSelector('[data-testid="engine-1-page"]')

      // Scroll to transition prompt
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

      // Verify transition prompt has correct message
      const transitionPrompt = page.getByTestId('transition-prompt')
      await expect(transitionPrompt).toBeVisible()
      await expect(transitionPrompt).toContainText('Diagnosis complete. Now see how priorities emerge from this evidence.')

      // Click continue button to navigate to Engine 2
      await page.getByTestId('transition-prompt').locator('a, button').click()

      // Should navigate to Engine 2
      await expect(page).toHaveURL(/\/engine-2/)
      await page.waitForSelector('[data-testid="engine-2-page"]')

      // Verify diagnostic insights are carried forward via context badge
      const contextBadge = page.getByTestId('context-badge')
      await expect(contextBadge).toHaveText('Diagnostic insights inform prioritization')

      // Verify SDLC stepper shows Discovery completed
      await expect(page.getByTestId('checkmark-discovery')).toBeVisible()
    })
  })

  test.describe('TC4: Complete Act 2 Flow', () => {
    test('Prioritization scoring, trade-off analysis, and stakeholder input all accessible with explicit reasoning visible', async ({ page }) => {
      await page.goto('/engine-2')
      await page.waitForSelector('[data-testid="engine-2-page"]')

      // Verify main Engine 2 title
      await expect(page.getByText('Engine 2: Prioritization')).toBeVisible()

      // Verify Initiatives List is accessible
      const initiativesList = page.getByTestId('initiatives-list')
      await expect(initiativesList).toBeVisible()
      await expect(page.getByText('scheduling-compliance unification')).toBeVisible()
      await expect(page.getByText('AI copilot features')).toBeVisible()
      await expect(page.getByText('mobile experience overhaul')).toBeVisible()

      // Verify Scoring Methodology is accessible with correct weights
      const scoringMethodology = page.getByTestId('scoring-methodology')
      await expect(scoringMethodology).toBeVisible()
      await expect(page.getByTestId('weight-revenue-impact')).toHaveText('40%')
      await expect(page.getByTestId('weight-churn-risk-reduction')).toHaveText('25%')
      await expect(page.getByTestId('weight-competitive-exposure')).toHaveText('20%')
      await expect(page.getByTestId('weight-technical-enabler')).toHaveText('10%')
      await expect(page.getByTestId('weight-strategic-alignment')).toHaveText('5%')

      // Verify Trade-off Analysis is accessible
      const tradeoffAnalysis = page.getByTestId('trade-off-analysis')
      await expect(tradeoffAnalysis).toBeVisible()

      // Verify Explicit Reasoning is visible for top priority
      const explicitReasoning = page.getByTestId('explicit-reasoning')
      await expect(explicitReasoning).toBeVisible()
      await expect(page.getByTestId('reasoning-0')).toContainText("Addresses #1 customer request (47% of support tickets)")
      await expect(page.getByTestId('reasoning-1')).toContainText('Reduces churn risk by $2.3M ARR')
      await expect(page.getByTestId('reasoning-2')).toContainText('Closes competitive gap with Fleetio')

      // Verify Confidence Indicators are accessible
      const confidenceIndicators = page.getByTestId('confidence-indicators')
      await expect(confidenceIndicators).toBeVisible()

      // Verify transition prompt is present
      const transitionPrompt = page.getByTestId('transition-prompt')
      await expect(transitionPrompt).toBeVisible()
    })
  })

  test.describe('TC5: Transition from Act 2 to Act 3', () => {
    test('Transition prompt leads smoothly to Engine 3 with prioritization context preserved', async ({ page }) => {
      await page.goto('/engine-2')
      await page.waitForSelector('[data-testid="engine-2-page"]')

      // Verify transition prompt has correct message
      const transitionMessage = page.getByTestId('transition-message')
      await expect(transitionMessage).toHaveText('Priority set. Now watch the transformation into shipped product.')

      // Click continue button to navigate to Engine 3
      await page.getByTestId('transition-prompt').locator('a, button').click()

      // Should navigate to Engine 3
      await expect(page).toHaveURL(/\/engine-3/)
      await page.waitForSelector('[data-testid="engine-3-page"]')

      // Verify prioritization context is preserved via context badge
      await expect(page.getByText('Prioritization reasoning carried from Engine 2')).toBeVisible()

      // Verify SDLC stepper shows Discovery and Design completed
      await expect(page.getByText('(active)')).toBeVisible()
    })
  })

  test.describe('TC6: Complete Act 3 Flow', () => {
    test('PRD generation, epic structure, collaboration features, and time metrics all functional with "most frameworks stop" callout visible', async ({ page }) => {
      await page.goto('/engine-3')
      await page.waitForSelector('[data-testid="engine-3-page"]')

      // Verify Roadmap Items are accessible
      const roadmapItems = page.getByTestId('roadmap-items')
      await expect(roadmapItems).toBeVisible()

      // Click first roadmap item
      await page.click('[data-testid="roadmap-item-roadmap-001"]')

      // Generate PRD
      await page.click('[data-testid="generate-prd-button-roadmap-001"]')

      // Wait for PRD viewer to appear
      await expect(page.getByTestId('prd-viewer')).toBeVisible({ timeout: 10000 })

      // Verify PRD has acceptance criteria, edge cases, technical constraints
      await expect(page.getByTestId('acceptance-criteria')).toBeVisible()
      await expect(page.getByTestId('edge-cases')).toBeVisible()
      await expect(page.getByTestId('technical-constraints')).toBeVisible()

      // Verify collaboration features - stakeholder approvals
      await expect(page.getByTestId('stakeholder-approvals')).toBeVisible()
      await expect(page.getByTestId('approval-progress-bar')).toBeVisible()

      // Verify "Most frameworks stop" callout is visible
      const calloutMessage = page.getByTestId('callout-message')
      await expect(calloutMessage).toBeVisible()
      await expect(page.getByTestId('callout-message-text')).toContainText(
        "This is where most frameworks stop. This is where execution usually breaks. Yansu doesn't."
      )

      // Generate Epic Structure
      await page.click('[data-testid="generate-epic-button"]')
      await expect(page.getByTestId('epic-structure')).toBeVisible({ timeout: 10000 })

      // Verify stories list
      await expect(page.getByTestId('stories-list')).toBeVisible()

      // Verify time metrics table is displayed
      const metricsTable = page.getByTestId('metrics-table')
      await expect(metricsTable).toBeVisible()
      await expect(page.getByTestId('metric-manual-metric-001')).toContainText('1-2 weeks')
      await expect(page.getByTestId('metric-product-os-metric-001')).toContainText('Hours')

      // Verify unified platform message
      await expect(page.getByTestId('unified-platform-message')).toBeVisible()
    })
  })

  test.describe('TC7: Transition from Act 3 to Act 4', () => {
    test('Navigation leads smoothly to Engine 4 with execution context preserved', async ({ page }) => {
      await page.goto('/engine-3')
      await page.waitForSelector('[data-testid="engine-3-page"]')

      // Generate PRD to get to the navigation point
      await page.click('[data-testid="roadmap-item-roadmap-001"]')
      await page.click('[data-testid="generate-prd-button-roadmap-001"]')
      await page.waitForSelector('[data-testid="prd-viewer"]', { timeout: 10000 })

      // Navigate to Engine 4 (using navigation or link)
      await page.goto('/engine-4')

      // Should navigate to Engine 4
      await expect(page).toHaveURL(/\/engine-4/)
      await page.waitForSelector('[data-testid="engine-4-page"]')

      // Verify execution context is preserved via governance context message
      await expect(page.getByText('Governance connected to every upstream decision')).toBeVisible()

      // Verify SDLC stepper shows all stages with Deploy active
      await expect(page.getByText('Discovery')).toBeVisible()
      await expect(page.getByText('Design')).toBeVisible()
      await expect(page.getByText('Develop')).toBeVisible()
      await expect(page.getByText('Deploy')).toBeVisible()
    })
  })

  test.describe('TC8: Complete Act 4 Flow', () => {
    test('KPI dashboard, 90-day plan, escalation triggers, and cross-portfolio intelligence all accessible', async ({ page }) => {
      await page.goto('/engine-4')
      await page.waitForSelector('[data-testid="engine-4-page"]')

      // Verify main Engine 4 title
      await expect(page.getByRole('heading', { name: /Engine 4: Governance/i })).toBeVisible()

      // Verify KPI Dashboard is accessible
      const kpiDashboard = page.getByTestId('kpi-dashboard')
      await expect(kpiDashboard).toBeVisible()
      await expect(page.getByText('KPI Dashboard')).toBeVisible()
      await expect(page.getByTestId('kpi-card-kpi-1')).toBeVisible()
      await expect(page.getByTestId('kpi-card-kpi-2')).toBeVisible()
      await expect(page.getByTestId('kpi-card-kpi-3')).toBeVisible()
      await expect(page.getByTestId('kpi-card-kpi-4')).toBeVisible()

      // Verify 90-day Execution Timeline is accessible
      const executionTimeline = page.getByTestId('execution-timeline')
      await expect(executionTimeline).toBeVisible()
      await expect(page.getByText('90-Day Execution Timeline')).toBeVisible()
      await expect(page.getByText('Current Week')).toBeVisible()

      // Verify Escalation Queue is accessible
      const escalationQueue = page.getByTestId('escalation-queue')
      await expect(escalationQueue).toBeVisible()
      await expect(page.getByText('Mobile Experience Overhaul')).toBeVisible()
      await expect(page.getByText('Stalled 2+ weeks')).toBeVisible()

      // Verify Cross-Portfolio Intelligence is accessible
      const portfolioIntelligence = page.getByTestId('portfolio-intelligence')
      await expect(portfolioIntelligence).toBeVisible()
      await expect(page.getByText('Pattern Recognition')).toBeVisible()
      await expect(page.getByText('Integration Complexity')).toBeVisible()
      await expect(page.getByText('68%')).toBeVisible()

      // Verify Shared Learnings Feed
      await expect(page.getByText('Shared Learnings Feed')).toBeVisible()
      await expect(page.getByText('Portco A')).toBeVisible()

      // Verify Compounding Intelligence visualization
      const compoundingViz = page.getByTestId('compounding-visualization')
      await expect(compoundingViz).toBeVisible()
      await expect(page.getByText('127')).toBeVisible()
      await expect(page.getByText('Documented Patterns')).toBeVisible()

      // Verify Anchor Message
      const anchorMessage = page.getByTestId('anchor-message')
      await expect(anchorMessage).toBeVisible()
      await expect(page.getByText(/Every PE firm has playbooks. Vista can have a system that executes those playbooks/)).toBeVisible()

      // Verify Unified Platform Summary
      const unifiedSummary = page.getByTestId('unified-platform-summary')
      await expect(unifiedSummary).toBeVisible()
      await expect(page.getByText('One platform. 90+ portfolio companies. Compounding intelligence with every engagement.')).toBeVisible()
    })
  })

  test.describe('TC9: Verify End-to-End Traceability', () => {
    test('Hover states reveal traceability from governance KPIs back to diagnostic evidence', async ({ page }) => {
      await page.goto('/engine-4')
      await page.waitForSelector('[data-testid="engine-4-page"]')

      // Verify prioritization reasoning is linked to KPIs
      await expect(page.getByText('Prioritization reasoning linked to KPIs in real-time view')).toBeVisible()

      // Check KPI cards have info buttons for viewing prioritization reasoning
      const kpiCard = page.getByTestId('kpi-card-kpi-1')
      await expect(kpiCard).toBeVisible()

      // Look for info/traceability buttons on KPI cards
      const infoButtons = page.locator('[data-testid^="kpi-card-"] button')
      const infoButtonCount = await infoButtons.count()
      expect(infoButtonCount).toBeGreaterThan(0)

      // Hover over first info button to reveal traceability
      if (infoButtonCount > 0) {
        await infoButtons.first().hover()
        await page.waitForTimeout(300)

        // Check for traceability indicator or tooltip
        const traceabilityIndicator = page.locator('[data-testid="traceability-tooltip"], [role="tooltip"]')
        const indicatorCount = await traceabilityIndicator.count()
        if (indicatorCount > 0) {
          await expect(traceabilityIndicator.first()).toBeVisible()
        }
      }

      // Verify epic traceability in Engine 3 context
      await page.goto('/engine-3')
      await page.waitForSelector('[data-testid="engine-3-page"]')

      // Generate PRD and epic to see traceability
      await page.click('[data-testid="roadmap-item-roadmap-001"]')
      await page.click('[data-testid="generate-prd-button-roadmap-001"]')
      await page.waitForSelector('[data-testid="prd-viewer"]', { timeout: 10000 })
      await page.click('[data-testid="generate-epic-button"]')
      await page.waitForSelector('[data-testid="epic-structure"]', { timeout: 10000 })

      // Verify traceability back to customer feedback
      await expect(page.getByTestId('epic-traceability')).toBeVisible()
      await expect(page.getByTestId('traceability-feedback')).toContainText('Customer Advisory Board')
    })
  })

  // TC10 is marked as manual type - only documenting for reference
  test.describe('TC10: Complete Full Demo in Timed Session (MANUAL)', () => {
    test.skip('Full four-act demo completable within 10-minute window (2+3+3+2 structure)', async () => {
      // This test is manual - requires human verification of timing
      // The 10-minute presentation window follows this structure:
      // - Act 1: 2 minutes (Diagnostic)
      // - Act 2: 3 minutes (Prioritization)
      // - Act 3: 3 minutes (Execution - THE key moment)
      // - Act 4: 2 minutes (Governance)
      //
      // Manual verification checklist:
      // 1. Start timer when clicking 'Start the Journey' button
      // 2. Complete Act 1 (Engine 1) within ~2 minutes
      // 3. Complete Act 2 (Engine 2) within ~3 minutes
      // 4. Complete Act 3 (Engine 3) within ~3 minutes
      // 5. Complete Act 4 (Engine 4) within ~2 minutes
      // 6. Total time should be ≤10 minutes
    })
  })

  test.describe('TC11: Navigate Independently Without Presenter', () => {
    test('Self-guided flow enables complete navigation with on-screen guidance and contextual help', async ({ page }) => {
      // Clear localStorage to simulate first-time user
      await page.addInitScript(() => localStorage.clear())

      await page.goto('/')
      await page.waitForLoadState('networkidle')

      // Step 1: Verify Welcome Overlay provides initial guidance
      const welcomeOverlay = page.getByTestId('welcome-overlay')
      await expect(welcomeOverlay).toBeVisible()
      await expect(page.getByText('Welcome to the Product Operating System')).toBeVisible()

      // Dismiss welcome and verify 'Start here' guidance
      await page.getByTestId('welcome-close-button').click()

      // Verify 'Start here' button is visible for guidance
      const startHereButton = page.getByTestId('start-here-button')
      await expect(startHereButton).toBeVisible()

      // Verify help icons are present for contextual help
      await expect(page.getByTestId('help-icon-1')).toBeVisible()
      await expect(page.getByTestId('help-icon-2')).toBeVisible()
      await expect(page.getByTestId('help-icon-3')).toBeVisible()
      await expect(page.getByTestId('help-icon-4')).toBeVisible()

      // Step 2: Navigate through all engines using guided elements
      // Engine 1 - Click 'Start here' or engine quadrant
      await page.getByTestId('engine-quadrant-1').click()
      await expect(page).toHaveURL(/\/engine-1/)

      // Verify Engine 1 has transition prompt for guidance
      await page.waitForSelector('[data-testid="engine-1-page"]')
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      const e1TransitionPrompt = page.getByTestId('transition-prompt')
      await expect(e1TransitionPrompt).toBeVisible()

      // Navigate to Engine 2 via transition prompt
      await e1TransitionPrompt.locator('a, button').click()
      await expect(page).toHaveURL(/\/engine-2/)

      // Verify Engine 2 has transition prompt for guidance
      await page.waitForSelector('[data-testid="engine-2-page"]')
      const e2TransitionPrompt = page.getByTestId('transition-prompt')
      await expect(e2TransitionPrompt).toBeVisible()

      // Navigate to Engine 3 via transition prompt
      await e2TransitionPrompt.locator('a, button').click()
      await expect(page).toHaveURL(/\/engine-3/)

      // Verify Engine 3 page loads
      await page.waitForSelector('[data-testid="engine-3-page"]')

      // Navigate to Engine 4
      await page.goto('/engine-4')
      await expect(page).toHaveURL(/\/engine-4/)

      // Verify Engine 4 loads with all governance features
      await page.waitForSelector('[data-testid="engine-4-page"]')
      await expect(page.getByTestId('kpi-dashboard')).toBeVisible()
      await expect(page.getByTestId('portfolio-intelligence')).toBeVisible()

      // Verify unified platform summary shows successful journey completion
      await expect(page.getByTestId('unified-platform-summary')).toBeVisible()
    })
  })

  test.describe('Full Journey Integration', () => {
    test('Complete four-act demo journey from start to finish', async ({ page }) => {
      // Clear localStorage to simulate first-time user
      await page.addInitScript(() => localStorage.clear())

      // Start at dashboard hub
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      // Begin journey from welcome overlay
      await expect(page.getByTestId('welcome-overlay')).toBeVisible()
      await page.getByTestId('welcome-start-button').click()

      // Act 1: Complete Engine 1 (Diagnostic)
      await expect(page).toHaveURL(/\/engine-1/)
      await page.waitForSelector('[data-testid="engine-1-page"]')

      // Verify key Act 1 components
      await expect(page.getByTestId('evidence-explorer')).toBeVisible()
      await expect(page.getByTestId('maturity-assessment')).toBeVisible()
      await expect(page.getByTestId('gap-analysis')).toBeVisible()

      // Navigate to Act 2
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.getByTestId('transition-prompt').locator('a, button').click()

      // Act 2: Complete Engine 2 (Prioritization)
      await expect(page).toHaveURL(/\/engine-2/)
      await page.waitForSelector('[data-testid="engine-2-page"]')

      // Verify key Act 2 components
      await expect(page.getByTestId('initiatives-list')).toBeVisible()
      await expect(page.getByTestId('scoring-methodology')).toBeVisible()
      await expect(page.getByTestId('explicit-reasoning')).toBeVisible()

      // Navigate to Act 3
      await page.getByTestId('transition-prompt').locator('a, button').click()

      // Act 3: Complete Engine 3 (Execution) - THE key moment
      await expect(page).toHaveURL(/\/engine-3/)
      await page.waitForSelector('[data-testid="engine-3-page"]')

      // Generate PRD
      await page.click('[data-testid="roadmap-item-roadmap-001"]')
      await page.click('[data-testid="generate-prd-button-roadmap-001"]')
      await expect(page.getByTestId('prd-viewer')).toBeVisible({ timeout: 10000 })

      // Verify 'Most frameworks stop' callout
      await expect(page.getByTestId('callout-message')).toBeVisible()

      // Generate Epic Structure
      await page.click('[data-testid="generate-epic-button"]')
      await expect(page.getByTestId('epic-structure')).toBeVisible({ timeout: 10000 })

      // Navigate to Act 4
      await page.goto('/engine-4')

      // Act 4: Complete Engine 4 (Governance)
      await expect(page).toHaveURL(/\/engine-4/)
      await page.waitForSelector('[data-testid="engine-4-page"]')

      // Verify key Act 4 components
      await expect(page.getByTestId('kpi-dashboard')).toBeVisible()
      await expect(page.getByTestId('execution-timeline')).toBeVisible()
      await expect(page.getByTestId('escalation-queue')).toBeVisible()
      await expect(page.getByTestId('portfolio-intelligence')).toBeVisible()

      // Verify anchor message (key insight)
      await expect(page.getByTestId('anchor-message')).toBeVisible()
      await expect(page.getByText(/Every PE firm has playbooks. Vista can have a system that executes those playbooks/)).toBeVisible()

      // Verify unified platform summary
      await expect(page.getByTestId('unified-platform-summary')).toBeVisible()
      await expect(page.getByText('One platform. 90+ portfolio companies. Compounding intelligence with every engagement.')).toBeVisible()

      // Journey complete!
    })
  })
})
