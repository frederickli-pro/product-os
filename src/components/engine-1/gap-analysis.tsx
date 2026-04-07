'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GapAnalysis as GapAnalysisType } from '@/types/evidence'

interface GapAnalysisProps {
  gaps: GapAnalysisType[]
}

export function GapAnalysis({ gaps }: GapAnalysisProps) {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      case 'high':
        return <AlertCircle className="w-5 h-5 text-orange-500" />
      case 'medium':
        return <Info className="w-5 h-5 text-yellow-500" />
      default:
        return <CheckCircle className="w-5 h-5 text-blue-500" />
    }
  }

  const getSeverityBorder = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-l-red-500'
      case 'high':
        return 'border-l-orange-500'
      case 'medium':
        return 'border-l-yellow-500'
      default:
        return 'border-l-blue-500'
    }
  }

  return (
    <Card className="h-full" data-testid="gap-analysis">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-vista-primary">Gap Analysis</CardTitle>
        <p className="text-sm text-muted-foreground">
          Capability deficiencies with recommended focus areas
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {gaps.map((gap, index) => (
            <motion.div
              key={gap.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 bg-white border border-gray-200 rounded-lg border-l-4 ${getSeverityBorder(
                gap.severity
              )}`}
            >
              <div className="flex items-start gap-3">
                {getSeverityIcon(gap.severity)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900">{gap.area}</h4>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${
                        gap.severity === 'critical'
                          ? 'bg-red-100 text-red-700'
                          : gap.severity === 'high'
                          ? 'bg-orange-100 text-orange-700'
                          : gap.severity === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {gap.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{gap.description}</p>
                  <div className="bg-vista-light/50 p-2 rounded text-sm">
                    <span className="font-medium text-vista-primary">Recommendation: </span>
                    <span className="text-gray-700">{gap.recommendation}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
