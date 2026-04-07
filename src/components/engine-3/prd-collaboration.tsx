'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Check,
  X,
  Clock,
  User,
  Edit3,
  History,
  Users,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Circle,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Types for collaboration features
export interface Stakeholder {
  id: string;
  name: string;
  role: string;
  avatarColor: string;
  initials: string;
}

export interface Comment {
  id: string;
  author: Stakeholder;
  content: string;
  timestamp: Date;
  replies?: Comment[];
}

export interface CommentThread {
  id: string;
  sectionId: string;
  sectionName: string;
  comments: Comment[];
  isResolved: boolean;
}

export interface ApprovalStatus {
  stakeholder: Stakeholder;
  status: 'approved' | 'pending' | 'changes_requested';
  timestamp?: Date;
  note?: string;
}

export interface SuggestedChange {
  id: string;
  author: Stakeholder;
  sectionId: string;
  sectionName: string;
  originalText: string;
  suggestedText: string;
  reason: string;
  timestamp: Date;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface ActiveReviewer {
  stakeholder: Stakeholder;
  section: string;
  lastActive: Date;
}

export interface ChangeHistoryItem {
  id: string;
  author: Stakeholder;
  action: 'created' | 'edited' | 'approved' | 'commented' | 'suggested_change';
  description: string;
  timestamp: Date;
  sectionId?: string;
}

// Mock stakeholders data
export const mockStakeholders: Stakeholder[] = [
  { id: 's1', name: 'Brandon Holden', role: 'CEO', avatarColor: 'bg-vista-blue', initials: 'BH' },
  { id: 's2', name: 'Sarah Chen', role: 'VP Product', avatarColor: 'bg-emerald-500', initials: 'SC' },
  { id: 's3', name: 'Michael Torres', role: 'Engineering Lead', avatarColor: 'bg-amber-500', initials: 'MT' },
  { id: 's4', name: 'Emily Watson', role: 'Design Lead', avatarColor: 'bg-purple-500', initials: 'EW' },
];

// Mock comment threads
export const mockCommentThreads: CommentThread[] = [
  {
    id: 'ct1',
    sectionId: 'acceptance-criteria',
    sectionName: 'Acceptance Criteria',
    isResolved: false,
    comments: [
      {
        id: 'c1',
        author: mockStakeholders[1],
        content: 'Should we add a performance requirement for the unified view loading time?',
        timestamp: new Date('2026-04-06T10:30:00'),
        replies: [
          {
            id: 'c1r1',
            author: mockStakeholders[2],
            content: 'Good point. I suggest < 2 seconds for initial load with cached data.',
            timestamp: new Date('2026-04-06T11:15:00'),
          },
        ],
      },
    ],
  },
  {
    id: 'ct2',
    sectionId: 'technical-constraints',
    sectionName: 'Technical Constraints',
    isResolved: true,
    comments: [
      {
        id: 'c2',
        author: mockStakeholders[2],
        content: 'We need to consider backward compatibility with the legacy API.',
        timestamp: new Date('2026-04-05T14:20:00'),
        replies: [
          {
            id: 'c2r1',
            author: mockStakeholders[1],
            content: 'Agreed. Added a versioning requirement to the constraints.',
            timestamp: new Date('2026-04-05T15:00:00'),
          },
        ],
      },
    ],
  },
];

// Mock approval statuses
export const mockApprovalStatuses: ApprovalStatus[] = [
  { stakeholder: mockStakeholders[0], status: 'approved', timestamp: new Date('2026-04-06T16:00:00') },
  { stakeholder: mockStakeholders[1], status: 'approved', timestamp: new Date('2026-04-06T14:30:00') },
  { stakeholder: mockStakeholders[2], status: 'changes_requested', timestamp: new Date('2026-04-06T12:00:00'), note: 'Need API versioning strategy' },
  { stakeholder: mockStakeholders[3], status: 'pending' },
];

// Mock suggested changes
export const mockSuggestedChanges: SuggestedChange[] = [
  {
    id: 'sc1',
    author: mockStakeholders[2],
    sectionId: 'acceptance-criteria',
    sectionName: 'Acceptance Criteria',
    originalText: 'System shall display unified scheduling-compliance view',
    suggestedText: 'System shall display unified scheduling-compliance view with < 2s load time',
    reason: 'Adding performance requirement for better user experience',
    timestamp: new Date('2026-04-06T11:20:00'),
    status: 'pending',
  },
  {
    id: 'sc2',
    author: mockStakeholders[3],
    sectionId: 'edge-cases',
    sectionName: 'Edge Cases',
    originalText: 'Handle offline mode gracefully',
    suggestedText: 'Handle offline mode with local cache sync and conflict resolution',
    reason: 'Need specific offline behavior for aviation use cases',
    timestamp: new Date('2026-04-06T09:45:00'),
    status: 'accepted',
  },
];

// Mock active reviewers
export const mockActiveReviewers: ActiveReviewer[] = [
  { stakeholder: mockStakeholders[1], section: 'Overview', lastActive: new Date() },
  { stakeholder: mockStakeholders[3], section: 'Edge Cases', lastActive: new Date() },
];

// Mock change history
export const mockChangeHistory: ChangeHistoryItem[] = [
  { id: 'ch1', author: mockStakeholders[0], action: 'approved', description: 'Approved PRD document', timestamp: new Date('2026-04-06T16:00:00') },
  { id: 'ch2', author: mockStakeholders[1], action: 'approved', description: 'Approved with minor suggestions', timestamp: new Date('2026-04-06T14:30:00') },
  { id: 'ch3', author: mockStakeholders[2], action: 'suggested_change', description: 'Suggested performance requirement addition', timestamp: new Date('2026-04-06T11:20:00'), sectionId: 'acceptance-criteria' },
  { id: 'ch4', author: mockStakeholders[3], action: 'edited', description: 'Updated edge cases section', timestamp: new Date('2026-04-06T09:30:00'), sectionId: 'edge-cases' },
  { id: 'ch5', author: mockStakeholders[1], action: 'created', description: 'Initial PRD draft created', timestamp: new Date('2026-04-05T08:00:00') },
];

// Avatar component
function StakeholderAvatar({ stakeholder, size = 'sm', showPulse = false }: { stakeholder: Stakeholder; size?: 'sm' | 'md' | 'lg'; showPulse?: boolean }) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  return (
    <div className="relative" data-testid={`avatar-${stakeholder.id}`}>
      <div
        className={cn(
          'rounded-full flex items-center justify-center text-white font-medium',
          stakeholder.avatarColor,
          sizeClasses[size]
        )}
      >
        {stakeholder.initials}
      </div>
      {showPulse && (
        <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-2 ring-white">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        </span>
      )}
    </div>
  );
}

