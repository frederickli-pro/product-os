'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Check,
  Clock,
  AlertCircle,
  FileText,
  Users,
  CheckCircle2,
  XCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { PRD, PRDSection, ApprovalStatus, CommentThread, StakeholderApproval } from '@/types/prd'

interface PRDViewerProps {
  prd: PRD
  collaborationEnabled?: boolean
  onSectionClick?: (sectionId: string) => void
}

function ApprovalStatusBadge({ status }: { status: ApprovalStatus }) {
  const config = {
    approved: { icon: CheckCircle2, bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Approved' },
    pending: { icon: Clock, bg: 'bg-amber-100', text: 'text-amber-700', label: 'Pending' },
    in_review: { icon: AlertCircle, bg: 'bg-blue-100', text: 'text-blue-700', label: 'In Review' },
    changes_requested: { icon: XCircle, bg: 'bg-rose-100', text: 'text-rose-700', label: 'Changes Requested' }
  }

  const { icon: Icon, bg, text, label } = config[status]

  return (
    <span
      className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', bg, text)}
      data-testid={`approval-status-${status}`}
    >
      <Icon className="w-3 h-3" />
      {label}
    </span>
  )
}

function CommentThreadDisplay({ thread }: { thread: CommentThread }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-3 p-3 bg-amber-50/80 rounded-lg border border-amber-200/60"
      data-testid={`comment-thread-${thread.id}`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-start gap-2 text-left"
      >
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-vista-primary to-vista-secondary flex items-center justify-center text-white text-xs font-bold">
          {thread.author.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm text-gray-900">{thread.author}</span>
            <span className="text-xs text-gray-500">{thread.authorRole}</span>
            {thread.isResolved && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs bg-green-100 text-green-700">
                <Check className="w-3 h-3" />
                Resolved
              </span>
            )}
          </div>
          <p className="text-sm text-gray-700 mt-1">{thread.content}</p>
          {thread.replies.length > 0 && (
            <span className="text-xs text-vista-accent mt-1 inline-flex items-center gap-1">
              {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              {thread.replies.length} {thread.replies.length === 1 ? 'reply' : 'replies'}
            </span>
          )}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && thread.replies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="ml-10 mt-2 space-y-2"
          >
            {thread.replies.map(reply => (
              <div key={reply.id} className="p-2 bg-white/60 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-xs text-gray-900">{reply.author}</span>
                  <span className="text-xs text-gray-500">{reply.authorRole}</span>
                </div>
                <p className="text-xs text-gray-700 mt-1">{reply.content}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function StakeholderApprovalPanel({ approvals }: { approvals: StakeholderApproval[] }) {
  const approvedCount = approvals.filter(a => a.status === 'approved').length
  const totalCount = approvals.length
  const progressPercent = (approvedCount / totalCount) * 100

  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200" data-testid="stakeholder-approvals">
      <div className="flex items-center gap-2 mb-3">
        <Users className="w-4 h-4 text-vista-primary" />
        <span className="font-medium text-sm text-gray-900">Stakeholder Approvals</span>
        <span className="text-xs text-gray-500 ml-auto">{approvedCount}/{totalCount} approved</span>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full mb-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
          data-testid="approval-progress-bar"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {approvals.map((approval, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-100"
            data-testid={`approval-${approval.stakeholder.replace(/\s+/g, '-').toLowerCase()}`}
          >
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold',
                approval.status === 'approved'
                  ? 'bg-emerald-100 text-emerald-700'
                  : approval.status === 'in_review'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600'
              )}
            >
              {approval.avatar || approval.stakeholder.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-gray-900 truncate">{approval.stakeholder}</div>
              <div className="text-xs text-gray-500">{approval.role}</div>
            </div>
            <div>
              {approval.status === 'approved' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
              {approval.status === 'in_review' && <Clock className="w-4 h-4 text-blue-500" />}
              {approval.status === 'pending' && <Clock className="w-4 h-4 text-gray-400" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CollapsibleSection({
  section,
  isExpanded,
  onToggle,
  collaborationEnabled
}: {
  section: PRDSection
  isExpanded: boolean
  onToggle: () => void
  collaborationEnabled: boolean
}) {
  return (
    <div
      className="border border-gray-200 rounded-lg overflow-hidden bg-white/80"
      data-testid={`prd-section-${section.id}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
        data-testid={`prd-section-toggle-${section.id}`}
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </motion.div>
          <span className="font-semibold text-gray-900">{section.title}</span>
          {collaborationEnabled && section.comments.length > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-700">
              <MessageSquare className="w-3 h-3" />
              {section.comments.length}
            </span>
          )}
        </div>
        <ApprovalStatusBadge status={section.approvalStatus} />
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-4 pb-4 border-t border-gray-100">
              <div
                className="prose prose-sm max-w-none mt-4 text-gray-700 whitespace-pre-line"
                data-testid={`prd-section-content-${section.id}`}
              >
                {section.content}
              </div>

              {collaborationEnabled && section.comments.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-vista-accent" />
                    <span className="text-sm font-medium text-gray-700">Comments</span>
                  </div>
                  {section.comments.map(thread => (
                    <CommentThreadDisplay key={thread.id} thread={thread} />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function PRDViewer({ prd, collaborationEnabled = true, onSectionClick }: PRDViewerProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(prd.sections.filter(s => s.isExpanded).map(s => s.id))
  )

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev)
      if (next.has(sectionId)) {
        next.delete(sectionId)
      } else {
        next.add(sectionId)
      }
      return next
    })
    onSectionClick?.(sectionId)
  }

  return (
    <Card className="h-full bg-white/95 backdrop-blur-sm border-gray-200/60 shadow-lg overflow-hidden" data-testid="prd-viewer">
      <CardHeader className="pb-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2 text-vista-primary">
              <FileText className="w-5 h-5" />
              {prd.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1" data-testid="prd-summary">
              {prd.summary.slice(0, 150)}...
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <ApprovalStatusBadge status={prd.status === 'in_review' ? 'in_review' : prd.status === 'approved' ? 'approved' : 'pending'} />
            <span className="text-xs text-gray-500">
              Updated {new Date(prd.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
        {/* Collapsible Sections */}
        <div className="space-y-3" data-testid="prd-sections">
          {prd.sections.map(section => (
            <CollapsibleSection
              key={section.id}
              section={section}
              isExpanded={expandedSections.has(section.id)}
              onToggle={() => toggleSection(section.id)}
              collaborationEnabled={collaborationEnabled}
            />
          ))}
        </div>

        {/* Acceptance Criteria */}
        <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-200/60" data-testid="acceptance-criteria">
          <h4 className="font-semibold text-sm text-gray-900 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            Acceptance Criteria
          </h4>
          <div className="space-y-2">
            {prd.acceptanceCriteria.map((ac, idx) => (
              <div key={ac.id} className="flex items-start gap-2">
                <div
                  className={cn(
                    'flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs mt-0.5',
                    ac.isVerified
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-100 text-gray-500'
                  )}
                >
                  {ac.isVerified ? <Check className="w-3 h-3" /> : idx + 1}
                </div>
                <span className="text-sm text-gray-700" data-testid={`acceptance-criteria-${ac.id}`}>
                  {ac.description}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Edge Cases */}
        <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-200/60" data-testid="edge-cases">
          <h4 className="font-semibold text-sm text-gray-900 mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            Edge Cases
          </h4>
          <div className="space-y-2">
            {prd.edgeCases.map(ec => (
              <div key={ec.id} className="p-2 bg-white/60 rounded border border-amber-100">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={cn(
                      'text-xs px-1.5 py-0.5 rounded',
                      ec.priority === 'high' ? 'bg-rose-100 text-rose-700' :
                      ec.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-600'
                    )}
                  >
                    {ec.priority}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{ec.scenario}</span>
                </div>
                <p className="text-xs text-gray-600" data-testid={`edge-case-${ec.id}`}>
                  {ec.expectedBehavior}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Constraints */}
        <div className="p-4 bg-purple-50/50 rounded-lg border border-purple-200/60" data-testid="technical-constraints">
          <h4 className="font-semibold text-sm text-gray-900 mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-600" />
            Technical Constraints
          </h4>
          <div className="space-y-2">
            {prd.technicalConstraints.map(tc => (
              <div key={tc.id} className="p-2 bg-white/60 rounded border border-purple-100">
                <span className="text-sm font-medium text-gray-900 block" data-testid={`technical-constraint-${tc.id}`}>
                  {tc.constraint}
                </span>
                <span className="text-xs text-gray-500">Impact: {tc.impact}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stakeholder Approvals */}
        {collaborationEnabled && (
          <StakeholderApprovalPanel approvals={prd.stakeholderApprovals} />
        )}
      </CardContent>
    </Card>
  )
}
