'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BrandLogo } from './brand-logo';
import { getPEFirmName } from '@/lib/utils/env-config';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const peFirmName = getPEFirmName();

  return (
    <footer
      className={cn(
        'bg-vista-navy border-t border-vista-navy/10',
        className
      )}
      data-testid="vista-footer"
    >
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <BrandLogo
                inverted
                width={180}
                height={44}
                data-testid="footer-vista-logo"
              />
            </Link>
            <p className="text-vista-slate text-sm leading-relaxed max-w-md">
              Product Operating System powered by {peFirmName}.
              Transforming portfolio company product operations through
              systematic, sustainable accountability mechanisms.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">
              Engines
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/engine-1"
                  className="text-vista-slate hover:text-vista-teal text-sm transition-colors duration-200"
                >
                  Diagnostic
                </Link>
              </li>
              <li>
                <Link
                  href="/engine-2"
                  className="text-vista-slate hover:text-vista-teal text-sm transition-colors duration-200"
                >
                  Prioritization
                </Link>
              </li>
              <li>
                <Link
                  href="/engine-3"
                  className="text-vista-slate hover:text-vista-teal text-sm transition-colors duration-200"
                >
                  Execution
                </Link>
              </li>
              <li>
                <Link
                  href="/engine-4"
                  className="text-vista-slate hover:text-vista-teal text-sm transition-colors duration-200"
                >
                  Governance
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Info */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">
              Platform
            </h3>
            <ul className="space-y-3">
              <li>
                <span className="text-vista-slate text-sm">
                  Powered by Yansu/Isoform
                </span>
              </li>
              <li>
                <span className="text-vista-slate text-sm">
                  Built on Anthropic
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-vista-slate text-xs">
              &copy; {currentYear} {peFirmName}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-vista-slate text-xs">
                Product Operating System Demo
              </span>
              <span className="text-vista-teal text-xs font-medium">
                v1.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
