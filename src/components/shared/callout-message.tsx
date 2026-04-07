'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, Sparkles, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CalloutMessageProps {
  message: string
  variant?: 'highlight' | 'warning' | 'quote'
  className?: string
}

export function CalloutMessage({ message, variant = 'highlight', className }: CalloutMessageProps) {
  const variantStyles = {
    highlight: {
      container: 'bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-amber-300',
      icon: <Sparkles className="w-6 h-6 text-amber-600" />,
      text: 'text-amber-900'
    },
    warning: {
      container: 'bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 border-rose-300',
      icon: <AlertCircle className="w-6 h-6 text-rose-600" />,
      text: 'text-rose-900'
    },
    quote: {
      container: 'bg-gradient-to-r from-vista-light via-blue-50 to-vista-light border-vista-accent',
      icon: <Quote className="w-6 h-6 text-vista-primary" />,
      text: 'text-vista-dark'
    }
  }

  const { container, icon, text } = variantStyles[variant]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={cn(
        'relative overflow-hidden rounded-xl border-2 p-6',
        container,
        className
      )}
      data-testid="callout-message"
    >
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-radial from-current to-transparent rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-radial from-current to-transparent rounded-full translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="relative flex items-start gap-4">
        <motion.div
          initial={{ rotate: -10, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex-shrink-0"
        >
          {icon}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={cn('text-lg font-semibold italic leading-relaxed', text)}
          data-testid="callout-message-text"
        >
          &ldquo;{message}&rdquo;
        </motion.p>
      </div>
    </motion.div>
  )
}
