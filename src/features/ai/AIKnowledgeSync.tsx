import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Database, RefreshCw, CheckCircle2 } from 'lucide-react';

export const AIKnowledgeSync: React.FC = () => {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Database className="h-4 w-4 text-cyan-400" />
            Vector Store Indexing Status
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Realtime sync with Pinecone / pgvector embedding pipeline
          </p>
        </div>
        <Button variant="secondary" size="sm">
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
          Re-Index Embeddings
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Indexed Chunks</span>
          <span className="text-xl font-bold text-white">1,842</span>
        </div>
        <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Embedding Engine</span>
          <span className="text-sm font-semibold text-cyan-400">text-embedding-3-large</span>
        </div>
        <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Last Full Sync</span>
          <span className="text-xs font-medium text-slate-300">Today at 14:15 UTC</span>
        </div>
      </div>
    </Card>
  );
};
