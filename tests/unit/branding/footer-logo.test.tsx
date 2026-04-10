/**
 * Unit tests for brand logo placement in footer.
 * Test case 3: Check brand logo in footer - logo displayed in footer section
 *
 * Business behavior: The footer displays the PE firm name (from NEXT_PUBLIC_PE_FIRM_NAME)
 * in inverted colors, along with copyright text referencing the firm name dynamically.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/layout/footer';

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

describe('Footer Brand Logo Placement', () => {
  it('renders brand logo in footer', () => {
    render(<Footer />);

    const logo = screen.getByTestId('footer-vista-logo');
    expect(logo).toBeInTheDocument();
  });

  it('displays brand logo in footer section', () => {
    render(<Footer />);

    const footer = screen.getByTestId('vista-footer');
    const logo = screen.getByTestId('footer-vista-logo');

    // Check that footer exists and contains the logo
    expect(footer).toBeInTheDocument();
    expect(footer).toContainElement(logo);
  });

  it('brand logo is linked to home page', () => {
    render(<Footer />);

    const logo = screen.getByTestId('footer-vista-logo');
    const logoLink = logo.closest('a');

    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('footer has navy background for brand consistency', () => {
    render(<Footer />);

    const footer = screen.getByTestId('vista-footer');
    expect(footer).toHaveClass('bg-vista-navy');
  });

  it('footer displays copyright with PE firm name from env config', () => {
    render(<Footer />);

    // The copyright text should use the PE firm name from env config
    const copyrightText = screen.getByText(/\[PE Firm\]\. All rights reserved/);
    expect(copyrightText).toBeInTheDocument();
    expect(copyrightText.textContent).toContain('©');
  });

  it('footer displays current year in copyright', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear().toString();
    const copyrightText = screen.getByText(new RegExp(currentYear));
    expect(copyrightText).toBeInTheDocument();
  });

  it('footer description references PE firm name dynamically', () => {
    render(<Footer />);

    // The description should use the env-configured PE firm name, not hardcoded "Vista"
    expect(screen.getByText(/Product AI Operating System powered by \[PE Firm\]/)).toBeInTheDocument();
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
