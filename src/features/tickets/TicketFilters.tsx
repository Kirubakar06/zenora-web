import React from 'react';
import { SearchInput } from '../../components/common/SearchInput';

interface TicketFiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  statusFilter: string;
  onStatusChange: (val: string) => void;
  priorityFilter: string;
  onPriorityChange: (val: string) => void;
}

export const TicketFilters: React.FC<TicketFiltersProps> = ({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
      <div className="w-full sm:w-72">
        <SearchInput value={search} onChange={onSearchChange} placeholder="Search tickets..." />
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-xl bg-slate-900 border border-slate-700/60 text-slate-300 text-xs px-3 py-2 focus:outline-none focus:border-indigo-500"
        >
          <option value="all">All Statuses</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="escalated">Escalated</option>
          <option value="resolved">Resolved</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="rounded-xl bg-slate-900 border border-slate-700/60 text-slate-300 text-xs px-3 py-2 focus:outline-none focus:border-indigo-500"
        >
          <option value="all">All Priorities</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
    </div>
  );
};
