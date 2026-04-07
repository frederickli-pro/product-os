import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PRDViewer } from '@/components/engine-3/prd-viewer';
import { schedulingCompliancePRD } from '@/data/mock/prd-templates';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { initial, animate, transition, exit, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
    p: ({ children, ...props }: any) => {
      const { initial, animate, transition, ...rest } = props;
      return <p {...rest}>{children}</p>;
    },
    span: ({ children, ...props }: any) => {
      const { initial, animate, transition, ...rest } = props;
      return <span {...rest}>{children}</span>;
    },
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('PRDViewer', () => {
  it('renders PRD with collapsible sections', () => {
    render(<PRDViewer prd={schedulingCompliancePRD} collaborationEnabled={true} />);

    expect(screen.getByTestId('prd-viewer')).toBeInTheDocument();
    expect(screen.getByTestId('prd-sections')).toBeInTheDocument();

    // Check that sections are rendered
    expect(screen.getByTestId('prd-section-section-overview')).toBeInTheDocument();
    expect(screen.getByTestId('prd-section-section-acceptance')).toBeInTheDocument();
    expect(screen.getByTestId('prd-section-section-technical')).toBeInTheDocument();
  });

  it('displays acceptance criteria, edge cases, and technical constraints', () => {
    render(<PRDViewer prd={schedulingCompliancePRD} collaborationEnabled={true} />);

    expect(screen.getByTestId('acceptance-criteria')).toBeInTheDocument();
    expect(screen.getByTestId('edge-cases')).toBeInTheDocument();
    expect(screen.getByTestId('technical-constraints')).toBeInTheDocument();
  });

  it('shows inline comment threads when collaboration is enabled', () => {
    render(<PRDViewer prd={schedulingCompliancePRD} collaborationEnabled={true} />);

    // The Overview section is expanded by default (isExpanded: true in mock data)
    // Comment threads should be visible
    expect(screen.getByTestId('comment-thread-comment-001')).toBeInTheDocument();
  });

  it('displays approval status indicators', () => {
    render(<PRDViewer prd={schedulingCompliancePRD} collaborationEnabled={true} />);

    // Check for approval status badges
    expect(screen.getAllByTestId(/approval-status-/)).toHaveLength(
      schedulingCompliancePRD.sections.length + 1 // sections + header status
    );
  });

  it('shows stakeholder approvals panel', () => {
    render(<PRDViewer prd={schedulingCompliancePRD} collaborationEnabled={true} />);

    expect(screen.getByTestId('stakeholder-approvals')).toBeInTheDocument();
    expect(screen.getByTestId('approval-progress-bar')).toBeInTheDocument();
  });

  it('displays approval indicator with sign-off progress', () => {
    render(<PRDViewer prd={schedulingCompliancePRD} collaborationEnabled={true} />);

    // Check that Brandon Holden's approval is shown
    expect(screen.getByTestId('approval-brandon-holden')).toBeInTheDocument();
    expect(screen.getByTestId('approval-sarah-chen')).toBeInTheDocument();
  });

  it('toggles section expansion when clicking', () => {
    render(<PRDViewer prd={schedulingCompliancePRD} collaborationEnabled={true} />);

    // Technical section should be collapsed initially
    const technicalToggle = screen.getByTestId('prd-section-toggle-section-technical');
    fireEvent.click(technicalToggle);

    // Content should now be visible
    expect(screen.getByTestId('prd-section-content-section-technical')).toBeInTheDocument();
  });
});
