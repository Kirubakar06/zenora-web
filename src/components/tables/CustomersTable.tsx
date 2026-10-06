import React from 'react';
import { Customer } from '../../types/customer';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { formatCurrency } from '../../lib/utils/formatters';
import { formatRelativeTime } from '../../lib/utils/dateUtils';
import { Heart, Activity } from 'lucide-react';

interface CustomersTableProps {
  customers: Customer[];
  onSelectCustomer?: (customer: Customer) => void;
}

export const CustomersTable: React.FC<CustomersTableProps> = ({ customers, onSelectCustomer }) => {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-800/80 bg-[#111726]/60 backdrop-blur-xl">
      <table className="w-full text-left text-xs">
        <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
          <tr>
            <th className="py-3.5 px-4">Customer</th>
            <th className="py-3.5 px-4">Plan / Tier</th>
            <th className="py-3.5 px-4">MRR</th>
            <th className="py-3.5 px-4">Health Score</th>
            <th className="py-3.5 px-4">Open Tickets</th>
            <th className="py-3.5 px-4">Tags</th>
            <th className="py-3.5 px-4">Last Active</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {customers.map((cust) => (
            <tr
              key={cust.id}
              onClick={() => onSelectCustomer?.(cust)}
              className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
            >
              <td className="py-3.5 px-4">
                <div className="flex items-center gap-3">
                  <Avatar src={cust.avatar} name={cust.name} size="sm" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                      {cust.name}
                    </span>
                    <span className="text-[11px] text-slate-400">{cust.email}</span>
                  </div>
                </div>
              </td>
              <td className="py-3.5 px-4">
                <span className="capitalize font-medium text-slate-300 px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700/60">
                  {cust.plan}
                </span>
              </td>
              <td className="py-3.5 px-4 font-mono font-semibold text-slate-200">
                {formatCurrency(cust.mrr)}
              </td>
              <td className="py-3.5 px-4">
                <div className="flex items-center gap-1.5">
                  <Heart
                    className={`h-3.5 w-3.5 ${
                      cust.healthScore > 80
                        ? 'text-emerald-400 fill-emerald-400/20'
                        : cust.healthScore > 65
                        ? 'text-amber-400 fill-amber-400/20'
                        : 'text-rose-400 fill-rose-400/20'
                    }`}
                  />
                  <span className="font-bold text-slate-200">{cust.healthScore}%</span>
                </div>
              </td>
              <td className="py-3.5 px-4">
                <span
                  className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                    cust.openTicketsCount > 0
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {cust.openTicketsCount} tickets
                </span>
              </td>
              <td className="py-3.5 px-4">
                <div className="flex flex-wrap gap-1 max-w-xs">
                  {cust.tags.map((tag) => (
                    <Badge key={tag} size="sm" variant="neutral">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </td>
              <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                {formatRelativeTime(cust.lastActiveAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
