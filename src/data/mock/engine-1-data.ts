import {
  Interview,
  NPSResponse,
  NPSDistribution,
  SupportTicket,
  SupportTicketBreakdown,
  UsageAnalytics,
  MaturityScore,
  GapAnalysis,
  BenchmarkData,
} from '@/types/evidence'

export const interviews: Interview[] = [
  {
    id: 'int-001',
    participant: 'Sarah Chen',
    role: 'Operations Manager',
    date: '2024-02-15',
    excerpts: [
      {
        id: 'exc-001',
        text: 'We spend hours every week reconciling scheduling data between our flight management system and the compliance reports. It\'s completely manual and error-prone.',
        theme: 'pain_point',
        thematicTags: ['scheduling fragmentation', 'manual processes', 'compliance visibility'],
        sentiment: 'detractor',
      },
    ],
  },
  {
    id: 'int-002',
    participant: 'Michael Torres',
    role: 'Compliance Officer',
    date: '2024-02-16',
    excerpts: [
      {
        id: 'exc-002',
        text: 'The mobile app is basically useless when I\'m on the tarmac. I need real-time updates but the experience is terrible on phones.',
        theme: 'pain_point',
        thematicTags: ['mobile limitations', 'real-time updates'],
        sentiment: 'detractor',
      },
    ],
  },
  {
    id: 'int-003',
    participant: 'Jennifer Walsh',
    role: 'Fleet Coordinator',
    date: '2024-02-17',
    excerpts: [
      {
        id: 'exc-003',
        text: 'I love the scheduling module - it\'s intuitive and has saved our team significant time. If only the rest of the platform worked as well.',
        theme: 'positive_feedback',
        thematicTags: ['scheduling strength', 'user experience'],
        sentiment: 'promoter',
      },
    ],
  },
  {
    id: 'int-004',
    participant: 'David Kim',
    role: 'VP of Operations',
    date: '2024-02-18',
    excerpts: [
      {
        id: 'exc-004',
        text: 'We\'ve been asking for AI-powered anomaly detection for over a year. Our competitors are already offering it. We\'re falling behind.',
        theme: 'feature_request',
        thematicTags: ['AI assistance', 'competitive exposure', 'feature request'],
        sentiment: 'passive',
      },
    ],
  },
  {
    id: 'int-005',
    participant: 'Lisa Martinez',
    role: 'Customer Success Manager',
    date: '2024-02-19',
    excerpts: [
      {
        id: 'exc-005',
        text: 'Our enterprise customers keep asking for better API integrations. They want to connect Horizon with their existing ERP systems but it\'s a nightmare.',
        theme: 'opportunity',
        thematicTags: ['integration depth', 'enterprise requirements', 'API gaps'],
        sentiment: 'passive',
      },
    ],
  },
  {
    id: 'int-006',
    participant: 'Robert Chang',
    role: 'Safety Manager',
    date: '2024-02-20',
    excerpts: [
      {
        id: 'exc-006',
        text: 'The compliance reporting is solid, but I wish there was a unified view where I could see scheduling conflicts that might affect safety protocols.',
        theme: 'opportunity',
        thematicTags: ['compliance visibility', 'unified view', 'safety integration'],
        sentiment: 'passive',
      },
    ],
  },
  {
    id: 'int-007',
    participant: 'Amanda Foster',
    role: 'Training Coordinator',
    date: '2024-02-21',
    excerpts: [
      {
        id: 'exc-007',
        text: 'Customer support has been excellent - they really understand our industry. That\'s what keeps us loyal despite some product gaps.',
        theme: 'positive_feedback',
        thematicTags: ['customer support', 'industry expertise'],
        sentiment: 'promoter',
      },
    ],
  },
  {
    id: 'int-008',
    participant: 'James Wilson',
    role: 'IT Director',
    date: '2024-02-22',
    excerpts: [
      {
        id: 'exc-008',
        text: 'The analytics dashboard could be so much more powerful. We\'re missing out on insights that could help optimize our operations.',
        theme: 'opportunity',
        thematicTags: ['analytics expansion', 'optimization potential'],
        sentiment: 'passive',
      },
    ],
  },
  {
    id: 'int-009',
    participant: 'Patricia Lee',
    role: 'Operations Analyst',
    date: '2024-02-23',
    excerpts: [
      {
        id: 'exc-009',
        text: 'When the scheduling system has conflicts, we have no visibility into how that impacts our compliance deadlines. It\'s all disconnected.',
        theme: 'pain_point',
        thematicTags: ['scheduling conflicts', 'compliance visibility', 'data silos'],
        sentiment: 'detractor',
      },
    ],
  },
  {
    id: 'int-010',
    participant: 'Kevin Brown',
    role: 'Pilot Scheduler',
    date: '2024-02-24',
    excerpts: [
      {
        id: 'exc-010',
        text: 'I appreciate how the system handles crew rotations. Once we got everyone trained, it became second nature.',
        theme: 'positive_feedback',
        thematicTags: ['scheduling strength', 'crew management'],
        sentiment: 'promoter',
      },
    ],
  },
]

