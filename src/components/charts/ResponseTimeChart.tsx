import React from 'react';
import { Card } from '../ui/Card';
import { Zap, Clock } from 'lucide-react';

export const ResponseTimeChart: React.FC = () => {
  return (
    <Card className="p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-amber-400" />
            First Response Latency SLA
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">AI vs Human agent response speed</p>
        </div>
        <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
          99.8% SLA Met
        </span>
      </div>

      <div className="space-y-4 my-2">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-slate-300 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-cyan-400" /> AI Autonomous Copilot
            </span>
            <span className="text-cyan-400 font-bold">1.4 seconds</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-400 rounded-full w-[12%]" />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-slate-300 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-indigo-500" /> Human Agent Handling
            </span>
            <span className="text-indigo-400 font-bold">4.2 minutes</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full w-[45%]" />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-slate-300 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-slate-500" /> Industry Benchmark
            </span>
            <span className="text-slate-400 font-bold">18.0 minutes</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-slate-600 rounded-full w-[88%]" />
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-slate-400">
        <Clock className="h-3.5 w-3.5 text-indigo-400" />
        <span>AI saves an estimated 240 agent hours each week</span>
      </div>
    </Card>
  );
};
