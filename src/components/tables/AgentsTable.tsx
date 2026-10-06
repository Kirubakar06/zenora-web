import React from 'react';
import { User } from '../../types/user';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';

interface AgentsTableProps {
  agents: User[];
}

export const AgentsTable: React.FC<AgentsTableProps> = ({ agents }) => {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-800/80 bg-[#111726]/60 backdrop-blur-xl">
      <table className="w-full text-left text-xs">
        <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
          <tr>
            <th className="py-3.5 px-4">Agent</th>
            <th className="py-3.5 px-4">Role</th>
            <th className="py-3.5 px-4">Department</th>
            <th className="py-3.5 px-4">Status</th>
            <th className="py-3.5 px-4">Active Tickets</th>
            <th className="py-3.5 px-4">Max Capacity</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {agents.map((agent) => (
            <tr key={agent.id} className="hover:bg-slate-800/40 transition-colors">
              <td className="py-3.5 px-4">
                <div className="flex items-center gap-3">
                  <Avatar src={agent.avatar} name={agent.name} size="sm" status={agent.status} />
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-200">{agent.name}</span>
                    <span className="text-[11px] text-slate-400">{agent.email}</span>
                  </div>
                </div>
              </td>
              <td className="py-3.5 px-4">
                <Badge variant={agent.role === 'owner' ? 'purple' : agent.role === 'supervisor' ? 'cyan' : 'primary'}>
                  {agent.role}
                </Badge>
              </td>
              <td className="py-3.5 px-4 text-slate-300 font-medium">{agent.department || 'Support'}</td>
              <td className="py-3.5 px-4 capitalize">
                <span className="inline-flex items-center gap-1.5 font-medium text-slate-300">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      agent.status === 'online'
                        ? 'bg-emerald-400'
                        : agent.status === 'busy'
                        ? 'bg-rose-400'
                        : 'bg-amber-400'
                    }`}
                  />
                  {agent.status}
                </span>
              </td>
              <td className="py-3.5 px-4 font-semibold text-indigo-400">
                {agent.assignedTicketsCount || 0} active
              </td>
              <td className="py-3.5 px-4">
                <div className="flex items-center gap-2 max-w-[120px]">
                  <div className="h-1.5 flex-1 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      style={{
                        width: `${Math.min(
                          100,
                          ((agent.assignedTicketsCount || 0) / (agent.maxActiveChats || 8)) * 100
                        )}%`,
                      }}
                      className="h-full bg-indigo-500 rounded-full"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {agent.assignedTicketsCount}/{agent.maxActiveChats || 8}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
