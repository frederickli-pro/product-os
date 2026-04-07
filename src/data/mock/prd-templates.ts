/**
 * Mock data for PRDs, Epics, and roadmap items.
 * Used by Engine 3 - PRD Generation and Execution scenario.
 */

import {
  PRD,
  Epic,
  RoadmapItem,
  TimeReductionMetric,
  CommentThread,
  StakeholderApproval,
} from '@/types/prd'

export const mockCommentThreads: CommentThread[] = [
  {
    id: 'comment-001',
    sectionId: 'section-overview',
    author: 'Sarah Chen',
    authorRole: 'Product Lead',
    content: 'This aligns well with the Q2 compliance requirements. Consider adding explicit mention of FAA Part 135 regulations.',
    timestamp: '2026-03-28T14:30:00Z',
    isResolved: false,
    replies: [
      {
        id: 'reply-001',
        author: 'Michael Torres',
        authorRole: 'Engineering Lead',
        content: 'Good point. I\'ll add a section on regulatory compliance mapping.',
        timestamp: '2026-03-28T15:45:00Z',
      }
    ]
  },
  {
    id: 'comment-002',
    sectionId: 'section-acceptance',
    author: 'James Wilson',
    authorRole: 'QA Lead',
    content: 'The acceptance criteria look comprehensive. We should add performance benchmarks for the real-time sync.',
    timestamp: '2026-03-29T09:15:00Z',
    isResolved: true,
    replies: []
  },
  {
    id: 'comment-003',
    sectionId: 'section-technical',
    author: 'Lisa Park',
    authorRole: 'Solutions Architect',
    content: 'The API design follows our GraphQL federation pattern. This will integrate seamlessly with existing services.',
    timestamp: '2026-03-29T11:20:00Z',
    isResolved: false,
    replies: []
  }
]

export const mockStakeholderApprovals: StakeholderApproval[] = [
  {
    stakeholder: 'Brandon Holden',
    role: 'CEO',
    status: 'approved',
    timestamp: '2026-03-30T10:00:00Z',
    avatar: 'BH'
  },
  {
    stakeholder: 'Sarah Chen',
    role: 'VP Product',
    status: 'approved',
    timestamp: '2026-03-29T16:30:00Z',
    avatar: 'SC'
  },
  {
    stakeholder: 'Michael Torres',
    role: 'Engineering Lead',
    status: 'in_review',
    avatar: 'MT'
  },
  {
    stakeholder: 'James Wilson',
    role: 'QA Lead',
    status: 'pending',
    avatar: 'JW'
  }
]

