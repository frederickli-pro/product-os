import { test, expect } from '@playwright/test';

test.describe('Engine 2 - Prioritization Reasoning', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/engine-2');
  });

  test('Engine 2 interface loads with prioritization dashboard', async ({ page }) => {
    // Test Case 1: Navigate to Engine 2 Prioritization section
    await expect(page.getByTestId('engine-2-page')).toBeVisible();
    await expect(page.getByText('Engine 2: Prioritization')).toBeVisible();
    await expect(page.getByTestId('sdlc-stepper')).toBeVisible();
    await expect(page.getByTestId('initiatives-list')).toBeVisible();
    await expect(page.getByTestId('scoring-methodology')).toBeVisible();
    await expect(page.getByTestId('trade-off-analysis')).toBeVisible();
  });

  test('SDLC stepper shows Discovery completed and Design active', async ({ page }) => {
    // Test Case 2: Check SDLC progress stepper
    const discoveryStage = page.getByTestId('stage-discovery');
    const designStage = page.getByTestId('stage-design');

    await expect(discoveryStage).toHaveAttribute('data-completed', 'true');
    await expect(page.getByTestId('checkmark-discovery')).toBeVisible();
    await expect(designStage).toHaveAttribute('data-active', 'true');

    // Check context badge
    const contextBadge = page.getByTestId('context-badge');
    await expect(contextBadge).toHaveText('Diagnostic insights inform prioritization');
  });

  test('Candidate initiatives list displays correctly', async ({ page }) => {
    // Test Case 3: Verify candidate initiatives list
    await expect(page.getByText('scheduling-compliance unification')).toBeVisible();
    await expect(page.getByText('AI copilot features')).toBeVisible();
    await expect(page.getByText('mobile experience overhaul')).toBeVisible();
  });

  test('Scoring methodology weights are displayed correctly', async ({ page }) => {
    // Test Case 4: Verify scoring methodology weights
    await expect(page.getByTestId('weight-revenue-impact')).toHaveText('40%');
    await expect(page.getByTestId('weight-churn-risk-reduction')).toHaveText('25%');
    await expect(page.getByTestId('weight-competitive-exposure')).toHaveText('20%');
    await expect(page.getByTestId('weight-technical-enabler')).toHaveText('10%');
    await expect(page.getByTestId('weight-strategic-alignment')).toHaveText('5%');
  });

  test('Top priority item shows with 87% confidence score', async ({ page }) => {
    // Test Case 5: Check top priority item
    const topInitiative = page.getByTestId('initiative-init-001');
    await expect(topInitiative).toHaveAttribute('data-priority', '1');
    await expect(page.getByTestId('initiative-name-init-001')).toHaveText(
      'Unified Scheduling-Compliance Platform'
    );
    await expect(page.getByTestId('confidence-score-init-001')).toHaveText('87%');
  });

  test('Explicit reasoning displays for top priority', async ({ page }) => {
    // Test Case 6: Verify explicit reasoning for top priority
    // The first initiative should already be selected by default
    const reasoning = page.getByTestId('explicit-reasoning');
    await expect(reasoning).toBeVisible();

    await expect(page.getByTestId('reasoning-0')).toContainText(
      "Addresses #1 customer request (47% of support tickets)"
    );
    await expect(page.getByTestId('reasoning-1')).toContainText(
      'Reduces churn risk by $2.3M ARR'
    );
    await expect(page.getByTestId('reasoning-2')).toContainText(
      'Closes competitive gap with Fleetio'
    );
  });

  test('Trade-off analysis visualization shows correctly', async ({ page }) => {
    // Test Case 7: Verify trade-off analysis visualization
    const tradeoffViz = page.getByTestId('tradeoff-visualization');
    await expect(tradeoffViz).toBeVisible();

    // Check it shows both initiatives being compared
    await expect(tradeoffViz.getByText('scheduling-compliance unification')).toBeVisible();
    await expect(tradeoffViz.getByText('AI copilot features')).toBeVisible();

    // Check the trade-off description
    await expect(page.getByTestId('tradeoff-description')).toContainText(
      'unified scheduling-compliance platform'
    );
    await expect(page.getByTestId('tradeoff-description')).toContainText(
      'AI copilot'
    );
  });

  test('Priority confidence indicators display data quality scores', async ({ page }) => {
    // Test Case 8: Check priority confidence indicators
    await expect(page.getByTestId('confidence-indicators')).toBeVisible();
    await expect(page.getByTestId('overall-confidence')).toBeVisible();
    await expect(page.getByTestId('confidence-breakdown')).toBeVisible();

    // Check individual confidence factors
    await expect(page.getByTestId('confidence-data-quality')).toBeVisible();
    await expect(page.getByTestId('confidence-market-validation')).toBeVisible();
    await expect(page.getByTestId('confidence-technical-feasibility')).toBeVisible();
  });

  test('Transition prompt displays at end of Act 2', async ({ page }) => {
    // Test Case 9: Check transition prompt at end of Act 2
    const transitionPrompt = page.getByTestId('transition-prompt');
    await expect(transitionPrompt).toBeVisible();

    const message = page.getByTestId('transition-message');
    await expect(message).toHaveText(
      'Priority set. Now watch the transformation into shipped product.'
    );
  });

  test('Clicking initiative updates scoring breakdown', async ({ page }) => {
    // Click on the second initiative
    await page.getByTestId('initiative-init-002').click();

    // Verify the explicit reasoning updates
    await expect(page.getByTestId('explicit-reasoning')).toContainText(
      'Strong competitive differentiation potential'
    );
  });
});
