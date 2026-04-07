/**
 * PRD and execution types for Engine 3.
 * Owner: Scenario 4 - PRD Generation and Execution
 *
 * Exports:
 * - PRD interface with sections, acceptance criteria, edge cases
 * - Epic interface with stories
 * - CommentThread type for collaboration
 * - ApprovalStatus type for workflow
 */

export type ApprovalStatus = 'pending' | 'approved' | 'changes_requested' | 'in_review'

export interface PRDSection {
  id: string
  title: string
  content: string
  isExpanded: boolean
  comments: CommentThread[]
  approvalStatus: ApprovalStatus
}

export interface AcceptanceCriteria {
  id: string
  description: string
  isVerified: boolean
  traceabilityLink?: string
}

export interface EdgeCase {
  id: string
  scenario: string
  expectedBehavior: string
  priority: 'high' | 'medium' | 'low'
}

export interface TechnicalConstraint {
  id: string
  constraint: string
  rationale: string
  impact: string
}

export interface CommentThread {
  id: string
  sectionId: string
  author: string
  authorRole: string
  content: string
  timestamp: string
  isResolved: boolean
  replies: CommentReply[]
}

export interface CommentReply {
  id: string
  author: string
  authorRole: string
  content: string
  timestamp: string
}

export interface StakeholderApproval {
  stakeholder: string
  role: string
  status: ApprovalStatus
  timestamp?: string
  avatar?: string
}

export interface PRD {
  id: string
  title: string
  summary: string
  status: 'draft' | 'in_review' | 'approved' | 'implemented'
  linkedInitiativeId: string
  sections: PRDSection[]
  acceptanceCriteria: AcceptanceCriteria[]
  edgeCases: EdgeCase[]
  technicalConstraints: TechnicalConstraint[]
  stakeholderApprovals: StakeholderApproval[]
  traceability: {
    customerFeedbackLinks: string[]
    supportTicketLinks: string[]
    diagnosticLinks: string[]
  }
  createdAt: string
  updatedAt: string
}

export interface Story {
  id: string
  title: string
  description: string
  points: number
  status: 'backlog' | 'in_progress' | 'done'
  acceptanceCriteria: string[]
  traceabilityLink: string
}

export interface TestScenario {
  id: string
  name: string
  type: 'unit' | 'integration' | 'e2e'
  description: string
  steps: string[]
  expectedOutcome: string
  traceabilityLink: string
}

export interface CodeScaffold {
  id: string
  filename: string
  language: string
  description: string
  codeSnippet: string
}

export interface Epic {
  id: string
  title: string
  description: string
  status: 'planning' | 'in_progress' | 'completed'
  stories: Story[]
  testScenarios: TestScenario[]
  codeScaffolds: CodeScaffold[]
  linkedPRDId: string
  totalPoints: number
  completedPoints: number
  traceability: {
    customerFeedbackOrigin: string
    diagnosticInsight: string
    prioritizationReason: string
  }
}

export interface RoadmapItem {
  id: string
  initiativeId: string
  name: string
  shortName: string
  description: string
  priority: number
  confidenceScore: number
  reasoning: string[]
  status: 'pending' | 'prd_generated' | 'epic_generated' | 'in_development'
  linkedPRD?: PRD
  linkedEpic?: Epic
}

export interface TimeReductionMetric {
  id: string
  metric: string
  manualProcess: string
  withProductOS: string
  improvement: string
}
