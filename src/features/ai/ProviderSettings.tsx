import React, { useState } from 'react';
import { Check, KeyRound, Loader2, Zap, XCircle, CheckCircle2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAiProviderStore } from '../../store/aiProviderStore';
import { PROVIDERS, ProviderMeta, complete } from '../../lib/ai/providers';
import { cn } from '../../lib/utils/cn';

type TestState = { status: 'idle' | 'loading' | 'ok' | 'error'; message?: string };

const ProviderCard: React.FC<{ meta: ProviderMeta }> = ({ meta }) => {
  const { settings, activeId, updateSettings, setActive, isConfigured } = useAiProviderStore();
  const s = settings[meta.id];
  const isActive = activeId === meta.id;
  const configured = isConfigured(meta.id);
  const [test, setTest] = useState<TestState>({ status: 'idle' });

  const runTest = async () => {
    setTest({ status: 'loading' });
    try {
      const reply = await complete(meta.id, s, {
        system: 'You are a connectivity test. Reply with one short sentence.',
        messages: [{ role: 'user', content: 'Say hello from ' + meta.name + '.' }],
        maxTokens: 60,
      });
      setTest({ status: 'ok', message: reply || 'Connected' });
    } catch (e: any) {
      setTest({ status: 'error', message: e.message || 'Request failed' });
    }
  };

  return (
    <Card className={cn('p-5 space-y-4', isActive && 'border-indigo-500/60 shadow-indigo-500/10')}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            {meta.name}
            {isActive && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                Active
              </span>
            )}
          </h4>
          <p className="text-[11px] text-slate-400 mt-0.5">{meta.vendor}</p>
        </div>
        <Button
          size="sm"
          variant={isActive ? 'secondary' : 'glow'}
          disabled={!configured}
          onClick={() => setActive(isActive ? null : meta.id)}
          title={configured ? '' : 'Add an API key first'}
        >
          {isActive ? 'Deactivate' : 'Use this AI'}
        </Button>
      </div>

      {meta.noKey ? (
        <p className="text-xs text-slate-400 leading-relaxed">
          Works instantly, no key and no sign-up. It searches Wikipedia and shows the best matches with links, like a
          search engine. It is not a generative chatbot, so it will not write custom answers.
        </p>
      ) : (
      <Input
        label="API Key"
        type="password"
        icon={<KeyRound className="h-4 w-4" />}
        placeholder={meta.keyHint}
        value={s.apiKey}
        autoComplete="off"
        onChange={(e) => updateSettings(meta.id, { apiKey: e.target.value.trim() })}
      />
      )}

      {meta.needsBaseUrl && (
        <Input
          label="Base URL"
          placeholder="https://api.your-max-ai.com/v1"
          value={s.baseUrl || ''}
          onChange={(e) => updateSettings(meta.id, { baseUrl: e.target.value.trim() })}
        />
      )}

      {!meta.noKey && (
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Model</label>
        <input
          list={'models-' + meta.id}
          value={s.model}
          placeholder={meta.models[0] || 'model name'}
          onChange={(e) => updateSettings(meta.id, { model: e.target.value.trim() })}
          className="w-full rounded-xl bg-slate-900/80 border border-slate-700/70 text-slate-100 placeholder-slate-500 text-sm px-3.5 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />
        <datalist id={'models-' + meta.id}>
          {meta.models.map((m) => (
            <option key={m} value={m} />
          ))}
        </datalist>
      </div>
      )}

      <div className="flex items-center gap-3">
        <Button size="sm" variant="secondary" onClick={runTest} disabled={!configured || test.status === 'loading'}>
          {test.status === 'loading' ? (
            <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
          ) : (
            <Zap className="h-3.5 w-3.5 mr-1.5" />
          )}
          Test connection
        </Button>
        {test.status === 'ok' && (
          <span className="text-[11px] text-emerald-400 flex items-center gap-1 min-w-0">
            <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{test.message}</span>
          </span>
        )}
        {test.status === 'error' && (
          <span className="text-[11px] text-rose-400 flex items-center gap-1 min-w-0" title={test.message}>
            <XCircle className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{test.message}</span>
          </span>
        )}
      </div>
    </Card>
  );
};

export const ProviderSettings: React.FC = () => {
  const activeId = useAiProviderStore((s) => s.activeId);
  const active = PROVIDERS.find((p) => p.id === activeId);

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Check className="h-4 w-4 text-emerald-400" />
          Connect your AI models
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          {active
            ? `${active.name} is answering customer chats and the Prompt Sandbox.`
            : 'No AI selected yet. Chats use the built-in demo replies until you add a key and pick one.'}{' '}
          Keys are stored only in this browser.
        </p>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {PROVIDERS.map((p) => (
          <ProviderCard key={p.id} meta={p} />
        ))}
      </div>
    </div>
  );
};
