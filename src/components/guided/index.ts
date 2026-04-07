/**
 * Guided Walkthrough Components
 * Owner: Scenario 7 - Guided Walkthrough Features
 *
 * This module exports all guided walkthrough components including:
 * - StartHere: Entry point for first-time users
 * - ContinuePrompt: Navigation prompts at transitions
 * - HighlightAnimation: Attention animations for interactive elements
 * - ContextualHelp: Help icons with tooltips and expandable panels
 * - TourMode: Step-by-step guided walkthrough
 * - Breadcrumbs: Visual navigation breadcrumbs
 */

export { StartHere, type StartHereProps } from './start-here'

export {
  ContinuePrompt,
  type ContinuePromptProps,
} from './continue-prompt'

export {
  HighlightAnimation,
  useHighlightManager,
  type HighlightAnimationProps,
  type HighlightStyle,
} from './highlight-animation'

export {
  ContextualHelp,
  demoHelpContent,
  type ContextualHelpProps,
  type HelpContent,
} from './contextual-help'

export {
  TourMode,
  TourProvider,
  TourStartButton,
  useTourMode,
  demoTourSteps,
  type TourModeProps,
  type TourStep,
} from './tour-mode'

export {
  Breadcrumbs,
  CompactBreadcrumbs,
  type BreadcrumbsProps,
  type BreadcrumbItem,
} from './breadcrumbs'
