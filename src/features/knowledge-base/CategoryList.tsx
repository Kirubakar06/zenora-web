import React from 'react';
import { BookOpen, Folder, FileText } from 'lucide-react';
import { cn } from '../../lib/utils/cn';

interface CategoryListProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="space-y-1">
      <button
        onClick={() => onSelectCategory('all')}
        className={cn(
          'w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors',
          selectedCategory === 'all'
            ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
        )}
      >
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          <span>All Documents</span>
        </div>
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelectCategory(cat)}
          className={cn(
            'w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors',
            selectedCategory === cat
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          )}
        >
          <div className="flex items-center gap-2">
            <Folder className="h-4 w-4" />
            <span className="truncate">{cat}</span>
          </div>
        </button>
      ))}
    </div>
  );
};
