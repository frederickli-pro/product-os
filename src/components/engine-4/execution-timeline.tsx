'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, Clock, AlertTriangle, Circle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { ExecutionTimelineProps, ExecutionMilestone } from '@/types/governance'

function MilestoneStatusIcon({ status }: { status: ExecutionMilestone['status'] }) {
  const iconMap = {
    completed: <Check className="w-4 h-4 text-white" />,
    'in-progress': <Clock className="w-4 h-4 text-white" />,
    upcoming: <Circle className="w-4 h-4 text-gray-400" />,
    'at-risk': <AlertTriangle className="w-4 h-4 text-white" />,
  }

  return iconMap[status]
}

function MilestoneCard({ milestone, index }: { milestone: ExecutionMilestone, index: number }) {
  const statusColors = {
    completed: 'bg-green-500',
    'in-progress': 'bg-vista-primary',
    upcoming: 'bg-gray-200',
    'at-risk': 'bg-amber-500',
  }

  const statusBorderColors = {
    completed: 'border-green-500',
    'in-progress': 'border-vista-primary ring-4 ring-vista-light',
    upcoming: 'border-gray-300',
    'at-risk': 'border-amber-500',
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
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
        {index < 9 && (
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
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
          {plan.milestones.map((milestone, index) => (
            <MilestoneCard key={milestone.id} milestone={milestone} index={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
