import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Send, X, Loader2, Trash2 } from 'lucide-react';
import { apiClient } from '../../lib/api/client';
import { complete } from '../../lib/ai/providers';
import { useAiProviderStore } from '../../store/aiProviderStore';
import { ROUTES } from '../../constants/routes';
import { AiModelSwitcher } from './AiModelSwitcher';
import { cn } from '../../lib/utils/cn';

interface ChatMsg {
  role: 'user' | 'assistant';
  content: string;
  error?: boolean;
}

const Linkify: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/(https?:\/\/\S+)/g).map((part, i) =>
      /^https?:\/\//.test(part) ? (
        <a key={i} href={part} target="_blank" rel="noreferrer" className="underline text-cyan-400 break-all">
          {part}
        </a>
      ) : (
        <React.Fragment key={i}>{part}</React.Fragment>
      )
    )}
  </>
);

export const AiChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const hasActive = useAiProviderStore((s) => Boolean(s.activeId && s.isConfigured(s.activeId)));

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, busy, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    const next: ChatMsg[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setBusy(true);
    try {
      const history = next
        .filter((m) => !m.error)
        .slice(-12)
        .map((m) => ({ role: m.role, content: m.content }));
      const res = hasActive
        ? await apiClient.generateAiSuggestion(text, history)
        : await complete('web', { apiKey: '', model: '' }, { system: '', messages: history })
            .then((reply) => ({ reply, error: undefined as string | undefined }))
            .catch((e: any) => ({ reply: 'Search failed.', error: e.message as string | undefined }));
      setMessages([
        ...next,
        { role: 'assistant', content: res.error ? `${res.reply}\n\n⚠ ${res.error}` : res.reply, error: Boolean(res.error) },
      ]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[min(92vw,380px)] h-[min(70vh,520px)] flex flex-col rounded-2xl border border-slate-700/70 bg-slate-900 shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between gap-2 px-3 py-2.5 border-b border-slate-800 bg-slate-900">
            <AiModelSwitcher compact align="left" idleLabel="Web Search (no key)" />
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages([])}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                title="Clear chat"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin">
            {messages.length === 0 && (
              <div className="text-center text-xs text-slate-400 pt-8 px-4 space-y-2">
                <Bot className="h-8 w-8 mx-auto text-indigo-400" />
                <p className="font-semibold text-slate-200">Ask Nexora AI anything</p>
                {!hasActive && (
                  <p>
                    No AI model connected, so I search the web (Wikipedia) for you. Ask anything like "Chennai" or
                    "what is webhook".{' '}
                    <Link to={ROUTES.AI_CONFIG} onClick={() => setOpen(false)} className="text-indigo-400 underline">
                      Connect ChatGPT / Gemini / Claude for smart answers
                    </Link>
                  </p>
                )}
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                <div
                  className={cn(
                    'max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap',
                    m.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-md'
                      : 'bg-slate-800 text-slate-200 rounded-bl-md'
                  )}
                >
                  <Linkify text={m.content} />
                </div>
              </div>
            ))}
            {busy && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking...
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="p-3 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-xl bg-slate-900/80 border border-slate-700/70 text-slate-100 placeholder-slate-500 text-xs px-3 py-2.5 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="p-2.5 rounded-xl bg-indigo-600 text-white disabled:opacity-50 hover:bg-indigo-500 transition-colors"
              title="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="h-14 w-14 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 text-white shadow-xl shadow-indigo-500/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        title="Chat with AI"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>
    </div>
  );
};
