import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InitiativesList } from '@/components/engine-2/initiatives-list';
import { initiatives } from '@/data/mock/initiatives';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { initial, animate, transition, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
  },
}));

describe('InitiativesList', () => {
  const mockOnSelectInitiative = jest.fn();

  beforeEach(() => {
    mockOnSelectInitiative.mockClear();
  });

  it('renders all initiatives', () => {
    render(
      <InitiativesList
        initiatives={initiatives}
        selectedInitiative={null}
        onSelectInitiative={mockOnSelectInitiative}
      />
    );

    expect(screen.getByTestId('initiatives-list')).toBeInTheDocument();
    // Check by initiative name (displayed in cards)
    expect(screen.getByText('Unified Scheduling-Compliance Platform')).toBeInTheDocument();
    expect(screen.getByText('AI Copilot Capabilities')).toBeInTheDocument();
    expect(screen.getByText('Mobile Experience Overhaul')).toBeInTheDocument();
  });

  it('displays Unified Scheduling-Compliance Platform as top priority', () => {
    render(
      <InitiativesList
        initiatives={initiatives}
        selectedInitiative={initiatives[0]}
        onSelectInitiative={mockOnSelectInitiative}
      />
    );

    const topInitiative = screen.getByTestId('initiative-init-001');
    expect(topInitiative).toHaveAttribute('data-priority', '1');
    expect(screen.getByTestId('initiative-name-init-001')).toHaveTextContent(
      'Unified Scheduling-Compliance Platform'
    );
  });

  it('shows 87% confidence score for top priority', () => {
    render(
      <InitiativesList
        initiatives={initiatives}
        selectedInitiative={initiatives[0]}
        onSelectInitiative={mockOnSelectInitiative}
      />
    );

    const confidenceScore = screen.getByTestId('confidence-score-init-001');
    expect(confidenceScore).toHaveTextContent('87%');
  });

  it('calls onSelectInitiative when clicking an initiative', () => {
    render(
      <InitiativesList
        initiatives={initiatives}
        selectedInitiative={null}
        onSelectInitiative={mockOnSelectInitiative}
      />
    );

    const initiative = screen.getByTestId('initiative-init-002');
    fireEvent.click(initiative);

    expect(mockOnSelectInitiative).toHaveBeenCalledWith(initiatives[1]);
  });
});
