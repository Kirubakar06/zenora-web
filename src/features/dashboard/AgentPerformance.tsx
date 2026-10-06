import React from 'react';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { MOCK_TEAM_MEMBERS } from '../../lib/api/mockData';
import { Star, ShieldCheck } from 'lucide-react';

export const AgentPerformance: React.FC = () => {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white">Agent & Copilot Leaderboard</h3>
          <p className="text-xs text-slate-400 mt-0.5">Top contributors this week</p>
        </div>
        <span className="text-xs text-slate-400 font-medium">Updated 5m ago</span>
      </div>

      <div className="space-y-3">
        {MOCK_TEAM_MEMBERS.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800"
          >
            <div className="flex items-center gap-3">
              <Avatar src={member.avatar} name={member.name} size="sm" status={member.status} />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-200">{member.name}</span>
                <span className="text-[10px] text-slate-400">{member.department || 'Operations'}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="h-3.5 w-3.5 fill-amber-400" />
                <span>4.9</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-white block">
                  {member.assignedTicketsCount! * 6 + 14}
                </span>
                <span className="text-[10px] text-slate-500">Solved</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
