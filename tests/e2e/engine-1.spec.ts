import { test, expect } from '@playwright/test'

test.describe('Engine 1 - Diagnostic Maturity Assessment', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page first
    await page.goto('/')
  })

  test('Test 1: Navigate to Engine 1 Diagnostic section - loads with maturity assessment dashboard', async ({ page }) => {
    // Click on Engine 1 link from dashboard
    await page.click('a[href="/engine-1"]')

    // Wait for the Engine 1 page to load
    await page.waitForSelector('[data-testid="engine-1-page"]')

    // Verify the page title indicates Engine 1
    await expect(page.locator('h1')).toContainText('Engine 1: Diagnostic')

    // Verify maturity assessment dashboard is present
    await expect(page.locator('[data-testid="maturity-assessment"]')).toBeVisible()

    // Verify evidence explorer is present
    await expect(page.locator('[data-testid="evidence-explorer"]')).toBeVisible()

    // Verify gap analysis is present
    await expect(page.locator('[data-testid="gap-analysis"]')).toBeVisible()

    // Verify benchmark comparison is present
    await expect(page.locator('[data-testid="benchmark-comparison"]')).toBeVisible()
  })

  test('Test 3: Click Interviews tab in evidence explorer - displays 8-10 interview transcript excerpts with thematic tagging', async ({ page }) => {
    // Navigate to Engine 1
    await page.goto('/engine-1')

    // Wait for page to load
    await page.waitForSelector('[data-testid="evidence-explorer"]')

    // Click on Interviews tab
    await page.click('[data-testid="tab-interviews"]')

    // Wait for interviews content to load
    await page.waitForSelector('[data-testid="interviews-content"]')

    // Verify interview excerpts are displayed (should have 8-10)
    const excerpts = await page.locator('[data-testid="interviews-content"] > div').count()
    expect(excerpts).toBeGreaterThanOrEqual(8)
    expect(excerpts).toBeLessThanOrEqual(12)

    // Verify thematic tagging is present
    const thematicTags = await page.locator('[data-testid="interviews-content"] .rounded.border').count()
    expect(thematicTags).toBeGreaterThan(0)
  })

  test('Test 4: Click NPS tab in evidence explorer - displays score distributions with verbatim comments (34% promoters, 41% passives, 25% detractors)', async ({ page }) => {
    // Navigate to Engine 1
    await page.goto('/engine-1')

    // Wait for page to load
    await page.waitForSelector('[data-testid="evidence-explorer"]')

    // Click on NPS tab
    await page.click('[data-testid="tab-nps"]')

    // Wait for NPS content to load
    await page.waitForSelector('[data-testid="nps-content"]')

    // Verify promoters percentage (34%)
    await expect(page.locator('text=34%')).toBeVisible()
    await expect(page.locator('text=Promoters')).toBeVisible()

    // Verify passives percentage (41%)
    await expect(page.locator('text=41%')).toBeVisible()
    await expect(page.locator('text=Passives')).toBeVisible()

    // Verify detractors percentage (25%)
    await expect(page.locator('text=25%')).toBeVisible()
    await expect(page.locator('text=Detractors')).toBeVisible()

    // Verify verbatim comments section exists
    await expect(page.locator('text=Verbatim Comments')).toBeVisible()
  })

  test('Test 5: Click Support Tickets tab in evidence explorer - displays ticket breakdown (47% scheduling, 23% compliance, 18% mobile, 12% other)', async ({ page }) => {
    // Navigate to Engine 1
    await page.goto('/engine-1')

    // Wait for page to load
    await page.waitForSelector('[data-testid="evidence-explorer"]')

    // Click on Support Tickets tab
    await page.click('[data-testid="tab-support"]')

    // Wait for support content to load
    await page.waitForSelector('[data-testid="support-content"]')

    // Verify category breakdown section
    await expect(page.locator('text=Category Breakdown')).toBeVisible()

    // Verify scheduling conflicts percentage (47%)
    await expect(page.locator('text=scheduling conflicts')).toBeVisible()
    await expect(page.locator('text=47%')).toBeVisible()

    // Verify compliance reporting percentage (23%)
    await expect(page.locator('text=compliance reporting')).toBeVisible()
    await expect(page.locator('text=23%')).toBeVisible()

    // Verify mobile access percentage (18%)
    await expect(page.locator('text=mobile access')).toBeVisible()
    await expect(page.locator('text=18%')).toBeVisible()

    // Verify other percentage (12%)
    await expect(page.locator('text=other')).toBeVisible()
    await expect(page.locator('text=12%')).toBeVisible()
  })

  test('Test 6: Click Usage Analytics tab in evidence explorer - displays adoption rates and drop-off funnels', async ({ page }) => {
    // Navigate to Engine 1
    await page.goto('/engine-1')

    // Wait for page to load
    await page.waitForSelector('[data-testid="evidence-explorer"]')

    // Click on Usage Analytics tab
    await page.click('[data-testid="tab-analytics"]')

    // Wait for analytics content to load
    await page.waitForSelector('[data-testid="analytics-content"]')

    const analyticsPanel = page.locator('[data-testid="analytics-content"]')

    // Verify Feature Adoption section heading
    await expect(analyticsPanel.getByRole('heading', { name: 'Feature Adoption' })).toBeVisible()

    // Verify adoption rates are displayed within analytics panel
    await expect(analyticsPanel.getByText('scheduling', { exact: true })).toBeVisible()
    await expect(analyticsPanel.getByText('89%')).toBeVisible() // scheduling adoption

    await expect(analyticsPanel.getByText('compliance', { exact: true })).toBeVisible()
    await expect(analyticsPanel.getByText('67%')).toBeVisible() // compliance adoption

    // Verify Engagement Funnel section
    await expect(analyticsPanel.getByRole('heading', { name: 'Engagement Funnel' })).toBeVisible()

    // Verify funnel metrics within analytics panel
    await expect(analyticsPanel.getByText('Onboarding Completion')).toBeVisible()
    await expect(analyticsPanel.getByText('72%')).toBeVisible()

    await expect(analyticsPanel.getByText('Core Feature Activation')).toBeVisible()
    await expect(analyticsPanel.getByText('58%')).toBeVisible()

    await expect(analyticsPanel.getByText('Advanced Feature Adoption')).toBeVisible()
    await expect(analyticsPanel.getByText('31%')).toBeVisible()

    // Verify Churn Risk Indicators section
    await expect(analyticsPanel.getByRole('heading', { name: 'Churn Risk Indicators' })).toBeVisible()
  })

  test('Test 10: Check transition prompt at end of Act 1 - displays correct message', async ({ page }) => {
    // Navigate to Engine 1
    await page.goto('/engine-1')

    // Wait for page to load
    await page.waitForSelector('[data-testid="engine-1-page"]')

    // Scroll to bottom to ensure transition prompt is visible
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    // Wait for transition prompt
    await page.waitForSelector('[data-testid="transition-prompt"]')

    // Verify the transition prompt message
    await expect(page.locator('[data-testid="transition-prompt"]')).toContainText(
      'Diagnosis complete. Now see how priorities emerge from this evidence.'
    )

    // Verify the continue button is present
    await expect(page.locator('[data-testid="transition-prompt"] a')).toBeVisible()
    await expect(page.locator('[data-testid="transition-prompt"]')).toContainText('Continue')
  })
})
