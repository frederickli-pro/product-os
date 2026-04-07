import { test, expect } from '@playwright/test';

test.describe('Engine 3 - PRD Collaboration Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/engine-3');
  });

  test('Engine 3 interface loads with PRD collaboration panel', async ({ page }) => {
    await expect(page.getByTestId('engine-3-page')).toBeVisible();
    await expect(page.getByText('Engine 3: Execution')).toBeVisible();
    await expect(page.getByTestId('collaboration-panel')).toBeVisible();
    await expect(page.getByTestId('prd-collaboration')).toBeVisible();
  });

  test('View PRD with inline comments - comment threads display on specific sections with stakeholder avatars and timestamps', async ({ page }) => {
    // Test Case 1: View PRD with inline comments
    // Navigate to collaboration panel and verify comment threads
    await expect(page.getByTestId('comment-threads-section')).toBeVisible();
    await expect(page.getByTestId('comment-threads-list')).toBeVisible();

    // Verify comment threads are present
    const commentThread1 = page.getByTestId('comment-thread-ct1');
    const commentThread2 = page.getByTestId('comment-thread-ct2');

    await expect(commentThread1).toBeVisible();
    await expect(commentThread2).toBeVisible();

    // Verify section names are displayed (indicates which PRD section the comments are on)
    await expect(page.getByText('Acceptance Criteria')).toBeVisible();
    await expect(page.getByText('Technical Constraints')).toBeVisible();

    // Verify comment count is shown
    await expect(commentThread1).toContainText('comments');
    await expect(commentThread2).toContainText('comments');
  });

  test('Click on a PRD section with comments - comment thread expands showing discussion between stakeholders', async ({ page }) => {
    // Test Case 2: Click on a PRD section with comments
    // Find and click on a comment thread to expand it
    const threadToggle = page.getByTestId('thread-toggle-ct1');
    await expect(threadToggle).toBeVisible();

    // Initially the thread should be collapsed
    await expect(page.getByTestId('thread-expanded-ct1')).not.toBeVisible();

    // Click to expand the thread
    await threadToggle.click();

    // Verify the thread is now expanded
    await expect(page.getByTestId('thread-expanded-ct1')).toBeVisible();

    // Verify comments are visible with stakeholder avatars
    await expect(page.getByTestId('comment-c1')).toBeVisible();

    // Verify replies are visible (showing discussion between stakeholders)
    await expect(page.getByTestId('reply-c1r1')).toBeVisible();

    // Verify stakeholder names are visible in the discussion
    await expect(page.getByText('Sarah Chen')).toBeVisible();
    await expect(page.getByText('Michael Torres')).toBeVisible();

    // Click again to collapse
    await threadToggle.click();
    await expect(page.getByTestId('thread-expanded-ct1')).not.toBeVisible();
  });

  test('Approval workflow displays stakeholder sign-off status', async ({ page }) => {
    // Related to Test Case 3: Check approval workflow status
    await expect(page.getByTestId('approval-workflow')).toBeVisible();
    await expect(page.getByTestId('approval-statuses')).toBeVisible();

    // Check approval progress
    await expect(page.getByTestId('approval-count')).toHaveText('2/4');

    // Verify individual stakeholder approval statuses
    await expect(page.getByTestId('approval-status-s1')).toBeVisible();
    await expect(page.getByTestId('approval-status-s2')).toBeVisible();
    await expect(page.getByTestId('approval-status-s3')).toBeVisible();
    await expect(page.getByTestId('approval-status-s4')).toBeVisible();

    // Check that approved icon is visible for approved stakeholders
    const approvedIcons = page.getByTestId('status-approved-icon');
    await expect(approvedIcons.first()).toBeVisible();

    // Check that pending icon is visible for pending stakeholders
    await expect(page.getByTestId('status-pending-icon')).toBeVisible();

    // Check that changes requested icon is visible
    await expect(page.getByTestId('status-changes-icon')).toBeVisible();
  });

  test('Suggested changes panel displays proposed edits with accept/reject options', async ({ page }) => {
    // Related to Test Case 4: View suggested changes panel
    await expect(page.getByTestId('suggested-changes-panel')).toBeVisible();
    await expect(page.getByTestId('suggested-changes-list')).toBeVisible();

    // Verify suggested changes are displayed
    await expect(page.getByTestId('suggested-change-sc1')).toBeVisible();
    await expect(page.getByTestId('suggested-change-sc2')).toBeVisible();

    // Verify accept/reject options for pending changes
    const pendingChange = page.getByTestId('suggested-change-sc1');
    await expect(pendingChange.getByTestId('accept-change-sc1')).toBeVisible();
    await expect(pendingChange.getByTestId('reject-change-sc1')).toBeVisible();

    // Verify accepted change shows status badge
    await expect(page.getByTestId('change-status-sc2')).toHaveText('Accepted');
  });

  test('Accept button updates suggested change status', async ({ page }) => {
    // Test accepting a suggested change
    const acceptButton = page.getByTestId('accept-change-sc1');
    await expect(acceptButton).toBeVisible();

    await acceptButton.click();

    // After accepting, the change should show as accepted
    await expect(page.getByTestId('change-status-sc1')).toHaveText('Accepted');
  });

  test('Real-time collaboration indicators show active reviewers', async ({ page }) => {
    // Related to Test Case 5: Check real-time collaboration indicators
    await expect(page.getByTestId('active-reviewers')).toBeVisible();
    await expect(page.getByTestId('active-reviewers-list')).toBeVisible();

    // Verify active reviewers are displayed
    await expect(page.getByTestId('active-reviewer-s2')).toBeVisible();
    await expect(page.getByTestId('active-reviewer-s4')).toBeVisible();

    // Verify viewer count
    await expect(page.getByText('2 people viewing now')).toBeVisible();

    // Verify section being viewed is shown
    await expect(page.getByText('Viewing: Overview')).toBeVisible();
    await expect(page.getByText('Viewing: Edge Cases')).toBeVisible();

    // Verify online status indicators
    const onlineIndicators = page.getByText('Online');
    await expect(onlineIndicators.first()).toBeVisible();
  });

  test('Change history log displays revisions with timestamps and authors', async ({ page }) => {
    // Related to Test Case 6: View change history log
    await expect(page.getByTestId('change-history')).toBeVisible();
    await expect(page.getByTestId('change-history-list')).toBeVisible();

    // Verify history items are displayed
    await expect(page.getByTestId('history-item-ch1')).toBeVisible();
    await expect(page.getByTestId('history-item-ch2')).toBeVisible();
    await expect(page.getByTestId('history-item-ch3')).toBeVisible();
    await expect(page.getByTestId('history-item-ch4')).toBeVisible();
    await expect(page.getByTestId('history-item-ch5')).toBeVisible();

    // Verify author names are visible
    await expect(page.getByText('Brandon Holden')).toBeVisible();
    await expect(page.getByText('Sarah Chen')).toBeVisible();

    // Verify descriptions are visible
    await expect(page.getByText('Approved PRD document')).toBeVisible();
    await expect(page.getByText('Initial PRD draft created')).toBeVisible();
  });

  test('PRD viewer displays document sections', async ({ page }) => {
    await expect(page.getByTestId('prd-viewer')).toBeVisible();
    await expect(page.getByTestId('prd-sections')).toBeVisible();

    // Verify PRD sections are displayed
    await expect(page.getByTestId('prd-section-overview')).toBeVisible();
    await expect(page.getByTestId('prd-section-acceptance-criteria')).toBeVisible();
    await expect(page.getByTestId('prd-section-edge-cases')).toBeVisible();
    await expect(page.getByTestId('prd-section-technical-constraints')).toBeVisible();
  });

  test('Time reduction metrics table is displayed', async ({ page }) => {
    await expect(page.getByTestId('metrics-table')).toBeVisible();

    // Verify metrics are shown
    await expect(page.getByText('PRD creation')).toBeVisible();
    await expect(page.getByText('1-2 weeks')).toBeVisible();
    await expect(page.getByText('Hours')).toBeVisible();
  });

  test('SDLC stepper is displayed with context message', async ({ page }) => {
    // The SDLC stepper should be visible on the page
    await expect(page.getByText('Discovery')).toBeVisible();
    await expect(page.getByText('Design')).toBeVisible();
    await expect(page.getByText('Develop')).toBeVisible();
    await expect(page.getByText('Deploy')).toBeVisible();

    // Context message should be displayed
    await expect(page.getByText('Prioritization reasoning carried from Engine 2')).toBeVisible();
  });
});
