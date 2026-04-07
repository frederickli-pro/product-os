import React from 'react';
import { render, screen } from '@testing-library/react';
import { MetricsTable } from '@/components/engine-3/metrics-table';
import { timeReductionMetrics } from '@/data/mock/prd-templates';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { initial, animate, transition, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
    tr: ({ children, ...props }: any) => {
      const { initial, animate, transition, ...rest } = props;
      return <tr {...rest}>{children}</tr>;
    },
  },
}));

describe('MetricsTable', () => {
  it('renders the time reduction metrics table', () => {
    render(<MetricsTable metrics={timeReductionMetrics} />);

    expect(screen.getByTestId('metrics-table')).toBeInTheDocument();
    expect(screen.getByTestId('metrics-comparison-table')).toBeInTheDocument();
  });

  it('displays all metric rows with correct values', () => {
    render(<MetricsTable metrics={timeReductionMetrics} />);

    // PRD creation
    expect(screen.getByTestId('metric-name-metric-001')).toHaveTextContent('PRD creation');
    expect(screen.getByTestId('metric-manual-metric-001')).toHaveTextContent('1-2 weeks');
    expect(screen.getByTestId('metric-product-os-metric-001')).toHaveTextContent('Hours');
    expect(screen.getByTestId('metric-improvement-metric-001')).toHaveTextContent('90%+ time reduction');

    // Prioritization cycle
    expect(screen.getByTestId('metric-name-metric-002')).toHaveTextContent('Prioritization cycle');
    expect(screen.getByTestId('metric-manual-metric-002')).toHaveTextContent('3-4 weeks');
    expect(screen.getByTestId('metric-product-os-metric-002')).toHaveTextContent('3-5 days');
    expect(screen.getByTestId('metric-improvement-metric-002')).toHaveTextContent('80% faster decisions');

    // Decision documentation
    expect(screen.getByTestId('metric-name-metric-003')).toHaveTextContent('Decision documentation');
    expect(screen.getByTestId('metric-manual-metric-003')).toHaveTextContent('~30%');
    expect(screen.getByTestId('metric-product-os-metric-003')).toHaveTextContent('95%+');
    expect(screen.getByTestId('metric-improvement-metric-003')).toHaveTextContent('3x better capture');

    // Time to artifacts
    expect(screen.getByTestId('metric-name-metric-004')).toHaveTextContent('Time to artifacts');
    expect(screen.getByTestId('metric-manual-metric-004')).toHaveTextContent('2-4 weeks');
    expect(screen.getByTestId('metric-product-os-metric-004')).toHaveTextContent('Days');
    expect(screen.getByTestId('metric-improvement-metric-004')).toHaveTextContent('85%+ acceleration');

    // Rework
    expect(screen.getByTestId('metric-name-metric-005')).toHaveTextContent('Rework');
    expect(screen.getByTestId('metric-manual-metric-005')).toHaveTextContent('25-35%');
    expect(screen.getByTestId('metric-product-os-metric-005')).toHaveTextContent('Under 10%');
    expect(screen.getByTestId('metric-improvement-metric-005')).toHaveTextContent('60%+ reduction');
  });

  it('displays side-by-side comparison columns', () => {
    render(<MetricsTable metrics={timeReductionMetrics} />);

    expect(screen.getByText('Manual Process')).toBeInTheDocument();
    expect(screen.getByText(/With Product OS/)).toBeInTheDocument();
    expect(screen.getByText('Improvement')).toBeInTheDocument();
  });
});
