export interface Interview {
  id: string
  participant: string
  role: string
  date: string
  excerpts: InterviewExcerpt[]
}

export interface InterviewExcerpt {
  id: string
  text: string
  theme: 'pain_point' | 'opportunity' | 'feature_request' | 'positive_feedback'
  thematicTags: string[]
  sentiment: 'promoter' | 'passive' | 'detractor'
}

export interface NPSResponse {
  id: string
  score: number
  category: 'promoter' | 'passive' | 'detractor'
  verbatim: string
  themes: string[]
  customerTenure: number
  productUsageDepth: 'light' | 'moderate' | 'heavy'
  timestamp: string
}

export interface NPSDistribution {
  promoters: number
  passives: number
  detractors: number
  score: number
  topPositiveThemes: string[]
  topNegativeThemes: string[]
  quarterOverQuarterChange: number
}

export interface SupportTicket {
  id: string
  category: 'scheduling_conflicts' | 'compliance_reporting' | 'mobile_access' | 'other'
  priority: 'critical' | 'high' | 'medium' | 'low'
  resolutionTime: number
  satisfactionScore: number
  escalated: boolean
  description: string
}

export interface SupportTicketBreakdown {
  categories: {
    scheduling_conflicts: number
    compliance_reporting: number
    mobile_access: number
    other: number
  }
  resolutionTimes: {
    critical: number
    high: number
    medium: number
    low: number
  }
  escalationRates: Record<string, number>
}

export interface UsageAnalytics {
  featureAdoption: {
    scheduling: number
    compliance: number
    mobile_app: number
    api_integrations: number
  }
  engagementFunnel: {
    onboardingCompletion: number
    coreFeatureActivation: number
    advancedFeatureAdoption: number
  }
  sessionMetrics: {
    averageDuration: number
    weeklyFrequency: number
  }
  powerUserCriteria: {
    dailyActive: boolean
    featuresUsed: number
  }
  churnRiskIndicators: string[]
}

export interface MaturityScore {
  customerDiscoveryDepth: number
  roadmapClarity: number
  executionVelocity: number
  governanceRigor: number
  overallScore: number
  percentileRanking: number
  industryComparison: string
}

export interface GapAnalysis {
  id: string
  area: string
  description: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  recommendation: string
}

export interface BenchmarkData {
  companyName: string
  scores: MaturityScore
  peerMedian: {
    customerDiscoveryDepth: number
    roadmapClarity: number
    executionVelocity: number
    governanceRigor: number
  }
  portfolioSize: number
  belowMedianDimensions: string[]
}

export type EvidenceTab = 'interviews' | 'nps' | 'support' | 'analytics'
