import React from 'react'
import { render, screen } from '@testing-library/react'
import { RadarChart } from '@/components/engine-1/radar-chart'
import { MaturityScore } from '@/types/evidence'

// Mock recharts to avoid canvas issues in tests
jest.mock('recharts', () => ({
  RadarChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="recharts-radar">{children}</div>
  ),
  PolarGrid: () => <div data-testid="polar-grid" />,
  PolarAngleAxis: ({ dataKey }: { dataKey: string }) => (
    <div data-testid="polar-angle-axis" data-key={dataKey} />
  ),
  PolarRadiusAxis: () => <div data-testid="polar-radius-axis" />,
  Radar: ({ name, dataKey }: { name: string; dataKey: string }) => (
    <div data-testid={`radar-${dataKey}`} data-name={name} />
  ),
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  Legend: () => <div data-testid="legend" />,
  Tooltip: () => <div data-testid="tooltip" />,
}))

describe('RadarChart', () => {
  const mockScores: MaturityScore = {
    customerDiscoveryDepth: 42,
    roadmapClarity: 55,
    executionVelocity: 61,
    governanceRigor: 38,
    overallScore: 49,
    percentileRanking: 35,
    industryComparison: 'Below average for aviation SaaS',
  }

  const mockPeerMedian = {
    customerDiscoveryDepth: 58,
    roadmapClarity: 62,
    executionVelocity: 55,
    governanceRigor: 54,
  }

  it('renders the radar chart container', () => {
    render(<RadarChart scores={mockScores} />)

    expect(screen.getByTestId('radar-chart')).toBeInTheDocument()
  })

  it('renders with four dimensions for maturity scoring', () => {
    render(<RadarChart scores={mockScores} peerMedian={mockPeerMedian} />)

    // The chart should render the company score radar
    expect(screen.getByTestId('radar-score')).toBeInTheDocument()
  })

  it('renders company and peer comparison when showComparison is true', () => {
    render(
      <RadarChart
        scores={mockScores}
        peerMedian={mockPeerMedian}
        showComparison={true}
      />
    )

    // Should have both score and median radars
    expect(screen.getByTestId('radar-score')).toBeInTheDocument()
    expect(screen.getByTestId('radar-median')).toBeInTheDocument()
  })

  it('renders without peer comparison when showComparison is false', () => {
    render(
      <RadarChart
        scores={mockScores}
        peerMedian={mockPeerMedian}
        showComparison={false}
      />
    )

    expect(screen.getByTestId('radar-score')).toBeInTheDocument()
    expect(screen.queryByTestId('radar-median')).not.toBeInTheDocument()
  })

  it('renders all required chart components', () => {
    render(<RadarChart scores={mockScores} peerMedian={mockPeerMedian} />)

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
    expect(screen.getByTestId('polar-grid')).toBeInTheDocument()
    expect(screen.getByTestId('polar-angle-axis')).toBeInTheDocument()
    expect(screen.getByTestId('polar-radius-axis')).toBeInTheDocument()
    expect(screen.getByTestId('legend')).toBeInTheDocument()
    expect(screen.getByTestId('tooltip')).toBeInTheDocument()
  })
})
