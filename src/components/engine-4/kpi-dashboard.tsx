'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, Info, DollarSign, Zap, AlertCircle } from 'lucide-react'
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

function EBITDACapturePanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="border-vista-blue/30" data-testid="ebitda-capture-panel">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-vista-blue" />
            Value Capture Tracker
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-xs">
                    Efficiency created ≠ EBITDA captured. A more efficient workforce only improves the P&L if you
                    intentionally redirect that capacity — through higher output, headcount reduction, or value-based
                    pricing. Otherwise, the gains flow to employees or customers.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Efficiency Created */}
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">Efficiency Created</span>
              </div>
              <p className="text-3xl font-bold text-blue-700">34%</p>
              <p className="text-xs text-blue-600">
                Reduction in manual compliance review time. Sprint rework down from 28% to 9%.
              </p>
              <div className="w-full bg-blue-200 rounded-full h-1.5">
                <div className="h-1.5 rounded-full bg-blue-500" style={{ width: '34%' }} />
              </div>
            </div>

            {/* EBITDA Captured */}
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">EBITDA Captured</span>
              </div>
              <p className="text-3xl font-bold text-emerald-700">18%</p>
              <p className="text-xs text-emerald-600">
                $420K ARR in churn prevented. Support headcount held flat despite 22% ticket volume reduction.
              </p>
              <div className="w-full bg-emerald-200 rounded-full h-1.5">
                <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: '18%' }} />
              </div>
            </div>

            {/* Uncaptured Gap */}
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-semibold text-amber-800">Gap to Close</span>
              </div>
              <p className="text-3xl font-bold text-amber-700">16%</p>
              <p className="text-xs text-amber-700">
                Efficiency created but not yet captured. Requires: backfill freeze on 3 roles + output expansion targets.
              </p>
              <div className="w-full bg-amber-200 rounded-full h-1.5">
                <div className="h-1.5 rounded-full bg-amber-500" style={{ width: '16%' }} />
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
            <p className="text-xs text-gray-600">
              <strong>Action required:</strong> A more efficient workforce doesn&apos;t automatically improve the P&L — value created goes to employees or customers unless you capture it intentionally.
              Either grow output with the same headcount, or reduce headcount as roles are automated.
              The 16% gap above represents ~$380K annualized EBITDA available but not yet secured.
            </p>
          </div>
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
      <EBITDACapturePanel />
    </div>
  )
}
