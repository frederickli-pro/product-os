'use client';

/**
 * Engine quadrant component for dashboard hub.
 * Owner: Scenario 1 - Dashboard Hub Navigation
 *
 * Features:
 * - 2x2 grid layout positioning
 * - Status indicators
 * - Preview content
 * - Navigation affordance
 */

import { motion } from 'framer-motion';
import { ArrowRight, Check, Play, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { EngineId, Engine } from '@/types';

interface EngineQuadrantProps {
  engine: Engine;
  isActive: boolean;
  isCompleted: boolean;
  onClick: (engineId: EngineId) => void;
  showStartHere?: boolean;
}

const engineIcons: Record<number, React.ReactNode> = {
  1: <span className="text-2xl">🔍</span>,
  2: <span className="text-2xl">⚖️</span>,
  3: <span className="text-2xl">🚀</span>,
  4: <span className="text-2xl">📊</span>,
};

const helpContent: Record<number, { title: string; content: string }> = {
  1: {
    title: 'Engine 1: Diagnostic',
    content: 'Structured discovery synthesizing customer data into maturity assessments.',
  },
  2: {
    title: 'Engine 2: Prioritization',
    content: 'Transparent prioritization with explicit reasoning and trade-off analysis.',
  },
  3: {
    title: 'Engine 3: Execution',
    content: 'Transform decisions into shipped product artifacts - PRDs, epics, stories.',
  },
  4: {
    title: 'Engine 4: Governance',
    content: 'Accountability layer with KPI tracking and cross-portfolio intelligence.',
  },
};

const stageLabels: Record<number, string> = {
  1: 'discovery',
  2: 'design',
  3: 'develop',
  4: 'deploy',
};

export function EngineQuadrant({
  engine,
  isActive,
  isCompleted,
  onClick,
  showStartHere = false,
}: EngineQuadrantProps) {
  const statusColor = isCompleted
    ? 'bg-green-500'
    : isActive
    ? 'bg-blue-500 animate-pulse'
    : 'bg-gray-300';

  const getStatusLabel = (): 'completed' | 'active' | 'not_started' => {
    if (isCompleted) return 'completed';
    if (isActive) return 'active';
    return 'not_started';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: engine.id * 0.1 }}
      className="relative"
    >
      <Card
        data-testid={`engine-quadrant-${engine.id}`}
        data-engine-id={engine.id}
        data-engine-status={getStatusLabel()}
        className={cn(
          'cursor-pointer transition-all duration-300 hover:shadow-lg',
          isActive && 'ring-2 ring-vista-blue shadow-lg',
          isCompleted && 'border-green-200 bg-green-50/50'
        )}
        onClick={() => onClick(engine.id)}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                {engineIcons[engine.id]}
              </div>
              <div>
                <CardTitle className="text-lg">Engine {engine.id}</CardTitle>
                <CardDescription className="text-xs uppercase tracking-wide">
                  Act {engine.actNumber || engine.act} • {stageLabels[engine.id]}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={cn('h-3 w-3 rounded-full', statusColor)}
                data-testid={`engine-status-indicator-${engine.id}`}
                aria-label={isCompleted ? 'Completed' : isActive ? 'Active' : 'Not started'}
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="text-muted-foreground hover:text-foreground"
                      onClick={(e) => e.stopPropagation()}
                      data-testid={`help-icon-${engine.id}`}
                      aria-label={`Help for ${engine.name}`}
                    >
                      <HelpCircle className="h-4 w-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="font-semibold">{helpContent[engine.id].title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {helpContent[engine.id].content}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <h3 className="font-semibold text-base">{engine.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {engine.description}
          </p>
          <div className="flex items-center justify-between pt-2">
            {isCompleted ? (
              <span className="flex items-center gap-1 text-sm text-green-600">
                <Check className="h-4 w-4" />
                Completed
              </span>
            ) : (
              <Button
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                className="gap-1"
                data-testid={`jump-to-engine-${engine.id}`}
              >
                {isActive ? (
                  <>
                    <Play className="h-3 w-3" />
                    Continue
                  </>
                ) : (
                  <>
                    Jump to Engine {engine.id}
                    <ArrowRight className="h-3 w-3" />
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      {showStartHere && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="absolute -top-3 -right-3 z-10"
        >
          <Button
            size="sm"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg"
            data-testid="start-here-button"
          >
            Start Here
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
