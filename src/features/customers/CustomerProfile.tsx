import React from 'react';
import { Customer } from '../../types/customer';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { formatCurrency } from '../../lib/utils/formatters';
import { Mail, MapPin, Building, Calendar, Heart, ShieldCheck } from 'lucide-react';

interface CustomerProfileProps {
  customer: Customer;
}

export const CustomerProfile: React.FC<CustomerProfileProps> = ({ customer }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0f1422] p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <Avatar src={customer.avatar} name={customer.name} size="lg" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">{customer.name}</h2>
              <Badge variant="purple">{customer.plan}</Badge>
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
              <Building className="h-3.5 w-3.5" /> {customer.company || 'Private Customer'}
              {customer.location && (
                <>
                  <span>•</span>
                  <MapPin className="h-3.5 w-3.5" /> {customer.location}
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-right">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Monthly MRR</span>
            <span className="text-base font-extrabold text-white font-mono">
              {formatCurrency(customer.mrr)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs text-slate-400 flex items-center gap-1.5 mb-2">
            <Heart className="h-4 w-4 text-emerald-400" /> Account Health Score
          </span>
          <span className="text-2xl font-bold text-white">{customer.healthScore}%</span>
          <p className="text-[11px] text-slate-400 mt-2">{customer.sentimentSummary}</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs text-slate-400 flex items-center gap-1.5 mb-2">
            <ShieldCheck className="h-4 w-4 text-indigo-400" /> Total Conversations
          </span>
          <span className="text-2xl font-bold text-white">{customer.totalConversations}</span>
          <span className="text-[11px] text-slate-400 block mt-2">
            {customer.openTicketsCount} currently pending resolution
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs text-slate-400 flex items-center gap-1.5 mb-2">
            <Calendar className="h-4 w-4 text-cyan-400" /> Customer Since
          </span>
          <span className="text-base font-bold text-white">
            {new Date(customer.createdAt).toLocaleDateString()}
          </span>
          <span className="text-[11px] text-slate-400 block mt-2">Enterprise SLA Active</span>
        </div>
      </div>
    </div>
  );
};
