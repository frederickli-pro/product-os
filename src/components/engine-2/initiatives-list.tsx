'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn, formatPercentage } from '@/lib/utils';
import { AutomationType, Initiative } from '@/data/mock/initiatives';

const AUTOMATION_STYLES: Record<AutomationType, { badge: string; dot: string }> = {
  'Full Automation': {
    badge: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    dot: 'bg-emerald-500',
  },
  'Co-pilot / Augmented': {
    badge: 'bg-amber-100 text-amber-700 border border-amber-200',
    dot: 'bg-amber-500',
  },
  'Human-Led + AI': {
    badge: 'bg-purple-100 text-purple-700 border border-purple-200',
    dot: 'bg-purple-500',
  },
};

interface InitiativesListProps {
  initiatives: Initiative[];
  selectedInitiative: Initiative | null;
  onSelectInitiative: (initiative: Initiative) => void;
}

export function InitiativesList({
  initiatives,
  selectedInitiative,
  onSelectInitiative,
}: InitiativesListProps) {
  return (
    <Card className="h-full" data-testid="initiatives-list">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-vista-blue" />
          Candidate Initiatives
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Ranked by weighted scoring methodology
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {initiatives.map((initiative, index) => (
          <motion.div
            key={initiative.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => onSelectInitiative(initiative)}
              className={cn(
                'w-full text-left p-3 rounded-lg border transition-all',
                selectedInitiative?.id === initiative.id
                  ? 'border-vista-blue bg-vista-blue/5 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              )}
              data-testid={`initiative-${initiative.id}`}
              data-priority={initiative.priority}
            >
              <div className="flex items-start justify-between gap-2 min-w-0">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1 min-w-0">
                    <span
                      className={cn(
                        'inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold flex-shrink-0',
                        initiative.priority === 1
                          ? 'bg-vista-blue text-white'
                          : 'bg-gray-200 text-gray-700'
                      )}
                      data-testid={`priority-badge-${initiative.id}`}
                    >
                      {initiative.priority}
                    </span>
                    <span className="font-medium text-sm truncate" data-testid={`initiative-name-${initiative.id}`}>
                      {initiative.name}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 ml-6">
                    {initiative.description}
                  </p>
                  <div className="ml-6 mt-1.5 flex items-center gap-1 flex-wrap">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span
                            className={cn(
                              'text-xs px-1.5 py-0.5 rounded font-medium cursor-help flex items-center gap-1 whitespace-nowrap',
                              AUTOMATION_STYLES[initiative.automationType].badge
                            )}
                            data-testid={`automation-badge-${initiative.id}`}
                          >
                            <span
                              className={cn(
                                'inline-block w-1.5 h-1.5 rounded-full flex-shrink-0',
                                AUTOMATION_STYLES[initiative.automationType].dot
                              )}
                            />
                            {initiative.automationType}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="max-w-xs">
                          <p className="text-xs">{initiative.automationFootnote}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-1 flex-shrink-0">
                  <div className="text-right">
                    <div
                      className={cn(
                        'text-base font-bold',
                        initiative.confidenceScore >= 80
                          ? 'text-vista-green'
                          : initiative.confidenceScore >= 60
                          ? 'text-vista-yellow'
                          : 'text-vista-red'
                      )}
                      data-testid={`confidence-score-${initiative.id}`}
                    >
                      {formatPercentage(initiative.confidenceScore)}
                    </div>
                    <div className="text-xs text-muted-foreground">conf.</div>
                  </div>
                  <ChevronRight
                    className={cn(
                      'w-5 h-5 transition-transform',
                      selectedInitiative?.id === initiative.id
                        ? 'text-vista-blue rotate-90'
                        : 'text-gray-400'
                    )}
                  />
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
