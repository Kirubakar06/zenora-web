export const TICKET_STATUS_CONFIG = {
  open: {
    label: 'Open',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    dotColor: 'bg-emerald-400',
  },
  in_progress: {
    label: 'In Progress',
    color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    dotColor: 'bg-indigo-400',
  },
  waiting_on_customer: {
    label: 'Waiting on Customer',
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    dotColor: 'bg-amber-400',
  },
  escalated: {
    label: 'Escalated',
    color: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    dotColor: 'bg-rose-400',
  },
  resolved: {
    label: 'Resolved',
    color: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    dotColor: 'bg-slate-400',
  },
  closed: {
    label: 'Closed',
    color: 'bg-zinc-800 text-zinc-400 border-zinc-700',
    dotColor: 'bg-zinc-500',
  },
} as const;

export const PRIORITY_CONFIG = {
  low: {
    label: 'Low',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  medium: {
    label: 'Medium',
    color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  },
  high: {
    label: 'High',
    color: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  },
  urgent: {
    label: 'Urgent',
    color: 'bg-red-500/10 text-red-400 border-red-500/20 animate-pulse',
  },
} as const;

export const CONVERSATION_STATUS_CONFIG = {
  ai_handling: {
    label: 'AI Autonomous',
    color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    icon: 'Bot',
  },
  queued: {
    label: 'Queued',
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    icon: 'Clock',
  },
  assigned: {
    label: 'Agent Active',
    color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    icon: 'UserCheck',
  },
  resolved: {
    label: 'Resolved',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    icon: 'CheckCircle2',
  },
  snoozed: {
    label: 'Snoozed',
    color: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    icon: 'Pause',
  },
} as const;
