import React from 'react';
import { Card } from '../../components/ui/Card';
import { useNotificationStore } from '../../store/notificationStore';
import { formatRelativeTime } from '../../lib/utils/dateUtils';
import { Bell, CheckCircle, AlertTriangle, Info } from 'lucide-react';

export const NotificationFeed: React.FC = () => {
  const { notifications, markAsRead } = useNotificationStore();

  const iconMap = {
    info: <Info className="h-4 w-4 text-cyan-400" />,
    success: <CheckCircle className="h-4 w-4 text-emerald-400" />,
    warning: <AlertTriangle className="h-4 w-4 text-amber-400" />,
    alert: <AlertTriangle className="h-4 w-4 text-rose-400" />,
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Bell className="h-4 w-4 text-indigo-400" />
        <h3 className="text-sm font-bold text-white">System Events & Alert Feed</h3>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => markAsRead(n.id)}
            className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3 cursor-pointer hover:border-slate-700 transition-colors"
          >
            <div className="mt-0.5">{iconMap[n.type]}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-200">{n.title}</span>
                <span className="text-[10px] text-slate-500">{formatRelativeTime(n.timestamp)}</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
