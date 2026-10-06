# SupportPulse AI - Enterprise AI Customer Support SaaS Platform

> **Next-Generation Autonomous AI Agent & Human Copilot Support Platform**  
> Engineered with React 18, TypeScript, Vite, Tailwind CSS, Zustand, and TanStack React Query.

---

## 🌟 Overview

**SupportPulse AI** is an enterprise-grade customer support SaaS platform built to dramatically increase first-response velocity, automate ticket deflection through vector-grounded RAG (Retrieval-Augmented Generation), and empower support agents with an intelligent AI copilot.

Key capabilities:
- **Autonomous AI Deflection:** Resolves up to 78%+ of routine customer inquiries end-to-end with zero human touch.
- **AI Copilot & Suggested Responses:** Generates context-aware, grounded response recommendations with verified source citations.
- **Real-Time Omni-channel Triage:** Live support queues spanning in-app chat widgets, email, Slack Connect, and WhatsApp Business.
- **Enterprise SLA Monitoring:** Automated countdown timers, escalation alerts, and breach prevention workflows.
- **Vector Knowledge Base Management:** Instant document tokenization, Blue-Green index synchronization, and semantic search.
- **Customer CRM Dossiers:** Live 360-degree customer intelligence including MRR tier, sentiment scoring, and historical case resolution.

---

## 📁 Repository Architecture & Folder Structure

```text
ai-support-saas/
│
├── public/
│   ├── logo.svg
│   ├── favicon.ico
│   └── images/
│       └── bot-avatar.svg
│
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── routes.tsx
│   │   └── providers/
│   │       ├── QueryProvider.tsx
│   │       ├── AuthProvider.tsx
│   │       └── ThemeProvider.tsx
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── Switch.tsx
│   │   │   └── Textarea.tsx
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── AppLayout.tsx
│   │   │   ├── PageContainer.tsx
│   │   │   └── NotificationDrawer.tsx
│   │   ├── forms/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── TicketForm.tsx
│   │   │   ├── KnowledgeArticleForm.tsx
│   │   │   └── BotConfigForm.tsx
│   │   ├── tables/
│   │   │   ├── TicketsTable.tsx
│   │   │   ├── CustomersTable.tsx
│   │   │   └── AgentsTable.tsx
│   │   ├── modals/
│   │   │   ├── NewTicketModal.tsx
│   │   │   ├── InviteMemberModal.tsx
│   │   │   ├── CreateArticleModal.tsx
│   │   │   └── ApiKeyModal.tsx
│   │   ├── charts/
│   │   │   ├── ResolutionRateChart.tsx
│   │   │   ├── VolumeTrendChart.tsx
│   │   │   ├── SentimentChart.tsx
│   │   │   └── ResponseTimeChart.tsx
│   │   └── common/
│   │       ├── StatusBadge.tsx
│   │       ├── PriorityBadge.tsx
│   │       ├── EmptyState.tsx
│   │       ├── LoadingSpinner.tsx
│   │       └── SearchInput.tsx
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── conversations/
│   │   ├── tickets/
│   │   ├── customers/
│   │   ├── ai/
│   │   ├── knowledge-base/
│   │   ├── agents/
│   │   ├── teams/
│   │   ├── analytics/
│   │   ├── notifications/
│   │   ├── billing/
│   │   ├── integrations/
│   │   └── settings/
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useDebounce.ts
│   │   ├── useWebSocket.ts
│   │   └── usePermissions.ts
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── endpoints.ts
│   │   │   └── mockData.ts
│   │   ├── websocket/
│   │   │   ├── mockSocket.ts
│   │   │   └── eventEmitter.ts
│   │   ├── auth/
│   │   │   ├── tokens.ts
│   │   │   └── permissionsMap.ts
│   │   ├── storage/
│   │   │   └── localStorage.ts
│   │   └── utils/
│   │       ├── cn.ts
│   │       ├── formatters.ts
│   │       └── dateUtils.ts
│   │
│   ├── pages/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── conversations/
│   │   ├── tickets/
│   │   ├── customers/
│   │   ├── knowledge-base/
│   │   ├── analytics/
│   │   ├── billing/
│   │   ├── integrations/
│   │   └── settings/
│   │
│   ├── store/
│   │   ├── authStore.ts
│   │   ├── tenantStore.ts
│   │   ├── chatStore.ts
│   │   ├── notificationStore.ts
│   │   └── uiStore.ts
│   │
│   ├── types/
│   │   ├── auth.ts
│   │   ├── user.ts
│   │   ├── tenant.ts
│   │   ├── conversation.ts
│   │   ├── message.ts
│   │   ├── ticket.ts
│   │   ├── customer.ts
│   │   ├── ai.ts
│   │   └── analytics.ts
│   │
│   └── constants/
│       ├── routes.ts
│       ├── roles.ts
│       ├── permissions.ts
│       └── status.ts
│
├── .env
├── .env.example
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```

---

## 🚀 Quickstart & Local Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm** / **yarn**

### 2. Installation
Clone the repository and install all dependencies:

```bash
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

### 4. Running the Development Server
Launch the Vite development server:

```bash
npm run dev
```

The application will be live at `http://localhost:3000`.

### 5. Building for Production
To test TypeScript compilation and build the static bundle:

```bash
npm run build
```

---

## 🛠️ Tech Stack & Libraries

- **Framework**: [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type checking)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) with cyber/glassmorphism design system
- **Routing**: [React Router v6](https://reactrouter.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Querying**: [TanStack Query v5](https://tanstack.com/query/latest)
- **Icons**: [Lucide React](https://lucide.dev/)
