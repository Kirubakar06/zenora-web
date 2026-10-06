import React, { useState } from 'react';
import { X, TicketPlus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { TicketPriority } from '../../types/ticket';
import { MOCK_CUSTOMERS } from '../../lib/api/mockData';

interface NewTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ticketData: any) => void;
}

export const NewTicketModal: React.FC<NewTicketModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [customerId, setCustomerId] = useState(MOCK_CUSTOMERS[0].id);
  const [priority, setPriority] = useState<TicketPriority>('medium');
  const [category, setCategory] = useState<'Technical' | 'Billing' | 'General'>('Technical');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    onSubmit({ title, description, customerId, priority, category });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg rounded-2xl bg-[#0f1422] border border-slate-800 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
              <TicketPlus className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-white">Create Support Ticket</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <Input
            label="Ticket Subject"
            placeholder="e.g. Webhook failure with HTTP 504"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Customer Account
            </label>
            <select
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="w-full rounded-xl bg-slate-900 border border-slate-700/70 text-slate-200 text-sm px-3.5 py-2.5 focus:outline-none focus:border-indigo-500"
            >
              {MOCK_CUSTOMERS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.company || c.email})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TicketPriority)}
                className="w-full rounded-xl bg-slate-900 border border-slate-700/70 text-slate-200 text-sm px-3.5 py-2.5 focus:outline-none focus:border-indigo-500"
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
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full rounded-xl bg-slate-900 border border-slate-700/70 text-slate-200 text-sm px-3.5 py-2.5 focus:outline-none focus:border-indigo-500"
              >
                <option value="Technical">Technical</option>
                <option value="Billing">Billing</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>

          <Textarea
            label="Initial Ticket Note / Description"
            placeholder="Describe the issue symptoms or reproduction steps..."
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="glow" size="sm">
              Create Ticket
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
