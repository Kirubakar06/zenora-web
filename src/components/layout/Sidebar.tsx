import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Ticket,
  Users,
  Bot,
  BookOpen,
  BarChart3,
  CreditCard,
  Layers,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useUiStore } from '../../store/uiStore';
import { useTenantStore } from '../../store/tenantStore';
import { ROUTES } from '../../constants/routes';
import { cn } from '../../lib/utils/cn';

export const Sidebar: React.FC = () => {
  const { sidebarCollapsed, toggleSidebar, mobileNavOpen, setMobileNavOpen } = useUiStore();
  const { tenant } = useTenantStore();

  const navigation = [
    { name: 'Dashboard', href: ROUTES.DASHBOARD, icon: LayoutDashboard },
    { name: 'Conversations', href: ROUTES.CONVERSATIONS, icon: MessageSquare, badge: '4' },
    { name: 'Tickets', href: ROUTES.TICKETS, icon: Ticket, badge: '2' },
    { name: 'Customers', href: ROUTES.CUSTOMERS, icon: Users },
    { name: 'AI Engine', href: ROUTES.AI_CONFIG, icon: Bot, isAi: true },
    { name: 'Knowledge Base', href: ROUTES.KNOWLEDGE_BASE, icon: BookOpen },
    { name: 'Analytics & SLA', href: ROUTES.ANALYTICS, icon: BarChart3 },
    { name: 'Billing & Usage', href: ROUTES.BILLING, icon: CreditCard },
    { name: 'Integrations', href: ROUTES.INTEGRATIONS, icon: Layers },
    { name: 'Settings', href: ROUTES.SETTINGS, icon: Settings },
  ];

  return (
    <>
    {mobileNavOpen && (
      <div
        className="fixed inset-0 z-30 bg-black/60 md:hidden"
        onClick={() => setMobileNavOpen(false)}
      />
    )}
    <aside
      className={cn(
        'fixed inset-y-0 left-0 md:relative flex flex-col h-screen border-r border-slate-800/80 bg-[#0d1322]/95 backdrop-blur-2xl transition-all duration-300 z-30 select-none',
        mobileNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        sidebarCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-slate-800/80">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="relative flex-shrink-0">
            <img src="/nexora-mark.png" alt="Nexora AI" className="h-9 w-9 object-contain" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-100 to-indigo-400 bg-clip-text text-transparent truncate">
                Nexora AI
              </span>
              <span className="text-[10px] text-indigo-400/80 font-medium tracking-wider uppercase truncate">
                {tenant?.plan || 'Enterprise'} Tier
              </span>
            </div>
          )}
        </div>

        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={() => setMobileNavOpen(false)}
              className={({ isActive }) =>
                cn(
                  'group flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 relative',
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm shadow-indigo-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                )
              }
            >
              <div className="relative flex-shrink-0">
                <Icon
                  className={cn(
                    'h-4 w-4 transition-colors',
                    item.isAi ? 'text-cyan-400' : 'group-hover:text-indigo-400'
                  )}
                />
              </div>

              {!sidebarCollapsed && (
                <div className="flex items-center justify-between w-full truncate">
                  <span className="truncate">{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {item.badge}
                    </span>
                  )}
                  {item.isAi && (
                    <span className="ml-auto flex items-center gap-1 text-[10px] font-bold text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/50">
                      <Sparkles className="h-2.5 w-2.5" />
                      AUTONOMOUS
                    </span>
                  )}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Workspace Plan Box */}
      {!sidebarCollapsed && (
        <div className="p-3 m-3 rounded-xl bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-900/40 border border-indigo-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-300">AI Quota Used</span>
            <span className="text-[11px] font-semibold text-indigo-400">56%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full w-[56%]" />
          </div>
          <p className="text-[10px] text-slate-400 mt-2">
            8,420 / 15,000 monthly auto-resolutions
          </p>
        </div>
      )}
    </aside>
    </>
  );
};
