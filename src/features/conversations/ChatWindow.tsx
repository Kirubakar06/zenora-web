import React, { useRef, useEffect } from 'react';
import { useChatStore } from '../../store/chatStore';
import { Avatar } from '../../components/ui/Avatar';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PriorityBadge } from '../../components/common/PriorityBadge';
import { CopilotSuggestions } from './CopilotSuggestions';
import { MessageInput } from './MessageInput';
import { CustomerSidebar } from './CustomerSidebar';
import { formatDateTime } from '../../lib/utils/dateUtils';
import { Sparkles, BookOpen, Bot, User, CheckCircle2 } from 'lucide-react';

export const ChatWindow: React.FC = () => {
  const {
    selectedConversation,
    sendMessage,
    simulateCustomerReply,
    isAiGenerating,
  } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conv = selectedConversation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conv?.messages, isAiGenerating]);

  if (!conv) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500">
        <Bot className="h-12 w-12 text-slate-700 mb-3" />
        <h3 className="text-base font-bold text-slate-300">Select a conversation</h3>
        <p className="text-xs text-slate-500 mt-1">Choose a customer thread from the left to view messages</p>
      </div>
    );
  }

  const handleApplySuggestion = (suggestion: string) => {
    sendMessage(conv.id, suggestion);
  };

  return (
    <div className="flex-1 flex h-full overflow-hidden">
      {/* Center: Chat Stream */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#0a0d14]">
        {/* Chat Header */}
        <div className="px-6 py-3.5 border-b border-slate-800/80 bg-[#0d1322]/80 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Avatar src={conv.customer.avatar} name={conv.customer.name} size="sm" />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-sm font-bold text-white whitespace-nowrap">{conv.customer.name}</h2>
                <StatusBadge status={conv.status} type="conversation" />
                <PriorityBadge priority={conv.priority} />
              </div>
              <p className="text-xs text-slate-400 truncate mt-0.5">{conv.subject}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 ml-3">
            <div className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-800/50 text-[11px] font-semibold text-cyan-400">
              <Sparkles className="h-3 w-3" />
              <span>AI Copilot Active ({conv.aiConfidenceScore}%)</span>
            </div>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
          {conv.messages?.map((msg) => {
            const isCustomer = msg.senderType === 'customer';
            const isAi = msg.senderType === 'ai_agent';
            const isHumanAgent = msg.senderType === 'human_agent';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-2xl ${
                  isHumanAgent ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                <Avatar
                  src={
                    isAi
                      ? '/images/bot-avatar.svg'
                      : isCustomer
                      ? conv.customer.avatar
                      : undefined
                  }
                  name={msg.senderName}
                  size="sm"
                />

                <div className={`space-y-1.5 ${isHumanAgent ? 'items-end' : ''}`}>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300">{msg.senderName}</span>
                    {isAi && (
                      <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-bold px-1.5 py-0.2 rounded">
                        AI
                      </span>
                    )}
                    <span>{formatDateTime(msg.timestamp)}</span>
                  </div>

                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed ${
                      isHumanAgent
                        ? 'bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-600/10'
                        : isAi
                        ? 'bg-[#111827] border border-cyan-500/30 text-slate-100 rounded-tl-none shadow-lg shadow-cyan-500/5'
                        : 'bg-[#161e31] border border-slate-800 text-slate-100 rounded-tl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>

                    {/* Citations if AI */}
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-cyan-800/40 space-y-1.5">
                        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                          <BookOpen className="h-3 w-3" /> Grounded in Knowledge Base:
                        </span>
                        {msg.citations.map((cite, i) => (
                          <div
                            key={i}
                            className="bg-cyan-950/40 p-2 rounded-lg border border-cyan-900/50 text-[11px] text-cyan-200"
                          >
                            <span className="font-semibold block">{cite.sourceTitle}</span>
                            <span className="text-[10px] text-cyan-400/80 italic mt-0.5 block">
                              "{cite.snippet}"
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* AI Generating Indicator */}
          {isAiGenerating && (
            <div className="flex items-center gap-2 text-cyan-400 text-xs py-2 animate-pulse">
              <Sparkles className="h-4 w-4" />
              <span>Aura AI is drafting autonomous response with RAG embeddings...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Copilot Suggestions */}
        <CopilotSuggestions
          suggestions={conv.suggestedResponses}
          confidenceScore={conv.aiConfidenceScore}
          onApplySuggestion={handleApplySuggestion}
        />

        {/* Message Input */}
        <MessageInput
          onSendMessage={(text) => sendMessage(conv.id, text)}
          onSimulateCustomerReply={(text) => simulateCustomerReply(conv.id, text)}
          isAiGenerating={isAiGenerating}
        />
      </div>

      {/* Right Sidebar: Customer Intelligence */}
      <CustomerSidebar customer={conv.customer} conversation={conv} />
    </div>
  );
};
