import React from 'react';
import { render, screen } from '@testing-library/react';
import { TradeOffAnalysis } from '@/components/engine-2/trade-off-analysis';
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

describe('TradeOffAnalysis', () => {
  it('renders trade-off analysis panel', () => {
    render(
      <TradeOffAnalysis
        initiatives={initiatives}
        selectedInitiative={initiatives[0]}
      />
    );

    expect(screen.getByTestId('trade-off-analysis')).toBeInTheDocument();
  });

  it('visualizes trade-off between top initiatives', () => {
    render(
      <TradeOffAnalysis
        initiatives={initiatives}
        selectedInitiative={initiatives[0]}
      />
    );

    const visualization = screen.getByTestId('tradeoff-visualization');
    expect(visualization).toBeInTheDocument();
    expect(screen.getByText('scheduling-compliance unification')).toBeInTheDocument();
    expect(screen.getByText('AI copilot features')).toBeInTheDocument();
  });

  it('shows opportunity cost description', () => {
    render(
      <TradeOffAnalysis
        initiatives={initiatives}
        selectedInitiative={initiatives[0]}
      />
    );

    const description = screen.getByTestId('tradeoff-description');
    expect(description).toHaveTextContent(
      'Choosing unified scheduling-compliance platform delays AI copilot by 1 quarter'
    );
  });

  it('displays trade-offs list for selected initiative', () => {
    render(
      <TradeOffAnalysis
        initiatives={initiatives}
        selectedInitiative={initiatives[0]}
      />
    );

    const tradeOffsList = screen.getByTestId('trade-offs-list');
    expect(tradeOffsList).toBeInTheDocument();
    expect(screen.getByTestId('tradeoff-0')).toHaveTextContent(
      'Delays AI copilot features by 1 quarter'
    );
  });
});
