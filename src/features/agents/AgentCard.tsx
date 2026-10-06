import React from 'react';
import { User } from '../../types/user';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';

interface AgentCardProps {
  agent: User;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center gap-3">
        <Avatar src={agent.avatar} name={agent.name} size="md" status={agent.status} />
        <div>
          <h4 className="text-sm font-bold text-white">{agent.name}</h4>
          <span className="text-[11px] text-slate-400">{agent.department}</span>
        </div>
        <Badge variant="primary" size="sm" className="ml-auto">
          {agent.role}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-800">
        <div>
          <span className="text-slate-500 text-[10px] block">Active Tickets</span>
          <span className="font-bold text-white">{agent.assignedTicketsCount || 0}</span>
        </div>
        <div>
          <span className="text-slate-500 text-[10px] block">Capacity Limit</span>
          <span className="font-bold text-white">{agent.maxActiveChats || 8} chats</span>
        </div>
      </div>
    </Card>
  );
};
