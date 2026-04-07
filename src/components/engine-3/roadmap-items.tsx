'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  ChevronRight,
  Zap,
  Target,
  Sparkles
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, formatPercentage } from '@/lib/utils'
import { RoadmapItem } from '@/types/prd'

interface RoadmapItemsProps {
  items: RoadmapItem[]
  selectedItem: RoadmapItem | null
  onSelectItem: (item: RoadmapItem) => void
  onGeneratePRD: (item: RoadmapItem) => void
}

export function RoadmapItems({
  items,
  selectedItem,
  onSelectItem,
  onGeneratePRD,
}: RoadmapItemsProps) {
  return (
    <Card className="h-full bg-white/95 backdrop-blur-sm border-gray-200/60 shadow-lg" data-testid="roadmap-items">
      <CardHeader className="pb-3 border-b border-gray-100">
        <CardTitle className="text-lg flex items-center gap-2 text-vista-primary">
          <Target className="w-5 h-5" />
          Prioritized Roadmap
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Items traceable to Engine 2 prioritization decisions
        </p>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <AnimatePresence mode="wait">
          {items.map((item, index) => {
            const isSelected = selectedItem?.id === item.id
            const hasGeneratedPRD = item.status !== 'pending'

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                data-testid={`roadmap-item-${item.id}`}
                data-priority={item.priority}
                onClick={() => onSelectItem(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onSelectItem(item)}
                className={cn(
                  'w-full text-left p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer',
                  isSelected
                    ? 'border-vista-accent bg-gradient-to-r from-vista-light to-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-vista-accent/50 hover:bg-gray-50/80'
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={cn(
                          'inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shadow-sm',
                          item.priority === 1
                            ? 'bg-gradient-to-br from-vista-primary to-vista-secondary text-white'
                            : item.priority === 2
                            ? 'bg-gradient-to-br from-vista-accent to-blue-400 text-white'
                            : 'bg-gray-200 text-gray-700'
                        )}
                        data-testid={`priority-badge-${item.id}`}
                      >
                        {item.priority}
                      </span>
                      <span
                        className="font-semibold text-sm text-gray-900"
                        data-testid={`roadmap-item-name-${item.id}`}
                      >
                        {item.name}
                      </span>
                      {hasGeneratedPRD && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
                          <Sparkles className="w-3 h-3" />
                          PRD Generated
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 ml-9 mb-2">
                      {item.description}
                    </p>

                    <div className="ml-9 space-y-1">
                      {item.reasoning.slice(0, 2).map((reason, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 text-xs text-gray-600"
                          data-testid={`reasoning-${item.id}-${idx}`}
                        >
                          <Zap className="w-3 h-3 text-vista-accent" />
                          {reason}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="text-right">
                      <div
                        className={cn(
                          'text-xl font-bold tabular-nums',
                          item.confidenceScore >= 80
                            ? 'text-emerald-600'
                            : item.confidenceScore >= 60
                            ? 'text-amber-600'
                            : 'text-rose-600'
                        )}
                        data-testid={`confidence-score-${item.id}`}
                      >
                        {formatPercentage(item.confidenceScore)}
                      </div>
                      <div className="text-xs text-muted-foreground">confidence</div>
                    </div>
                    <ChevronRight
                      className={cn(
                        'w-5 h-5 transition-transform duration-300',
                        isSelected
                          ? 'text-vista-primary rotate-90'
                          : 'text-gray-400'
                      )}
                    />
                  </div>
                </div>

                {isSelected && !hasGeneratedPRD && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onGeneratePRD(item)
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3
                        bg-gradient-to-r from-vista-primary to-vista-secondary
                        text-white rounded-lg font-medium text-sm
                        hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                      data-testid={`generate-prd-button-${item.id}`}
                    >
                      <FileText className="w-4 h-4" />
                      Generate PRD
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
