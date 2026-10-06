import React from 'react';
import { PRIORITY_CONFIG } from '../../constants/status';

interface PriorityBadgeProps {
  priority: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const config = (PRIORITY_CONFIG as any)[priority] || {
    label: priority,
    color: 'bg-slate-800 text-slate-300 border-slate-700',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold border tracking-wider uppercase ${config.color}`}>
      {config.label}
    </span>
  );
};
