import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Textarea } from '../../components/ui/Textarea';
import { apiClient } from '../../lib/api/client';
import { Sparkles, Play, Clock, ShieldCheck, BookOpen } from 'lucide-react';

export const PromptPlayground: React.FC = () => {
  const [testQuery, setTestQuery] = useState(
    'What happens if my outbound webhook endpoint returns HTTP 504 repeatedly?'
  );
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRunSimulation = async () => {
    if (!testQuery) return;
    setIsLoading(true);
    try {
      const startTime = performance.now();
      const res = await apiClient.generateAiSuggestion(testQuery, [{ role: 'user', content: testQuery }]);
      const elapsed = Math.round(performance.now() - startTime);
      setResponse({ ...res, latencyMs: elapsed });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            AI Autonomous Simulation Sandbox
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Probe AI responses, vector retrieval grounding, and confidence scores live
          </p>
        </div>
        <Button
          variant="glow"
          size="sm"
          onClick={handleRunSimulation}
          isLoading={isLoading}
        >
          <Play className="h-3.5 w-3.5 mr-1.5" />
          Run Simulation
        </Button>
      </div>

      <Textarea
        label="Simulated Customer Inquiry"
        rows={3}
        value={testQuery}
        onChange={(e) => setTestQuery(e.target.value)}
        placeholder="Type a customer question to test prompt persona..."
      />

      {response && (
        <div className="space-y-4 p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800 text-xs">
            <span className="font-semibold text-cyan-400 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" /> AI Confidence: {response.confidence}%
            </span>
            <span className="text-slate-400 flex items-center gap-1 font-mono text-[11px]">
              <Clock className="h-3.5 w-3.5" /> {response.provider ? response.provider + ' · ' : 'Demo · '}
              {response.latencyMs}ms
            </span>
          </div>

          <div className="text-xs text-slate-100 leading-relaxed font-sans bg-black/30 p-3 rounded-lg border border-slate-800">
            {response.reply}
          </div>
          {response.error && <p className="text-[11px] text-rose-400">⚠ {response.error}</p>}

          {response.citations && response.citations.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5 text-cyan-400" /> Vector Citations Injected:
              </span>
              {response.citations.map((cite: any, i: number) => (
                <div
                  key={i}
                  className="bg-cyan-950/30 p-2.5 rounded-lg border border-cyan-900/40 text-xs text-cyan-200"
                >
                  <span className="font-bold block text-cyan-300">{cite.sourceTitle}</span>
                  <span className="text-[11px] text-slate-300 italic block mt-0.5">
                    "{cite.snippet}"
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
