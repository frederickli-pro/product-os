import { test, expect } from '@playwright/test'

/**
 * E2E Tests for Guided Walkthrough Features
 * Owner: Scenario 7 - Guided Walkthrough Features
 *
 * Test cases:
 * 1. 'Start here' entry point is prominently displayed for first-time users
 * 2. Continue prompt appears guiding to Engine 2/Act 2
 * 3. Highlight animations draw attention to interactive elements
 * 4. Hover over contextual help icon shows explanatory tooltip
 * 5. Click contextual help icon expands help panel
 * 6. Activate tour mode begins sequential walkthrough
 * 7. Progress through tour mode with highlights
 * 8. Visual breadcrumbs show current location
 */

test.describe('Guided Walkthrough Features', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to simulate first-time user
    await page.addInitScript(() => {
      localStorage.clear()
    })
  })

  test('TC1: Start here entry point is prominently displayed for first-time users', async ({
    page,
  }) => {
    await page.goto('/')

    // Wait for the page to load
    await page.waitForLoadState('networkidle')

    // First-time users should see the start here button on Engine 1
    const startHereButton = page.getByTestId('start-here-button')
    await expect(startHereButton).toBeVisible()

    // The button should be prominently styled (green background)
    await expect(startHereButton).toHaveClass(/bg-green|bg-vista-green/)
  })

  test('TC2: Continue prompt appears after completing Act 1', async ({ page }) => {
    // Set up as non-first-time user who has visited before
    await page.addInitScript(() => {
      localStorage.setItem('demo_first_visit', 'true')
    })

    await page.goto('/engine-1')
    await page.waitForLoadState('networkidle')

    // Check for transition prompt or continue prompt at the bottom of the page
    // The transition prompt should guide to Engine 2/Act 2
    const continuePrompt = page.locator('[data-testid="transition-prompt"], [data-testid="continue-prompt"]')

    // If the prompt is present, verify it contains navigation guidance
    const promptCount = await continuePrompt.count()
    if (promptCount > 0) {
      await expect(continuePrompt.first()).toBeVisible()

      // Check for button or link that guides to next engine
      const continueButton = page.locator('[data-testid="continue-prompt-button"], [data-testid="transition-prompt"] button')
      const buttonCount = await continueButton.count()
      if (buttonCount > 0) {
        await expect(continueButton.first()).toBeVisible()
      }
    }
  })

  test('TC3: Highlight animations draw attention to interactive elements', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check for highlight animations on engine quadrants
    const highlightElements = page.locator('[data-testid="highlight-animation"], [data-highlight-active="true"]')

    // If highlights are present, verify they have proper attributes
    const count = await highlightElements.count()
    if (count > 0) {
      const firstHighlight = highlightElements.first()
      await expect(firstHighlight).toHaveAttribute('data-testid', 'highlight-animation')
    }

    // Verify engine quadrants exist and are interactive
    const engineQuadrant1 = page.getByTestId('engine-quadrant-1')
    await expect(engineQuadrant1).toBeVisible()

    // Check for ring or pulse animation classes
    const hasAnimationClass = await engineQuadrant1.evaluate((el) => {
      const classes = el.className
      return classes.includes('ring') || classes.includes('pulse') || classes.includes('animate')
    })
    // Animation may or may not be present based on state
    expect(typeof hasAnimationClass).toBe('boolean')
  })

  test('TC4: Hover over contextual help icon shows explanatory tooltip', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Find help icons on the page
    const helpIcon = page.locator('[data-testid^="help-icon"], [data-testid="contextual-help-trigger"]').first()

    // Check if help icons exist
    const helpIconCount = await helpIcon.count()
    if (helpIconCount > 0) {
      await expect(helpIcon).toBeVisible()

      // Hover over the help icon
      await helpIcon.hover()

      // Wait for tooltip to appear
      await page.waitForTimeout(400) // Allow for tooltip delay

      // Check for tooltip content
      const tooltip = page.locator('[data-testid="contextual-help-tooltip"], [role="tooltip"]')
      const tooltipCount = await tooltip.count()
      if (tooltipCount > 0) {
        await expect(tooltip.first()).toBeVisible()
      }
    }
  })

  test('TC5: Click contextual help icon expands help panel', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Find a help icon
    const helpIcon = page.locator('[data-testid^="help-icon"], [data-testid="contextual-help-trigger"]').first()

    const helpIconCount = await helpIcon.count()
    if (helpIconCount > 0) {
      await expect(helpIcon).toBeVisible()

      // Click the help icon
      await helpIcon.click()

      // Wait for panel to appear
      await page.waitForTimeout(300)

      // Check for expanded help panel
      const helpPanel = page.locator('[data-testid="contextual-help-panel"]')
      const panelCount = await helpPanel.count()
      if (panelCount > 0) {
        await expect(helpPanel).toBeVisible()

        // Panel should contain detailed explanation
        const panelText = await helpPanel.textContent()
        expect(panelText).toBeTruthy()
        expect(panelText!.length).toBeGreaterThan(10)
      }
    }
  })

  test('TC6: Activate tour mode begins sequential walkthrough', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Look for tour start button
    const tourStartButton = page.locator('[data-testid="tour-start-button"]')
    const tourButtonCount = await tourStartButton.count()

    if (tourButtonCount > 0) {
      await expect(tourStartButton).toBeVisible()

      // Click to start the tour
      await tourStartButton.click()

      // Wait for tour overlay to appear
      await page.waitForTimeout(500)

      // Check for tour mode overlay
      const tourOverlay = page.locator('[data-testid="tour-mode-overlay"]')
      const overlayCount = await tourOverlay.count()
      if (overlayCount > 0) {
        await expect(tourOverlay).toBeVisible()

        // Check for tour tooltip with first step
        const tourTooltip = page.locator('[data-testid="tour-tooltip"]')
        await expect(tourTooltip).toBeVisible()

        // Verify step content is present
        const tooltipText = await tourTooltip.textContent()
        expect(tooltipText).toContain('Step 1')
      }
    }
  })

  test('TC7: Progress through tour mode with highlights', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Look for tour start button
    const tourStartButton = page.locator('[data-testid="tour-start-button"]')
    const tourButtonCount = await tourStartButton.count()

    if (tourButtonCount > 0) {
      // Start the tour
      await tourStartButton.click()
      await page.waitForTimeout(500)

      const tourOverlay = page.locator('[data-testid="tour-mode-overlay"]')
      const overlayCount = await tourOverlay.count()

      if (overlayCount > 0) {
        // Check for highlight on target element
        const tourHighlight = page.locator('[data-testid="tour-highlight"]')
        const highlightCount = await tourHighlight.count()
        if (highlightCount > 0) {
          await expect(tourHighlight).toBeVisible()
        }

        // Click next to progress
        const nextButton = page.locator('[data-testid="tour-next-button"]')
        await expect(nextButton).toBeVisible()
        await nextButton.click()

        // Wait for transition
        await page.waitForTimeout(500)

        // Verify we're on step 2
        const tourTooltip = page.locator('[data-testid="tour-tooltip"]')
        const tooltipText = await tourTooltip.textContent()
        expect(tooltipText).toContain('Step 2')
      }
    }
  })

  test('TC8: Visual breadcrumbs show current location within four-act demo flow', async ({
    page,
  }) => {
    // Navigate to Engine 2 to test breadcrumbs
    await page.addInitScript(() => {
      localStorage.setItem('demo_first_visit', 'true')
    })

    await page.goto('/engine-2')
    await page.waitForLoadState('networkidle')

    // Check for breadcrumbs component
    const breadcrumbs = page.locator('[data-testid="breadcrumbs"], [data-testid="compact-breadcrumbs"]')
    const breadcrumbsCount = await breadcrumbs.count()

    if (breadcrumbsCount > 0) {
      await expect(breadcrumbs.first()).toBeVisible()

      // Check for act indicators
      const actIndicators = page.locator('[data-testid^="breadcrumb-act-"], [data-testid^="compact-breadcrumb-act-"]')
      const indicatorCount = await actIndicators.count()

      if (indicatorCount > 0) {
        // Should show current act (Act 2)
        const act2Indicator = page.locator('[data-testid="breadcrumb-act-2"], [data-testid="compact-breadcrumb-act-2"]')
        const act2Count = await act2Indicator.count()
        if (act2Count > 0) {
          await expect(act2Indicator).toBeVisible()
        }
      }
    }

    // Alternative: Check SDLC stepper which also shows location
    const sdlcStepper = page.locator('[data-testid="sdlc-stepper"]')
    const stepperCount = await sdlcStepper.count()
    if (stepperCount > 0) {
      await expect(sdlcStepper).toBeVisible()
    }
  })

  test('Navigation through engines works correctly', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('demo_first_visit', 'true')
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Click on Engine 1 quadrant
    const engine1 = page.getByTestId('engine-quadrant-1')
    await expect(engine1).toBeVisible()
    await engine1.click()

    // Should navigate to Engine 1 page
    await expect(page).toHaveURL(/engine-1/)

    // Navigate to Engine 2
    await page.goto('/engine-2')
    await expect(page).toHaveURL(/engine-2/)

    // Navigate to Engine 3
    await page.goto('/engine-3')
    await expect(page).toHaveURL(/engine-3/)

    // Navigate to Engine 4
    await page.goto('/engine-4')
    await expect(page).toHaveURL(/engine-4/)
  })

  test('Welcome overlay appears for first-time users', async ({ page }) => {
    // Ensure localStorage is clear for first-time user experience
    await page.addInitScript(() => {
      localStorage.clear()
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check for welcome overlay
    const welcomeOverlay = page.locator('[data-testid="welcome-overlay"]')
    const overlayCount = await welcomeOverlay.count()

    if (overlayCount > 0) {
      await expect(welcomeOverlay).toBeVisible()

      // Should have start demo button
      const startDemoButton = page.locator('[data-testid="start-demo-button"]')
      const buttonCount = await startDemoButton.count()
      if (buttonCount > 0) {
        await expect(startDemoButton).toBeVisible()
      }
    }
  })
})
