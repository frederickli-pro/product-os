'use client'

/**
 * Visual Breadcrumbs component for demo flow navigation.
 * Owner: Scenario 7 - Guided Walkthrough Features
 *
 * Features:
 * - Shows current location within four-act demo flow
 * - Clickable navigation to previous acts
 * - Visual indicators for completed/active/pending states
 */

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, Home, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ActNumber, EngineId } from '@/types'

export interface BreadcrumbItem {
  label: string
  href?: string
  isActive?: boolean
  isCompleted?: boolean
  act?: ActNumber
  engine?: EngineId
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  currentAct?: ActNumber
  completedActs?: ActNumber[]
  showHome?: boolean
  className?: string
}

const actLabels: Record<ActNumber, { label: string; sublabel: string }> = {
  1: { label: 'Act 1', sublabel: 'Diagnostic' },
  2: { label: 'Act 2', sublabel: 'Prioritization' },
  3: { label: 'Act 3', sublabel: 'Execution' },
  4: { label: 'Act 4', sublabel: 'Governance' },
}

export function Breadcrumbs({
  items,
  currentAct,
  completedActs = [],
  showHome = true,
  className,
}: BreadcrumbsProps) {
  // If items not provided, generate from currentAct
  const breadcrumbItems: BreadcrumbItem[] = items.length > 0
    ? items
    : currentAct
    ? generateActBreadcrumbs(currentAct, completedActs)
    : []

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-1 text-sm', className)}
      data-testid="breadcrumbs"
    >
      {showHome && (
        <>
          <Link
            href="/"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            data-testid="breadcrumb-home"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
          {breadcrumbItems.length > 0 && (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </>
      )}

      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1

        return (
          <React.Fragment key={item.label}>
            <BreadcrumbLink
              item={item}
              isLast={isLast}
            />
            {!isLast && (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}

function BreadcrumbLink({
  item,
  isLast,
}: {
  item: BreadcrumbItem
  isLast: boolean
}) {
  const content = (
    <span className="flex items-center gap-1.5">
      {item.isCompleted && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex items-center justify-center h-4 w-4 bg-vista-green rounded-full"
        >
          <Check className="h-3 w-3 text-white" />
        </motion.span>
      )}
      <span>{item.label}</span>
    </span>
  )

  if (isLast || !item.href) {
    return (
      <span
        className={cn(
          'flex items-center',
          item.isActive
            ? 'font-semibold text-vista-blue'
            : item.isCompleted
            ? 'text-muted-foreground'
            : 'text-muted-foreground'
        )}
        aria-current={isLast ? 'page' : undefined}
        data-testid={`breadcrumb-${item.act || item.label.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {content}
      </span>
    )
  }

  return (
    <Link
      href={item.href}
      className={cn(
        'flex items-center hover:text-vista-blue transition-colors',
        item.isCompleted ? 'text-muted-foreground' : 'text-foreground'
      )}
      data-testid={`breadcrumb-${item.act || item.label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {content}
    </Link>
  )
}

function generateActBreadcrumbs(
  currentAct: ActNumber,
  completedActs: ActNumber[]
): BreadcrumbItem[] {
  const acts: ActNumber[] = [1, 2, 3, 4]

  return acts
    .filter((act) => act <= currentAct || completedActs.includes(act))
    .map((act) => ({
      label: `${actLabels[act].label}: ${actLabels[act].sublabel}`,
      href: `/engine-${act}`,
      isActive: act === currentAct,
      isCompleted: completedActs.includes(act),
      act,
      engine: act as EngineId,
    }))
}

/**
 * Compact breadcrumbs for smaller spaces
 */
export function CompactBreadcrumbs({
  currentAct,
  completedActs = [],
  className,
}: {
  currentAct: ActNumber
  completedActs?: ActNumber[]
  className?: string
}) {
  const acts: ActNumber[] = [1, 2, 3, 4]

  return (
    <div
      className={cn('flex items-center gap-2', className)}
      data-testid="compact-breadcrumbs"
      role="navigation"
      aria-label="Demo progress"
    >
      {acts.map((act) => {
        const isCompleted = completedActs.includes(act)
        const isActive = act === currentAct
        const isPending = !isCompleted && !isActive

        return (
          <React.Fragment key={act}>
            <Link
              href={`/engine-${act}`}
              className={cn(
                'flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-colors',
                isActive && 'bg-vista-blue text-white',
                isCompleted && 'bg-vista-green/10 text-vista-green',
                isPending && 'bg-gray-100 text-gray-400'
              )}
              aria-current={isActive ? 'step' : undefined}
              data-testid={`compact-breadcrumb-act-${act}`}
            >
              {isCompleted && <Check className="h-3 w-3" />}
              <span>Act {act}</span>
            </Link>
            {act < 4 && (
              <div
                className={cn(
                  'w-4 h-0.5 rounded',
                  completedActs.includes(act) ? 'bg-vista-green' : 'bg-gray-200'
                )}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