// Comment Thread component
function CommentThreadItem({ thread, onExpand, isExpanded }: { thread: CommentThread; onExpand: () => void; isExpanded: boolean }) {
  const totalReplies = thread.comments.reduce((acc, c) => acc + (c.replies?.length || 0), 0);
  const totalComments = thread.comments.length + totalReplies;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border rounded-lg overflow-hidden"
      data-testid={`comment-thread-${thread.id}`}
    >
      <button
        onClick={onExpand}
        className="w-full p-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
        data-testid={`thread-toggle-${thread.id}`}
      >
        <div className="flex items-center gap-3">
          <MessageSquare className={cn('w-4 h-4', thread.isResolved ? 'text-green-500' : 'text-vista-blue')} />
          <span className="font-medium text-sm">{thread.sectionName}</span>
          <span className="text-xs text-muted-foreground">({totalComments} comments)</span>
          {thread.isResolved && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Resolved</span>
          )}
        </div>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t"
            data-testid={`thread-expanded-${thread.id}`}
          >
            <div className="p-4 space-y-4">
              {thread.comments.map((comment) => (
                <div key={comment.id} className="space-y-3" data-testid={`comment-${comment.id}`}>
                  <div className="flex items-start gap-3">
                    <StakeholderAvatar stakeholder={comment.author} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{comment.author.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(comment.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                    </div>
                  </div>
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="ml-9 space-y-3 border-l-2 border-gray-200 pl-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start gap-3" data-testid={`reply-${reply.id}`}>
                          <StakeholderAvatar stakeholder={reply.author} size="sm" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{reply.author.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {formatTimestamp(reply.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 mt-1">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Approval Workflow component
export function ApprovalWorkflow({ statuses }: { statuses: ApprovalStatus[] }) {
  const approvedCount = statuses.filter(s => s.status === 'approved').length;
  const totalCount = statuses.length;
  const progressPercentage = (approvedCount / totalCount) * 100;

  return (
    <Card data-testid="approval-workflow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-vista-blue" />
          Approval Workflow
        </CardTitle>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-vista-blue rounded-full"
              data-testid="approval-progress"
            />
          </div>
          <span className="text-sm font-medium" data-testid="approval-count">
            {approvedCount}/{totalCount}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3" data-testid="approval-statuses">
          {statuses.map((status) => (
            <div
              key={status.stakeholder.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              data-testid={`approval-status-${status.stakeholder.id}`}
            >
              <div className="flex items-center gap-3">
                <StakeholderAvatar stakeholder={status.stakeholder} size="md" />
                <div>
                  <p className="font-medium text-sm">{status.stakeholder.name}</p>
                  <p className="text-xs text-muted-foreground">{status.stakeholder.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {status.status === 'approved' && (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-green-500" data-testid="status-approved-icon" />
                    <span className="text-sm text-green-600 font-medium">Approved</span>
                  </>
                )}
                {status.status === 'pending' && (
                  <>
                    <Circle className="w-5 h-5 text-gray-400" data-testid="status-pending-icon" />
                    <span className="text-sm text-gray-500">Pending</span>
                  </>
                )}
                {status.status === 'changes_requested' && (
                  <>
                    <AlertCircle className="w-5 h-5 text-amber-500" data-testid="status-changes-icon" />
                    <span className="text-sm text-amber-600 font-medium">Changes Requested</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Suggested Changes Panel component
export function SuggestedChangesPanel({ changes, onAccept, onReject }: { changes: SuggestedChange[]; onAccept?: (id: string) => void; onReject?: (id: string) => void }) {
  return (
    <Card data-testid="suggested-changes-panel">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-vista-blue" />
          Suggested Changes
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {changes.filter(c => c.status === 'pending').length} pending suggestions
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4" data-testid="suggested-changes-list">
          {changes.map((change) => (
            <motion.div
              key={change.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'p-4 rounded-lg border',
                change.status === 'accepted' && 'bg-green-50 border-green-200',
                change.status === 'rejected' && 'bg-red-50 border-red-200',
                change.status === 'pending' && 'bg-white'
              )}
              data-testid={`suggested-change-${change.id}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <StakeholderAvatar stakeholder={change.author} size="sm" />
                  <span className="text-sm font-medium">{change.author.name}</span>
                  <span className="text-xs text-muted-foreground">
                    in {change.sectionName}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatTimestamp(change.timestamp)}
                </span>
              </div>

              <div className="space-y-2 mb-3">
                <div className="p-2 bg-red-50 rounded text-sm text-red-700 line-through">
                  {change.originalText}
                </div>
                <div className="p-2 bg-green-50 rounded text-sm text-green-700">
                  {change.suggestedText}
                </div>
              </div>

              <p className="text-xs text-muted-foreground mb-3">
                <span className="font-medium">Reason:</span> {change.reason}
              </p>

              {change.status === 'pending' && (
                <div className="flex gap-2" data-testid={`change-actions-${change.id}`}>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-green-600 border-green-300 hover:bg-green-50"
                    onClick={() => onAccept?.(change.id)}
                    data-testid={`accept-change-${change.id}`}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 border-red-300 hover:bg-red-50"
                    onClick={() => onReject?.(change.id)}
                    data-testid={`reject-change-${change.id}`}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Reject
                  </Button>
                </div>
              )}

              {change.status !== 'pending' && (
                <span
                  className={cn(
                    'text-xs font-medium px-2 py-1 rounded',
                    change.status === 'accepted' && 'bg-green-100 text-green-700',
                    change.status === 'rejected' && 'bg-red-100 text-red-700'
                  )}
                  data-testid={`change-status-${change.id}`}
                >
                  {change.status === 'accepted' ? 'Accepted' : 'Rejected'}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Active Reviewers component
export function ActiveReviewersIndicator({ reviewers }: { reviewers: ActiveReviewer[] }) {
  return (
    <Card data-testid="active-reviewers">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="w-5 h-5 text-vista-blue" />
          Active Reviewers
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {reviewers.length} {reviewers.length === 1 ? 'person' : 'people'} viewing now
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3" data-testid="active-reviewers-list">
          {reviewers.length === 0 ? (
            <p className="text-sm text-muted-foreground">No active reviewers</p>
          ) : (
            reviewers.map((reviewer) => (
              <motion.div
                key={reviewer.stakeholder.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-2 rounded-lg bg-gray-50"
                data-testid={`active-reviewer-${reviewer.stakeholder.id}`}
              >
                <div className="flex items-center gap-3">
                  <StakeholderAvatar stakeholder={reviewer.stakeholder} showPulse />
                  <div>
                    <p className="font-medium text-sm">{reviewer.stakeholder.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Viewing: {reviewer.section}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  Online
                </span>
              </motion.div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Change History component
export function ChangeHistoryLog({ history }: { history: ChangeHistoryItem[] }) {
  const actionIcons = {
    created: <Edit3 className="w-4 h-4 text-blue-500" />,
    edited: <Edit3 className="w-4 h-4 text-amber-500" />,
    approved: <CheckCircle2 className="w-4 h-4 text-green-500" />,
    commented: <MessageSquare className="w-4 h-4 text-purple-500" />,
    suggested_change: <Edit3 className="w-4 h-4 text-orange-500" />,
  };

  return (
    <Card data-testid="change-history">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <History className="w-5 h-5 text-vista-blue" />
          Change History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1" data-testid="change-history-list">
          {history.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              data-testid={`history-item-${item.id}`}
            >
              <div className="mt-0.5">{actionIcons[item.action]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <StakeholderAvatar stakeholder={item.author} size="sm" />
                  <span className="font-medium text-sm">{item.author.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(item.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function to format timestamps
function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Main PRD Collaboration component
interface PRDCollaborationProps {
  commentThreads?: CommentThread[];
  approvalStatuses?: ApprovalStatus[];
  suggestedChanges?: SuggestedChange[];
  activeReviewers?: ActiveReviewer[];
  changeHistory?: ChangeHistoryItem[];
  onAcceptChange?: (id: string) => void;
  onRejectChange?: (id: string) => void;
}

export function PRDCollaboration({
  commentThreads = mockCommentThreads,
  approvalStatuses = mockApprovalStatuses,
  suggestedChanges = mockSuggestedChanges,
  activeReviewers = mockActiveReviewers,
  changeHistory = mockChangeHistory,
  onAcceptChange,
  onRejectChange,
}: PRDCollaborationProps) {
  const [expandedThreads, setExpandedThreads] = useState<Set<string>>(new Set());
  const [localSuggestedChanges, setLocalSuggestedChanges] = useState(suggestedChanges);

  const toggleThread = (threadId: string) => {
    setExpandedThreads((prev) => {
      const next = new Set(prev);
      if (next.has(threadId)) {
        next.delete(threadId);
      } else {
        next.add(threadId);
      }
      return next;
    });
  };

  const handleAcceptChange = (id: string) => {
    setLocalSuggestedChanges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'accepted' as const } : c))
    );
    onAcceptChange?.(id);
  };

  const handleRejectChange = (id: string) => {
    setLocalSuggestedChanges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'rejected' as const } : c))
    );
    onRejectChange?.(id);
  };

  return (
    <div className="space-y-6" data-testid="prd-collaboration">
      {/* Comment Threads Section */}
      <Card data-testid="comment-threads-section">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-vista-blue" />
            Comment Threads
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {commentThreads.length} discussions on this PRD
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3" data-testid="comment-threads-list">
            {commentThreads.map((thread) => (
              <CommentThreadItem
                key={thread.id}
                thread={thread}
                isExpanded={expandedThreads.has(thread.id)}
                onExpand={() => toggleThread(thread.id)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Approval Workflow */}
      <ApprovalWorkflow statuses={approvalStatuses} />

      {/* Suggested Changes */}
      <SuggestedChangesPanel
        changes={localSuggestedChanges}
        onAccept={handleAcceptChange}
        onReject={handleRejectChange}
      />

      {/* Active Reviewers */}
      <ActiveReviewersIndicator reviewers={activeReviewers} />

      {/* Change History */}
      <ChangeHistoryLog history={changeHistory} />
    </div>
  );
}

export default PRDCollaboration;
