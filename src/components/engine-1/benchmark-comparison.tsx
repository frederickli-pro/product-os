'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingDown, TrendingUp, Minus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BenchmarkData } from '@/types/evidence'

interface BenchmarkComparisonProps {
  benchmark: BenchmarkData
}

export function BenchmarkComparison({ benchmark }: BenchmarkComparisonProps) {
  const dimensions = [
    {
      name: 'Customer Discovery Depth',
      score: benchmark.scores.customerDiscoveryDepth,
      median: benchmark.peerMedian.customerDiscoveryDepth,
    },
    {
      name: 'Roadmap Clarity',
      score: benchmark.scores.roadmapClarity,
      median: benchmark.peerMedian.roadmapClarity,
    },
    {
      name: 'Execution Velocity',
      score: benchmark.scores.executionVelocity,
      median: benchmark.peerMedian.executionVelocity,
    },
    {
      name: 'Governance Rigor',
      score: benchmark.scores.governanceRigor,
      median: benchmark.peerMedian.governanceRigor,
    },
  ]

  const getComparisonIcon = (score: number, median: number) => {
    if (score < median - 5) {
      return <TrendingDown className="w-4 h-4 text-red-500" />
    } else if (score > median + 5) {
      return <TrendingUp className="w-4 h-4 text-green-500" />
    }
    return <Minus className="w-4 h-4 text-yellow-500" />
  }

  const getComparisonText = (score: number, median: number) => {
    const diff = score - median
    if (diff < -5) {
      return { text: 'Below median', color: 'text-red-600' }
    } else if (diff > 5) {
      return { text: 'Above median', color: 'text-green-600' }
    }
    return { text: 'At median', color: 'text-yellow-600' }
  }

  return (
    <Card data-testid="benchmark-comparison">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-vista-primary">Portfolio Benchmark Comparison</CardTitle>
        <p className="text-sm text-muted-foreground">
          {benchmark.companyName} relative to {benchmark.portfolioSize}+ portfolio companies
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {dimensions.map((dim, index) => {
            const comparison = getComparisonText(dim.score, dim.median)
            const isBelowMedian = benchmark.belowMedianDimensions.includes(dim.name)

            return (
              <motion.div
                key={dim.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${
                  isBelowMedian ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  {getComparisonIcon(dim.score, dim.median)}
                  <span className={`text-xs font-medium ${comparison.color}`}>
                    {comparison.text}
                  </span>
                </div>
                <div className="text-2xl font-bold text-vista-primary mb-1">
                  {dim.score}%
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  vs. {dim.median}% median
                </div>
                <div className="text-sm font-medium text-gray-700 line-clamp-2">
                  {dim.name}
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-4 p-3 bg-vista-light/30 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="font-medium text-vista-primary">Key Finding: </span>
            {benchmark.companyName} is below median on{' '}
            <span className="font-medium">{benchmark.belowMedianDimensions.join(' and ')}</span> dimensions,
            indicating primary focus areas for improvement.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
