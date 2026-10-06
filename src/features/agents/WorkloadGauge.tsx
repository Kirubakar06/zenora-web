import React from 'react';
import { Card } from '../../components/ui/Card';

export const WorkloadGauge: React.FC = () => {
  return (
    <Card className="p-5 space-y-3">
      <div className="flex justify-between items-center text-xs">
        <h4 className="font-bold text-slate-300 uppercase tracking-wider">Shift Workload Load</h4>
        <span className="font-bold text-emerald-400">Optimal (58%)</span>
      </div>
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full w-[58%]" />
      </div>
      <p className="text-[11px] text-slate-400">
        AI deflection absorbed 78.4% of total volume, preventing team burnout.
      </p>
    </Card>
  );
};
