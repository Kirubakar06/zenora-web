import React from 'react';
import { Card } from '../../components/ui/Card';
import { ShieldAlert, ArrowRight } from 'lucide-react';

export const EscalationRules: React.FC = () => {
  const rules = [
    {
      trigger: 'Customer sentiment < -0.4 for 2 messages',
      action: 'Auto-transfer to Tier 2 Lead (Sarah Chen)',
      active: true,
    },
    {
      trigger: 'SLA deadline < 60 minutes remaining',
      action: 'Broadcast urgent alert in #support-triage Slack',
      active: true,
    },
    {
      trigger: 'Account MRR > $5,000 requests custom change',
      action: 'Notify Account Executive & Supervisor',
      active: true,
    },
  ];

  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center gap-2">
        <ShieldAlert className="h-4 w-4 text-rose-400" />
        <h4 className="text-sm font-bold text-white">Automated Escalation Triggers</h4>
      </div>
      <div className="space-y-2">
        {rules.map((r, i) => (
          <div
            key={i}
            className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-rose-300">IF: {r.trigger}</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <ArrowRight className="h-3 w-3 text-indigo-400" />
              <span>THEN: {r.action}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
