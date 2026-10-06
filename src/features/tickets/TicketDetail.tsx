import React, { useState } from 'react';
import { Ticket } from '../../types/ticket';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PriorityBadge } from '../../components/common/PriorityBadge';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { formatDateTime } from '../../lib/utils/dateUtils';
import { Sparkles, Check, Clock, UserCheck, MessageSquare } from 'lucide-react';

interface TicketDetailProps {
  ticket: Ticket;
  onUpdateStatus?: (status: Ticket['status']) => void;
  onClose?: () => void;
}

export const TicketDetail: React.FC<TicketDetailProps> = ({ ticket, onUpdateStatus, onClose }) => {
  const [resolutionText, setResolutionText] = useState(ticket.aiDraftedResponse || '');
  const [copied, setCopied] = useState(false);

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(resolutionText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0f1422] p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold text-indigo-400">{ticket.ticketNumber}</span>
            <StatusBadge status={ticket.status} type="ticket" />
            <PriorityBadge priority={ticket.priority} />
          </div>
          <h2 className="text-lg font-bold text-white">{ticket.title}</h2>
          <span className="text-xs text-slate-400">Created {formatDateTime(ticket.createdAt)}</span>
        </div>

        <div className="flex items-center gap-2">
          {ticket.status !== 'resolved' ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onUpdateStatus?.('resolved')}
            >
              <Check className="h-4 w-4 mr-1.5" />
              Resolve Ticket
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateStatus?.('open')}
            >
              Reopen
            </Button>
          )}
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </div>

      {/* Customer & Category Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
        <div className="flex items-center gap-3">
          <Avatar src={ticket.customer?.avatar} name={ticket.customer?.name} size="sm" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-200">{ticket.customer?.name}</span>
            <span className="text-[10px] text-slate-400">{ticket.customer?.company}</span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Category</span>
          <span className="text-xs font-semibold text-slate-200">{ticket.category}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-500 uppercase">SLA Breach Target</span>
          <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {ticket.slaBreachTime ? formatDateTime(ticket.slaBreachTime) : '24h Target'}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Problem Description
        </h4>
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          {ticket.description}
        </div>
      </div>

      {/* AI Drafted Resolution */}
      {ticket.aiDraftedResponse && (
        <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/30 via-slate-900 to-indigo-950/20 border border-cyan-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" /> AI Synthesized Resolution
            </span>
            <Button variant="ghost" size="sm" onClick={handleCopyDraft}>
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </Button>
          </div>
          <p className="text-xs text-slate-200 bg-black/40 p-3 rounded-lg border border-slate-800 leading-relaxed font-mono">
            {ticket.aiDraftedResponse}
          </p>
        </div>
      )}
    </div>
  );
};
