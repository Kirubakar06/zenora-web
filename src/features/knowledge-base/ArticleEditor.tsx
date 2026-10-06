import React from 'react';
import { KnowledgeDocument } from '../../types/ai';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { formatDateTime } from '../../lib/utils/dateUtils';
import { Sparkles, Layers, BookCheck } from 'lucide-react';

interface ArticleEditorProps {
  article: KnowledgeDocument;
}

export const ArticleEditor: React.FC<ArticleEditorProps> = ({ article }) => {
  return (
    <Card className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="cyan">{article.category}</Badge>
            <Badge variant="success">
              <BookCheck className="h-3 w-3 mr-1 inline" /> {article.syncStatus}
            </Badge>
          </div>
          <h2 className="text-lg font-bold text-white">{article.title}</h2>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Layers className="h-4 w-4 text-indigo-400" />
          <span>{article.vectorChunksCount} Vector Chunks</span>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-wrap">
        {article.content}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
        <span>Referenced {article.usageCount} times by Autonomous AI Copilot</span>
        <span>Last indexed: {formatDateTime(article.lastIndexedAt)}</span>
      </div>
    </Card>
  );
};
