import React, { useState } from 'react';
import { PageContainer } from '../../components/layout/PageContainer';
import { CategoryList } from '../../features/knowledge-base/CategoryList';
import { ArticleEditor } from '../../features/knowledge-base/ArticleEditor';
import { SemanticSearchDemo } from '../../features/knowledge-base/SemanticSearchDemo';
import { CreateArticleModal } from '../../components/modals/CreateArticleModal';
import { Button } from '../../components/ui/Button';
import { KnowledgeDocument } from '../../types/ai';
import { MOCK_KNOWLEDGE_DOCS } from '../../lib/api/mockData';
import { Plus, Sparkles, Database } from 'lucide-react';

export const KnowledgeBasePage: React.FC = () => {
  const [docs, setDocs] = useState<KnowledgeDocument[]>(MOCK_KNOWLEDGE_DOCS);
  const [selectedDoc, setSelectedDoc] = useState<KnowledgeDocument>(docs[0]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = Array.from(new Set(docs.map((d) => d.category)));

  const filteredDocs =
    selectedCategory === 'all'
      ? docs
      : docs.filter((d) => d.category === selectedCategory);

  const handleCreateArticle = (data: any) => {
    const newDoc: KnowledgeDocument = {
      id: `doc_${Date.now()}`,
      title: data.title,
      category: data.category,
      content: data.content,
      sourceType: 'manual',
      syncStatus: 'synced',
      vectorChunksCount: 16,
      lastIndexedAt: new Date().toISOString(),
      usageCount: 0,
    };
    setDocs([newDoc, ...docs]);
    setSelectedDoc(newDoc);
  };

  return (
    <PageContainer
      title="AI Grounding Knowledge Base"
      subtitle="Curate documentation chunks vectorized for instant autonomous copilot answers"
      action={
        <Button variant="glow" size="sm" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-1" /> Add Knowledge Document
        </Button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Categories & Search */}
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-[#0f1422] border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Document Categories
            </h4>
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          <div className="p-4 rounded-2xl bg-[#0f1422] border border-slate-800 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
              <Database className="h-4 w-4" />
              <span>Vector Semantic Search</span>
            </div>
            <SemanticSearchDemo
              documents={filteredDocs}
              onSelectDoc={(d) => setSelectedDoc(d)}
            />
          </div>
        </div>

        {/* Right Column: Article Viewer & Inspector */}
        <div className="lg:col-span-3">
          {selectedDoc ? (
            <ArticleEditor article={selectedDoc} />
          ) : (
            <div className="text-center py-12 text-slate-500">Select an article to view details</div>
          )}
        </div>
      </div>

      <CreateArticleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateArticle}
      />
    </PageContainer>
  );
};
