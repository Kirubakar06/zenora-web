import React, { useState } from 'react';
import { X, Key, Copy, Check } from 'lucide-react';
import { Button } from '../ui/Button';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const sampleKey = 'sp_live_9942a8f8d9b124e930129bc78';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md rounded-2xl bg-[#0f1422] border border-slate-800 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
              <Key className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-white">Live API Secret Key</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-xs text-slate-400">
            Use this secret key to authenticate SDK clients, webhook signatures, and ingest external tickets programmatically.
          </p>

          <div className="flex items-center gap-2 p-3 bg-slate-900 border border-slate-800 rounded-xl">
            <code className="text-xs text-indigo-300 font-mono flex-1 truncate">{sampleKey}</code>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Copy Key"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-800">
            <Button variant="secondary" size="sm" onClick={onClose}>
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
