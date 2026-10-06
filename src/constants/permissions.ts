export const PERMISSIONS = {
  // Conversation Permissions
  CONVERSATIONS_VIEW: 'conversations:view',
  CONVERSATIONS_REPLY: 'conversations:reply',
  CONVERSATIONS_TRANSFER: 'conversations:transfer',
  CONVERSATIONS_RESOLVE: 'conversations:resolve',

  // Tickets Permissions
  TICKETS_VIEW: 'tickets:view',
  TICKETS_CREATE: 'tickets:create',
  TICKETS_EDIT: 'tickets:edit',
  TICKETS_DELETE: 'tickets:delete',
  TICKETS_ASSIGN: 'tickets:assign',

  // AI & Knowledge
  AI_PROMPT_EDIT: 'ai:prompt_edit',
  AI_MODEL_SETTINGS: 'ai:model_settings',
  KNOWLEDGE_MANAGE: 'knowledge:manage',

  // Workspace & Billing
  MEMBERS_INVITE: 'members:invite',
  BILLING_MANAGE: 'billing:manage',
  INTEGRATIONS_CONFIG: 'integrations:config',
  SETTINGS_UPDATE: 'settings:update',
} as const;

export type PermissionKey = keyof typeof PERMISSIONS;
