import React from 'react'
import { render, screen } from '@testing-library/react'
import { SDLCStepper } from '@/components/dashboard/sdlc-stepper'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

describe('SDLCStepper for Engine 4', () => {
  it('renders with all stages completed except deploy which is active', () => {
    render(
      <SDLCStepper
        currentStage="deploy"
        completedStages={['discovery', 'design', 'develop']}
        contextMessage="Governance connected to every upstream decision"
      />
    )

    expect(screen.getByText('Discovery')).toBeInTheDocument()
    expect(screen.getByText('Design')).toBeInTheDocument()
    expect(screen.getByText('Develop')).toBeInTheDocument()
    expect(screen.getByText('Deploy')).toBeInTheDocument()
  })

  it('shows the governance context message', () => {
    render(
      <SDLCStepper
        currentStage="deploy"
        completedStages={['discovery', 'design', 'develop']}
        contextMessage="Governance connected to every upstream decision"
      />
    )

    expect(screen.getByText('Governance connected to every upstream decision')).toBeInTheDocument()
  })

  it('shows Deploy as active', () => {
    render(
      <SDLCStepper
        currentStage="deploy"
        completedStages={['discovery', 'design', 'develop']}
        contextMessage="Governance connected to every upstream decision"
      />
    )

    // Check that (active) indicator is shown for Deploy
    expect(screen.getByText('(active)')).toBeInTheDocument()
  })

  it('shows checkmarks for completed stages', () => {
    const { container } = render(
      <SDLCStepper
        currentStage="deploy"
        completedStages={['discovery', 'design', 'develop']}
      />
    )

    // There should be 3 checkmark SVGs for the completed stages
    const checkIcons = container.querySelectorAll('svg.lucide-check')
    expect(checkIcons.length).toBe(3)
  })
})
