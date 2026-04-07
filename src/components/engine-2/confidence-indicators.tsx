'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Database, TrendingUp, Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn, formatPercentage } from '@/lib/utils';

interface ConfidenceFactor {
  label: string;
  score: number;
  factors: string[];
}

interface ConfidenceIndicatorsProps {
  dataQuality: ConfidenceFactor;
  marketValidation: ConfidenceFactor;
  technicalFeasibility: ConfidenceFactor;
}

export function ConfidenceIndicators({
  dataQuality,
  marketValidation,
  technicalFeasibility,
}: ConfidenceIndicatorsProps) {
  const indicators = [
    { ...dataQuality, icon: Database, color: 'vista-blue' },
    { ...marketValidation, icon: TrendingUp, color: 'vista-green' },
    { ...technicalFeasibility, icon: Wrench, color: 'vista-teal' },
  ];

  const overallConfidence = Math.round(
    (dataQuality.score + marketValidation.score + technicalFeasibility.score) / 3
  );

  return (
    <Card data-testid="confidence-indicators">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-vista-blue" />
          Priority Confidence Indicators
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Data quality scores and uncertainty levels
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-6 p-4 rounded-lg bg-gradient-to-r from-vista-blue/10 to-vista-blue/5">
          <div>
            <span className="text-sm text-muted-foreground">Overall Confidence</span>
            <div
              className="text-3xl font-bold text-vista-blue"
              data-testid="overall-confidence"
            >
              {formatPercentage(overallConfidence)}
            </div>
          </div>
          <div className="w-32">
            <Progress value={overallConfidence} className="h-3" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4" data-testid="confidence-breakdown">
          {indicators.map((indicator, index) => {
            const Icon = indicator.icon;
            return (
              <motion.div
                key={indicator.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="p-4 rounded-lg border"
                data-testid={`confidence-${indicator.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-4 h-4 text-${indicator.color}`} />
                  <span className="text-sm font-medium">{indicator.label}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={cn(
                      'text-2xl font-bold',
                      indicator.score >= 80
                        ? 'text-vista-green'
                        : indicator.score >= 60
                        ? 'text-vista-yellow'
                        : 'text-vista-red'
                    )}
                  >
                    {formatPercentage(indicator.score)}
                  </span>
                  <Progress value={indicator.score} className="flex-1 h-2" />
                </div>
                <ul className="space-y-1">
                  {indicator.factors.map((factor, factorIndex) => (
                    <li
                      key={factorIndex}
                      className="text-xs text-muted-foreground flex items-start gap-1"
                    >
                      <span className="text-vista-blue">•</span>
                      {factor}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
