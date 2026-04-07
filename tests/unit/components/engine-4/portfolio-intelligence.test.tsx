import React from 'react'
import { render, screen } from '@testing-library/react'
import { PortfolioIntelligence } from '@/components/engine-4/portfolio-intelligence'
import { PortfolioPattern, SharedLearning, SuccessRate, CompoundingIntelligence } from '@/types/governance'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

const mockPatterns: PortfolioPattern[] = [
  {
    id: 'pattern-1',
    category: 'Integration Complexity',
    pattern: 'Multi-module integration challenges',
    prevalence: 68,
    affectedVerticals: ['B2B SaaS', 'Enterprise Software', 'Aviation'],
    description: 'Common challenge in B2B SaaS portfolio companies with multiple acquired products',
  },
  {
    id: 'pattern-2',
    category: 'Mobile Experience Gaps',
    pattern: 'Native mobile underinvestment',
    prevalence: 52,
    affectedVerticals: ['SaaS', 'Healthcare', 'Logistics'],
    description: 'Mobile adoption lagging desktop usage across portfolio',
  },
  {
    id: 'pattern-3',
    category: 'AI Feature Requests',
    pattern: 'Customer demand for AI-powered features',
    prevalence: 78,
    affectedVerticals: ['All Verticals'],
    description: 'Strong customer pull for AI capabilities across all portfolio companies',
  },
]

const mockLearnings: SharedLearning[] = [
  {
    id: 'learning-1',
    source: 'Portco A',
    insight: 'Reduced scheduling integration time by 60% using GraphQL federation approach',
    impact: '60% faster integration',
    approach: 'GraphQL federation with schema stitching',
    applicability: ['Aviation', 'Logistics', 'Healthcare'],
  },
]

const mockSuccessRates: SuccessRate[] = [
  {
    id: 'sr-1',
    initiativeType: 'Compliance features',
    onTimeRate: 92,
    totalCount: 45,
    successCount: 41,
    description: 'Highest success rate due to clear regulatory requirements',
  },
  {
    id: 'sr-2',
    initiativeType: 'AI capabilities',
    onTimeRate: 67,
    totalCount: 30,
    successCount: 20,
    description: 'Lower success rate reflects emerging technology challenges',
  },
  {
    id: 'sr-3',
    initiativeType: 'Platform unifications',
    onTimeRate: 81,
    totalCount: 22,
    successCount: 18,
    description: 'Strong track record with proven integration playbooks',
  },
]

const mockCompounding: CompoundingIntelligence = {
  documentedPatterns: 127,
  provenPlaybooks: 34,
  industryTemplates: 8,
  growthRate: 12,
}

describe('PortfolioIntelligence', () => {
  it('renders the cross-portfolio intelligence section', () => {
    render(
      <PortfolioIntelligence
        patterns={mockPatterns}
        learnings={mockLearnings}
        successRates={mockSuccessRates}
        compounding={mockCompounding}
      />
    )

    expect(screen.getByText('Cross-Portfolio Intelligence')).toBeInTheDocument()
  })

  it('shows the portfolio companies description', () => {
    render(
      <PortfolioIntelligence
        patterns={mockPatterns}
        learnings={mockLearnings}
        successRates={mockSuccessRates}
        compounding={mockCompounding}
      />
    )

    expect(screen.getByText('Patterns across 10-50 portfolio companies')).toBeInTheDocument()
  })

  it('displays pattern recognition with correct prevalence', () => {
    render(
      <PortfolioIntelligence
        patterns={mockPatterns}
        learnings={mockLearnings}
        successRates={mockSuccessRates}
        compounding={mockCompounding}
      />
    )

    expect(screen.getByText('Pattern Recognition')).toBeInTheDocument()
    expect(screen.getByText('Integration Complexity')).toBeInTheDocument()
    expect(screen.getByText('68%')).toBeInTheDocument()
    expect(screen.getByText('Mobile Experience Gaps')).toBeInTheDocument()
    expect(screen.getByText('52%')).toBeInTheDocument()
    expect(screen.getByText('AI Feature Requests')).toBeInTheDocument()
    expect(screen.getByText('78%')).toBeInTheDocument()
  })

  it('displays affected verticals as tags', () => {
    render(
      <PortfolioIntelligence
        patterns={mockPatterns}
        learnings={mockLearnings}
        successRates={mockSuccessRates}
        compounding={mockCompounding}
      />
    )

    expect(screen.getByText('B2B SaaS')).toBeInTheDocument()
    expect(screen.getByText('Aviation')).toBeInTheDocument()
    expect(screen.getByText('Healthcare')).toBeInTheDocument()
  })

  it('shows shared learnings feed', () => {
    render(
      <PortfolioIntelligence
        patterns={mockPatterns}
        learnings={mockLearnings}
        successRates={mockSuccessRates}
        compounding={mockCompounding}
      />
    )

    expect(screen.getByText('Shared Learnings Feed')).toBeInTheDocument()
    expect(screen.getByText('Portco A')).toBeInTheDocument()
    expect(screen.getByText('Reduced scheduling integration time by 60% using GraphQL federation approach')).toBeInTheDocument()
    expect(screen.getByText('60% faster integration')).toBeInTheDocument()
  })

  it('displays success rate indicators', () => {
    render(
      <PortfolioIntelligence
        patterns={mockPatterns}
        learnings={mockLearnings}
        successRates={mockSuccessRates}
        compounding={mockCompounding}
      />
    )

    expect(screen.getByText('Implementation Success Rates')).toBeInTheDocument()
    expect(screen.getByText('Compliance features')).toBeInTheDocument()
    expect(screen.getByText('92% on-time')).toBeInTheDocument()
    expect(screen.getByText('AI capabilities')).toBeInTheDocument()
    expect(screen.getByText('67% on-time')).toBeInTheDocument()
    expect(screen.getByText('Platform unifications')).toBeInTheDocument()
    expect(screen.getByText('81% on-time')).toBeInTheDocument()
  })

  it('shows compounding intelligence visualization', () => {
    render(
      <PortfolioIntelligence
        patterns={mockPatterns}
        learnings={mockLearnings}
        successRates={mockSuccessRates}
        compounding={mockCompounding}
      />
    )

    expect(screen.getByText('Compounding Intelligence')).toBeInTheDocument()
    expect(screen.getByText('127')).toBeInTheDocument()
    expect(screen.getByText('Documented Patterns')).toBeInTheDocument()
    expect(screen.getByText('34')).toBeInTheDocument()
    expect(screen.getByText('Proven Playbooks')).toBeInTheDocument()
    expect(screen.getByText('8')).toBeInTheDocument()
    expect(screen.getByText('Industry-Specific Templates')).toBeInTheDocument()
  })

  it('renders with test IDs', () => {
    render(
      <PortfolioIntelligence
        patterns={mockPatterns}
        learnings={mockLearnings}
        successRates={mockSuccessRates}
        compounding={mockCompounding}
      />
    )

    expect(screen.getByTestId('portfolio-intelligence')).toBeInTheDocument()
    expect(screen.getByTestId('compounding-visualization')).toBeInTheDocument()
    expect(screen.getByTestId('pattern-pattern-1')).toBeInTheDocument()
    expect(screen.getByTestId('learning-learning-1')).toBeInTheDocument()
    expect(screen.getByTestId('success-rate-sr-1')).toBeInTheDocument()
  })
})
