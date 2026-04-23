/**
 * Mock data for prioritization initiatives.
 * Used by Engine 2 - Prioritization Reasoning scenario.
 */

export interface ScoringWeight {
  factor: string;
  weight: number;
  description: string;
}

export interface InitiativeScore {
  factor: string;
  score: number;
  maxScore: number;
  reasoning: string;
}

export type AutomationType = 'Full Automation' | 'Co-pilot / Augmented' | 'Human-Led + AI';

export interface Initiative {
  id: string;
  name: string;
  shortName: string;
  description: string;
  priority: number;
  confidenceScore: number;
  confidenceFootnote: string;
  feasibilityScore: number;
  impactScore: number;
  automationType: AutomationType;
  automationFootnote: string;
  scores: InitiativeScore[];
  weightedScore: number;
  reasoning: string[];
  tradeOffs: string[];
  resourceRequirements: {
    engineering: number;
    design: number;
    timeline: string;
  };
  diagnosticLinks: string[];
}

export interface StakeholderInput {
  id: string;
  type: 'customer' | 'board' | 'capacity';
  source: string;
  content: string;
  impact: 'high' | 'medium' | 'low';
  linkedInitiatives: string[];
}

export const scoringWeights: ScoringWeight[] = [
  {
    factor: 'Revenue Impact',
    weight: 40,
    description: 'Potential to drive new revenue or protect existing ARR',
  },
  {
    factor: 'Churn Risk Reduction',
    weight: 25,
    description: 'Ability to reduce customer churn and improve retention',
  },
  {
    factor: 'Competitive Exposure',
    weight: 20,
    description: 'Addresses competitive gaps or creates differentiation',
  },
  {
    factor: 'Technical Enabler',
    weight: 10,
    description: 'Unlocks future capabilities or reduces technical debt',
  },
  {
    factor: 'Strategic Alignment',
    weight: 5,
    description: 'Alignment with board mandate and company vision',
  },
];

