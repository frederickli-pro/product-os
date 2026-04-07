export type EngineId = 1 | 2 | 3 | 4
export type ActNumber = 1 | 2 | 3 | 4
export type EngineStatus = 'locked' | 'active' | 'completed' | 'available'
export type SDLCStage = 'discovery' | 'design' | 'develop' | 'deploy'

export interface DemoProgress {
  currentEngine: EngineId
  completedEngines: EngineId[]
  currentAct: ActNumber
  completedActs: ActNumber[]
  startedAt: Date | null
  completedAt: Date | null
}

export interface Engine {
  id: EngineId
  name: string
  shortName?: string
  description: string
  status: EngineStatus
  act?: ActNumber
  actNumber?: ActNumber // Alias for backward compatibility
  previewContent?: string
}

export interface SDLCStep {
  stage: SDLCStage
  label: string
  isActive: boolean
  isCompleted: boolean
  contextMessage?: string
}
