'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { EngineId, ActNumber, DemoProgress, SDLCStage } from '@/types'

interface DemoContextType {
  progress: DemoProgress
  currentSDLCStage: SDLCStage
  setCurrentEngine: (engineId: EngineId) => void
  completeAct: (actNumber: ActNumber) => void
  completeEngine: (engineId: EngineId) => void
  resetProgress: () => void
  advanceSDLCStage: () => void
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

  return (
    <DemoContext.Provider
      value={{
        progress,
        currentSDLCStage,
        setCurrentEngine,
        completeAct,
        completeEngine,
        resetProgress,
        advanceSDLCStage,
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
