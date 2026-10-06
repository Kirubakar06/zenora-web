import React from 'react';
import { Card } from '../../components/ui/Card';
import { BotConfigForm } from '../../components/forms/BotConfigForm';
import { MOCK_AI_CONFIG } from '../../lib/api/mockData';

export const ModelConfig: React.FC = () => {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-base font-bold text-white">Autonomous Agent Persona & Parameters</h3>
        <p className="text-xs text-slate-400 mt-1">
          Tune temperature, confidence cutoff thresholds, and fallback escalation rules
        </p>
      </div>

      <BotConfigForm
        initialConfig={MOCK_AI_CONFIG}
        onSave={(newCfg) => console.log('Saved AI config', newCfg)}
      />
    </Card>
  );
};
