'use client'

/**
 * Highlight Animation component for drawing attention to UI elements.
 * Owner: Scenario 7 - Guided Walkthrough Features
 *
 * Features:
 * - Multiple animation styles (pulse, glow, bounce, ring)
 * - Wraps any content to add attention-grabbing effects
 * - Configurable duration and delay
 * - Auto-dismiss option
 */

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export type HighlightStyle = 'pulse' | 'glow' | 'bounce' | 'ring' | 'spotlight'

export interface HighlightAnimationProps {
  children: React.ReactNode
  isActive: boolean
  style?: HighlightStyle
  color?: 'blue' | 'green' | 'yellow' | 'teal'
  duration?: number
  delay?: number
  autoDismiss?: number
  onDismiss?: () => void
  className?: string
}

const colorClasses = {
  blue: {
    ring: 'ring-vista-blue/50',
    bg: 'bg-vista-blue/10',
    shadow: 'shadow-vista-blue/30',
    border: 'border-vista-blue',
  },
  green: {
    ring: 'ring-vista-green/50',
    bg: 'bg-vista-green/10',
    shadow: 'shadow-vista-green/30',
    border: 'border-vista-green',
  },
  yellow: {
    ring: 'ring-vista-yellow/50',
    bg: 'bg-vista-yellow/10',
    shadow: 'shadow-vista-yellow/30',
    border: 'border-vista-yellow',
  },
  teal: {
    ring: 'ring-vista-teal/50',
    bg: 'bg-vista-teal/10',
    shadow: 'shadow-vista-teal/30',
    border: 'border-vista-teal',
  },
}

export function HighlightAnimation({
  children,
  isActive,
  style = 'ring',
  color = 'blue',
  duration = 2,
  delay = 0,
  autoDismiss,
  onDismiss,
  className,
}: HighlightAnimationProps) {
  const [shouldShow, setShouldShow] = useState(isActive)
  const colors = colorClasses[color]

  useEffect(() => {
    setShouldShow(isActive)
  }, [isActive])

  useEffect(() => {
    if (shouldShow && autoDismiss) {
      const timer = setTimeout(() => {
        setShouldShow(false)
        onDismiss?.()
      }, autoDismiss)
      return () => clearTimeout(timer)
    }
  }, [shouldShow, autoDismiss, onDismiss])

  if (!shouldShow) {
    return <>{children}</>
  }

  const getAnimationVariants = () => {
    switch (style) {
      case 'pulse':
        return {
          animate: {
            scale: [1, 1.02, 1],
            opacity: [1, 0.9, 1],
          },
          transition: {
            duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay,
          },
        }
      case 'bounce':
        return {
          animate: {
            y: [0, -4, 0],
          },
          transition: {
            duration: duration * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay,
          },
        }
      case 'glow':
        return {
          animate: {
            boxShadow: [
              `0 0 0 0 ${color === 'blue' ? 'rgba(0, 82, 204, 0)' : color === 'green' ? 'rgba(54, 179, 126, 0)' : color === 'yellow' ? 'rgba(255, 171, 0, 0)' : 'rgba(0, 184, 217, 0)'}`,
              `0 0 20px 8px ${color === 'blue' ? 'rgba(0, 82, 204, 0.3)' : color === 'green' ? 'rgba(54, 179, 126, 0.3)' : color === 'yellow' ? 'rgba(255, 171, 0, 0.3)' : 'rgba(0, 184, 217, 0.3)'}`,
              `0 0 0 0 ${color === 'blue' ? 'rgba(0, 82, 204, 0)' : color === 'green' ? 'rgba(54, 179, 126, 0)' : color === 'yellow' ? 'rgba(255, 171, 0, 0)' : 'rgba(0, 184, 217, 0)'}`,
            ],
          },
          transition: {
            duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay,
          },
        }
      case 'ring':
        return {
          animate: {},
          transition: { delay },
        }
      case 'spotlight':
        return {
          animate: {
            boxShadow: [
              '0 0 0 2000px rgba(0, 0, 0, 0)',
              '0 0 0 2000px rgba(0, 0, 0, 0.5)',
              '0 0 0 2000px rgba(0, 0, 0, 0.5)',
              '0 0 0 2000px rgba(0, 0, 0, 0)',
            ],
          },
          transition: {
            duration: duration * 2,
            delay,
          },
        }
      default:
        return {
          animate: {},
          transition: {},
        }
    }
  }

  const variants = getAnimationVariants()

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, ...variants.animate }}
        exit={{ opacity: 0 }}
        transition={variants.transition}
        className={cn(
          'relative',
          style === 'ring' && `ring-4 ${colors.ring} rounded-lg`,
          style === 'glow' && 'rounded-lg',
          style === 'spotlight' && 'relative z-50 rounded-lg',
          className
        )}
        data-testid="highlight-animation"
        data-highlight-style={style}
        data-highlight-active={shouldShow}
      >
        {children}
        {style === 'ring' && (
          <motion.div
            className={cn(
              'absolute inset-0 rounded-lg pointer-events-none',
              colors.bg
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{
              duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay,
            }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * Hook to manage highlight states for multiple elements
 */
export function useHighlightManager(initialHighlights: string[] = []) {
  const [activeHighlights, setActiveHighlights] = useState<Set<string>>(
    new Set(initialHighlights)
  )

  const activateHighlight = (id: string) => {
    setActiveHighlights((prev) => new Set([...Array.from(prev), id]))
  }

  const deactivateHighlight = (id: string) => {
    setActiveHighlights((prev) => {
      const next = new Set(Array.from(prev))
      next.delete(id)
      return next
    })
  }

  const isHighlightActive = (id: string) => activeHighlights.has(id)

  const clearAllHighlights = () => setActiveHighlights(new Set())

  return {
    activeHighlights,
    activateHighlight,
    deactivateHighlight,
    isHighlightActive,
    clearAllHighlights,
  }
}
