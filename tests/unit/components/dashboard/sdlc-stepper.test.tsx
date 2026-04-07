/**
 * Unit tests for SDLC Stepper component.
 * Test case 4: Verify SDLC progress stepper presence
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { SDLCStepper } from '@/components/dashboard/sdlc-stepper';
import { SDLCStage } from '@/types';

describe('SDLCStepper', () => {
  const defaultProps = {
    currentStage: 'discovery' as SDLCStage,
    completedStages: [] as SDLCStage[],
  };

  it('renders all four SDLC stages', () => {
    render(<SDLCStepper {...defaultProps} />);

    expect(screen.getByText('Discovery')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('Develop')).toBeInTheDocument();
    expect(screen.getByText('Deploy')).toBeInTheDocument();
  });

  it('renders with testid for automation', () => {
    render(<SDLCStepper {...defaultProps} />);

    expect(screen.getByTestId('sdlc-stepper')).toBeInTheDocument();
  });

  it('shows Discovery -> Design -> Develop -> Deploy stages in order', () => {
    render(<SDLCStepper {...defaultProps} />);

    const stepper = screen.getByTestId('sdlc-stepper');
    const labels = stepper.querySelectorAll('[data-testid^="stage-"]');

    expect(labels).toHaveLength(4);
    expect(labels[0]).toHaveAttribute('data-testid', 'stage-discovery');
    expect(labels[1]).toHaveAttribute('data-testid', 'stage-design');
    expect(labels[2]).toHaveAttribute('data-testid', 'stage-develop');
    expect(labels[3]).toHaveAttribute('data-testid', 'stage-deploy');
  });

  it('marks discovery stage as active when currentStage is discovery', () => {
    render(<SDLCStepper {...defaultProps} currentStage="discovery" />);

    const discoveryStep = screen.getByTestId('stage-discovery');
    expect(discoveryStep).toHaveAttribute('data-active', 'true');
  });

  it('marks completed stages with checkmark', () => {
    render(
      <SDLCStepper
        currentStage="design"
        completedStages={['discovery']}
      />
    );

    const discoveryStep = screen.getByTestId('stage-discovery');
    expect(discoveryStep).toHaveAttribute('data-completed', 'true');
  });

  it('displays context message when provided', () => {
    const contextMessage = 'Current-state assessment in progress';
    render(<SDLCStepper {...defaultProps} contextMessage={contextMessage} />);

    expect(screen.getByTestId('context-message')).toHaveTextContent(contextMessage);
  });

  it('shows multiple completed stages correctly', () => {
    render(
      <SDLCStepper
        currentStage="develop"
        completedStages={['discovery', 'design']}
      />
    );

    expect(screen.getByTestId('stage-discovery')).toHaveAttribute('data-completed', 'true');
    expect(screen.getByTestId('stage-design')).toHaveAttribute('data-completed', 'true');
    expect(screen.getByTestId('stage-develop')).toHaveAttribute('data-active', 'true');
    expect(screen.getByTestId('stage-deploy')).toHaveAttribute('data-completed', 'false');
  });
});
