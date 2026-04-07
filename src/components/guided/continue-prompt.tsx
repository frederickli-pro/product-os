'use client'

/**
 * Continue Prompt component for guided navigation.
 * Owner: Scenario 7 - Guided Walkthrough Features
 *
 * Features:
 * - Guides users to next logical step
 * - Appears at transition points between acts
 * - Animated entrance for visibility
 * - Supports both link and callback navigation
 */

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ActNumber, EngineId } from '@/types'

export interface ContinuePromptProps {
  isVisible: boolean
  message: string
  nextLabel?: string
  nextHref?: string
  onContinue?: () => void
  variant?: 'default' | 'gradient' | 'subtle'
  nextEngine?: EngineId
  nextAct?: ActNumber
  className?: string
}

const actLabels: Record<ActNumber, string> = {
  1: 'Act 1: Diagnostic',
  2: 'Act 2: Prioritization',
  3: 'Act 3: Execution',
  4: 'Act 4: Governance',
}

const engineLabels: Record<EngineId, string> = {
  1: 'Engine 1: Diagnostic',
  2: 'Engine 2: Prioritization',
  3: 'Engine 3: Execution',
  4: 'Engine 4: Governance',
}

export function ContinuePrompt({
  isVisible,
  message,
  nextLabel = 'Continue',
  nextHref,
  onContinue,
  variant = 'gradient',
  nextEngine,
  nextAct,
  className,
}: ContinuePromptProps) {
  if (!isVisible) return null

  const getNextDescription = () => {
    if (nextEngine) return engineLabels[nextEngine]
    if (nextAct) return actLabels[nextAct]
    return null
  }

  const nextDescription = getNextDescription()

  const buttonContent = (
    <Button
      variant={variant === 'gradient' ? 'secondary' : 'default'}
      className={cn(
        'gap-2',
        variant === 'gradient' && 'bg-white text-vista-blue hover:bg-white/90'
      )}
      onClick={onContinue}
      data-testid="continue-prompt-button"
    >
      {nextLabel}
      <ArrowRight className="h-4 w-4" />
    </Button>
  )

  if (variant === 'subtle') {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'flex items-center gap-3 p-3 bg-secondary/50 rounded-lg border',
            className
          )}
          data-testid="continue-prompt"
        >
          <ChevronRight className="h-5 w-5 text-vista-blue shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
            {nextDescription && (
              <p className="text-xs text-muted-foreground">
                Next: {nextDescription}
              </p>
            )}
          </div>
          {nextHref ? (
            <Link href={nextHref}>{buttonContent}</Link>
          ) : (
            buttonContent
          )}
        </motion.div>
      </AnimatePresence>
    )
  }

  if (variant === 'default') {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'p-4 bg-card border rounded-xl shadow-sm',
            className
          )}
          data-testid="continue-prompt"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-vista-blue/10 flex items-center justify-center">
                <ChevronRight className="h-5 w-5 text-vista-blue" />
              </div>
              <div>
                <p className="font-medium">{message}</p>
                {nextDescription && (
                  <p className="text-sm text-muted-foreground">
                    {nextDescription}
                  </p>
                )}
              </div>
            </div>
            {nextHref ? (
              <Link href={nextHref}>{buttonContent}</Link>
            ) : (
              buttonContent
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    )
  }

  // Gradient variant (default)
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className={cn(
          'p-6 bg-gradient-to-r from-vista-blue to-vista-teal rounded-xl text-white shadow-lg',
          className
        )}
        data-testid="continue-prompt"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-semibold">{message}</p>
              {nextDescription && (
                <p className="text-sm text-white/80 mt-1">
                  Proceed to {nextDescription}
                </p>
              )}
            </div>
          </div>
          {nextHref ? (
            <Link href={nextHref}>{buttonContent}</Link>
          ) : (
            buttonContent
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
