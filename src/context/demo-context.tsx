'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { EngineId, ActNumber, DemoProgress, SDLCStage } from '@/types'

interface DemoContextType {
  progress: DemoProgress & {
    currentStage: SDLCStage
    completedStages: SDLCStage[]
  }
  currentSDLCStage: SDLCStage
  completedStages: SDLCStage[]
  setCurrentEngine: (engineId: EngineId) => void
  completeAct: (actNumber: ActNumber) => void
  completeEngine: (engineId: EngineId) => void
  resetProgress: () => void
  advanceSDLCStage: () => void
  isEngineCompleted: (engineId: EngineId) => boolean
  isActCompleted: (actNumber: ActNumber) => boolean
}

const initialProgress: DemoProgress = {
  currentEngine: 1,
  completedEngines: [],
  currentAct: 1,
  completedActs: [],
  startedAt: null,
  completedAt: null,
}

const DemoContext = createContext<DemoContextType | undefined>(undefined)

export function DemoProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<DemoProgress>(initialProgress)
  const [currentSDLCStage, setCurrentSDLCStage] = useState<SDLCStage>('discovery')

  const setCurrentEngine = useCallback((engineId: EngineId) => {
    setProgress(prev => ({
      ...prev,
      currentEngine: engineId,
      startedAt: prev.startedAt || new Date(),
    }))
  }, [])

  const completeAct = useCallback((actNumber: ActNumber) => {
    setProgress(prev => ({
      ...prev,
      completedActs: prev.completedActs.includes(actNumber)
        ? prev.completedActs
        : [...prev.completedActs, actNumber],
    }))
  }, [])

  const completeEngine = useCallback((engineId: EngineId) => {
    setProgress(prev => ({
      ...prev,
      completedEngines: prev.completedEngines.includes(engineId)
        ? prev.completedEngines
        : [...prev.completedEngines, engineId],
    }))
  }, [])

  const resetProgress = useCallback(() => {
    setProgress(initialProgress)
    setCurrentSDLCStage('discovery')
  }, [])

  const advanceSDLCStage = useCallback(() => {
    const stages: SDLCStage[] = ['discovery', 'design', 'develop', 'deploy']
    const currentIndex = stages.indexOf(currentSDLCStage)
    if (currentIndex < stages.length - 1) {
      setCurrentSDLCStage(stages[currentIndex + 1])
    }
  }, [currentSDLCStage])

  const isEngineCompleted = useCallback((engineId: EngineId): boolean => {
    return progress.completedEngines.includes(engineId)
  }, [progress.completedEngines])

  const isActCompleted = useCallback((actNumber: ActNumber): boolean => {
    return progress.completedActs.includes(actNumber)
  }, [progress.completedActs])

  // Derive completed SDLC stages from completed engines
  // Engine 1 = discovery, Engine 2 = design, Engine 3 = develop, Engine 4 = deploy
  const engineToStage: Record<EngineId, SDLCStage> = {
    1: 'discovery',
    2: 'design',
    3: 'develop',
    4: 'deploy'
  }

  const completedStages = progress.completedEngines.map(id => engineToStage[id])

  // Extended progress with computed stage properties
  const extendedProgress = {
    ...progress,
    currentStage: currentSDLCStage,
    completedStages,
  }

  return (
    <DemoContext.Provider
      value={{
        progress: extendedProgress,
        currentSDLCStage,
        completedStages,
        setCurrentEngine,
        completeAct,
        completeEngine,
        resetProgress,
        advanceSDLCStage,
        isEngineCompleted,
        isActCompleted,
      }}
    >
      {children}
    </DemoContext.Provider>
  )
}

export function useDemoContext() {
  const context = useContext(DemoContext)
  if (context === undefined) {
    throw new Error('useDemoContext must be used within a DemoProvider')
  }
  return context
}
