import { test, expect } from '@playwright/test';

test.describe('Engine 3 - PRD Generation and Execution', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Engine 3 page
    await page.goto('/engine-3');
    // Wait for the page to load
    await page.waitForSelector('[data-testid="engine-3-page"]');
  });

  test('Engine 3 interface loads with prioritized roadmap items', async ({ page }) => {
    // Verify the page loads
    await expect(page.locator('[data-testid="engine-3-page"]')).toBeVisible();

    // Verify roadmap items are displayed
    await expect(page.locator('[data-testid="roadmap-items"]')).toBeVisible();

    // Check that the top priority item is displayed
    await expect(page.locator('[data-testid="roadmap-item-roadmap-001"]')).toBeVisible();
    await expect(page.locator('[data-testid="roadmap-item-name-roadmap-001"]')).toContainText(
      'Unified Scheduling-Compliance Platform'
    );
  });

  test('SDLC progress stepper shows correct state', async ({ page }) => {
    // Verify stepper is visible
    const stepper = page.locator('text=Discovery >> xpath=../..').first();
    await expect(stepper).toBeVisible();

    // Verify Discovery and Design are completed (checkmarks present)
    // The current stage "Develop" should be active
    await expect(page.locator('text=Develop')).toBeVisible();
    await expect(page.locator('text=(active)')).toBeVisible();

    // Verify context badge
    await expect(page.locator('text=Prioritization reasoning carried from Engine 2')).toBeVisible();
  });

  test('Click priority item triggers PRD generation animation', async ({ page }) => {
    // Click on the first roadmap item
    await page.click('[data-testid="roadmap-item-roadmap-001"]');

    // Click Generate PRD button
    await page.click('[data-testid="generate-prd-button-roadmap-001"]');

    // Wait for transformation animation
    await expect(page.locator('[data-testid="transformation-animation"]')).toBeVisible({ timeout: 5000 });

    // Wait for PRD to appear
    await expect(page.locator('[data-testid="prd-viewer"]')).toBeVisible({ timeout: 10000 });

    // Verify PRD has acceptance criteria, edge cases, technical constraints
    await expect(page.locator('[data-testid="acceptance-criteria"]')).toBeVisible();
    await expect(page.locator('[data-testid="edge-cases"]')).toBeVisible();
    await expect(page.locator('[data-testid="technical-constraints"]')).toBeVisible();
  });

  test('PRD displays collapsible sections with inline comment threads and approval status', async ({ page }) => {
    // First generate PRD
    await page.click('[data-testid="roadmap-item-roadmap-001"]');
    await page.click('[data-testid="generate-prd-button-roadmap-001"]');
    await page.waitForSelector('[data-testid="prd-viewer"]', { timeout: 10000 });

    // Verify collapsible sections exist
    await expect(page.locator('[data-testid="prd-sections"]')).toBeVisible();
    await expect(page.locator('[data-testid="prd-section-section-overview"]')).toBeVisible();

    // Verify approval status indicators
    await expect(page.locator('[data-testid^="approval-status-"]').first()).toBeVisible();

    // Verify stakeholder approvals panel
    await expect(page.locator('[data-testid="stakeholder-approvals"]')).toBeVisible();
    await expect(page.locator('[data-testid="approval-progress-bar"]')).toBeVisible();
  });

  test('Collaboration simulation shows comment threads and approval progress', async ({ page }) => {
    // Generate PRD first
    await page.click('[data-testid="roadmap-item-roadmap-001"]');
    await page.click('[data-testid="generate-prd-button-roadmap-001"]');
    await page.waitForSelector('[data-testid="prd-viewer"]', { timeout: 10000 });

    // Expand overview section to see comments
    await page.click('[data-testid="prd-section-toggle-section-overview"]');

    // Verify comment thread is visible
    await expect(page.locator('[data-testid="comment-thread-comment-001"]')).toBeVisible();

    // Verify stakeholder approval indicators
    await expect(page.locator('[data-testid="approval-brandon-holden"]')).toBeVisible();
    await expect(page.locator('[data-testid="approval-sarah-chen"]')).toBeVisible();
  });

  test('Generate Epic Structure button transforms PRD into story-ready format', async ({ page }) => {
    // Generate PRD first
    await page.click('[data-testid="roadmap-item-roadmap-001"]');
    await page.click('[data-testid="generate-prd-button-roadmap-001"]');
    await page.waitForSelector('[data-testid="prd-viewer"]', { timeout: 10000 });

    // Click Generate Epic Structure button
    await page.click('[data-testid="generate-epic-button"]');

    // Wait for transformation
    await expect(page.locator('[data-testid="transformation-animation"]')).toBeVisible({ timeout: 5000 });

    // Wait for epic structure to appear
    await expect(page.locator('[data-testid="epic-structure"]')).toBeVisible({ timeout: 10000 });

    // Verify stories list with drag-and-drop styling
    await expect(page.locator('[data-testid="stories-list"]')).toBeVisible();
    await expect(page.locator('[data-testid="story-story-001"]')).toBeVisible();
  });

  test('Test scenarios and code scaffolding display with traceability indicators', async ({ page }) => {
    // Generate PRD and Epic
    await page.click('[data-testid="roadmap-item-roadmap-001"]');
    await page.click('[data-testid="generate-prd-button-roadmap-001"]');
    await page.waitForSelector('[data-testid="prd-viewer"]', { timeout: 10000 });
    await page.click('[data-testid="generate-epic-button"]');
    await page.waitForSelector('[data-testid="epic-structure"]', { timeout: 10000 });

    // Verify test scenarios
    await expect(page.locator('[data-testid="test-scenarios-list"]')).toBeVisible();
    await expect(page.locator('[data-testid="test-scenario-test-001"]')).toBeVisible();

    // Verify code scaffolding
    await expect(page.locator('[data-testid="code-scaffolds-list"]')).toBeVisible();
    await expect(page.locator('[data-testid="code-scaffold-scaffold-001"]')).toBeVisible();

    // Verify traceability back to customer feedback
    await expect(page.locator('[data-testid="epic-traceability"]')).toBeVisible();
    await expect(page.locator('[data-testid="traceability-feedback"]')).toContainText(
      'Customer Advisory Board'
    );
  });

  test('"Most frameworks stop" callout is displayed', async ({ page }) => {
    // Generate PRD first
    await page.click('[data-testid="roadmap-item-roadmap-001"]');
    await page.click('[data-testid="generate-prd-button-roadmap-001"]');
    await page.waitForSelector('[data-testid="prd-viewer"]', { timeout: 10000 });

    // Verify callout message
    await expect(page.locator('[data-testid="callout-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="callout-message-text"]')).toContainText(
      "This is where most frameworks stop. This is where execution usually breaks. Yansu doesn't."
    );
  });

  test('Time reduction metrics table displays correct values', async ({ page }) => {
    // Generate PRD to show metrics table
    await page.click('[data-testid="roadmap-item-roadmap-001"]');
    await page.click('[data-testid="generate-prd-button-roadmap-001"]');
    await page.waitForSelector('[data-testid="prd-viewer"]', { timeout: 10000 });

    // Verify metrics table is visible
    await expect(page.locator('[data-testid="metrics-table"]')).toBeVisible();
    await expect(page.locator('[data-testid="metrics-comparison-table"]')).toBeVisible();

    // Verify specific metrics
    // PRD creation: 1-2 weeks -> Hours
    await expect(page.locator('[data-testid="metric-manual-metric-001"]')).toContainText('1-2 weeks');
    await expect(page.locator('[data-testid="metric-product-os-metric-001"]')).toContainText('Hours');

    // Prioritization cycle: 3-4 weeks -> 3-5 days
    await expect(page.locator('[data-testid="metric-manual-metric-002"]')).toContainText('3-4 weeks');
    await expect(page.locator('[data-testid="metric-product-os-metric-002"]')).toContainText('3-5 days');

    // Decision documentation: ~30% -> 95%+
    await expect(page.locator('[data-testid="metric-manual-metric-003"]')).toContainText('~30%');
    await expect(page.locator('[data-testid="metric-product-os-metric-003"]')).toContainText('95%+');

    // Time to artifacts: 2-4 weeks -> Days
    await expect(page.locator('[data-testid="metric-manual-metric-004"]')).toContainText('2-4 weeks');
    await expect(page.locator('[data-testid="metric-product-os-metric-004"]')).toContainText('Days');

    // Rework: 25-35% -> Under 10%
    await expect(page.locator('[data-testid="metric-manual-metric-005"]')).toContainText('25-35%');
    await expect(page.locator('[data-testid="metric-product-os-metric-005"]')).toContainText('Under 10%');
  });

  test('Unified platform message is displayed', async ({ page }) => {
    // Generate PRD to show unified platform message
    await page.click('[data-testid="roadmap-item-roadmap-001"]');
    await page.click('[data-testid="generate-prd-button-roadmap-001"]');
    await page.waitForSelector('[data-testid="prd-viewer"]', { timeout: 10000 });

    // Verify unified platform message
    await expect(page.locator('[data-testid="unified-platform-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="unified-platform-message-text"]')).toContainText(
      "No handoffs. No lost context. No 'wait, why did we decide this?'"
    );
  });
});
