'use client'

/**
 * Tour Mode component for step-by-step guided walkthrough.
 * Owner: Scenario 7 - Guided Walkthrough Features
 *
 * Features:
 * - Sequential walkthrough of key features
 * - Step highlighting with tooltips
 * - Progress indicator
 * - Skip/next/back controls
 * - Keyboard navigation support
 */

import React, { useState, useEffect, useCallback, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, SkipForward, Play, Circle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface TourStep {
  id: string
  targetSelector: string
  title: string
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  highlightPadding?: number
  action?: () => void
}

export interface TourModeProps {
  steps: TourStep[]
  isActive: boolean
  onComplete: () => void
  onStepChange?: (stepIndex: number) => void
  onSkip?: () => void
  startAtStep?: number
}

interface TourContextType {
  isActive: boolean
  currentStep: number
  totalSteps: number
  startTour: () => void
  endTour: () => void
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
}

const TourContext = createContext<TourContextType | undefined>(undefined)

export function useTourMode() {
  const context = useContext(TourContext)
  if (!context) {
    throw new Error('useTourMode must be used within a TourProvider')
  }
  return context
}

export function TourProvider({
  children,
  steps,
  onComplete,
  onStepChange,
}: {
  children: React.ReactNode
  steps: TourStep[]
  onComplete?: () => void
  onStepChange?: (step: number) => void
}) {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const startTour = useCallback(() => {
    setIsActive(true)
    setCurrentStep(0)
    onStepChange?.(0)
  }, [onStepChange])

  const endTour = useCallback(() => {
    setIsActive(false)
    onComplete?.()
  }, [onComplete])

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      const next = currentStep + 1
      setCurrentStep(next)
      onStepChange?.(next)
      steps[next]?.action?.()
    } else {
      endTour()
    }
  }, [currentStep, steps, endTour, onStepChange])

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      const prev = currentStep - 1
      setCurrentStep(prev)
      onStepChange?.(prev)
    }
  }, [currentStep, onStepChange])

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < steps.length) {
        setCurrentStep(step)
        onStepChange?.(step)
        steps[step]?.action?.()
      }
    },
    [steps, onStepChange]
  )

  return (
    <TourContext.Provider
      value={{
        isActive,
        currentStep,
        totalSteps: steps.length,
        startTour,
        endTour,
        nextStep,
        prevStep,
        goToStep,
      }}
    >
      {children}
    </TourContext.Provider>
  )
}

