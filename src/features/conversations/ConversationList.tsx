import React from 'react';
import { useChatStore } from '../../store/chatStore';
import { Avatar } from '../../components/ui/Avatar';
import { SearchInput } from '../../components/common/SearchInput';
import { formatRelativeTime } from '../../lib/utils/dateUtils';
import { Bot, MessageSquare, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils/cn';

export const ConversationList: React.FC = () => {
  const {
    conversations,
    selectedConversationId,
    setSelectedConversationId,
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
  } = useChatStore();

  const filtered = conversations.filter((c) => {
    if (activeFilter === 'ai_handling' && c.status !== 'ai_handling') return false;
    if (activeFilter === 'assigned' && c.status !== 'assigned') return false;
    if (activeFilter === 'queued' && c.status !== 'queued') return false;
    if (activeFilter === 'resolved' && c.status !== 'resolved') return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        c.customer.name.toLowerCase().includes(q) ||
        c.subject.toLowerCase().includes(q) ||
        c.lastMessageSnippet.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'ai_handling', label: 'AI Handling' },
    { id: 'assigned', label: 'Mine' },
    { id: 'queued', label: 'Queue' },
    { id: 'resolved', label: 'Done' },
  ];

  return (
    <div className="flex flex-col h-full border-r border-slate-800/80 bg-[#0d1322]/90 w-80 lg:w-96 flex-shrink-0">
      <div className="p-3 border-b border-slate-800 space-y-3">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search chats, customer or keywords..."
        />

        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={cn(
                'px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors',
                activeFilter === tab.id
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-slate-800/50 scrollbar-thin">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">No conversations found</div>
        ) : (
          filtered.map((conv) => {
            const isSelected = conv.id === selectedConversationId;
            return (
              <div
                key={conv.id}
                onClick={() => setSelectedConversationId(conv.id)}
                className={cn(
                  'p-3.5 cursor-pointer transition-all duration-200 flex items-start gap-3 relative',
                  isSelected
                    ? 'bg-indigo-950/30 border-l-2 border-indigo-500'
                    : 'hover:bg-slate-800/30'
                )}
              >
                <Avatar src={conv.customer.avatar} name={conv.customer.name} size="md" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-200 truncate">
                      {conv.customer.name}
                    </span>
                    <span className="text-[10px] text-slate-500 shrink-0 ml-2 mr-3 whitespace-nowrap">
                      {formatRelativeTime(conv.updatedAt)}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-slate-300 truncate mb-1">
                    {conv.subject}
                  </p>

                  <p className="text-[11px] text-slate-400 truncate leading-relaxed">
                    {conv.lastMessageSnippet}
                  </p>

                  <div className="flex items-center gap-1.5 mt-2">
                    {conv.status === 'ai_handling' && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-950/60 text-cyan-400 border border-cyan-800/50">
                        <Sparkles className="h-2.5 w-2.5" /> AI {conv.aiConfidenceScore}%
                      </span>
                    )}

                    {conv.priority === 'urgent' && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-950/60 text-rose-400 border border-rose-800/50 animate-pulse">
                        URGENT
                      </span>
                    )}

                    <span className="ml-auto text-[10px] uppercase font-mono text-slate-500">
                      {conv.channel.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {conv.unreadCount > 0 && (
                  <span className="h-2 w-2 rounded-full bg-indigo-500 absolute top-4 right-3" />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
