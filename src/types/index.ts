/**
 * Shared type definitions for the Portfolio AI Accountability Playbook.
 *
 * This file contains types used across multiple modules.
 */

export type EngineId = 1 | 2 | 3 | 4;
export type EngineStatus = 'locked' | 'available' | 'active' | 'completed';
export type ActNumber = 1 | 2 | 3 | 4;
export type SDLCStage = 'discovery' | 'design' | 'develop' | 'deploy';

export interface DemoProgress {
  currentEngine: EngineId;
  currentAct: ActNumber;
  completedActs: ActNumber[];
  completedEngines: EngineId[];
  currentStage: SDLCStage;
  completedStages: SDLCStage[];
}

export interface Engine {
  id: EngineId;
  name: string;
  shortName: string;
  description: string;
  status: EngineStatus;
  actNumber: ActNumber;
  previewContent?: string;
}

export interface TransitionPrompt {
  fromEngine: EngineId;
  toEngine: EngineId;
  message: string;
}

export interface ContextBadge {
  label: string;
  description?: string;
}
