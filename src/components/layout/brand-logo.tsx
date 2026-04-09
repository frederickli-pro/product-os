'use client'

/**
 * Dynamic brand logo component.
 * Renders the PE firm name from NEXT_PUBLIC_PE_FIRM_NAME env variable
 * with "Value Creation" subtext, replacing the static vista-logo.svg.
 */

import React from 'react'
import { cn } from '@/lib/utils'
import { getPEFirmName } from '@/lib/utils/env-config'

interface BrandLogoProps {
  /** Apply inverted (white) colors for dark backgrounds */
  inverted?: boolean
  /** Width of the logo area */
  width?: number
  /** Height of the logo area */
  height?: number
  /** Additional CSS classes */
  className?: string
  /** data-testid for testing */
  'data-testid'?: string
}

export function BrandLogo({
  inverted = false,
  width = 180,
  height = 48,
  className,
  'data-testid': dataTestId,
}: BrandLogoProps) {
  const firmName = getPEFirmName()

  return (
    <div
      className={cn('inline-flex items-center gap-2', className)}
      style={{ width, height }}
      data-testid={dataTestId}
    >
      {/* Geometric V-mark icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        fill="none"
        className="h-full flex-shrink-0"
        style={{ height, width: height }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={inverted ? '#FFFFFF' : '#0D2847'} />
            <stop offset="50%" stopColor={inverted ? '#E0E0E0' : '#1E3A5F'} />
            <stop offset="100%" stopColor={inverted ? '#CCCCCC' : '#2B5A8A'} />
          </linearGradient>
          <linearGradient id="brandAccent" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00B8D9" />
            <stop offset="100%" stopColor="#36B37E" />
          </linearGradient>
        </defs>
        <g transform="translate(6, 8)">
          <rect x="0" y="12" width="5" height="20" rx="1" fill="url(#brandGrad)" />
          <polygon points="10,32 18,12 26,32 22,32 18,22 14,32" fill="url(#brandGrad)" />
          <rect x="31" y="8" width="5" height="24" rx="1" fill="url(#brandGrad)" />
          <rect x="0" y="4" width="36" height="3" rx="1.5" fill="url(#brandAccent)" />
        </g>
      </svg>

      {/* Brand text */}
      <div className="flex flex-col justify-center min-w-0">
        <span
          className={cn(
            'text-base font-bold tracking-widest leading-tight uppercase truncate',
            inverted ? 'text-white' : 'text-[#0D2847]'
          )}
          style={{ fontFamily: "system-ui, -apple-system, sans-serif", letterSpacing: '0.1em' }}
        >
          {firmName}
        </span>
        <span
          className={cn(
            'text-[8px] tracking-[0.2em] uppercase leading-tight',
            inverted ? 'text-gray-300' : 'text-[#5E6C84]'
          )}
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          Value Creation
        </span>
      </div>
    </div>
  )
}

export default BrandLogo
