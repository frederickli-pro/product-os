import React from 'react';
import { render, screen } from '@testing-library/react';
import { ConfidenceIndicators } from '@/components/engine-2/confidence-indicators';
import { confidenceFactors } from '@/data/mock/initiatives';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { initial, animate, transition, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
  },
}));

describe('ConfidenceIndicators', () => {
  it('renders confidence indicators panel', () => {
    render(
      <ConfidenceIndicators
        dataQuality={confidenceFactors.dataQuality}
        marketValidation={confidenceFactors.marketValidation}
        technicalFeasibility={confidenceFactors.technicalFeasibility}
      />
    );

    expect(screen.getByTestId('confidence-indicators')).toBeInTheDocument();
  });

  it('displays overall confidence score', () => {
    render(
      <ConfidenceIndicators
        dataQuality={confidenceFactors.dataQuality}
        marketValidation={confidenceFactors.marketValidation}
        technicalFeasibility={confidenceFactors.technicalFeasibility}
      />
    );

    const overallConfidence = screen.getByTestId('overall-confidence');
    expect(overallConfidence).toBeInTheDocument();
    // Average of 85 + 78 + 82 = 245 / 3 = 82%
    expect(overallConfidence).toHaveTextContent('82%');
  });

  it('shows data quality scores and factors', () => {
    render(
      <ConfidenceIndicators
        dataQuality={confidenceFactors.dataQuality}
        marketValidation={confidenceFactors.marketValidation}
        technicalFeasibility={confidenceFactors.technicalFeasibility}
      />
    );

    const breakdown = screen.getByTestId('confidence-breakdown');
    expect(breakdown).toBeInTheDocument();
    expect(screen.getByTestId('confidence-data-quality')).toBeInTheDocument();
    expect(screen.getByTestId('confidence-market-validation')).toBeInTheDocument();
    expect(screen.getByTestId('confidence-technical-feasibility')).toBeInTheDocument();
  });

  it('displays uncertainty levels for each factor', () => {
    render(
      <ConfidenceIndicators
        dataQuality={confidenceFactors.dataQuality}
        marketValidation={confidenceFactors.marketValidation}
        technicalFeasibility={confidenceFactors.technicalFeasibility}
      />
    );

    // Check that factors are displayed
    expect(screen.getByText('8 customer interviews analyzed')).toBeInTheDocument();
    expect(screen.getByText('2,400+ NPS responses processed')).toBeInTheDocument();
  });
});
