import React from 'react';
import { Card } from '../../components/ui/Card';
import { MetricCardData } from '../../types/analytics';
import { TrendingUp, TrendingDown, Sparkles, Clock, CheckCircle2, MessageSquare } from 'lucide-react';

interface MetricsOverviewProps {
  metrics: MetricCardData[];
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({ metrics }) => {
  const icons = [
    <Sparkles className="h-5 w-5 text-cyan-400" />,
    <Clock className="h-5 w-5 text-indigo-400" />,
    <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
    <MessageSquare className="h-5 w-5 text-purple-400" />,
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, idx) => {
        const isUp = metric.trend === 'up';
        return (
          <Card key={metric.title} className="p-5 flex flex-col justify-between hover:border-indigo-500/40 transition-all duration-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {metric.title}
              </span>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                {icons[idx % icons.length]}
              </div>
            </div>

            <div className="my-3">
              <span className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                {metric.value}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/60">
              <div
                className={`flex items-center gap-1 font-bold ${
                  metric.isPositiveImprovement ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {isUp ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                <span>
                  {metric.changePercent > 0 ? '+' : ''}
                  {metric.changePercent}%
                </span>
              </div>
              <span className="text-[11px] text-slate-500">vs last period</span>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
