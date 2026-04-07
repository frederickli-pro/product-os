/**
 * Unit tests for Vista logo placement in header.
 * Test case 2: Check Vista logo in header - Vista logo displayed in top-left position
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/layout/header';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement> & { 'data-testid'?: string }) => {
    const { src, alt, width, height, priority, ...rest } = props;
    return (
      <img
        src={src as string}
        alt={alt}
        width={width}
        height={height}
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

describe('Header Vista Logo Placement', () => {
  it('renders Vista logo in header', () => {
    render(<Header />);

    const logo = screen.getByTestId('header-vista-logo');
    expect(logo).toBeInTheDocument();
  });

  it('displays Vista logo as first element (top-left position)', () => {
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

  it('Vista logo has correct alt text', () => {
    render(<Header />);

    const logo = screen.getByTestId('header-vista-logo');
    expect(logo).toHaveAttribute('alt', 'Vista Equity Partners');
  });

  it('Vista logo has correct source path', () => {
    render(<Header />);

    const logo = screen.getByTestId('header-vista-logo');
    expect(logo).toHaveAttribute('src', '/images/vista-logo.svg');
  });

  it('Vista logo has appropriate dimensions for header', () => {
    render(<Header />);

    const logo = screen.getByTestId('header-vista-logo');
    expect(logo).toHaveAttribute('width', '140');
    expect(logo).toHaveAttribute('height', '38');
  });

  it('header has sticky positioning for persistent branding', () => {
    render(<Header />);

    const header = screen.getByTestId('vista-header');
    expect(header).toHaveClass('sticky');
    expect(header).toHaveClass('top-0');
    expect(header).toHaveClass('z-50');
  });

  it('header has Vista brand styling', () => {
    render(<Header />);

    const header = screen.getByTestId('vista-header');
    // Check for key brand styling classes
    expect(header).toHaveClass('bg-white/95');
    expect(header).toHaveClass('backdrop-blur-md');
  });
});
