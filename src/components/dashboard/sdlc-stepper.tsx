'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SDLCStepperProps {
  currentStage: 'discovery' | 'design' | 'develop' | 'deploy'
  completedStages: string[]
  contextMessage?: string
  contextBadge?: string // Alias for contextMessage for backward compatibility
}

const stages = [
  { id: 'discovery', label: 'Discovery' },
  { id: 'design', label: 'Design' },
  { id: 'develop', label: 'Develop' },
  { id: 'deploy', label: 'Deploy' },
]

export function SDLCStepper({ currentStage, completedStages, contextMessage, contextBadge }: SDLCStepperProps) {
  // Support both contextMessage and contextBadge props
  const displayMessage = contextMessage || contextBadge
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-4" data-testid="sdlc-stepper">
      <div className="flex items-center justify-between">
        {stages.map((stage, index) => {
          const isCompleted = completedStages.includes(stage.id)
          const isActive = stage.id === currentStage
          const isLast = index === stages.length - 1

          return (
            <React.Fragment key={stage.id}>
              <div
                className="flex flex-col items-center"
                data-testid={`stage-${stage.id}`}
                data-active={isActive ? 'true' : 'false'}
                data-completed={isCompleted ? 'true' : 'false'}
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isActive
                      ? 'bg-vista-primary text-white ring-4 ring-vista-light'
                      : 'bg-gray-200 text-gray-500'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" data-testid={`checkmark-${stage.id}`} />
                  ) : (
                    index + 1
                  )}
                </motion.div>
                <span
                  className={cn(
                    'mt-2 text-sm font-medium',
                    isActive ? 'text-vista-primary' : 'text-gray-500'
                  )}
                >
                  {stage.label}
                </span>
                {isActive && (
                  <span className="text-xs text-vista-accent mt-1">(active)</span>
                )}
              </div>
              {!isLast && (
                <div
                  className={cn(
                    'flex-1 h-1 mx-2 rounded',
                    completedStages.includes(stages[index + 1]?.id) || isCompleted
                      ? 'bg-green-500'
                      : 'bg-gray-200'
                  )}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>
      {displayMessage && (
        <div className="mt-4 text-center" data-testid="context-badge">
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-vista-light text-vista-primary"
            data-testid="context-message"
          >
            {displayMessage}
          </span>
        </div>
      )}
    </div>
  )
}
