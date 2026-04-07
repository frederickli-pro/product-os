'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { SDLCStepper } from '@/components/dashboard/sdlc-stepper';
import { PRDCollaboration } from '@/components/engine-3/prd-collaboration';
import { TransitionPrompt } from '@/components/shared/transition-prompt';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Target } from 'lucide-react';

// Mock PRD data for display
const mockPRD = {
  title: 'Unified Scheduling-Compliance Platform',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      content: 'Integrate scheduling and compliance modules into a unified view that reduces operational complexity for aviation operations teams.',
    },
    {
      id: 'acceptance-criteria',
      title: 'Acceptance Criteria',
      content: 'System shall display unified scheduling-compliance view with real-time data sync between modules.',
    },
    {
      id: 'edge-cases',
      title: 'Edge Cases',
      content: 'Handle offline mode with local cache sync and conflict resolution for aviation use cases.',
    },
    {
      id: 'technical-constraints',
      title: 'Technical Constraints',
      content: 'Must maintain backward compatibility with legacy API. Versioning strategy required for gradual migration.',
    },
  ],
};

export default function Engine3Page() {
  return (
    <div className="min-h-screen bg-gray-50" data-testid="engine-3-page">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Engine 3: Execution
          </h1>
          <p className="text-gray-600">
            PRD generation and collaboration workflow — Act 3
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <SDLCStepper
            currentStage="develop"
            completedStages={['discovery', 'design']}
            contextMessage="Prioritization reasoning carried from Engine 2"
          />
        </motion.div>

        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* PRD Document Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="col-span-7"
          >
            <Card data-testid="prd-viewer">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-vista-blue" />
                  PRD Document
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {mockPRD.title}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4" data-testid="prd-sections">
                  {mockPRD.sections.map((section) => (
                    <div
                      key={section.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      data-testid={`prd-section-${section.id}`}
                    >
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {section.title}
                      </h3>
                      <p className="text-sm text-gray-600">{section.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Metrics Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6"
            >
              <Card data-testid="metrics-table">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-vista-blue" />
                    Time Reduction Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 font-semibold">Metric</th>
                          <th className="text-center py-2 font-semibold">Manual Process</th>
                          <th className="text-center py-2 font-semibold">With Product OS</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">PRD creation</td>
                          <td className="text-center py-2 text-red-600">1-2 weeks</td>
                          <td className="text-center py-2 text-green-600 font-medium">Hours</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Prioritization cycle</td>
                          <td className="text-center py-2 text-red-600">3-4 weeks/quarter</td>
                          <td className="text-center py-2 text-green-600 font-medium">3-5 days</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Decision documentation</td>
                          <td className="text-center py-2 text-red-600">~30% captured</td>
                          <td className="text-center py-2 text-green-600 font-medium">95%+ auto-captured</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Time to eng-ready artifacts</td>
                          <td className="text-center py-2 text-red-600">2-4 weeks</td>
                          <td className="text-center py-2 text-green-600 font-medium">Days</td>
                        </tr>
                        <tr>
                          <td className="py-2">Rework from misunderstood requirements</td>
                          <td className="text-center py-2 text-red-600">25-35% of sprints</td>
                          <td className="text-center py-2 text-green-600 font-medium">Under 10%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Collaboration Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-5"
          >
            <div data-testid="collaboration-panel">
              <PRDCollaboration />
            </div>
          </motion.div>
        </div>

        {/* Callout Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="py-6">
              <p className="text-lg text-amber-900 font-medium text-center italic">
                "This is where most frameworks stop. This is where execution usually breaks. The Product Operating System doesn't."
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <TransitionPrompt
            message="Execution ready. Now see how governance ensures persistent accountability."
            nextHref="/engine-4"
          />
        </motion.div>
      </main>
    </div>
  );
}
