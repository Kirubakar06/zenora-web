export type MessageSenderType = 'customer' | 'ai_agent' | 'human_agent' | 'system';

export interface MessageAttachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
}

export interface AiCitation {
  sourceTitle: string;
  url?: string;
  relevanceScore: number;
  snippet: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderType: MessageSenderType;
  senderId?: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  attachments?: MessageAttachment[];
  isInternalNote?: boolean;
  citations?: AiCitation[];
  copilotSuggested?: boolean;
  timestamp: string;
}
