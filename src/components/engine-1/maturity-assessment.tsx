'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadarChart } from './radar-chart'
import { MaturityScore, BenchmarkData } from '@/types/evidence'

interface MaturityAssessmentProps {
  scores: MaturityScore
  benchmark: BenchmarkData
}

export function MaturityAssessment({ scores, benchmark }: MaturityAssessmentProps) {
  return (
    <Card className="h-full" data-testid="maturity-assessment">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-vista-primary">Maturity Assessment</CardTitle>
        <p className="text-sm text-muted-foreground">
          Four-dimension scoring across product development capability
        </p>
      </CardHeader>
      <CardContent>
        <RadarChart
          scores={scores}
          peerMedian={benchmark.peerMedian}
          showComparison={true}
        />

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="p-3 bg-vista-light/30 rounded-lg text-center">
            <div className="text-2xl font-bold text-vista-primary">
              {scores.overallScore}%
            </div>
            <div className="text-sm text-gray-600">Overall Maturity Score</div>
          </div>
          <div className="p-3 bg-vista-light/30 rounded-lg text-center">
            <div className="text-2xl font-bold text-vista-primary">
              {scores.percentileRanking}th
            </div>
            <div className="text-sm text-gray-600">Percentile Ranking</div>
          </div>
        </div>

        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Industry Comparison: </span>
            {scores.industryComparison}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
