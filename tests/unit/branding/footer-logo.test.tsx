/**
 * Unit tests for Vista logo placement in footer.
 * Test case 3: Check Vista logo in footer - Vista logo displayed in footer section
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/layout/footer';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement> & { 'data-testid'?: string; priority?: boolean }) => {
    const { src, alt, width, height, priority, className, ...rest } = props;
    return (
      <img
        src={src as string}
        alt={alt}
        width={width}
        height={height}
        className={className}
        {...rest}
      />
    );
  },
}));

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('Footer Vista Logo Placement', () => {
  it('renders Vista logo in footer', () => {
    render(<Footer />);

    const logo = screen.getByTestId('footer-vista-logo');
    expect(logo).toBeInTheDocument();
  });

  it('displays Vista logo in footer section', () => {
    render(<Footer />);

    const footer = screen.getByTestId('vista-footer');
    const logo = screen.getByTestId('footer-vista-logo');

    // Check that footer exists and contains the logo
    expect(footer).toBeInTheDocument();
    expect(footer).toContainElement(logo);
  });

  it('Vista logo has correct alt text', () => {
    render(<Footer />);

    const logo = screen.getByTestId('footer-vista-logo');
    expect(logo).toHaveAttribute('alt', 'Vista Equity Partners');
  });

  it('Vista logo has correct source path', () => {
    render(<Footer />);

    const logo = screen.getByTestId('footer-vista-logo');
    expect(logo).toHaveAttribute('src', '/images/vista-logo.svg');
  });

  it('Vista logo is linked to home page', () => {
    render(<Footer />);

    const logo = screen.getByTestId('footer-vista-logo');
    const logoLink = logo.closest('a');

    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('footer has Vista navy background for brand consistency', () => {
    render(<Footer />);

    const footer = screen.getByTestId('vista-footer');
    expect(footer).toHaveClass('bg-vista-navy');
  });

  it('footer displays copyright with Vista Equity Partners', () => {
    render(<Footer />);

    // Multiple elements mention Vista Equity Partners (description + copyright)
    const vistaTexts = screen.getAllByText(/Vista Equity Partners/);
    expect(vistaTexts.length).toBeGreaterThan(0);
    // Check that at least one includes copyright symbol
    const hasCopyright = vistaTexts.some(el => el.textContent?.includes('©'));
    expect(hasCopyright).toBe(true);
  });

  it('footer displays current year in copyright', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear().toString();
    const copyrightText = screen.getByText(new RegExp(currentYear));
    expect(copyrightText).toBeInTheDocument();
  });

  it('footer contains engine navigation links', () => {
    render(<Footer />);

    expect(screen.getByText('Diagnostic')).toBeInTheDocument();
    expect(screen.getByText('Prioritization')).toBeInTheDocument();
    expect(screen.getByText('Execution')).toBeInTheDocument();
    expect(screen.getByText('Governance')).toBeInTheDocument();
  });

  it('footer displays platform information', () => {
    render(<Footer />);

    expect(screen.getByText('Powered by Yansu/Isoform')).toBeInTheDocument();
    expect(screen.getByText('Built on Anthropic')).toBeInTheDocument();
  });
});
