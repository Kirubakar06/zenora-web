import { Message } from './message';
import { Customer } from './customer';
import { User } from './user';

export type ConversationChannel = 'chat_widget' | 'email' | 'whatsapp' | 'slack' | 'voice';
export type ConversationStatus = 'ai_handling' | 'queued' | 'assigned' | 'resolved' | 'snoozed';
export type ConversationPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface SentimentAnalysis {
  score: number; // -1.0 to 1.0
  label: 'positive' | 'neutral' | 'negative' | 'frustrated';
  summary?: string;
  detectedIntents: string[];
}

export interface Conversation {
  id: string;
  customerId: string;
  customer: Customer;
  assignedAgentId?: string | null;
  assignedAgent?: User | null;
  channel: ConversationChannel;
  status: ConversationStatus;
  priority: ConversationPriority;
  subject: string;
  sentiment: SentimentAnalysis;
  lastMessageSnippet: string;
  unreadCount: number;
  messages?: Message[];
  aiConfidenceScore: number; // 0 - 100
  suggestedResponses?: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
