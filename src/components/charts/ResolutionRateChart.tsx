import React from 'react';
import { Card } from '../ui/Card';
import { Sparkles } from 'lucide-react';

export const ResolutionRateChart: React.FC = () => {
  const percentage = 78.4;
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card className="p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            Autonomous AI Resolution
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">End-to-end zero human touch</p>
        </div>
        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
          +12.6% MoM
        </span>
      </div>

      <div className="flex items-center justify-center my-2 relative">
        <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            className="text-slate-800"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            className="text-indigo-500 transition-all duration-1000 ease-out"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="url(#aiGradient)"
            fill="transparent"
          />
          <defs>
            <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-2xl font-extrabold text-white tracking-tight">78.4%</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">AI Solved</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80 text-xs">
        <div className="bg-slate-900/60 p-2 rounded-xl text-center">
          <span className="text-slate-400 text-[10px] block">Autonomous</span>
          <span className="font-bold text-cyan-400 text-sm">11,203</span>
        </div>
        <div className="bg-slate-900/60 p-2 rounded-xl text-center">
          <span className="text-slate-400 text-[10px] block">Human Assisted</span>
          <span className="font-bold text-indigo-400 text-sm">3,087</span>
        </div>
      </div>
    </Card>
  );
};
