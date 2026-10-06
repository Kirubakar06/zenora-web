import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Switch } from '../ui/Switch';
import { AiModelConfig } from '../../types/ai';

interface BotConfigFormProps {
  initialConfig: AiModelConfig;
  onSave: (config: AiModelConfig) => void;
}

export const BotConfigForm: React.FC<BotConfigFormProps> = ({ initialConfig, onSave }) => {
  const [config, setConfig] = useState<AiModelConfig>(initialConfig);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(config);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Foundation Model
          </label>
          <select
            value={config.modelId}
            onChange={(e) => setConfig({ ...config, modelId: e.target.value })}
            className="w-full rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-sm px-3.5 py-2.5 focus:outline-none focus:border-cyan-500"
          >
            <option value="gpt-4o">OpenAI GPT-4o (Multimodal & Fast)</option>
            <option value="claude-3-5-sonnet">Anthropic Claude 3.5 Sonnet</option>
            <option value="gemini-1-5-pro">Google Gemini 1.5 Pro</option>
            <option value="llama-3-70b-groq">Groq Llama 3 70B (Ultra Low Latency)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Temperature ({config.temperature})
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={config.temperature}
            onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 mt-3"
          />
        </div>
      </div>

      <Textarea
        label="System Persona & Guardrail Prompt"
        rows={6}
        value={config.systemPrompt}
        onChange={(e) => setConfig({ ...config, systemPrompt: e.target.value })}
      />

      <div className="space-y-3 pt-2">
        <Switch
          checked={config.fallbackToHuman}
          onChange={(checked) => setConfig({ ...config, fallbackToHuman: checked })}
          label="Human Agent Fallback"
          description="Automatically transfer the conversation if AI confidence falls below threshold or sentiment drops"
        />

        <Switch
          checked={config.groundingEnabled}
          onChange={(checked) => setConfig({ ...config, groundingEnabled: checked })}
          label="RAG Document Grounding"
          description="Enforce retrieval grounding to eliminate hallucinations and display verified citations"
        />
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        {isSaved ? (
          <span className="text-xs text-emerald-400 font-semibold animate-fadeIn">
            ✓ Configuration updated and applied to live bot!
          </span>
        ) : (
          <span />
        )}
        <Button type="submit" variant="glow">
          Save AI Bot Parameters
        </Button>
      </div>
    </form>
  );
};
