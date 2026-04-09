'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/header'
import { SDLCStepper } from '@/components/dashboard/sdlc-stepper'
import { EvidenceExplorer } from '@/components/engine-1/evidence-explorer'
import { MaturityAssessment } from '@/components/engine-1/maturity-assessment'
import { GapAnalysis } from '@/components/engine-1/gap-analysis'
import { BenchmarkComparison } from '@/components/engine-1/benchmark-comparison'
import { TransitionPrompt } from '@/components/shared/transition-prompt'
import {
  interviews,
  npsResponses,
  npsDistribution,
  supportTickets,
  supportBreakdown,
  usageAnalytics,
  maturityScores,
  gapAnalysisData,
  benchmarkData,
} from '@/data/mock/engine-1-data'

export default function Engine1Page() {
  return (
    <div className="min-h-screen bg-gray-50" data-testid="engine-1-page">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Engine 1: Diagnostic
          </h1>
          <p className="text-gray-600">
            Act 1 — &ldquo;Where we actually are&rdquo;
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <SDLCStepper
            currentStage="discovery"
            completedStages={[]}
            contextMessage="Current-state assessment in progress"
          />
        </motion.div>

        <div className="grid grid-cols-12 gap-6 mb-6">
          <motion.div
            className="col-span-12 lg:col-span-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <EvidenceExplorer
              interviews={interviews}
              npsResponses={npsResponses}
              npsDistribution={npsDistribution}
              supportTickets={supportTickets}
              supportBreakdown={supportBreakdown}
              usageAnalytics={usageAnalytics}
            />
          </motion.div>

          <motion.div
            className="col-span-12 lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <MaturityAssessment
              scores={maturityScores}
              benchmark={benchmarkData}
            />
          </motion.div>

          <motion.div
            className="col-span-12 lg:col-span-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GapAnalysis gaps={gapAnalysisData} />
          </motion.div>
        </div>

        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <BenchmarkComparison benchmark={benchmarkData} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <TransitionPrompt
            message="Diagnosis complete. Now see how priorities emerge from this evidence."
            nextHref="/engine-2"
            nextLabel="Continue to Engine 2"
          />
        </motion.div>
      </main>
    </div>
  )
}
