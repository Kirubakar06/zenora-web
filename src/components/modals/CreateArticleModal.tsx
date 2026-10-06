import React, { useState } from 'react';
import { X, BookPlus, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';

interface CreateArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (articleData: any) => void;
}

export const CreateArticleModal: React.FC<CreateArticleModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('API & Integrations');
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    onSubmit({ title, category, content });
    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-xl rounded-2xl bg-[#0f1422] border border-slate-800 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-cyan-500/10 rounded-xl text-cyan-400">
              <BookPlus className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Add Knowledge Document</h3>
              <p className="text-xs text-slate-400">Automatically tokenized into vector chunks for AI RAG</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <Input
            label="Document Title"
            placeholder="e.g. Rate limits, burst policies and status codes"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Category
            </label>
            <input
              type="text"
              className="w-full rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-sm px-3.5 py-2.5 focus:outline-none focus:border-cyan-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <Textarea
            label="Document Content (Markdown supported)"
            placeholder="Write clear instructions, technical parameters, or support FAQs..."
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <div className="p-3 bg-cyan-950/30 border border-cyan-800/40 rounded-xl flex items-center gap-2 text-xs text-cyan-300">
            <Sparkles className="h-4 w-4 text-cyan-400 flex-shrink-0" />
            <span>AI embedding engine will index this document in &lt; 2 seconds across all active channels.</span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="glow" size="sm">
              Index Document
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
