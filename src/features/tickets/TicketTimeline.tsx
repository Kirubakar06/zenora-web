import React from 'react';
import { TicketActivity } from '../../types/ticket';
import { formatDateTime } from '../../lib/utils/dateUtils';
import { CircleDot } from 'lucide-react';

interface TicketTimelineProps {
  activities?: TicketActivity[];
}

export const TicketTimeline: React.FC<TicketTimelineProps> = ({ activities = [] }) => {
  if (activities.length === 0) {
    return <p className="text-xs text-slate-500 italic">No activity recorded yet</p>;
  }

  return (
    <div className="space-y-4 pl-2 border-l border-slate-800">
      {activities.map((act) => (
        <div key={act.id} className="relative pl-4">
          <CircleDot className="h-3 w-3 text-indigo-400 absolute -left-[7px] top-1 bg-[#0a0d14]" />
          <div className="text-xs">
            <span className="font-bold text-slate-200">{act.actorName}</span>{' '}
            <span className="text-slate-400">{act.action}</span>
          </div>
          <span className="text-[10px] text-slate-500">{formatDateTime(act.timestamp)}</span>
        </div>
      ))}
    </div>
  );
};
