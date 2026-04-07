import React from 'react'
import { render, screen } from '@testing-library/react'
import { GapAnalysis } from '@/components/engine-1/gap-analysis'
import { GapAnalysis as GapAnalysisType } from '@/types/evidence'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
}))

describe('GapAnalysis', () => {
  const mockGaps: GapAnalysisType[] = [
    {
      id: 'gap-001',
      area: 'Limited customer research cadence',
      description: 'Customer interviews conducted only quarterly, missing real-time feedback loops.',
      severity: 'high',
      recommendation: 'Establish monthly customer interview program with rolling NPS tracking.',
    },
    {
      id: 'gap-002',
      area: 'Unclear prioritization methodology',
      description: 'Roadmap decisions lack explicit scoring criteria.',
      severity: 'critical',
      recommendation: 'Implement weighted scoring framework with clear criteria.',
    },
    {
      id: 'gap-003',
      area: 'Inconsistent documentation practices',
      description: 'PRDs and technical specs vary in quality and completeness.',
      severity: 'medium',
      recommendation: 'Standardize PRD templates with mandatory sections.',
    },
    {
      id: 'gap-004',
      area: 'Reactive project management',
      description: 'Teams operate in firefighting mode with limited visibility.',
      severity: 'high',
      recommendation: 'Deploy 90-day execution planning with automated tracking.',
    },
  ]

  it('renders the gap analysis panel', () => {
    render(<GapAnalysis gaps={mockGaps} />)

    expect(screen.getByTestId('gap-analysis')).toBeInTheDocument()
  })

  it('displays the panel title and description', () => {
    render(<GapAnalysis gaps={mockGaps} />)

    expect(screen.getByText('Gap Analysis')).toBeInTheDocument()
    expect(screen.getByText('Capability deficiencies with recommended focus areas')).toBeInTheDocument()
  })

  it('shows all four gap areas', () => {
    render(<GapAnalysis gaps={mockGaps} />)

    expect(screen.getByText('Limited customer research cadence')).toBeInTheDocument()
    expect(screen.getByText('Unclear prioritization methodology')).toBeInTheDocument()
    expect(screen.getByText('Inconsistent documentation practices')).toBeInTheDocument()
    expect(screen.getByText('Reactive project management')).toBeInTheDocument()
  })

  it('displays severity indicators for each gap', () => {
    render(<GapAnalysis gaps={mockGaps} />)

    // Check severity badges
    expect(screen.getAllByText('high').length).toBe(2)
    expect(screen.getByText('critical')).toBeInTheDocument()
    expect(screen.getByText('medium')).toBeInTheDocument()
  })

  it('shows recommendations for each gap', () => {
    render(<GapAnalysis gaps={mockGaps} />)

    // Check that recommendations are displayed
    expect(screen.getByText(/Establish monthly customer interview program/)).toBeInTheDocument()
    expect(screen.getByText(/Implement weighted scoring framework/)).toBeInTheDocument()
    expect(screen.getByText(/Standardize PRD templates/)).toBeInTheDocument()
    expect(screen.getByText(/Deploy 90-day execution planning/)).toBeInTheDocument()
  })

  it('displays gap descriptions', () => {
    render(<GapAnalysis gaps={mockGaps} />)

    expect(screen.getByText(/Customer interviews conducted only quarterly/)).toBeInTheDocument()
    expect(screen.getByText(/Roadmap decisions lack explicit scoring criteria/)).toBeInTheDocument()
  })

  it('handles empty gaps array', () => {
    render(<GapAnalysis gaps={[]} />)

    expect(screen.getByTestId('gap-analysis')).toBeInTheDocument()
    expect(screen.getByText('Gap Analysis')).toBeInTheDocument()
  })
})
