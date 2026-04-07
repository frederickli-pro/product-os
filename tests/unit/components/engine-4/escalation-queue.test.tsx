import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { EscalationQueue } from '@/components/engine-4/escalation-queue'
import { EscalationItem } from '@/types/governance'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

const mockItems: EscalationItem[] = [
  {
    id: 'esc-1',
    initiative: 'Mobile Experience Overhaul',
    stalledSince: '2026-03-24',
    weeksStalled: 2,
    reason: 'Resource conflict with platform unification priority',
    impact: 'medium',
    context: 'Mobile adoption at 45% vs target 65%. Feature blocked pending unified API completion.',
    suggestedAction: 'Allocate dedicated mobile resource post-Sprint 1 completion',
    assignedTo: 'VP Engineering',
  },
  {
    id: 'esc-2',
    initiative: 'Compliance Audit Automation',
    stalledSince: '2026-03-17',
    weeksStalled: 3,
    reason: 'Pending regulatory review on automated reporting',
    impact: 'high',
    context: 'Customer compliance deadlines approaching. Manual workarounds in place.',
    suggestedAction: 'Expedite legal/compliance review with external counsel',
    assignedTo: 'General Counsel',
  },
]

describe('EscalationQueue', () => {
  it('renders the escalation queue with title', () => {
    render(<EscalationQueue items={mockItems} />)

    expect(screen.getByText('Escalation Queue')).toBeInTheDocument()
  })

  it('displays items stalled description', () => {
    render(<EscalationQueue items={mockItems} />)

    expect(screen.getByText('Items stalled for 2+ weeks with context and action buttons')).toBeInTheDocument()
  })

  it('shows all escalation items', () => {
    render(<EscalationQueue items={mockItems} />)

    expect(screen.getByText('Mobile Experience Overhaul')).toBeInTheDocument()
    expect(screen.getByText('Compliance Audit Automation')).toBeInTheDocument()
  })

  it('displays weeks stalled for each item', () => {
    render(<EscalationQueue items={mockItems} />)

    expect(screen.getByText('Stalled 2+ weeks')).toBeInTheDocument()
    expect(screen.getByText('Stalled 3+ weeks')).toBeInTheDocument()
  })

  it('shows impact badges', () => {
    render(<EscalationQueue items={mockItems} />)

    expect(screen.getByText('Medium Impact')).toBeInTheDocument()
    expect(screen.getByText('High Impact')).toBeInTheDocument()
  })

  it('displays assignees', () => {
    render(<EscalationQueue items={mockItems} />)

    expect(screen.getByText('VP Engineering')).toBeInTheDocument()
    expect(screen.getByText('General Counsel')).toBeInTheDocument()
  })

  it('shows reasons for escalation', () => {
    render(<EscalationQueue items={mockItems} />)

    expect(screen.getByText(/Resource conflict with platform unification priority/)).toBeInTheDocument()
    expect(screen.getByText(/Pending regulatory review on automated reporting/)).toBeInTheDocument()
  })

  it('displays context for each item', () => {
    render(<EscalationQueue items={mockItems} />)

    expect(screen.getByText(/Mobile adoption at 45% vs target 65%/)).toBeInTheDocument()
    expect(screen.getByText(/Customer compliance deadlines approaching/)).toBeInTheDocument()
  })

  it('shows suggested actions', () => {
    render(<EscalationQueue items={mockItems} />)

    expect(screen.getByText('Allocate dedicated mobile resource post-Sprint 1 completion')).toBeInTheDocument()
    expect(screen.getByText('Expedite legal/compliance review with external counsel')).toBeInTheDocument()
  })

  it('renders action buttons', () => {
    render(<EscalationQueue items={mockItems} />)

    const takeActionButtons = screen.getAllByText('Take Action')
    const acknowledgeButtons = screen.getAllByText('Acknowledge')

    expect(takeActionButtons).toHaveLength(2)
    expect(acknowledgeButtons).toHaveLength(2)
  })

  it('calls onAction when Take Action is clicked', () => {
    const mockOnAction = jest.fn()
    render(<EscalationQueue items={mockItems} onAction={mockOnAction} />)

    const takeActionButtons = screen.getAllByText('Take Action')
    fireEvent.click(takeActionButtons[0])

    expect(mockOnAction).toHaveBeenCalledWith('esc-1', 'take-action')
  })

  it('calls onAction when Acknowledge is clicked', () => {
    const mockOnAction = jest.fn()
    render(<EscalationQueue items={mockItems} onAction={mockOnAction} />)

    const acknowledgeButtons = screen.getAllByText('Acknowledge')
    fireEvent.click(acknowledgeButtons[1])

    expect(mockOnAction).toHaveBeenCalledWith('esc-2', 'acknowledge')
  })

  it('renders the queue with test ID', () => {
    render(<EscalationQueue items={mockItems} />)

    expect(screen.getByTestId('escalation-queue')).toBeInTheDocument()
  })

  it('shows empty state when no items', () => {
    render(<EscalationQueue items={[]} />)

    expect(screen.getByText('No escalations at this time')).toBeInTheDocument()
  })
})