export function TourMode({
  steps,
  isActive,
  onComplete,
  onStepChange,
  onSkip,
  startAtStep = 0,
}: TourModeProps) {
  const [currentStep, setCurrentStep] = useState(startAtStep)
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)

  const step = steps[currentStep]

  // Find and highlight target element
  useEffect(() => {
    if (!isActive || !step?.targetSelector) {
      setTargetRect(null)
      return
    }

    const updateTargetRect = () => {
      const target = document.querySelector(step.targetSelector)
      if (target) {
        setTargetRect(target.getBoundingClientRect())
        // Scroll target into view
        target.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }

    updateTargetRect()
    window.addEventListener('resize', updateTargetRect)
    window.addEventListener('scroll', updateTargetRect)

    return () => {
      window.removeEventListener('resize', updateTargetRect)
      window.removeEventListener('scroll', updateTargetRect)
    }
  }, [isActive, step])

  // Keyboard navigation
  useEffect(() => {
    if (!isActive) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'Enter':
          handleNext()
          break
        case 'ArrowLeft':
          handlePrev()
          break
        case 'Escape':
          handleSkip()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isActive, currentStep])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextIdx = currentStep + 1
      setCurrentStep(nextIdx)
      onStepChange?.(nextIdx)
      steps[nextIdx]?.action?.()
    } else {
      onComplete()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      const prevIdx = currentStep - 1
      setCurrentStep(prevIdx)
      onStepChange?.(prevIdx)
    }
  }

  const handleSkip = () => {
    onSkip?.()
    onComplete()
  }

  const getTooltipPosition = () => {
    if (!targetRect) return { top: '50%', left: '50%' }

    const padding = step?.highlightPadding || 8
    const position = step?.position || 'bottom'
    const tooltipWidth = 320
    const tooltipHeight = 160

    switch (position) {
      case 'top':
        return {
          top: targetRect.top - tooltipHeight - padding - 10,
          left: targetRect.left + targetRect.width / 2 - tooltipWidth / 2,
        }
      case 'bottom':
        return {
          top: targetRect.bottom + padding + 10,
          left: targetRect.left + targetRect.width / 2 - tooltipWidth / 2,
        }
      case 'left':
        return {
          top: targetRect.top + targetRect.height / 2 - tooltipHeight / 2,
          left: targetRect.left - tooltipWidth - padding - 10,
        }
      case 'right':
        return {
          top: targetRect.top + targetRect.height / 2 - tooltipHeight / 2,
          left: targetRect.right + padding + 10,
        }
      case 'center':
        return {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }
      default:
        return {
          top: targetRect.bottom + padding + 10,
          left: targetRect.left + targetRect.width / 2 - tooltipWidth / 2,
        }
    }
  }

  if (!isActive) return null

  const tooltipStyle = getTooltipPosition()
  const padding = step?.highlightPadding || 8

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100]" data-testid="tour-mode-overlay">
        {/* Backdrop with cutout for target element */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: 'none' }}
        >
          <defs>
            <mask id="tour-mask">
              <rect width="100%" height="100%" fill="white" />
              {targetRect && (
                <rect
                  x={targetRect.left - padding}
                  y={targetRect.top - padding}
                  width={targetRect.width + padding * 2}
                  height={targetRect.height + padding * 2}
                  rx="8"
                  fill="black"
                />
              )}
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="rgba(0, 0, 0, 0.5)"
            mask="url(#tour-mask)"
            style={{ pointerEvents: 'all' }}
            onClick={(e) => e.stopPropagation()}
          />
        </svg>

        {/* Highlight ring around target */}
        {targetRect && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute pointer-events-none"
            style={{
              top: targetRect.top - padding,
              left: targetRect.left - padding,
              width: targetRect.width + padding * 2,
              height: targetRect.height + padding * 2,
            }}
            data-testid="tour-highlight"
          >
            <div className="w-full h-full rounded-lg ring-4 ring-vista-blue ring-offset-2 ring-offset-white" />
          </motion.div>
        )}

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute bg-white rounded-xl shadow-2xl w-80 overflow-hidden"
          style={tooltipStyle as React.CSSProperties}
          data-testid="tour-tooltip"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-vista-blue to-vista-teal p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium opacity-80">
                Step {currentStep + 1} of {steps.length}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-white hover:bg-white/20"
                onClick={handleSkip}
                aria-label="Close tour"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <h3 className="font-semibold text-lg">{step?.title}</h3>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-sm text-muted-foreground">{step?.content}</p>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-1.5 pb-3">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentStep(idx)
                  onStepChange?.(idx)
                }}
                className="p-0.5"
                aria-label={`Go to step ${idx + 1}`}
              >
                {idx < currentStep ? (
                  <CheckCircle className="h-3 w-3 text-vista-green" />
                ) : idx === currentStep ? (
                  <Circle className="h-3 w-3 text-vista-blue fill-vista-blue" />
                ) : (
                  <Circle className="h-3 w-3 text-gray-300" />
                )}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between p-3 border-t bg-gray-50">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-muted-foreground"
            >
              <SkipForward className="h-4 w-4 mr-1" />
              Skip Tour
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrev}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                onClick={handleNext}
                className="bg-vista-blue hover:bg-vista-blue/90"
                data-testid="tour-next-button"
              >
                {currentStep === steps.length - 1 ? (
                  'Finish'
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

/**
 * Tour Start Button component
 */
export function TourStartButton({
  onClick,
  className,
}: {
  onClick: () => void
  className?: string
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className={cn('gap-2', className)}
      data-testid="tour-start-button"
    >
      <Play className="h-4 w-4" />
      Start Tour
    </Button>
  )
}

/**
 * Pre-defined tour steps for the demo
 */
export const demoTourSteps: TourStep[] = [
  {
    id: 'welcome',
    targetSelector: '[data-testid="engine-grid"]',
    title: 'Welcome to the Product Operating System',
    content:
      'This demo showcases a four-engine system that transforms how portfolio companies operate. Let\'s explore each engine.',
    position: 'center',
  },
  {
    id: 'engine-1',
    targetSelector: '[data-testid="engine-quadrant-1"]',
    title: 'Engine 1: Diagnostic',
    content:
      'Start here to see how customer data transforms into structured maturity assessments with gap analysis and portfolio benchmarks.',
    position: 'right',
  },
  {
    id: 'engine-2',
    targetSelector: '[data-testid="engine-quadrant-2"]',
    title: 'Engine 2: Prioritization',
    content:
      'Transparent prioritization with explicit reasoning, weighted scoring, and trade-off analysis.',
    position: 'left',
  },
  {
    id: 'engine-3',
    targetSelector: '[data-testid="engine-quadrant-3"]',
    title: 'Engine 3: Execution',
    content:
      'Transform priorities into shipped product - PRDs, epics, and stories with full traceability.',
    position: 'right',
  },
  {
    id: 'engine-4',
    targetSelector: '[data-testid="engine-quadrant-4"]',
    title: 'Engine 4: Governance',
    content:
      'The accountability layer that persists - KPI tracking, escalation triggers, and cross-portfolio intelligence.',
    position: 'left',
  },
  {
    id: 'progress',
    targetSelector: '[data-testid="sdlc-stepper"]',
    title: 'Track Your Progress',
    content:
      'The SDLC stepper shows your journey through Discovery → Design → Develop → Deploy.',
    position: 'bottom',
  },
]
