import {
  KPIMetric,
  ExecutionPlan,
  EscalationItem,
  PortfolioPattern,
  SharedLearning,
  SuccessRate,
  CompoundingIntelligence,
  PortfolioIntelligence,
} from '@/types/governance'

export const kpiMetrics: KPIMetric[] = [
  {
    id: 'kpi-1',
    name: 'Platform Unification Progress',
    description: 'Integration completion across scheduling and compliance modules',
    currentValue: 68,
    targetValue: 100,
    unit: '%',
    trend: 'up',
    trendHistory: [45, 52, 58, 63, 68],
    linkedReasoning: {
      id: 'reason-1',
      initiative: 'Unified Scheduling-Compliance Platform',
      reasoning: 'Addresses #1 customer request (47% of support tickets), reduces churn risk by $2.3M ARR',
      factors: {
        revenueImpact: 40,
        churnRiskReduction: 25,
        competitiveExposure: 20,
        technicalEnabler: 10,
        strategicAlignment: 5,
      },
      confidenceScore: 87,
    },
  },
  {
    id: 'kpi-2',
    name: 'Customer Incident Resolution',
    description: 'Average resolution time improvement since platform unification',
    currentValue: 42,
    targetValue: 50,
    unit: '% faster',
    trend: 'up',
    trendHistory: [15, 22, 30, 36, 42],
    linkedReasoning: {
      id: 'reason-1',
      initiative: 'Unified Scheduling-Compliance Platform',
      reasoning: 'Cross-module data flow reduces average incident resolution time by estimated 40%',
      factors: {
        revenueImpact: 40,
        churnRiskReduction: 25,
        competitiveExposure: 20,
        technicalEnabler: 10,
        strategicAlignment: 5,
      },
      confidenceScore: 87,
    },
  },
  {
    id: 'kpi-3',
    name: 'Enterprise Renewal Risk',
    description: 'Top 50 enterprise accounts at risk reduction',
    currentValue: 23,
    targetValue: 8,
    unit: 'accounts',
    trend: 'down',
    trendHistory: [38, 34, 29, 26, 23],
    linkedReasoning: {
      id: 'reason-2',
      initiative: 'Enterprise Retention Program',
      reasoning: 'Direct impact on renewal risk for top 50 accounts representing $X ARR',
      factors: {
        revenueImpact: 35,
        churnRiskReduction: 40,
        competitiveExposure: 15,
        technicalEnabler: 5,
        strategicAlignment: 5,
      },
      confidenceScore: 82,
    },
  },
  {
    id: 'kpi-4',
    name: 'AI Feature Readiness',
    description: 'Horizon API layer preparation for AI capabilities',
    currentValue: 45,
    targetValue: 100,
    unit: '%',
    trend: 'up',
    trendHistory: [0, 12, 25, 35, 45],
    linkedReasoning: {
      id: 'reason-3',
      initiative: 'AI Copilot Capabilities',
      reasoning: 'Horizon platform architecturally ready for AI; prioritization framework now defined',
      factors: {
        revenueImpact: 30,
        churnRiskReduction: 15,
        competitiveExposure: 35,
        technicalEnabler: 15,
        strategicAlignment: 5,
      },
      confidenceScore: 78,
    },
  },
]

export const executionPlan: ExecutionPlan = {
  id: 'plan-90day',
  name: '90-Day Execution Plan',
  startDate: '2026-03-10',
  endDate: '2026-06-08',
  totalWeeks: 13,
  currentWeek: 4,
  overallProgress: 31,
  milestones: [
    {
      id: 'ms-1',
      week: 1,
      title: 'Discovery Complete',
      description: 'Structured discovery across product surfaces completed',
      status: 'completed',
      completedDate: '2026-03-17',
      targetDate: '2026-03-17',
      progress: 100,
    },
    {
      id: 'ms-2',
      week: 2,
      title: 'Maturity Assessment',
      description: 'Scored maturity assessment with gap analysis delivered',
      status: 'completed',
      completedDate: '2026-03-24',
      targetDate: '2026-03-24',
      progress: 100,
    },
    {
      id: 'ms-3',
      week: 3,
      title: 'Prioritization Locked',
      description: 'Roadmap prioritization with explicit reasoning documented',
      status: 'completed',
      completedDate: '2026-03-31',
      targetDate: '2026-03-31',
      progress: 100,
    },
    {
      id: 'ms-4',
      week: 4,
      title: 'PRD Generation Sprint 1',
      description: 'First batch of PRDs for unified scheduling-compliance view',
      status: 'in-progress',
      targetDate: '2026-04-07',
      progress: 65,
    },
    {
      id: 'ms-5',
      week: 5,
      title: 'Engineering Handoff',
      description: 'Epic/story structure ready for engineering intake',
      status: 'upcoming',
      targetDate: '2026-04-14',
      progress: 0,
    },
    {
      id: 'ms-6',
      week: 6,
      title: 'Development Sprint 1',
      description: 'Core integration architecture implementation',
      status: 'upcoming',
      targetDate: '2026-04-21',
      progress: 0,
    },
    {
      id: 'ms-7',
      week: 8,
      title: 'MVP Internal Review',
      description: 'Internal review of scheduling-compliance MVP',
      status: 'upcoming',
      targetDate: '2026-05-05',
      progress: 0,
    },
    {
      id: 'ms-8',
      week: 10,
      title: 'Beta Launch',
      description: 'Beta release to select enterprise customers',
      status: 'upcoming',
      targetDate: '2026-05-19',
      progress: 0,
    },
    {
      id: 'ms-9',
      week: 12,
      title: 'GA Preparation',
      description: 'Final testing and GA preparation',
      status: 'upcoming',
      targetDate: '2026-06-02',
      progress: 0,
    },
    {
      id: 'ms-10',
      week: 13,
      title: 'Full Platform Launch',
      description: 'General availability of unified platform',
      status: 'upcoming',
      targetDate: '2026-06-08',
      progress: 0,
    },
  ],
}

