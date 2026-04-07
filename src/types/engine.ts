/**
 * Engine-related type definitions.
 */

import { EngineId, EngineStatus, SDLCStage } from './index';

export interface EngineQuadrantProps {
  engine: {
    id: EngineId;
    name: string;
    shortName: string;
    description: string;
    status: EngineStatus;
  };
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

export interface SDLCStep {
  stage: SDLCStage;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
}

export interface SDLCStepperProps {
  currentStage: SDLCStage;
  completedStages: SDLCStage[];
  contextMessage?: string;
  contextBadge?: string;
}

export interface ProgressBarProps {
  currentAct: number;
  totalActs: number;
  className?: string;
}

export interface WelcomeOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onStartDemo: () => void;
}
