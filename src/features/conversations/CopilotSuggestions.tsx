import React from 'react';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface CopilotSuggestionsProps {
  suggestions?: string[];
  confidenceScore: number;
  onApplySuggestion: (suggestion: string) => void;
}

export const CopilotSuggestions: React.FC<CopilotSuggestionsProps> = ({
  suggestions = [],
  confidenceScore,
  onApplySuggestion,
}) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="p-3 bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900/60 border-t border-slate-800/80">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>AI Copilot Suggested Answers</span>
        </div>
        <span className="text-[10px] text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded-full border border-slate-800">
          Confidence {confidenceScore}%
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, idx) => (
          <button
            key={idx}
            onClick={() => onApplySuggestion(suggestion)}
            className="flex items-center gap-1.5 text-left text-xs bg-slate-900/90 hover:bg-indigo-950/70 border border-slate-700/60 hover:border-indigo-500/50 text-slate-200 px-3 py-1.5 rounded-xl transition-all duration-200 group max-w-full truncate"
          >
            <span className="truncate">{suggestion}</span>
            <ArrowRight className="h-3 w-3 text-indigo-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};
