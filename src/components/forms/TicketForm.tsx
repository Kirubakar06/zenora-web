import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { TicketPriority } from '../../types/ticket';

interface TicketFormProps {
  initialValues?: any;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export const TicketForm: React.FC<TicketFormProps> = ({ initialValues, onSubmit, isLoading }) => {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [priority, setPriority] = useState<TicketPriority>(initialValues?.priority || 'medium');
  const [category, setCategory] = useState(initialValues?.category || 'Technical');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, priority, category });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Ticket Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Brief summary of the issue"
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as TicketPriority)}
            className="w-full rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-sm px-3.5 py-2.5"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-sm px-3.5 py-2.5"
          >
            <option value="Technical">Technical</option>
            <option value="Billing">Billing</option>
            <option value="General">General</option>
            <option value="Feature Request">Feature Request</option>
          </select>
        </div>
      </div>

      <Textarea
        label="Description / Context"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Provide all background information..."
      />

      <Button type="submit" variant="primary" isLoading={isLoading} className="w-full">
        Save Ticket
      </Button>
    </form>
  );
};
