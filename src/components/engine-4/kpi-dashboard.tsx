'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { KPIMetric, KPIDashboardProps } from '@/types/governance'

function Sparkline({ data, trend }: { data: number[], trend: 'up' | 'down' | 'stable' }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const height = 40
  const width = 80
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width
    const y = height - ((value - min) / range) * height
    return `${x},${y}`
  }).join(' ')

  const color = trend === 'up' ? '#36B37E' : trend === 'down' ? '#FF5630' : '#4A90C2'

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {data.map((value, index) => {
        const x = (index / (data.length - 1)) * width
        const y = height - ((value - min) / range) * height
        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r={index === data.length - 1 ? 4 : 2}
            fill={color}
          />
        )
      })}
    </svg>
  )
}

function TrendIcon({ trend }: { trend: 'up' | 'down' | 'stable' }) {
  const iconClass = cn(
    'w-4 h-4',
    trend === 'up' && 'text-green-500',
    trend === 'down' && 'text-red-500',
    trend === 'stable' && 'text-blue-500'
  )

  if (trend === 'up') return <TrendingUp className={iconClass} />
  if (trend === 'down') return <TrendingDown className={iconClass} />
  return <Minus className={iconClass} />
}

function KPICard({ metric, index }: { metric: KPIMetric, index: number }) {
  const progress = (metric.currentValue / metric.targetValue) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="h-full" data-testid={`kpi-card-${metric.id}`}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardTitle className="text-sm font-medium text-gray-600">
              {metric.name}
            </CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="text-gray-400 hover:text-vista-primary transition-colors"
                    aria-label={`View reasoning for ${metric.name}`}
                  >
                    <Info className="w-4 h-4" aria-hidden="true" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="left" className="max-w-xs">
                  <div className="space-y-2">
                    <p className="font-medium">{metric.linkedReasoning.initiative}</p>
                    <p className="text-sm text-gray-600">{metric.linkedReasoning.reasoning}</p>
                    <p className="text-xs text-vista-accent">
                      Confidence: {metric.linkedReasoning.confidenceScore}%
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-vista-primary">
                {metric.currentValue}
              </span>
              <span className="text-sm text-gray-500">{metric.unit}</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendIcon trend={metric.trend} />
              <Sparkline data={metric.trendHistory} trend={metric.trend} />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Progress to target</span>
              <span>{metric.targetValue} {metric.unit}</span>
            </div>
            <Progress value={Math.min(progress, 100)} className="h-2" />
          </div>

          <p className="text-xs text-gray-500">{metric.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function KPIDashboard({ metrics }: KPIDashboardProps) {
  return (
    <div className="space-y-4" data-testid="kpi-dashboard">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">KPI Dashboard</h2>
        <span className="text-sm text-vista-accent">
          Prioritization reasoning linked to KPIs in real-time view
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <KPICard key={metric.id} metric={metric} index={index} />
        ))}
      </div>
    </div>
  )
}
