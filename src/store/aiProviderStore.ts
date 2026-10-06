import { create } from 'zustand';
import { storage } from '../lib/storage/localStorage';
import { PROVIDERS, ProviderId, ProviderSettings, getProviderMeta } from '../lib/ai/providers';

const KEY = 'ai_providers';

interface Persisted {
  activeId: ProviderId | null;
  settings: Record<ProviderId, ProviderSettings>;
}

const env = import.meta.env as Record<string, string | undefined>;
const envKeys: Record<ProviderId, string> = {
  openai: env.VITE_OPENAI_API_KEY || '',
  gemini: env.VITE_GEMINI_API_KEY || '',
  claude: env.VITE_ANTHROPIC_API_KEY || '',
  max: env.VITE_MAX_AI_API_KEY || '',
  web: '',
};

const defaults = (): Persisted => ({
  activeId: null,
  settings: Object.fromEntries(
    PROVIDERS.map((p) => [
      p.id,
      {
        apiKey: envKeys[p.id],
        model: p.defaultModel,
        baseUrl: p.id === 'max' ? env.VITE_MAX_AI_BASE_URL || '' : undefined,
      },
    ])
  ) as Record<ProviderId, ProviderSettings>,
});

const load = (): Persisted => {
  const base = defaults();
  const saved = storage.get<Persisted | null>(KEY, null);
  if (!saved) return base;
  for (const p of PROVIDERS) {
    base.settings[p.id] = { ...base.settings[p.id], ...saved.settings?.[p.id] };
    if (!base.settings[p.id].apiKey) base.settings[p.id].apiKey = envKeys[p.id];
  }
  base.activeId = saved.activeId;
  return base;
};

interface AiProviderStore extends Persisted {
  updateSettings: (id: ProviderId, patch: Partial<ProviderSettings>) => void;
  setActive: (id: ProviderId | null) => void;
  isConfigured: (id: ProviderId) => boolean;
  active: () => { id: ProviderId; name: string; settings: ProviderSettings } | null;
}

const persist = (activeId: ProviderId | null, settings: Persisted['settings']) =>
  storage.set(KEY, { activeId, settings });

export const useAiProviderStore = create<AiProviderStore>((set, get) => ({
  ...load(),

  updateSettings: (id, patch) => {
    set((s) => ({ settings: { ...s.settings, [id]: { ...s.settings[id], ...patch } } }));
    persist(get().activeId, get().settings);
  },

  setActive: (id) => {
    set({ activeId: id });
    persist(get().activeId, get().settings);
  },

  isConfigured: (id) => {
    if (getProviderMeta(id).noKey) return true;
    const s = get().settings[id];
    return Boolean(s.apiKey && s.model && (id !== 'max' || s.baseUrl));
  },

  active: () => {
    const { activeId, settings, isConfigured } = get();
    if (!activeId || !isConfigured(activeId)) return null;
    return { id: activeId, name: getProviderMeta(activeId).name, settings: settings[activeId] };
  },
}));
