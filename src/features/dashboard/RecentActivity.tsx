import React from 'react';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { formatRelativeTime } from '../../lib/utils/dateUtils';
import { MOCK_TICKETS } from '../../lib/api/mockData';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export const RecentActivity: React.FC = () => {
  return (
    <Card className="p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white">Recent Case Dispatches</h3>
          <p className="text-xs text-slate-400 mt-0.5">Tickets processed by AI & support staff</p>
        </div>
        <Link
          to={ROUTES.TICKETS}
          className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
        >
          View all <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="space-y-3">
        {MOCK_TICKETS.slice(0, 3).map((ticket) => (
          <div
            key={ticket.id}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Avatar src={ticket.customer?.avatar} name={ticket.customer?.name} size="xs" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-200 truncate max-w-[200px]">
                  {ticket.title}
                </span>
                <span className="text-[10px] text-slate-400">
                  {ticket.customer?.name} • <span className="font-mono text-indigo-400">{ticket.ticketNumber}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {ticket.aiDraftedResponse && (
                <span className="hidden sm:flex items-center gap-1 text-[10px] font-semibold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                  <Sparkles className="h-2.5 w-2.5" /> AI Drafted
                </span>
              )}
              <span className="text-[10px] text-slate-500">{formatRelativeTime(ticket.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
