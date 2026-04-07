import { EngineId, EngineStatus, ActNumber } from './index'

export interface EngineQuadrantProps {
  engine: {
    id: EngineId
    name: string
    description: string
    status: EngineStatus
    act: ActNumber
  }
  isActive: boolean
  isCompleted: boolean
  onClick?: () => void
}

export interface SDLCStepperProps {
  currentStage: 'discovery' | 'design' | 'develop' | 'deploy'
  completedStages: string[]
  contextMessage?: string
}

export interface WelcomeOverlayProps {
  isOpen: boolean
  onClose: () => void
  onStartDemo: () => void
}
