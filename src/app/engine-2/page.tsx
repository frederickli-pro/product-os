'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { SDLCStepper } from '@/components/dashboard/sdlc-stepper';
import { InitiativesList } from '@/components/engine-2/initiatives-list';
import { ScoringMethodology } from '@/components/engine-2/scoring-methodology';
import { TradeOffAnalysis } from '@/components/engine-2/trade-off-analysis';
import { FeasibilityImpactMatrix } from '@/components/engine-2/feasibility-impact-matrix';
import { StakeholderInput } from '@/components/engine-2/stakeholder-input';
import { ConfidenceIndicators } from '@/components/engine-2/confidence-indicators';
import { TransitionPrompt } from '@/components/shared/transition-prompt';
import {
  initiatives,
  scoringWeights,
  stakeholderInputs,
  confidenceFactors,
  Initiative,
} from '@/data/mock/initiatives';

export default function Engine2Page() {
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(
    initiatives[0]
  );

  return (
    <div className="min-h-screen bg-gray-50" data-testid="engine-2-page">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Engine 2: Prioritization
          </h1>
          <p className="text-gray-600">
            Transparent prioritization with explicit reasoning — Act 2
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <SDLCStepper
            currentStage="design"
            completedStages={['discovery']}
            contextMessage="Diagnostic insights inform prioritization"
          />
        </motion.div>

        <div className="grid grid-cols-12 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="col-span-3"
          >
            <InitiativesList
              initiatives={initiatives}
              selectedInitiative={selectedInitiative}
              onSelectInitiative={setSelectedInitiative}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-5"
          >
            <ScoringMethodology
              weights={scoringWeights}
              selectedInitiative={selectedInitiative}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="col-span-4"
          >
            <TradeOffAnalysis
              initiatives={initiatives}
              selectedInitiative={selectedInitiative}
            />
          </motion.div>
        </div>

        {/* Feasibility × Impact Matrix — full-width row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mb-6"
        >
          <FeasibilityImpactMatrix
            initiatives={initiatives}
            selectedInitiative={selectedInitiative}
            onSelectInitiative={setSelectedInitiative}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <StakeholderInput inputs={stakeholderInputs} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          <ConfidenceIndicators
            dataQuality={confidenceFactors.dataQuality}
            marketValidation={confidenceFactors.marketValidation}
            technicalFeasibility={confidenceFactors.technicalFeasibility}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <TransitionPrompt
            message="Priority set. Now watch the transformation into shipped product."
            nextHref="/engine-3"
          />
        </motion.div>
      </main>
    </div>
  );
}