export const initiatives: Initiative[] = [
  {
    id: 'init-001',
    name: 'Unified Scheduling-Compliance Platform',
    shortName: 'scheduling-compliance unification',
    description:
      'Integrate scheduling and compliance modules into a unified platform with real-time data flow and automated compliance checking.',
    priority: 1,
    confidenceScore: 87,
    confidenceFootnote: 'Calculated from: 47% of support tickets cite scheduling-compliance friction (14,200 tickets), 3/5 customer interviews validated as #1 pain point, $2.3M ARR churn risk modeled from top-50 enterprise accounts, architecture review confirmed 12-week delivery feasibility.',
    feasibilityScore: 78,
    impactScore: 88,
    automationType: 'Full Automation',
    automationFootnote: 'Compliance checking, data unification, and anomaly flagging run autonomously. EBITDA capture is direct: reduces support volume and manual compliance overhead without requiring headcount-dependent change management.',
    scores: [
      {
        factor: 'Revenue Impact',
        score: 36,
        maxScore: 40,
        reasoning: 'Addresses $2.3M ARR at risk from top 50 enterprise accounts',
      },
      {
        factor: 'Churn Risk Reduction',
        score: 23,
        maxScore: 25,
        reasoning: '47% of support tickets relate to scheduling-compliance friction',
      },
      {
        factor: 'Competitive Exposure',
        score: 16,
        maxScore: 20,
        reasoning: 'Closes feature gap with Fleetio unified compliance solution',
      },
      {
        factor: 'Technical Enabler',
        score: 8,
        maxScore: 10,
        reasoning: 'Foundation for AI anomaly detection and predictive compliance',
      },
      {
        factor: 'Strategic Alignment',
        score: 4,
        maxScore: 5,
        reasoning: 'Directly supports board mandate to unify platform',
      },
    ],
    weightedScore: 87,
    reasoning: [
      "Addresses #1 customer request (47% of support tickets)",
      'Reduces churn risk by $2.3M ARR',
      'Closes competitive gap with Fleetio',
    ],
    tradeOffs: [
      'Delays AI copilot features by 1 quarter',
      'Requires 60% of engineering capacity for 3 months',
      'Mobile experience improvements pushed to Q3',
    ],
    resourceRequirements: {
      engineering: 8,
      design: 2,
      timeline: '12 weeks',
    },
    diagnosticLinks: [
      'support-ticket-analysis',
      'nps-scheduling-feedback',
      'competitive-analysis-fleetio',
    ],
  },
  {
    id: 'init-002',
    name: 'AI Copilot Capabilities',
    shortName: 'AI copilot features',
    description:
      'Intelligent assistant for flight operations with predictive scheduling, anomaly detection, and automated compliance recommendations.',
    priority: 2,
    confidenceScore: 72,
    confidenceFootnote: 'Calculated from: 78% of B2B SaaS competitors have AI features (competitive scan of 23 companies), 5 customer interviews expressed interest but could not quantify willingness-to-pay, premium tier revenue modeled at $800K ARR upside with ±30% uncertainty. Lower confidence due to dependency on scheduling-compliance foundation not yet built.',
    feasibilityScore: 42,
    impactScore: 76,
    automationType: 'Co-pilot / Augmented',
    automationFootnote: 'AI surfaces recommendations; human operators make final decisions. EBITDA capture requires behavioral adoption — operators must change workflows to realize efficiency gains. Plan for incentive alignment and change management alongside technical delivery.',
    scores: [
      {
        factor: 'Revenue Impact',
        score: 28,
        maxScore: 40,
        reasoning: 'Premium tier potential for enterprise customers',
      },
      {
        factor: 'Churn Risk Reduction',
        score: 15,
        maxScore: 25,
        reasoning: 'Differentiation reduces competitive switching risk',
      },
      {
        factor: 'Competitive Exposure',
        score: 18,
        maxScore: 20,
        reasoning: '78% of B2B SaaS competitors adding AI features',
      },
      {
        factor: 'Technical Enabler',
        score: 7,
        maxScore: 10,
        reasoning: 'Establishes ML infrastructure for future features',
      },
      {
        factor: 'Strategic Alignment',
        score: 4,
        maxScore: 5,
        reasoning: 'Board mandate explicitly calls for AI capabilities',
      },
    ],
    weightedScore: 72,
    reasoning: [
      'Strong competitive differentiation potential',
      'Aligns with board AI mandate',
      'Requires unified scheduling-compliance as foundation',
    ],
    tradeOffs: [
      'Higher uncertainty in delivery timeline',
      'Requires scheduling-compliance unification first',
      'Significant ML infrastructure investment needed',
    ],
    resourceRequirements: {
      engineering: 6,
      design: 3,
      timeline: '16 weeks',
    },
    diagnosticLinks: ['competitive-analysis-ai', 'board-mandate', 'customer-interview-ai-requests'],
  },
  {
    id: 'init-003',
    name: 'Mobile Experience Overhaul',
    shortName: 'mobile experience overhaul',
    description:
      'Complete redesign of mobile application with offline capabilities, push notifications, and streamlined crew workflows.',
    priority: 3,
    confidenceScore: 65,
    confidenceFootnote: 'Calculated from: mobile adoption at 45% (Mixpanel, 90-day cohort), 18% of support tickets cite mobile limitations, NPS verbatim analysis shows 12% of detractor comments reference mobile. Revenue impact modeled conservatively — mobile-driven expansion revenue is indirect and harder to isolate.',
    feasibilityScore: 82,
    impactScore: 62,
    automationType: 'Human-Led + AI',
    automationFootnote: 'Primarily a UX redesign with AI-assisted features (smart notifications, usage-based recommendations). Value is realized through adoption behavior change. EBITDA capture path is indirect — measured via expansion revenue and churn reduction over 6+ months.',
    scores: [
      {
        factor: 'Revenue Impact',
        score: 22,
        maxScore: 40,
        reasoning: 'Mobile adoption at 45% limits expansion revenue',
      },
      {
        factor: 'Churn Risk Reduction',
        score: 18,
        maxScore: 25,
        reasoning: '18% of support tickets cite mobile limitations',
      },
      {
        factor: 'Competitive Exposure',
        score: 14,
        maxScore: 20,
        reasoning: 'Competitors have superior mobile experiences',
      },
      {
        factor: 'Technical Enabler',
        score: 6,
        maxScore: 10,
        reasoning: 'Modern mobile architecture enables future features',
      },
      {
        factor: 'Strategic Alignment',
        score: 5,
        maxScore: 5,
        reasoning: 'Scale go-to-market requires mobile-first approach',
      },
    ],
    weightedScore: 65,
    reasoning: [
      'Current mobile adoption at only 45%',
      'Competitive gap in mobile experience',
      'Essential for field crew productivity',
    ],
    tradeOffs: [
      'Requires dedicated mobile engineering team',
      'Design resources split with web platform',
      'Testing complexity across device matrix',
    ],
    resourceRequirements: {
      engineering: 5,
      design: 3,
      timeline: '14 weeks',
    },
    diagnosticLinks: [
      'usage-analytics-mobile',
      'support-ticket-mobile',
      'customer-interview-field-ops',
    ],
  },
];

