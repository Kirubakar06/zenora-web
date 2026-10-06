import React from 'react';
import { Card } from '../../components/ui/Card';
import { MOCK_INTENTS } from '../../lib/api/mockData';
import { Target, Sparkles } from 'lucide-react';

export const IntentDetection: React.FC = () => {
  return (
    <Card className="p-6 space-y-4">
      <div>
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Target className="h-4 w-4 text-purple-400" />
          Discovered Customer Intent Clusters
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Unsupervised clustering of repetitive user problems & autonomous success rate
        </p>
      </div>

      <div className="space-y-3">
        {MOCK_INTENTS.map((intent) => (
          <div
            key={intent.id}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">{intent.name}</span>
              <span className="text-xs font-bold text-cyan-400">
                {intent.autoResolutionRate}% Auto-Resolved
              </span>
            </div>

            <p className="text-xs text-slate-400">{intent.description}</p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px]">
              <span className="text-slate-500 font-mono">{intent.frequency} instances logged</span>
              <span className="text-indigo-400 font-medium">Action: {intent.suggestedAction}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
