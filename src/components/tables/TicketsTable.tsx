import React from 'react';
import { Ticket } from '../../types/ticket';
import { StatusBadge } from '../common/StatusBadge';
import { PriorityBadge } from '../common/PriorityBadge';
import { Avatar } from '../ui/Avatar';
import { formatRelativeTime } from '../../lib/utils/dateUtils';
import { Clock } from 'lucide-react';

interface TicketsTableProps {
  tickets: Ticket[];
  onSelectTicket?: (ticket: Ticket) => void;
}

export const TicketsTable: React.FC<TicketsTableProps> = ({ tickets, onSelectTicket }) => {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-800/80 bg-[#111726]/60 backdrop-blur-xl">
      <table className="w-full text-left text-xs">
        <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
          <tr>
            <th className="py-3.5 px-4 whitespace-nowrap">Ticket</th>
            <th className="py-3.5 px-4 whitespace-nowrap">Customer</th>
            <th className="py-3.5 px-4 whitespace-nowrap">Status</th>
            <th className="py-3.5 px-4 whitespace-nowrap">Priority</th>
            <th className="py-3.5 px-4 whitespace-nowrap">Assignee</th>
            <th className="py-3.5 px-4 whitespace-nowrap">SLA Breach</th>
            <th className="py-3.5 px-4 whitespace-nowrap">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              onClick={() => onSelectTicket?.(ticket)}
              className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
            >
              <td className="py-3.5 px-4">
                <div className="flex flex-col">
                  <span className="font-mono text-indigo-400 font-semibold group-hover:underline">
                    {ticket.ticketNumber}
                  </span>
                  <span className="text-slate-200 font-medium text-xs truncate max-w-xs mt-0.5">
                    {ticket.title}
                  </span>
                </div>
              </td>
              <td className="py-3.5 px-4">
                <div className="flex items-center gap-2">
                  <Avatar
                    src={ticket.customer?.avatar}
                    name={ticket.customer?.name || 'Customer'}
                    size="xs"
                  />
                  <div className="flex flex-col">
                    <span className="text-slate-200 font-medium">{ticket.customer?.name}</span>
                    <span className="text-[10px] text-slate-500">{ticket.customer?.company}</span>
                  </div>
                </div>
              </td>
              <td className="py-3.5 px-4">
                <StatusBadge status={ticket.status} type="ticket" />
              </td>
              <td className="py-3.5 px-4">
                <PriorityBadge priority={ticket.priority} />
              </td>
              <td className="py-3.5 px-4">
                {ticket.assignedAgent ? (
                  <div className="flex items-center gap-1.5">
                    <Avatar
                      src={ticket.assignedAgent.avatar}
                      name={ticket.assignedAgent.name}
                      size="xs"
                    />
                    <span className="text-slate-300">{ticket.assignedAgent.name}</span>
                  </div>
                ) : (
                  <span className="text-slate-500 italic">Unassigned</span>
                )}
              </td>
              <td className="py-3.5 px-4">
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="h-3 w-3 text-slate-500" />
                  {ticket.slaBreachTime ? formatRelativeTime(ticket.slaBreachTime) : '24h SLA'}
                </div>
              </td>
              <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                {formatRelativeTime(ticket.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
