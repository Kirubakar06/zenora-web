import React from 'react';
import { X, CheckCheck, Bell, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { useNotificationStore } from '../../store/notificationStore';
import { useUiStore } from '../../store/uiStore';
import { formatRelativeTime } from '../../lib/utils/dateUtils';
import { cn } from '../../lib/utils/cn';

export const NotificationDrawer: React.FC = () => {
  const { notificationDrawerOpen, setNotificationDrawerOpen } = useUiStore();
  const { notifications, markAsRead, markAllAsRead, clearAll } = useNotificationStore();

  if (!notificationDrawerOpen) return null;

  const iconMap = {
    info: <Info className="h-4 w-4 text-cyan-400" />,
    success: <CheckCircle className="h-4 w-4 text-emerald-400" />,
    warning: <AlertTriangle className="h-4 w-4 text-amber-400" />,
    alert: <AlertTriangle className="h-4 w-4 text-rose-400" />,
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-96 bg-[#0f1422] border-l border-slate-800 shadow-2xl flex flex-col">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-slate-100">Live AI Feed & Alerts</h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={markAllAsRead}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            title="Mark all as read"
          >
            <CheckCheck className="h-4 w-4" />
          </button>
          <button
            onClick={() => setNotificationDrawerOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">No notifications yet</div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markAsRead(n.id)}
              className={cn(
                'p-3.5 rounded-xl border transition-all cursor-pointer space-y-1 relative',
                n.read
                  ? 'bg-slate-900/40 border-slate-800/60 opacity-70'
                  : 'bg-slate-900/90 border-indigo-500/30 shadow-md shadow-indigo-500/5'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {iconMap[n.type]}
                  <span className="text-xs font-semibold text-slate-200">{n.title}</span>
                </div>
                <span className="text-[10px] text-slate-500">
                  {formatRelativeTime(n.timestamp)}
                </span>
              </div>
              <p className="text-xs text-slate-400 pl-6 leading-relaxed">{n.message}</p>
              {!n.read && (
                <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-indigo-500" />
              )}
            </div>
          ))
        )}
      </div>

      <div className="p-3 border-t border-slate-800 flex justify-end">
        <button
          onClick={clearAll}
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          Clear all notifications
        </button>
      </div>
    </div>
  );
};
