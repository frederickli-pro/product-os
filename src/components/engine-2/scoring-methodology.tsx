'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { formatPercentage } from '@/lib/utils';
import { Initiative, ScoringWeight } from '@/data/mock/initiatives';

interface ScoringMethodologyProps {
  weights: ScoringWeight[];
  selectedInitiative: Initiative | null;
}

export function ScoringMethodology({
  weights,
  selectedInitiative,
}: ScoringMethodologyProps) {
  return (
    <Card className="h-full" data-testid="scoring-methodology">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Scale className="w-5 h-5 text-vista-blue" />
          Scoring Methodology
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Weighted factors driving prioritization decisions
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6">
          <h4 className="text-sm font-semibold text-gray-700">Weight Distribution</h4>
          <div className="space-y-3" data-testid="weight-distribution">
            {weights.map((weight, index) => (
              <motion.div
                key={weight.factor}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-sm font-medium flex items-center gap-1 cursor-help">
                            {weight.factor}
                            <Info className="w-3 h-3 text-muted-foreground" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{weight.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span
                      className="text-sm font-bold text-vista-blue"
                      data-testid={`weight-${weight.factor.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {formatPercentage(weight.weight)}
                    </span>
                  </div>
                  <Progress value={weight.weight} className="h-2" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {selectedInitiative && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-t pt-4"
          >
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Score Breakdown: {selectedInitiative.name}
            </h4>
            <div className="space-y-2" data-testid="score-breakdown">
              {selectedInitiative.scores.map((score) => (
                <div
                  key={score.factor}
                  className="flex items-center justify-between p-2 rounded bg-gray-50"
                  data-testid={`score-${score.factor.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="flex-1">
                    <span className="text-sm">{score.factor}</span>
                    <p className="text-xs text-muted-foreground">{score.reasoning}</p>
                  </div>
                  <div className="text-right ml-2">
                    <span className="text-sm font-bold">
                      {score.score}/{score.maxScore}
                    </span>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between p-3 rounded bg-vista-blue/10 font-semibold">
                <span>Total Weighted Score</span>
                <span className="text-vista-blue text-lg">
                  {formatPercentage(selectedInitiative.weightedScore)}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {selectedInitiative && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200"
            data-testid="explicit-reasoning"
          >
            <h4 className="text-sm font-semibold text-green-800 mb-2">
              Explicit Reasoning
            </h4>
            <ul className="space-y-1">
              {selectedInitiative.reasoning.map((reason, index) => (
                <li
                  key={index}
                  className="text-sm text-green-700 flex items-start gap-2"
                  data-testid={`reasoning-${index}`}
                >
                  <span className="text-green-500 mt-0.5">•</span>
                  {reason}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {selectedInitiative && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
            data-testid="confidence-footnote"
          >
            <div className="flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-xs font-semibold text-gray-600">How confidence is calculated¹ </span>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                  {selectedInitiative.confidenceFootnote}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
