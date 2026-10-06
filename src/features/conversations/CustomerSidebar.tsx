import React from 'react';
import { Customer } from '../../types/customer';
import { Conversation } from '../../types/conversation';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { formatCurrency } from '../../lib/utils/formatters';
import { formatRelativeTime } from '../../lib/utils/dateUtils';
import {
  Heart,
  Ticket,
  CheckCircle,
  ExternalLink,
  Shield,
  Tag,
  Mail,
  MapPin,
} from 'lucide-react';
import { useChatStore } from '../../store/chatStore';

interface CustomerSidebarProps {
  customer: Customer;
  conversation: Conversation;
}

export const CustomerSidebar: React.FC<CustomerSidebarProps> = ({ customer, conversation }) => {
  const updateConversationStatus = useChatStore((s) => s.updateConversationStatus);

  return (
    <div className="w-72 lg:w-80 border-l border-slate-800/80 bg-[#0d1322]/95 h-full overflow-y-auto p-4 space-y-5 flex-shrink-0 scrollbar-thin">
      {/* Customer Header */}
      <div className="flex flex-col items-center text-center pb-4 border-b border-slate-800">
        <Avatar src={customer.avatar} name={customer.name} size="lg" />
        <h3 className="text-sm font-bold text-white mt-2">{customer.name}</h3>
        <p className="text-xs text-slate-400">{customer.company || customer.email}</p>

        <div className="flex items-center gap-2 mt-3">
          <Badge variant="purple" size="sm">
            {customer.plan}
          </Badge>
          <span className="text-xs font-mono font-bold text-slate-300">
            {formatCurrency(customer.mrr)} / mo
          </span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-center"
          onClick={() =>
            updateConversationStatus(
              conversation.id,
              conversation.status === 'resolved' ? 'assigned' : 'resolved'
            )
          }
        >
          <CheckCircle className="h-3.5 w-3.5 mr-1.5 text-emerald-400" />
          <span>{conversation.status === 'resolved' ? 'Re-open Session' : 'Mark as Resolved'}</span>
        </Button>
      </div>

      {/* Customer Health & Sentiment */}
      <div className="space-y-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Heart className="h-3.5 w-3.5 text-rose-400" /> Account Health
          </span>
          <span className="font-bold text-emerald-400">{customer.healthScore}%</span>
        </div>

        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div
            style={{ width: `${customer.healthScore}%` }}
            className="h-full bg-emerald-500 rounded-full"
          />
        </div>

        <p className="text-[11px] text-slate-400 pt-1 leading-relaxed">
          {customer.sentimentSummary}
        </p>
      </div>

      {/* Detected AI Intents */}
      {conversation.sentiment.detectedIntents.length > 0 && (
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Detected Query Intents
          </span>
          <div className="flex flex-wrap gap-1.5">
            {conversation.sentiment.detectedIntents.map((intent) => (
              <span
                key={intent}
                className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-cyan-950/60 text-cyan-300 border border-cyan-800/40"
              >
                {intent}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Contact Details */}
      <div className="space-y-2 text-xs">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Customer Attributes
        </span>
        <div className="flex items-center gap-2 text-slate-300">
          <Mail className="h-3.5 w-3.5 text-slate-500" />
          <span className="truncate">{customer.email}</span>
        </div>
        {customer.location && (
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="h-3.5 w-3.5 text-slate-500" />
            <span>{customer.location}</span>
          </div>
        )}
      </div>

      {/* Tags */}
      <div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
          Tags
        </span>
        <div className="flex flex-wrap gap-1.5">
          {customer.tags.map((t) => (
            <Badge key={t} size="sm" variant="neutral">
              {t}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
