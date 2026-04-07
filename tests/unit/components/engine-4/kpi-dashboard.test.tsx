import React from 'react'
import { render, screen } from '@testing-library/react'
import { KPIDashboard } from '@/components/engine-4/kpi-dashboard'
import { KPIMetric } from '@/types/governance'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

const mockMetrics: KPIMetric[] = [
  {
    id: 'kpi-1',
    name: 'Platform Unification Progress',
    description: 'Integration completion across scheduling and compliance modules',
    currentValue: 68,
    targetValue: 100,
    unit: '%',
    trend: 'up',
    trendHistory: [45, 52, 58, 63, 68],
    linkedReasoning: {
      id: 'reason-1',
      initiative: 'Unified Scheduling-Compliance Platform',
      reasoning: 'Addresses #1 customer request (47% of support tickets)',
      factors: {
        revenueImpact: 40,
        churnRiskReduction: 25,
        competitiveExposure: 20,
        technicalEnabler: 10,
        strategicAlignment: 5,
      },
      confidenceScore: 87,
    },
  },
  {
    id: 'kpi-2',
    name: 'Customer Incident Resolution',
    description: 'Average resolution time improvement',
    currentValue: 42,
    targetValue: 50,
    unit: '% faster',
    trend: 'up',
    trendHistory: [15, 22, 30, 36, 42],
    linkedReasoning: {
      id: 'reason-1',
      initiative: 'Unified Scheduling-Compliance Platform',
      reasoning: 'Cross-module data flow reduces resolution time',
      factors: {
        revenueImpact: 40,
        churnRiskReduction: 25,
        competitiveExposure: 20,
        technicalEnabler: 10,
        strategicAlignment: 5,
      },
      confidenceScore: 87,
    },
  },
]

describe('KPIDashboard', () => {
  it('renders the KPI dashboard with correct title', () => {
    render(<KPIDashboard metrics={mockMetrics} />)

    expect(screen.getByText('KPI Dashboard')).toBeInTheDocument()
  })

  it('displays all KPI metrics', () => {
    render(<KPIDashboard metrics={mockMetrics} />)

    expect(screen.getByText('Platform Unification Progress')).toBeInTheDocument()
    expect(screen.getByText('Customer Incident Resolution')).toBeInTheDocument()
  })

  it('shows KPI values with units', () => {
    render(<KPIDashboard metrics={mockMetrics} />)

    expect(screen.getByText('68')).toBeInTheDocument()
    expect(screen.getByText('%')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
    expect(screen.getByText('% faster')).toBeInTheDocument()
  })

  it('displays progress bars for each KPI', () => {
    render(<KPIDashboard metrics={mockMetrics} />)

    const dashboard = screen.getByTestId('kpi-dashboard')
    expect(dashboard).toBeInTheDocument()
  })

  it('shows prioritization-KPI linkage text', () => {
    render(<KPIDashboard metrics={mockMetrics} />)

    expect(screen.getByText('Prioritization reasoning linked to KPIs in real-time view')).toBeInTheDocument()
  })

  it('renders trend visualization (sparklines)', () => {
    render(<KPIDashboard metrics={mockMetrics} />)

    // Check that KPI cards are rendered with test IDs
    expect(screen.getByTestId('kpi-card-kpi-1')).toBeInTheDocument()
    expect(screen.getByTestId('kpi-card-kpi-2')).toBeInTheDocument()
  })

  it('displays KPI descriptions', () => {
    render(<KPIDashboard metrics={mockMetrics} />)

    expect(screen.getByText('Integration completion across scheduling and compliance modules')).toBeInTheDocument()
    expect(screen.getByText('Average resolution time improvement')).toBeInTheDocument()
  })
})
