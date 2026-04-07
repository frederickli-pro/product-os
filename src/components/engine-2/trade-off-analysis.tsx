'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, AlertTriangle, ArrowLeftRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// Utility imports available if needed
import { Initiative } from '@/data/mock/initiatives';

interface TradeOffAnalysisProps {
  initiatives: Initiative[];
  selectedInitiative: Initiative | null;
}

export function TradeOffAnalysis({
  initiatives,
  selectedInitiative,
}: TradeOffAnalysisProps) {
  const topInitiative = initiatives[0];
  const secondInitiative = initiatives[1];

  return (
    <Card className="h-full" data-testid="trade-off-analysis">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-vista-blue" />
          Trade-off Analysis
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Opportunity costs and resource allocation scenarios
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className="p-4 rounded-lg border border-amber-200 bg-amber-50"
          data-testid="tradeoff-visualization"
        >
          <div className="flex items-center gap-2 mb-3">
            <ArrowLeftRight className="w-5 h-5 text-amber-600" />
            <span className="font-semibold text-amber-800">Primary Trade-off</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-white rounded border">
              <div className="text-sm font-medium text-vista-blue mb-1">
                {topInitiative?.shortName}
              </div>
              <div className="text-xs text-muted-foreground">
                Top Priority - 87% confidence
              </div>
            </div>
            <div className="p-3 bg-white rounded border">
              <div className="text-sm font-medium text-gray-700 mb-1">
                {secondInitiative?.shortName}
              </div>
              <div className="text-xs text-muted-foreground">
                #2 Priority - 72% confidence
              </div>
            </div>
          </div>
          <p className="text-sm text-amber-700 mt-3" data-testid="tradeoff-description">
            Choosing unified scheduling-compliance platform delays AI copilot by 1
            quarter but provides necessary foundation. AI without unified data would
            have 40% less utility.
          </p>
        </div>

        {selectedInitiative && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Opportunity Costs for {selectedInitiative.name}
            </h4>
            <ul className="space-y-2" data-testid="trade-offs-list">
              {selectedInitiative.tradeOffs.map((tradeOff, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm p-2 rounded bg-gray-50"
                  data-testid={`tradeoff-${index}`}
                >
                  <span className="text-amber-500 mt-0.5">⚠</span>
                  {tradeOff}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">
            Resource Allocation Scenarios
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded bg-gray-50">
              <span className="text-sm">Engineering capacity required</span>
              <span className="text-sm font-medium">
                {selectedInitiative?.resourceRequirements.engineering || 8} engineers
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-gray-50">
              <span className="text-sm">Design resources</span>
              <span className="text-sm font-medium">
                {selectedInitiative?.resourceRequirements.design || 2} designers
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-gray-50">
              <span className="text-sm">Estimated timeline</span>
              <span className="text-sm font-medium">
                {selectedInitiative?.resourceRequirements.timeline || '12 weeks'}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
