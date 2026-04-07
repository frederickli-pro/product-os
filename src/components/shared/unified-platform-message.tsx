'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Link2Off, Brain, ArrowRight, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UnifiedPlatformMessageProps {
  message: string
  className?: string
}

export function UnifiedPlatformMessage({ message, className }: UnifiedPlatformMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'relative overflow-hidden rounded-xl bg-gradient-to-br from-vista-primary via-vista-secondary to-vista-accent p-6 text-white shadow-xl',
        className
      )}
      data-testid="unified-platform-message"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"
        />
      </div>

      <div className="relative">
        {/* Header with icons */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              <Link2Off className="w-5 h-5" />
            </motion.div>
            <ArrowRight className="w-4 h-4 text-white/60" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              <Brain className="w-5 h-5" />
            </motion.div>
            <ArrowRight className="w-4 h-4 text-white/60" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              <CheckCircle2 className="w-5 h-5" />
            </motion.div>
          </div>
        </div>

        {/* Main message */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl font-bold leading-relaxed"
          data-testid="unified-platform-message-text"
        >
          {message}
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-4 h-0.5 bg-gradient-to-r from-white/40 via-white/60 to-white/40 origin-left"
        />
      </div>
    </motion.div>
  )
}