export const schedulingCompliancePRD: PRD = {
  id: 'prd-001',
  title: 'Unified Scheduling-Compliance Platform',
  summary: 'Integrate scheduling and compliance modules into a unified platform with real-time data flow and automated compliance checking. This initiative addresses the #1 customer request (47% of support tickets) and protects $2.3M ARR at risk.',
  status: 'in_review',
  linkedInitiativeId: 'init-001',
  sections: [
    {
      id: 'section-overview',
      title: 'Overview',
      content: `The Unified Scheduling-Compliance Platform integrates Horizon's scheduling module with the compliance tracking system, enabling real-time visibility across both domains.

**Problem Statement:**
Currently, operators manage scheduling and compliance in separate systems, leading to:
- 47% of support tickets related to scheduling-compliance friction
- Average 23 minutes per flight for manual compliance verification
- 3 critical compliance gaps discovered in Q1 2026 audits

**Solution:**
A unified interface that automatically validates compliance requirements against scheduled operations, with real-time alerts and automated documentation.`,
      isExpanded: true,
      comments: [mockCommentThreads[0]],
      approvalStatus: 'approved'
    },
    {
      id: 'section-acceptance',
      title: 'Acceptance Criteria',
      content: `**Core Requirements:**
1. Real-time sync between scheduling and compliance data (<500ms latency)
2. Automated compliance validation for all scheduled flights
3. Dashboard showing unified view of operations and compliance status
4. Alert system for compliance violations before departure
5. Audit trail for all compliance decisions

**Performance Requirements:**
- Page load time <2 seconds
- Support for 1000+ concurrent users
- 99.9% uptime SLA`,
      isExpanded: true,
      comments: [mockCommentThreads[1]],
      approvalStatus: 'approved'
    },
    {
      id: 'section-technical',
      title: 'Technical Constraints',
      content: `**Architecture:**
- GraphQL federation for unified API layer
- Event-driven sync using Apache Kafka
- PostgreSQL for transactional data
- Redis for real-time caching

**Integration Points:**
- Existing scheduling API (v2.3)
- Compliance database (Oracle -> migration path defined)
- External FAA validation service
- Mobile SDK updates required

**Security:**
- SOC 2 Type II compliance required
- End-to-end encryption for all data in transit
- Role-based access control (RBAC) implementation`,
      isExpanded: false,
      comments: [mockCommentThreads[2]],
      approvalStatus: 'in_review'
    },
    {
      id: 'section-edge-cases',
      title: 'Edge Cases',
      content: `**Handled Scenarios:**
1. Offline mode when connectivity lost during flight operations
2. Conflicting compliance rules across jurisdictions
3. Last-minute schedule changes within compliance window
4. Bulk schedule imports with compliance validation
5. Legacy data migration edge cases`,
      isExpanded: false,
      comments: [],
      approvalStatus: 'pending'
    }
  ],
  acceptanceCriteria: [
    {
      id: 'ac-001',
      description: 'System syncs scheduling data with compliance module within 500ms',
      isVerified: true,
      traceabilityLink: 'support-ticket-analysis'
    },
    {
      id: 'ac-002',
      description: 'Unified dashboard displays both scheduling and compliance status in single view',
      isVerified: true,
      traceabilityLink: 'customer-interview-001'
    },
    {
      id: 'ac-003',
      description: 'Automated alerts trigger 24 hours before any compliance deadline',
      isVerified: false,
      traceabilityLink: 'nps-feedback-compliance'
    },
    {
      id: 'ac-004',
      description: 'Audit log captures all compliance decisions with timestamps and user attribution',
      isVerified: false,
      traceabilityLink: 'board-mandate'
    },
    {
      id: 'ac-005',
      description: 'Mobile app receives push notifications for compliance alerts',
      isVerified: false,
      traceabilityLink: 'support-ticket-mobile'
    }
  ],
  edgeCases: [
    {
      id: 'ec-001',
      scenario: 'Connectivity loss during flight scheduling',
      expectedBehavior: 'Queue changes locally with optimistic UI, sync on reconnection with conflict resolution',
      priority: 'high'
    },
    {
      id: 'ec-002',
      scenario: 'Cross-border flights with conflicting compliance rules',
      expectedBehavior: 'Display all applicable rules, highlight conflicts, require explicit acknowledgment',
      priority: 'high'
    },
    {
      id: 'ec-003',
      scenario: 'Bulk import of 500+ scheduled flights',
      expectedBehavior: 'Background processing with progress indicator, partial failure handling',
      priority: 'medium'
    }
  ],
  technicalConstraints: [
    {
      id: 'tc-001',
      constraint: 'Must maintain backward compatibility with Scheduling API v2.3',
      rationale: 'Existing integrations depend on current API contract',
      impact: 'Additional abstraction layer required'
    },
    {
      id: 'tc-002',
      constraint: 'Oracle to PostgreSQL migration must be zero-downtime',
      rationale: 'Production systems cannot have maintenance windows',
      impact: 'Dual-write pattern during migration period'
    },
    {
      id: 'tc-003',
      constraint: 'FAA validation service rate limited to 100 req/min',
      rationale: 'External API constraint',
      impact: 'Implement request queuing and caching'
    }
  ],
  stakeholderApprovals: mockStakeholderApprovals,
  traceability: {
    customerFeedbackLinks: ['interview-001', 'interview-003', 'interview-007'],
    supportTicketLinks: ['ticket-batch-scheduling', 'ticket-compliance-visibility'],
    diagnosticLinks: ['maturity-gap-integration', 'nps-analysis-detractor-themes']
  },
  createdAt: '2026-03-25T09:00:00Z',
  updatedAt: '2026-03-30T14:30:00Z'
}

