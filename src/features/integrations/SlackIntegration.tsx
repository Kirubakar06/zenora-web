import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Switch } from '../../components/ui/Switch';
import { Badge } from '../../components/ui/Badge';
import { Hash } from 'lucide-react';

export const SlackIntegration: React.FC = () => {
  const [connected, setConnected] = useState(true);
  const [escalateToChannel, setEscalateToChannel] = useState(true);

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
            <Hash className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Slack Connect & Bot Responder</h3>
            <p className="text-xs text-slate-400">
              Answer questions in shared Slack channels autonomously using AI Copilot
            </p>
          </div>
        </div>
        <Badge variant={connected ? 'success' : 'neutral'}>
          {connected ? 'Connected' : 'Disconnected'}
        </Badge>
      </div>

      <div className="pt-2 space-y-3">
        <Switch
          checked={connected}
          onChange={setConnected}
          label="Active Slack Sync"
          description="Sync notifications and triage threads with your workspace"
        />

        <Switch
          checked={escalateToChannel}
          onChange={setEscalateToChannel}
          label="Escalate to #support-war-room"
          description="Post urgent tickets and high-sentiment issues automatically"
        />
      </div>
    </Card>
  );
};
