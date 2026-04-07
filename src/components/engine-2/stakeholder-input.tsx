'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, Gauge, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { StakeholderInput as StakeholderInputType } from '@/data/mock/initiatives';

interface StakeholderInputProps {
  inputs: StakeholderInputType[];
}

export function StakeholderInput({ inputs }: StakeholderInputProps) {
  const customerInputs = inputs.filter((i) => i.type === 'customer');
  const boardInputs = inputs.filter((i) => i.type === 'board');
  const capacityInputs = inputs.filter((i) => i.type === 'capacity');

  return (
    <Card data-testid="stakeholder-input">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="w-5 h-5 text-vista-blue" />
          Stakeholder Input Aggregation
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          How feedback informed priority rankings
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-3" data-testid="customer-themes">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-vista-blue" />
              Customer Themes
            </h4>
            {customerInputs.map((input, index) => (
              <motion.div
                key={input.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 rounded-lg border bg-vista-blue/5"
                data-testid={`customer-input-${input.id}`}
              >
                <div className="text-xs text-muted-foreground mb-1">{input.source}</div>
                <p className="text-sm">{input.content}</p>
                <span
                  className={cn(
                    'inline-block mt-2 text-xs px-2 py-0.5 rounded-full',
                    input.impact === 'high'
                      ? 'bg-red-100 text-red-700'
                      : input.impact === 'medium'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-gray-100 text-gray-700'
                  )}
                >
                  {input.impact} impact
                </span>
              </motion.div>
            ))}
          </div>

          <div className="space-y-3" data-testid="board-mandates">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-600" />
              Board Mandates
            </h4>
            {boardInputs.map((input, index) => (
              <motion.div
                key={input.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="p-3 rounded-lg border bg-purple-50"
                data-testid={`board-input-${input.id}`}
              >
                <div className="text-xs text-muted-foreground mb-1">{input.source}</div>
                <p className="text-sm">{input.content}</p>
                <span
                  className={cn(
                    'inline-block mt-2 text-xs px-2 py-0.5 rounded-full',
                    input.impact === 'high'
                      ? 'bg-red-100 text-red-700'
                      : input.impact === 'medium'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-gray-100 text-gray-700'
                  )}
                >
                  {input.impact} impact
                </span>
              </motion.div>
            ))}
          </div>

          <div className="space-y-3" data-testid="capacity-constraints">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <Gauge className="w-4 h-4 text-amber-600" />
              Capacity Constraints
            </h4>
            {capacityInputs.map((input, index) => (
              <motion.div
                key={input.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                className="p-3 rounded-lg border bg-amber-50"
                data-testid={`capacity-input-${input.id}`}
              >
                <div className="text-xs text-muted-foreground mb-1">{input.source}</div>
                <p className="text-sm">{input.content}</p>
                <span
                  className={cn(
                    'inline-block mt-2 text-xs px-2 py-0.5 rounded-full',
                    input.impact === 'high'
                      ? 'bg-red-100 text-red-700'
                      : input.impact === 'medium'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-gray-100 text-gray-700'
                  )}
                >
                  {input.impact} impact
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
