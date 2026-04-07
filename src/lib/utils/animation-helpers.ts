/**
 * Animation helper utilities for the Portfolio AI Accountability Playbook.
 * Owner: Scenario 10 - Interactive Animations and Transitions
 *
 * Provides reusable Framer Motion animation presets for:
 * - Page transitions
 * - PRD/Epic transformation animations
 * - Progress bar animations
 * - Hover state reveals
 * - Collapsible section animations
 *
 * Uses GPU-accelerated transforms for 60fps performance.
 */

import { Variants, Transition, TargetAndTransition } from 'framer-motion';

// ============================================================================
// Transition Presets - Optimized for smooth 60fps performance
// ============================================================================

/**
 * Standard easing curves for consistent feel
 */
export const easings = {
  /** Smooth ease-out for natural deceleration */
  smooth: [0.4, 0, 0.2, 1] as const,
  /** Bouncy ease for playful interactions */
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  /** Sharp ease for quick snaps */
  sharp: [0.4, 0, 0.6, 1] as const,
  /** Linear for progress animations */
  linear: [0, 0, 1, 1] as const,
  /** Anticipation ease - slight pullback before motion */
  anticipate: [0.36, 0, 0.66, -0.56] as const,
};

/**
 * Optimized spring configurations
 */
export const springs = {
  /** Gentle spring for subtle movements */
  gentle: { type: 'spring' as const, stiffness: 120, damping: 20 },
  /** Snappy spring for quick interactions */
  snappy: { type: 'spring' as const, stiffness: 300, damping: 30 },
  /** Bouncy spring for playful elements */
  bouncy: { type: 'spring' as const, stiffness: 400, damping: 25 },
  /** Stiff spring for instant feedback */
  stiff: { type: 'spring' as const, stiffness: 500, damping: 35 },
};

// ============================================================================
// Page Transition Variants
// ============================================================================

/**
 * Variants for page-level transitions between engines
 */
export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: 'blur(4px)',
  },
  enter: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.4,
      ease: easings.smooth,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(4px)',
    transition: {
      duration: 0.3,
      ease: easings.sharp,
    },
  },
};

/**
 * Fade transition for subtle content changes
 */
export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

/**
 * Slide transition for navigation animations
 */
export const slideVariants = {
  fromRight: {
    initial: { opacity: 0, x: 100 },
    enter: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easings.smooth } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.3, ease: easings.sharp } },
  },
  fromLeft: {
    initial: { opacity: 0, x: -100 },
    enter: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easings.smooth } },
    exit: { opacity: 0, x: 100, transition: { duration: 0.3, ease: easings.sharp } },
  },
  fromTop: {
    initial: { opacity: 0, y: -50 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easings.smooth } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3, ease: easings.sharp } },
  },
  fromBottom: {
    initial: { opacity: 0, y: 50 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easings.smooth } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3, ease: easings.sharp } },
  },
};

// ============================================================================
// Transformation Animation Variants (PRD/Epic generation)
// ============================================================================

/**
 * Main transformation animation for roadmap item -> PRD -> Epic
 * Uses scale, rotation, and glow effects for engaging visual feedback
 */
export const transformationVariants: Variants = {
  initial: {
    scale: 1,
    opacity: 1,
    rotateY: 0,
    boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)',
  },
  morphing: {
    scale: [1, 0.95, 1.05, 0.98, 1],
    rotateY: [0, -5, 5, -2, 0],
    boxShadow: [
      '0 0 0 0 rgba(59, 130, 246, 0)',
      '0 0 30px 10px rgba(59, 130, 246, 0.3)',
      '0 0 60px 20px rgba(59, 130, 246, 0.5)',
      '0 0 30px 10px rgba(59, 130, 246, 0.3)',
      '0 0 0 0 rgba(59, 130, 246, 0)',
    ],
    transition: {
      duration: 1.2,
      ease: easings.smooth,
      times: [0, 0.2, 0.5, 0.8, 1],
    },
  },
  completed: {
    scale: 1,
    opacity: 1,
    rotateY: 0,
    boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)',
    transition: {
      duration: 0.3,
      ease: easings.smooth,
    },
  },
};

/**
 * Particle burst effect for transformation completion
 */
export const particleBurstVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: (i: number) => ({
    scale: [0, 1, 0],
    opacity: [0, 1, 0],
    x: [0, Math.cos((i * Math.PI) / 4) * 100],
    y: [0, Math.sin((i * Math.PI) / 4) * 100],
    transition: {
      duration: 0.8,
      delay: i * 0.02,
      ease: easings.smooth,
    },
  }),
};

/**
 * Loading spinner animation for transformation in progress
 */
export const spinnerVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

/**
 * Pulse animation for loading states
 */
export const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ============================================================================
// Progress Bar Animations
// ============================================================================

/**
 * Progress bar fill animation
 */
export const progressBarVariants: Variants = {
  initial: { width: 0, opacity: 0 },
  animate: (targetWidth: number) => ({
    width: `${targetWidth}%`,
    opacity: 1,
    transition: {
      width: { duration: 0.8, ease: easings.smooth },
      opacity: { duration: 0.2 },
    },
  }),
};

