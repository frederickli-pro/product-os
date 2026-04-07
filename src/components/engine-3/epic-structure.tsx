'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import {
  Layers,
  GripVertical,
  CheckCircle2,
  Circle,
  PlayCircle,
  TestTube,
  Code2,
  Link2,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Sparkles
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Epic, Story, TestScenario, CodeScaffold } from '@/types/prd'

interface EpicStructureProps {
  epic: Epic
  onStoryReorder?: (stories: Story[]) => void
}

function StoryCard({ story, index }: { story: Story; index: number }) {
  const statusConfig = {
    backlog: { icon: Circle, bg: 'bg-gray-100', text: 'text-gray-600', label: 'Backlog' },
    in_progress: { icon: PlayCircle, bg: 'bg-blue-100', text: 'text-blue-600', label: 'In Progress' },
    done: { icon: CheckCircle2, bg: 'bg-emerald-100', text: 'text-emerald-600', label: 'Done' }
  }

  const { icon: StatusIcon, bg, text, label } = statusConfig[story.status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
      data-testid={`story-${story.id}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 text-gray-400 hover:text-gray-600 cursor-grab">
          <GripVertical className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-vista-primary text-white text-xs font-bold"
              data-testid={`story-points-${story.id}`}
            >
              {story.points}
            </span>
            <span className="font-medium text-sm text-gray-900 truncate" data-testid={`story-title-${story.id}`}>
              {story.title}
            </span>
          </div>

          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {story.description}
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs', bg, text)}>
              <StatusIcon className="w-3 h-3" />
              {label}
            </span>

            {story.traceabilityLink && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-700"
                data-testid={`story-traceability-${story.id}`}
              >
                <Link2 className="w-3 h-3" />
                Traced
              </span>
            )}
          </div>

          {story.acceptanceCriteria.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs font-medium text-gray-500 mb-1 block">Acceptance Criteria:</span>
              <ul className="space-y-1">
                {story.acceptanceCriteria.slice(0, 2).map((ac, idx) => (
                  <li key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                    <CheckCircle2 className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-1">{ac}</span>
                  </li>
                ))}
                {story.acceptanceCriteria.length > 2 && (
                  <li className="text-xs text-vista-accent">
                    +{story.acceptanceCriteria.length - 2} more
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function TestScenarioCard({ scenario, index }: { scenario: TestScenario; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const typeConfig = {
    unit: { bg: 'bg-blue-100', text: 'text-blue-700' },
    integration: { bg: 'bg-purple-100', text: 'text-purple-700' },
    e2e: { bg: 'bg-emerald-100', text: 'text-emerald-700' }
  }

  const { bg, text } = typeConfig[scenario.type]

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="p-3 bg-white rounded-lg border border-gray-200"
      data-testid={`test-scenario-${scenario.id}`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-start gap-2 text-left"
      >
        <TestTube className="w-4 h-4 text-vista-accent flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn('text-xs px-1.5 py-0.5 rounded', bg, text)}>
              {scenario.type}
            </span>
            <span className="text-sm font-medium text-gray-900">{scenario.name}</span>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
            )}
          </div>
          <p className="text-xs text-gray-600">{scenario.description}</p>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 pt-3 border-t border-gray-100"
          >
            <div className="space-y-2">
              <div>
                <span className="text-xs font-medium text-gray-500">Steps:</span>
                <ol className="mt-1 space-y-1">
                  {scenario.steps.map((step, idx) => (
                    <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                      <span className="flex-shrink-0 w-4 h-4 rounded-full bg-gray-100 text-gray-600 text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <span className="text-xs font-medium text-gray-500">Expected Outcome:</span>
                <p className="text-xs text-gray-600 mt-1">{scenario.expectedOutcome}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-purple-600" data-testid={`test-traceability-${scenario.id}`}>
                <Link2 className="w-3 h-3" />
                {scenario.traceabilityLink}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function CodeScaffoldCard({ scaffold, index }: { scaffold: CodeScaffold; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="p-3 bg-gray-900 rounded-lg text-white"
      data-testid={`code-scaffold-${scaffold.id}`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-start gap-2 text-left"
      >
        <Code2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-1.5 py-0.5 rounded bg-gray-700 text-gray-300">
              {scaffold.language}
            </span>
            <span className="text-sm font-medium font-mono">{scaffold.filename}</span>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
            )}
          </div>
          <p className="text-xs text-gray-400">{scaffold.description}</p>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 pt-3 border-t border-gray-700"
          >
            <pre className="text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap font-mono bg-gray-800 p-3 rounded">
              {scaffold.codeSnippet}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function EpicStructure({ epic, onStoryReorder }: EpicStructureProps) {
  const [stories, setStories] = useState(epic.stories)
  const progressPercent = epic.totalPoints > 0 ? (epic.completedPoints / epic.totalPoints) * 100 : 0

  const handleReorder = (newOrder: Story[]) => {
    setStories(newOrder)
    onStoryReorder?.(newOrder)
  }

  return (
    <Card className="h-full bg-white/95 backdrop-blur-sm border-gray-200/60 shadow-lg overflow-hidden" data-testid="epic-structure">
      <CardHeader className="pb-3 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2 text-vista-primary">
              <Layers className="w-5 h-5" />
              Epic Structure
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Story-ready format with drag-and-drop reordering
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-vista-primary" data-testid="epic-points">
              {epic.totalPoints} pts
            </div>
            <div className="text-xs text-gray-500">{epic.stories.length} stories</div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
            <span>Progress</span>
            <span>{epic.completedPoints}/{epic.totalPoints} points</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-vista-primary to-vista-accent rounded-full"
            />
          </div>
        </div>

        {/* Traceability */}
        <div className="mt-4 p-3 bg-white/60 rounded-lg border border-gray-200" data-testid="epic-traceability">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-vista-accent" />
            <span className="text-xs font-medium text-gray-700">Traceability to Customer Feedback</span>
          </div>
          <div className="space-y-1 text-xs text-gray-600">
            <div className="flex items-start gap-2">
              <Sparkles className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
              <span data-testid="traceability-feedback">{epic.traceability.customerFeedbackOrigin}</span>
            </div>
            <div className="flex items-start gap-2">
              <Sparkles className="w-3 h-3 text-purple-500 mt-0.5 flex-shrink-0" />
              <span data-testid="traceability-diagnostic">{epic.traceability.diagnosticInsight}</span>
            </div>
            <div className="flex items-start gap-2">
              <Sparkles className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span data-testid="traceability-prioritization">{epic.traceability.prioritizationReason}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-6 max-h-[600px] overflow-y-auto">
        {/* Stories */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-vista-primary" />
            <span className="font-semibold text-sm text-gray-900">User Stories</span>
            <span className="text-xs text-gray-500">({stories.length})</span>
          </div>
          <Reorder.Group
            axis="y"
            values={stories}
            onReorder={handleReorder}
            className="space-y-3"
            data-testid="stories-list"
          >
            {stories.map((story, idx) => (
              <Reorder.Item key={story.id} value={story}>
                <StoryCard story={story} index={idx} />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>

        {/* Test Scenarios */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TestTube className="w-4 h-4 text-vista-accent" />
            <span className="font-semibold text-sm text-gray-900">Test Scenarios</span>
            <span className="text-xs text-gray-500">({epic.testScenarios.length})</span>
          </div>
          <div className="space-y-2" data-testid="test-scenarios-list">
            {epic.testScenarios.map((scenario, idx) => (
              <TestScenarioCard key={scenario.id} scenario={scenario} index={idx} />
            ))}
          </div>
        </div>

        {/* Code Scaffolds */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Code2 className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-sm text-gray-900">Code Scaffolding</span>
            <span className="text-xs text-gray-500">({epic.codeScaffolds.length})</span>
          </div>
          <div className="space-y-2" data-testid="code-scaffolds-list">
            {epic.codeScaffolds.map((scaffold, idx) => (
              <CodeScaffoldCard key={scaffold.id} scaffold={scaffold} index={idx} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
