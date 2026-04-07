'use client'

/**
 * Start Here component for first-time users.
 * Owner: Scenario 7 - Guided Walkthrough Features
 *
 * Features:
 * - Prominent display for first-time users
 * - Animated attention-grabbing design
 * - Guides users to begin at Act 1
 * - Dismissable after first interaction
 */

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface StartHereProps {
  isVisible: boolean
  onStart: () => void
  onDismiss?: () => void
  position?: 'inline' | 'overlay' | 'badge'
  className?: string
}

export function StartHere({
  isVisible,
  onStart,
  onDismiss,
  position = 'badge',
  className,
}: StartHereProps) {
  if (!isVisible) return null

  if (position === 'badge') {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={cn('absolute -top-3 -right-3 z-20', className)}
          data-testid="start-here-badge"
        >
          <Button
            size="sm"
            onClick={onStart}
            className="bg-vista-green hover:bg-vista-green/90 text-white font-semibold shadow-lg gap-1.5 animate-pulse"
            data-testid="start-here-button"
          >
            <Play className="h-3.5 w-3.5" />
            Start Here
          </Button>
        </motion.div>
      </AnimatePresence>
    )
  }

  if (position === 'overlay') {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
          data-testid="start-here-overlay"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-vista-green/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-vista-green" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Welcome to the Demo</h2>
                <p className="text-sm text-muted-foreground">First time here?</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              Start with Engine 1 (Diagnostic) to see how customer data transforms
              into actionable maturity insights.
            </p>
            <div className="flex gap-3">
              {onDismiss && (
                <Button variant="outline" onClick={onDismiss} className="flex-1">
                  Explore Freely
                </Button>
              )}
              <Button
                onClick={onStart}
                className="flex-1 bg-vista-green hover:bg-vista-green/90 gap-2"
                data-testid="start-here-button"
              >
                Start Demo
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }

  // Inline position
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'p-4 bg-gradient-to-r from-vista-green/10 to-vista-teal/10 rounded-lg border border-vista-green/20',
        className
      )}
      data-testid="start-here-inline"
    >
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-vista-green flex items-center justify-center shrink-0">
          <Play className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm">Start Your Journey Here</h3>
          <p className="text-xs text-muted-foreground">
            Begin with the Diagnostic assessment
          </p>
        </div>
        <Button
          size="sm"
          onClick={onStart}
          className="bg-vista-green hover:bg-vista-green/90 gap-1"
          data-testid="start-here-button"
        >
          Begin
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </motion.div>
  )
}
