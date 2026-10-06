export type PlanTier = 'starter' | 'growth' | 'enterprise';

export interface TenantUsage {
  conversationsThisMonth: number;
  conversationsLimit: number;
  tokensConsumed: number;
  activeAgents: number;
  agentSeatLimit: number;
  knowledgeBaseDocsCount: number;
}

export interface TenantSettings {
  defaultAiModel: string;
  autoEscalateThreshold: number; // sentiment score below which auto-escalates to human
  operatingHours: {
    timezone: string;
    start: string;
    end: string;
    weekdays: number[];
  };
  brandColor?: string;
  botName: string;
  botAvatar?: string;
  enableVoiceSupport: boolean;
  enableSentimentAnalysis: boolean;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  plan: PlanTier;
  billingCycle: 'monthly' | 'yearly';
  renewalDate: string;
  usage: TenantUsage;
  settings: TenantSettings;
  createdAt: string;
}
