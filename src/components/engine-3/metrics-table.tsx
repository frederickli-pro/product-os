'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  ArrowRight,
  Clock,
  FileText,
  CheckCircle2,
  Zap,
  RefreshCw,
  Sparkles
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TimeReductionMetric } from '@/types/prd'

interface MetricsTableProps {
  metrics: TimeReductionMetric[]
}

const metricIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'PRD creation': FileText,
  'Prioritization cycle': Clock,
  'Decision documentation': CheckCircle2,
  'Time to artifacts': Zap,
  'Rework': RefreshCw
}

export function MetricsTable({ metrics }: MetricsTableProps) {
  return (
    <Card className="bg-white/95 backdrop-blur-sm border-gray-200/60 shadow-lg" data-testid="metrics-table">
      <CardHeader className="pb-3 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-teal-50">
        <CardTitle className="text-lg flex items-center gap-2 text-vista-primary">
          <TrendingUp className="w-5 h-5" />
          Time Reduction Metrics
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Side-by-side comparison: Manual Process vs. Product Operating System
        </p>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full" data-testid="metrics-comparison-table">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Metric</th>
                <th className="text-center p-4 text-sm font-semibold text-gray-700">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-100 text-rose-700">
                    Manual Process
                  </span>
                </th>
                <th className="text-center p-4 text-sm font-semibold text-gray-700">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
                    <Sparkles className="w-3 h-3" />
                    With Product OS
                  </span>
                </th>
                <th className="text-center p-4 text-sm font-semibold text-gray-700">Improvement</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric, index) => {
                const Icon = metricIcons[metric.metric] || TrendingUp

                return (
                  <motion.tr
                    key={metric.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      'border-b border-gray-100 hover:bg-gray-50/50 transition-colors',
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                    )}
                    data-testid={`metric-row-${metric.id}`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-vista-primary to-vista-secondary flex items-center justify-center text-white">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-gray-900" data-testid={`metric-name-${metric.id}`}>
                          {metric.metric}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.1 }}
                      >
                        <span
                          className="inline-block px-4 py-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 font-semibold"
                          data-testid={`metric-manual-${metric.id}`}
                        >
                          {metric.manualProcess}
                        </span>
                      </motion.div>
                    </td>
                    <td className="p-4 text-center">
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="flex items-center justify-center"
                      >
                        <ArrowRight className="w-5 h-5 text-gray-400 mx-3" />
                        <span
                          className="inline-block px-4 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold"
                          data-testid={`metric-product-os-${metric.id}`}
                        >
                          {metric.withProductOS}
                        </span>
                      </motion.div>
                    </td>
                    <td className="p-4 text-center">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <span
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-vista-primary to-vista-secondary text-white text-sm font-medium shadow-sm"
                          data-testid={`metric-improvement-${metric.id}`}
                        >
                          <Zap className="w-3 h-3" />
                          {metric.improvement}
                        </span>
                      </motion.div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Summary annotation */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-gray-200">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">
                Why these metrics matter
              </p>
              <p className="text-sm text-gray-600">
                These improvements directly translate to faster time-to-market, reduced operational overhead,
                and higher confidence in shipping the right features. The Product Operating System doesn&apos;t just
                make you faster — it makes your entire product development process more predictable and accountable.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
