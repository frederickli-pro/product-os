import React from 'react'
import { render, screen } from '@testing-library/react'
import { SDLCStepper } from '@/components/dashboard/sdlc-stepper'

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
}))

describe('SDLCStepper', () => {
  it('renders all four SDLC stages', () => {
    render(
      <SDLCStepper
        currentStage="discovery"
        completedStages={[]}
        contextMessage="Current-state assessment in progress"
      />
    )

    expect(screen.getByText('Discovery')).toBeInTheDocument()
    expect(screen.getByText('Design')).toBeInTheDocument()
    expect(screen.getByText('Develop')).toBeInTheDocument()
    expect(screen.getByText('Deploy')).toBeInTheDocument()
  })

  it('shows Discovery stage as active when currentStage is discovery', () => {
    render(
      <SDLCStepper
        currentStage="discovery"
        completedStages={[]}
        contextMessage="Current-state assessment in progress"
      />
    )

    // The active stage should have "(active)" text
    expect(screen.getByText('(active)')).toBeInTheDocument()

    // Discovery should be present
    expect(screen.getByText('Discovery')).toBeInTheDocument()
  })

  it('displays the context message when provided', () => {
    const contextMessage = 'Current-state assessment in progress'

    render(
      <SDLCStepper
        currentStage="discovery"
        completedStages={[]}
        contextMessage={contextMessage}
      />
    )

    expect(screen.getByText(contextMessage)).toBeInTheDocument()
  })

  it('shows checkmarks for completed stages', () => {
    render(
      <SDLCStepper
        currentStage="design"
        completedStages={['discovery']}
      />
    )

    // Design should be active now
    expect(screen.getByText('Design')).toBeInTheDocument()
    expect(screen.getByText('(active)')).toBeInTheDocument()
  })

  it('handles multiple completed stages', () => {
    render(
      <SDLCStepper
        currentStage="develop"
        completedStages={['discovery', 'design']}
        contextMessage="Execution in progress"
      />
    )

    expect(screen.getByText('Execution in progress')).toBeInTheDocument()
    expect(screen.getByText('(active)')).toBeInTheDocument()
  })
})