export const schedulingComplianceEpic: Epic = {
  id: 'epic-001',
  title: 'Unified Scheduling-Compliance Platform',
  description: 'Complete implementation of unified scheduling and compliance integration',
  status: 'planning',
  linkedPRDId: 'prd-001',
  totalPoints: 89,
  completedPoints: 0,
  stories: [
    {
      id: 'story-001',
      title: 'Unified Dashboard View',
      description: 'Create the main dashboard component displaying both scheduling and compliance data',
      points: 13,
      status: 'backlog',
      acceptanceCriteria: [
        'Dashboard loads in <2 seconds',
        'Shows real-time scheduling status',
        'Displays compliance indicators per flight',
        'Supports filtering by date range and aircraft'
      ],
      traceabilityLink: 'Customer feedback: "I need one place to see both"'
    },
    {
      id: 'story-002',
      title: 'Real-time Sync Engine',
      description: 'Implement event-driven synchronization between scheduling and compliance modules',
      points: 21,
      status: 'backlog',
      acceptanceCriteria: [
        'Sync latency <500ms',
        'Handle 1000+ events per second',
        'Graceful degradation on service failure',
        'Comprehensive error logging'
      ],
      traceabilityLink: 'Technical requirement from architecture review'
    },
    {
      id: 'story-003',
      title: 'Automated Compliance Validation',
      description: 'Build compliance rule engine that validates scheduled operations automatically',
      points: 21,
      status: 'backlog',
      acceptanceCriteria: [
        'Support 50+ compliance rule types',
        'Validate crew certifications',
        'Check aircraft maintenance schedules',
        'Verify regulatory requirements by jurisdiction'
      ],
      traceabilityLink: '47% of support tickets cite compliance validation as pain point'
    },
    {
      id: 'story-004',
      title: 'Alert and Notification System',
      description: 'Implement multi-channel alerting for compliance violations',
      points: 13,
      status: 'backlog',
      acceptanceCriteria: [
        'Email notifications with configurable rules',
        'Push notifications to mobile app',
        'In-app alert center',
        'Escalation paths for critical violations'
      ],
      traceabilityLink: 'NPS feedback: Need proactive compliance warnings'
    },
    {
      id: 'story-005',
      title: 'Audit Trail Implementation',
      description: 'Create comprehensive audit logging for all compliance decisions',
      points: 8,
      status: 'backlog',
      acceptanceCriteria: [
        'Immutable audit log',
        'User attribution for all changes',
        'Exportable reports for regulators',
        'Retention policy compliance'
      ],
      traceabilityLink: 'Board mandate: Full audit trail required'
    },
    {
      id: 'story-006',
      title: 'Mobile Integration',
      description: 'Update mobile SDK to support unified scheduling-compliance features',
      points: 13,
      status: 'backlog',
      acceptanceCriteria: [
        'Offline support with sync on reconnection',
        'Push notification integration',
        'Optimized for tablet and phone form factors',
        'Field crew workflow optimizations'
      ],
      traceabilityLink: 'Support tickets: 18% cite mobile limitations'
    }
  ],
  testScenarios: [
    {
      id: 'test-001',
      name: 'Real-time sync validation',
      type: 'integration',
      description: 'Verify data synchronization between scheduling and compliance modules',
      steps: [
        'Create new flight schedule',
        'Verify compliance module receives update within 500ms',
        'Modify schedule details',
        'Confirm compliance status reflects changes'
      ],
      expectedOutcome: 'All schedule changes propagate to compliance module within SLA',
      traceabilityLink: 'Customer interview: Manual sync takes 23 minutes per flight'
    },
    {
      id: 'test-002',
      name: 'Compliance violation detection',
      type: 'e2e',
      description: 'End-to-end test of compliance violation workflow',
      steps: [
        'Schedule flight with expired crew certification',
        'System should detect violation',
        'Alert should be generated',
        'Dashboard should show violation indicator'
      ],
      expectedOutcome: 'Violations detected and surfaced within 5 seconds of schedule creation',
      traceabilityLink: '3 critical compliance gaps found in Q1 audit'
    },
    {
      id: 'test-003',
      name: 'Offline mode resilience',
      type: 'e2e',
      description: 'Verify system behavior during connectivity loss',
      steps: [
        'Simulate network disconnection',
        'Make schedule changes offline',
        'Restore connectivity',
        'Verify changes sync correctly with conflict resolution'
      ],
      expectedOutcome: 'No data loss, conflicts resolved automatically or flagged for review',
      traceabilityLink: 'Edge case: Field operations in low-connectivity areas'
    }
  ],
  codeScaffolds: [
    {
      id: 'scaffold-001',
      filename: 'unified-dashboard.tsx',
      language: 'typescript',
      description: 'Main dashboard component combining scheduling and compliance views',
      codeSnippet: `interface UnifiedDashboardProps {
  scheduleData: ScheduleEntry[];
  complianceStatus: ComplianceStatus[];
  dateRange: DateRange;
}

export function UnifiedDashboard({
  scheduleData,
  complianceStatus,
  dateRange
}: UnifiedDashboardProps) {
  // Implementation scaffolded from PRD requirements
  // AC-002: Unified view in single dashboard
  return (
    <DashboardLayout>
      <SchedulePanel data={scheduleData} />
      <CompliancePanel status={complianceStatus} />
      <AlertCenter />
    </DashboardLayout>
  );
}`
    },
    {
      id: 'scaffold-002',
      filename: 'sync-engine.ts',
      language: 'typescript',
      description: 'Event-driven synchronization service',
      codeSnippet: `// Real-time sync engine implementation
// TC-001: Backward compatible with API v2.3

export class SyncEngine {
  private kafkaConsumer: KafkaConsumer;
  private cache: RedisClient;

  async processScheduleEvent(event: ScheduleEvent) {
    // Latency target: <500ms (AC-001)
    await this.validateCompliance(event);
    await this.notifySubscribers(event);
    await this.updateCache(event);
  }
}`
    }
  ],
  traceability: {
    customerFeedbackOrigin: 'Customer Advisory Board: "#1 requested feature"',
    diagnosticInsight: 'Maturity assessment: Integration gap identified as critical',
    prioritizationReason: 'Weighted score 87% - Addresses $2.3M ARR risk'
  }
}

