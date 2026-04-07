'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SDLCStepperProps } from '@/types/engine';
import { SDLCStage } from '@/types';

const stages: { stage: SDLCStage; label: string }[] = [
  { stage: 'discovery', label: 'Discovery' },
  { stage: 'design', label: 'Design' },
  { stage: 'develop', label: 'Develop' },
  { stage: 'deploy', label: 'Deploy' },
];

export function SDLCStepper({
  currentStage,
  completedStages,
  contextMessage,
  contextBadge,
}: SDLCStepperProps) {
  const currentIndex = stages.findIndex((s) => s.stage === currentStage);

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border p-4" data-testid="sdlc-stepper">
      <div className="flex items-center justify-between mb-3">
        {stages.map((step, index) => {
          const isCompleted = completedStages.includes(step.stage);
          const isActive = step.stage === currentStage;
          const isPast = index < currentIndex;

          return (
            <React.Fragment key={step.stage}>
              <div className="flex flex-col items-center">
                <motion.div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isActive
                      ? 'bg-vista-blue text-white ring-4 ring-vista-blue/20'
                      : 'bg-gray-200 text-gray-500'
                  )}
                  initial={{ scale: 1 }}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                  data-testid={`stage-${step.stage}`}
                  data-completed={isCompleted}
                  data-active={isActive}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" data-testid={`checkmark-${step.stage}`} />
                  ) : (
                    index + 1
                  )}
                </motion.div>
                <span
                  className={cn(
                    'mt-2 text-sm font-medium',
                    isActive ? 'text-vista-blue' : isCompleted ? 'text-green-600' : 'text-gray-500'
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < stages.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-1 mx-2 rounded transition-colors',
                    isPast || isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  )}
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {contextBadge && (
        <div className="flex justify-center mt-3">
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-vista-blue/10 text-vista-blue"
            data-testid="context-badge"
          >
            {contextBadge}
          </span>
        </div>
      )}

      {contextMessage && (
        <p className="text-center text-sm text-gray-600 mt-2" data-testid="context-message">
          {contextMessage}
        </p>
      )}
    </div>
  );
}
