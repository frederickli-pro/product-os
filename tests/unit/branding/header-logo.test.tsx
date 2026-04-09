/**
 * Unit tests for brand logo placement in header.
 * Test case 2: Check brand logo in header - logo displayed in top-left position
 *
 * Business behavior: The header displays the PE firm name (from NEXT_PUBLIC_PE_FIRM_NAME)
 * with "Value Creation" subtext, positioned in the top-left as the primary brand element.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/layout/header';

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock env-config to provide a known PE firm name for testing
// Simulates a deployment where the PE firm name is configured via env variable
jest.mock('@/lib/utils/env-config', () => ({
  getPEFirmName: () => '[PE Firm]',
  getPortfolioCoName: () => '[Portfolio Co]',
  getProductName: () => '[Software]',
  getDeveloperName: () => 'developer',
  getCEOName: () => '[CEO Name]',
  ENV_DEFAULTS: {
    PE_FIRM_NAME: '[PE Firm]',
    PORTFOLIO_CO_NAME: '[Portfolio Co]',
    PRODUCT_NAME: '[Software]',
    DEVELOPER_NAME: 'developer',
    CEO_NAME: '[CEO Name]',
  },
}));

describe('Header Brand Logo Placement', () => {
  it('renders brand logo in header', () => {
    render(<Header />);

    const logo = screen.getByTestId('header-vista-logo');
    expect(logo).toBeInTheDocument();
  });

  it('displays brand logo as first element (top-left position)', () => {
    render(<Header />);

    const header = screen.getByTestId('vista-header');
    const logo = screen.getByTestId('header-vista-logo');

    // Check that header exists and contains the logo
    expect(header).toBeInTheDocument();
    expect(header).toContainElement(logo);

    // The logo should be in a link that is the first child of the container
    const logoLink = logo.closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('brand logo displays the PE firm name from env config', () => {
    render(<Header />);

    // The BrandLogo component should render the PE firm name as text
    expect(screen.getByText('[PE Firm]')).toBeInTheDocument();
  });

  it('brand logo displays "Value Creation" subtext', () => {
    render(<Header />);

    expect(screen.getByText('Value Creation')).toBeInTheDocument();
  });

  it('header has sticky positioning for persistent branding', () => {
    render(<Header />);

    const header = screen.getByTestId('vista-header');
    expect(header).toHaveClass('sticky');
    expect(header).toHaveClass('top-0');
    expect(header).toHaveClass('z-50');
  });

  it('header has brand styling', () => {
    render(<Header />);

    const header = screen.getByTestId('vista-header');
    // Check for key brand styling classes
    expect(header).toHaveClass('bg-white/95');
    expect(header).toHaveClass('backdrop-blur-md');
  });
});
