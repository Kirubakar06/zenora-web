import React from 'react';
import { Card } from '../../components/ui/Card';
import { Download, FileText } from 'lucide-react';

export const InvoiceHistory: React.FC = () => {
  const invoices = [
    { id: 'INV-2026-09', date: 'Sep 01, 2026', amount: '$4,788.00', status: 'Paid' },
    { id: 'INV-2025-09', date: 'Sep 01, 2025', amount: '$4,788.00', status: 'Paid' },
  ];

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-indigo-400" />
        <h3 className="text-sm font-bold text-white">Tax Invoices & Billing Receipts</h3>
      </div>

      <div className="divide-y divide-slate-800">
        {invoices.map((inv) => (
          <div key={inv.id} className="py-3 flex items-center justify-between text-xs">
            <div>
              <span className="font-mono font-bold text-slate-200 block">{inv.id}</span>
              <span className="text-[11px] text-slate-400">{inv.date}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono font-semibold text-white">{inv.amount}</span>
              <span className="text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px]">
                {inv.status}
              </span>
              <button
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title="Download PDF"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
