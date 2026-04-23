'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/header'
import { SDLCStepper } from '@/components/dashboard/sdlc-stepper'
import { KPIDashboard } from '@/components/engine-4/kpi-dashboard'
import { ExecutionTimeline } from '@/components/engine-4/execution-timeline'
import { EscalationQueue } from '@/components/engine-4/escalation-queue'
import { OrgReadiness } from '@/components/engine-4/org-readiness'
import { PortfolioIntelligence } from '@/components/engine-4/portfolio-intelligence'
import { Card, CardContent } from '@/components/ui/card'
import {
  kpiMetrics,
  executionPlan,
  escalationItems,
  portfolioPatterns,
  sharedLearnings,
  successRates,
  compoundingIntelligence,
  anchorMessage,
  unifiedPlatformMessage,
  sdlcContextMessage,
} from '@/data/mock/engine-4-data'

export default function Engine4Page() {
  const handleEscalationAction = (itemId: string, action: string) => {
    console.log(`Action "${action}" taken on item ${itemId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50" data-testid="engine-4-page">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Engine 4: Governance
          </h1>
          <p className="text-gray-600">
            KPI-driven governance with cross-portfolio intelligence — Act 4
          </p>
        </motion.div>

        {/* SDLC Stepper - All Complete with Deploy Active */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <SDLCStepper
            currentStage="deploy"
            completedStages={['discovery', 'design', 'develop']}
            contextMessage={sdlcContextMessage}
          />
        </motion.div>

        {/* Top Section: 90-Day Execution Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <ExecutionTimeline plan={executionPlan} />
        </motion.div>

        {/* Middle Section: KPI Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <KPIDashboard metrics={kpiMetrics} />
        </motion.div>

        {/* Bottom Section: Escalation Queue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <EscalationQueue
            items={escalationItems}
            onAction={handleEscalationAction}
          />
        </motion.div>

        {/* Org Readiness / Change Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mb-6"
        >
          <OrgReadiness />
        </motion.div>

        {/* Portfolio Intelligence Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <PortfolioIntelligence
            patterns={portfolioPatterns}
            learnings={sharedLearnings}
            successRates={successRates}
            compounding={compoundingIntelligence}
          />
        </motion.div>

        {/* Anchor Line Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          <Card className="bg-vista-primary text-white" data-testid="anchor-message">
            <CardContent className="p-8 text-center">
              <p className="text-xl font-medium italic leading-relaxed">
                "{anchorMessage}"
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Unified Platform Value Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="border-2 border-vista-accent" data-testid="unified-platform-summary">
            <CardContent className="p-6 text-center">
              <p className="text-lg font-semibold text-vista-primary">
                {unifiedPlatformMessage}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
