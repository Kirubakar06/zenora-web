import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Switch } from '../../components/ui/Switch';
import { Badge } from '../../components/ui/Badge';
import { RefreshCw } from 'lucide-react';

export const ZendeskSync: React.FC = () => {
  const [synced, setSynced] = useState(true);

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <RefreshCw className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Zendesk & Help Center Importer</h3>
            <p className="text-xs text-slate-400">
              Continuously ingest Zendesk help center articles and solved tickets into vectors
            </p>
          </div>
        </div>
        <Badge variant={synced ? 'success' : 'neutral'}>
          {synced ? '42 Articles Synced' : 'Disabled'}
        </Badge>
      </div>

      <div className="pt-2">
        <Switch
          checked={synced}
          onChange={setSynced}
          label="Two-Way Ticket Bi-directional Synchronization"
          description="Update Zendesk ticket status whenever Nexora AI resolves a case"
        />
      </div>
    </Card>
  );
};
