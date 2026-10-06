import React from 'react';
import { Card } from '../../components/ui/Card';
import { ShieldCheck } from 'lucide-react';

export const SLACompliance: React.FC = () => {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            SLA Target Adherence
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Response & resolution targets</p>
        </div>
        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
          99.4% Overall
        </span>
      </div>

      <div className="space-y-3">
        <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
          <div>
            <span className="font-semibold text-slate-200 block">First Response SLA (&lt;15 min)</span>
            <span className="text-[11px] text-slate-400">Avg achieved: 1.4s (via AI Copilot)</span>
          </div>
          <span className="font-bold text-emerald-400">99.8%</span>
        </div>

        <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
          <div>
            <span className="font-semibold text-slate-200 block">Resolution SLA (&lt; 4 hours)</span>
            <span className="text-[11px] text-slate-400">Avg achieved: 28 min</span>
          </div>
          <span className="font-bold text-emerald-400">98.9%</span>
        </div>
      </div>
    </Card>
  );
};
