import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ChevronDown, Check, Settings2 } from 'lucide-react';
import { useAiProviderStore } from '../../store/aiProviderStore';
import { PROVIDERS } from '../../lib/ai/providers';
import { ROUTES } from '../../constants/routes';
import { cn } from '../../lib/utils/cn';

interface AiModelSwitcherProps {
  align?: 'left' | 'right';
  direction?: 'down' | 'up';
  compact?: boolean;
  idleLabel?: string;
}

export const AiModelSwitcher: React.FC<AiModelSwitcherProps> = ({
  align = 'left',
  direction = 'down',
  compact = false,
  idleLabel = 'Demo AI (connect a model)',
}) => {
  const navigate = useNavigate();
  const { activeId, settings, setActive, isConfigured } = useAiProviderStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const active = PROVIDERS.find((p) => p.id === activeId && isConfigured(p.id));

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex items-center gap-2 rounded-full bg-slate-900/90 border border-slate-700/60 text-xs hover:border-indigo-500/60 transition-colors',
          compact ? 'px-2.5 py-1' : 'px-3 py-1.5'
        )}
        title="Choose AI model"
      >
        <span className="flex h-2 w-2 relative">
          {active && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          )}
          <span
            className={cn(
              'relative inline-flex rounded-full h-2 w-2',
              active ? 'bg-emerald-500' : 'bg-amber-500'
            )}
          />
        </span>
        <span className="text-cyan-400 font-semibold flex items-center gap-1">
          <Sparkles className="h-3 w-3" />
          {active ? (active.noKey ? active.name : `${active.name} · ${settings[active.id].model}`) : idleLabel}
        </span>
        <ChevronDown className="h-3 w-3 text-slate-400" />
      </button>

      {open && (
        <div
          className={cn(
            'absolute z-50 w-72 rounded-2xl border border-slate-700/70 bg-slate-900 shadow-2xl p-2',
            align === 'right' ? 'right-0' : 'left-0',
            direction === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'
          )}
        >
          <p className="px-2 pt-1 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Select AI bot
          </p>
          {PROVIDERS.map((p) => {
            const ok = isConfigured(p.id);
            const selected = activeId === p.id && ok;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  if (ok) {
                    setActive(p.id);
                    setOpen(false);
                  } else {
                    setOpen(false);
                    navigate(ROUTES.AI_CONFIG);
                  }
                }}
                className="w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-left hover:bg-slate-800/70 transition-colors"
              >
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-200">{p.name}</div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {p.noKey ? 'No API key needed' : ok ? settings[p.id].model : 'Add API key to enable'}
                  </div>
                </div>
                {selected ? (
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                ) : (
                  !ok && <span className="text-[10px] font-semibold text-indigo-400 flex-shrink-0">Set up</span>
                )}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              navigate(ROUTES.AI_CONFIG);
            }}
            className="mt-1 w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-semibold text-indigo-400 hover:bg-slate-800/70 border-t border-slate-800"
          >
            <Settings2 className="h-3.5 w-3.5" /> Manage API keys
          </button>
        </div>
      )}
    </div>
  );
};
