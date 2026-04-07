'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, Clock, ArrowRight, User } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { EscalationQueueProps, EscalationItem } from '@/types/governance'

function ImpactBadge({ impact }: { impact: EscalationItem['impact'] }) {
  const colors = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-amber-100 text-amber-700 border-amber-200',
    low: 'bg-blue-100 text-blue-700 border-blue-200',
  }

  return (
    <span
      className={cn(
        'px-2 py-0.5 text-xs font-medium rounded-full border',
        colors[impact]
      )}
    >
      {impact.charAt(0).toUpperCase() + impact.slice(1)} Impact
    </span>
  )
}

function EscalationCard({
  item,
  index,
  onAction
}: {
  item: EscalationItem
  index: number
  onAction?: (itemId: string, action: string) => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      data-testid={`escalation-item-${item.id}`}
    >
      <Card className={cn(
        'border-l-4',
        item.impact === 'high' && 'border-l-red-500',
        item.impact === 'medium' && 'border-l-amber-500',
        item.impact === 'low' && 'border-l-blue-500'
      )}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className={cn(
                  'w-5 h-5',
                  item.impact === 'high' && 'text-red-500',
                  item.impact === 'medium' && 'text-amber-500',
                  item.impact === 'low' && 'text-blue-500'
                )} />
                <h4 className="font-medium text-gray-900">{item.initiative}</h4>
                <ImpactBadge impact={item.impact} />
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Stalled {item.weeksStalled}+ weeks
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {item.assignedTo}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Reason:</span> {item.reason}
              </p>

              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <span className="font-medium">Context:</span> {item.context}
              </p>
            </div>

            <div className="flex flex-col gap-2 min-w-[180px]">
              <div className="text-xs text-gray-500 mb-1">Suggested Action:</div>
              <p className="text-sm text-vista-primary font-medium mb-2">
                {item.suggestedAction}
              </p>
              <Button
                size="sm"
                className="w-full"
                onClick={() => onAction?.(item.id, 'take-action')}
              >
                Take Action
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => onAction?.(item.id, 'acknowledge')}
              >
                Acknowledge
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function EscalationQueue({ items, onAction }: EscalationQueueProps) {
  return (
    <div className="space-y-4" data-testid="escalation-queue">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Escalation Queue</h2>
        <span className="text-sm text-gray-500">
          Items stalled for 2+ weeks with context and action buttons
        </span>
      </div>

      {items.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No escalations at this time</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <EscalationCard
              key={item.id}
              item={item}
              index={index}
              onAction={onAction}
            />
          ))}
        </div>
      )}
    </div>
  )
}
