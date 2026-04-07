import React from 'react';
import { render, screen } from '@testing-library/react';
import { EpicStructure } from '@/components/engine-3/epic-structure';
import { schedulingComplianceEpic } from '@/data/mock/prd-templates';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { initial, animate, transition, exit, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
    tr: ({ children, ...props }: any) => {
      const { initial, animate, transition, ...rest } = props;
      return <tr {...rest}>{children}</tr>;
    },
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  Reorder: {
    Group: ({ children, ...props }: any) => {
      const { values, onReorder, axis, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
    Item: ({ children, ...props }: any) => {
      const { value, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
  },
}));

describe('EpicStructure', () => {
  it('renders epic structure with stories in story-ready format', () => {
    render(<EpicStructure epic={schedulingComplianceEpic} />);

    expect(screen.getByTestId('epic-structure')).toBeInTheDocument();
    expect(screen.getByTestId('stories-list')).toBeInTheDocument();
  });

  it('displays total points for the epic', () => {
    render(<EpicStructure epic={schedulingComplianceEpic} />);

    expect(screen.getByTestId('epic-points')).toHaveTextContent('89 pts');
  });

  it('renders all user stories with drag-and-drop styling', () => {
    render(<EpicStructure epic={schedulingComplianceEpic} />);

    // Check that all stories are rendered
    schedulingComplianceEpic.stories.forEach(story => {
      expect(screen.getByTestId(`story-${story.id}`)).toBeInTheDocument();
    });
  });

  it('displays story points for each story', () => {
    render(<EpicStructure epic={schedulingComplianceEpic} />);

    // Check first story points
    expect(screen.getByTestId('story-points-story-001')).toHaveTextContent('13');
  });

  it('shows test scenarios with traceability indicators', () => {
    render(<EpicStructure epic={schedulingComplianceEpic} />);

    expect(screen.getByTestId('test-scenarios-list')).toBeInTheDocument();

    // Check that test scenarios are rendered
    schedulingComplianceEpic.testScenarios.forEach(scenario => {
      expect(screen.getByTestId(`test-scenario-${scenario.id}`)).toBeInTheDocument();
    });
  });

  it('displays code scaffolding section', () => {
    render(<EpicStructure epic={schedulingComplianceEpic} />);

    expect(screen.getByTestId('code-scaffolds-list')).toBeInTheDocument();

    // Check that code scaffolds are rendered
    schedulingComplianceEpic.codeScaffolds.forEach(scaffold => {
      expect(screen.getByTestId(`code-scaffold-${scaffold.id}`)).toBeInTheDocument();
    });
  });

  it('displays traceability back to customer feedback', () => {
    render(<EpicStructure epic={schedulingComplianceEpic} />);

    expect(screen.getByTestId('epic-traceability')).toBeInTheDocument();
    expect(screen.getByTestId('traceability-feedback')).toHaveTextContent(
      'Customer Advisory Board: "#1 requested feature"'
    );
    expect(screen.getByTestId('traceability-diagnostic')).toHaveTextContent(
      'Maturity assessment: Integration gap identified as critical'
    );
    expect(screen.getByTestId('traceability-prioritization')).toHaveTextContent(
      'Weighted score 87% - Addresses $2.3M ARR risk'
    );
  });
});
