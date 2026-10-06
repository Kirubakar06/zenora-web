import React from 'react';
import { Card } from '../../components/ui/Card';
import { MOCK_CHANNEL_STATS } from '../../lib/api/mockData';

export const ChannelDistribution: React.FC = () => {
  return (
    <Card className="p-6 space-y-4">
      <div>
        <h3 className="text-sm font-bold text-white">Inbound Volume by Channel</h3>
        <p className="text-xs text-slate-400 mt-0.5">Where your users seek support</p>
      </div>

      <div className="space-y-3">
        {MOCK_CHANNEL_STATS.map((c) => (
          <div key={c.channel} className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="font-semibold text-slate-300">{c.channel}</span>
              <span className="text-slate-400 font-mono">
                {c.count.toLocaleString()} ({c.percentage}%)
              </span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div style={{ width: `${c.percentage}%` }} className="h-full bg-indigo-500 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
