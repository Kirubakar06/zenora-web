import { create } from 'zustand';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  read: boolean;
  timestamp: string;
  link?: string;
}

interface NotificationStore {
  notifications: AppNotification[];
  unreadCount: () => number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<AppNotification, 'id' | 'read' | 'timestamp'>) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [
    {
      id: 'notif_1',
      title: 'Autonomous Resolution Spiked',
      message: 'AI successfully resolved 92% of inbound Webhook queries in the last 2 hours.',
      type: 'success',
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
    {
      id: 'notif_2',
      title: 'SLA Warning on TIK-9839',
      message: 'Ticket for Daniel Weber (Kryptonware) has 45 minutes remaining before SLA breach.',
      type: 'warning',
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    },
    {
      id: 'notif_3',
      title: 'Knowledge Base Sync Finished',
      message: 'Notion & Zendesk connectors finished indexing 142 vectors chunks.',
      type: 'info',
      read: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    },
  ],

  unreadCount: () => get().notifications.filter((n) => !n.read).length,

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),

  addNotification: (notif) =>
    set((state) => ({
      notifications: [
        {
          ...notif,
          id: `notif_${Date.now()}`,
          read: false,
          timestamp: new Date().toISOString(),
        },
        ...state.notifications,
      ],
    })),

  clearAll: () => set({ notifications: [] }),
}));
