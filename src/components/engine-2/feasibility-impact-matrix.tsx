'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Initiative } from '@/data/mock/initiatives';

interface FeasibilityImpactMatrixProps {
  initiatives: Initiative[];
  selectedInitiative: Initiative | null;
  onSelectInitiative: (initiative: Initiative) => void;
}

const quadrants = [
  {
    id: 'quick-win',
    label: 'Quick Wins',
    x: 'high',
    y: 'high',
    color: 'bg-emerald-50 border-emerald-200',
    labelColor: 'text-emerald-700',
    description: 'High impact, high feasibility — start here',
  },
  {
    id: 'strategic-bet',
    label: 'Strategic Bets',
    x: 'high',
    y: 'low',
    color: 'bg-blue-50 border-blue-200',
    labelColor: 'text-blue-700',
    description: 'High impact, harder to execute — plan carefully',
  },
  {
    id: 'fill-in',
    label: 'Fill-ins',
    x: 'low',
    y: 'high',
    color: 'bg-gray-50 border-gray-200',
    labelColor: 'text-gray-600',
    description: 'Lower impact, easy to do — sequence after priorities',
  },
  {
    id: 'deprioritize',
    label: 'Deprioritize',
    x: 'low',
    y: 'low',
    color: 'bg-red-50 border-red-100',
    labelColor: 'text-red-600',
    description: 'Low impact, low feasibility — avoid for now',
  },
];

function getQuadrant(initiative: Initiative): string {
  const highImpact = initiative.impactScore >= 70;
  const highFeasibility = initiative.feasibilityScore >= 60;
  if (highImpact && highFeasibility) return 'quick-win';
  if (highImpact && !highFeasibility) return 'strategic-bet';
  if (!highImpact && highFeasibility) return 'fill-in';
  return 'deprioritize';
}

const INITIATIVE_COLORS: Record<string, string> = {
  'init-001': 'bg-vista-blue text-white border-vista-blue',
  'init-002': 'bg-amber-500 text-white border-amber-500',
  'init-003': 'bg-purple-500 text-white border-purple-500',
};

const INITIATIVE_RING: Record<string, string> = {
  'init-001': 'ring-vista-blue',
  'init-002': 'ring-amber-500',
  'init-003': 'ring-purple-500',
};

export function FeasibilityImpactMatrix({
  initiatives,
  selectedInitiative,
  onSelectInitiative,
}: FeasibilityImpactMatrixProps) {
  return (
    <Card data-testid="feasibility-impact-matrix">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <LayoutGrid className="w-5 h-5 text-vista-blue" />
          Feasibility × Impact Matrix
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Where each initiative sits — click to select
        </p>
      </CardHeader>
      <CardContent>
        {/* Axis labels */}
        <div className="relative">
          {/* Y-axis label */}
          <div className="absolute -left-1 top-1/2 -translate-y-1/2 -translate-x-full pr-2">
            <span
              className="text-xs text-muted-foreground font-medium"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              Feasibility →
            </span>
          </div>

          {/* X-axis label */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
            <span className="text-xs text-muted-foreground font-medium">Impact →</span>
          </div>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-2 gap-1 ml-4 mb-8">
            {/* Top-left: Fill-ins (low impact, high feasibility) */}
            <QuadrantCell
              quadrant={quadrants[2]}
              initiatives={initiatives.filter((i) => getQuadrant(i) === 'fill-in')}
              selectedInitiative={selectedInitiative}
              onSelectInitiative={onSelectInitiative}
            />
            {/* Top-right: Quick Wins (high impact, high feasibility) */}
            <QuadrantCell
              quadrant={quadrants[0]}
              initiatives={initiatives.filter((i) => getQuadrant(i) === 'quick-win')}
              selectedInitiative={selectedInitiative}
              onSelectInitiative={onSelectInitiative}
            />
            {/* Bottom-left: Deprioritize */}
            <QuadrantCell
              quadrant={quadrants[3]}
              initiatives={initiatives.filter((i) => getQuadrant(i) === 'deprioritize')}
              selectedInitiative={selectedInitiative}
              onSelectInitiative={onSelectInitiative}
            />
            {/* Bottom-right: Strategic Bets (high impact, low feasibility) */}
            <QuadrantCell
              quadrant={quadrants[1]}
              initiatives={initiatives.filter((i) => getQuadrant(i) === 'strategic-bet')}
              selectedInitiative={selectedInitiative}
              onSelectInitiative={onSelectInitiative}
            />
          </div>
        </div>

        {/* Legend */}
        <div className="mt-2 pt-3 border-t space-y-1">
          {initiatives.map((initiative) => (
            <button
              key={initiative.id}
              onClick={() => onSelectInitiative(initiative)}
              className={`w-full flex items-center gap-2 text-left text-xs px-2 py-1.5 rounded transition-colors hover:bg-gray-50 ${
                selectedInitiative?.id === initiative.id ? 'bg-gray-100' : ''
              }`}
            >
              <span
                className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold flex-shrink-0 ${INITIATIVE_COLORS[initiative.id]}`}
              >
                {initiative.priority}
              </span>
              <span className="font-medium truncate">{initiative.shortName}</span>
              <span className="ml-auto text-muted-foreground whitespace-nowrap">
                Impact {initiative.impactScore} · Feasibility {initiative.feasibilityScore}
              </span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function QuadrantCell({
  quadrant,
  initiatives,
  selectedInitiative,
  onSelectInitiative,
}: {
  quadrant: (typeof quadrants)[number];
  initiatives: Initiative[];
  selectedInitiative: Initiative | null;
  onSelectInitiative: (i: Initiative) => void;
}) {
  return (
    <div className={`rounded-lg border p-3 min-h-[110px] ${quadrant.color}`}>
      <p className={`text-xs font-semibold mb-1 ${quadrant.labelColor}`}>{quadrant.label}</p>
      <p className="text-xs text-muted-foreground mb-2 leading-tight">{quadrant.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {initiatives.map((initiative) => (
          <motion.button
            key={initiative.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectInitiative(initiative)}
            className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold border-2 transition-all ${
              INITIATIVE_COLORS[initiative.id]
            } ${
              selectedInitiative?.id === initiative.id
                ? `ring-2 ring-offset-1 ${INITIATIVE_RING[initiative.id]}`
                : ''
            }`}
            title={initiative.name}
            data-testid={`matrix-dot-${initiative.id}`}
          >
            {initiative.priority}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
