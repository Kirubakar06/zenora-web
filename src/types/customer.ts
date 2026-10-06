export interface CustomerAttribute {
  key: string;
  value: string | number | boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
  mrr: number; // Monthly recurring revenue in USD
  totalConversations: number;
  openTicketsCount: number;
  healthScore: number; // 0 to 100
  sentimentSummary: string;
  location?: string;
  tags: string[];
  customAttributes?: CustomerAttribute[];
  createdAt: string;
  lastActiveAt: string;
}
