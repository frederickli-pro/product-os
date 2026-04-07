'use client';

/**
 * PRD and epic transformation animation component.
 * Owner: Scenario 10 - Interactive Animations and Transitions
 *
 * Features:
 * - Framer Motion animated transition for PRD generation
 * - Visual morphing effect from roadmap item to PRD/Epic
 * - 60fps smooth animation with GPU acceleration
 * - Particle burst effects on completion
 * - Accessible reduced motion support
 */

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FileText, Layers, Sparkles, Zap, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  transformationVariants,
  pulseVariants,
  spinnerVariants,
  easings,
  springs,
  ANIMATION_DURATIONS,
} from '@/lib/utils/animation-helpers';

// Types
export type TransformationType = 'prd' | 'epic';

export interface TransformationSource {
  id: string;
  name: string;
  description: string;
  confidenceScore?: number;
  priority?: number;
}

export interface TransformationAnimationProps {
  /** Source item being transformed */
  sourceItem: TransformationSource;
  /** Target type of transformation */
  targetType: TransformationType;
  /** Whether animation is currently active */
  isAnimating: boolean;
  /** Callback when animation completes */
  onComplete?: () => void;
  /** Custom duration in ms (default: 1500) */
  duration?: number;
  /** Custom class names */
  className?: string;
}

// Particle configuration for burst effect
const PARTICLE_COUNT = 8;
const PARTICLE_COLORS = [
  'rgba(59, 130, 246, 0.8)',   // blue
  'rgba(139, 92, 246, 0.8)',   // purple
  'rgba(16, 185, 129, 0.8)',   // emerald
  'rgba(245, 158, 11, 0.8)',   // amber
];

/**
 * Particle component for burst effect
 */
function Particle({ index, isActive }: { index: number; isActive: boolean }) {
  const angle = (index / PARTICLE_COUNT) * Math.PI * 2;
  const distance = 80 + Math.random() * 40;
  const color = PARTICLE_COLORS[index % PARTICLE_COLORS.length];
  const size = 6 + Math.random() * 6;

  return (
    <motion.div
      initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
      animate={
        isActive
          ? {
              scale: [0, 1.5, 0],
              x: [0, Math.cos(angle) * distance],
              y: [0, Math.sin(angle) * distance],
              opacity: [0, 1, 0],
            }
          : { scale: 0, opacity: 0 }
      }
      transition={{
        duration: 0.7,
        delay: index * 0.03,
        ease: easings.smooth,
      }}
      className="absolute"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
        left: '50%',
        top: '50%',
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      data-testid={`particle-${index}`}
    />
  );
}

/**
 * Progress ring animation component
 */
