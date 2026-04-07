'use client';

import { useDemoContext } from '@/context/demo-context';
import { EngineId } from '@/types';

export function useDemoProgress() {
  const {
    progress,
    setCurrentEngine,
    completeAct,
    completeEngine,
    isActCompleted,
    isEngineCompleted,
  } = useDemoContext();

  const navigateToEngine = (engine: EngineId) => {
    setCurrentEngine(engine);
  };

  const completeCurrentAct = () => {
    completeAct(progress.currentAct);
  };

  const completeCurrentEngine = () => {
    completeEngine(progress.currentEngine);
  };

  const getProgressPercentage = () => {
    return (progress.completedActs.length / 4) * 100;
  };

  const canAccessEngine = (engine: EngineId): boolean => {
    if (engine === 1) return true;
    return isEngineCompleted((engine - 1) as EngineId);
  };

  return {
    progress,
    navigateToEngine,
    completeCurrentAct,
    completeCurrentEngine,
    getProgressPercentage,
    canAccessEngine,
    isActCompleted,
    isEngineCompleted,
  };
}
