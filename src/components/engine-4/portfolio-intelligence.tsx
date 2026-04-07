'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, TrendingUp, BookOpen, Layers, CheckCircle2, ArrowUpRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { PortfolioIntelligenceProps, PortfolioPattern, SharedLearning, SuccessRate } from '@/types/governance'

function PatternCard({ pattern, index }: { pattern: PortfolioPattern, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-4 bg-gray-50 rounded-lg"
      data-testid={`pattern-${pattern.id}`}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900">{pattern.category}</h4>
        <span className="text-lg font-bold text-vista-primary">{pattern.prevalence}%</span>
      </div>
      <p className="text-sm text-gray-600 mb-2">{pattern.description}</p>
      <div className="flex flex-wrap gap-1">
        {pattern.affectedVerticals.map((vertical) => (
          <span
            key={vertical}
            className="px-2 py-0.5 text-xs bg-vista-light text-vista-primary rounded"
          >
            {vertical}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

function LearningCard({ learning, index }: { learning: SharedLearning, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-4 border-l-4 border-vista-accent bg-white rounded-r-lg shadow-sm"
      data-testid={`learning-${learning.id}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="w-4 h-4 text-vista-accent" />
        <span className="text-xs font-medium text-vista-accent">{learning.source}</span>
      </div>
      <p className="text-sm text-gray-700 mb-2">{learning.insight}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-green-600 font-medium flex items-center gap-1">
          <ArrowUpRight className="w-3 h-3" />
          {learning.impact}
        </span>
        <span className="text-xs text-gray-500">{learning.approach}</span>
      </div>
    </motion.div>
  )
}

function SuccessRateBar({ rate, index }: { rate: SuccessRate, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="space-y-2"
      data-testid={`success-rate-${rate.id}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{rate.initiativeType}</span>
        <span className={cn(
          'text-sm font-bold',
          rate.onTimeRate >= 80 ? 'text-green-600' : rate.onTimeRate >= 60 ? 'text-amber-600' : 'text-red-600'
        )}>
          {rate.onTimeRate}% on-time
        </span>
      </div>
      <Progress
        value={rate.onTimeRate}
        className={cn(
          'h-2',
          rate.onTimeRate >= 80 ? '[&>div]:bg-green-500' : rate.onTimeRate >= 60 ? '[&>div]:bg-amber-500' : '[&>div]:bg-red-500'
        )}
      />
      <p className="text-xs text-gray-500">{rate.description}</p>
    </motion.div>
  )
}

export function PortfolioIntelligence({ patterns, learnings, successRates, compounding }: PortfolioIntelligenceProps) {
  return (
    <div className="space-y-6" data-testid="portfolio-intelligence">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Cross-Portfolio Intelligence</h2>
        <span className="text-sm text-vista-accent">
          Patterns across 10-50 portfolio companies
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pattern Recognition */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Layers className="w-5 h-5 text-vista-primary" />
              Pattern Recognition
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {patterns.map((pattern, index) => (
              <PatternCard key={pattern.id} pattern={pattern} index={index} />
            ))}
          </CardContent>
        </Card>

        {/* Shared Learnings Feed */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-vista-primary" />
              Shared Learnings Feed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {learnings.map((learning, index) => (
              <LearningCard key={learning.id} learning={learning} index={index} />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Success Rate Indicators */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-vista-primary" />
            Implementation Success Rates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successRates.map((rate, index) => (
              <SuccessRateBar key={rate.id} rate={rate} index={index} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compounding Intelligence Visualization */}
      <Card className="bg-gradient-to-r from-vista-primary to-vista-secondary text-white" data-testid="compounding-visualization">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2 text-white">
            <TrendingUp className="w-5 h-5" />
            Compounding Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-1">{compounding.documentedPatterns}</div>
              <div className="text-sm text-vista-light">Documented Patterns</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-1">{compounding.provenPlaybooks}</div>
              <div className="text-sm text-vista-light">Proven Playbooks</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-1">{compounding.industryTemplates}</div>
              <div className="text-sm text-vista-light">Industry-Specific Templates</div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
