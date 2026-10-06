import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { ConversationsPage } from '../pages/conversations/ConversationsPage';
import { TicketsPage } from '../pages/tickets/TicketsPage';
import { CustomersPage } from '../pages/customers/CustomersPage';
import { KnowledgeBasePage } from '../pages/knowledge-base/KnowledgeBasePage';
import { AnalyticsPage } from '../pages/analytics/AnalyticsPage';
import { BillingPage } from '../pages/billing/BillingPage';
import { IntegrationsPage } from '../pages/integrations/IntegrationsPage';
import { SettingsPage } from '../pages/settings/SettingsPage';
import { AiConfigPage } from '../pages/ai/AiConfigPage';
import { ROUTES } from '../constants/routes';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.AUTH.REGISTER} element={<RegisterPage />} />

      {/* App Shell Routes */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.CONVERSATIONS} element={<ConversationsPage />} />
        <Route path={ROUTES.TICKETS} element={<TicketsPage />} />
        <Route path={ROUTES.CUSTOMERS} element={<CustomersPage />} />
        <Route path={ROUTES.AI_CONFIG} element={<AiConfigPage />} />
        <Route path={ROUTES.KNOWLEDGE_BASE} element={<KnowledgeBasePage />} />
        <Route path={ROUTES.ANALYTICS} element={<AnalyticsPage />} />
        <Route path={ROUTES.BILLING} element={<BillingPage />} />
        <Route path={ROUTES.INTEGRATIONS} element={<IntegrationsPage />} />
        <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  );
};
