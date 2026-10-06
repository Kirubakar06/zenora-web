import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Switch } from '../../components/ui/Switch';
import { Volume2 } from 'lucide-react';

export const SoundSettings: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [criticalOnly, setCriticalOnly] = useState(false);

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Volume2 className="h-4 w-4 text-cyan-400" />
        <h3 className="text-sm font-bold text-white">Audible Notification Alerts</h3>
      </div>

      <div className="space-y-3">
        <Switch
          checked={soundEnabled}
          onChange={setSoundEnabled}
          label="Play Sound for Inbound Messages"
          description="Plays a subtle chime when an urgent ticket or customer replies"
        />

        <Switch
          checked={criticalOnly}
          onChange={setCriticalOnly}
          label="Urgent Priority Only"
          description="Only ring audio alerts for SLA breaches or negative sentiment escalations"
        />
      </div>
    </Card>
  );
};
