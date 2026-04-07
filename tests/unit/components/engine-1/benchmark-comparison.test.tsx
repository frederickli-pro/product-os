import React from 'react'
import { render, screen } from '@testing-library/react'
import { BenchmarkComparison } from '@/components/engine-1/benchmark-comparison'
import { BenchmarkData, MaturityScore } from '@/types/evidence'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
}))

describe('BenchmarkComparison', () => {
  const mockScores: MaturityScore = {
    customerDiscoveryDepth: 42,
    roadmapClarity: 55,
    executionVelocity: 61,
    governanceRigor: 38,
    overallScore: 49,
    percentileRanking: 35,
    industryComparison: 'Below average for aviation SaaS',
  }

  const mockBenchmark: BenchmarkData = {
    companyName: '[Portfolio Co]',
    scores: mockScores,
    peerMedian: {
      customerDiscoveryDepth: 58,
      roadmapClarity: 62,
      executionVelocity: 55,
      governanceRigor: 54,
    },
    portfolioSize: 90,
    belowMedianDimensions: ['Customer Discovery Depth', 'Governance Rigor'],
  }

  it('renders the benchmark comparison panel', () => {
    render(<BenchmarkComparison benchmark={mockBenchmark} />)

    expect(screen.getByTestId('benchmark-comparison')).toBeInTheDocument()
  })

  it('displays the panel title and portfolio size', () => {
    render(<BenchmarkComparison benchmark={mockBenchmark} />)

    expect(screen.getByText('Portfolio Benchmark Comparison')).toBeInTheDocument()
    expect(screen.getByText(/90\+ portfolio companies/)).toBeInTheDocument()
  })

  it('shows Portside below median on discovery and governance dimensions', () => {
    render(<BenchmarkComparison benchmark={mockBenchmark} />)

    // Check for "Below median" indicators
    const belowMedianIndicators = screen.getAllByText('Below median')
    expect(belowMedianIndicators.length).toBeGreaterThanOrEqual(2)
  })

  it('displays all four dimension scores', () => {
    render(<BenchmarkComparison benchmark={mockBenchmark} />)

    // Check dimension names
    expect(screen.getByText('Customer Discovery Depth')).toBeInTheDocument()
    expect(screen.getByText('Roadmap Clarity')).toBeInTheDocument()
    expect(screen.getByText('Execution Velocity')).toBeInTheDocument()
    expect(screen.getByText('Governance Rigor')).toBeInTheDocument()
  })

  it('shows the comparison scores against median', () => {
    render(<BenchmarkComparison benchmark={mockBenchmark} />)

    // Check that scores are displayed
    expect(screen.getByText('42%')).toBeInTheDocument() // Customer Discovery
    expect(screen.getByText('55%')).toBeInTheDocument() // Roadmap Clarity
    expect(screen.getByText('61%')).toBeInTheDocument() // Execution Velocity
    expect(screen.getByText('38%')).toBeInTheDocument() // Governance Rigor
  })

  it('displays median comparison values', () => {
    render(<BenchmarkComparison benchmark={mockBenchmark} />)

    // Check median values
    expect(screen.getByText('vs. 58% median')).toBeInTheDocument()
    expect(screen.getByText('vs. 62% median')).toBeInTheDocument()
    expect(screen.getByText('vs. 55% median')).toBeInTheDocument()
    expect(screen.getByText('vs. 54% median')).toBeInTheDocument()
  })

  it('shows key finding highlighting below median dimensions', () => {
    render(<BenchmarkComparison benchmark={mockBenchmark} />)

    expect(screen.getByText(/Key Finding:/)).toBeInTheDocument()
    expect(screen.getByText(/below median on/)).toBeInTheDocument()
    expect(screen.getByText(/Customer Discovery Depth and Governance Rigor/)).toBeInTheDocument()
  })
})
