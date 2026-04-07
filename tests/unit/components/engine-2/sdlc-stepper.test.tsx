import React from 'react';
import { render, screen } from '@testing-library/react';
import { SDLCStepper } from '@/components/dashboard/sdlc-stepper';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { initial, animate, transition, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
  },
}));

describe('SDLCStepper', () => {
  it('renders all SDLC stages', () => {
    render(
      <SDLCStepper
        currentStage="design"
        completedStages={['discovery']}
        contextBadge="Diagnostic insights inform prioritization"
      />
    );

    expect(screen.getByText('Discovery')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('Develop')).toBeInTheDocument();
    expect(screen.getByText('Deploy')).toBeInTheDocument();
  });

  it('shows discovery as completed with checkmark', () => {
    render(
      <SDLCStepper
        currentStage="design"
        completedStages={['discovery']}
        contextBadge="Diagnostic insights inform prioritization"
      />
    );

    const discoveryStage = screen.getByTestId('stage-discovery');
    expect(discoveryStage).toHaveAttribute('data-completed', 'true');
    expect(screen.getByTestId('checkmark-discovery')).toBeInTheDocument();
  });

  it('shows design as active stage', () => {
    render(
      <SDLCStepper
        currentStage="design"
        completedStages={['discovery']}
        contextBadge="Diagnostic insights inform prioritization"
      />
    );

    const designStage = screen.getByTestId('stage-design');
    expect(designStage).toHaveAttribute('data-active', 'true');
  });

  it('displays shared context badge', () => {
    render(
      <SDLCStepper
        currentStage="design"
        completedStages={['discovery']}
        contextBadge="Diagnostic insights inform prioritization"
      />
    );

    const badge = screen.getByTestId('context-badge');
    expect(badge).toHaveTextContent('Diagnostic insights inform prioritization');
  });
});
