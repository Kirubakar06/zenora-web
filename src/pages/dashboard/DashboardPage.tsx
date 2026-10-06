import React, { useState } from 'react';
import { PageContainer } from '../../components/layout/PageContainer';
import { MetricsOverview } from '../../features/dashboard/MetricsOverview';
import { LiveQueues } from '../../features/dashboard/LiveQueues';
import { RecentActivity } from '../../features/dashboard/RecentActivity';
import { AgentPerformance } from '../../features/dashboard/AgentPerformance';
import { ResolutionRateChart } from '../../components/charts/ResolutionRateChart';
import { VolumeTrendChart } from '../../components/charts/VolumeTrendChart';
import { SentimentChart } from '../../components/charts/SentimentChart';
import { ResponseTimeChart } from '../../components/charts/ResponseTimeChart';
import { Button } from '../../components/ui/Button';
import { NewTicketModal } from '../../components/modals/NewTicketModal';
import { MOCK_METRICS } from '../../lib/api/mockData';
import { Sparkles, Plus, Bot, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export const DashboardPage: React.FC = () => {
  const [ticketModalOpen, setTicketModalOpen] = useState(false);

  return (
    <PageContainer
      title="Customer Success Command Center"
      subtitle="Autonomous AI Agent deflection & human copilot triage intelligence"
      action={
        <div className="flex items-center gap-2">
          <Link to={ROUTES.AI_CONFIG}>
            <Button variant="secondary" size="sm">
              <Sparkles className="h-4 w-4 mr-1 text-cyan-400" />
              Tune AI Engine
            </Button>
          </Link>
          <Button variant="glow" size="sm" onClick={() => setTicketModalOpen(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Create Ticket
          </Button>
        </div>
      }
    >
      {/* 4 Core KPIs */}
      <MetricsOverview metrics={MOCK_METRICS} />

      {/* Realtime Live Queues */}
      <LiveQueues />

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResolutionRateChart />
        <VolumeTrendChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SentimentChart />
        <ResponseTimeChart />
      </div>

      {/* Activity & Agent Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <AgentPerformance />
      </div>

      <NewTicketModal
        isOpen={ticketModalOpen}
        onClose={() => setTicketModalOpen(false)}
        onSubmit={(data) => console.log('New ticket created', data)}
      />
    </PageContainer>
  );
};
