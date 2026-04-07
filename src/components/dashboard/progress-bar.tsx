'use client';

/**
 * Progress bar component for demo journey tracking.
 * Owner: Scenario 1 - Dashboard Hub Navigation
 *
 * Features:
 * - Shows completed demo path across four-act journey
 * - Visual progress indicator
 * - Act labels
 */

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ActNumber } from '@/types';

interface ProgressBarProps {
  completedActs: ActNumber[];
  currentAct: ActNumber;
}

const actLabels: Record<ActNumber, string> = {
  1: 'Diagnostic',
  2: 'Prioritization',
  3: 'Execution',
  4: 'Governance',
};

export function ProgressBar({ completedActs, currentAct }: ProgressBarProps) {
  const acts: ActNumber[] = [1, 2, 3, 4];
  const progressPercentage = (completedActs.length / 4) * 100;

  return (
    <div
      className="w-full py-4"
      data-testid="progress-bar"
      role="progressbar"
      aria-valuenow={progressPercentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Demo progress"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Demo Progress</span>
        <span className="text-sm text-muted-foreground">
          {completedActs.length}/4 Acts Completed
        </span>
      </div>

      {/* Progress track */}
      <div className="relative">
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full bg-vista-blue"
          />
        </div>

        {/* Act markers */}
        <div className="absolute top-0 left-0 right-0 flex justify-between">
          {acts.map((act, index) => {
            const isCompleted = completedActs.includes(act);
            const isCurrent = currentAct === act;
            const position = (index / 3) * 100;

            return (
              <div
                key={act}
                className="relative"
                style={{ left: `${position}%`, marginLeft: index === 0 ? 0 : index === 3 ? '-24px' : '-12px' }}
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isCurrent ? 1.1 : 1 }}
                  className={cn(
                    'h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold -mt-2',
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isCurrent
                      ? 'bg-vista-blue text-white ring-2 ring-vista-blue ring-offset-2'
                      : 'bg-secondary text-muted-foreground'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    act
                  )}
                </motion.div>
                <span className="absolute top-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
                  {actLabels[act]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Spacing for labels */}
      <div className="h-6" />
    </div>
  );
}
