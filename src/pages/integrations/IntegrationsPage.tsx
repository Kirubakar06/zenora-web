import React, { useState } from 'react';
import { PageContainer } from '../../components/layout/PageContainer';
import { SlackIntegration } from '../../features/integrations/SlackIntegration';
import { ZendeskSync } from '../../features/integrations/ZendeskSync';
import { WebhookManager } from '../../features/integrations/WebhookManager';
import { WhatsAppConfig } from '../../features/integrations/WhatsAppConfig';
import { ApiKeyModal } from '../../components/modals/ApiKeyModal';
import { Button } from '../../components/ui/Button';
import { Key } from 'lucide-react';

export const IntegrationsPage: React.FC = () => {
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);

  return (
    <PageContainer
      title="Integrations & Ingestion Connectors"
      subtitle="Connect omni-channel messaging platforms, CRM helpdesks, and custom webhooks"
      action={
        <Button variant="secondary" size="sm" onClick={() => setApiKeyModalOpen(true)}>
          <Key className="h-4 w-4 mr-1.5 text-indigo-400" /> View Live API Keys
        </Button>
      }
    >
      <div className="space-y-6">
        <SlackIntegration />
        <WhatsAppConfig />
        <ZendeskSync />
        <WebhookManager />
      </div>

      <ApiKeyModal isOpen={apiKeyModalOpen} onClose={() => setApiKeyModalOpen(false)} />
    </PageContainer>
  );
};
