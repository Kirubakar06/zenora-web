import React from 'react';
import { Card } from '../../components/ui/Card';
import { useTenantStore } from '../../store/tenantStore';

export const UsageMeter: React.FC = () => {
  const tenant = useTenantStore((s) => s.tenant);
  const usage = tenant?.usage;

  const convPercent = usage
    ? Math.round((usage.conversationsThisMonth / usage.conversationsLimit) * 100)
    : 56;

  const agentPercent = usage
    ? Math.round((usage.activeAgents / usage.agentSeatLimit) * 100)
    : 40;

  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold text-white">Current Billing Cycle Consumption</h3>
          <p className="text-xs text-slate-400 mt-0.5">Renews automatically on {tenant?.renewalDate ? new Date(tenant.renewalDate).toLocaleDateString() : 'Jan 1, 2027'}</p>
        </div>
        <span className="text-xs font-mono font-bold text-indigo-400">
          Cycle: Yearly (20% Savings)
        </span>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-medium">Autonomous AI Inbound Sessions</span>
            <span className="text-slate-200 font-mono font-semibold">
              {usage?.conversationsThisMonth.toLocaleString()} / {usage?.conversationsLimit.toLocaleString()} ({convPercent}%)
            </span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              style={{ width: `${convPercent}%` }}
              className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-medium">Agent Seats Used</span>
            <span className="text-slate-200 font-mono font-semibold">
              {usage?.activeAgents} / {usage?.agentSeatLimit} seats ({agentPercent}%)
            </span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              style={{ width: `${agentPercent}%` }}
              className="h-full bg-indigo-500 rounded-full"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
