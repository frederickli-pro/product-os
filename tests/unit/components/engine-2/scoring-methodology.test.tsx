import React from 'react';
import { render, screen } from '@testing-library/react';
import { ScoringMethodology } from '@/components/engine-2/scoring-methodology';
import { scoringWeights, initiatives } from '@/data/mock/initiatives';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { initial, animate, transition, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
  },
}));

// Mock Radix UI Tooltip
jest.mock('@radix-ui/react-tooltip', () => ({
  Provider: ({ children }: any) => children,
  Root: ({ children }: any) => children,
  Trigger: ({ children }: any) => children,
  Content: ({ children }: any) => <div>{children}</div>,
}));

describe('ScoringMethodology', () => {
  it('displays all scoring weights', () => {
    render(
      <ScoringMethodology
        weights={scoringWeights}
        selectedInitiative={null}
      />
    );

    expect(screen.getByTestId('scoring-methodology')).toBeInTheDocument();
    expect(screen.getByTestId('weight-distribution')).toBeInTheDocument();
  });

  it('shows correct weight percentages', () => {
    render(
      <ScoringMethodology
        weights={scoringWeights}
        selectedInitiative={null}
      />
    );

    expect(screen.getByTestId('weight-revenue-impact')).toHaveTextContent('40%');
    expect(screen.getByTestId('weight-churn-risk-reduction')).toHaveTextContent('25%');
    expect(screen.getByTestId('weight-competitive-exposure')).toHaveTextContent('20%');
    expect(screen.getByTestId('weight-technical-enabler')).toHaveTextContent('10%');
    expect(screen.getByTestId('weight-strategic-alignment')).toHaveTextContent('5%');
  });

  it('displays explicit reasoning when initiative is selected', () => {
    render(
      <ScoringMethodology
        weights={scoringWeights}
        selectedInitiative={initiatives[0]}
      />
    );

    const reasoning = screen.getByTestId('explicit-reasoning');
    expect(reasoning).toBeInTheDocument();
    expect(screen.getByTestId('reasoning-0')).toHaveTextContent(
      "Addresses #1 customer request (47% of support tickets)"
    );
    expect(screen.getByTestId('reasoning-1')).toHaveTextContent(
      'Reduces churn risk by $2.3M ARR'
    );
    expect(screen.getByTestId('reasoning-2')).toHaveTextContent(
      'Closes competitive gap with Fleetio'
    );
  });

  it('shows score breakdown for selected initiative', () => {
    render(
      <ScoringMethodology
        weights={scoringWeights}
        selectedInitiative={initiatives[0]}
      />
    );

    const breakdown = screen.getByTestId('score-breakdown');
    expect(breakdown).toBeInTheDocument();
  });
});
