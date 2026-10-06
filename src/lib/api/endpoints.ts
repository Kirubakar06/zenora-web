export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
  },
  TENANT: {
    DETAIL: '/tenants/current',
    UPDATE: '/tenants/current',
    USAGE: '/tenants/current/usage',
  },
  CONVERSATIONS: {
    LIST: '/conversations',
    DETAIL: (id: string) => `/conversations/${id}`,
    MESSAGES: (id: string) => `/conversations/${id}/messages`,
    ASSIGN: (id: string) => `/conversations/${id}/assign`,
    RESOLVE: (id: string) => `/conversations/${id}/resolve`,
  },
  TICKETS: {
    LIST: '/tickets',
    DETAIL: (id: string) => `/tickets/${id}`,
    CREATE: '/tickets',
    UPDATE: (id: string) => `/tickets/${id}`,
  },
  CUSTOMERS: {
    LIST: '/customers',
    DETAIL: (id: string) => `/customers/${id}`,
  },
  AI: {
    CONFIG: '/ai/config',
    KNOWLEDGE_BASE: '/ai/knowledge-base',
    SIMULATE: '/ai/simulate',
    INTENTS: '/ai/intents',
  },
  ANALYTICS: {
    OVERVIEW: '/analytics/overview',
    VOLUME_TREND: '/analytics/volume',
  },
};
