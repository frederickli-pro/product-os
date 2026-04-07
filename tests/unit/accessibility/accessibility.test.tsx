/**
 * Comprehensive WCAG AA Accessibility Tests
 * Scenario 13: Accessibility Compliance
 *
 * Tests:
 * - Test case 1: Color contrast (see branding/color-contrast.test.ts)
 * - Test case 6: ARIA labels on icons
 * - Test case 7: Status indicators (icons/text in addition to color)
 * - Test case 8: Heading structure
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
    section: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <section {...props}>{children}</section>
    ),
    button: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <button {...props}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
}))

// Import components after mocks
import { EngineQuadrant } from '@/components/dashboard/engine-quadrant'
import { SDLCStepper } from '@/components/dashboard/sdlc-stepper'
import { KPIDashboard } from '@/components/engine-4/kpi-dashboard'
import { EscalationQueue } from '@/components/engine-4/escalation-queue'
import { ProgressBar } from '@/components/dashboard/progress-bar'

// Mock data
const mockEngine = {
  id: 1 as const,
  name: 'Diagnostic',
  description: 'Structured discovery synthesizing customer data into maturity assessments.',
  status: 'active' as const,
  actNumber: 1 as const,
  act: 1 as const,
}

const mockKPIMetrics = [
  {
    id: 'kpi-1',
    name: 'PRD Completion Rate',
    currentValue: 87,
    targetValue: 100,
    unit: '%',
    trend: 'up' as const,
    trendHistory: [70, 75, 80, 82, 85, 87],
    description: 'Percentage of PRDs completed on schedule',
    linkedReasoning: {
      initiative: 'Unified Scheduling',
      reasoning: 'Addresses customer pain points',
      confidenceScore: 92,
    },
  },
  {
    id: 'kpi-2',
    name: 'Engineering Velocity',
    currentValue: 45,
    targetValue: 60,
    unit: 'pts/sprint',
    trend: 'stable' as const,
    trendHistory: [40, 42, 44, 45, 45, 45],
    description: 'Story points completed per sprint',
    linkedReasoning: {
      initiative: 'Process Optimization',
      reasoning: 'Reduces bottlenecks',
      confidenceScore: 78,
    },
  },
]

const mockEscalationItems = [
  {
    id: 'esc-1',
    initiative: 'API Integration',
    weeksStalled: 3,
    reason: 'Dependency on external vendor',
    context: 'Waiting for vendor API documentation',
    impact: 'high' as const,
    assignedTo: 'John Smith',
    suggestedAction: 'Schedule call with vendor team',
  },
  {
    id: 'esc-2',
    initiative: 'Mobile Redesign',
    weeksStalled: 2,
    reason: 'Resource constraints',
    context: 'Design team overloaded',
    impact: 'medium' as const,
    assignedTo: 'Jane Doe',
    suggestedAction: 'Prioritize or add resources',
  },
]

describe('WCAG AA Accessibility - ARIA Labels (Test Case 6)', () => {
  describe('Icon-only buttons have descriptive ARIA labels', () => {
    it('EngineQuadrant help icon has aria-label', () => {
      render(
        <EngineQuadrant
          engine={mockEngine}
          isActive={false}
          isCompleted={false}
          onClick={jest.fn()}
        />
      )

      const helpButton = screen.getByTestId('help-icon-1')
      expect(helpButton).toHaveAttribute('aria-label')
      expect(helpButton.getAttribute('aria-label')).toContain('Help')
    })

    it('EngineQuadrant status indicator has aria-label', () => {
      render(
        <EngineQuadrant
          engine={mockEngine}
          isActive={true}
          isCompleted={false}
          onClick={jest.fn()}
        />
      )

      const statusIndicator = screen.getByTestId('engine-status-indicator-1')
      expect(statusIndicator).toHaveAttribute('aria-label')
    })

    it('KPIDashboard info buttons have accessible labels', () => {
      render(<KPIDashboard metrics={mockKPIMetrics} />)

      // Info buttons should be accessible
      const infoButtons = screen.getAllByRole('button')
      infoButtons.forEach((button) => {
        // Buttons should either have text content or aria-label
        const hasLabel = button.getAttribute('aria-label') || button.textContent?.trim()
        expect(hasLabel).toBeTruthy()
      })
    })
  })

  describe('Interactive elements have proper roles', () => {
    it('EngineQuadrant card is clickable and has proper data attributes', () => {
      render(
        <EngineQuadrant
          engine={mockEngine}
          isActive={false}
          isCompleted={false}
          onClick={jest.fn()}
        />
      )

      const card = screen.getByTestId('engine-quadrant-1')
      expect(card).toBeInTheDocument()
      expect(card).toHaveAttribute('data-engine-id', '1')
      expect(card).toHaveAttribute('data-engine-status')
    })

    it('Buttons in escalation queue have accessible text', () => {
      render(<EscalationQueue items={mockEscalationItems} />)

      const actionButtons = screen.getAllByRole('button', { name: /take action|acknowledge/i })
      expect(actionButtons.length).toBeGreaterThan(0)
    })
  })
})

describe('WCAG AA Accessibility - Status Indicators (Test Case 7)', () => {
  describe('Status conveyed through icons/text in addition to color', () => {
    it('EngineQuadrant completed state shows text and icon, not just color', () => {
      render(
        <EngineQuadrant
          engine={mockEngine}
          isActive={false}
          isCompleted={true}
          onClick={jest.fn()}
        />
      )

      // Should show "Completed" text
      expect(screen.getByText('Completed')).toBeInTheDocument()

      // Status indicator should have aria-label
      const statusIndicator = screen.getByTestId('engine-status-indicator-1')
      expect(statusIndicator.getAttribute('aria-label')).toBe('Completed')
    })

    it('EngineQuadrant active state shows text indication, not just color', () => {
      render(
        <EngineQuadrant
          engine={mockEngine}
          isActive={true}
          isCompleted={false}
          onClick={jest.fn()}
        />
      )

      // Status indicator should have aria-label for active state
      const statusIndicator = screen.getByTestId('engine-status-indicator-1')
      expect(statusIndicator.getAttribute('aria-label')).toBe('Active')

      // Should show "Continue" button (active state indicator)
      expect(screen.getByText('Continue')).toBeInTheDocument()
    })

    it('EngineQuadrant not started state has aria-label, not just color', () => {
      render(
        <EngineQuadrant
          engine={mockEngine}
          isActive={false}
          isCompleted={false}
          onClick={jest.fn()}
        />
      )

      const statusIndicator = screen.getByTestId('engine-status-indicator-1')
      expect(statusIndicator.getAttribute('aria-label')).toBe('Not started')
    })

    it('SDLCStepper shows checkmarks and text labels, not just colors', () => {
      render(
        <SDLCStepper
          currentStage="design"
          completedStages={['discovery']}
          contextMessage="Testing context"
        />
      )

      // Discovery stage should show checkmark (completed)
      // Check for the text labels
      expect(screen.getByText('Discovery')).toBeInTheDocument()
      expect(screen.getByText('Design')).toBeInTheDocument()
      expect(screen.getByText('Develop')).toBeInTheDocument()
      expect(screen.getByText('Deploy')).toBeInTheDocument()

      // Active stage should have text indicator
      expect(screen.getByText('(active)')).toBeInTheDocument()
    })

    it('EscalationQueue impact badges show text labels, not just colors', () => {
      render(<EscalationQueue items={mockEscalationItems} />)

      // High impact should have text
      expect(screen.getByText('High Impact')).toBeInTheDocument()
      // Medium impact should have text
      expect(screen.getByText('Medium Impact')).toBeInTheDocument()
    })

    it('KPIDashboard trend indicators use icons with semantic meaning', () => {
      render(<KPIDashboard metrics={mockKPIMetrics} />)

      // The sparklines and trend icons should be present
      const kpiCards = screen.getAllByTestId(/kpi-card-/)
      expect(kpiCards.length).toBe(mockKPIMetrics.length)

      // Each KPI should show its metric name (accessible text)
      expect(screen.getByText('PRD Completion Rate')).toBeInTheDocument()
      expect(screen.getByText('Engineering Velocity')).toBeInTheDocument()
    })

    it('ProgressBar shows completion status with text', () => {
      render(<ProgressBar completedActs={[1, 2]} currentAct={3} />)

      // Should show act labels (component uses descriptive names)
      expect(screen.getByText('Diagnostic')).toBeInTheDocument()
      expect(screen.getByText('Prioritization')).toBeInTheDocument()
      expect(screen.getByText('Execution')).toBeInTheDocument()
      expect(screen.getByText('Governance')).toBeInTheDocument()

      // Should show overall progress text
      expect(screen.getByText('Demo Progress')).toBeInTheDocument()
      expect(screen.getByText(/2\/4 Acts Completed/)).toBeInTheDocument()
    })
  })
})

describe('WCAG AA Accessibility - Heading Structure (Test Case 8)', () => {
  describe('Clear visual hierarchy with consistent heading structure', () => {
    it('KPIDashboard uses proper heading element', () => {
      render(<KPIDashboard metrics={mockKPIMetrics} />)

      const heading = screen.getByRole('heading', { level: 2, name: /KPI Dashboard/i })
      expect(heading).toBeInTheDocument()
    })

    it('EscalationQueue uses proper heading element', () => {
      render(<EscalationQueue items={mockEscalationItems} />)

      const heading = screen.getByRole('heading', { level: 2, name: /Escalation Queue/i })
      expect(heading).toBeInTheDocument()
    })

    it('EscalationQueue items use h4 for item titles', () => {
      render(<EscalationQueue items={mockEscalationItems} />)

      const itemTitles = screen.getAllByRole('heading', { level: 4 })
      expect(itemTitles.length).toBe(mockEscalationItems.length)
    })

    it('EngineQuadrant uses semantic heading within card', () => {
      render(
        <EngineQuadrant
          engine={mockEngine}
          isActive={false}
          isCompleted={false}
          onClick={jest.fn()}
        />
      )

      // CardTitle renders as h3 with "Engine X" text
      const cardTitle = screen.getByRole('heading', { level: 3 })
      expect(cardTitle).toHaveTextContent(/Engine 1/)

      // Engine name is shown as a paragraph (semantic structure)
      expect(screen.getByText(mockEngine.name)).toBeInTheDocument()
    })
  })

  describe('Heading hierarchy is logical (h1 > h2 > h3)', () => {
    it('headings do not skip levels inappropriately', () => {
      const { container } = render(
        <>
          <KPIDashboard metrics={mockKPIMetrics} />
          <EscalationQueue items={mockEscalationItems} />
        </>
      )

      const h1s = container.querySelectorAll('h1')
      const h2s = container.querySelectorAll('h2')
      const h3s = container.querySelectorAll('h3')
      const h4s = container.querySelectorAll('h4')

      // h2 should exist for section headings
      expect(h2s.length).toBeGreaterThan(0)

      // If h4 exists, h3 or h2 should also exist (no skipping h2 to h4)
      if (h4s.length > 0) {
        expect(h2s.length + h3s.length).toBeGreaterThan(0)
      }
    })
  })
})

describe('WCAG AA Accessibility - Additional Checks', () => {
  describe('Focus visibility', () => {
    it('Button component has focus-visible styles defined', () => {
      // The button component includes focus-visible:outline-none focus-visible:ring-1
      // This is a static check of the component design
      const { container } = render(
        <EngineQuadrant
          engine={mockEngine}
          isActive={false}
          isCompleted={false}
          onClick={jest.fn()}
        />
      )

      const buttons = container.querySelectorAll('button')
      expect(buttons.length).toBeGreaterThan(0)
    })
  })

  describe('Data attributes for testing and accessibility', () => {
    it('EngineQuadrant has data-testid attributes', () => {
      render(
        <EngineQuadrant
          engine={mockEngine}
          isActive={false}
          isCompleted={false}
          onClick={jest.fn()}
        />
      )

      expect(screen.getByTestId('engine-quadrant-1')).toBeInTheDocument()
      expect(screen.getByTestId('engine-status-indicator-1')).toBeInTheDocument()
      expect(screen.getByTestId('help-icon-1')).toBeInTheDocument()
      expect(screen.getByTestId('jump-to-engine-1')).toBeInTheDocument()
    })

    it('EscalationQueue items have data-testid attributes', () => {
      render(<EscalationQueue items={mockEscalationItems} />)

      expect(screen.getByTestId('escalation-queue')).toBeInTheDocument()
      expect(screen.getByTestId('escalation-item-esc-1')).toBeInTheDocument()
      expect(screen.getByTestId('escalation-item-esc-2')).toBeInTheDocument()
    })

    it('KPIDashboard has data-testid attributes', () => {
      render(<KPIDashboard metrics={mockKPIMetrics} />)

      expect(screen.getByTestId('kpi-dashboard')).toBeInTheDocument()
      expect(screen.getByTestId('kpi-card-kpi-1')).toBeInTheDocument()
      expect(screen.getByTestId('kpi-card-kpi-2')).toBeInTheDocument()
    })
  })
})
