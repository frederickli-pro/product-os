/**
 * Unit tests for Progress Bar component.
 * Test case 7: Check progress bar indicator
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from '@/components/dashboard/progress-bar';
import { ActNumber } from '@/types';

describe('ProgressBar', () => {
  const defaultProps = {
    completedActs: [] as ActNumber[],
    currentAct: 1 as ActNumber,
  };

  it('renders with correct testid', () => {
    render(<ProgressBar {...defaultProps} />);

    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
  });

  it('has correct ARIA attributes for accessibility', () => {
    render(<ProgressBar {...defaultProps} />);

    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toHaveAttribute('role', 'progressbar');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });

  it('shows 0% progress when no acts are completed', () => {
    render(<ProgressBar {...defaultProps} />);

    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
    expect(screen.getByText('0/4 Acts Completed')).toBeInTheDocument();
  });

  it('shows 25% progress when 1 act is completed', () => {
    render(<ProgressBar completedActs={[1]} currentAct={2} />);

    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '25');
    expect(screen.getByText('1/4 Acts Completed')).toBeInTheDocument();
  });

  it('shows 50% progress when 2 acts are completed', () => {
    render(<ProgressBar completedActs={[1, 2]} currentAct={3} />);

    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(screen.getByText('2/4 Acts Completed')).toBeInTheDocument();
  });

  it('shows 100% progress when all 4 acts are completed', () => {
    render(<ProgressBar completedActs={[1, 2, 3, 4]} currentAct={4} />);

    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '100');
    expect(screen.getByText('4/4 Acts Completed')).toBeInTheDocument();
  });

  it('displays all four act labels', () => {
    render(<ProgressBar {...defaultProps} />);

    expect(screen.getByText('Diagnostic')).toBeInTheDocument();
    expect(screen.getByText('Prioritization')).toBeInTheDocument();
    expect(screen.getByText('Execution')).toBeInTheDocument();
    expect(screen.getByText('Governance')).toBeInTheDocument();
  });

  it('shows progress label header', () => {
    render(<ProgressBar {...defaultProps} />);

    expect(screen.getByText('Demo Progress')).toBeInTheDocument();
  });

  it('constrains progress bar within its container to prevent horizontal overflow', () => {
    // Business behavior: The progress bar should never cause a horizontal scrollbar
    // on the landing page. The outer wrapper must clip any overflowing content.
    render(<ProgressBar {...defaultProps} />);

    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toHaveClass('overflow-hidden');
  });

  it('positions act markers using flex layout without conflicting inline left styles', () => {
    // Business behavior: Act markers (1-4) must be evenly spaced within the track
    // without extending beyond the container edges. Using flex justify-between alone
    // ensures markers stay within bounds; inline `left` positioning conflicts with
    // flex and causes overflow.
    render(<ProgressBar {...defaultProps} />);

    // Each marker number or check icon should be visible
    const markers = screen.getAllByText(/^[1-4]$/);
    expect(markers).toHaveLength(4);

    // Markers should NOT have inline `left` style (which conflicts with flex layout)
    markers.forEach((marker) => {
      const markerContainer = marker.closest('[data-testid^="act-marker-"]');
      expect(markerContainer).toBeTruthy();
      expect(markerContainer?.getAttribute('style')).toBeNull();
    });
  });
});
