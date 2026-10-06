export interface AiModelConfig {
  provider: 'openai' | 'anthropic' | 'google' | 'groq';
  modelId: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  confidenceThreshold: number; // minimum confidence to reply autonomously
  fallbackToHuman: boolean;
  groundingEnabled: boolean;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: string;
  content: string;
  sourceType: 'manual' | 'url_crawl' | 'pdf_upload' | 'zendesk_sync' | 'notion';
  syncStatus: 'synced' | 'indexing' | 'failed';
  vectorChunksCount: number;
  lastIndexedAt: string;
  usageCount: number;
}

export interface AiPromptTest {
  id: string;
  inputPrompt: string;
  simulatedResponse: string;
  latencyMs: number;
  retrievedDocs: string[];
  sentimentScore: number;
  confidenceScore: number;
}

export interface AiIntent {
  id: string;
  name: string;
  description: string;
  frequency: number;
  autoResolutionRate: number;
  suggestedAction: string;
}
