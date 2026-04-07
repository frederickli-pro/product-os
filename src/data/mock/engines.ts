/**
 * Mock data for the four engines in the Product Operating System.
 */

import { Engine } from '@/types';

export const engines: Engine[] = [
  {
    id: 1,
    name: 'Diagnostic',
    shortName: 'Diagnostic',
    actNumber: 1,
    status: 'active',
    description: 'Structured discovery synthesizing customer interviews, NPS responses, support tickets, and product usage data.',
    previewContent: 'Evidence synthesized, gaps identified, benchmarks available',
  },
  {
    id: 2,
    name: 'Prioritization',
    shortName: 'Prioritization',
    actNumber: 2,
    status: 'available',
    description: 'Roadmap synthesis with weighted scoring against revenue impact, churn risk, and competitive exposure.',
    previewContent: 'Scoring methodology, trade-off analysis, explicit reasoning',
  },
  {
    id: 3,
    name: 'Execution',
    shortName: 'Execution',
    actNumber: 3,
    status: 'locked',
    description: 'Decision transformation into PRDs with acceptance criteria, epic structures, and test scenarios.',
    previewContent: 'PRD generation, epic structure, engineering artifacts',
  },
  {
    id: 4,
    name: 'Governance',
    shortName: 'Governance',
    actNumber: 4,
    status: 'locked',
    description: '90-day execution plans with weekly milestones, KPI dashboards, and escalation triggers.',
    previewContent: 'KPI dashboard, execution timeline, portfolio intelligence',
  },
];
