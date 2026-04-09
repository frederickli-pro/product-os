'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Interview,
  NPSResponse,
  NPSDistribution,
  SupportTicket,
  SupportTicketBreakdown,
  UsageAnalytics,
  EvidenceTab,
} from '@/types/evidence'

interface EvidenceExplorerProps {
  interviews: Interview[]
  npsResponses: NPSResponse[]
  npsDistribution: NPSDistribution
  supportTickets: SupportTicket[]
  supportBreakdown: SupportTicketBreakdown
  usageAnalytics: UsageAnalytics
}

export function EvidenceExplorer({
  interviews,
  npsResponses,
  npsDistribution,
  supportTickets,
  supportBreakdown,
  usageAnalytics,
}: EvidenceExplorerProps) {
  const [activeTab, setActiveTab] = useState<EvidenceTab>('interviews')

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'promoter':
        return 'bg-green-100 text-green-700'
      case 'passive':
        return 'bg-yellow-100 text-yellow-700'
      case 'detractor':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getThemeColor = (theme: string) => {
    if (theme.includes('pain') || theme.includes('issue') || theme.includes('problem')) {
      return 'bg-red-50 text-red-600 border-red-200'
    }
    if (theme.includes('opportunity') || theme.includes('feature')) {
      return 'bg-blue-50 text-blue-600 border-blue-200'
    }
    return 'bg-gray-50 text-gray-600 border-gray-200'
  }

  return (
    <Card className="h-full" data-testid="evidence-explorer">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-vista-primary">Evidence Explorer</CardTitle>
        <p className="text-sm text-muted-foreground">
          Drill-down from synthesized insights to source data
        </p>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as EvidenceTab)}>
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="interviews" data-testid="tab-interviews">Interviews</TabsTrigger>
            <TabsTrigger value="nps" data-testid="tab-nps">NPS</TabsTrigger>
            <TabsTrigger value="support" data-testid="tab-support">Support Tickets</TabsTrigger>
            <TabsTrigger value="analytics" data-testid="tab-analytics">Usage Analytics</TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="interviews" className="mt-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 max-h-[400px] overflow-y-auto"
                data-testid="interviews-content"
              >
                {interviews.map((interview) =>
                  interview.excerpts.map((excerpt) => (
                    <div
                      key={excerpt.id}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          {interview.participant} - {interview.role}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${getSentimentColor(
                            excerpt.sentiment
                          )}`}
                        >
                          {excerpt.sentiment}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">&ldquo;{excerpt.text}&rdquo;</p>
                      <div className="flex flex-wrap gap-1">
                        {excerpt.thematicTags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2 py-0.5 text-xs rounded border ${getThemeColor(
                              tag
                            )}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="nps" className="mt-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                data-testid="nps-content"
              >
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {npsDistribution.promoters}%
                    </div>
                    <div className="text-sm text-green-700">Promoters</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      {npsDistribution.passives}%
                    </div>
                    <div className="text-sm text-yellow-700">Passives</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {npsDistribution.detractors}%
                    </div>
                    <div className="text-sm text-red-700">Detractors</div>
                  </div>
                </div>

                <div className="space-y-3 max-h-[280px] overflow-y-auto">
                  <h4 className="font-medium text-sm text-gray-700">Verbatim Comments</h4>
                  {npsResponses.slice(0, 6).map((response) => (
                    <div
                      key={response.id}
                      className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${getSentimentColor(
                            response.category
                          )}`}
                        >
                          Score: {response.score}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">&ldquo;{response.verbatim}&rdquo;</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="support" className="mt-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                data-testid="support-content"
              >
                <div className="space-y-3 mb-6">
                  <h4 className="font-medium text-sm text-gray-700">Category Breakdown</h4>
                  {Object.entries(supportBreakdown.categories).map(([category, percentage]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 capitalize">
                        {category.replace(/_/g, ' ')}
                      </span>
                      <div className="flex items-center">
                        <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                          <div
                            className="h-full bg-vista-primary rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-700">Resolution Times (hours)</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(supportBreakdown.resolutionTimes).map(([priority, hours]) => (
                      <div
                        key={priority}
                        className="p-2 bg-gray-50 rounded text-center"
                      >
                        <div className="text-lg font-semibold text-vista-primary">{hours}h</div>
                        <div className="text-xs text-gray-500 capitalize">{priority}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                data-testid="analytics-content"
              >
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-3">Feature Adoption</h4>
                    {Object.entries(usageAnalytics.featureAdoption).map(([feature, rate]) => (
                      <div key={feature} className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 capitalize">
                          {feature.replace(/_/g, ' ')}
                        </span>
                        <div className="flex items-center">
                          <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                            <div
                              className="h-full bg-vista-accent rounded-full"
                              style={{ width: `${rate}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-700">{rate}%</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-3">Engagement Funnel</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Onboarding Completion</span>
                        <span className="font-medium">{usageAnalytics.engagementFunnel.onboardingCompletion}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Core Feature Activation</span>
                        <span className="font-medium">{usageAnalytics.engagementFunnel.coreFeatureActivation}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Advanced Feature Adoption</span>
                        <span className="font-medium">{usageAnalytics.engagementFunnel.advancedFeatureAdoption}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Churn Risk Indicators</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {usageAnalytics.churnRiskIndicators.map((indicator) => (
                        <li key={indicator}>{indicator}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </CardContent>
    </Card>
  )
}
