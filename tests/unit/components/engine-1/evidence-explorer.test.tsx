/**
 * Unit tests for Evidence Explorer component.
 * Tests tab layout to ensure labels don't overlap.
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { EvidenceExplorer } from '@/components/engine-1/evidence-explorer'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}))

const mockProps = {
  interviews: [
    {
      id: 'int-1',
      participant: 'Jane Doe',
      role: 'Product Manager',
      date: '2025-01-15',
      excerpts: [
        {
          id: 'exc-1',
          text: 'We need better scheduling tools.',
          theme: 'pain_point' as const,
          thematicTags: ['scheduling', 'pain point'],
          sentiment: 'detractor' as const,
        },
      ],
    },
  ],
  npsResponses: [
    {
      id: 'nps-1',
      score: 9,
      category: 'promoter' as const,
      verbatim: 'Great product!',
      themes: ['satisfaction'],
      customerTenure: 12,
      productUsageDepth: 'heavy' as const,
      timestamp: '2025-01-15',
    },
  ],
  npsDistribution: {
    promoters: 45,
    passives: 30,
    detractors: 25,
    score: 20,
    topPositiveThemes: ['ease of use'],
    topNegativeThemes: ['scheduling'],
    quarterOverQuarterChange: 5,
  },
  supportTickets: [
    {
      id: 'st-1',
      category: 'scheduling_conflicts' as const,
      priority: 'high' as const,
      resolutionTime: 4,
      satisfactionScore: 3,
      escalated: false,
      description: 'Calendar sync failing',
    },
  ],
  supportBreakdown: {
    categories: {
      scheduling_conflicts: 40,
      compliance_reporting: 25,
      mobile_access: 20,
      other: 15,
    },
    resolutionTimes: {
      critical: 2,
      high: 4,
      medium: 8,
      low: 24,
    },
    escalationRates: { scheduling: 15 },
  },
  usageAnalytics: {
    featureAdoption: {
      scheduling: 85,
      compliance: 60,
      mobile_app: 45,
      api_integrations: 30,
    },
    engagementFunnel: {
      onboardingCompletion: 78,
      coreFeatureActivation: 65,
      advancedFeatureAdoption: 32,
    },
    sessionMetrics: {
      averageDuration: 12,
      weeklyFrequency: 4,
    },
    powerUserCriteria: {
      dailyActive: true,
      featuresUsed: 8,
    },
    churnRiskIndicators: ['Declining login frequency'],
  },
}

describe('EvidenceExplorer', () => {
  it('renders the evidence explorer card', () => {
    render(<EvidenceExplorer {...mockProps} />)
    expect(screen.getByTestId('evidence-explorer')).toBeInTheDocument()
  })

  it('displays all four tab labels', () => {
    render(<EvidenceExplorer {...mockProps} />)
    expect(screen.getByText('Interviews')).toBeInTheDocument()
    expect(screen.getByText('NPS')).toBeInTheDocument()
    expect(screen.getByText('Support Tickets')).toBeInTheDocument()
    expect(screen.getByText('Usage Analytics')).toBeInTheDocument()
  })

  it('uses a 2-column grid for tabs so long labels do not overlap', () => {
    // Business behavior: On narrow viewports (Engine 1 column layout), the Evidence
    // Explorer has 4 tabs. "Support Tickets" and "Usage Analytics" are long labels
    // that overlap when crammed into 4 equal columns. A 2-column grid (2x2) gives
    // each tab enough room to display its full label without overflow.
    render(<EvidenceExplorer {...mockProps} />)

    const tabsList = screen.getByRole('tablist')
    expect(tabsList).toHaveClass('grid-cols-2')
    expect(tabsList).not.toHaveClass('grid-cols-4')
  })

  it('renders the default Interviews tab content', () => {
    render(<EvidenceExplorer {...mockProps} />)
    expect(screen.getByTestId('interviews-content')).toBeInTheDocument()
  })
})
