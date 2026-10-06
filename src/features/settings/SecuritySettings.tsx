import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Switch } from '../../components/ui/Switch';
import { Shield } from 'lucide-react';

export const SecuritySettings: React.FC = () => {
  const [enforceMfa, setEnforceMfa] = useState(true);
  const [dataRetentionPii, setDataRetentionPii] = useState(true);

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Shield className="h-4 w-4 text-emerald-400" />
        <h3 className="text-base font-bold text-white">Security & Data Privacy</h3>
      </div>
      <p className="text-xs text-slate-400">
        Enterprise authentication policies and automated PII redaction
      </p>

      <div className="space-y-3 pt-2">
        <Switch
          checked={enforceMfa}
          onChange={setEnforceMfa}
          label="Mandatory Two-Factor Authentication (2FA)"
          description="Require all agents and administrators to authenticate via TOTP authenticator app"
        />

        <Switch
          checked={dataRetentionPii}
          onChange={setDataRetentionPii}
          label="Automatic PII Masking on Chat Logs"
          description="Mask credit card numbers, SSNs, and private tokens before sending to LLM context"
        />
      </div>
    </Card>
  );
};
