/**
 * Unit Tests for Breadcrumbs Component
 * Owner: Scenario 7 - Guided Walkthrough Features
 *
 * Test case 8: Breadcrumbs show current location within four-act demo flow
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { Breadcrumbs, CompactBreadcrumbs, BreadcrumbItem } from '@/components/guided/breadcrumbs'

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
    return <a href={href} {...props}>{children}</a>
  }
})

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    span: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
      <span {...props}>{children}</span>
    ),
  },
}))

describe('Breadcrumbs Component', () => {
  describe('Basic Rendering', () => {
    it('renders breadcrumbs with provided items', () => {
      const items: BreadcrumbItem[] = [
        { label: 'Home', href: '/' },
        { label: 'Act 1: Diagnostic', href: '/engine-1', act: 1 },
      ]

      render(<Breadcrumbs items={items} />)

      expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument()
      expect(screen.getByText('Act 1: Diagnostic')).toBeInTheDocument()
    })

    it('renders home link when showHome is true', () => {
      const items: BreadcrumbItem[] = [
        { label: 'Act 1: Diagnostic', href: '/engine-1', act: 1 },
      ]

      render(<Breadcrumbs items={items} showHome={true} />)

      expect(screen.getByTestId('breadcrumb-home')).toBeInTheDocument()
    })

    it('hides home link when showHome is false', () => {
      const items: BreadcrumbItem[] = [
        { label: 'Act 1: Diagnostic', href: '/engine-1', act: 1 },
      ]

      render(<Breadcrumbs items={items} showHome={false} />)

      expect(screen.queryByTestId('breadcrumb-home')).not.toBeInTheDocument()
    })
  })

  describe('Act-based Breadcrumbs', () => {
    it('generates breadcrumbs from currentAct', () => {
      render(<Breadcrumbs items={[]} currentAct={2} completedActs={[1]} />)

      expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument()
    })

    it('shows completed acts with checkmark', () => {
      const items: BreadcrumbItem[] = [
        { label: 'Act 1: Diagnostic', href: '/engine-1', act: 1, isCompleted: true },
        { label: 'Act 2: Prioritization', href: '/engine-2', act: 2, isActive: true },
      ]

      render(<Breadcrumbs items={items} />)

      // The completed act should be visible
      expect(screen.getByText('Act 1: Diagnostic')).toBeInTheDocument()
      expect(screen.getByText('Act 2: Prioritization')).toBeInTheDocument()
    })

    it('highlights active act', () => {
      const items: BreadcrumbItem[] = [
        { label: 'Act 1: Diagnostic', href: '/engine-1', act: 1, isCompleted: true },
        { label: 'Act 2: Prioritization', href: '/engine-2', act: 2, isActive: true },
      ]

      render(<Breadcrumbs items={items} />)

      const activeBreadcrumb = screen.getByTestId('breadcrumb-2')
      expect(activeBreadcrumb).toHaveClass('font-semibold')
    })
  })

  describe('Navigation Links', () => {
    it('renders navigation links for non-active items', () => {
      const items: BreadcrumbItem[] = [
        { label: 'Act 1: Diagnostic', href: '/engine-1', act: 1, isCompleted: true },
        { label: 'Act 2: Prioritization', href: '/engine-2', act: 2, isActive: true },
      ]

      render(<Breadcrumbs items={items} />)

      const link = screen.getByText('Act 1: Diagnostic').closest('a')
      expect(link).toHaveAttribute('href', '/engine-1')
    })

    it('renders span instead of link for active item', () => {
      const items: BreadcrumbItem[] = [
        { label: 'Act 2: Prioritization', href: '/engine-2', act: 2, isActive: true },
      ]

      render(<Breadcrumbs items={items} showHome={false} />)

      const activeItem = screen.getByText('Act 2: Prioritization')
      const parentElement = activeItem.closest('a')
      // Active item should not be wrapped in a link
      expect(parentElement).toBeNull()
    })
  })

  describe('Accessibility', () => {
    it('has proper aria-label for navigation', () => {
      const items: BreadcrumbItem[] = [
        { label: 'Act 1: Diagnostic', href: '/engine-1', act: 1 },
      ]

      render(<Breadcrumbs items={items} />)

      const nav = screen.getByRole('navigation')
      expect(nav).toHaveAttribute('aria-label', 'Breadcrumb')
    })

    it('marks current page with aria-current', () => {
      const items: BreadcrumbItem[] = [
        { label: 'Act 1: Diagnostic', href: '/engine-1', act: 1, isCompleted: true },
        { label: 'Act 2: Prioritization', act: 2, isActive: true },
      ]

      render(<Breadcrumbs items={items} />)

      const currentItem = screen.getByTestId('breadcrumb-2')
      expect(currentItem).toHaveAttribute('aria-current', 'page')
    })
  })
})

describe('CompactBreadcrumbs Component', () => {
  it('renders all four acts', () => {
    render(<CompactBreadcrumbs currentAct={2} completedActs={[1]} />)

    expect(screen.getByTestId('compact-breadcrumbs')).toBeInTheDocument()
    expect(screen.getByText('Act 1')).toBeInTheDocument()
    expect(screen.getByText('Act 2')).toBeInTheDocument()
    expect(screen.getByText('Act 3')).toBeInTheDocument()
    expect(screen.getByText('Act 4')).toBeInTheDocument()
  })

  it('highlights current act with proper styling', () => {
    render(<CompactBreadcrumbs currentAct={2} completedActs={[1]} />)

    const act2 = screen.getByTestId('compact-breadcrumb-act-2')
    expect(act2).toHaveClass('bg-vista-blue')
  })

  it('shows completed acts with green styling', () => {
    render(<CompactBreadcrumbs currentAct={2} completedActs={[1]} />)

    const act1 = screen.getByTestId('compact-breadcrumb-act-1')
    expect(act1).toHaveClass('bg-vista-green/10')
  })

  it('shows pending acts with gray styling', () => {
    render(<CompactBreadcrumbs currentAct={2} completedActs={[1]} />)

    const act3 = screen.getByTestId('compact-breadcrumb-act-3')
    expect(act3).toHaveClass('bg-gray-100')
  })

  it('has navigation links for all acts', () => {
    render(<CompactBreadcrumbs currentAct={2} completedActs={[1]} />)

    const act1Link = screen.getByTestId('compact-breadcrumb-act-1')
    expect(act1Link).toHaveAttribute('href', '/engine-1')

    const act3Link = screen.getByTestId('compact-breadcrumb-act-3')
    expect(act3Link).toHaveAttribute('href', '/engine-3')
  })

  it('marks current step with aria-current', () => {
    render(<CompactBreadcrumbs currentAct={3} completedActs={[1, 2]} />)

    const act3 = screen.getByTestId('compact-breadcrumb-act-3')
    expect(act3).toHaveAttribute('aria-current', 'step')
  })

  it('has proper role for navigation', () => {
    render(<CompactBreadcrumbs currentAct={2} completedActs={[1]} />)

    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'Demo progress')
  })
})

describe('Breadcrumbs - Four Act Demo Flow', () => {
  it('TC8: shows current location within four-act demo flow', () => {
    // Test at Act 1
    const { rerender } = render(
      <CompactBreadcrumbs currentAct={1} completedActs={[]} />
    )

    let act1 = screen.getByTestId('compact-breadcrumb-act-1')
    expect(act1).toHaveClass('bg-vista-blue') // Active

    // Test at Act 2 with Act 1 completed
    rerender(<CompactBreadcrumbs currentAct={2} completedActs={[1]} />)

    act1 = screen.getByTestId('compact-breadcrumb-act-1')
    const act2 = screen.getByTestId('compact-breadcrumb-act-2')
    expect(act1).toHaveClass('bg-vista-green/10') // Completed
    expect(act2).toHaveClass('bg-vista-blue') // Active

    // Test at Act 3 with Acts 1-2 completed
    rerender(<CompactBreadcrumbs currentAct={3} completedActs={[1, 2]} />)

    const act3 = screen.getByTestId('compact-breadcrumb-act-3')
    expect(act3).toHaveClass('bg-vista-blue') // Active

    // Test at Act 4 with Acts 1-3 completed
    rerender(<CompactBreadcrumbs currentAct={4} completedActs={[1, 2, 3]} />)

    const act4 = screen.getByTestId('compact-breadcrumb-act-4')
    expect(act4).toHaveClass('bg-vista-blue') // Active
  })

  it('correctly displays progress through entire demo journey', () => {
    render(<CompactBreadcrumbs currentAct={3} completedActs={[1, 2]} />)

    // Verify all acts are visible
    expect(screen.getByText('Act 1')).toBeInTheDocument()
    expect(screen.getByText('Act 2')).toBeInTheDocument()
    expect(screen.getByText('Act 3')).toBeInTheDocument()
    expect(screen.getByText('Act 4')).toBeInTheDocument()

    // Verify correct states
    const act1 = screen.getByTestId('compact-breadcrumb-act-1')
    const act2 = screen.getByTestId('compact-breadcrumb-act-2')
    const act3 = screen.getByTestId('compact-breadcrumb-act-3')
    const act4 = screen.getByTestId('compact-breadcrumb-act-4')

    // Acts 1-2 should be completed (green)
    expect(act1).toHaveClass('bg-vista-green/10')
    expect(act2).toHaveClass('bg-vista-green/10')

    // Act 3 should be active (blue)
    expect(act3).toHaveClass('bg-vista-blue')

    // Act 4 should be pending (gray)
    expect(act4).toHaveClass('bg-gray-100')
  })
})
