import React from 'react';
import { Bell, Menu, Sparkles, Sun, Moon, LogOut, Radio } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import { useNotificationStore } from '../../store/notificationStore';
import { Avatar } from '../ui/Avatar';
import { AiModelSwitcher } from './AiModelSwitcher';

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme, notificationDrawerOpen, setNotificationDrawerOpen, setMobileNavOpen } = useUiStore();
  const unreadCount = useNotificationStore((s) => s.unreadCount());

  return (
    <header className="h-16 border-b border-slate-800/80 bg-[#0d1322]/80 backdrop-blur-xl px-3 sm:px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: AI System Status Banner */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileNavOpen(true)}
          className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors border border-slate-800"
          title="Open menu"
        >
          <Menu className="h-4 w-4" />
        </button>
        <div className="hidden sm:block">
          <AiModelSwitcher />
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 px-3 py-1 rounded-lg bg-slate-900/50 border border-slate-800">
          <Radio className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
          <span>WebSocket Stream: Connected (14ms)</span>
        </div>
      </div>

      {/* Right: Actions & User Info */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors border border-slate-800"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* Notifications */}
        <button
          onClick={() => setNotificationDrawerOpen(!notificationDrawerOpen)}
          className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors border border-slate-800"
          title="View Notifications"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white shadow-lg shadow-indigo-600/50">
              {unreadCount}
            </span>
          )}
        </button>

        <div className="h-6 w-px bg-slate-800 mx-1" />

        {/* User Card */}
        <div className="flex items-center gap-3 pl-1">
          <Avatar
            src={user?.avatar}
            name={user?.name || 'Agent'}
            size="sm"
            status="online"
          />
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-200">{user?.name}</span>
            <span className="text-[10px] text-slate-400 capitalize">{user?.role}</span>
          </div>

          <button
            onClick={logout}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors ml-1"
            title="Log out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
