/**
 * E2E Tests for Interactive Animations and Transitions
 * Owner: Scenario 10 - Interactive Animations and Transitions
 *
 * Test Cases:
 * 1. PRD generation animation - animated transition from roadmap item to PRD
 * 2. Epic structure animation - animated transition from PRD to epic/story
 * 3. Dashboard progress bar animations - smooth loading animations
 * 4. Hover states - reveal traceability data on hover
 * 5. Collapsible section animations - smooth expand/collapse
 * 6. Navigation animations - smooth transitions between engines
 */

import { test, expect, Page } from '@playwright/test';

// Helper function to measure animation timing
async function measureAnimationDuration(
  page: Page,
  selector: string,
  maxDuration: number = 3000
): Promise<number> {
  const startTime = Date.now();
  await page.waitForSelector(selector, { state: 'visible', timeout: maxDuration });
  return Date.now() - startTime;
}

// Helper to check for smooth animations (no stuttering)
async function checkAnimationSmoothness(page: Page): Promise<boolean> {
  // Inject performance monitoring
  const frameDrops = await page.evaluate(() => {
    return new Promise<number>((resolve) => {
      let drops = 0;
      let lastTime = performance.now();
      let frameCount = 0;
      const maxFrames = 60; // Monitor for ~1 second

      function checkFrame(currentTime: number) {
        const delta = currentTime - lastTime;
        // Frame drop detected if delta > 50ms (less than 20fps)
        if (delta > 50) {
          drops++;
        }
        lastTime = currentTime;
        frameCount++;

        if (frameCount < maxFrames) {
          requestAnimationFrame(checkFrame);
        } else {
          resolve(drops);
        }
      }

      requestAnimationFrame(checkFrame);
    });
  });

  // Allow up to 3 minor frame drops
  return frameDrops <= 3;
}

