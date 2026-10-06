export type UserRole = 'owner' | 'admin' | 'agent' | 'supervisor' | 'ai_trainer';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  tenantId: string;
  department?: string;
  status: 'online' | 'busy' | 'away' | 'offline';
  assignedTicketsCount?: number;
  maxActiveChats?: number;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}
