import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { MOCK_VOLUME_TREND } from '../../lib/api/mockData';

export const VolumeTrendChart: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const data = MOCK_VOLUME_TREND;
  const maxVal = Math.max(...data.map((d) => d.total));

  return (
    <Card className="p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white">Conversation Volume Flow</h3>
          <p className="text-xs text-slate-400 mt-0.5">Real-time hourly incoming load</p>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            <span className="text-slate-300">AI Handled</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            <span className="text-slate-300">Human Handled</span>
          </div>
        </div>
      </div>

      {/* SVG Bar Chart with animated stacks */}
      <div className="h-44 w-full flex items-end gap-3 pt-6 pb-2 px-2">
        {data.map((item, index) => {
          const aiHeight = (item.aiHandled / maxVal) * 100;
          const humanHeight = (item.humanHandled / maxVal) * 100;
          const isHovered = hoveredIdx === index;

          return (
            <div
              key={item.time}
              className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
              onMouseEnter={() => setHoveredIdx(index)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Tooltip */}
              <div
                className={`text-[10px] bg-slate-900 border border-slate-700 px-2 py-1 rounded shadow-lg transition-opacity duration-200 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {item.total} total
              </div>

              {/* Bar */}
              <div className="w-full max-w-[28px] h-28 flex flex-col justify-end rounded-t-lg overflow-hidden bg-slate-800/40">
                <div
                  style={{ height: `${humanHeight}%` }}
                  className="w-full bg-indigo-500 transition-all duration-300 group-hover:brightness-125"
                />
                <div
                  style={{ height: `${aiHeight}%` }}
                  className="w-full bg-gradient-to-t from-cyan-500 to-indigo-400 transition-all duration-300 group-hover:brightness-125"
                />
              </div>

              {/* Label */}
              <span className="text-[10px] text-slate-500 group-hover:text-slate-300 font-medium">
                {item.time}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