export const roadmapItems: RoadmapItem[] = [
  {
    id: 'roadmap-001',
    initiativeId: 'init-001',
    name: 'Unified Scheduling-Compliance Platform',
    shortName: 'scheduling-compliance unification',
    description: 'Integrate scheduling and compliance modules into a unified platform with real-time data flow and automated compliance checking.',
    priority: 1,
    confidenceScore: 87,
    reasoning: [
      "Addresses #1 customer request (47% of support tickets)",
      'Reduces churn risk by $2.3M ARR',
      'Closes competitive gap with Fleetio'
    ],
    status: 'pending'
  },
  {
    id: 'roadmap-002',
    initiativeId: 'init-002',
    name: 'AI Copilot Capabilities',
    shortName: 'AI copilot features',
    description: 'Intelligent assistant for flight operations with predictive scheduling, anomaly detection, and automated compliance recommendations.',
    priority: 2,
    confidenceScore: 72,
    reasoning: [
      'Strong competitive differentiation potential',
      'Aligns with board AI mandate',
      'Requires scheduling-compliance unification first'
    ],
    status: 'pending'
  },
  {
    id: 'roadmap-003',
    initiativeId: 'init-003',
    name: 'Mobile Experience Overhaul',
    shortName: 'mobile experience overhaul',
    description: 'Complete redesign of mobile application with offline capabilities, push notifications, and streamlined crew workflows.',
    priority: 3,
    confidenceScore: 65,
    reasoning: [
      'Current mobile adoption at only 45%',
      'Competitive gap in mobile experience',
      'Essential for field crew productivity'
    ],
    status: 'pending'
  }
]

export const timeReductionMetrics: TimeReductionMetric[] = [
  {
    id: 'metric-001',
    metric: 'PRD creation',
    manualProcess: '1-2 weeks',
    withProductOS: 'Hours',
    improvement: '90%+ time reduction'
  },
  {
    id: 'metric-002',
    metric: 'Prioritization cycle',
    manualProcess: '3-4 weeks',
    withProductOS: '3-5 days',
    improvement: '80% faster decisions'
  },
  {
    id: 'metric-003',
    metric: 'Decision documentation',
    manualProcess: '~30%',
    withProductOS: '95%+',
    improvement: '3x better capture'
  },
  {
    id: 'metric-004',
    metric: 'Time to artifacts',
    manualProcess: '2-4 weeks',
    withProductOS: 'Days',
    improvement: '85%+ acceleration'
  },
  {
    id: 'metric-005',
    metric: 'Rework',
    manualProcess: '25-35%',
    withProductOS: 'Under 10%',
    improvement: '60%+ reduction'
  }
]

export const calloutMessages = {
  frameworksStop: "This is where most frameworks stop. This is where execution usually breaks. Yansu doesn't.",
  unifiedPlatform: "No handoffs. No lost context. No 'wait, why did we decide this?'"
}