export const npsResponses: NPSResponse[] = [
  {
    id: 'nps-001',
    score: 9,
    category: 'promoter',
    verbatim: 'Scheduling module is best-in-class. Customer support really understands aviation operations.',
    themes: ['ease of use', 'customer support'],
    customerTenure: 36,
    productUsageDepth: 'heavy',
    timestamp: '2024-02-01',
  },
  {
    id: 'nps-002',
    score: 8,
    category: 'promoter',
    verbatim: 'Reliable platform for our core flight operations. Would love to see more AI features.',
    themes: ['reliability', 'feature requests'],
    customerTenure: 24,
    productUsageDepth: 'heavy',
    timestamp: '2024-02-05',
  },
  {
    id: 'nps-003',
    score: 7,
    category: 'passive',
    verbatim: 'Good product but the mobile experience needs serious work. Hard to use in the field.',
    themes: ['mobile experience'],
    customerTenure: 18,
    productUsageDepth: 'moderate',
    timestamp: '2024-02-08',
  },
  {
    id: 'nps-004',
    score: 6,
    category: 'passive',
    verbatim: 'Integration with our existing systems is painful. Takes too long to get data in and out.',
    themes: ['integration gaps'],
    customerTenure: 12,
    productUsageDepth: 'moderate',
    timestamp: '2024-02-10',
  },
  {
    id: 'nps-005',
    score: 5,
    category: 'detractor',
    verbatim: 'Compliance reporting is disconnected from scheduling. We waste hours on manual reconciliation.',
    themes: ['integration gaps', 'manual processes'],
    customerTenure: 30,
    productUsageDepth: 'heavy',
    timestamp: '2024-02-12',
  },
  {
    id: 'nps-006',
    score: 4,
    category: 'detractor',
    verbatim: 'Mobile app crashes constantly. Not usable for our field teams at all.',
    themes: ['mobile experience', 'reliability'],
    customerTenure: 8,
    productUsageDepth: 'light',
    timestamp: '2024-02-15',
  },
]

export const npsDistribution: NPSDistribution = {
  promoters: 34,
  passives: 41,
  detractors: 25,
  score: 9,
  topPositiveThemes: ['ease of use', 'customer support', 'scheduling reliability'],
  topNegativeThemes: ['mobile experience', 'integration gaps', 'compliance visibility'],
  quarterOverQuarterChange: -3,
}

export const supportTickets: SupportTicket[] = [
  {
    id: 'tkt-001',
    category: 'scheduling_conflicts',
    priority: 'high',
    resolutionTime: 18,
    satisfactionScore: 4,
    escalated: false,
    description: 'Crew scheduling overlap not detected by system validation',
  },
  {
    id: 'tkt-002',
    category: 'compliance_reporting',
    priority: 'critical',
    resolutionTime: 3,
    satisfactionScore: 5,
    escalated: true,
    description: 'FAA compliance report missing required flight hour data',
  },
  {
    id: 'tkt-003',
    category: 'mobile_access',
    priority: 'medium',
    resolutionTime: 48,
    satisfactionScore: 3,
    escalated: false,
    description: 'Mobile app not syncing with main system after update',
  },
]

export const supportBreakdown: SupportTicketBreakdown = {
  categories: {
    scheduling_conflicts: 47,
    compliance_reporting: 23,
    mobile_access: 18,
    other: 12,
  },
  resolutionTimes: {
    critical: 4,
    high: 24,
    medium: 72,
    low: 168,
  },
  escalationRates: {
    scheduling_conflicts: 15,
    compliance_reporting: 28,
    mobile_access: 8,
    other: 5,
  },
}

export const usageAnalytics: UsageAnalytics = {
  featureAdoption: {
    scheduling: 89,
    compliance: 67,
    mobile_app: 45,
    api_integrations: 23,
  },
  engagementFunnel: {
    onboardingCompletion: 72,
    coreFeatureActivation: 58,
    advancedFeatureAdoption: 31,
  },
  sessionMetrics: {
    averageDuration: 28,
    weeklyFrequency: 4.2,
  },
  powerUserCriteria: {
    dailyActive: true,
    featuresUsed: 5,
  },
  churnRiskIndicators: [
    'Declining login frequency over 30 days',
    'Mobile app uninstalls increasing 15%',
    'Support ticket volume up 22% QoQ',
    'Low adoption of new compliance features',
  ],
}

export const maturityScores: MaturityScore = {
  customerDiscoveryDepth: 42,
  roadmapClarity: 55,
  executionVelocity: 61,
  governanceRigor: 38,
  overallScore: 49,
  percentileRanking: 35,
  industryComparison: 'Below average for aviation SaaS companies, comparable to early-stage B2B platforms',
}

export const gapAnalysisData: GapAnalysis[] = [
  {
    id: 'gap-001',
    area: 'Limited customer research cadence',
    description: 'Customer interviews conducted only quarterly, missing real-time feedback loops and emerging pain points.',
    severity: 'high',
    recommendation: 'Establish monthly customer interview program with rolling NPS tracking and automated sentiment analysis.',
  },
  {
    id: 'gap-002',
    area: 'Unclear prioritization methodology',
    description: 'Roadmap decisions lack explicit scoring criteria, leading to feature creep and misaligned resources.',
    severity: 'critical',
    recommendation: 'Implement weighted scoring framework with clear criteria: revenue impact, churn risk, competitive exposure, technical enabler status.',
  },
  {
    id: 'gap-003',
    area: 'Inconsistent documentation practices',
    description: 'PRDs and technical specs vary in quality and completeness, causing engineering rework and delays.',
    severity: 'medium',
    recommendation: 'Standardize PRD templates with mandatory sections: acceptance criteria, edge cases, technical constraints, success metrics.',
  },
  {
    id: 'gap-004',
    area: 'Reactive project management',
    description: 'Teams operate in firefighting mode with limited visibility into upcoming milestones and dependencies.',
    severity: 'high',
    recommendation: 'Deploy 90-day execution planning with automated weekly progress tracking and escalation triggers.',
  },
]

export const benchmarkData: BenchmarkData = {
  companyName: '[Portfolio Co]',
  scores: maturityScores,
  peerMedian: {
    customerDiscoveryDepth: 58,
    roadmapClarity: 62,
    executionVelocity: 55,
    governanceRigor: 54,
  },
  portfolioSize: 90,
  belowMedianDimensions: ['Customer Discovery Depth', 'Governance Rigor'],
}
