import React from 'react';
import { PageContainer } from '../../components/layout/PageContainer';
import { ResolutionRateChart } from '../../components/charts/ResolutionRateChart';
import { VolumeTrendChart } from '../../components/charts/VolumeTrendChart';
import { SentimentChart } from '../../components/charts/SentimentChart';
import { ResponseTimeChart } from '../../components/charts/ResponseTimeChart';
import { CSATBreakdown } from '../../features/analytics/CSATBreakdown';
import { SLACompliance } from '../../features/analytics/SLACompliance';
import { ChannelDistribution } from '../../features/analytics/ChannelDistribution';
import { Button } from '../../components/ui/Button';
import { Download } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  return (
    <PageContainer
      title="Analytics & Executive Intelligence"
      subtitle="Deflection velocity, response latency, SLA metrics, and channel breakdown"
      action={
        <Button variant="secondary" size="sm">
          <Download className="h-4 w-4 mr-1.5" /> Export Executive PDF
        </Button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResolutionRateChart />
        <ResponseTimeChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VolumeTrendChart />
        <SentimentChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CSATBreakdown />
        <SLACompliance />
        <ChannelDistribution />
      </div>
    </PageContainer>
  );
};