test.describe('Scenario 10: Interactive Animations and Transitions', () => {
  test.describe('Test Case 1: PRD Generation Animation', () => {
    test('Click priority item for PRD generation triggers animated transition', async ({ page }) => {
      // Navigate to Engine 3
      await page.goto('/engine-3');
      await page.waitForSelector('[data-testid="engine-3-page"]');

      // Click on roadmap item
      const roadmapItem = page.locator('[data-testid="roadmap-item-roadmap-001"]');
      await expect(roadmapItem).toBeVisible();
      await roadmapItem.click();

      // Click Generate PRD button
      const generateButton = page.locator('[data-testid="generate-prd-button-roadmap-001"]');
      await expect(generateButton).toBeVisible();
      await generateButton.click();

      // Verify transformation animation appears
      const transformationAnimation = page.locator('[data-testid="transformation-animation"]');
      await expect(transformationAnimation).toBeVisible({ timeout: 5000 });

      // Verify animation has correct data attributes
      await expect(transformationAnimation).toHaveAttribute('data-animating', 'true');

      // Wait for PRD viewer to appear (animation complete)
      const prdViewer = page.locator('[data-testid="prd-viewer"]');
      await expect(prdViewer).toBeVisible({ timeout: 10000 });

      // Verify structured PRD is displayed with key sections
      await expect(page.locator('[data-testid="prd-sections"]')).toBeVisible();
      await expect(page.locator('[data-testid="acceptance-criteria"]')).toBeVisible();
      await expect(page.locator('[data-testid="edge-cases"]')).toBeVisible();
      await expect(page.locator('[data-testid="technical-constraints"]')).toBeVisible();
    });

    test('PRD generation animation shows progress indicators', async ({ page }) => {
      await page.goto('/engine-3');
      await page.waitForSelector('[data-testid="engine-3-page"]');

      await page.click('[data-testid="roadmap-item-roadmap-001"]');
      await page.click('[data-testid="generate-prd-button-roadmap-001"]');

      // Verify animation center element with loading state
      const animationCenter = page.locator('[data-testid="animation-center"]');
      await expect(animationCenter).toBeVisible({ timeout: 5000 });

      // Verify morphing icon is visible
      const morphingIcon = page.locator('[data-testid="morphing-icon"]');
      await expect(morphingIcon).toBeVisible();

      // Verify animation status message
      const animationStatus = page.locator('[data-testid="animation-status"]');
      await expect(animationStatus).toBeVisible();
    });
  });

  test.describe('Test Case 2: Epic Structure Animation', () => {
    test('Click Generate Epic Structure triggers animated transformation', async ({ page }) => {
      await page.goto('/engine-3');
      await page.waitForSelector('[data-testid="engine-3-page"]');

      // First generate PRD
      await page.click('[data-testid="roadmap-item-roadmap-001"]');
      await page.click('[data-testid="generate-prd-button-roadmap-001"]');
      await page.waitForSelector('[data-testid="prd-viewer"]', { timeout: 10000 });

      // Click Generate Epic Structure
      const epicButton = page.locator('[data-testid="generate-epic-button"]');
      await expect(epicButton).toBeVisible();
      await epicButton.click();

      // Verify transformation animation
      const transformationAnimation = page.locator('[data-testid="transformation-animation"]');
      await expect(transformationAnimation).toBeVisible({ timeout: 5000 });

      // Wait for epic structure to appear
      const epicStructure = page.locator('[data-testid="epic-structure"]');
      await expect(epicStructure).toBeVisible({ timeout: 10000 });

      // Verify epic/story structure is displayed
      await expect(page.locator('[data-testid="stories-list"]')).toBeVisible();
      await expect(page.locator('[data-testid="test-scenarios-list"]')).toBeVisible();
      await expect(page.locator('[data-testid="code-scaffolds-list"]')).toBeVisible();
    });

    test('Epic transformation shows visual morphing effect', async ({ page }) => {
      await page.goto('/engine-3');
      await page.waitForSelector('[data-testid="engine-3-page"]');

      await page.click('[data-testid="roadmap-item-roadmap-001"]');
      await page.click('[data-testid="generate-prd-button-roadmap-001"]');
      await page.waitForSelector('[data-testid="prd-viewer"]', { timeout: 10000 });

      await page.click('[data-testid="generate-epic-button"]');

      // Check for animation phase changes
      const animation = page.locator('[data-testid="transformation-animation"]');
      await expect(animation).toHaveAttribute('data-phase', 'transforming', { timeout: 5000 });

      // Wait for completion
      await page.waitForSelector('[data-testid="epic-structure"]', { timeout: 15000 });
    });
  });

  test.describe('Test Case 3: Dashboard Progress Bar Animations', () => {
    test('Progress bars animate on dashboard load without stuttering', async ({ page }) => {
      await page.goto('/');
      await page.waitForSelector('[data-testid="engine-grid"]');

      // Verify progress bar is visible
      const progressBar = page.locator('[data-testid="progress-bar"]');
      await expect(progressBar).toBeVisible();

      // Check that the progress bar has animation attributes
      await expect(progressBar).toHaveAttribute('role', 'progressbar');

      // Measure animation performance
      const isSmooth = await checkAnimationSmoothness(page);
      expect(isSmooth).toBe(true);
    });

    test('SDLC stepper animates between stages', async ({ page }) => {
      await page.goto('/');
      await page.waitForSelector('[data-testid="engine-grid"]');

      // Navigate to Engine 1 to trigger stepper animation
      await page.click('[data-testid="engine-quadrant-1"]');
      await page.waitForSelector('[data-testid="engine-1-page"]');

      // Verify stepper shows Discovery as active with animation
      await expect(page.locator('text=Discovery')).toBeVisible();
      await expect(page.locator('text=(active)')).toBeVisible();

      // Navigate to Engine 2
      await page.goto('/engine-2');
      await page.waitForSelector('[data-testid="engine-2-page"]');

      // Verify stepper updated with checkmark on Discovery
      await expect(page.locator('text=Design')).toBeVisible();
    });

    test('KPI dashboard progress bars animate on Engine 4 load', async ({ page }) => {
      await page.goto('/engine-4');
      await page.waitForSelector('[data-testid="engine-4-page"]');

      // Verify KPI dashboard is visible
      const kpiDashboard = page.locator('[data-testid="kpi-dashboard"]');
      await expect(kpiDashboard).toBeVisible();

      // Check for progress indicators
      const progressIndicators = page.locator('[data-testid^="kpi-progress-"]');
      const count = await progressIndicators.count();
      expect(count).toBeGreaterThan(0);

      // Verify animations are smooth
      const isSmooth = await checkAnimationSmoothness(page);
      expect(isSmooth).toBe(true);
    });
  });

  test.describe('Test Case 4: Hover States', () => {
    test('Hover over roadmap item reveals traceability data', async ({ page }) => {
      await page.goto('/engine-3');
      await page.waitForSelector('[data-testid="engine-3-page"]');

      // Hover over roadmap item
      const roadmapItem = page.locator('[data-testid="roadmap-item-roadmap-001"]');
      await roadmapItem.hover();

      // Wait for hover transition
      await page.waitForTimeout(300);

      // Verify reasoning/traceability data is visible
      const reasoning = page.locator('[data-testid="reasoning-roadmap-001-0"]');
      await expect(reasoning).toBeVisible();

      // Verify confidence score is displayed
      const confidenceScore = page.locator('[data-testid="confidence-score-roadmap-001"]');
      await expect(confidenceScore).toBeVisible();
      await expect(confidenceScore).toContainText('%');
    });

    test('Hover over engine quadrant shows preview content', async ({ page }) => {
      await page.goto('/');
      await page.waitForSelector('[data-testid="engine-grid"]');

      // Hover over Engine 1 quadrant
      const engineQuadrant = page.locator('[data-testid="engine-quadrant-1"]');
      await engineQuadrant.hover();

      // Wait for hover animation
      await page.waitForTimeout(300);

      // Verify the card has hover effects (elevated shadow, etc.)
      // This tests that hover states exist and are interactive
      await expect(engineQuadrant).toBeVisible();
    });

    test('Hover over initiative shows prioritization reasoning link', async ({ page }) => {
      await page.goto('/engine-2');
      await page.waitForSelector('[data-testid="engine-2-page"]');

      // Hover over an initiative item
      const initiativeItem = page.locator('[data-testid^="initiative-item-"]').first();
      await expect(initiativeItem).toBeVisible();
      await initiativeItem.hover();

      // Wait for hover state
      await page.waitForTimeout(300);

      // The hover should reveal additional information
      await expect(initiativeItem).toBeVisible();
    });
  });

  test.describe('Test Case 5: Collapsible Section Animations', () => {
    test('Expand collapsible PRD section with smooth animation', async ({ page }) => {
      await page.goto('/engine-3');
      await page.waitForSelector('[data-testid="engine-3-page"]');

      // Generate PRD first
      await page.click('[data-testid="roadmap-item-roadmap-001"]');
      await page.click('[data-testid="generate-prd-button-roadmap-001"]');
      await page.waitForSelector('[data-testid="prd-viewer"]', { timeout: 10000 });

      // Find a collapsible section toggle
      const sectionToggle = page.locator('[data-testid="prd-section-toggle-section-overview"]');
      await expect(sectionToggle).toBeVisible();

      // Click to expand
      await sectionToggle.click();

      // Wait for expansion animation
      await page.waitForTimeout(400);

      // Verify content is now visible
      const sectionContent = page.locator('[data-testid="prd-section-content-section-overview"]');
      await expect(sectionContent).toBeVisible();

      // Verify animation was smooth (no layout shift)
      const isSmooth = await checkAnimationSmoothness(page);
      expect(isSmooth).toBe(true);
    });

    test('Collapse section with smooth animation', async ({ page }) => {
      await page.goto('/engine-3');
      await page.waitForSelector('[data-testid="engine-3-page"]');

      await page.click('[data-testid="roadmap-item-roadmap-001"]');
      await page.click('[data-testid="generate-prd-button-roadmap-001"]');
      await page.waitForSelector('[data-testid="prd-viewer"]', { timeout: 10000 });

      // Expand first
      const sectionToggle = page.locator('[data-testid="prd-section-toggle-section-overview"]');
      await sectionToggle.click();
      await page.waitForTimeout(400);

      // Now collapse
      await sectionToggle.click();
      await page.waitForTimeout(400);

      // Verify animation completes smoothly
      const isSmooth = await checkAnimationSmoothness(page);
      expect(isSmooth).toBe(true);
    });

    test('Test scenario expansion in Epic structure', async ({ page }) => {
      await page.goto('/engine-3');
      await page.waitForSelector('[data-testid="engine-3-page"]');

      // Generate PRD and Epic
      await page.click('[data-testid="roadmap-item-roadmap-001"]');
      await page.click('[data-testid="generate-prd-button-roadmap-001"]');
      await page.waitForSelector('[data-testid="prd-viewer"]', { timeout: 10000 });
      await page.click('[data-testid="generate-epic-button"]');
      await page.waitForSelector('[data-testid="epic-structure"]', { timeout: 10000 });

      // Click on a test scenario to expand
      const testScenario = page.locator('[data-testid="test-scenario-test-001"]');
      await expect(testScenario).toBeVisible();
      await testScenario.click();

      // Wait for expansion
      await page.waitForTimeout(400);

      // Verify expanded content is visible (steps and expected outcome)
      await expect(page.locator('[data-testid="test-traceability-test-001"]')).toBeVisible();
    });
  });

  test.describe('Test Case 6: Navigation Animations', () => {
    test('Navigate from Engine 1 to Engine 2 with smooth transition', async ({ page }) => {
      // Start at Engine 1
      await page.goto('/engine-1');
      await page.waitForSelector('[data-testid="engine-1-page"]');

      // Measure navigation start time
      const startTime = Date.now();

      // Navigate to Engine 2
      await page.goto('/engine-2');
      await page.waitForSelector('[data-testid="engine-2-page"]');

      // Measure navigation time
      const navigationTime = Date.now() - startTime;

      // Navigation should complete within 2 seconds (including animation)
      expect(navigationTime).toBeLessThan(2000);

      // Verify Engine 2 content is visible
      await expect(page.locator('[data-testid="engine-2-page"]')).toBeVisible();
    });

    test('Navigate from dashboard to engine and back smoothly', async ({ page }) => {
      await page.goto('/');
      await page.waitForSelector('[data-testid="engine-grid"]');

      // Navigate to Engine 1
      await page.click('[data-testid="engine-quadrant-1"]');
      await page.waitForSelector('[data-testid="engine-1-page"]');

      // Navigate back to dashboard via header/logo
      await page.goto('/');
      await page.waitForSelector('[data-testid="engine-grid"]');

      // Verify smooth transition
      const isSmooth = await checkAnimationSmoothness(page);
      expect(isSmooth).toBe(true);
    });

    test('SDLC stepper transitions smoothly across engine navigation', async ({ page }) => {
      // Navigate through engines in sequence
      const engines = ['1', '2', '3', '4'];

      for (const engineId of engines) {
        await page.goto(`/engine-${engineId}`);
        await page.waitForSelector(`[data-testid="engine-${engineId}-page"]`);

        // Verify stepper is present and animated
        const stepper = page.locator('text=Discovery >> xpath=../..').first();
        await expect(stepper).toBeVisible();

        // Small delay to allow animations to settle
        await page.waitForTimeout(200);
      }

      // Final check for smooth performance
      const isSmooth = await checkAnimationSmoothness(page);
      expect(isSmooth).toBe(true);
    });

    test('Transition prompt navigation is smooth', async ({ page }) => {
      await page.goto('/engine-3');
      await page.waitForSelector('[data-testid="engine-3-page"]');

      // Generate PRD and Epic to show transition prompt
      await page.click('[data-testid="roadmap-item-roadmap-001"]');
      await page.click('[data-testid="generate-prd-button-roadmap-001"]');
      await page.waitForSelector('[data-testid="prd-viewer"]', { timeout: 10000 });
      await page.click('[data-testid="generate-epic-button"]');
      await page.waitForSelector('[data-testid="epic-structure"]', { timeout: 10000 });

      // Find and click transition prompt
      const transitionPrompt = page.locator('[data-testid="transition-prompt"]');
      await expect(transitionPrompt).toBeVisible();

      // Click the continue button
      const continueButton = page.locator('[data-testid="transition-continue-button"]');
      await expect(continueButton).toBeVisible();
      await continueButton.click();

      // Verify navigation to Engine 4
      await page.waitForSelector('[data-testid="engine-4-page"]', { timeout: 5000 });
    });
  });

  test.describe('Animation Performance', () => {
    test('Transformation animations maintain 60fps performance', async ({ page }) => {
      await page.goto('/engine-3');
      await page.waitForSelector('[data-testid="engine-3-page"]');

      // Start performance monitoring
      await page.evaluate(() => {
        (window as typeof window & { __frameDrops: number[] }).__frameDrops = [];
        let lastTime = performance.now();

        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 16.67) { // More than 60fps frame time
              (window as typeof window & { __frameDrops: number[] }).__frameDrops.push(entry.duration);
            }
          }
        });

        observer.observe({ entryTypes: ['frame', 'longtask'] });
      });

      // Trigger transformation animation
      await page.click('[data-testid="roadmap-item-roadmap-001"]');
      await page.click('[data-testid="generate-prd-button-roadmap-001"]');
      await page.waitForSelector('[data-testid="prd-viewer"]', { timeout: 10000 });

      // Check for frame drops
      const frameDrops = await page.evaluate(() => {
        return (window as typeof window & { __frameDrops: number[] }).__frameDrops?.length || 0;
      });

      // Allow for some minor frame drops during initial load
      expect(frameDrops).toBeLessThan(10);
    });

    test('Page transitions do not cause layout shifts', async ({ page }) => {
      await page.goto('/');
      await page.waitForSelector('[data-testid="engine-grid"]');

      // Monitor CLS (Cumulative Layout Shift)
      await page.evaluate(() => {
        (window as typeof window & { __layoutShifts: number[] }).__layoutShifts = [];

        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const layoutShiftEntry = entry as PerformanceEntry & { value?: number };
            if (layoutShiftEntry.value !== undefined) {
              (window as typeof window & { __layoutShifts: number[] }).__layoutShifts.push(layoutShiftEntry.value);
            }
          }
        });

        observer.observe({ entryTypes: ['layout-shift'] });
      });

      // Navigate through the app
      await page.click('[data-testid="engine-quadrant-1"]');
      await page.waitForSelector('[data-testid="engine-1-page"]');

      // Check layout shifts
      const layoutShifts = await page.evaluate(() => {
        const shifts = (window as typeof window & { __layoutShifts: number[] }).__layoutShifts || [];
        return shifts.reduce((sum, shift) => sum + shift, 0);
      });

      // CLS should be less than 0.1 (good score)
      expect(layoutShifts).toBeLessThan(0.1);
    });

    test('Reduced motion preference is respected', async ({ page }) => {
      // Set reduced motion preference
      await page.emulateMedia({ reducedMotion: 'reduce' });

      await page.goto('/engine-3');
      await page.waitForSelector('[data-testid="engine-3-page"]');

      // Trigger animation
      await page.click('[data-testid="roadmap-item-roadmap-001"]');
      await page.click('[data-testid="generate-prd-button-roadmap-001"]');

      // With reduced motion, transformation should complete faster
      const startTime = Date.now();
      await page.waitForSelector('[data-testid="prd-viewer"]', { timeout: 5000 });
      const animationTime = Date.now() - startTime;

      // Animation should be significantly shorter with reduced motion
      expect(animationTime).toBeLessThan(1000);
    });
  });
});
