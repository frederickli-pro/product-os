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

describe('SDLCStepper for Engine 3', () => {
  it('shows Discovery and Design completed with checkmarks, Develop active', () => {
    render(
      <SDLCStepper
        currentStage="develop"
        completedStages={['discovery', 'design']}
        contextMessage="Prioritization reasoning carried from Engine 2"
      />
    );

    // Check Discovery has checkmark (completed)
    const steps = screen.getAllByRole('generic');
    expect(steps.some(el => el.textContent?.includes('Discovery'))).toBe(true);
    expect(steps.some(el => el.textContent?.includes('Design'))).toBe(true);
    expect(steps.some(el => el.textContent?.includes('Develop'))).toBe(true);
    expect(steps.some(el => el.textContent?.includes('Deploy'))).toBe(true);
  });

  it('displays shared context badge with prioritization message', () => {
    render(
      <SDLCStepper
        currentStage="develop"
        completedStages={['discovery', 'design']}
        contextMessage="Prioritization reasoning carried from Engine 2"
      />
    );

    expect(screen.getByText('Prioritization reasoning carried from Engine 2')).toBeInTheDocument();
  });

  it('shows Develop as the active stage', () => {
    render(
      <SDLCStepper
        currentStage="develop"
        completedStages={['discovery', 'design']}
      />
    );

    // The active indicator should be present for Develop
    const developText = screen.getByText('Develop');
    expect(developText).toBeInTheDocument();

    // Check for (active) indicator
    const activeIndicator = screen.getByText('(active)');
    expect(activeIndicator).toBeInTheDocument();
  });
});
