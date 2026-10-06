import React, { useState } from 'react';
import { PageContainer } from '../../components/layout/PageContainer';
import { TicketsTable } from '../../components/tables/TicketsTable';
import { TicketFilters } from '../../features/tickets/TicketFilters';
import { TicketDetail } from '../../features/tickets/TicketDetail';
import { NewTicketModal } from '../../components/modals/NewTicketModal';
import { Button } from '../../components/ui/Button';
import { Ticket } from '../../types/ticket';
import { MOCK_TICKETS } from '../../lib/api/mockData';
import { Plus } from 'lucide-react';

export const TicketsPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = tickets.filter((t) => {
    if (statusFilter !== 'all' && t.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        t.ticketNumber.toLowerCase().includes(q) ||
        t.customer?.name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCreateTicket = (data: any) => {
    const newT: Ticket = {
      id: `tkt_${Date.now()}`,
      ticketNumber: `TIK-${Math.floor(1000 + Math.random() * 9000)}`,
      title: data.title,
      description: data.description,
      customerId: data.customerId,
      category: data.category,
      status: 'open',
      priority: data.priority,
      slaStatus: 'healthy',
      tags: ['New Inbound'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTickets([newT, ...tickets]);
  };

  const handleUpdateStatus = (newStatus: Ticket['status']) => {
    if (!selectedTicket) return;
    const updated = { ...selectedTicket, status: newStatus };
    setTickets(tickets.map((t) => (t.id === selectedTicket.id ? updated : t)));
    setSelectedTicket(updated);
  };

  return (
    <PageContainer
      title="Support Tickets"
      subtitle="Track SLA commitments, category routing, and escalation dispatches"
      action={
        <Button variant="glow" size="sm" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-1" /> Create Ticket
        </Button>
      }
    >
      <TicketFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
      />

      <div className="space-y-6">
        {selectedTicket && (
          <TicketDetail
            ticket={selectedTicket}
            onUpdateStatus={handleUpdateStatus}
            onClose={() => setSelectedTicket(null)}
          />
        )}

        <TicketsTable tickets={filtered} onSelectTicket={(t) => setSelectedTicket(t)} />
      </div>

      <NewTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTicket}
      />
    </PageContainer>
  );
};