function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 4,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      className="absolute -rotate-90"
      data-testid="progress-ring"
    >
      {/* Background ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(59, 130, 246, 0.2)"
        strokeWidth={strokeWidth}
      />
      {/* Progress ring */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="url(#progressGradient)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.5, ease: easings.smooth }}
        style={{
          strokeDasharray: circumference,
        }}
      />
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Morphing icon that transitions between states
 */
function MorphingIcon({
  targetType,
  phase,
}: {
  targetType: TransformationType;
  phase: 'idle' | 'transforming' | 'complete';
}) {
  const iconVariants = {
    idle: { scale: 1, rotate: 0 },
    transforming: {
      scale: [1, 1.2, 1],
      rotate: [0, 360],
      transition: {
        scale: { duration: 1, repeat: Infinity },
        rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
      },
    },
    complete: {
      scale: [1.3, 1],
      transition: { duration: 0.3, ease: easings.bounce },
    },
  };

  const Icon = phase === 'complete' ? CheckCircle2 : targetType === 'prd' ? FileText : Layers;
  const colorClass =
    phase === 'complete' ? 'text-emerald-500' : phase === 'transforming' ? 'text-white' : 'text-vista-primary';

  return (
    <motion.div
      variants={iconVariants}
      animate={phase}
      className={cn('flex items-center justify-center', colorClass)}
      data-testid="morphing-icon"
    >
      <Icon className="w-12 h-12" />
    </motion.div>
  );
}

/**
 * Main transformation animation component
 */
export function TransformationAnimation({
  sourceItem,
  targetType,
  isAnimating,
  onComplete,
  duration = ANIMATION_DURATIONS.transformation,
  className,
}: TransformationAnimationProps) {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<'idle' | 'transforming' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);
  const [showParticles, setShowParticles] = useState(false);

  // Animation phases
  const runAnimation = useCallback(() => {
    if (prefersReducedMotion) {
      // Reduced motion: skip to completion quickly
      setPhase('transforming');
      setTimeout(() => {
        setPhase('complete');
        setProgress(100);
        onComplete?.();
      }, 300);
      return;
    }

    // Full animation sequence
    setPhase('transforming');
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 100 / (duration / 50);
        if (next >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return next;
      });
    }, 50);

    // Trigger completion
    setTimeout(() => {
      setShowParticles(true);
      setPhase('complete');

      // Hide particles after burst
      setTimeout(() => {
        setShowParticles(false);
        onComplete?.();
      }, 800);
    }, duration);

    return () => clearInterval(progressInterval);
  }, [duration, onComplete, prefersReducedMotion]);

  useEffect(() => {
    if (isAnimating) {
      runAnimation();
    } else {
      setPhase('idle');
      setProgress(0);
      setShowParticles(false);
    }
  }, [isAnimating, runAnimation]);

  // Stage-specific messaging
  const getStageMessage = () => {
    if (phase === 'complete') {
      return targetType === 'prd'
        ? 'PRD Generated Successfully!'
        : 'Epic Structure Ready!';
    }
    if (phase === 'transforming') {
      const stages = targetType === 'prd'
        ? [
            'Analyzing requirements...',
            'Generating acceptance criteria...',
            'Defining edge cases...',
            'Adding technical constraints...',
            'Finalizing PRD structure...',
          ]
        : [
            'Parsing PRD sections...',
            'Creating user stories...',
            'Generating test scenarios...',
            'Building code scaffolds...',
            'Establishing traceability...',
          ];
      const stageIndex = Math.min(Math.floor(progress / 20), stages.length - 1);
      return stages[stageIndex];
    }
    return `Ready to generate ${targetType === 'prd' ? 'PRD' : 'Epic'}`;
  };

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center min-h-[400px] rounded-2xl',
        'bg-gradient-to-br from-vista-light via-blue-50 to-purple-50',
        'border border-vista-accent/30',
        'overflow-hidden',
        className
      )}
      data-testid="transformation-animation"
      data-animating={isAnimating}
      data-phase={phase}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 opacity-50"
        animate={
          phase === 'transforming'
            ? {
                background: [
                  'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)',
                  'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)',
                  'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)',
                  'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)',
                ],
              }
            : {}
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Central animation container */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        variants={transformationVariants}
        initial="initial"
        animate={phase === 'transforming' ? 'morphing' : phase === 'complete' ? 'completed' : 'initial'}
      >
        {/* Progress ring */}
        {phase !== 'idle' && <ProgressRing progress={progress} size={140} strokeWidth={6} />}

        {/* Central icon container */}
        <motion.div
          className={cn(
            'relative w-28 h-28 rounded-full flex items-center justify-center',
            'shadow-lg',
            phase === 'complete'
              ? 'bg-gradient-to-br from-emerald-400 to-emerald-600'
              : phase === 'transforming'
              ? 'bg-gradient-to-br from-vista-primary to-vista-secondary'
              : 'bg-white border-2 border-vista-accent/30'
          )}
          animate={
            phase === 'transforming'
              ? {
                  boxShadow: [
                    '0 0 20px rgba(59, 130, 246, 0.3)',
                    '0 0 40px rgba(59, 130, 246, 0.5)',
                    '0 0 20px rgba(59, 130, 246, 0.3)',
                  ],
                }
              : {}
          }
          transition={{
            duration: 1,
            repeat: phase === 'transforming' ? Infinity : 0,
          }}
          data-testid="animation-center"
        >
          <MorphingIcon targetType={targetType} phase={phase} />

          {/* Particle burst on completion */}
          {showParticles &&
            Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
              <Particle key={i} index={i} isActive={showParticles} />
            ))}
        </motion.div>
      </motion.div>

      {/* Status text */}
      <motion.div
        className="mt-8 text-center z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h3
          className={cn(
            'text-xl font-bold mb-2',
            phase === 'complete' ? 'text-emerald-600' : 'text-vista-primary'
          )}
          key={getStageMessage()}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          data-testid="animation-status"
        >
          {getStageMessage()}
        </motion.h3>

        <p className="text-gray-600 text-sm max-w-xs">
          {phase === 'transforming' ? (
            <>Transforming <span className="font-medium text-vista-primary">{sourceItem.name}</span></>
          ) : phase === 'complete' ? (
            'Transformation complete with full traceability'
          ) : (
            `Click to transform into ${targetType === 'prd' ? 'a structured PRD' : 'epic/story structure'}`
          )}
        </p>

        {/* Progress percentage */}
        {phase === 'transforming' && (
          <motion.div
            className="mt-4 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Zap className="w-4 h-4 text-vista-accent" />
            <span className="text-sm font-mono text-vista-primary" data-testid="progress-percentage">
              {Math.round(progress)}%
            </span>
          </motion.div>
        )}

        {/* Success indicator */}
        {phase === 'complete' && (
          <motion.div
            className="mt-4 flex items-center justify-center gap-2 text-emerald-600"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={springs.bouncy}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Ready for review</span>
          </motion.div>
        )}
      </motion.div>

      {/* Source item preview */}
      <motion.div
        className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200/60"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        data-testid="source-preview"
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold',
              'bg-gradient-to-br from-vista-primary to-vista-secondary text-white'
            )}
          >
            {sourceItem.priority || '#'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-gray-900 truncate">{sourceItem.name}</p>
            <p className="text-xs text-gray-500 truncate">{sourceItem.description}</p>
          </div>
          {sourceItem.confidenceScore && (
            <div className="text-right">
              <p className="text-sm font-bold text-emerald-600">{sourceItem.confidenceScore}%</p>
              <p className="text-xs text-gray-500">confidence</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Inline transformation trigger button with animation
 */
export function TransformationTrigger({
  label,
  icon: Icon = Sparkles,
  onClick,
  isLoading,
  className,
}: {
  label: string;
  icon?: React.ElementType;
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={isLoading}
      className={cn(
        'flex items-center justify-center gap-2 px-6 py-3',
        'bg-gradient-to-r from-vista-primary to-vista-secondary',
        'text-white rounded-xl font-medium text-sm',
        'shadow-lg hover:shadow-xl',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transition-shadow duration-200',
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      data-testid="transformation-trigger"
    >
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Sparkles className="w-4 h-4" />
        </motion.div>
      ) : (
        <Icon className="w-4 h-4" />
      )}
      {label}
      {!isLoading && <Sparkles className="w-4 h-4" />}
    </motion.button>
  );
}

export default TransformationAnimation;