/**
 * Shimmer effect for progress bars
 */
export const shimmerVariants: Variants = {
  animate: {
    x: ['-100%', '200%'],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
      repeatDelay: 1,
    },
  },
};

/**
 * Step indicator animation for SDLC stepper
 */
export const stepIndicatorVariants: Variants = {
  inactive: {
    scale: 1,
    backgroundColor: 'rgb(229, 231, 235)',
    color: 'rgb(107, 114, 128)',
  },
  active: {
    scale: 1.15,
    backgroundColor: 'rgb(37, 99, 235)',
    color: 'rgb(255, 255, 255)',
    boxShadow: '0 0 0 4px rgba(37, 99, 235, 0.2)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
  completed: {
    scale: 1,
    backgroundColor: 'rgb(34, 197, 94)',
    color: 'rgb(255, 255, 255)',
    transition: {
      duration: 0.3,
    },
  },
};

// ============================================================================
// Hover State Animations
// ============================================================================

/**
 * Hover reveal animation for traceability data
 */
export const hoverRevealVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
    scale: 0.95,
  },
  hover: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: easings.smooth,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: easings.sharp,
    },
  },
};

/**
 * Interactive card hover effect
 */
export const cardHoverVariants: Variants = {
  initial: {
    y: 0,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  hover: {
    y: -4,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: {
      duration: 0.2,
      ease: easings.smooth,
    },
  },
};

/**
 * Tooltip animation
 */
export const tooltipVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
    y: 5,
  },
  enter: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.15,
      ease: easings.smooth,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 5,
    transition: {
      duration: 0.1,
      ease: easings.sharp,
    },
  },
};

// ============================================================================
// Collapsible Section Animations
// ============================================================================

/**
 * Accordion/collapsible section animation
 */
export const collapseVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: easings.smooth },
      opacity: { duration: 0.2 },
    },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.3, ease: easings.smooth },
      opacity: { duration: 0.3, delay: 0.1 },
    },
  },
};

/**
 * Chevron rotation for expand/collapse indicators
 */
export const chevronVariants: Variants = {
  collapsed: { rotate: 0 },
  expanded: { rotate: 90, transition: { duration: 0.2, ease: easings.smooth } },
};

/**
 * Stagger children animation for lists
 */
export const staggerContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

export const staggerItemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: easings.smooth },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 },
  },
};

// ============================================================================
// Navigation Animations
// ============================================================================

/**
 * Engine quadrant entrance animation
 */
export const quadrantVariants: Variants = {
  initial: (i: number) => ({
    opacity: 0,
    scale: 0.9,
    x: i % 2 === 0 ? -30 : 30,
    y: i < 2 ? -30 : 30,
  }),
  enter: (i: number) => ({
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: easings.smooth,
    },
  }),
};

/**
 * Breadcrumb navigation animation
 */
export const breadcrumbVariants: Variants = {
  initial: { opacity: 0, x: -10 },
  enter: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, ease: easings.smooth },
  },
  exit: {
    opacity: 0,
    x: 10,
    transition: { duration: 0.15 },
  },
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Creates a stagger delay based on index
 */
export const getStaggerDelay = (index: number, baseDelay = 0.05): number => {
  return index * baseDelay;
};

/**
 * Creates CSS transition string for non-Framer elements
 */
export const createTransition = (
  properties: string[],
  duration = 300,
  easing: keyof typeof easings = 'smooth'
): string => {
  const easingValue = easings[easing].join(', ');
  return properties
    .map((prop) => `${prop} ${duration}ms cubic-bezier(${easingValue})`)
    .join(', ');
};

/**
 * Optimized transform for GPU acceleration
 * Prefer translate3d and scale3d for 60fps performance
 */
export const gpuAcceleratedTransform = {
  willChange: 'transform, opacity',
  transform: 'translate3d(0, 0, 0)',
  backfaceVisibility: 'hidden' as const,
};

/**
 * Creates hover animation props for motion elements
 */
export const createHoverAnimation = (
  scale = 1.02,
  shadow = true
): { whileHover: TargetAndTransition; transition: Transition } => ({
  whileHover: {
    scale,
    ...(shadow && {
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    }),
  },
  transition: springs.snappy,
});

/**
 * Creates tap animation props for buttons
 */
export const createTapAnimation = (scale = 0.98): { whileTap: TargetAndTransition } => ({
  whileTap: { scale },
});

/**
 * Prefers reduced motion check for accessibility
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Gets animation variants respecting reduced motion preference
 */
export const getAccessibleVariants = <T extends Variants>(
  variants: T,
  reducedVariants?: Partial<T>
): T => {
  if (prefersReducedMotion() && reducedVariants) {
    return { ...variants, ...reducedVariants };
  }
  return variants;
};

// ============================================================================
// Animation Timing Constants
// ============================================================================

export const ANIMATION_DURATIONS = {
  instant: 100,
  fast: 200,
  normal: 300,
  slow: 500,
  verySlow: 800,
  transformation: 1200,
} as const;

export const STAGGER_DELAYS = {
  tight: 0.03,
  normal: 0.05,
  relaxed: 0.1,
  lazy: 0.15,
} as const;
