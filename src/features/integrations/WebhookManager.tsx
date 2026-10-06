import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Webhook, Plus } from 'lucide-react';

export const WebhookManager: React.FC = () => {
  const endpoints = [
    {
      id: '1',
      url: 'https://api.luxeaero.com/webhooks/inbound',
      events: ['ticket.created', 'ticket.resolved'],
      status: 'Active (30s timeout)',
    },
    {
      id: '2',
      url: 'https://finflow.io/events/supportpulse',
      events: ['conversation.escalated'],
      status: 'Active',
    },
  ];

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
            <Webhook className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Outbound Webhooks Subscriptions</h3>
            <p className="text-xs text-slate-400">
              Trigger downstream workflows upon AI responses or ticket updates
            </p>
          </div>
        </div>
        <Button variant="primary" size="sm">
          <Plus className="h-4 w-4 mr-1" /> Add Endpoint
        </Button>
      </div>

      <div className="space-y-2.5 pt-2">
        {endpoints.map((ep) => (
          <div
            key={ep.id}
            className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
          >
            <div>
              <span className="font-mono font-semibold text-slate-200 block">{ep.url}</span>
              <span className="text-[11px] text-slate-400">
                Events: {ep.events.join(', ')}
              </span>
            </div>
            <span className="text-cyan-400 font-semibold">{ep.status}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
