import React from 'react';
import { Customer } from '../../types/customer';
import { formatRelativeTime } from '../../lib/utils/dateUtils';
import { MessageSquare, Clock } from 'lucide-react';

interface CustomerHistoryProps {
  customer: Customer;
}

export const CustomerHistory: React.FC<CustomerHistoryProps> = ({ customer }) => {
  return (
    <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
        Interaction Summary
      </h4>
      <div className="space-y-2 text-xs text-slate-300">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Last Active</span>
          <span>{formatRelativeTime(customer.lastActiveAt)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Total Lifetime Inquiries</span>
          <span>{customer.totalConversations} interactions</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Preferred Channel</span>
          <span>In-App Widget</span>
        </div>
      </div>
    </div>
  );
};
