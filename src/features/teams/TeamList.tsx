import React from 'react';
import { Card } from '../../components/ui/Card';
import { Users, Shield } from 'lucide-react';

export const TeamList: React.FC = () => {
  const teams = [
    { name: 'Tier 1 Autonomous Deflection', members: 4, lead: 'Alex Rivera' },
    { name: 'Tier 2 Engineering & Infrastructure', members: 3, lead: 'Sarah Chen' },
    { name: 'Billing & Commercial Enterprise', members: 2, lead: 'Marcus Vance' },
  ];

  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-indigo-400" />
        <h4 className="text-sm font-bold text-white">Department Squads</h4>
      </div>
      <div className="space-y-2">
        {teams.map((t) => (
          <div
            key={t.name}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs"
          >
            <div>
              <span className="font-bold text-slate-200 block">{t.name}</span>
              <span className="text-[11px] text-slate-400">Lead: {t.lead}</span>
            </div>
            <span className="text-slate-400 font-medium">{t.members} Members</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
