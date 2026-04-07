/**
 * Mock data for the four engines in the Product Operating System.
 */

import { Engine } from '@/types';

export const engines: Engine[] = [
  {
    id: 1,
    name: 'Diagnostic',
    act: 1,
    status: 'active',
    description: 'Structured discovery synthesizing customer interviews, NPS responses, support tickets, and product usage data.',
  },
  {
    id: 2,
    name: 'Prioritization',
    act: 2,
    status: 'active',
    description: 'Roadmap synthesis with weighted scoring against revenue impact, churn risk, and competitive exposure.',
  },
  {
    id: 3,
    name: 'Execution',
    act: 3,
    status: 'locked',
    description: 'Decision transformation into PRDs with acceptance criteria, epic structures, and test scenarios.',
  },
  {
    id: 4,
    name: 'Governance',
    act: 4,
    status: 'locked',
    description: '90-day execution plans with weekly milestones, KPI dashboards, and escalation triggers.',
  },
];
