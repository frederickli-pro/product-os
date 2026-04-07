import { test, expect } from '@playwright/test'

test.describe('Engine 4 - Governance and Cross-Portfolio Intelligence', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/engine-4')
  })

  test('Engine 4 interface loads with KPI dashboard and governance features', async ({ page }) => {
    // Wait for the page to load
    await expect(page.getByTestId('engine-4-page')).toBeVisible()

    // Check page title
    await expect(page.getByRole('heading', { name: 'Engine 4: Governance' })).toBeVisible()

    // Verify KPI dashboard is present
    await expect(page.getByTestId('kpi-dashboard')).toBeVisible()

    // Verify execution timeline is present
    await expect(page.getByTestId('execution-timeline')).toBeVisible()

    // Verify escalation queue is present
    await expect(page.getByTestId('escalation-queue')).toBeVisible()

    // Verify portfolio intelligence is present
    await expect(page.getByTestId('portfolio-intelligence')).toBeVisible()
  })

  test('SDLC progress stepper shows all stages completed with Deploy active', async ({ page }) => {
    // Check that all stages are visible
    await expect(page.getByText('Discovery')).toBeVisible()
    await expect(page.getByText('Design')).toBeVisible()
    await expect(page.getByText('Develop')).toBeVisible()
    await expect(page.getByText('Deploy')).toBeVisible()

    // Check that the governance context message is displayed
    await expect(page.getByText('Governance connected to every upstream decision')).toBeVisible()

    // Check that Deploy is active
    await expect(page.getByText('(active)')).toBeVisible()
  })

  test('90-day execution timeline displays with weekly milestones', async ({ page }) => {
    const timeline = page.getByTestId('execution-timeline')
    await expect(timeline).toBeVisible()

    // Check for timeline title
    await expect(page.getByText('90-Day Execution Timeline')).toBeVisible()

    // Check for current week indicator
    await expect(page.getByText('Current Week')).toBeVisible()

    // Check for overall progress indicator
    await expect(page.getByText('Overall Progress')).toBeVisible()

    // Check for milestones
    await expect(page.getByText('Discovery Complete')).toBeVisible()
    await expect(page.getByText('Maturity Assessment')).toBeVisible()
    await expect(page.getByText('Prioritization Locked')).toBeVisible()
    await expect(page.getByText('PRD Generation Sprint 1')).toBeVisible()
  })

  test('KPI dashboard shows progress indicators with trend visualization', async ({ page }) => {
    const dashboard = page.getByTestId('kpi-dashboard')
    await expect(dashboard).toBeVisible()

    // Check for KPI title
    await expect(page.getByText('KPI Dashboard')).toBeVisible()

    // Check for specific KPIs
    await expect(page.getByText('Platform Unification Progress')).toBeVisible()
    await expect(page.getByText('Customer Incident Resolution')).toBeVisible()
    await expect(page.getByText('Enterprise Renewal Risk')).toBeVisible()
    await expect(page.getByText('AI Feature Readiness')).toBeVisible()

    // Check for KPI cards
    await expect(page.getByTestId('kpi-card-kpi-1')).toBeVisible()
    await expect(page.getByTestId('kpi-card-kpi-2')).toBeVisible()
    await expect(page.getByTestId('kpi-card-kpi-3')).toBeVisible()
    await expect(page.getByTestId('kpi-card-kpi-4')).toBeVisible()
  })

  test('prioritization reasoning is linked to KPIs in real-time view', async ({ page }) => {
    // Check for the linkage text
    await expect(page.getByText('Prioritization reasoning linked to KPIs in real-time view')).toBeVisible()

    // Check that KPI cards have info tooltips for prioritization reasoning
    const infoButtons = page.locator('[data-testid^="kpi-card-"] button')
    await expect(infoButtons.first()).toBeVisible()
  })

  test('escalation triggers panel shows items stalled for 2+ weeks', async ({ page }) => {
    const queue = page.getByTestId('escalation-queue')
    await expect(queue).toBeVisible()

    // Check for the description
    await expect(page.getByText('Items stalled for 2+ weeks with context and action buttons')).toBeVisible()

    // Check for escalation items
    await expect(page.getByText('Mobile Experience Overhaul')).toBeVisible()
    await expect(page.getByText('Compliance Audit Automation')).toBeVisible()

    // Check for stalled duration
    await expect(page.getByText('Stalled 2+ weeks')).toBeVisible()
    await expect(page.getByText('Stalled 3+ weeks')).toBeVisible()

    // Check for impact badges
    await expect(page.getByText('Medium Impact')).toBeVisible()
    await expect(page.getByText('High Impact')).toBeVisible()

    // Check for action buttons
    const takeActionButtons = page.getByRole('button', { name: 'Take Action' })
    await expect(takeActionButtons.first()).toBeVisible()

    const acknowledgeButtons = page.getByRole('button', { name: 'Acknowledge' })
    await expect(acknowledgeButtons.first()).toBeVisible()
  })

  test('cross-portfolio pattern recognition shows recurring challenges', async ({ page }) => {
    const intelligence = page.getByTestId('portfolio-intelligence')
    await expect(intelligence).toBeVisible()

    // Check for pattern recognition section
    await expect(page.getByText('Pattern Recognition')).toBeVisible()

    // Check for specific patterns with percentages
    await expect(page.getByText('Integration Complexity')).toBeVisible()
    await expect(page.getByText('68%')).toBeVisible()

    await expect(page.getByText('Mobile Experience Gaps')).toBeVisible()
    await expect(page.getByText('52%')).toBeVisible()

    await expect(page.getByText('AI Feature Requests')).toBeVisible()
    await expect(page.getByText('78%')).toBeVisible()

    // Check for verticals
    await expect(page.getByText('B2B SaaS')).toBeVisible()
  })

  test('shared learnings feed displays anonymized insights', async ({ page }) => {
    // Check for shared learnings section
    await expect(page.getByText('Shared Learnings Feed')).toBeVisible()

    // Check for specific learning from Portco A
    await expect(page.getByText('Portco A')).toBeVisible()
    await expect(page.getByText('Reduced scheduling integration time by 60% using GraphQL federation approach')).toBeVisible()
    await expect(page.getByText('60% faster integration')).toBeVisible()
  })

  test('success rate indicators display implementation outcomes', async ({ page }) => {
    // Check for success rates section
    await expect(page.getByText('Implementation Success Rates')).toBeVisible()

    // Check for specific success rates
    await expect(page.getByText('Compliance features')).toBeVisible()
    await expect(page.getByText('92% on-time')).toBeVisible()

    await expect(page.getByText('AI capabilities')).toBeVisible()
    await expect(page.getByText('67% on-time')).toBeVisible()

    await expect(page.getByText('Platform unifications')).toBeVisible()
    await expect(page.getByText('81% on-time')).toBeVisible()
  })

  test('compounding intelligence visualization displays pattern library growth', async ({ page }) => {
    const compounding = page.getByTestId('compounding-visualization')
    await expect(compounding).toBeVisible()

    // Check for compounding intelligence title
    await expect(page.getByText('Compounding Intelligence')).toBeVisible()

    // Check for specific metrics
    await expect(page.getByText('127')).toBeVisible()
    await expect(page.getByText('Documented Patterns')).toBeVisible()

    await expect(page.getByText('34')).toBeVisible()
    await expect(page.getByText('Proven Playbooks')).toBeVisible()

    await expect(page.getByText('8')).toBeVisible()
    await expect(page.getByText('Industry-Specific Templates')).toBeVisible()
  })

  test('anchor line message displays correctly', async ({ page }) => {
    const anchor = page.getByTestId('anchor-message')
    await expect(anchor).toBeVisible()

    // Check for the anchor message text
    await expect(page.getByText(/Every PE firm has playbooks. Vista can have a system that executes those playbooks — and gets smarter every time it runs./)).toBeVisible()
  })

  test('unified platform value summary displays correctly', async ({ page }) => {
    const summary = page.getByTestId('unified-platform-summary')
    await expect(summary).toBeVisible()

    // Check for the unified platform message
    await expect(page.getByText('One platform. 90+ portfolio companies. Compounding intelligence with every engagement.')).toBeVisible()
  })
})
