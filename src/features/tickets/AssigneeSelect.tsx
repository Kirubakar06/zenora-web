import React from 'react';
import { MOCK_TEAM_MEMBERS } from '../../lib/api/mockData';

interface AssigneeSelectProps {
  currentAssigneeId?: string | null;
  onAssign: (agentId: string) => void;
}

export const AssigneeSelect: React.FC<AssigneeSelectProps> = ({ currentAssigneeId, onAssign }) => {
  return (
    <select
      value={currentAssigneeId || ''}
      onChange={(e) => onAssign(e.target.value)}
      className="rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs px-3 py-2"
    >
      <option value="">Unassigned</option>
      {MOCK_TEAM_MEMBERS.map((m) => (
        <option key={m.id} value={m.id}>
          {m.name} ({m.department})
        </option>
      ))}
    </select>
  );
};
