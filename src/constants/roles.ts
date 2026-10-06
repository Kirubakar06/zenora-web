import { UserRole } from '../types/user';

export const USER_ROLES: Record<string, { label: string; description: string; role: UserRole }> = {
  OWNER: {
    role: 'owner',
    label: 'Workspace Owner',
    description: 'Full administrative access and subscription ownership',
  },
  ADMIN: {
    role: 'admin',
    label: 'Administrator',
    description: 'Manage settings, integrations, and user permissions',
  },
  SUPERVISOR: {
    role: 'supervisor',
    label: 'Support Supervisor',
    description: 'Monitor queues, reassign tickets, review AI and agent quality',
  },
  AGENT: {
    role: 'agent',
    label: 'Support Agent',
    description: 'Respond to tickets and conversations assisted by AI Copilot',
  },
  AI_TRAINER: {
    role: 'ai_trainer',
    label: 'AI Knowledge Trainer',
    description: 'Curate knowledge base documents, fine-tune prompts and inspect intents',
  },
};
