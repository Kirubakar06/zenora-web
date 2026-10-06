import { Customer } from './customer';
import { User } from './user';

export type TicketStatus = 'open' | 'in_progress' | 'waiting_on_customer' | 'escalated' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface TicketActivity {
  id: string;
  ticketId: string;
  actorName: string;
  action: string;
  note?: string;
  timestamp: string;
}

export interface Ticket {
  id: string;
  ticketNumber: string; // e.g. TIK-8492
  title: string;
  description: string;
  customerId: string;
  customer?: Customer;
  assignedAgentId?: string | null;
  assignedAgent?: User | null;
  category: 'Billing' | 'Technical' | 'Account' | 'Feature Request' | 'Bug' | 'General';
  status: TicketStatus;
  priority: TicketPriority;
  slaBreachTime?: string;
  slaStatus: 'healthy' | 'warning' | 'breached';
  aiDraftedResponse?: string;
  resolutionNotes?: string;
  activities?: TicketActivity[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
