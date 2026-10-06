import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Bot, UserCheck, AlertCircle } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';

export const LiveQueues: React.FC = () => {
  const conversations = useChatStore((s) => s.conversations);

  const aiHandling = conversations.filter((c) => c.status === 'ai_handling').length;
  const agentHandling = conversations.filter((c) => c.status === 'assigned').length;
  const queued = conversations.filter((c) => c.status === 'queued').length;

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white">Live Real-time Queues</h3>
          <p className="text-xs text-slate-400 mt-0.5">Active customer sessions right now</p>
        </div>
        <Badge variant="cyan" dot>
          Live Gateway
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-cyan-950/20 border border-cyan-800/40 rounded-xl p-3.5 flex flex-col items-center text-center">
          <Bot className="h-5 w-5 text-cyan-400 mb-1" />
          <span className="text-xl font-extrabold text-cyan-200">{aiHandling}</span>
          <span className="text-[11px] text-cyan-400/80 font-medium">Autonomous AI</span>
        </div>

        <div className="bg-indigo-950/20 border border-indigo-800/40 rounded-xl p-3.5 flex flex-col items-center text-center">
          <UserCheck className="h-5 w-5 text-indigo-400 mb-1" />
          <span className="text-xl font-extrabold text-indigo-200">{agentHandling}</span>
          <span className="text-[11px] text-indigo-400/80 font-medium">Human Agent</span>
        </div>

        <div className="bg-amber-950/20 border border-amber-800/40 rounded-xl p-3.5 flex flex-col items-center text-center">
          <AlertCircle className="h-5 w-5 text-amber-400 mb-1" />
          <span className="text-xl font-extrabold text-amber-200">{queued}</span>
          <span className="text-[11px] text-amber-400/80 font-medium">Waiting Queue</span>
        </div>
      </div>
    </Card>
  );
};
