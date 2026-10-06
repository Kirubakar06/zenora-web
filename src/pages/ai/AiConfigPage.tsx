import React, { useState } from 'react';
import { PageContainer } from '../../components/layout/PageContainer';
import { PromptPlayground } from '../../features/ai/PromptPlayground';
import { ModelConfig } from '../../features/ai/ModelConfig';
import { FineTuningLogs } from '../../features/ai/FineTuningLogs';
import { AIKnowledgeSync } from '../../features/ai/AIKnowledgeSync';
import { IntentDetection } from '../../features/ai/IntentDetection';
import { ProviderSettings } from '../../features/ai/ProviderSettings';
import { Tabs } from '../../components/ui/Tabs';
import { Sparkles } from 'lucide-react';

export const AiConfigPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('providers');

  const tabs = [
    { id: 'providers', label: 'AI Providers' },
    { id: 'sandbox', label: 'Prompt Sandbox' },
    { id: 'parameters', label: 'Model Parameters' },
    { id: 'intents', label: 'Discovered Intents' },
    { id: 'indexing', label: 'Vector Index' },
    { id: 'alignment', label: 'RLHF Audit' },
  ];

  return (
    <PageContainer
      title="Autonomous AI Engine Control"
      subtitle="Fine-tune LLM temperature, system prompt guardrails, and vector RAG citations"
    >
      <Tabs items={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="pt-4">
        {activeTab === 'providers' && <ProviderSettings />}
        {activeTab === 'sandbox' && <PromptPlayground />}
        {activeTab === 'parameters' && <ModelConfig />}
        {activeTab === 'intents' && <IntentDetection />}
        {activeTab === 'indexing' && <AIKnowledgeSync />}
        {activeTab === 'alignment' && <FineTuningLogs />}
      </div>
    </PageContainer>
  );
};
