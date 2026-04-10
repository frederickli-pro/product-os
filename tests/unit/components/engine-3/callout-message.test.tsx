import React from 'react';
import { render, screen } from '@testing-library/react';
import { CalloutMessage } from '@/components/shared/callout-message';
import { UnifiedPlatformMessage } from '@/components/shared/unified-platform-message';
import { calloutMessages } from '@/data/mock/prd-templates';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { initial, animate, transition, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
    p: ({ children, ...props }: any) => {
      const { initial, animate, transition, ...rest } = props;
      return <p {...rest}>{children}</p>;
    },
  },
}));

describe('CalloutMessage', () => {
  it('displays the "most frameworks stop" callout message', () => {
    render(<CalloutMessage message={calloutMessages.frameworksStop} variant="highlight" />);

    expect(screen.getByTestId('callout-message')).toBeInTheDocument();
    expect(screen.getByTestId('callout-message-text')).toHaveTextContent(
      "This is where many frameworks stop and execution breaks. AI-led platforms like Yansu unlock teams."
    );
  });

  it('renders with different variants', () => {
    const { rerender } = render(<CalloutMessage message="Test message" variant="highlight" />);
    expect(screen.getByTestId('callout-message')).toBeInTheDocument();

    rerender(<CalloutMessage message="Test message" variant="warning" />);
    expect(screen.getByTestId('callout-message')).toBeInTheDocument();

    rerender(<CalloutMessage message="Test message" variant="quote" />);
    expect(screen.getByTestId('callout-message')).toBeInTheDocument();
  });
});

describe('UnifiedPlatformMessage', () => {
  it('displays the unified platform message', () => {
    render(<UnifiedPlatformMessage message={calloutMessages.unifiedPlatform} />);

    expect(screen.getByTestId('unified-platform-message')).toBeInTheDocument();
    expect(screen.getByTestId('unified-platform-message-text')).toHaveTextContent(
      "No handoffs. No lost context. No 'wait, why did we decide this?'"
    );
  });
});
