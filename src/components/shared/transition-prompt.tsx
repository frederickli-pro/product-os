'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TransitionPromptProps {
  message: string;
  onContinue: () => void;
  className?: string;
}

export function TransitionPrompt({ message, onContinue, className }: TransitionPromptProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={cn(
        'bg-gradient-to-r from-vista-blue/10 to-vista-blue/5 rounded-lg p-6 border border-vista-blue/20',
        className
      )}
      data-testid="transition-prompt"
    >
      <p className="text-lg font-medium text-gray-800 mb-4" data-testid="transition-message">
        {message}
      </p>
      <Button onClick={onContinue} className="group">
        Continue to next phase
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </motion.div>
  );
}
