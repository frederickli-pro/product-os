/**
 * Unit tests for TransformationAnimation component.
 * Owner: Scenario 10 - Interactive Animations and Transitions
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  TransformationAnimation,
  TransformationTrigger,
} from '@/components/engine-3/transformation-animation';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const {
        initial,
        animate,
        transition,
        exit,
        whileHover,
        whileTap,
        variants,
        custom,
        ...rest
      } = props;
      return <div {...rest}>{children}</div>;
    },
    button: ({ children, ...props }: any) => {
      const {
        initial,
        animate,
        transition,
        exit,
        whileHover,
        whileTap,
        variants,
        ...rest
      } = props;
      return <button {...rest}>{children}</button>;
    },
    h3: ({ children, ...props }: any) => {
      const { initial, animate, exit, ...rest } = props;
      return <h3 {...rest}>{children}</h3>;
    },
    circle: (props: any) => <circle {...props} />,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useReducedMotion: () => false,
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  FileText: () => <svg data-testid="file-text-icon" />,
  Layers: () => <svg data-testid="layers-icon" />,
  Sparkles: () => <svg data-testid="sparkles-icon" />,
  Zap: () => <svg data-testid="zap-icon" />,
  CheckCircle2: () => <svg data-testid="check-circle-icon" />,
}));

describe('TransformationAnimation', () => {
  const mockSourceItem = {
    id: 'test-item-001',
    name: 'Test Roadmap Item',
    description: 'A test item for transformation',
    confidenceScore: 87,
    priority: 1,
  };

  const mockOnComplete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('Rendering', () => {
    it('renders the transformation animation container', () => {
      render(
        <TransformationAnimation
          sourceItem={mockSourceItem}
          targetType="prd"
          isAnimating={false}
        />
      );

      expect(screen.getByTestId('transformation-animation')).toBeInTheDocument();
    });

    it('displays source item preview', () => {
      render(
        <TransformationAnimation
          sourceItem={mockSourceItem}
          targetType="prd"
          isAnimating={false}
        />
      );

      expect(screen.getByTestId('source-preview')).toBeInTheDocument();
      expect(screen.getByText('Test Roadmap Item')).toBeInTheDocument();
    });

    it('displays confidence score when provided', () => {
      render(
        <TransformationAnimation
          sourceItem={mockSourceItem}
          targetType="prd"
          isAnimating={false}
        />
      );

      expect(screen.getByText('87%')).toBeInTheDocument();
      expect(screen.getByText('confidence')).toBeInTheDocument();
    });

    it('displays priority badge', () => {
      render(
        <TransformationAnimation
          sourceItem={mockSourceItem}
          targetType="prd"
          isAnimating={false}
        />
      );

      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });

  describe('Animation States', () => {
    it('shows idle state when not animating', () => {
      render(
        <TransformationAnimation
          sourceItem={mockSourceItem}
          targetType="prd"
          isAnimating={false}
        />
      );

      expect(screen.getByTestId('transformation-animation')).toHaveAttribute(
        'data-animating',
        'false'
      );
      expect(screen.getByTestId('transformation-animation')).toHaveAttribute(
        'data-phase',
        'idle'
      );
    });

    it('shows transforming state when animating', () => {
      render(
        <TransformationAnimation
          sourceItem={mockSourceItem}
          targetType="prd"
          isAnimating={true}
        />
      );

      expect(screen.getByTestId('transformation-animation')).toHaveAttribute(
        'data-animating',
        'true'
      );
    });

    it('displays morphing icon during animation', () => {
      render(
        <TransformationAnimation
          sourceItem={mockSourceItem}
          targetType="prd"
          isAnimating={true}
        />
      );

      expect(screen.getByTestId('morphing-icon')).toBeInTheDocument();
    });

    it('displays progress ring during animation', () => {
      render(
        <TransformationAnimation
          sourceItem={mockSourceItem}
          targetType="prd"
          isAnimating={true}
        />
      );

      expect(screen.getByTestId('progress-ring')).toBeInTheDocument();
    });

    it('displays animation status text', () => {
      render(
        <TransformationAnimation
          sourceItem={mockSourceItem}
          targetType="prd"
          isAnimating={true}
        />
      );

      expect(screen.getByTestId('animation-status')).toBeInTheDocument();
    });
  });

  describe('Target Type Display', () => {
    it('displays PRD-specific messaging for prd target type', () => {
      render(
        <TransformationAnimation
          sourceItem={mockSourceItem}
          targetType="prd"
          isAnimating={false}
        />
      );

      expect(
        screen.getByText(/transform into a structured PRD/i)
      ).toBeInTheDocument();
    });

    it('displays Epic-specific messaging for epic target type', () => {
      render(
        <TransformationAnimation
          sourceItem={mockSourceItem}
          targetType="epic"
          isAnimating={false}
        />
      );

      expect(
        screen.getByText(/transform into epic\/story structure/i)
      ).toBeInTheDocument();
    });
  });

  describe('Completion Callback', () => {
    it('accepts onComplete callback prop', () => {
      const onComplete = jest.fn();

      render(
        <TransformationAnimation
          sourceItem={mockSourceItem}
          targetType="prd"
          isAnimating={false}
          onComplete={onComplete}
          duration={100}
        />
      );

      // Verify component renders with callback prop
      expect(screen.getByTestId('transformation-animation')).toBeInTheDocument();
    });
  });

  describe('Custom Duration', () => {
    it('accepts custom duration prop', () => {
      render(
        <TransformationAnimation
          sourceItem={mockSourceItem}
          targetType="prd"
          isAnimating={true}
          duration={2000}
        />
      );

      // Component should render with custom duration
      expect(screen.getByTestId('transformation-animation')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has appropriate data-testid attributes for testing', () => {
      render(
        <TransformationAnimation
          sourceItem={mockSourceItem}
          targetType="prd"
          isAnimating={true}
        />
      );

      expect(screen.getByTestId('transformation-animation')).toBeInTheDocument();
      expect(screen.getByTestId('animation-center')).toBeInTheDocument();
      expect(screen.getByTestId('morphing-icon')).toBeInTheDocument();
      expect(screen.getByTestId('animation-status')).toBeInTheDocument();
      expect(screen.getByTestId('source-preview')).toBeInTheDocument();
    });
  });
});

describe('TransformationTrigger', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with label', () => {
    render(
      <TransformationTrigger
        label="Generate PRD"
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText('Generate PRD')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();

    render(
      <TransformationTrigger
        label="Generate PRD"
        onClick={mockOnClick}
      />
    );

    await user.click(screen.getByTestId('transformation-trigger'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state when isLoading is true', () => {
    render(
      <TransformationTrigger
        label="Generating..."
        onClick={mockOnClick}
        isLoading={true}
      />
    );

    expect(screen.getByTestId('transformation-trigger')).toBeDisabled();
  });

  it('is not disabled when not loading', () => {
    render(
      <TransformationTrigger
        label="Generate PRD"
        onClick={mockOnClick}
        isLoading={false}
      />
    );

    expect(screen.getByTestId('transformation-trigger')).not.toBeDisabled();
  });

  it('renders sparkles icons', () => {
    render(
      <TransformationTrigger
        label="Generate PRD"
        onClick={mockOnClick}
      />
    );

    const sparklesIcons = screen.getAllByTestId('sparkles-icon');
    expect(sparklesIcons.length).toBeGreaterThanOrEqual(1);
  });

  it('applies custom className', () => {
    render(
      <TransformationTrigger
        label="Generate PRD"
        onClick={mockOnClick}
        className="custom-class"
      />
    );

    expect(screen.getByTestId('transformation-trigger')).toHaveClass('custom-class');
  });
});
