import React, { useState } from 'react';
import { Send, Bot, User, Paperclip } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  onSimulateCustomerReply: (text: string) => void;
  isAiGenerating?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  onSimulateCustomerReply,
  isAiGenerating = false,
}) => {
  const [content, setContent] = useState('');
  const firstName = useAuthStore((s) => s.user?.name?.split(' ')[0]) || 'Agent';

  const handleSend = () => {
    if (!content.trim()) return;
    onSendMessage(content.trim());
    setContent('');
  };

  const handleSimulateCustomer = () => {
    if (!content.trim()) {
      onSimulateCustomerReply('Can you show me where to find our monthly API billing breakdown?');
      return;
    }
    onSimulateCustomerReply(content.trim());
    setContent('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-3 border-t border-slate-800 bg-[#0e1322]">
      <div className="rounded-xl border border-slate-700/70 bg-slate-900/90 focus-within:border-indigo-500/80 transition-colors p-2">
        <textarea
          rows={2}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Reply to customer as ${firstName} (or simulate customer question below)...`}
          className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-xs focus:outline-none resize-none"
        />

        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors"
              title="Attach File"
            >
              <Paperclip className="h-4 w-4" />
            </button>

            {/* Customer Reply Simulator Button */}
            <button
              type="button"
              onClick={handleSimulateCustomer}
              className="flex items-center gap-1 text-[11px] font-semibold text-purple-400 bg-purple-950/40 hover:bg-purple-900/50 border border-purple-800/40 px-2 py-1 rounded-lg transition-colors"
              title="Simulate Inbound Customer Query"
            >
              <User className="h-3 w-3" />
              <span>Simulate Customer Inbound</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="glow"
              size="sm"
              onClick={handleSend}
              disabled={!content.trim()}
              isLoading={isAiGenerating}
            >
              <span>Send Reply</span>
              <Send className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
