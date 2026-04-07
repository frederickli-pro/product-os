'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn('bg-white border-b sticky top-0 z-50', className)}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-vista-blue rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">V</span>
          </div>
          <span className="font-semibold text-lg text-gray-900">Product Operating System</span>
        </Link>
        <nav className="flex items-center space-x-6">
          <Link
            href="/engine-1"
            className="text-sm text-gray-600 hover:text-vista-blue transition-colors"
          >
            Diagnostic
          </Link>
          <Link
            href="/engine-2"
            className="text-sm text-gray-600 hover:text-vista-blue transition-colors"
          >
            Prioritization
          </Link>
          <Link
            href="/engine-3"
            className="text-sm text-gray-600 hover:text-vista-blue transition-colors"
          >
            Execution
          </Link>
          <Link
            href="/engine-4"
            className="text-sm text-gray-600 hover:text-vista-blue transition-colors"
          >
            Governance
          </Link>
        </nav>
      </div>
    </header>
  );
}
