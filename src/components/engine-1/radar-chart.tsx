'use client'

import React from 'react'
import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts'
import { MaturityScore } from '@/types/evidence'

interface RadarChartProps {
  scores: MaturityScore
  peerMedian?: {
    customerDiscoveryDepth: number
    roadmapClarity: number
    executionVelocity: number
    governanceRigor: number
  }
  showComparison?: boolean
}

export function RadarChart({ scores, peerMedian, showComparison = true }: RadarChartProps) {
  const data = [
    {
      dimension: 'Customer Discovery',
      score: scores.customerDiscoveryDepth,
      median: peerMedian?.customerDiscoveryDepth || 0,
      fullMark: 100,
    },
    {
      dimension: 'Roadmap Clarity',
      score: scores.roadmapClarity,
      median: peerMedian?.roadmapClarity || 0,
      fullMark: 100,
    },
    {
      dimension: 'Execution Velocity',
      score: scores.executionVelocity,
      median: peerMedian?.executionVelocity || 0,
      fullMark: 100,
    },
    {
      dimension: 'Governance Rigor',
      score: scores.governanceRigor,
      median: peerMedian?.governanceRigor || 0,
      fullMark: 100,
    },
  ]

  return (
    <div className="w-full h-[350px]" data-testid="radar-chart">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fill: '#374151', fontSize: 12 }}
            tickLine={false}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#9ca3af', fontSize: 10 }}
            tickCount={5}
          />
          <Radar
            name="[Portfolio Co]"
            dataKey="score"
            stroke="#1E3A5F"
            fill="#1E3A5F"
            fillOpacity={0.4}
            strokeWidth={2}
          />
          {showComparison && peerMedian && (
            <Radar
              name="Peer Median"
              dataKey="median"
              stroke="#4A90C2"
              fill="#4A90C2"
              fillOpacity={0.2}
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          )}
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '8px 12px',
            }}
            formatter={(value: number, name: string) => [`${value}%`, name]}
          />
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
            }}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  )
}
