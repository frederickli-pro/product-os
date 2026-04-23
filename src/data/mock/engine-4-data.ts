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
  name: 'AI-Enabled 90-Day Execution Plan',
  startDate: '2026-03-10',
  endDate: '2026-06-08',
  totalWeeks: 13,
  currentWeek: 4,
  overallProgress: 31,
  milestones: [
    {
      id: 'ms-1',
      week: 1,
      title: 'Problem Shaping & 1-Page PRD',
      description: 'Defined the problem space with stakeholders. One-page brief replaces a months-long spec — enough signal to build, not enough to hide behind.',
      status: 'completed',
      completedDate: '2026-03-17',
      targetDate: '2026-03-17',
      progress: 100,
    },
    {
      id: 'ms-2',
      week: 2,
      title: 'Vibe-Coded Prototype (48h)',
      description: 'AI-assisted working prototype built in 48 hours. Not a mockup — a click-through grounded in real data shapes, fast enough to put in front of customers this week.',
      status: 'completed',
      completedDate: '2026-03-24',
      targetDate: '2026-03-24',
      progress: 100,
    },
    {
      id: 'ms-3',
      week: 3,
      title: 'Customer Validation Sprint (5 sessions)',
      description: 'Five customer sessions watching behavior with the prototype — not asking opinions. Findings reshaped the build backlog before a line of production code was written.',
      status: 'completed',
      completedDate: '2026-03-31',
      targetDate: '2026-03-31',
      progress: 100,
    },
    {
      id: 'ms-4',
      week: 4,
      title: 'Cycle 1: Core Workflow Engine',
      description: '2-week Shape Up cycle hardening validated prototype patterns into production code. Real auth, real error handling, real observability — prototype behavior preserved.',
      status: 'in-progress',
      targetDate: '2026-04-14',
      progress: 60,
    },
    {
      id: 'ms-5',
      week: 6,
      title: 'Cycle 2: Compliance Automation Layer',
      description: '2-week cycle building on the live production increment from Cycle 1. No rework — prototype patterns carry forward into compliance rules engine.',
      status: 'upcoming',
      targetDate: '2026-04-28',
      progress: 0,
    },
    {
      id: 'ms-6',
      week: 8,
      title: 'Cycle 3: AI Copilot Interface',
      description: '2-week cycle. Prototype-informed AI interactions hardened with proper security, prompt guardrails, and fallback handling for production edge cases.',
      status: 'upcoming',
      targetDate: '2026-05-12',
      progress: 0,
    },
    {
      id: 'ms-7',
      week: 10,
      title: 'Customer Demo — Real Production Code',
      description: 'Live demo of production system with real customer data. No staging theater. Weekly validation since week 1 means zero surprises — customers have been shaping this all along.',
      status: 'upcoming',
      targetDate: '2026-05-19',
      progress: 0,
    },
    {
      id: 'ms-8',
      week: 11,
      title: 'Security Audit of AI-Generated Code',
      description: 'Systematic review of AI-generated code: injection risks, secrets management, auth boundaries, and data access patterns. AI writes fast — humans verify before it ships at scale.',
      status: 'upcoming',
      targetDate: '2026-05-26',
      progress: 0,
    },
    {
      id: 'ms-9',
      week: 12,
      title: 'Performance & Load Testing',
      description: 'Production load simulation against real data volumes. SLA validation and bottleneck resolution before general availability.',
      status: 'upcoming',
      targetDate: '2026-06-02',
      progress: 0,
    },
    {
      id: 'ms-10',
      week: 13,
      title: 'Production Launch & Handoff',
      description: 'General availability. Runbooks in place, on-call rotation active, monitoring dashboards live. The prototype that started this journey is now the product.',
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
    category: 'Agentic Workflow Automation',
    pattern: 'Multi-step customer workflows ripe for agentic automation',
    prevalence: 61,
    affectedVerticals: ['B2B SaaS', 'Healthcare', 'Logistics'],
    description: 'Recurring customer workflows — approvals, data reconciliation, cross-system handoffs — are being automated end-to-end by AI agents, eliminating manual steps and reducing cycle time by 40–70%',
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

export const sdlcContextMessage = "Prototype validated. Now hardening for production."
