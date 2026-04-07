/**
 * Unit tests for Engine Quadrant component.
 * Test case 6: Verify engine status indicators
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { EngineQuadrant } from '@/components/dashboard/engine-quadrant';
import { Engine } from '@/types';

const mockEngine: Engine = {
  id: 1,
  name: 'Diagnostic',
  shortName: 'Diagnostic',
  actNumber: 1,
  status: 'active',
  description: 'Structured discovery synthesizing customer data',
  previewContent: 'Evidence synthesized, gaps identified',
};

describe('EngineQuadrant', () => {
  const defaultProps = {
    engine: mockEngine,
    isActive: false,
    isCompleted: false,
    onClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders engine information correctly', () => {
    render(<EngineQuadrant {...defaultProps} />);

    expect(screen.getByText('Engine 1')).toBeInTheDocument();
    expect(screen.getByText('Diagnostic')).toBeInTheDocument();
    expect(screen.getByText(/Structured discovery/)).toBeInTheDocument();
  });

  it('renders with correct testid', () => {
    render(<EngineQuadrant {...defaultProps} />);

    expect(screen.getByTestId('engine-quadrant-1')).toBeInTheDocument();
  });

  it('shows status indicator for not started state', () => {
    render(<EngineQuadrant {...defaultProps} isActive={false} isCompleted={false} />);

    const indicator = screen.getByTestId('engine-status-indicator-1');
    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveClass('bg-gray-300');
  });

  it('shows status indicator for active state', () => {
    render(<EngineQuadrant {...defaultProps} isActive={true} />);

    const indicator = screen.getByTestId('engine-status-indicator-1');
    expect(indicator).toHaveClass('bg-blue-500');
  });

  it('shows status indicator for completed state', () => {
    render(<EngineQuadrant {...defaultProps} isCompleted={true} />);

    const indicator = screen.getByTestId('engine-status-indicator-1');
    expect(indicator).toHaveClass('bg-green-500');
  });

  it('shows navigation availability based on state', () => {
    render(<EngineQuadrant {...defaultProps} />);

    const quadrant = screen.getByTestId('engine-quadrant-1');
    expect(quadrant).toHaveAttribute('data-engine-status', 'not_started');
  });

  it('shows active status correctly', () => {
    render(<EngineQuadrant {...defaultProps} isActive={true} />);

    const quadrant = screen.getByTestId('engine-quadrant-1');
    expect(quadrant).toHaveAttribute('data-engine-status', 'active');
  });

  it('shows completed status correctly', () => {
    render(<EngineQuadrant {...defaultProps} isCompleted={true} />);

    const quadrant = screen.getByTestId('engine-quadrant-1');
    expect(quadrant).toHaveAttribute('data-engine-status', 'completed');
  });

  it('calls onClick with engine id when clicked', () => {
    const onClick = jest.fn();
    render(<EngineQuadrant {...defaultProps} onClick={onClick} />);

    fireEvent.click(screen.getByTestId('engine-quadrant-1'));
    expect(onClick).toHaveBeenCalledWith(1);
  });

  it('shows "Start Here" button when showStartHere is true', () => {
    render(<EngineQuadrant {...defaultProps} showStartHere={true} />);

    expect(screen.getByTestId('start-here-button')).toBeInTheDocument();
    expect(screen.getByText('Start Here')).toBeInTheDocument();
  });

  it('does not show "Start Here" button when showStartHere is false', () => {
    render(<EngineQuadrant {...defaultProps} showStartHere={false} />);

    expect(screen.queryByTestId('start-here-button')).not.toBeInTheDocument();
  });

  it('shows "Jump to Engine" button for non-active, non-completed engines', () => {
    render(<EngineQuadrant {...defaultProps} />);

    expect(screen.getByTestId('jump-to-engine-1')).toBeInTheDocument();
    expect(screen.getByText(/Jump to Engine 1/)).toBeInTheDocument();
  });

  it('shows "Continue" button for active engine', () => {
    render(<EngineQuadrant {...defaultProps} isActive={true} />);

    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  it('shows "Completed" text for completed engine', () => {
    render(<EngineQuadrant {...defaultProps} isCompleted={true} />);

    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('renders help icon with correct testid', () => {
    render(<EngineQuadrant {...defaultProps} />);

    expect(screen.getByTestId('help-icon-1')).toBeInTheDocument();
  });
});
