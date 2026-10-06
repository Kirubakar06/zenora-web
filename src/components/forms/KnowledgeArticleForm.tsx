import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';

interface KnowledgeArticleFormProps {
  initialValues?: any;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export const KnowledgeArticleForm: React.FC<KnowledgeArticleFormProps> = ({
  initialValues,
  onSubmit,
  isLoading,
}) => {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [category, setCategory] = useState(initialValues?.category || 'General');
  const [content, setContent] = useState(initialValues?.content || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, category, content });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Article Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. How to configure single sign-on"
        required
      />

      <Input
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="e.g. Security, Billing, Integrations"
        required
      />

      <Textarea
        label="Article Markdown Content"
        rows={6}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Full knowledge article text..."
        required
      />

      <Button type="submit" variant="glow" isLoading={isLoading} className="w-full">
        Publish Article to AI RAG Index
      </Button>
    </form>
  );
};
