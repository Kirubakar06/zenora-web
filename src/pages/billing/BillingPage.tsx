import React from 'react';
import { PageContainer } from '../../components/layout/PageContainer';
import { PricingPlans } from '../../features/billing/PricingPlans';
import { UsageMeter } from '../../features/billing/UsageMeter';
import { InvoiceHistory } from '../../features/billing/InvoiceHistory';

export const BillingPage: React.FC = () => {
  return (
    <PageContainer
      title="Subscription, Plans & Metered Quotas"
      subtitle="Manage enterprise tiers, autonomous conversation capacity, and invoices"
    >
      <UsageMeter />
      <PricingPlans />
      <InvoiceHistory />
    </PageContainer>
  );
};
