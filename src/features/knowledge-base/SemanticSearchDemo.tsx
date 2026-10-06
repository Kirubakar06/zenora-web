import React, { useState } from 'react';
import { SearchInput } from '../../components/common/SearchInput';
import { Sparkles, ArrowRight } from 'lucide-react';
import { KnowledgeDocument } from '../../types/ai';

interface SemanticSearchDemoProps {
  documents: KnowledgeDocument[];
  onSelectDoc: (doc: KnowledgeDocument) => void;
}

export const SemanticSearchDemo: React.FC<SemanticSearchDemoProps> = ({
  documents,
  onSelectDoc,
}) => {
  const [query, setQuery] = useState('');

  const filtered = documents.filter((doc) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      doc.title.toLowerCase().includes(q) ||
      doc.content.toLowerCase().includes(q) ||
      doc.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4">
      <div className="relative">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Semantic vector search across indexed documents..."
        />
        {query && (
          <div className="absolute right-3 top-2.5 text-[10px] text-cyan-400 font-semibold flex items-center gap-1 pointer-events-none">
            <Sparkles className="h-3 w-3" /> Cosine similarity search
          </div>
        )}
      </div>

      <div className="space-y-2">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            onClick={() => onSelectDoc(doc)}
            className="p-3.5 rounded-xl bg-slate-900/50 hover:bg-slate-800/60 border border-slate-800/80 hover:border-indigo-500/40 cursor-pointer transition-all flex items-center justify-between group"
          >
            <div>
              <span className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors block">
                {doc.title}
              </span>
              <span className="text-[10px] text-slate-400">
                {doc.category} • {doc.vectorChunksCount} vectors
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
          </div>
        ))}
      </div>
    </div>
  );
};
