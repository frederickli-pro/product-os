'use client'

import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/header'
import { SDLCStepper } from '@/components/dashboard/sdlc-stepper'
import { RoadmapItems } from '@/components/engine-3/roadmap-items'
import { PRDViewer } from '@/components/engine-3/prd-viewer'
import { EpicStructure } from '@/components/engine-3/epic-structure'
import { MetricsTable } from '@/components/engine-3/metrics-table'
import { TransitionPrompt } from '@/components/shared/transition-prompt'
import { CalloutMessage } from '@/components/shared/callout-message'
import { UnifiedPlatformMessage } from '@/components/shared/unified-platform-message'
import { Button } from '@/components/ui/button'
import { Layers, Sparkles } from 'lucide-react'
import {
  roadmapItems as initialRoadmapItems,
  schedulingCompliancePRD,
  schedulingComplianceEpic,
  timeReductionMetrics,
  calloutMessages
} from '@/data/mock/prd-templates'
import { RoadmapItem } from '@/types/prd'

type ViewMode = 'roadmap' | 'prd' | 'epic'

export default function Engine3Page() {
  const router = useRouter()
  const [roadmapItems, setRoadmapItems] = useState(initialRoadmapItems)
  const [selectedItem, setSelectedItem] = useState<RoadmapItem | null>(roadmapItems[0])
  const [viewMode, setViewMode] = useState<ViewMode>('roadmap')
  const [isTransforming, setIsTransforming] = useState(false)

  const handleSelectItem = useCallback((item: RoadmapItem) => {
    setSelectedItem(item)
    if (item.status !== 'pending') {
      setViewMode('prd')
    } else {
      setViewMode('roadmap')
    }
  }, [])

  const handleGeneratePRD = useCallback((item: RoadmapItem) => {
    setIsTransforming(true)

    // Simulate PRD generation animation
    setTimeout(() => {
      setRoadmapItems(prev => prev.map(i =>
        i.id === item.id
          ? { ...i, status: 'prd_generated', linkedPRD: schedulingCompliancePRD }
          : i
      ))
      setSelectedItem(prev =>
        prev?.id === item.id
          ? { ...prev, status: 'prd_generated', linkedPRD: schedulingCompliancePRD }
          : prev
      )
      setViewMode('prd')
      setIsTransforming(false)
    }, 1500)
  }, [])

  const handleGenerateEpic = useCallback(() => {
    setIsTransforming(true)

    // Simulate Epic generation animation
    setTimeout(() => {
      setRoadmapItems(prev => prev.map(i =>
        i.id === selectedItem?.id
          ? { ...i, status: 'epic_generated', linkedEpic: schedulingComplianceEpic }
          : i
      ))
      setSelectedItem(prev =>
        prev
          ? { ...prev, status: 'epic_generated', linkedEpic: schedulingComplianceEpic }
          : prev
      )
      setViewMode('epic')
      setIsTransforming(false)
    }, 1500)
  }, [selectedItem])

  const handleContinue = () => {
    router.push('/engine-4')
  }

  const showPRD = viewMode === 'prd' && selectedItem?.linkedPRD
  const showEpic = viewMode === 'epic' && selectedItem?.linkedEpic

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50" data-testid="engine-3-page">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Engine 3: Execution
          </h1>
          <p className="text-gray-600">
            Transform prioritized decisions into shipped product — Act 3
          </p>
        </motion.div>

        {/* SDLC Stepper */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <SDLCStepper
            currentStage="develop"
            completedStages={['discovery', 'design']}
            contextMessage="Prioritization reasoning carried from Engine 2"
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* Left Panel - Roadmap Items */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="col-span-4"
          >
            <RoadmapItems
              items={roadmapItems}
              selectedItem={selectedItem}
              onSelectItem={handleSelectItem}
              onGeneratePRD={handleGeneratePRD}
            />
          </motion.div>

          {/* Center/Right Panel - Dynamic Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-8"
          >
            <AnimatePresence mode="wait">
              {/* Transformation Animation */}
              {isTransforming && (
                <motion.div
                  key="transforming"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="h-[600px] flex items-center justify-center bg-gradient-to-br from-vista-light to-blue-50 rounded-xl border border-vista-accent/30"
                  data-testid="transformation-animation"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{
                        rotate: 360,
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
                        scale: { duration: 1, repeat: Infinity }
                      }}
                      className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-vista-primary to-vista-accent flex items-center justify-center text-white"
                    >
                      <Sparkles className="w-10 h-10" />
                    </motion.div>
                    <p className="text-lg font-semibold text-vista-primary">
                      {viewMode === 'roadmap' ? 'Generating PRD...' : 'Generating Epic Structure...'}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Transforming decision into actionable artifacts
                    </p>
                  </div>
                </motion.div>
              )}

              {/* PRD View */}
              {!isTransforming && showPRD && (
                <motion.div
                  key="prd"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <PRDViewer
                    prd={selectedItem.linkedPRD!}
                    collaborationEnabled={true}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 flex justify-center"
                  >
                    <Button
                      onClick={handleGenerateEpic}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
                      data-testid="generate-epic-button"
                    >
                      <Layers className="w-5 h-5" />
                      Generate Epic Structure
                      <Sparkles className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              {/* Epic View */}
              {!isTransforming && showEpic && (
                <motion.div
                  key="epic"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <EpicStructure epic={selectedItem.linkedEpic!} />
                </motion.div>
              )}

              {/* Default View - Roadmap selected but no PRD yet */}
              {!isTransforming && !showPRD && !showEpic && (
                <motion.div
                  key="default"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-[600px] flex items-center justify-center bg-gray-50 rounded-xl border border-gray-200"
                >
                  <div className="text-center max-w-md">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-vista-light flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-vista-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Select an item to transform
                    </h3>
                    <p className="text-gray-600">
                      Click on a priority item from the roadmap, then click &quot;Generate PRD&quot; to transform it into a structured PRD with acceptance criteria, edge cases, and technical constraints.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Callout Message - "Many frameworks stop" */}
        {(showPRD || showEpic) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <CalloutMessage
              message={calloutMessages.frameworksStop}
              variant="highlight"
            />
          </motion.div>
        )}

        {/* Metrics Table */}
        {(showPRD || showEpic) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <MetricsTable metrics={timeReductionMetrics} />
          </motion.div>
        )}

        {/* Unified Platform Message */}
        {(showPRD || showEpic) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-6"
          >
            <UnifiedPlatformMessage message={calloutMessages.unifiedPlatform} />
          </motion.div>
        )}

        {/* Transition Prompt */}
        {showEpic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <TransitionPrompt
              message="Execution artifacts ready. Now see how governance persists after you leave."
              nextHref="/engine-4"
              nextLabel="Continue to Engine 4"
            />
          </motion.div>
        )}
      </main>
    </div>
  )
}
