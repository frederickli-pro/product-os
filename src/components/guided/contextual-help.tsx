'use client'

/**
 * Contextual Help component with tooltip and expandable panel.
 * Owner: Scenario 7 - Guided Walkthrough Features
 *
 * Features:
 * - (?) icon that shows tooltip on hover
 * - Click to expand detailed help panel
 * - Supports multiple help topics
 * - Accessible keyboard navigation
 */

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, X, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export interface HelpContent {
  title: string
  shortDescription: string
  longDescription?: string
  learnMoreUrl?: string
  relatedTopics?: string[]
}

export interface ContextualHelpProps {
  content: HelpContent
  size?: 'sm' | 'md' | 'lg'
  position?: 'inline' | 'corner'
  variant?: 'icon' | 'text' | 'badge'
  className?: string
}

export function ContextualHelp({
  content,
  size = 'md',
  position = 'inline',
  variant = 'icon',
  className,
}: ContextualHelpProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showPanel, setShowPanel] = useState(false)

  const iconSize = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }[size]

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowPanel(!showPanel)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setShowPanel(!showPanel)
    }
    if (e.key === 'Escape' && showPanel) {
      setShowPanel(false)
    }
  }

  const triggerElement = (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'inline-flex items-center justify-center text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-vista-blue focus:ring-offset-2 rounded-full transition-colors',
        variant === 'badge' && 'bg-secondary px-2 py-0.5 gap-1',
        variant === 'text' && 'gap-1 text-sm',
        position === 'corner' && 'absolute top-2 right-2'
      )}
      aria-label={`Help: ${content.title}`}
      aria-expanded={showPanel}
      data-testid="contextual-help-trigger"
    >
      <HelpCircle className={iconSize} />
      {variant === 'badge' && (
        <span className="text-xs font-medium">Help</span>
      )}
      {variant === 'text' && (
        <span className="text-xs">What's this?</span>
      )}
    </button>
  )

  return (
    <div className={cn('relative inline-flex', className)}>
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>{triggerElement}</TooltipTrigger>
          <TooltipContent
            side="top"
            className="max-w-xs"
            data-testid="contextual-help-tooltip"
          >
            <p className="font-semibold text-sm">{content.title}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {content.shortDescription}
            </p>
            {content.longDescription && (
              <p className="text-xs text-muted-foreground/80 mt-1">
                Click for more details
              </p>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 top-full mt-2 right-0 w-80 bg-card border rounded-lg shadow-lg overflow-hidden"
            data-testid="contextual-help-panel"
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-vista-blue/10 flex items-center justify-center">
                    <HelpCircle className="h-4 w-4 text-vista-blue" />
                  </div>
                  <h3 className="font-semibold">{content.title}</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => setShowPanel(false)}
                  aria-label="Close help panel"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                {content.shortDescription}
              </p>

              {content.longDescription && (
                <div className="mt-3">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-1 text-sm font-medium text-vista-blue hover:text-vista-blue/80"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="h-4 w-4" />
                        Show less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        Learn more
                      </>
                    )}
                  </button>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-2 text-sm text-muted-foreground">
                          {content.longDescription}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {content.relatedTopics && content.relatedTopics.length > 0 && (
                <div className="mt-4 pt-3 border-t">
                  <p className="text-xs font-medium text-muted-foreground mb-2">
                    Related Topics
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {content.relatedTopics.map((topic) => (
                      <span
                        key={topic}
                        className="text-xs bg-secondary px-2 py-0.5 rounded"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {content.learnMoreUrl && (
                <a
                  href={content.learnMoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-1 text-sm text-vista-blue hover:underline"
                >
                  Learn more
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Pre-defined help content for common demo elements
 */
export const demoHelpContent: Record<string, HelpContent> = {
  maturityAssessment: {
    title: 'Maturity Assessment',
    shortDescription: 'Four-dimension evaluation of product development process.',
    longDescription:
      'The maturity assessment evaluates your organization across Customer Discovery Depth, Roadmap Clarity, Execution Velocity, and Governance Rigor. Scores are benchmarked against portfolio peers.',
    relatedTopics: ['Gap Analysis', 'Portfolio Benchmarks'],
  },
  prioritization: {
    title: 'Prioritization Scoring',
    shortDescription: 'Weighted methodology for ranking initiatives.',
    longDescription:
      'Each initiative is scored using weighted factors: Revenue Impact (40%), Churn Risk Reduction (25%), Competitive Exposure (20%), Technical Enabler Status (10%), and Strategic Alignment (5%).',
    relatedTopics: ['Trade-off Analysis', 'Confidence Indicators'],
  },
  prdGeneration: {
    title: 'PRD Generation',
    shortDescription: 'Transform priorities into structured product documents.',
    longDescription:
      'The system generates comprehensive PRDs with acceptance criteria, edge cases, and technical constraints - all traceable back to the original prioritization reasoning.',
    relatedTopics: ['Epic Structure', 'Traceability'],
  },
  governance: {
    title: 'Governance Dashboard',
    shortDescription: 'Persistent accountability layer with KPI tracking.',
    longDescription:
      'Monitor 90-day execution plans, track KPIs tied to prioritization reasoning, and receive escalation alerts for stalled items. The governance layer persists after engagement ends.',
    relatedTopics: ['Escalation Triggers', 'Portfolio Intelligence'],
  },
  portfolioIntelligence: {
    title: 'Portfolio Intelligence',
    shortDescription: 'Cross-company pattern recognition and shared learnings.',
    longDescription:
      'As the system operates across portfolio companies, it identifies recurring patterns, shares anonymized learnings, and compounds institutional knowledge - becoming smarter with each engagement.',
    relatedTopics: ['Pattern Recognition', 'Shared Learnings'],
  },
}
