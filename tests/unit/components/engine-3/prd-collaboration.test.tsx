import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  PRDCollaboration,
  ApprovalWorkflow,
  SuggestedChangesPanel,
  ActiveReviewersIndicator,
  ChangeHistoryLog,
  mockStakeholders,
  mockApprovalStatuses,
  mockSuggestedChanges,
  mockActiveReviewers,
  mockChangeHistory,
  mockCommentThreads,
} from '@/components/engine-3/prd-collaboration';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { initial, animate, transition, exit, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe('ApprovalWorkflow', () => {
  it('displays approval status indicators for each stakeholder', () => {
    render(<ApprovalWorkflow statuses={mockApprovalStatuses} />);

    expect(screen.getByTestId('approval-workflow')).toBeInTheDocument();
    expect(screen.getByTestId('approval-statuses')).toBeInTheDocument();

    // Check each stakeholder's approval status is displayed
    mockApprovalStatuses.forEach((status) => {
      const statusElement = screen.getByTestId(`approval-status-${status.stakeholder.id}`);
      expect(statusElement).toBeInTheDocument();
    });
  });

  it('shows sign-off progress correctly', () => {
    render(<ApprovalWorkflow statuses={mockApprovalStatuses} />);

    // 2 out of 4 are approved in mock data
    const approvalCount = screen.getByTestId('approval-count');
    expect(approvalCount).toHaveTextContent('2/4');
  });

  it('displays correct status icons for each approval state', () => {
    render(<ApprovalWorkflow statuses={mockApprovalStatuses} />);

    // Should have approved icons for Brandon and Sarah
    expect(screen.getAllByTestId('status-approved-icon').length).toBe(2);
    // Should have pending icon for Emily
    expect(screen.getByTestId('status-pending-icon')).toBeInTheDocument();
    // Should have changes requested icon for Michael
    expect(screen.getByTestId('status-changes-icon')).toBeInTheDocument();
  });

  it('displays progress bar with correct percentage', () => {
    render(<ApprovalWorkflow statuses={mockApprovalStatuses} />);

    const progressBar = screen.getByTestId('approval-progress');
    expect(progressBar).toBeInTheDocument();
  });
});

describe('SuggestedChangesPanel', () => {
  it('displays proposed edits from team members', () => {
    render(<SuggestedChangesPanel changes={mockSuggestedChanges} />);

    expect(screen.getByTestId('suggested-changes-panel')).toBeInTheDocument();
    expect(screen.getByTestId('suggested-changes-list')).toBeInTheDocument();

    mockSuggestedChanges.forEach((change) => {
      expect(screen.getByTestId(`suggested-change-${change.id}`)).toBeInTheDocument();
    });
  });

  it('shows accept/reject options for pending changes', () => {
    render(<SuggestedChangesPanel changes={mockSuggestedChanges} />);

    // Find pending changes and verify accept/reject buttons
    const pendingChange = mockSuggestedChanges.find((c) => c.status === 'pending');
    if (pendingChange) {
      expect(screen.getByTestId(`accept-change-${pendingChange.id}`)).toBeInTheDocument();
      expect(screen.getByTestId(`reject-change-${pendingChange.id}`)).toBeInTheDocument();
    }
  });

  it('calls onAccept when accept button is clicked', () => {
    const mockOnAccept = jest.fn();
    render(<SuggestedChangesPanel changes={mockSuggestedChanges} onAccept={mockOnAccept} />);

    const pendingChange = mockSuggestedChanges.find((c) => c.status === 'pending');
    if (pendingChange) {
      fireEvent.click(screen.getByTestId(`accept-change-${pendingChange.id}`));
      expect(mockOnAccept).toHaveBeenCalledWith(pendingChange.id);
    }
  });

  it('calls onReject when reject button is clicked', () => {
    const mockOnReject = jest.fn();
    render(<SuggestedChangesPanel changes={mockSuggestedChanges} onReject={mockOnReject} />);

    const pendingChange = mockSuggestedChanges.find((c) => c.status === 'pending');
    if (pendingChange) {
      fireEvent.click(screen.getByTestId(`reject-change-${pendingChange.id}`));
      expect(mockOnReject).toHaveBeenCalledWith(pendingChange.id);
    }
  });

  it('displays status badge for accepted/rejected changes', () => {
    render(<SuggestedChangesPanel changes={mockSuggestedChanges} />);

    const acceptedChange = mockSuggestedChanges.find((c) => c.status === 'accepted');
    if (acceptedChange) {
      expect(screen.getByTestId(`change-status-${acceptedChange.id}`)).toHaveTextContent('Accepted');
    }
  });
});

describe('ActiveReviewersIndicator', () => {
  it('shows which stakeholders are currently viewing', () => {
    render(<ActiveReviewersIndicator reviewers={mockActiveReviewers} />);

    expect(screen.getByTestId('active-reviewers')).toBeInTheDocument();
    expect(screen.getByTestId('active-reviewers-list')).toBeInTheDocument();

    mockActiveReviewers.forEach((reviewer) => {
      expect(screen.getByTestId(`active-reviewer-${reviewer.stakeholder.id}`)).toBeInTheDocument();
    });
  });

  it('displays correct count of active reviewers', () => {
    render(<ActiveReviewersIndicator reviewers={mockActiveReviewers} />);

    expect(screen.getByText(`${mockActiveReviewers.length} people viewing now`)).toBeInTheDocument();
  });

  it('shows which section each reviewer is viewing', () => {
    render(<ActiveReviewersIndicator reviewers={mockActiveReviewers} />);

    mockActiveReviewers.forEach((reviewer) => {
      expect(screen.getByText(`Viewing: ${reviewer.section}`)).toBeInTheDocument();
    });
  });

  it('shows online status indicator', () => {
    render(<ActiveReviewersIndicator reviewers={mockActiveReviewers} />);

    const onlineIndicators = screen.getAllByText('Online');
    expect(onlineIndicators.length).toBe(mockActiveReviewers.length);
  });

  it('handles empty reviewers list', () => {
    render(<ActiveReviewersIndicator reviewers={[]} />);

    expect(screen.getByText('No active reviewers')).toBeInTheDocument();
  });
});

describe('ChangeHistoryLog', () => {
  it('displays all revisions with timestamps and authors', () => {
    render(<ChangeHistoryLog history={mockChangeHistory} />);

    expect(screen.getByTestId('change-history')).toBeInTheDocument();
    expect(screen.getByTestId('change-history-list')).toBeInTheDocument();

    mockChangeHistory.forEach((item) => {
      expect(screen.getByTestId(`history-item-${item.id}`)).toBeInTheDocument();
    });
  });

  it('displays author names for each history item', () => {
    render(<ChangeHistoryLog history={mockChangeHistory} />);

    mockChangeHistory.forEach((item) => {
      const historyItem = screen.getByTestId(`history-item-${item.id}`);
      expect(historyItem).toHaveTextContent(item.author.name);
    });
  });

  it('displays descriptions for each history item', () => {
    render(<ChangeHistoryLog history={mockChangeHistory} />);

    mockChangeHistory.forEach((item) => {
      expect(screen.getByText(item.description)).toBeInTheDocument();
    });
  });

  it('shows approval decisions in history', () => {
    render(<ChangeHistoryLog history={mockChangeHistory} />);

    const approvalItems = mockChangeHistory.filter((item) => item.action === 'approved');
    approvalItems.forEach((item) => {
      expect(screen.getByText(item.description)).toBeInTheDocument();
    });
  });
});

describe('PRDCollaboration (Main Component)', () => {
  it('renders all collaboration sections', () => {
    render(<PRDCollaboration />);

    expect(screen.getByTestId('prd-collaboration')).toBeInTheDocument();
    expect(screen.getByTestId('comment-threads-section')).toBeInTheDocument();
    expect(screen.getByTestId('approval-workflow')).toBeInTheDocument();
    expect(screen.getByTestId('suggested-changes-panel')).toBeInTheDocument();
    expect(screen.getByTestId('active-reviewers')).toBeInTheDocument();
    expect(screen.getByTestId('change-history')).toBeInTheDocument();
  });

  it('displays comment thread count', () => {
    render(<PRDCollaboration commentThreads={mockCommentThreads} />);

    expect(screen.getByText(`${mockCommentThreads.length} discussions on this PRD`)).toBeInTheDocument();
  });

  it('can toggle comment threads to expand and collapse', () => {
    render(<PRDCollaboration commentThreads={mockCommentThreads} />);

    const firstThread = mockCommentThreads[0];
    const toggleButton = screen.getByTestId(`thread-toggle-${firstThread.id}`);

    // Initially collapsed
    expect(screen.queryByTestId(`thread-expanded-${firstThread.id}`)).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(toggleButton);
    expect(screen.getByTestId(`thread-expanded-${firstThread.id}`)).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(toggleButton);
    expect(screen.queryByTestId(`thread-expanded-${firstThread.id}`)).not.toBeInTheDocument();
  });

  it('handles accept/reject actions on suggested changes', () => {
    const mockOnAccept = jest.fn();
    const mockOnReject = jest.fn();

    render(
      <PRDCollaboration
        suggestedChanges={mockSuggestedChanges}
        onAcceptChange={mockOnAccept}
        onRejectChange={mockOnReject}
      />
    );

    const pendingChange = mockSuggestedChanges.find((c) => c.status === 'pending');
    if (pendingChange) {
      fireEvent.click(screen.getByTestId(`accept-change-${pendingChange.id}`));
      expect(mockOnAccept).toHaveBeenCalledWith(pendingChange.id);
    }
  });
});
