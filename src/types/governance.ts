/**
 * Governance and portfolio types for Engine 4.
 * Owner: Scenario 5 - Governance and Cross-Portfolio
 *
 * Expected exports:
 * - KPI interface with metrics and trends
 * - ExecutionPlan with milestones
 * - EscalationItem with context
 * - PortfolioPattern with cross-company insights
 */

export interface KPIMetric {
  id: string
  name: string
  description: string
  currentValue: number
  targetValue: number
  unit: string
  trend: 'up' | 'down' | 'stable'
  trendHistory: number[]
  linkedReasoning: PrioritizationReason
}

export interface PrioritizationReason {
  id: string
  initiative: string
  reasoning: string
  factors: {
    revenueImpact: number
    churnRiskReduction: number
    competitiveExposure: number
    technicalEnabler: number
    strategicAlignment: number
  }
  confidenceScore: number
}

export interface ExecutionMilestone {
  id: string
  week: number
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'upcoming' | 'at-risk'
  completedDate?: string
  targetDate: string
  progress: number
}

export interface ExecutionPlan {
  id: string
  name: string
  startDate: string
  endDate: string
  totalWeeks: number
  currentWeek: number
  overallProgress: number
  milestones: ExecutionMilestone[]
}

export interface EscalationItem {
  id: string
  initiative: string
  stalledSince: string
  weeksStalled: number
  reason: string
  impact: 'high' | 'medium' | 'low'
  context: string
  suggestedAction: string
  assignedTo: string
}

export interface PortfolioPattern {
  id: string
  category: string
  pattern: string
  prevalence: number
  affectedVerticals: string[]
  description: string
}

export interface SharedLearning {
  id: string
  source: string
  insight: string
  impact: string
  approach: string
  applicability: string[]
}

export interface SuccessRate {
  id: string
  initiativeType: string
  onTimeRate: number
  totalCount: number
  successCount: number
  description: string
}

export interface CompoundingIntelligence {
  documentedPatterns: number
  provenPlaybooks: number
  industryTemplates: number
  growthRate: number
}

export interface PortfolioIntelligence {
  patterns: PortfolioPattern[]
  learnings: SharedLearning[]
  successRates: SuccessRate[]
  compounding: CompoundingIntelligence
}

export interface KPIDashboardProps {
  metrics: KPIMetric[]
}

export interface ExecutionTimelineProps {
  plan: ExecutionPlan
}

export interface EscalationQueueProps {
  items: EscalationItem[]
  onAction?: (itemId: string, action: string) => void
}

export interface PortfolioIntelligenceProps {
  patterns: PortfolioPattern[]
  learnings: SharedLearning[]
  successRates: SuccessRate[]
  compounding: CompoundingIntelligence
}
