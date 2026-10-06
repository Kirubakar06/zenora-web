import React from 'react';
import { Badge } from '../ui/Badge';
import { TICKET_STATUS_CONFIG, CONVERSATION_STATUS_CONFIG } from '../../constants/status';

interface StatusBadgeProps {
  status: string;
  type?: 'ticket' | 'conversation';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'ticket' }) => {
  if (type === 'ticket') {
    const config = (TICKET_STATUS_CONFIG as any)[status] || {
      label: status,
      color: 'bg-slate-800 text-slate-300 border-slate-700',
    };
    return (
      <span className={`inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.color}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${config.dotColor || 'bg-slate-400'}`} />
        {config.label}
      </span>
    );
  }

  const config = (CONVERSATION_STATUS_CONFIG as any)[status] || {
    label: status,
    color: 'bg-slate-800 text-slate-300 border-slate-700',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.color}`}>
      {config.label}
    </span>
  );
};
