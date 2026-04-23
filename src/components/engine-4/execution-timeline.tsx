'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, Clock, AlertTriangle, Circle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { ExecutionTimelineProps, ExecutionMilestone } from '@/types/governance'

const PHASES = [
  {
    id: 1,
    label: 'Problem Shaping',
    weeks: 'Wks 1–3',
    weekStart: 1,
    weekEnd: 3,
    tagColor: 'bg-amber-100 text-amber-700 border-amber-200',
    headerColor: 'text-amber-700',
  },
  {
    id: 2,
    label: 'Build Cycles',
    weeks: 'Wks 4–10',
    weekStart: 4,
    weekEnd: 10,
    tagColor: 'bg-blue-100 text-blue-700 border-blue-200',
    headerColor: 'text-blue-700',
  },
  {
    id: 3,
    label: 'Production Hardening',
    weeks: 'Wks 11–13',
    weekStart: 11,
    weekEnd: 13,
    tagColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    headerColor: 'text-emerald-700',
  },
] as const

type Phase = (typeof PHASES)[number]

function ParadigmShiftCallout() {
  return (
    <div className="rounded-lg border border-vista-blue/20 bg-vista-blue/5 p-3 mb-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-vista-blue mb-2">
        How We Build Now — AI-Enabled
      </p>
      <div className="space-y-1.5 text-xs text-gray-600">
        <div className="flex gap-1.5">
          <span className="text-gray-400 font-medium flex-shrink-0">Before:</span>
          <span>Lengthy PRD → hand off to eng → build → validate at the end</span>
        </div>
        <div className="flex gap-1.5">
          <span className="text-vista-blue font-medium flex-shrink-0">Now:</span>
          <span>
            1-page brief → vibe-coded prototype (48h) → validate with customers → 2-week
            cycles ship real increments → harden to prod
          </span>
        </div>
      </div>
      <p className="text-xs font-semibold text-gray-700 mt-2">
        The prototype is not thrown away. It becomes production.
      </p>
    </div>
  )
}

function PhaseHeader({ phase }: { phase: Phase }) {
  return (
    <div className="flex items-center gap-2 mt-4 mb-2 first:mt-0">
      <span
        className={cn(
          'text-xs font-semibold px-2 py-0.5 rounded-full border',
          phase.tagColor
        )}
      >
        Phase {phase.id}
      </span>
      <span className={cn('text-xs font-semibold', phase.headerColor)}>{phase.label}</span>
      <span className="text-xs text-gray-400">·</span>
      <span className="text-xs text-gray-400">{phase.weeks}</span>
    </div>
  )
}

function CycleRhythmCallout() {
  const steps = ['Shape (2d)', 'Bet (1d)', 'Build (11d)', 'Ship']
  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 mb-3 flex items-center gap-1 flex-wrap">
      <span className="text-xs font-medium text-blue-700 mr-1">2-week cycle:</span>
      {steps.map((step, i) => (
        <React.Fragment key={step}>
          <span className="text-xs text-blue-600">{step}</span>
          {i < steps.length - 1 && <span className="text-blue-400 text-xs">→</span>}
        </React.Fragment>
      ))}
    </div>
  )
}

function MilestoneStatusIcon({ status }: { status: ExecutionMilestone['status'] }) {
  const iconMap = {
    completed: <Check className="w-4 h-4 text-white" />,
    'in-progress': <Clock className="w-4 h-4 text-white" />,
    upcoming: <Circle className="w-4 h-4 text-gray-400" />,
    'at-risk': <AlertTriangle className="w-4 h-4 text-white" />,
  }
  return iconMap[status]
}

function MilestoneCard({
  milestone,
  animationIndex,
  showConnector,
}: {
  milestone: ExecutionMilestone
  animationIndex: number
  showConnector: boolean
}) {
  const statusColors = {
    completed: 'bg-green-500',
    'in-progress': 'bg-vista-primary',
    upcoming: 'bg-gray-200',
    'at-risk': 'bg-amber-500',
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: animationIndex * 0.05 }}
      className="flex items-start gap-3"
      data-testid={`milestone-${milestone.id}`}
    >
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center',
            statusColors[milestone.status]
          )}
        >
          <MilestoneStatusIcon status={milestone.status} />
        </div>
        {showConnector && (
          <div
            className={cn(
              'w-0.5 h-12 mt-1',
              milestone.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
            )}
          />
        )}
      </div>

      <div className="flex-1 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-vista-accent">Week {milestone.week}</span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500">{milestone.targetDate}</span>
        </div>
        <h4 className="font-medium text-gray-900 mt-1">{milestone.title}</h4>
        <p className="text-sm text-gray-600 mt-0.5">{milestone.description}</p>

        {milestone.status === 'in-progress' && (
          <div className="mt-2 space-y-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Progress</span>
              <span>{milestone.progress}%</span>
            </div>
            <Progress value={milestone.progress} className="h-1.5" />
          </div>
        )}

        {milestone.status === 'completed' && milestone.completedDate && (
          <span className="text-xs text-green-600 mt-1 inline-block">
            Completed {milestone.completedDate}
          </span>
        )}
      </div>
    </motion.div>
  )
}

export function ExecutionTimeline({ plan }: ExecutionTimelineProps) {
  type RenderItem =
    | { type: 'phase-header'; phase: Phase }
    | { type: 'cycle-rhythm' }
    | { type: 'milestone'; milestone: ExecutionMilestone; animationIndex: number; showConnector: boolean }

  const items: RenderItem[] = []
  let animationIndex = 0

  PHASES.forEach((phase) => {
    items.push({ type: 'phase-header', phase })
    if (phase.id === 2) items.push({ type: 'cycle-rhythm' })
    const phaseMilestones = plan.milestones.filter(
      (m) => m.week >= phase.weekStart && m.week <= phase.weekEnd
    )
    phaseMilestones.forEach((milestone, idx) => {
      items.push({
        type: 'milestone',
        milestone,
        animationIndex: animationIndex++,
        showConnector: idx < phaseMilestones.length - 1,
      })
    })
  })

  return (
    <Card data-testid="execution-timeline">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">90-Day Execution Timeline</CardTitle>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Current Week</p>
              <p className="text-2xl font-bold text-vista-primary">{plan.currentWeek}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Overall Progress</p>
              <p className="text-2xl font-bold text-vista-primary">{plan.overallProgress}%</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{plan.startDate}</span>
            <span>Week {plan.currentWeek} of {plan.totalWeeks}</span>
            <span>{plan.endDate}</span>
          </div>
          <Progress value={plan.overallProgress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 max-h-[520px] overflow-y-auto pr-2">
          <ParadigmShiftCallout />
          {items.map((item, i) => {
            if (item.type === 'phase-header') {
              return <PhaseHeader key={`phase-${item.phase.id}`} phase={item.phase} />
            }
            if (item.type === 'cycle-rhythm') {
              return <CycleRhythmCallout key="cycle-rhythm" />
            }
            return (
              <MilestoneCard
                key={item.milestone.id}
                milestone={item.milestone}
                animationIndex={item.animationIndex}
                showConnector={item.showConnector}
              />
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
