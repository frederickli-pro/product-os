import React from 'react'
import { render, screen } from '@testing-library/react'
import { ExecutionTimeline } from '@/components/engine-4/execution-timeline'
import { ExecutionPlan } from '@/types/governance'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

const mockPlan: ExecutionPlan = {
  id: 'plan-90day',
  name: '90-Day Execution Plan',
  startDate: '2026-03-10',
  endDate: '2026-06-08',
  totalWeeks: 13,
  currentWeek: 4,
  overallProgress: 31,
  milestones: [
    {
      id: 'ms-1',
      week: 1,
      title: 'Discovery Complete',
      description: 'Structured discovery across product surfaces completed',
      status: 'completed',
      completedDate: '2026-03-17',
      targetDate: '2026-03-17',
      progress: 100,
    },
    {
      id: 'ms-2',
      week: 2,
      title: 'Maturity Assessment',
      description: 'Scored maturity assessment with gap analysis delivered',
      status: 'completed',
      completedDate: '2026-03-24',
      targetDate: '2026-03-24',
      progress: 100,
    },
    {
      id: 'ms-3',
      week: 4,
      title: 'PRD Generation Sprint 1',
      description: 'First batch of PRDs for unified scheduling-compliance view',
      status: 'in-progress',
      targetDate: '2026-04-07',
      progress: 65,
    },
    {
      id: 'ms-4',
      week: 5,
      title: 'Engineering Handoff',
      description: 'Epic/story structure ready for engineering intake',
      status: 'upcoming',
      targetDate: '2026-04-14',
      progress: 0,
    },
  ],
}

describe('ExecutionTimeline', () => {
  it('renders the 90-day execution timeline', () => {
    render(<ExecutionTimeline plan={mockPlan} />)

    expect(screen.getByText('90-Day Execution Timeline')).toBeInTheDocument()
  })

  it('displays current week number', () => {
    render(<ExecutionTimeline plan={mockPlan} />)

    expect(screen.getByText('Current Week')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
  })

  it('shows overall progress percentage', () => {
    render(<ExecutionTimeline plan={mockPlan} />)

    expect(screen.getByText('Overall Progress')).toBeInTheDocument()
    expect(screen.getByText('31%')).toBeInTheDocument()
  })

  it('displays all milestones', () => {
    render(<ExecutionTimeline plan={mockPlan} />)

    expect(screen.getByText('Discovery Complete')).toBeInTheDocument()
    expect(screen.getByText('Maturity Assessment')).toBeInTheDocument()
    expect(screen.getByText('PRD Generation Sprint 1')).toBeInTheDocument()
    expect(screen.getByText('Engineering Handoff')).toBeInTheDocument()
  })

  it('shows milestone descriptions', () => {
    render(<ExecutionTimeline plan={mockPlan} />)

    expect(screen.getByText('Structured discovery across product surfaces completed')).toBeInTheDocument()
    expect(screen.getByText('Scored maturity assessment with gap analysis delivered')).toBeInTheDocument()
  })

  it('displays week indicators for milestones', () => {
    render(<ExecutionTimeline plan={mockPlan} />)

    expect(screen.getByText('Week 1')).toBeInTheDocument()
    expect(screen.getByText('Week 2')).toBeInTheDocument()
    expect(screen.getByText('Week 4')).toBeInTheDocument()
    expect(screen.getByText('Week 5')).toBeInTheDocument()
  })

  it('renders the timeline with test ID', () => {
    render(<ExecutionTimeline plan={mockPlan} />)

    expect(screen.getByTestId('execution-timeline')).toBeInTheDocument()
  })

  it('shows start and end dates', () => {
    render(<ExecutionTimeline plan={mockPlan} />)

    expect(screen.getByText('2026-03-10')).toBeInTheDocument()
    expect(screen.getByText('2026-06-08')).toBeInTheDocument()
  })

  it('displays in-progress milestone with progress percentage', () => {
    render(<ExecutionTimeline plan={mockPlan} />)

    // In-progress milestone shows progress
    expect(screen.getByText('65%')).toBeInTheDocument()
    expect(screen.getByText('Progress')).toBeInTheDocument()
  })

  it('shows completed milestone dates', () => {
    render(<ExecutionTimeline plan={mockPlan} />)

    expect(screen.getByText('Completed 2026-03-17')).toBeInTheDocument()
    expect(screen.getByText('Completed 2026-03-24')).toBeInTheDocument()
  })
})
