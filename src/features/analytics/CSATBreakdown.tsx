import React from 'react';
import { Card } from '../../components/ui/Card';
import { Star } from 'lucide-react';

export const CSATBreakdown: React.FC = () => {
  const ratings = [
    { stars: 5, percent: 84, count: 2721 },
    { stars: 4, percent: 11, count: 356 },
    { stars: 3, percent: 3, count: 97 },
    { stars: 2, percent: 1, count: 32 },
    { stars: 1, percent: 1, count: 34 },
  ];

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white">CSAT Rating Distribution</h3>
          <p className="text-xs text-slate-400 mt-0.5">3,240 post-resolution surveys</p>
        </div>
        <div className="flex items-center gap-1.5 text-amber-400 font-extrabold text-lg">
          <Star className="h-5 w-5 fill-amber-400" />
          <span>4.89</span>
        </div>
      </div>

      <div className="space-y-2.5">
        {ratings.map((r) => (
          <div key={r.stars} className="flex items-center gap-3 text-xs">
            <span className="w-12 text-slate-400 font-semibold">{r.stars} Stars</span>
            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                style={{ width: `${r.percent}%` }}
                className="h-full bg-amber-400 rounded-full"
              />
            </div>
            <span className="w-10 text-right text-slate-300 font-mono">{r.percent}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