export const escalationItems: EscalationItem[] = [
  {
    id: 'esc-1',
    initiative: 'Mobile Experience Overhaul',
    stalledSince: '2026-03-24',
    weeksStalled: 2,
    reason: 'Resource conflict with platform unification priority',
    impact: 'medium',
    context: 'Mobile adoption at 45% vs target 65%. Feature blocked pending unified API completion.',
    suggestedAction: 'Allocate dedicated mobile resource post-Sprint 1 completion',
    assignedTo: 'VP Engineering',
  },
  {
    id: 'esc-2',
    initiative: 'Compliance Audit Automation',
    stalledSince: '2026-03-17',
    weeksStalled: 3,
    reason: 'Pending regulatory review on automated reporting',
    impact: 'high',
    context: 'Customer compliance deadlines approaching. Manual workarounds in place.',
    suggestedAction: 'Expedite legal/compliance review with external counsel',
    assignedTo: 'General Counsel',
  },
]

export const portfolioPatterns: PortfolioPattern[] = [
  {
    id: 'pattern-1',
    category: 'Integration Complexity',
    pattern: 'Multi-module integration challenges',
    prevalence: 68,
    affectedVerticals: ['B2B SaaS', 'Enterprise Software', 'Aviation'],
    description: 'Common challenge in B2B SaaS portfolio companies with multiple acquired products',
  },
  {
    id: 'pattern-2',
    category: 'Mobile Experience Gaps',
    pattern: 'Native mobile underinvestment',
    prevalence: 52,
    affectedVerticals: ['SaaS', 'Healthcare', 'Logistics'],
    description: 'Mobile adoption lagging desktop usage across portfolio',
  },
  {
    id: 'pattern-3',
    category: 'AI Feature Requests',
    pattern: 'Customer demand for AI-powered features',
    prevalence: 78,
    affectedVerticals: ['All Verticals'],
    description: 'Strong customer pull for AI capabilities across all portfolio companies',
  },
]

export const sharedLearnings: SharedLearning[] = [
  {
    id: 'learning-1',
    source: 'Portco A',
    insight: 'Reduced scheduling integration time by 60% using GraphQL federation approach',
    impact: '60% faster integration',
    approach: 'GraphQL federation with schema stitching',
    applicability: ['Aviation', 'Logistics', 'Healthcare'],
  },
  {
    id: 'learning-2',
    source: 'Portco B',
    insight: 'Implemented cross-module authentication in 2 weeks using OAuth2 with PKCE',
    impact: 'Unified auth across 5 modules',
    approach: 'OAuth2 with PKCE flow standardization',
    applicability: ['Enterprise SaaS', 'Healthcare', 'Financial Services'],
  },
  {
    id: 'learning-3',
    source: 'Portco C',
    insight: 'Reduced compliance reporting time by 75% with automated audit trails',
    impact: '75% time reduction',
    approach: 'Event sourcing with automated compliance snapshots',
    applicability: ['Aviation', 'Healthcare', 'Financial Services'],
  },
]

export const successRates: SuccessRate[] = [
  {
    id: 'sr-1',
    initiativeType: 'Compliance features',
    onTimeRate: 92,
    totalCount: 45,
    successCount: 41,
    description: 'Highest success rate due to clear regulatory requirements',
  },
  {
    id: 'sr-2',
    initiativeType: 'AI capabilities',
    onTimeRate: 67,
    totalCount: 30,
    successCount: 20,
    description: 'Lower success rate reflects emerging technology challenges',
  },
  {
    id: 'sr-3',
    initiativeType: 'Platform unifications',
    onTimeRate: 81,
    totalCount: 22,
    successCount: 18,
    description: 'Strong track record with proven integration playbooks',
  },
]

export const compoundingIntelligence: CompoundingIntelligence = {
  documentedPatterns: 127,
  provenPlaybooks: 34,
  industryTemplates: 8,
  growthRate: 12,
}

export const portfolioIntelligence: PortfolioIntelligence = {
  patterns: portfolioPatterns,
  learnings: sharedLearnings,
  successRates: successRates,
  compounding: compoundingIntelligence,
}

// Anchor messages for Engine 4
export const anchorMessage = "Every PE firm has playbooks. Yours can have a system that executes those playbooks — and gets smarter every time it runs."

export const unifiedPlatformMessage = "One platform. 90+ portfolio companies. Compounding intelligence with every engagement."

export const sdlcContextMessage = "Governance connected to every upstream decision"
