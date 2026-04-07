'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        'bg-white/95 backdrop-blur-md border-b border-vista-navy/5 sticky top-0 z-50 shadow-sm',
        className
      )}
      data-testid="vista-header"
    >
      <div className="container mx-auto px-6 h-18 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/vista-logo.svg"
            alt="Vista Equity Partners"
            width={140}
            height={38}
            className="transition-transform duration-200 group-hover:scale-[1.02]"
            data-testid="header-vista-logo"
            priority
          />
        </Link>
        <nav className="flex items-center gap-1">
          {[
            { href: '/engine-1', label: 'Diagnostic', engine: '1' },
            { href: '/engine-2', label: 'Prioritization', engine: '2' },
            { href: '/engine-3', label: 'Execution', engine: '3' },
            { href: '/engine-4', label: 'Governance', engine: '4' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-4 py-2 text-sm font-medium text-vista-navy/70 hover:text-vista-navy transition-all duration-200 rounded-lg hover:bg-vista-navy/5 group"
            >
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 flex items-center justify-center rounded-md bg-vista-navy/10 text-[10px] font-bold text-vista-navy group-hover:bg-vista-teal/20 group-hover:text-vista-teal transition-colors">
                  {item.engine}
                </span>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
