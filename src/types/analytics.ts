export interface MetricCardData {
  title: string;
  value: string | number;
  changePercent: number;
  trend: 'up' | 'down' | 'neutral';
  isPositiveImprovement: boolean;
  description: string;
}

export interface VolumeTrendPoint {
  time: string;
  aiHandled: number;
  humanHandled: number;
  total: number;
}

export interface SentimentDistribution {
  positive: number;
  neutral: number;
  negative: number;
}

export interface ChannelStat {
  channel: string;
  count: number;
  percentage: number;
}

export interface AgentPerformanceMetric {
  agentId: string;
  agentName: string;
  avatar?: string;
  resolvedCount: number;
  avgResponseTimeMin: number;
  csatRating: number; // 1 to 5
  slaMetRate: number; // percentage
}