export const stakeholderInputs: StakeholderInput[] = [
  {
    id: 'stake-001',
    type: 'customer',
    source: 'Customer Advisory Board',
    content:
      'Unified view of scheduling and compliance is the #1 requested feature. Currently managing in separate spreadsheets.',
    impact: 'high',
    linkedInitiatives: ['init-001'],
  },
  {
    id: 'stake-002',
    type: 'customer',
    source: 'NPS Verbatim Analysis',
    content:
      '47% of detractor comments mention scheduling-compliance disconnect. "I need one place to see both."',
    impact: 'high',
    linkedInitiatives: ['init-001'],
  },
  {
    id: 'stake-003',
    type: 'board',
    source: 'Board Mandate (March 2026)',
    content:
      'Accelerate platform integration and advance AI-enabled roadmap. Horizon must become the unified product story.',
    impact: 'high',
    linkedInitiatives: ['init-001', 'init-002'],
  },
  {
    id: 'stake-004',
    type: 'capacity',
    source: 'Engineering Capacity Assessment',
    content:
      '60% capacity available for new features. Critical: scheduling-compliance requires 3-month focus before AI work can begin.',
    impact: 'medium',
    linkedInitiatives: ['init-001', 'init-002'],
  },
  {
    id: 'stake-005',
    type: 'customer',
    source: 'Support Ticket Analysis',
    content:
      'Mobile limitations cause 18% of support volume. Field crews need offline access and push notifications.',
    impact: 'medium',
    linkedInitiatives: ['init-003'],
  },
  {
    id: 'stake-006',
    type: 'board',
    source: 'Competitive Intelligence Report',
    content:
      'Fleetio launched unified compliance module. 78% of B2B SaaS competitors investing in AI features.',
    impact: 'high',
    linkedInitiatives: ['init-001', 'init-002'],
  },
];

export const tradeOffComparisons = [
  {
    id: 'tradeoff-001',
    initiativeA: 'init-001',
    initiativeB: 'init-002',
    analysis:
      'Choosing unified scheduling-compliance platform delays AI copilot by 1 quarter but provides necessary foundation. AI without unified data would have 40% less utility.',
    recommendation: 'Sequence scheduling-compliance first, then AI copilot',
    opportunityCost: '$500K potential AI premium revenue delayed by 3 months',
  },
  {
    id: 'tradeoff-002',
    initiativeA: 'init-001',
    initiativeB: 'init-003',
    analysis:
      'Scheduling-compliance unification takes priority over mobile. Mobile users can access web platform; compliance gaps cause regulatory risk.',
    recommendation: 'Mobile improvements in Q3 after compliance platform ships',
    opportunityCost: 'Mobile adoption growth delayed by 4 months',
  },
];

export const confidenceFactors = {
  dataQuality: {
    label: 'Data Quality',
    score: 85,
    factors: [
      '8 customer interviews analyzed',
      '2,400+ NPS responses processed',
      '12 months of support ticket data',
    ],
  },
  marketValidation: {
    label: 'Market Validation',
    score: 78,
    factors: [
      'Competitive analysis covers top 5 competitors',
      'Customer advisory board input included',
      'Industry analyst reports reviewed',
    ],
  },
  technicalFeasibility: {
    label: 'Technical Feasibility',
    score: 82,
    factors: [
      'Architecture review completed',
      'Team capacity assessed',
      'Dependency mapping done',
    ],
  },
};
