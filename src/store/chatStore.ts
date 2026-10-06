import { create } from 'zustand';
import { Conversation } from '../types/conversation';
import { Message } from '../types/message';
import { MOCK_CONVERSATIONS } from '../lib/api/mockData';
import { apiClient } from '../lib/api/client';

interface ChatStore {
  conversations: Conversation[];
  selectedConversationId: string | null;
  activeFilter: 'all' | 'ai_handling' | 'assigned' | 'queued' | 'resolved';
  searchQuery: string;
  isAiGenerating: boolean;
  selectedConversation: () => Conversation | undefined;
  setSelectedConversationId: (id: string | null) => void;
  setActiveFilter: (filter: ChatStore['activeFilter']) => void;
  setSearchQuery: (query: string) => void;
  sendMessage: (conversationId: string, content: string) => Promise<void>;
  simulateCustomerReply: (conversationId: string, content: string) => Promise<void>;
  generateAiResponse: (conversationId: string) => Promise<void>;
  updateConversationStatus: (id: string, status: Conversation['status']) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  conversations: MOCK_CONVERSATIONS,
  selectedConversationId: 'conv_1',
  activeFilter: 'all',
  searchQuery: '',
  isAiGenerating: false,

  selectedConversation: () => {
    const { conversations, selectedConversationId } = get();
    return conversations.find((c) => c.id === selectedConversationId);
  },

  setSelectedConversationId: (id) => set({ selectedConversationId: id }),

  setActiveFilter: (filter) => set({ activeFilter: filter }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  sendMessage: async (conversationId, content) => {
    const newMsg = await apiClient.sendMessage(conversationId, content, 'human_agent');

    set((state) => ({
      conversations: state.conversations.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...(conv.messages || []), newMsg],
            lastMessageSnippet: content,
            updatedAt: new Date().toISOString(),
          };
        }
        return conv;
      }),
    }));
  },

  simulateCustomerReply: async (conversationId, content) => {
    const newMsg = await apiClient.sendMessage(conversationId, content, 'customer');

    set((state) => ({
      conversations: state.conversations.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...(conv.messages || []), newMsg],
            lastMessageSnippet: content,
            updatedAt: new Date().toISOString(),
          };
        }
        return conv;
      }),
    }));

    // Auto-trigger AI assistant recommendation
    get().generateAiResponse(conversationId);
  },

  generateAiResponse: async (conversationId) => {
    set({ isAiGenerating: true });
    try {
      const conv = get().conversations.find((c) => c.id === conversationId);
      const lastMsg = conv?.messages?.slice(-1)[0]?.content || 'Hello';
      const history = (conv?.messages || []).slice(-12).map((m) => ({
        role: m.senderType === 'customer' ? ('user' as const) : ('assistant' as const),
        content: m.content,
      }));
      while (history.length && history[0].role !== 'user') history.shift();
      const aiResult = await apiClient.generateAiSuggestion(lastMsg, history);

      const aiMsg: Message = {
        id: `msg_ai_${Date.now()}`,
        conversationId,
        senderType: 'ai_agent',
        senderName: aiResult.provider ? 'Aura · ' + aiResult.provider : 'Aura AI Copilot',
        senderAvatar: '/images/bot-avatar.svg',
        content: aiResult.error ? `${aiResult.reply}\n\n⚠ ${aiResult.error}` : aiResult.reply,
        citations: aiResult.citations,
        copilotSuggested: true,
        timestamp: new Date().toISOString(),
      };

      set((state) => ({
        conversations: state.conversations.map((c) => {
          if (c.id === conversationId) {
            return {
              ...c,
              messages: [...(c.messages || []), aiMsg],
              lastMessageSnippet: aiMsg.content,
              aiConfidenceScore: aiResult.confidence,
              updatedAt: new Date().toISOString(),
            };
          }
          return c;
        }),
      }));
    } finally {
      set({ isAiGenerating: false });
    }
  },

  updateConversationStatus: (id, status) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === id ? { ...c, status, updatedAt: new Date().toISOString() } : c
      ),
    }));
  },
}));
