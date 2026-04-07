import { test, expect } from '@playwright/test';

test.describe('Dashboard Hub Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to simulate first visit when needed
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('Dashboard hub loads with all core components', async ({ page }) => {
    // Test Case 1: Dashboard hub landing page
    // Close welcome overlay if visible
    const closeButton = page.getByTestId('welcome-close-button');
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }

    await expect(page.getByText('Product Operating System')).toBeVisible();
    await expect(page.getByText('Portfolio AI Accountability Playbook')).toBeVisible();
    await expect(page.getByTestId('sdlc-stepper')).toBeVisible();
    await expect(page.getByTestId('progress-bar')).toBeVisible();
    await expect(page.getByTestId('engine-grid')).toBeVisible();
  });

  test('Four engine quadrants display in 2x2 grid', async ({ page }) => {
    // Test Case 2: Verify engine quadrants
    // Close welcome overlay if visible
    const closeButton = page.getByTestId('welcome-close-button');
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }

    await expect(page.getByTestId('engine-quadrant-1')).toBeVisible();
    await expect(page.getByTestId('engine-quadrant-2')).toBeVisible();
    await expect(page.getByTestId('engine-quadrant-3')).toBeVisible();
    await expect(page.getByTestId('engine-quadrant-4')).toBeVisible();

    // Verify engine names
    await expect(page.getByText('Diagnostic')).toBeVisible();
    await expect(page.getByText('Prioritization')).toBeVisible();
    await expect(page.getByText('Execution')).toBeVisible();
    await expect(page.getByText('Governance')).toBeVisible();
  });

  test('Welcome overlay displays for first-time visitors', async ({ page }) => {
    // Test Case 3: Welcome overlay
    await expect(page.getByTestId('welcome-overlay')).toBeVisible();
    await expect(page.getByText('Welcome to the Product Operating System')).toBeVisible();
    await expect(page.getByTestId('welcome-start-button')).toBeVisible();
    await expect(page.getByTestId('welcome-close-button')).toBeVisible();

    // Check four acts are displayed
    await expect(page.getByText('Act 1: Diagnostic')).toBeVisible();
    await expect(page.getByText('Act 2: Prioritization')).toBeVisible();
    await expect(page.getByText('Act 3: Execution')).toBeVisible();
    await expect(page.getByText('Act 4: Governance')).toBeVisible();
  });

  test('Welcome overlay can be dismissed', async ({ page }) => {
    // Test Case 3b: Dismiss welcome overlay
    await expect(page.getByTestId('welcome-overlay')).toBeVisible();
    await page.getByTestId('welcome-close-button').click();
    await expect(page.getByTestId('welcome-overlay')).not.toBeVisible();
  });

  test('SDLC stepper shows all four stages', async ({ page }) => {
    // Test Case 4: SDLC progress stepper
    // Close welcome overlay if visible
    const closeButton = page.getByTestId('welcome-close-button');
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }

    await expect(page.getByTestId('stage-discovery')).toBeVisible();
    await expect(page.getByTestId('stage-design')).toBeVisible();
    await expect(page.getByTestId('stage-develop')).toBeVisible();
    await expect(page.getByTestId('stage-deploy')).toBeVisible();

    // Check stage labels
    await expect(page.getByText('Discovery')).toBeVisible();
    await expect(page.getByText('Design')).toBeVisible();
    await expect(page.getByText('Develop')).toBeVisible();
    await expect(page.getByText('Deploy')).toBeVisible();
  });

  test('"Start here" button visible on Engine 1 for new users', async ({ page }) => {
    // Test Case 5: Start here entry point
    // Close welcome overlay if visible
    const closeButton = page.getByTestId('welcome-close-button');
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }

    await expect(page.getByTestId('start-here-button')).toBeVisible();
    await expect(page.getByText('Start Here')).toBeVisible();
  });

  test('Help icons are present on engine quadrants', async ({ page }) => {
    // Test Case 6: Help icons with tooltips
    // Close welcome overlay if visible
    const closeButton = page.getByTestId('welcome-close-button');
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }

    await expect(page.getByTestId('help-icon-1')).toBeVisible();
    await expect(page.getByTestId('help-icon-2')).toBeVisible();
    await expect(page.getByTestId('help-icon-3')).toBeVisible();
    await expect(page.getByTestId('help-icon-4')).toBeVisible();
  });

  test('Progress bar shows correct initial state', async ({ page }) => {
    // Test Case 7: Progress bar indicator
    // Close welcome overlay if visible
    const closeButton = page.getByTestId('welcome-close-button');
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }

    const progressBar = page.getByTestId('progress-bar');
    await expect(progressBar).toBeVisible();
    await expect(progressBar).toHaveAttribute('role', 'progressbar');
    await expect(progressBar).toHaveAttribute('aria-valuenow', '0');
    await expect(page.getByText('0/4 Acts Completed')).toBeVisible();
  });

  test('Engine status indicators display correctly', async ({ page }) => {
    // Test Case 6b: Engine status indicators
    // Close welcome overlay if visible
    const closeButton = page.getByTestId('welcome-close-button');
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }

    // Check status indicators exist
    await expect(page.getByTestId('engine-status-indicator-1')).toBeVisible();
    await expect(page.getByTestId('engine-status-indicator-2')).toBeVisible();
    await expect(page.getByTestId('engine-status-indicator-3')).toBeVisible();
    await expect(page.getByTestId('engine-status-indicator-4')).toBeVisible();
  });

  test('"Jump to Engine" buttons are present', async ({ page }) => {
    // Test Case 8: Jump to engine navigation
    // Close welcome overlay if visible
    const closeButton = page.getByTestId('welcome-close-button');
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }

    // Check jump to engine buttons for non-active engines
    await expect(page.getByTestId('jump-to-engine-2')).toBeVisible();
    await expect(page.getByTestId('jump-to-engine-3')).toBeVisible();
    await expect(page.getByTestId('jump-to-engine-4')).toBeVisible();
  });

  test('Clicking "Start the Journey" navigates to Engine 1', async ({ page }) => {
    // Test Case 9: Start demo navigation
    await expect(page.getByTestId('welcome-overlay')).toBeVisible();
    await page.getByTestId('welcome-start-button').click();

    // Should navigate to Engine 1
    await expect(page).toHaveURL(/\/engine-1/);
  });

  test('Clicking engine quadrant navigates to engine page', async ({ page }) => {
    // Test Case 10: Engine navigation
    // Close welcome overlay if visible
    const closeButton = page.getByTestId('welcome-close-button');
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }

    // Click on Engine 2 quadrant
    await page.getByTestId('engine-quadrant-2').click();
    await expect(page).toHaveURL(/\/engine-2/);
  });

  test('Dashboard displays context message', async ({ page }) => {
    // Test Case 11: Context message
    // Close welcome overlay if visible
    const closeButton = page.getByTestId('welcome-close-button');
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }

    await expect(page.getByTestId('context-message')).toBeVisible();
    await expect(page.getByTestId('context-message')).toHaveText(
      'Start with Engine 1 to begin your diagnostic assessment'
    );
  });

  test('Hero section displays platform description', async ({ page }) => {
    // Test Case 12: Hero section
    // Close welcome overlay if visible
    const closeButton = page.getByTestId('welcome-close-button');
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }

    await expect(page.getByText('The Four-Engine Operating System')).toBeVisible();
    await expect(page.getByText(/From customer insight to customer outcomes/)).toBeVisible();
  });
});
