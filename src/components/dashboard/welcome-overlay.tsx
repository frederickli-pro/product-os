'use client';

/**
 * Welcome overlay component for first-time users.
 * Owner: Scenario 1 - Dashboard Hub Navigation
 *
 * Features:
 * - Explains four-act demo flow
 * - Navigation options
 * - First-time user guidance
 */

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Compass, TrendingUp, Clock, Shield, CheckCircle2, Database, HelpCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { getPortfolioCoName } from '@/lib/utils/env-config';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { WelcomeOverlayProps } from '@/types/engine';

const actDescriptions = [
  {
    act: 1,
    title: 'Act 1: Diagnostic',
    description: 'Understand where the portfolio company actually is through an evidence-based AI maturity assessment',
    stage: 'Discovery',
  },
  {
    act: 2,
    title: 'Act 2: Prioritization',
    description: 'See how AI initiatives emerge with transparent reasoning and trade-off analysis',
    stage: 'Design',
  },
  {
    act: 3,
    title: 'Act 3: Execution',
    description: 'Watch AI integration decisions transform into shipped product artifacts',
    stage: 'Develop',
  },
  {
    act: 4,
    title: 'Act 4: Governance',
    description: 'Scale AI adoption accountability across the PE portfolio with compounding intelligence',
    stage: 'Deploy',
  },
];

const integrations = [
  { label: 'CRM', detail: 'Salesforce — 2,400 accounts, 18 months of deal history', status: 'connected' },
  { label: 'Support Tickets', detail: 'Zendesk — 14,200 tickets across 8 categories', status: 'connected' },
  { label: 'Product Backlog', detail: 'Jira — 340 open issues, 12 active sprints', status: 'connected' },
  { label: 'Customer Feedback', detail: 'NPS surveys + in-app reviews — 1,800 responses', status: 'connected' },
  { label: 'Product Analytics', detail: 'Mixpanel — feature usage, funnels, retention cohorts', status: 'connected' },
];

export function WelcomeOverlay({ isOpen, onClose, onStartDemo }: WelcomeOverlayProps) {
  const portfolioCo = getPortfolioCoName();

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent
            className="sm:max-w-[620px] max-h-[90vh] flex flex-col p-0 gap-0"
            data-testid="welcome-overlay"
          >
            {/* Fixed header */}
            <div className="px-6 pt-6 pb-4 border-b flex-shrink-0">
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-2">
                  <Compass className="h-6 w-6 text-vista-blue" />
                  Welcome to the Product AI Operating System
                </DialogTitle>
                <DialogDescription className="text-base">
                  Experience the four-act demo that shows how to turn strategic AI mandates
                  into systematic execution across portfolio companies.
                </DialogDescription>
              </DialogHeader>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">

              {/* PE Operating Partner Framing */}
              <div className="rounded-lg border border-vista-blue/20 bg-vista-blue/5 p-4 space-y-2">
                <p className="text-sm font-semibold uppercase tracking-wide text-vista-blue">
                  Your Role
                </p>
                <p className="text-sm font-medium leading-relaxed">
                  You are a PE operating partner. Your firm just acquired{' '}
                  <span className="text-vista-blue font-semibold">{portfolioCo}</span> — a B2B SaaS company with strong fundamentals and clear upside.{' '}
                  <strong>You have 90 days to identify and execute the top value-driving initiatives to increase growth while reducing risk.</strong>
                </p>
              </div>

              {/* The Challenge */}
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-amber-600 flex-shrink-0" />
                  <p className="text-sm font-semibold text-amber-800">The Challenge</p>
                </div>
                <p className="text-sm text-amber-800 leading-relaxed">
                  The old approach: sit in a room with leadership and ask{' '}
                  <em>"what are the top three things you want to solve?"</em> — but they would have solved those already if they knew.
                  Leadership can't see the forest through the trees.
                </p>
                <div className="flex items-start gap-2 text-sm text-amber-700 pt-1">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    Without a systematic diagnostic, teams often commit to the wrong priority — spending months on what turns out to be 5% of the actual problem.
                  </span>
                </div>
              </div>

              {/* Integrations Connected */}
              <div className="rounded-lg border bg-secondary/40 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Integrations Connected
                  </p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                    Setup complete · 2 weeks ago
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Upon acquisition, we hooked into {portfolioCo}&apos;s key systems of record. The data below powers everything you&apos;re about to see.
                </p>
                <div className="space-y-2">
                  {integrations.map((integration) => (
                    <div key={integration.label} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-sm font-medium">{integration.label}</span>
                        <span className="text-xs text-muted-foreground ml-2">{integration.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground border-t">
                  <Database className="h-3.5 w-3.5" />
                  <span>All data synthesized and ready. Two weeks of processing → now we diagnose.</span>
                </div>
              </div>

              {/* Objectives */}
              <div className="rounded-lg border bg-secondary/40 p-4 space-y-2">
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  The Mandate
                </p>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-start gap-2 text-sm">
                    <Clock className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span><strong>90-day window:</strong> identify and execute the top value-driving initiatives before the window closes.</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Growth objective:</strong> accelerate revenue and product velocity through systematic AI adoption.</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Shield className="h-4 w-4 text-vista-blue mt-0.5 flex-shrink-0" />
                    <span><strong>Risk objective:</strong> reduce execution and governance risk — make sure we&apos;re working on what actually matters.</span>
                  </div>
                </div>
              </div>

              {/* Four-Act Journey */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  The Four-Act Journey
                </h4>
                <div className="grid gap-3">
                  {actDescriptions.map((act, index) => (
                    <motion.div
                      key={act.act}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-vista-blue text-white text-sm font-bold flex-shrink-0">
                        {act.act}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{act.title}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-vista-blue/10 text-vista-blue">
                            {act.stage}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {act.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>One platform.</strong> Empowered portfolio companies. Shared context for PE firms.
                    Complete lifecycle. From AI mandate to integrated AI outcomes, much faster.
                  </p>
                </div>
              </div>
            </div>

            {/* Fixed footer */}
            <div className="px-6 py-4 border-t flex-shrink-0">
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={onClose}>
                  Explore on my own
                </Button>
                <Link
                  href="/engine-1"
                  onClick={onStartDemo}
                  className={buttonVariants({ variant: 'default' }) + ' gap-2'}
                  data-testid="start-demo-button"
                >
                  <Play className="h-4 w-4" />
                  Start the Journey
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
