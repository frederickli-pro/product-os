'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { DemoProgress, EngineId, ActNumber, SDLCStage } from '@/types';

interface DemoContextType {
  progress: DemoProgress;
  setCurrentEngine: (engine: EngineId) => void;
  completeAct: (act: ActNumber) => void;
  completeEngine: (engine: EngineId) => void;
  setCurrentStage: (stage: SDLCStage) => void;
  completeStage: (stage: SDLCStage) => void;
  resetProgress: () => void;
  isActCompleted: (act: ActNumber) => boolean;
  isEngineCompleted: (engine: EngineId) => boolean;
  isStageCompleted: (stage: SDLCStage) => boolean;
}

const initialProgress: DemoProgress = {
  currentEngine: 1,
  currentAct: 1,
  completedActs: [],
  completedEngines: [],
  currentStage: 'discovery',
  completedStages: [],
};

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<DemoProgress>(initialProgress);

  const setCurrentEngine = useCallback((engine: EngineId) => {
    const actMap: Record<EngineId, ActNumber> = { 1: 1, 2: 2, 3: 3, 4: 4 };
    const stageMap: Record<EngineId, SDLCStage> = {
      1: 'discovery',
      2: 'design',
      3: 'develop',
      4: 'deploy',
    };
    setProgress((prev) => ({
      ...prev,
      currentEngine: engine,
      currentAct: actMap[engine],
      currentStage: stageMap[engine],
    }));
  }, []);

  const completeAct = useCallback((act: ActNumber) => {
    setProgress((prev) => ({
      ...prev,
      completedActs: prev.completedActs.includes(act)
        ? prev.completedActs
        : [...prev.completedActs, act],
    }));
  }, []);

  const completeEngine = useCallback((engine: EngineId) => {
    setProgress((prev) => ({
      ...prev,
      completedEngines: prev.completedEngines.includes(engine)
        ? prev.completedEngines
        : [...prev.completedEngines, engine],
    }));
  }, []);

  const setCurrentStage = useCallback((stage: SDLCStage) => {
    setProgress((prev) => ({
      ...prev,
      currentStage: stage,
    }));
  }, []);

  const completeStage = useCallback((stage: SDLCStage) => {
    setProgress((prev) => ({
      ...prev,
      completedStages: prev.completedStages.includes(stage)
        ? prev.completedStages
        : [...prev.completedStages, stage],
    }));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(initialProgress);
  }, []);

  const isActCompleted = useCallback(
    (act: ActNumber) => progress.completedActs.includes(act),
    [progress.completedActs]
  );

  const isEngineCompleted = useCallback(
    (engine: EngineId) => progress.completedEngines.includes(engine),
    [progress.completedEngines]
  );

  const isStageCompleted = useCallback(
    (stage: SDLCStage) => progress.completedStages.includes(stage),
    [progress.completedStages]
  );

  return (
    <DemoContext.Provider
      value={{
        progress,
        setCurrentEngine,
        completeAct,
        completeEngine,
        setCurrentStage,
        completeStage,
        resetProgress,
        isActCompleted,
        isEngineCompleted,
        isStageCompleted,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemoContext() {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemoContext must be used within a DemoProvider');
  }
  return context;
}
