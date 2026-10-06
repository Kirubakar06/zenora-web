import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Switch } from '../../components/ui/Switch';
import { Badge } from '../../components/ui/Badge';
import { MessageCircle } from 'lucide-react';

export const WhatsAppConfig: React.FC = () => {
  const [enabled, setEnabled] = useState(true);

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <MessageCircle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">WhatsApp Business Cloud API</h3>
            <p className="text-xs text-slate-400">
              Deliver 24/7 AI-guided conversational support directly via WhatsApp numbers
            </p>
          </div>
        </div>
        <Badge variant={enabled ? 'success' : 'neutral'}>
          {enabled ? 'Verified Meta Number' : 'Disabled'}
        </Badge>
      </div>

      <div className="pt-2">
        <Switch
          checked={enabled}
          onChange={setEnabled}
          label="Enable Instant WhatsApp Auto-Replies"
          description="Aura bot answers questions on WhatsApp using the same vector documents"
        />
      </div>
    </Card>
  );
};
