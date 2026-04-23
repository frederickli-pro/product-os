'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Star, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type ReadinessState = 'unaware' | 'informed' | 'interested' | 'champion' | 'resistant';

interface StakeholderReadiness {
  name: string;
  role: string;
  readiness: ReadinessState;
  note: string;
  isKeyRisk?: boolean;
  isKeyChampion?: boolean;
}

const READINESS_CONFIG: Record<ReadinessState, { label: string; color: string; bg: string; bar: number }> = {
  unaware: { label: 'Unaware', color: 'text-gray-500', bg: 'bg-gray-100', bar: 10 },
  informed: { label: 'Informed', color: 'text-blue-600', bg: 'bg-blue-100', bar: 35 },
  interested: { label: 'Interested', color: 'text-amber-600', bg: 'bg-amber-100', bar: 60 },
  champion: { label: 'Champion', color: 'text-emerald-700', bg: 'bg-emerald-100', bar: 95 },
  resistant: { label: 'Resistant', color: 'text-red-600', bg: 'bg-red-100', bar: 5 },
};

const stakeholders: StakeholderReadiness[] = [
  {
    name: 'Brandon H.',
    role: 'CEO',
    readiness: 'champion',
    note: 'Full sponsor. Aligned on 90-day plan. Actively messaging the org.',
    isKeyChampion: true,
  },
  {
    name: 'Priya M.',
    role: 'CPO',
    readiness: 'champion',
    note: 'Driving initiative. Owns PRD approvals and engineering prioritization.',
    isKeyChampion: true,
  },
  {
    name: 'Carlos R.',
    role: 'VP Engineering',
    readiness: 'interested',
    note: 'Supportive but cautious about timeline. Needs clear resource commitment.',
  },
  {
    name: 'Diane K.',
    role: 'VP Customer Success',
    readiness: 'interested',
    note: 'Wants to see customer impact data before full buy-in.',
  },
  {
    name: 'Tom W.',
    role: 'Head of Compliance',
    readiness: 'resistant',
    note: 'Concerned about regulatory risk of automated compliance checks. Key blocker if not addressed.',
    isKeyRisk: true,
  },
  {
    name: 'Field Crew Leads (8)',
    role: 'Frontline Users',
    readiness: 'unaware',
    note: 'Not yet briefed. Adoption depends on top-down rollout communication.',
  },
];

const changeManagementActions = [
  { done: true, action: 'CEO aligned on 90-day mandate and top initiatives' },
  { done: true, action: 'CPO owns initiative prioritization and PRD approvals' },
  { done: false, action: 'Schedule 1:1 with Compliance lead — address regulatory concerns directly' },
  { done: false, action: 'Brief VP Engineering on resource allocation and sequencing' },
  { done: false, action: 'Prepare field crew rollout communication for mobile initiative' },
];

export function OrgReadiness() {
  const champions = stakeholders.filter((s) => s.isKeyChampion);
  const risks = stakeholders.filter((s) => s.isKeyRisk);

  return (
    <Card data-testid="org-readiness">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="w-5 h-5 text-vista-blue" />
          Transformation Readiness
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-xs">
                  The technology usually works. Whether the org transforms depends on who champions it and who resists.
                  Track readiness across the leadership team to de-risk adoption before it becomes a bottleneck.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Stakeholder buy-in map — the final mile of every initiative
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Summary callout */}
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          <strong>Key insight:</strong> The technology will work. The question is whether incentives and communication
          are in place for the org to adopt the new way of working — or if efficiency gains pass silently to employees
          and customers without reaching the P&L.
        </div>

        {/* Champion / Risk highlights */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 space-y-2">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-800">Key Champions</span>
            </div>
            {champions.map((s) => (
              <div key={s.name} className="text-xs">
                <span className="font-medium text-emerald-700">{s.name}</span>
                <span className="text-emerald-600"> ({s.role})</span>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 space-y-2">
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold text-red-800">Adoption Risks</span>
            </div>
            {risks.map((s) => (
              <div key={s.name} className="text-xs">
                <span className="font-medium text-red-700">{s.name}</span>
                <span className="text-red-600"> ({s.role})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stakeholder readiness map */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Org Readiness Map</h4>
          <div className="space-y-2">
            {stakeholders.map((stakeholder, index) => {
              const config = READINESS_CONFIG[stakeholder.readiness];
              return (
                <motion.div
                  key={stakeholder.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.07 }}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={cn(
                            'flex items-center gap-3 p-2.5 rounded-lg border cursor-help',
                            stakeholder.isKeyChampion
                              ? 'border-emerald-200 bg-emerald-50/50'
                              : stakeholder.isKeyRisk
                              ? 'border-red-200 bg-red-50/50'
                              : 'border-gray-100 bg-white'
                          )}
                        >
                          <div className="w-24 flex-shrink-0">
                            <p className="text-xs font-semibold text-gray-800 truncate">{stakeholder.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{stakeholder.role}</p>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className={cn('text-xs font-medium px-1.5 py-0.5 rounded', config.bg, config.color)}>
                                {config.label}
                              </span>
                              {stakeholder.isKeyChampion && (
                                <Star className="w-3.5 h-3.5 text-emerald-500" />
                              )}
                              {stakeholder.isKeyRisk && (
                                <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                              )}
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className={cn(
                                  'h-1.5 rounded-full transition-all',
                                  stakeholder.readiness === 'champion' ? 'bg-emerald-500' :
                                  stakeholder.readiness === 'resistant' ? 'bg-red-500' :
                                  stakeholder.readiness === 'interested' ? 'bg-amber-500' :
                                  stakeholder.readiness === 'informed' ? 'bg-blue-500' :
                                  'bg-gray-400'
                                )}
                                style={{ width: `${config.bar}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="max-w-xs">
                        <p className="text-xs">{stakeholder.note}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Change management actions */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Change Management Actions</h4>
          <div className="space-y-1.5">
            {changeManagementActions.map((item, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle2
                  className={cn(
                    'w-4 h-4 mt-0.5 flex-shrink-0',
                    item.done ? 'text-emerald-500' : 'text-gray-300'
                  )}
                />
                <span className={item.done ? 'text-gray-500 line-through' : 'text-gray-700'}>
                  {item.action}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
