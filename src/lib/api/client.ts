import { complete, ChatTurn } from '../ai/providers';
import { useAiProviderStore } from '../../store/aiProviderStore';
import {
  MOCK_CONVERSATIONS,
  MOCK_CUSTOMERS,
  MOCK_TICKETS,
  MOCK_KNOWLEDGE_DOCS,
  MOCK_AI_CONFIG,
  MOCK_METRICS,
  MOCK_TENANT,
  MOCK_USER,
} from './mockData';
import { Conversation } from '../../types/conversation';
import { Message } from '../../types/message';
import { Ticket } from '../../types/ticket';
import { KnowledgeDocument, AiModelConfig } from '../../types/ai';

// Simulated latency helper
const delay = (ms: number = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiClient = {
  // Auth
  async getCurrentUser() {
    await delay(150);
    return MOCK_USER;
  },

  // Tenant
  async getTenant() {
    await delay(150);
    return MOCK_TENANT;
  },

  // Conversations
  async getConversations(): Promise<Conversation[]> {
    await delay(200);
    return [...MOCK_CONVERSATIONS];
  },

  async getConversationById(id: string): Promise<Conversation | undefined> {
    await delay(150);
    return MOCK_CONVERSATIONS.find((c) => c.id === id);
  },

  async sendMessage(conversationId: string, content: string, senderType: 'human_agent' | 'customer' = 'human_agent'): Promise<Message> {
    await delay(200);
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      conversationId,
      senderType,
      senderName: senderType === 'human_agent' ? 'Alex Rivera' : 'Customer',
      content,
      timestamp: new Date().toISOString(),
    };
    return newMessage;
  },

  // AI Response Generator Simulation
  async generateAiSuggestion(
    userQuery: string,
    history: ChatTurn[] = []
  ): Promise<{ reply: string; confidence: number; citations: any[]; provider?: string; error?: string }> {
    const active = useAiProviderStore.getState().active();
    if (active) {
      try {
        const turns = history.length ? history : [{ role: 'user' as const, content: userQuery }];
        const reply = await complete(active.id, active.settings, {
          system: MOCK_AI_CONFIG.systemPrompt,
          messages: turns,
          temperature: MOCK_AI_CONFIG.temperature,
          maxTokens: MOCK_AI_CONFIG.maxTokens,
        });
        return {
          reply: reply || '(empty response)',
          confidence: 92,
          citations: [],
          provider: active.name + ' · ' + active.settings.model,
        };
      } catch (err: any) {
        const fallback = await apiClient.generateMockSuggestion(userQuery);
        return { ...fallback, error: active.name + ' failed (' + err.message + '). Showing demo reply.' };
      }
    }
    return apiClient.generateMockSuggestion(userQuery);
  },

  async generateMockSuggestion(userQuery: string): Promise<{ reply: string; confidence: number; citations: any[] }> {
    await delay(600);
    const queryLower = userQuery.toLowerCase();

    if (queryLower.includes('timeout') || queryLower.includes('webhook')) {
      return {
        reply: 'Based on our Webhook SLA docs, our outbound default deadline is 10s. I can elevate your tenant gateway limit to 30s or provide the current IP allowlist.',
        confidence: 96,
        citations: [
          {
            sourceTitle: 'Webhook Ingestion SLA & Timeout Policy',
            relevanceScore: 0.96,
            snippet: 'Outbound webhook requests default to a 10-second timeout with 5 retries over 4 hours.',
          },
        ],
      };
    }

    if (queryLower.includes('invoice') || queryLower.includes('bill') || queryLower.includes('vat')) {
      return {
        reply: 'You can download all tax-compliant invoices and update your VAT reverse charge ID directly under Billing & Plans > Invoices.',
        confidence: 98,
        citations: [
          {
            sourceTitle: 'Billing Cycles & Seat Add-ons',
            relevanceScore: 0.95,
            snippet: 'PDF VAT invoices are auto-generated on the 1st of each calendar month.',
          },
        ],
      };
    }

    return {
      reply: `I analyzed your question: "${userQuery}". According to our platform knowledge base, I can assist you with step-by-step resolution or escalate to a specialized engineering supervisor.`,
      confidence: 88,
      citations: [
        {
          sourceTitle: 'Nexora AI Knowledge Base Base Index',
          relevanceScore: 0.88,
          snippet: 'Comprehensive indexing across enterprise docs and sync connectors.',
        },
      ],
    };
  },

  // Tickets
  async getTickets(): Promise<Ticket[]> {
    await delay(200);
    return [...MOCK_TICKETS];
  },

  async createTicket(ticket: Partial<Ticket>): Promise<Ticket> {
    await delay(250);
    const newTicket: Ticket = {
      id: `tkt_${Date.now()}`,
      ticketNumber: `TIK-${Math.floor(1000 + Math.random() * 9000)}`,
      title: ticket.title || 'Untitled Ticket',
      description: ticket.description || '',
      customerId: ticket.customerId || 'cust_101',
      category: ticket.category || 'General',
      status: 'open',
      priority: ticket.priority || 'medium',
      slaStatus: 'healthy',
      tags: ticket.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return newTicket;
  },

  // Customers
  async getCustomers() {
    await delay(200);
    return [...MOCK_CUSTOMERS];
  },

  // Knowledge Base
  async getKnowledgeDocs(): Promise<KnowledgeDocument[]> {
    await delay(200);
    return [...MOCK_KNOWLEDGE_DOCS];
  },

  async createKnowledgeDoc(doc: Partial<KnowledgeDocument>): Promise<KnowledgeDocument> {
    await delay(300);
    return {
      id: `doc_${Date.now()}`,
      title: doc.title || 'New Document',
      category: doc.category || 'General',
      content: doc.content || '',
      sourceType: doc.sourceType || 'manual',
      syncStatus: 'synced',
      vectorChunksCount: 8,
      lastIndexedAt: new Date().toISOString(),
      usageCount: 0,
    };
  },

  // AI Configuration
  async getAiConfig(): Promise<AiModelConfig> {
    await delay(150);
    return { ...MOCK_AI_CONFIG };
  },

  // Analytics Metrics
  async getMetrics() {
    await delay(150);
    return [...MOCK_METRICS];
  },
};
