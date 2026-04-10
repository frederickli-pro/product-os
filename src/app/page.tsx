'use client';

/**
 * Dashboard Hub - Main landing page for the Product Operating System.
 * Owner: Scenario 1 - Dashboard Hub Navigation
 *
 * Features:
 * - Four engine quadrants in 2x2 grid layout
 * - Welcome overlay for first-time users
 * - SDLC progress stepper
 * - Progress bar indicator
 * - Jump to engine navigation
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Layers, Sparkles } from 'lucide-react';
import { EngineQuadrant } from '@/components/dashboard/engine-quadrant';
import { WelcomeOverlay } from '@/components/dashboard/welcome-overlay';
import { ProgressBar } from '@/components/dashboard/progress-bar';
import { SDLCStepper } from '@/components/dashboard/sdlc-stepper';
import { useDemoContext } from '@/context/demo-context';
import { engines } from '@/data/mock/engines';
import { EngineId, SDLCStage } from '@/types';
import { getPEFirmName } from '@/lib/utils/env-config';

export default function DashboardHub() {
  const router = useRouter();
  const {
    progress,
    currentSDLCStage,
    completedStages,
    setCurrentEngine,
    isEngineCompleted,
  } = useDemoContext();

  const [showWelcome, setShowWelcome] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  const handleEngineClick = (engineId: EngineId) => {
    setCurrentEngine(engineId);
    router.push(`/engine-${engineId}`);
  };

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    setIsFirstVisit(false);
  };

  const handleStartDemo = () => {
    setShowWelcome(false);
    setIsFirstVisit(false);
    handleEngineClick(1);
  };

  const isEngineActive = (engineId: EngineId): boolean => {
    return progress.currentEngine === engineId;
  };

  // Get context message based on current state
  const getContextMessage = (): string => {
    if (progress.completedEngines.length === 0) {
      return 'Start with Engine 1 to begin your diagnostic assessment';
    }
    if (progress.completedEngines.length === 4) {
      return 'From discovery to deployment — one shared context, zero handoff loss';
    }
    const stageMessages: Record<SDLCStage, string> = {
      discovery: 'Current-state assessment in progress',
      design: 'Diagnostic insights inform prioritization',
      develop: 'Prioritization reasoning carried to execution',
      deploy: 'Governance connected to every upstream decision',
    };
    return stageMessages[currentSDLCStage];
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vista-blue text-white">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold">Product AI Operating System</h1>
                <p className="text-xs text-muted-foreground">Portfolio AI Accountability Playbook</p>
              </div>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-sm text-muted-foreground">Powered by</p>
              <p className="text-sm font-semibold">{getPEFirmName()} Value Creation</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* SDLC Stepper */}
        <section>
          <SDLCStepper
            currentStage={currentSDLCStage}
            completedStages={completedStages}
            contextMessage={getContextMessage()}
          />
        </section>

        {/* Progress Bar */}
        <section>
          <ProgressBar
            completedActs={progress.completedActs}
            currentAct={progress.currentAct}
          />
        </section>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-6"
        >
          <h2 className="text-3xl font-bold mb-4">
            The Four-Engine Operating System
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From customer insight to customer outcomes, much faster.
            One platform. Empowered teams. Shared context. Complete lifecycle.
          </p>
        </motion.section>

        {/* Engine Quadrants - 2x2 Grid */}
        <section
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          data-testid="engine-grid"
        >
          {engines.map((engine) => (
            <EngineQuadrant
              key={engine.id}
              engine={engine}
              isActive={isEngineActive(engine.id)}
              isCompleted={isEngineCompleted(engine.id)}
              onClick={handleEngineClick}
              showStartHere={engine.id === 1 && isFirstVisit && progress.completedEngines.length === 0}
            />
          ))}
        </section>

        {/* Value Proposition */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-8 border-t"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-vista-blue" />
            <span className="text-sm font-medium text-vista-blue uppercase tracking-wide">
              Unified Platform
            </span>
          </div>
          <p className="text-lg font-medium max-w-3xl mx-auto">
            &ldquo;Every PE firm has playbooks. Yours can have a system that executes
            those playbooks — and gets smarter every time it runs.&rdquo;
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            One platform. 90+ portfolio companies. Compounding intelligence with every engagement.
          </p>
        </motion.section>
      </div>

      {/* Welcome Overlay */}
      <WelcomeOverlay
        isOpen={showWelcome}
        onClose={handleCloseWelcome}
        onStartDemo={handleStartDemo}
      />
    </main>
  );
}
