export type ProviderId = 'openai' | 'gemini' | 'claude' | 'max' | 'web';

export interface ProviderMeta {
  id: ProviderId;
  name: string;
  vendor: string;
  defaultModel: string;
  models: string[];
  needsBaseUrl?: boolean;
  noKey?: boolean;
  keyHint: string;
}

export const PROVIDERS: ProviderMeta[] = [
  {
    id: 'openai',
    name: 'ChatGPT',
    vendor: 'OpenAI',
    defaultModel: 'gpt-4o',
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4.1', 'gpt-4.1-mini'],
    keyHint: 'sk-...',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    vendor: 'Google',
    defaultModel: 'gemini-2.0-flash',
    models: ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'],
    keyHint: 'AIza...',
  },
  {
    id: 'claude',
    name: 'Claude',
    vendor: 'Anthropic',
    defaultModel: 'claude-sonnet-5-5',
    models: ['claude-sonnet-5-5', 'claude-opus-5-5', 'claude-haiku-4-5-20251001'],
    keyHint: 'sk-ant-...',
  },
  {
    id: 'max',
    name: 'Max AI',
    vendor: 'Custom (OpenAI-compatible API)',
    defaultModel: '',
    models: [],
    needsBaseUrl: true,
    keyHint: 'API key',
  },
  {
    id: 'web',
    name: 'Web Search',
    vendor: 'Wikipedia · no API key needed',
    defaultModel: 'wikipedia',
    models: [],
    noKey: true,
    keyHint: '',
  },
];

export const getProviderMeta = (id: ProviderId) => PROVIDERS.find((p) => p.id === id)!;

export interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

export interface ProviderSettings {
  apiKey: string;
  model: string;
  baseUrl?: string;
}

export interface CompletionRequest {
  system: string;
  messages: ChatTurn[];
  temperature?: number;
  maxTokens?: number;
}

const readError = async (res: Response): Promise<never> => {
  let detail = '';
  try {
    const j = await res.json();
    detail = j?.error?.message || j?.error || j?.message || JSON.stringify(j);
  } catch {
    detail = res.statusText;
  }
  throw new Error(`${res.status}: ${String(detail).slice(0, 240)}`);
};

export async function complete(
  id: ProviderId,
  s: ProviderSettings,
  req: CompletionRequest
): Promise<string> {
  if (id === 'web') return webSearch(req.messages[req.messages.length - 1]?.content || '');

  const temperature = req.temperature ?? 0.3;
  const maxTokens = req.maxTokens ?? 1024;

  if (id === 'openai' || id === 'max') {
    const base = (id === 'openai' ? 'https://api.openai.com/v1' : s.baseUrl || '').replace(/\/+$/, '');
    if (!base) throw new Error('Base URL is required for Max AI');
    const res = await fetch(`${base}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${s.apiKey}` },
      body: JSON.stringify({
        model: s.model,
        temperature,
        max_tokens: maxTokens,
        messages: [{ role: 'system', content: req.system }, ...req.messages],
      }),
    });
    if (!res.ok) await readError(res);
    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() ?? '';
  }

  if (id === 'gemini') {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(s.model)}:generateContent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': s.apiKey },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: req.system }] },
          contents: req.messages.map((m) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
          })),
          generationConfig: { temperature, maxOutputTokens: maxTokens },
        }),
      }
    );
    if (!res.ok) await readError(res);
    const data = await res.json();
    return (data.candidates?.[0]?.content?.parts ?? []).map((p: any) => p.text).join('').trim();
  }

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': s.apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: s.model,
      max_tokens: maxTokens,
      temperature,
      system: req.system,
      messages: req.messages,
    }),
  });
  if (!res.ok) await readError(res);
  const data = await res.json();
  return (data.content ?? []).map((b: any) => b.text ?? '').join('').trim();
}

async function webSearch(query: string): Promise<string> {
  const q = query.trim();
  if (!q) return 'Type something to search.';
  const url =
    'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&generator=search' +
    '&gsrlimit=3&prop=extracts%7Cinfo&exintro=1&explaintext=1&exsentences=4&inprop=url&gsrsearch=' +
    encodeURIComponent(q);
  const res = await fetch(url);
  if (!res.ok) throw new Error('Search failed (' + res.status + ')');
  const data = await res.json();
  const pages: any[] = Object.values(data?.query?.pages ?? {}).sort((a: any, b: any) => a.index - b.index);
  const hits = pages.filter((p) => p.extract);
  if (hits.length === 0) return 'No results found for "' + q + '". Try different keywords.';
  const [top, ...rest] = hits;
  let out = top.title + '\n' + top.extract.trim() + '\n' + top.fullurl;
  if (rest.length) {
    out += '\n\nRelated:\n' + rest.map((p) => '• ' + p.title + ' – ' + p.fullurl).join('\n');
  }
  return out;
}
