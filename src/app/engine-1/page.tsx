'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SDLCStepper } from '@/components/dashboard/sdlc-stepper'
import { EvidenceExplorer } from '@/components/engine-1/evidence-explorer'
import { MaturityAssessment } from '@/components/engine-1/maturity-assessment'
import { GapAnalysis } from '@/components/engine-1/gap-analysis'
import { BenchmarkComparison } from '@/components/engine-1/benchmark-comparison'
import { TransitionPrompt } from '@/components/shared/transition-prompt'
import { Button } from '@/components/ui/button'
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
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-vista-light" data-testid="engine-1-page">
      <header className="vista-gradient text-white py-6">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-white/20 p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Engine 1: Diagnostic</h1>
              <p className="text-vista-light">Act 1 - &ldquo;Where we actually are&rdquo;</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <SDLCStepper
            currentStage="discovery"
            completedStages={[]}
            contextMessage="Current-state assessment in progress"
          />
        </motion.div>

        <div className="mt-6 grid grid-cols-12 gap-6">
          <motion.div
            className="col-span-12 lg:col-span-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
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
            transition={{ delay: 0.2 }}
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
            transition={{ delay: 0.3 }}
          >
            <GapAnalysis gaps={gapAnalysisData} />
          </motion.div>
        </div>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <BenchmarkComparison benchmark={benchmarkData} />
        </motion.div>

        <TransitionPrompt
          message="Diagnosis complete. Now see how priorities emerge from this evidence."
          nextHref="/engine-2"
          nextLabel="Continue to Engine 2"
        />
      </div>
    </main>
  )
}
