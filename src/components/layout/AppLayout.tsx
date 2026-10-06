import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { ROUTES } from '../../constants/routes';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { NotificationDrawer } from './NotificationDrawer';
import { AiChatWidget } from './AiChatWidget';

export const AppLayout: React.FC = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  return (
    <div className="app-shell flex h-screen w-screen overflow-hidden bg-[#0a0d14] text-slate-100">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <Outlet />
        </main>
      </div>
      <NotificationDrawer />
      <AiChatWidget />
    </div>
  );
};
