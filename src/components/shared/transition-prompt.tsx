'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface TransitionPromptProps {
  message: string
  nextHref?: string
  nextLabel?: string
  onContinue?: () => void // Callback-based navigation support
}

export function TransitionPrompt({ message, nextHref, nextLabel = 'Continue', onContinue }: TransitionPromptProps) {
  const buttonContent = (
    <Button
      variant="secondary"
      className="bg-white text-vista-primary hover:bg-vista-light flex items-center gap-2"
      onClick={onContinue}
    >
      {nextLabel}
      <ArrowRight className="w-4 h-4" />
    </Button>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-8 p-6 bg-gradient-to-r from-vista-primary to-vista-secondary rounded-xl text-white"
      data-testid="transition-prompt"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-medium mb-1">{message}</p>
          <p className="text-sm text-vista-light/80">Click to proceed to the next phase</p>
        </div>
        {nextHref ? (
          <Link href={nextHref}>
            {buttonContent}
          </Link>
        ) : (
          buttonContent
        )}
      </div>
    </motion.div>
  )
}
