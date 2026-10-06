import React from 'react';
import { Card } from '../ui/Card';
import { Smile, Meh, Frown } from 'lucide-react';

export const SentimentChart: React.FC = () => {
  const stats = [
    { label: 'Positive', percentage: 76, color: 'bg-emerald-500', icon: Smile, text: 'text-emerald-400' },
    { label: 'Neutral', percentage: 18, color: 'bg-amber-500', icon: Meh, text: 'text-amber-400' },
    { label: 'Frustrated', percentage: 6, color: 'bg-rose-500', icon: Frown, text: 'text-rose-400' },
  ];

  return (
    <Card className="p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white">Sentiment Intelligence</h3>
          <p className="text-xs text-slate-400 mt-0.5">Real-time NLP customer emotion analysis</p>
        </div>
        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
          94% Satisfaction
        </span>
      </div>

      {/* Progress Bar Stack */}
      <div className="space-y-3 my-2">
        <div className="h-3 w-full bg-slate-800 rounded-full flex overflow-hidden">
          {stats.map((s) => (
            <div
              key={s.label}
              style={{ width: `${s.percentage}%` }}
              className={`${s.color} transition-all duration-500`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 pt-2">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon className={`h-4 w-4 ${s.text}`} />
                  <span className="text-[11px] text-slate-400 font-medium">{s.label}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-extrabold text-white">{s.percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-800 flex items-center justify-between">
        <span>Auto-escalation triggers on 2 consecutive frustrated flags</span>
        <span className="text-indigo-400 font-semibold cursor-pointer hover:underline">Config</span>
      </div>
    </Card>
  );
};
