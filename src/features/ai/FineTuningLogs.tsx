import React from 'react';
import { Card } from '../../components/ui/Card';
import { ThumbsUp, ThumbsDown, CheckCircle } from 'lucide-react';

export const FineTuningLogs: React.FC = () => {
  const logs = [
    {
      id: '1',
      query: 'How to bypass 429 rate limit during migration?',
      accuracy: '98%',
      feedback: 'positive',
      verifiedBy: 'Sarah Chen (Supervisor)',
    },
    {
      id: '2',
      query: 'Can we pay via wire transfer in EUR?',
      accuracy: '94%',
      feedback: 'positive',
      verifiedBy: 'Marcus Vance',
    },
    {
      id: '3',
      query: 'Do you offer on-prem air-gapped hosting?',
      accuracy: '89%',
      feedback: 'adjusted',
      verifiedBy: 'Alex Rivera',
    },
  ];

  return (
    <Card className="p-6 space-y-4">
      <div>
        <h3 className="text-base font-bold text-white">AI Alignment & Quality Evaluation</h3>
        <p className="text-xs text-slate-400 mt-1">
          Recent human supervisor validations used for continuous RLHF learning
        </p>
      </div>

      <div className="space-y-3">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800"
          >
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-200 block">{log.query}</span>
              <span className="text-[11px] text-slate-400">Audited by {log.verifiedBy}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-emerald-400">{log.accuracy} Match</span>
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <ThumbsUp className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
